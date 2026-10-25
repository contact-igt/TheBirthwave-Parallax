import test from 'node:test';
import assert from 'node:assert/strict';
import { blogQuery, safeBlogUrl, mediaUrl, parseBlogList, parseBlogDetail, redirectSlug } from '../src/lib/blog/contract.ts';

const item = { id:'1', slug:'first-visit', title:'First visit', excerpt:null, published_at:'2026-10-24T00:00:00Z', updated_at:'2026-10-24T00:00:00Z', author:null, category:null, featured_media:null, seo:{title:null,description:null,canonical_url:null} };
test('queries are bounded and encoded, with stable published ordering',()=>{
 const query=blogQuery({page:-2,search:' a & b ',category:' Pregnancy '});
 assert.equal(query.get('page'),'1'); assert.equal(query.get('search'),'a & b'); assert.equal(query.get('category'),'Pregnancy'); assert.equal(query.get('sort_by'),'published_at');
 assert.equal(blogQuery({limit:500}).get('limit'),'100');
});
test('unsafe URLs and redirect paths cannot escape to another site',()=>{
 assert.equal(safeBlogUrl('javascript:alert(1)'),null); assert.equal(safeBlogUrl('//evil.test'),null);
 assert.equal(safeBlogUrl('/contact'),'/contact'); assert.equal(redirectSlug({slug:'safe-slug'}),'safe-slug');
 assert.throws(()=>redirectSlug({slug:'../admin'})); assert.throws(()=>redirectSlug({slug:'https://evil.test'}));
});
test('media selects the slot rendition and safely falls back',()=>{
 assert.equal(mediaUrl({original_url:'https://cdn.test/a.jpg',alt_text:'A',variants:{card:{url:'javascript:bad'}}},'card'),'https://cdn.test/a.jpg');
 assert.equal(mediaUrl(null,'hero'),null);
});
test('list contract rejects broken data rather than treating it as empty',()=>{
 const data={items:[item],pagination:{page:1,limit:12,total_items:1,total_pages:1,has_next_page:false,has_previous_page:false}};
 assert.equal(parseBlogList(data).items[0].slug,'first-visit');
 assert.throws(()=>parseBlogList({items:[]})); assert.throws(()=>parseBlogList({...data,items:[{...item,slug:'../x'}]}));
 assert.throws(()=>parseBlogList({...data,items:[{...item,category:{label:'Pregnancy'}}]}));
});
test('detail requires the medical review and disclaimer',()=>{
 const detail={...item,content_html:'<p>Text</p>',blocks_json:{},template_key:'template_1',template_version:2,reviewer:{name:'Reviewer',credentials:'MBBS',reviewed_at:'2026-10-24'},medical_disclaimer:'Educational only.'};
 assert.equal(parseBlogDetail(detail).reviewer.name,'Reviewer'); assert.throws(()=>parseBlogDetail({...detail,reviewer:null}));
 assert.throws(()=>parseBlogDetail({...detail,medical_disclaimer:''}));
});

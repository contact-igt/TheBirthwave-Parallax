/** Non-clinical test content. Never deployed or written to the CMS. */
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
const titles = ['Preparing for your first pregnancy consultation', 'Questions to ask at your antenatal visit', 'Getting ready for childbirth education', 'Finding support after birth'];
const categories = ['Pregnancy','Fertility','Birth','Recovery','Newborn care'];
export const articles = Array.from({length:14},(_,index)=>({
  id:String(index+1), slug:index===0?'first-consultation':`sample-article-${index+1}`,
  title:index<4?titles[index]:`Sample journal article ${index+1}`,excerpt:'Layout preview only. Questions to bring and conversations to begin.',
  published_at:'2026-10-24T09:00:00.000Z',updated_at:'2026-10-24T09:00:00.000Z',author:{id:'sample',name:'Sample author — layout preview'},category:categories[index%categories.length],
  featured_media:{original_url:['/images/web-ready/planning.jpg','/images/web-ready/pregnancy.jpg','/images/journey/birthpreparation.JPG','/images/journey/afterbirth.jpg'][index%4],variants:{},alt_text:'Existing Birthwave website photograph used for layout preview'},
  seo:{title:null,description:null,canonical_url:null},content_html:'<h2>A place to begin</h2><p>This is non-clinical sample content for checking the article layout. Approved articles will come from the separate blog admin.</p><h3>Your questions, in your own words</h3><p>This space supports clear paragraphs, lists and links. It contains no medical advice.</p><ul><li>Sample list item for layout review.</li><li>Another sample item.</li></ul>',
  template_key:index%2?'template_2':'template_1',template_version:index%2?1:2,
  reviewer:{name:'Sample reviewer',credentials:'Preview only — not a clinical review',reviewed_at:'2026-10-24'},
  medical_disclaimer:'Design preview only. This sample article is not medical guidance.',
  blocks_json:{blocks:{key_takeaways:{enabled:true,heading:'At a glance',items:['Sample takeaway for checking readability.']},numbered_list:{enabled:true,heading:'A simple guide',items:[{title:'Sample step',description:'Example description for the page layout.'}]},faq:{enabled:true,heading:'Questions and answers',items:[{question:'Is this a published medical article?',answer:'No. This is a local design and integration fixture.'}]},share:{enabled:true},feedback:{enabled:true,prompt:'MUST NOT RENDER FEEDBACK'}},sidebar:{appointment_cta:{enabled:true,heading:'Start a conversation',description:'Contact The Birthwave about your care.',book_appointment:{label:'Book a consultation',url:'/contact?source=blog'},call_now:{enabled:false}},newsletter:{enabled:true,heading:'MUST NOT RENDER NEWSLETTER'}}}
}));
export function createBlogFixtureServer() {
  return createServer((request,response)=>{
    const url=new URL(request.url,'http://127.0.0.1');
    const send=(status,data)=>{response.writeHead(status,{'Content-Type':'application/json','Cache-Control':status===200?'public, max-age=60':'no-store','X-API-Contract':'public-blogs@1.1.0'});response.end(JSON.stringify({success:status<400,data}));};
    if(url.pathname==='/api/v1/public/blogs'){
      if(url.searchParams.get('search')==='fixture-outage') return send(503,{});
      const search=(url.searchParams.get('search')||'').toLowerCase();const category=(url.searchParams.get('category')||'').toLowerCase();
      const filtered=articles.filter(item=>(!search||`${item.title} ${item.excerpt}`.toLowerCase().includes(search))&&(!category||item.category.toLowerCase()===category));
      const page=Number(url.searchParams.get('page')||1),limit=Number(url.searchParams.get('limit')||12);
      const keys=['id','slug','title','excerpt','published_at','updated_at','author','category','featured_media','seo'];
      return send(200,{items:filtered.slice((page-1)*limit,page*limit).map(item=>Object.fromEntries(keys.map(key=>[key,item[key]]))),pagination:{page,limit,total_items:filtered.length,total_pages:Math.ceil(filtered.length/limit),has_next_page:page*limit<filtered.length,has_previous_page:page>1}});
    }
    const slug=url.pathname.split('/').pop();
    if(slug==='old-consultation'){response.setHeader('Location','/api/v1/public/blogs/first-consultation');return send(301,{slug:'first-consultation',location:'/api/v1/public/blogs/first-consultation'});}
    if(slug==='fixture-outage')return send(503,{});
    const article=articles.find(item=>item.slug===slug);return send(article?200:404,article||null);
  });
}
if(process.argv[1]===fileURLToPath(import.meta.url))createBlogFixtureServer().listen(5107,'127.0.0.1',()=>console.log('Local blog fixture API: http://127.0.0.1:5107/api/v1'));

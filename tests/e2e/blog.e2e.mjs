/** Run against Next with BLOG_API_BASE_URL pointing to the local fixture server. */
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const base=process.env.BASE_URL||'http://localhost:3110';
const screenshots='docs/blog-qa';mkdirSync(screenshots,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[];const results=[];
try {
 for(const width of [360,390,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`${base}/blog`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('h1').count(),1);assert.ok(await page.getByRole('heading',{name:/Understanding your health/}).isVisible());
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow at ${width}`);
  await page.screenshot({path:`${screenshots}/listing-${width}.png`,fullPage:true});
  if(width===390||width===1440){
   await page.addScriptTag({content:readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'),'utf8')});
   const violations=await page.evaluate(async()=>{const result=await window.axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.html)}));});
   assert.deepEqual(violations,[],`a11y ${width}: ${JSON.stringify(violations)}`);
  }
  await page.goto(`${base}/blog/sample-article-2`,{waitUntil:'networkidle'});
  assert.ok(await page.getByText('Reviewed by Sample reviewer', {exact:false}).isVisible());
  assert.equal(await page.getByText('MUST NOT RENDER NEWSLETTER').count(),0);assert.equal(await page.getByText('MUST NOT RENDER FEEDBACK').count(),0);
  assert.equal(await page.locator('main aside').getByRole('link',{name:'Book a consultation'}).getAttribute('href'),'/contact?source=blog');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`article overflow ${width}`);
  await page.getByText('Is this a published medical article?',{exact:true}).click();assert.ok(await page.getByText('No. This is a local design and integration fixture.').isVisible());
  await page.screenshot({path:`${screenshots}/article-${width}.png`,fullPage:true});
  results.push({width,listing:'pass',article:'pass'});await page.close();
 }
 const page=await browser.newPage();page.on('pageerror',error=>errors.push(error.message));
 await page.goto(`${base}/blog`);assert.equal(await page.locator('main article').count(),12);
 await page.getByRole('button',{name:'Load more articles'}).click();await page.getByRole('status').filter({hasText:'2 more articles loaded.'}).waitFor();assert.equal(await page.locator('main article').count(),14);
 await page.getByRole('navigation',{name:'Article categories'}).getByRole('link',{name:'Fertility',exact:true}).click();await page.waitForURL('**/blog?category=Fertility');assert.ok(await page.getByRole('heading',{name:'Fertility',exact:true}).isVisible());
 await page.goto(`${base}/blog`);await page.getByRole('searchbox').fill('zzzz-no-match');await page.getByRole('button',{name:'Search',exact:true}).click();await page.getByText('No articles match your search. Try another topic.').waitFor();
 await page.goto(`${base}/blog/old-consultation`);await page.waitForURL('**/blog/first-consultation');
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.thebirthwave.in/blog/first-consultation');
 const redirect=await page.request.get(`${base}/blog/old-consultation`,{maxRedirects:0});assert.equal(redirect.status(),308);assert.equal(redirect.headers().location,'/blog/first-consultation');
 const designPreview=await page.getByText('Design preview — sample articles and images for layout review only. Not published medical guidance.',{exact:true}).count();
 if(!designPreview){const schemas=await page.locator('script[type="application/ld+json"]').allTextContents();assert.ok(schemas.some(value=>JSON.parse(value)['@type']==='MedicalWebPage'));}
 const response=await page.request.get(`${base}/blog/unknown-not-published`);assert.equal(response.status(),404);
 const unavailable=await page.request.get(`${base}/api/blog?search=fixture-outage`);assert.equal(unavailable.status(),503);assert.match(unavailable.headers()['cache-control'],/no-store/);
 await page.goto(`${base}/blog?search=fixture-outage`);await page.getByRole('heading',{name:'The journal will be back shortly.'}).waitFor();
 await page.route('**/images/**',route=>route.abort());await page.goto(`${base}/blog/first-consultation`,{waitUntil:'networkidle'});await page.getByText('Article image unavailable').waitFor();await page.unroute('**/images/**');
 await page.setViewportSize({width:1440,height:1100});await page.goto(`${base}/blog`,{waitUntil:'networkidle'});await page.screenshot({path:`${screenshots}/desktop-preview.png`});
 assert.deepEqual(errors,[]);console.log(JSON.stringify({results,interactions:'search, filters, pagination, FAQ, redirect, 404 and outage passed',pageErrors:errors},null,2));
}finally{await browser.close();}

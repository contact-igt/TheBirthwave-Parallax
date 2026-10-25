import test from 'node:test';
import assert from 'node:assert/strict';
import { createBlogTransport } from '../src/lib/blog/transport.ts';
test('warmed articles become 404 or redirects after expiry',async()=>{
 let time=0;let status=200;const transport=createBlogTransport(async()=>new Response(JSON.stringify({success:true,data:{slug:status===301?'new':'old'}}),{status,headers:{etag:'v1'}}),()=>time);
 assert.equal((await transport('http://api.test/old')).status,200);
 time=61000;status=404;assert.equal((await transport('http://api.test/old')).status,404);
 status=200;assert.equal((await transport('http://api.test/old')).status,200);
 time=122000;status=301;assert.equal((await transport('http://api.test/old')).status,301);
});
test('outages may reuse success only within a bounded two-minute window',async()=>{
 let time=0;let status=200;const transport=createBlogTransport(async()=>new Response(JSON.stringify({success:status===200,data:{items:[]}}),{status}),()=>time);
 await transport('http://api.test/list');status=503;time=61000;assert.equal((await transport('http://api.test/list')).status,200);
 time=121000;await assert.rejects(transport('http://api.test/list'));
});
test('304 reuses the success payload and sends its ETag',async()=>{
 let time=0;let calls=0;const transport=createBlogTransport(async(url,options)=>{calls++;if(calls===1)return new Response(JSON.stringify({success:true,data:{slug:'one'}}),{status:200,headers:{etag:'v1'}});assert.equal(options.headers['If-None-Match'],'v1');return new Response(null,{status:304});},()=>time);
 await transport('http://api.test/one');time=61000;assert.equal((await transport('http://api.test/one')).data.slug,'one');
});
test('errors are never cached as successful empty content',async()=>{
 let calls=0;const transport=createBlogTransport(async()=>{calls++;return new Response('{}',{status:503});});
 await assert.rejects(transport('http://api.test/list'));await assert.rejects(transport('http://api.test/list'));assert.equal(calls,2);
});
test('invalid payloads are not retained in the success cache',async()=>{
 let calls=0;const transport=createBlogTransport(async()=>{calls++;return new Response(JSON.stringify({success:true,data:{bad:true}}));});
 const validate=()=>{throw new Error('Malformed article');};
 await assert.rejects(transport('http://api.test/one',validate));await assert.rejects(transport('http://api.test/one',validate));assert.equal(calls,2);
});

var a=class{constructor(e){this.port=e;this.port.onmessage=r=>this.onMessage(r.data)}start(e){this.controller=e}cancel(e){this.port.postMessage({type:1,reason:e.message}),this.port.close()}onMessage(e){!this.controller||(e.type===0&&(this.controller.enqueue(e.chunk),this.port.postMessage({type:0})),e.type===1&&(this.controller.error(e.reason),this.port.close()),e.type===2&&(this.controller.close(),this.port.close()))}};self.addEventListener("install",()=>{self.skipWaiting()});self.addEventListener("activate",t=>{t.waitUntil(self.clients.claim())});var s=new Map;globalThis.addEventListener("message",t=>{let e=t.data;e.url&&e.readablePort&&(e.rs=new ReadableStream(new a(t.data.readablePort),new CountQueuingStrategy({highWaterMark:4})),s.set(e.url,e))});globalThis.addEventListener("fetch",t=>{let e=t.request.url,r=s.get(e);if(!r)return null;s.delete(e),t.respondWith(new Response(r.rs,{headers:r.headers}))});
//# sourceMappingURL=sw.js.map

var P=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var D=Object.prototype.hasOwnProperty;var R=(a,e)=>{for(var t in e)P(a,t,{get:e[t],enumerable:!0})},V=(a,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of B(e))!D.call(a,o)&&o!==t&&P(a,o,{get:()=>e[o],enumerable:!(r=H(e,o))||r.enumerable});return a};var $=a=>V(P({},"__esModule",{value:!0}),a);var X={};R(X,{default:()=>U});module.exports=$(X);var S;(function(a){a.GET="GET",a.PUT="PUT",a.POST="POST",a.PATCH="PATCH",a.DELETE="DELETE"})(S||(S={}));var E;(function(a){a.Vercel="Vercel",a.Local="Local"})(E||(E={}));var s;(function(a){a.JSON="JSON",a.Text="Text",a.None="None"})(s||(s={}));var b={[s.JSON]:"application/json",[s.Text]:"text/plain",[s.None]:void 0};var N={100:"Continue",101:"Switching Protocols",102:"Processing",103:"Early Hints",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a Teapot \u{1FAD6}",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Too Early",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",510:"Not Extended",511:"Network Authentication Required"};var J={headers:{},status:200},u=class a{static new(e){let t=a.defaultOptions(s.None,e);return{status:t.status,statusText:a.getStatusText(t.status),headers:t.headers,body:void 0,bodyType:s.None}}static text(e,t){let r=a.defaultOptions(s.Text,t);return{status:r.status,statusText:a.getStatusText(r.status),headers:r.headers,body:e,bodyType:s.Text}}static JSON(e,t){let r=a.defaultOptions(s.JSON,t);return{status:r.status,statusText:a.getStatusText(r.status),headers:r.headers,body:e,bodyType:s.JSON}}static redirect(e,t){let r=a.defaultOptions(s.None,t);return{status:302,statusText:a.getStatusText(302),headers:{Location:e,...r.headers},body:void 0,bodyType:s.None}}static defaultOptions(e,t){let r={...J,...t};return r.headers={"Content-Type":b[e],...r.headers},r}static getStatusText(e){let t=N[e];if(!t)throw new Error(`Status code "${e}" is invalid.`);return t}};var O=require("http");var p=class{static getPathname(e){let t=this.getInstance(e).pathname;return t=t.replace(/\/\.\//g,"/"),t=t.replace(/\/[^/]+\/\.\.\//g,"/"),t}static getSearchParams(e){return this.getInstance(e).searchParams}static getInstance(e){return e=e.endsWith("/")?e.slice(0,-1):e,new URL(`https://example.com${e}`)}};var c=class{port;server;endpoints;constructor(e){this.endpoints=[],this.port=e,this.server=null}start(){if(this.server)throw new Error("Server is already running");this.server=(0,O.createServer)(this.handleRequest.bind(this)),this.server.listen(this.port,()=>{console.log(`SherpaJS Server is listening on port "${this.port}".`)})}stop(){if(!this.server)throw new Error("Server is not running");this.server.close(()=>{console.log("Server has stopped")}),this.server=null}addRoute(e,t){this.endpoints.push({url:this.convertDynamicSegments(e),handler:t})}convertDynamicSegments(e){return new RegExp("^/"+e.replace(/\[([^/]+?)\]/g,(t,r)=>`(?<${r}>[^/]+)`)+"(/)?$")}async handleRequest(e,t){let r=e.url;if(!r){t.writeHead(400),t.end();return}let o=this.getEndpoint(r);if(!o){t.writeHead(404),t.end();return}await o.handler(e,t)}getEndpoint(e){let t=p.getPathname(e);for(let r of this.endpoints)if(r.url.test(t))return r}};var m="SHERPA-PARAMS",d=class{static pathParamAsQueryParamRedirect(e){let t=[],r=[];for(let n=0;n<e.length;n++)e[n].isDynamic?(t.push(`(?<key-${n}>[a-zA-Z0-9,-_]+)`),r.push(`$key-${n}`)):t.push(e[n].name);let o=`/${t.join("/")}`,i=`/${this.getDynamicURL(e)}?${m}=${r.join(",")}`;return{source:o,destination:i}}static pathParamAsQueryParamRedirectProcess(e,t){let r=p.getSearchParams(e);if(!r.has(m))return e;let o=r.get(m),i=0;return r.delete(m),`/${t.map(n=>n.isDynamic?(i+=1,o[i-1]):n.name).join("/")}${r.size>0?`?${r.toString()}`:""}`}static getDynamicURL(e){return e.map(t=>t.isDynamic?`[${t.name}]`:t.name).join("/")}static parseHeader(e){let t={};return Object.keys(e).forEach(r=>{t[r]=e[r]}),t}static parseParamsPath(e,t){let r={};return p.getPathname(e).split("/").filter(o=>o!="").forEach((o,i)=>{if(t[i].isDynamic){let n=t[i].name,_=this.parseParam(o);this.setValue(r,n,_)}}),r}static parseParamsQuery(e){let t={};return p.getSearchParams(e).forEach((r,o)=>{this.setValue(t,o,this.parseParam(r))}),t}static setValue(e,t,r){e.hasOwnProperty(t)?Array.isArray(e[t])?e[t].push(...r):e[t]=[e[t],...r]:e[t]=r.length==1?r[0]:r}static parseParam(e){return e.includes(",")?e.split(",").map(t=>this.parseParam(t)).flat():e=="true"?[!0]:e=="false"?[!1]:/^\d+$/.test(e)?[parseInt(e)]:[e]}};var y=class{static async Local(e,t){if(!e.url||!e.method)throw new Error("Missing URL and Methods");let{body:r,bodyType:o}=await this.parseBodyLocal(e);return{url:p.getPathname(e.url),params:{path:d.parseParamsPath(e.url,t),query:d.parseParamsQuery(e.url)},method:e.method.toUpperCase(),headers:d.parseHeader(e.headers),body:r,bodyType:o}}static parseBodyLocal(e){return new Promise((t,r)=>{let o="",i=s.Text;e.on("data",n=>{o+=n.toString()}),e.on("end",()=>{let n=e.headers["content-type"];(!n||o=="")&&t({body:void 0,bodyType:s.None}),n=="application/json"&&(o=JSON.parse(o),i=s.JSON),t({body:o,bodyType:i})}),e.on("error",n=>{t({body:void 0,bodyType:s.None})})})}static async Vercel(e,t){let r=d.pathParamAsQueryParamRedirectProcess(e.url,t),{body:o,bodyType:i}=await this.parseBodyVercel(e);return{url:p.getPathname(r),params:{path:d.parseParamsPath(r,t),query:d.parseParamsQuery(r)},method:e.method.toUpperCase(),headers:d.parseHeader(e.headers),body:o,bodyType:i}}static async parseBodyVercel(e){let t=e.headers["content-type"];return t?t=="application/json"?{body:await e.json(),bodyType:s.JSON}:{body:await e.text(),bodyType:s.Text}:{body:void 0,bodyType:s.None}}};var F=Response,h=class{static Local(e,t){t.statusCode=e.status,t.statusMessage=e.statusText;for(let[r,o]of Object.entries(e.headers))o&&t.setHeader(r,o);t.end(this.getBody(e))}static Vercel(e){return new F(this.getBody(e),{headers:e.headers,status:e.status,statusText:e.statusText})}static getBody(e){switch(e.bodyType){case s.Text:return e.body;case s.JSON:return JSON.stringify(e.body)}}};async function L(a,e,t){let r=a[t.method];if(r)try{let o=await r(t,e);return o||u.new({status:200})}catch(o){return u.text(o.message,{status:500})}else return u.new({status:405})}var f={RequestTransform:y,ResponseTransform:h,LocalServer:c,Handler:L};var x={};R(x,{GET:()=>G,POST:()=>Q});var T=class{static server(e){return e}static module(e){return e}},g=class{static module(e){return e}};var I={JSON:"application/json",Text:"text/plain",None:void 0};var C={100:"Continue",101:"Switching Protocols",102:"Processing",103:"Early Hints",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a Teapot \u{1FAD6}",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Too Early",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",510:"Not Extended",511:"Network Authentication Required"};var q={headers:{},status:200},l=class a{static new(e){let t=a.defaultOptions("None",e);return{status:t.status,statusText:a.getStatusText(t.status),headers:t.headers,body:void 0,bodyType:"None"}}static text(e,t){let r=a.defaultOptions("Text",t);return{status:r.status,statusText:a.getStatusText(r.status),headers:r.headers,body:e,bodyType:"Text"}}static JSON(e,t){let r=a.defaultOptions("JSON",t);return{status:r.status,statusText:a.getStatusText(r.status),headers:r.headers,body:e,bodyType:"JSON"}}static redirect(e,t){let r=a.defaultOptions("None",t);return{status:302,statusText:a.getStatusText(302),headers:{Location:e,...r.headers},body:void 0,bodyType:"None"}}static defaultOptions(e,t){let r={...q,...t};return r.headers={"Content-Type":I[e],...r.headers},r}static getStatusText(e){let t=C[e];if(!t)throw new Error(`Status code "${e}" is invalid.`);return t}};var v={New:T,Load:g};function G(a,e){return l.JSON({bodyType:a.bodyType,body:a.body,query:a.params,url:a.url})}function Q(a,e){return l.text("foo")}var M=v.Load.module({entry:"../../../test2",context:{test:"Hello World"}});var k=M.context,j=[{name:"module",isDynamic:!1},{name:"id",isDynamic:!0},{name:"path2",isDynamic:!1}];async function U(a,e){let t=await f.RequestTransform.Vercel(a,j),r=await f.Handler(x,k,t);return f.ResponseTransform.Vercel(r,nativeResponse)}
// Generated by SherpaJS

var T=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var A=Object.prototype.hasOwnProperty;var x=(o,e)=>{for(var t in e)T(o,t,{get:e[t],enumerable:!0})},_=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of M(e))!A.call(o,s)&&s!==t&&T(o,s,{get:()=>e[s],enumerable:!(r=U(e,s))||r.enumerable});return o};var B=o=>_(T({},"__esModule",{value:!0}),o);var Q={};x(Q,{default:()=>k});module.exports=B(Q);var g;(function(o){o.GET="GET",o.PUT="PUT",o.POST="POST",o.PATCH="PATCH",o.DELETE="DELETE"})(g||(g={}));var P;(function(o){o.Vercel="Vercel",o.Local="Local"})(P||(P={}));var a;(function(o){o.JSON="JSON",o.Text="Text",o.None="None"})(a||(a={}));var R={[a.JSON]:"application/json",[a.Text]:"text/plain",[a.None]:void 0};var E={100:"Continue",101:"Switching Protocols",102:"Processing",103:"Early Hints",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a Teapot \u{1FAD6}",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Too Early",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",510:"Not Extended",511:"Network Authentication Required"};var H={headers:{},status:200},u=class o{static new(e){let t=o.defaultOptions(a.None,e);return{status:t.status,statusText:o.getStatusText(t.status),headers:t.headers,body:void 0,bodyType:a.None}}static text(e,t){let r=o.defaultOptions(a.Text,t);return{status:r.status,statusText:o.getStatusText(r.status),headers:r.headers,body:e,bodyType:a.Text}}static JSON(e,t){let r=o.defaultOptions(a.JSON,t);return{status:r.status,statusText:o.getStatusText(r.status),headers:r.headers,body:e,bodyType:a.JSON}}static redirect(e,t){let r=o.defaultOptions(a.None,t);return{status:302,statusText:o.getStatusText(302),headers:{Location:e,...r.headers},body:void 0,bodyType:a.None}}static defaultOptions(e,t){let r={...H,...t};return r.headers={"Content-Type":R[e],...r.headers},r}static getStatusText(e){let t=E[e];if(!t)throw new Error(`Status code "${e}" is invalid.`);return t}};var p=class{static getPathname(e){let t=this.getInstance(e).pathname;return t=t.replace(/\/\.\//g,"/"),t=t.replace(/\/[^/]+\/\.\.\//g,"/"),t}static getSearchParams(e){return this.getInstance(e).searchParams}static getInstance(e){return e=e.endsWith("/")?e.slice(0,-1):e,new URL(e,"https://example.com")}};var n=class{static getDynamicURL(e){return e.map(t=>t.isDynamic?`[${t.name}]`:t.name).join("/")}static parseHeader(e){let t={};return Object.keys(e).forEach(r=>{t[r]=e[r]}),t}static parseParamsPath(e,t){let r={};return p.getPathname(e).split("/").filter(s=>s!="").forEach((s,d)=>{if(t[d].isDynamic){let i=t[d].name,v=this.parseParam(s);this.setValue(r,i,v)}}),r}static parseParamsQuery(e){let t={};return p.getSearchParams(e).forEach((r,s)=>{this.setValue(t,s,this.parseParam(r))}),t}static setValue(e,t,r){e.hasOwnProperty(t)?Array.isArray(e[t])?e[t].push(...r):e[t]=[e[t],...r]:e[t]=r.length==1?r[0]:r}static parseParam(e){return e.includes(",")?e.split(",").map(t=>this.parseParam(t)).flat():e=="true"?[!0]:e=="false"?[!1]:/^\d+$/.test(e)?[parseInt(e)]:[e]}static getAttribute(e,t){let r=Object.keys(e),s=t.toLowerCase(),d=r.find(i=>i.toLowerCase()===s);return d?e[d]:void 0}};var c=class{static async Local(e,t){if(!e.url||!e.method)throw new Error("Missing URL and Methods");let{body:r,bodyType:s}=await this.parseBodyLocal(e);return{url:p.getPathname(e.url),params:{path:n.parseParamsPath(e.url,t),query:n.parseParamsQuery(e.url)},method:e.method.toUpperCase(),headers:n.parseHeader(e.headers),body:r,bodyType:s}}static parseBodyLocal(e){return new Promise((t,r)=>{let s="",d=a.Text;e.on("data",i=>{s+=i.toString()}),e.on("end",()=>{let i=n.getAttribute(e.headers,"content-type");(!i||s=="")&&t({body:void 0,bodyType:a.None}),i=="application/json"&&(s=JSON.parse(s),d=a.JSON),t({body:s,bodyType:d})}),e.on("error",i=>{t({body:void 0,bodyType:a.None})})})}static async Vercel(e,t){console.log(JSON.stringify(e)),console.log(e),console.log(e.url);let{body:r,bodyType:s}=await this.parseBodyVercel(e);return{url:p.getPathname(e.url),params:{path:n.parseParamsPath(e.url,t),query:n.parseParamsQuery(e.url)},method:e.method.toUpperCase(),headers:n.parseHeader(e.headers),body:r,bodyType:s}}static async parseBodyVercel(e){console.log(JSON.stringify(e)),console.log(JSON.stringify(e.headers));let t=n.getAttribute(e.headers,"content-type");return t?t=="application/json"?{body:await e.json(),bodyType:a.JSON}:{body:await e.text(),bodyType:a.Text}:{body:void 0,bodyType:a.None}}};var J=Response,m=class{static Local(e,t){t.statusCode=e.status,t.statusMessage=e.statusText;for(let[r,s]of Object.entries(e.headers))s&&t.setHeader(r,s);t.end(this.getBody(e))}static Vercel(e){return new J(this.getBody(e),{headers:e.headers,status:e.status,statusText:e.statusText})}static getBody(e){switch(e.bodyType){case a.Text:return e.body;case a.JSON:return JSON.stringify(e.body)}}};async function b(o,e,t){let r=o[t.method];if(r)try{let s=await r(t,e);return s||u.new({status:200})}catch(s){return u.text(s.message,{status:500})}else return u.new({status:405})}var y={RequestTransform:c,ResponseTransform:m,Handler:b};var S={};x(S,{GET:()=>D});var h=class{static server(e){return e}static module(e){return e}},f=class{static module(e){return e}};var N={JSON:"application/json",Text:"text/plain",None:void 0};var O={100:"Continue",101:"Switching Protocols",102:"Processing",103:"Early Hints",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a Teapot \u{1FAD6}",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Too Early",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",510:"Not Extended",511:"Network Authentication Required"};var V={headers:{},status:200},l=class o{static new(e){let t=o.defaultOptions("None",e);return{status:t.status,statusText:o.getStatusText(t.status),headers:t.headers,body:void 0,bodyType:"None"}}static text(e,t){let r=o.defaultOptions("Text",t);return{status:r.status,statusText:o.getStatusText(r.status),headers:r.headers,body:e,bodyType:"Text"}}static JSON(e,t){let r=o.defaultOptions("JSON",t);return{status:r.status,statusText:o.getStatusText(r.status),headers:r.headers,body:e,bodyType:"JSON"}}static redirect(e,t){let r=o.defaultOptions("None",t);return{status:302,statusText:o.getStatusText(302),headers:{Location:e,...r.headers},body:void 0,bodyType:"None"}}static defaultOptions(e,t){let r={...V,...t};return r.headers={"Content-Type":N[e],...r.headers},r}static getStatusText(e){let t=O[e];if(!t)throw new Error(`Status code "${e}" is invalid.`);return t}};var C={New:h,Load:f};function D(o,e){return l.JSON({request:o,context:e})}var I=C.Load.module({entry:"../../../../../modules/pass-primary-2",context:{test:!0}});var F=I.context,G=[{name:"module",isDynamic:!1},{name:"m2",isDynamic:!1}];async function k(o,e){console.log(JSON.stringify(o,null,4));let t=await y.RequestTransform.Vercel(o,G),r=await y.Handler(S,F,t);return y.ResponseTransform.Vercel(r)}
// Generated by SherpaJS

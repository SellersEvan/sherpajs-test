var C=Object.defineProperty;var w=(s,e)=>{for(var t in e)C(s,t,{get:e[t],enumerable:!0})};var i=class extends URL{constructor(e,t){super(e,t||"http://0.0"),this.pathname=this.pathname.endsWith("/")?this.pathname.slice(0,-1):this.pathname}};var u=class s{parameters={};has(e){return this.parameters[e]!=null}get(e){if(!(!this.has(e)||this.parameters[e].length==0))return this.parameters[e][0]}getAll(e){if(this.has(e))return this.parameters[e]}keys(){return Object.keys(this.parameters)}toJSON(){return{...this.parameters}}static getPathParams(e,t){let r=new s;return new i(e).pathname.split("/").filter(o=>o!="").forEach((o,l)=>{t[l].isDynamic&&r.append(t[l].name,o,!1)}),r}static getQueryParams(e){let t=new s;return new i(e).searchParams.forEach((r,o)=>{t.append(o,r)}),t}append(e,t,r=!0){this.has(e)||(this.parameters[e]=[]),this.parameters[e].push(...this.parse(t,r))}parse(e,t){return t&&e.includes(",")?e.split(",").map(r=>this.parse(r,t)).flat():e=="true"?[!0]:e=="false"?[!1]:/^\d+$/.test(e)?[parseInt(e)]:[e]}};var d=class s{headers;constructor(e){this.headers={},e&&(e instanceof Headers||e instanceof s?e.forEach((t,r)=>{this.set(r,t)}):Array.isArray(e)?e.forEach(([t,r])=>{this.append(t,r)}):Object.entries(e).forEach(([t,r])=>{Array.isArray(r)?r.forEach(o=>this.append(t,o)):this.set(t,r)}))}append(e,t){let r=e.toLowerCase();this.headers[r]=this.headers[r]?`${this.headers[r]}, ${t}`:t}has(e){return this.get(e)!=null}get(e){return this.headers[e.toLowerCase()]||null}set(e,t){this.headers[e.toLowerCase()]=t}delete(e){delete this.headers[e.toLowerCase()]}toJSON(){return{...this.headers}}toString(){return JSON.stringify(this.headers)}getSetCookie(){return Object.entries(this.headers).filter(([e])=>e.toLowerCase()==="set-cookie").flatMap(([,e])=>e.split(", "))}forEach(e,t){for(let[r,o]of Object.entries(this.headers))e.call(t,o,r,this)}keys(){return Object.keys(this.headers)[Symbol.iterator]()}values(){return Object.values(this.headers)[Symbol.iterator]()}entries(){return Object.entries(this.headers)[Symbol.iterator]()}*[Symbol.iterator](){for(let[e,t]of Object.entries(this.headers))yield[e,t]}};var a;(function(s){s.JSON="JSON",s.Text="Text",s.None="None"})(a||(a={}));var g={[a.JSON]:"application/json",[a.Text]:"text/plain",[a.None]:void 0};var S={100:"Continue",101:"Switching Protocols",102:"Processing",103:"Early Hints",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a Teapot \u{1FAD6}",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Too Early",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",510:"Not Extended",511:"Network Authentication Required"};var L={headers:new d,status:200},p=class s{static new(e){let t=s.defaultOptions(a.None,e);return{status:t.status,statusText:s.getStatusText(t.status),headers:t.headers,body:void 0,bodyType:a.None}}static text(e,t){let r=s.defaultOptions(a.Text,t);return{status:r.status,statusText:s.getStatusText(r.status),headers:r.headers,body:e.toString(),bodyType:a.Text}}static JSON(e,t){let r=s.defaultOptions(a.JSON,t),o=e.toJSON&&typeof e.toJSON=="function";return{status:r.status,statusText:s.getStatusText(r.status),headers:r.headers,body:o?e.toJSON():e,bodyType:a.JSON}}static redirect(e,t){let r=s.defaultOptions(a.None,t);return r.headers.has("Location")||r.headers.set("Location",e),{status:302,statusText:s.getStatusText(302),headers:r.headers,body:void 0,bodyType:a.None}}static defaultOptions(e,t){let r={...L,...t};return r.headers.has("Content-Type")||r.headers.set("Content-Type",g[e]),r}static getStatusText(e){let t=S[e];if(!t)throw new Error(`Status code "${e}" is invalid.`);return t}};var A=["GET","POST","PATCH","DELETE","PUT"],ae=[...A];var h;(function(s){s.GET="GET",s.PUT="PUT",s.POST="POST",s.PATCH="PATCH",s.DELETE="DELETE"})(h||(h={}));var x;(function(s){s.Vercel="Vercel",s.local="local"})(x||(x={}));async function E(s,e,t){let r=s[t.method];if(r)try{let o=await r(t,e);return o||p.new({status:200})}catch(o){return p.text(o.message,{status:500})}else return p.new({status:405})}async function b(s,e){let t=new d(s.headers),{body:r,bodyType:o}=await M(s,t);return{url:new i(s.url).pathname,params:{path:u.getPathParams(s.url,e),query:u.getQueryParams(s.url)},method:s.method.toUpperCase(),headers:t,body:r,bodyType:o}}async function M(s,e){if(s.method.toUpperCase()==h.GET)return{body:void 0,bodyType:a.None};let t=(e.get("Content-Type")||"").toLowerCase();return t?t=="application/json"?{body:await s.json(),bodyType:a.JSON}:{body:await s.text(),bodyType:a.Text}:{body:void 0,bodyType:a.None}}var U=Response;function O(s,e){return F(s,e),new U(H(e),{headers:e.headers,status:e.status,statusText:e.statusText})}function H(s){switch(s.bodyType){case a.Text:return s.body;case a.JSON:return JSON.stringify(s.body)}}function F(s,e){if(e.headers.has("Location")){let t=s.headers.get("host"),o=`${t.toLowerCase().includes("localhost")?"http":"https"}://${t}`,l=new i(s.url,o),c=l.origin+l.pathname;c=c.endsWith("/")?c:`${c}/`,e.headers.set("Location",new i(e.headers.get("Location"),c).href)}}var y={};w(y,{GET:()=>_});var m=class s{headers;constructor(e){this.headers={},e&&(e instanceof Headers||e instanceof s?e.forEach((t,r)=>{this.set(r,t)}):Array.isArray(e)?e.forEach(([t,r])=>{this.append(t,r)}):Object.entries(e).forEach(([t,r])=>{Array.isArray(r)?r.forEach(o=>this.append(t,o)):this.set(t,r)}))}append(e,t){let r=e.toLowerCase();this.headers[r]=this.headers[r]?`${this.headers[r]}, ${t}`:t}has(e){return this.get(e)!=null}get(e){return this.headers[e.toLowerCase()]||null}set(e,t){this.headers[e.toLowerCase()]=t}delete(e){delete this.headers[e.toLowerCase()]}toJSON(){return{...this.headers}}toString(){return JSON.stringify(this.headers)}getSetCookie(){return Object.entries(this.headers).filter(([e])=>e.toLowerCase()==="set-cookie").flatMap(([,e])=>e.split(", "))}forEach(e,t){for(let[r,o]of Object.entries(this.headers))e.call(t,o,r,this)}keys(){return Object.keys(this.headers)[Symbol.iterator]()}values(){return Object.values(this.headers)[Symbol.iterator]()}entries(){return Object.entries(this.headers)[Symbol.iterator]()}*[Symbol.iterator](){for(let[e,t]of Object.entries(this.headers))yield[e,t]}};var N={JSON:"application/json",Text:"text/plain",None:void 0};var R={100:"Continue",101:"Switching Protocols",102:"Processing",103:"Early Hints",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a Teapot \u{1FAD6}",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Too Early",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",510:"Not Extended",511:"Network Authentication Required"};var J={headers:new m,status:200},f=class s{static new(e){let t=s.defaultOptions("None",e);return{status:t.status,statusText:s.getStatusText(t.status),headers:t.headers,body:void 0,bodyType:"None"}}static text(e,t){let r=s.defaultOptions("Text",t);return{status:r.status,statusText:s.getStatusText(r.status),headers:r.headers,body:e.toString(),bodyType:"Text"}}static JSON(e,t){let r=s.defaultOptions("JSON",t),o=e.toJSON&&typeof e.toJSON=="function";return{status:r.status,statusText:s.getStatusText(r.status),headers:r.headers,body:o?e.toJSON():e,bodyType:"JSON"}}static redirect(e,t){let r=s.defaultOptions("None",t);return r.headers.has("Location")||r.headers.set("Location",e),{status:302,statusText:s.getStatusText(302),headers:r.headers,body:void 0,bodyType:"None"}}static defaultOptions(e,t){let r={...J,...t};return r.headers.has("Content-Type")||r.headers.set("Content-Type",N[e]),r}static getStatusText(e){let t=R[e];if(!t)throw new Error(`Status code "${e}" is invalid.`);return t}};var V=["GET","POST","PATCH","DELETE","PUT"],Ze=[...V];var T=class{static server(e){return e}static module(e){return{...e,load:t=>new e.interface(t)}}};var I={New:T};function _(s,e){return f.JSON({request:s,context:e})}var P=I.New.server({context:"foo"});var B=P.context,k=[{name:"regular",isDynamic:!1},{name:"response",isDynamic:!1},{name:"redirect",isDynamic:!1},{name:"success",isDynamic:!1}];async function D(s,e){let t=await b(s,k),r=await E(y,B,t);return O(t,r)}export{D as default};
// Generated by SherpaJS

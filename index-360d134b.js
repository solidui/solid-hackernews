import{t,f as e,u as n,s as r,g as o,d as s,a,S as c,h as i,b as u,j as l,l as h,c as d}from"./web-5ba38c53.js";function p(t){return t.split("/").map(g).join("/")}const f=/%|\//g;function g(t){return t.length<3||-1===t.indexOf("%")?t:decodeURIComponent(t).replace(f,encodeURIComponent)}const m=/%(?:2(?:4|6|B|C)|3(?:B|D|A)|40)/g;function S(t){return encodeURIComponent(t).replace(m,decodeURIComponent)}var v;!function(t){t[t.ANY=-1]="ANY",t[t.STAR=42]="STAR",t[t.SLASH=47]="SLASH",t[t.COLON=58]="COLON"}(v||(v={}));const y=/(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\)/g,A=Array.isArray,E=Object.prototype.hasOwnProperty;function w(t,e){if("object"!=typeof t||null===t)throw new Error("You must pass an object as the second argument to `generate`.");if(!E.call(t,e))throw new Error("You must provide param `"+e+"` to `generate`.");const n=t[e],r="string"==typeof n?n:""+n;if(0===r.length)throw new Error("You must provide a param `"+e+"`.");return r}var D,C;!function(t){t[t.Static=0]="Static",t[t.Dynamic=1]="Dynamic",t[t.Star=2]="Star",t[t.Epsilon=4]="Epsilon"}(D||(D={})),function(t){t[t.Static=0]="Static",t[t.Dynamic=1]="Dynamic",t[t.Star=2]="Star",t[t.Epsilon=4]="Epsilon",t[t.Named=3]="Named",t[t.Decoded=1]="Decoded",t[t.Counted=3]="Counted"}(C||(C={}));const x=[];x[D.Static]=function(t,e){let n=e;const r=t.value;for(let t=0;t<r.length;t++){const e=r.charCodeAt(t);n=n.put(e,!1,!1)}return n},x[D.Dynamic]=function(t,e){return e.put(v.SLASH,!0,!0)},x[D.Star]=function(t,e){return e.put(v.ANY,!1,!0)},x[D.Epsilon]=function(t,e){return e};const N=[];N[D.Static]=function(t){return t.value.replace(y,"\\$1")},N[D.Dynamic]=function(){return"([^/]+)"},N[D.Star]=function(){return"(.+)"},N[D.Epsilon]=function(){return""};const O=[];O[D.Static]=function(t){return t.value},O[D.Dynamic]=function(t,e,n){const r=w(e,t.value);return n?S(r):r},O[D.Star]=function(t,e){return w(e,t.value)},O[D.Epsilon]=function(){return""};const R=Object.freeze({}),b=Object.freeze([]);function _(t,e,n){e.length>0&&e.charCodeAt(0)===v.SLASH&&(e=e.substr(1));const r=e.split("/");let o=void 0,s=void 0;for(let e=0;e<r.length;e++){let a=r[e],c=0;c=""===a?D.Epsilon:a.charCodeAt(0)===v.COLON?D.Dynamic:a.charCodeAt(0)===v.STAR?D.Star:D.Static,c&C.Named&&(a=a.slice(1),o=o||[],o.push(a),s=s||[],s.push(0!=(c&C.Decoded))),c&C.Counted&&n[c]++,t.push({type:c,value:g(a)})}return{names:o||b,shouldDecodes:s||b}}function L(t,e,n){return t.char===e&&t.negate===n}class Y{constructor(t,e,n,r,o){this.states=t,this.id=e,this.char=n,this.negate=r,this.nextStates=o?e:null,this.pattern="",this._regex=void 0,this.handlers=void 0,this.types=void 0}regex(){return this._regex||(this._regex=new RegExp(this.pattern)),this._regex}get(t,e){const n=this.nextStates;if(null!==n)if(A(n))for(let r=0;r<n.length;r++){const o=this.states[n[r]];if(L(o,t,e))return o}else{const r=this.states[n];if(L(r,t,e))return r}}put(t,e,n){let r;if(r=this.get(t,e))return r;const o=this.states;return r=new Y(o,o.length,t,e,n),o[o.length]=r,null==this.nextStates?this.nextStates=r.id:A(this.nextStates)?this.nextStates.push(r.id):this.nextStates=[this.nextStates,r.id],r}match(t){const e=this.nextStates;if(!e)return[];const n=[];if(A(e))for(let r=0;r<e.length;r++){const o=this.states[e[r]];P(o,t)&&n.push(o)}else{const r=this.states[e];P(r,t)&&n.push(r)}return n}}function P(t,e){return t.negate?t.char!==e&&t.char!==v.ANY:t.char===e||t.char===v.ANY}function U(t,e){let n=[];for(let r=0,o=t.length;r<o;r++){const o=t[r];n=n.concat(o.match(e))}return n}function j(t){let e;t=t.replace(/\+/gm,"%20");try{e=decodeURIComponent(t)}catch(t){e=""}return e}class z{constructor(){const t=[],e=new Y(t,0,v.ANY,!0,!1);t[0]=e,this.rootState=e}add(t,e){let n=this.rootState,r="^";const o=[0,0,0],s=new Array(t.length),a=[];let c=!0,i=0;for(let e=0;e<t.length;e++){const u=t[e],{names:l,shouldDecodes:h}=_(a,u.path,o);for(;i<a.length;i++){const t=a[i];t.type!==D.Epsilon&&(c=!1,n=n.put(v.SLASH,!1,!1),r+="/",n=x[t.type](t,n),r+=N[t.type](t))}s[e]={handler:u.handler,names:l,shouldDecodes:h}}c&&(n=n.put(v.SLASH,!1,!1),r+="/"),n.handlers=s,n.pattern=r+"$",n.types=o}recognize(t){const e=z.ENCODE_AND_DECODE_PATH_SEGMENTS;let n,r=[this.rootState],o={},s=!1;const a=t.indexOf("#");-1!==a&&(t=t.substr(0,a));const c=t.indexOf("?");if(-1!==c){const e=t.substr(c+1,t.length);t=t.substr(0,c),o=function(t){const e=t.split("&"),n={};for(let t=0;t<e.length;t++){const r=e[t].split("=");let o=j(r[0]);const s=o.length;let a,c=!1;1===r.length?a="true":(s>2&&o.endsWith("[]")&&(c=!0,o=o.slice(0,s-2),n[o]||(n[o]=[])),a=r[1]?j(r[1]):""),c?n[o].push(a):n[o]=a}return n}(e)}t.startsWith("/")||(t="/"+t);let i=t;e?t=p(t):(t=decodeURI(t),i=decodeURI(i));const u=t.length;u>1&&"/"===t.charAt(u-1)&&(t=t.substr(0,u-1),i=i.substr(0,i.length-1),s=!0);for(let e=0;e<t.length&&(r=U(r,t.charCodeAt(e)),r.length);e++);const l=[];for(let t=0;t<r.length;t++)r[t].handlers&&l.push(r[t]);r=function(t){return t.sort((function(t,e){const[n,r,o]=t.types||[0,0,0],[s,a,c]=e.types||[0,0,0];if(o!==c)return o-c;if(o){if(n!==s)return s-n;if(r!==a)return a-r}return r!==a?r-a:n!==s?s-n:0}))}(l);const h=l[0];return h&&h.handlers&&(s&&h.char===v.ANY&&(i+="/"),n=function(t,e,n,r){const o=t.handlers,s=t.regex();if(!s||!o)throw new Error("state not initialized");const a=s.exec(e);let c=1;const i=function(t){const e=[];return e.queryParams=t||{},e}(n);i.length=o.length;for(let t=0;t<o.length;t++){const e=o[t],n=e.names,s=e.shouldDecodes;let u=R,l=!1;if(n!==b&&s!==b)for(let t=0;t<n.length;t++){l=!0;const e=n[t],o=a&&a[c++];u===R&&(u={}),r&&s[t]?u[e]=o&&decodeURIComponent(o):u[e]=o}i[t]={handler:e.handler,params:u,isDynamic:l}}return i}(h,i,o,e)),n}}z.ENCODE_AND_DECODE_PATH_SEGMENTS=!0,z.Normalizer={normalizeSegment:g,normalizePath:p,encodePathSegment:S};const H=t("<a></a>",2),I=d();function T(){return n(I)}function q(t){const e=T(),n=o({},e,{level:e.level+1}),r=s((()=>{const t=e.current;return t&&t[e.level]&&t[e.level].handler.component}),void 0,!0),u=s((()=>{const t=e.current;return t&&t[e.level]&&t[e.level].params}),void 0,!0),l=s((()=>{const t=e.current;return t&&t.queryParams}),void 0,!0),h=()=>{const t=e.current;return t&&t[e.level].handler.data&&t[e.level].handler.data({get params(){return u()},get query(){return l()}})||{}};return a(I.Provider,{value:n,get children(){return a(c,{get when(){return r()},children:e=>{const n=i(h);return a(e,o({get params(){return u()},get query(){return l()}},n,t,{}))}})}})}const k=t=>{const e=T();return(()=>{const n=H.cloneNode(!0);return n.__click=n=>{n.preventDefault(),e.push(t.href||"")},r(n,t,!1,!1),n})()},B=t=>{const e=function(t,e,n=""){const r=new z;M(r,t,n);const[o,a]=u(e||window.location.pathname.replace(n,"")+window.location.search),c=s((()=>r.recognize(n+o()))),[i,h]=l();return window.onpopstate=()=>h((()=>a(window.location.pathname.replace(n,"")))),{root:n,get location(){return o()},get current(){return c()},get pending(){return i()},push(t){window.history.pushState("","",n+t),h((()=>a(t)))},addRoutes(t){M(r,t,n)}}}(t.routes,t.initialURL,t.root);return e.level=0,a(I.Provider,{value:e,get children(){return t.children}})};let G={};function M(t,e,n,r=[]){e.forEach((e=>{let o;"string"==typeof e.component?(o=G[e.component],o&&o.data===e.data||(G[e.component]=o={component:h((()=>import(n+e.component))),data:e.data})):o={component:e.component,data:e.data};const s={path:n+e.path,handler:o};if(!e.children)return t.add([...r,s]);M(t,e.children,n,[...r,s])}))}e(["click"]);export{k as L,q as R,B as a,T as u};

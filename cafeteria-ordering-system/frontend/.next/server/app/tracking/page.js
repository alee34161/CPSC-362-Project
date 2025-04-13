(()=>{var e={};e.id=242,e.ids=[242],e.modules={308:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>em});var s,i=r(687),a=r(3210),o=r(5814),n=r.n(o);r(1060);let l={data:""},d=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||l,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,u=/\/\*[^]*?\*\/|  +/g,p=/\n+/g,m=(e,t)=>{let r="",s="",i="";for(let a in e){let o=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+o+";":s+="f"==a[1]?m(o,a):a+"{"+m(o,"k"==a[1]?"":t)+"}":"object"==typeof o?s+=m(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=o&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(a,o):a+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+s},f={},h=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+h(e[r]);return t}return e},x=(e,t,r,s,i)=>{let a=h(e),o=f[a]||(f[a]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(a));if(!f[o]){let t=a!==e?e:(e=>{let t,r,s=[{}];for(;t=c.exec(e.replace(u,""));)t[4]?s.shift():t[3]?(r=t[3].replace(p," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(p," ").trim();return s[0]})(e);f[o]=m(i?{["@keyframes "+o]:t}:t,r?"":"."+o)}let n=r&&f.g?f.g:null;return r&&(f.g=f[o]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(f[o],t,s,n),o},b=(e,t,r)=>e.reduce((e,s,i)=>{let a=t[i];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==a?"":a)},"");function g(e){let t=this||{},r=e.call?e(t.p):e;return x(r.unshift?r.raw?b(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,d(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,v,w,j=g.bind({k:1});function P(e,t){let r=this||{};return function(){let s=arguments;function i(a,o){let n=Object.assign({},a),l=n.className||i.className;r.p=Object.assign({theme:v&&v()},n),r.o=/ *go\d+/.test(l),n.className=g.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),w&&d[0]&&w(n),y(d,n)}return t?t(i):i}}var k=e=>"function"==typeof e,N=(e,t)=>k(e)?e(t):e,C=(()=>{let e=0;return()=>(++e).toString()})(),E=(()=>{let e;return()=>e})(),$=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return $(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},q=[],_={toasts:[],pausedAt:void 0},D=e=>{_=$(_,e),q.forEach(e=>{e(_)})},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=(e={})=>{let[t,r]=(0,a.useState)(_),s=(0,a.useRef)(_);(0,a.useEffect)(()=>(s.current!==_&&r(_),q.push(r),()=>{let e=q.indexOf(r);e>-1&&q.splice(e,1)}),[]);let i=t.toasts.map(t=>{var r,s,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...t,toasts:i}},S=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||C()}),A=e=>(t,r)=>{let s=S(t,e,r);return D({type:2,toast:s}),s.id},G=(e,t)=>A("blank")(e,t);G.error=A("error"),G.success=A("success"),G.loading=A("loading"),G.custom=A("custom"),G.dismiss=e=>{D({type:3,toastId:e})},G.remove=e=>D({type:4,toastId:e}),G.promise=(e,t,r)=>{let s=G.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?N(t.success,e):void 0;return i?G.success(i,{id:s,...r,...null==r?void 0:r.success}):G.dismiss(s),e}).catch(e=>{let i=t.error?N(t.error,e):void 0;i?G.error(i,{id:s,...r,...null==r?void 0:r.error}):G.dismiss(s)}),e};var T=(e,t)=>{D({type:1,toast:{id:e,height:t}})},H=()=>{D({type:5,time:Date.now()})},I=new Map,M=1e3,F=(e,t=M)=>{if(I.has(e))return;let r=setTimeout(()=>{I.delete(e),D({type:4,toastId:e})},t);I.set(e,r)},L=e=>{let{toasts:t,pausedAt:r}=O(e);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),s=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&G.dismiss(t.id);return}return setTimeout(()=>G.dismiss(t.id),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[t,r]);let s=(0,a.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),i=(0,a.useCallback)((e,r)=>{let{reverseOrder:s=!1,gutter:i=8,defaultPosition:a}=r||{},o=t.filter(t=>(t.position||a)===(e.position||a)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return(0,a.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)F(e.id,e.removeDelay);else{let t=I.get(e.id);t&&(clearTimeout(t),I.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:T,startPause:H,endPause:s,calculateOffset:i}}},R=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,B=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,K=P("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Q=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,X=P("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Q} 1s linear infinite;
`,Y=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Z=j`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,J=P("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Z} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,V=P("div")`
  position: absolute;
`,W=P("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=P("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(et,null,t):t:"blank"===r?null:a.createElement(W,null,a.createElement(X,{...s}),"loading"!==r&&a.createElement(V,null,"error"===r?a.createElement(K,{...s}):a.createElement(J,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=P("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=P("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[s,i]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(r),ei(r)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(er,{toast:e}),n=a.createElement(eo,{...e.ariaProps},N(e.message,e));return a.createElement(ea,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});s=a.createElement,m.p=void 0,y=s,v=void 0,w=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},ec=(e,t)=>{let r=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...s}},eu=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:d}=L(r);return a.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let o=r.position||t,n=ec(o,d.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}));return a.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?eu:"",style:n},"custom"===r.type?N(r.message,r):i?i(r):a.createElement(el,{toast:r,position:o}))}))};function em(){let[e,t]=(0,a.useState)([]),[r,s]=(0,a.useState)("Pending"),[o,l]=(0,a.useState)(""),[d,c]=(0,a.useState)(0);return(0,i.jsxs)("div",{className:"max-w-4xl mx-auto p-4",children:[(0,i.jsx)(ep,{position:"top-right"}),(0,i.jsxs)("div",{className:"flex justify-between mb-4",children:[(0,i.jsx)("h1",{className:"text-2xl font-bold",children:"Order Tracking"}),(0,i.jsx)(n(),{href:"/dashboard",className:"text-blue-600 hover:underline",children:"Back to Menu"})]}),(0,i.jsxs)("div",{className:"bg-white p-4 rounded shadow mb-4",children:[(0,i.jsx)("h2",{className:"text-lg font-semibold mb-2",children:"Order Items"}),0===e.length?(0,i.jsx)("p",{children:"Loading order items..."}):(0,i.jsxs)("div",{children:[e.map(e=>(0,i.jsx)("div",{className:"border-b py-2",children:(0,i.jsxs)("div",{className:"flex justify-between",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:"font-medium",children:e.name}),(0,i.jsxs)("p",{className:"text-sm text-gray-500",children:["Qty: ",e.quantity," ",e.customization&&`• ${e.customization}`]})]}),(0,i.jsxs)("p",{className:"font-medium",children:["$",(e.price*e.quantity).toFixed(2)]})]})},e.id)),(0,i.jsx)("div",{className:"mt-4 pt-2 border-t",children:(0,i.jsxs)("div",{className:"flex justify-between font-medium",children:[(0,i.jsx)("span",{children:"Total (incl. tax)"}),(0,i.jsxs)("span",{children:["$",d.toFixed(2)]})]})})]})]}),(0,i.jsxs)("div",{className:"bg-white p-4 rounded shadow",children:[(0,i.jsx)("h2",{className:"text-lg font-semibold mb-2",children:"Current Status"}),(0,i.jsx)("div",{className:"p-2 bg-blue-100 rounded",children:(0,i.jsx)("p",{className:"font-medium",children:r})})]}),(0,i.jsx)("div",{className:"mt-4",children:(0,i.jsx)("button",{onClick:()=>G.success("Test notification"),className:"px-3 py-1 bg-blue-500 text-white rounded",children:"Test Toast"})})]})}},440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(1658);let i=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},478:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(2907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/tracking/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/tracking/page.tsx","default")},532:()=>{},846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1135:()=>{},1630:e=>{"use strict";e.exports=require("http")},1645:e=>{"use strict";e.exports=require("net")},2403:(e,t,r)=>{Promise.resolve().then(r.bind(r,478))},2412:e=>{"use strict";e.exports=require("assert")},2724:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6346,23)),Promise.resolve().then(r.t.bind(r,7924,23)),Promise.resolve().then(r.t.bind(r,5656,23)),Promise.resolve().then(r.t.bind(r,99,23)),Promise.resolve().then(r.t.bind(r,8243,23)),Promise.resolve().then(r.t.bind(r,8827,23)),Promise.resolve().then(r.t.bind(r,2763,23)),Promise.resolve().then(r.t.bind(r,7173,23))},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},3997:e=>{"use strict";e.exports=require("tty")},4075:e=>{"use strict";e.exports=require("zlib")},4431:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>l});var s=r(7413),i=r(2202),a=r.n(i),o=r(4988),n=r.n(o);r(1135);let l={title:"Create Next App",description:"Generated by create next app"};function d({children:e}){return(0,s.jsx)("html",{lang:"en",children:(0,s.jsx)("body",{className:`${a().variable} ${n().variable} antialiased`,children:e})})}},4735:e=>{"use strict";e.exports=require("events")},5511:e=>{"use strict";e.exports=require("crypto")},5591:e=>{"use strict";e.exports=require("https")},6827:(e,t,r)=>{Promise.resolve().then(r.bind(r,308))},7378:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d});var s=r(5239),i=r(8088),a=r(8170),o=r.n(a),n=r(893),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d={children:["",{children:["tracking",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,478)),"/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/tracking/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,4431)),"/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,7398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,9999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,5284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,c=["/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/tracking/page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/tracking/page",pathname:"/tracking",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},7910:e=>{"use strict";e.exports=require("stream")},8354:e=>{"use strict";e.exports=require("util")},9021:e=>{"use strict";e.exports=require("fs")},9092:()=>{},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9220:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6444,23)),Promise.resolve().then(r.t.bind(r,6042,23)),Promise.resolve().then(r.t.bind(r,8170,23)),Promise.resolve().then(r.t.bind(r,9477,23)),Promise.resolve().then(r.t.bind(r,9345,23)),Promise.resolve().then(r.t.bind(r,2089,23)),Promise.resolve().then(r.t.bind(r,6577,23)),Promise.resolve().then(r.t.bind(r,1307,23))},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9551:e=>{"use strict";e.exports=require("url")}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[447,169,658,60,814],()=>r(7378));module.exports=s})();
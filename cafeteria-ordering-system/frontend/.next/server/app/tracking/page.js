(()=>{var e={};e.id=242,e.ids=[242],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9220:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,16444,23)),Promise.resolve().then(r.t.bind(r,16042,23)),Promise.resolve().then(r.t.bind(r,88170,23)),Promise.resolve().then(r.t.bind(r,49477,23)),Promise.resolve().then(r.t.bind(r,29345,23)),Promise.resolve().then(r.t.bind(r,12089,23)),Promise.resolve().then(r.t.bind(r,46577,23)),Promise.resolve().then(r.t.bind(r,31307,23))},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},12412:e=>{"use strict";e.exports=require("assert")},17378:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var a=r(65239),o=r(48088),i=r(88170),s=r.n(i),n=r(30893),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d={children:["",{children:["tracking",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,80478)),"/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/tracking/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,94431)),"/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,c=["/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/tracking/page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/tracking/page",pathname:"/tracking",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},22724:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,86346,23)),Promise.resolve().then(r.t.bind(r,27924,23)),Promise.resolve().then(r.t.bind(r,35656,23)),Promise.resolve().then(r.t.bind(r,40099,23)),Promise.resolve().then(r.t.bind(r,38243,23)),Promise.resolve().then(r.t.bind(r,28827,23)),Promise.resolve().then(r.t.bind(r,62763,23)),Promise.resolve().then(r.t.bind(r,97173,23))},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30308:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>ef});var a,o=r(60687),i=r(43210),s=r(85814),n=r.n(s);r(51060);let l={data:""},d=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||l,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,u=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,p=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?p(s,i):i+"{"+p(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=p(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=p.p?p.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},f={},g=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+g(e[r]);return t}return e},h=(e,t,r,a,o)=>{let i=g(e),s=f[i]||(f[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!f[s]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=c.exec(e.replace(u,""));)t[4]?a.shift():t[3]?(r=t[3].replace(m," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);f[s]=p(o?{["@keyframes "+s]:t}:t,r?"":"."+s)}let n=r&&f.g?f.g:null;return r&&(f.g=f[s]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(f[s],t,a,n),s},b=(e,t,r)=>e.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?b(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,d(t.target),t.g,t.o,t.k)}y.bind({g:1});let v,x,C,P=y.bind({k:1});function w(e,t){let r=this||{};return function(){let a=arguments;function o(i,s){let n=Object.assign({},i),l=n.className||o.className;r.p=Object.assign({theme:x&&x()},n),r.o=/ *go\d+/.test(l),n.className=y.apply(r,a)+(l?" "+l:""),t&&(n.ref=s);let d=e;return e[0]&&(d=n.as||e,delete n.as),C&&d[0]&&C(n),v(d,n)}return t?t(o):o}}var E=e=>"function"==typeof e,I=(e,t)=>E(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),M=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return M(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},A=[],S={toasts:[],pausedAt:void 0},D=e=>{S=M(S,e),A.forEach(e=>{e(S)})},j={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},R=(e={})=>{let[t,r]=(0,i.useState)(S),a=(0,i.useRef)(S);(0,i.useEffect)(()=>(a.current!==S&&r(S),A.push(r),()=>{let e=A.indexOf(r);e>-1&&A.splice(e,1)}),[]);let o=t.toasts.map(t=>{var r,a,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||j[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...t,toasts:o}},U=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||N()}),T=e=>(t,r)=>{let a=U(t,e,r);return D({type:2,toast:a}),a.id},L=(e,t)=>T("blank")(e,t);L.error=T("error"),L.success=T("success"),L.loading=T("loading"),L.custom=T("custom"),L.dismiss=e=>{D({type:3,toastId:e})},L.remove=e=>D({type:4,toastId:e}),L.promise=(e,t,r)=>{let a=L.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?I(t.success,e):void 0;return o?L.success(o,{id:a,...r,...null==r?void 0:r.success}):L.dismiss(a),e}).catch(e=>{let o=t.error?I(t.error,e):void 0;o?L.error(o,{id:a,...r,...null==r?void 0:r.error}):L.dismiss(a)}),e};var z=(e,t)=>{D({type:1,toast:{id:e,height:t}})},O=()=>{D({type:5,time:Date.now()})},$=new Map,q=1e3,F=(e,t=q)=>{if($.has(e))return;let r=setTimeout(()=>{$.delete(e),D({type:4,toastId:e})},t);$.set(e,r)},H=e=>{let{toasts:t,pausedAt:r}=R(e);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&L.dismiss(t.id);return}return setTimeout(()=>L.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,i.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),o=(0,i.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=r||{},s=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[t]);return(0,i.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)F(e.id,e.removeDelay);else{let t=$.get(e.id);t&&(clearTimeout(t),$.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:z,startPause:O,endPause:a,calculateOffset:o}}},B=P`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,G=P`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=P`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,V=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${G} 0.15s ease-out forwards;
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
    animation: ${_} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Y=P`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Q=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Y} 1s linear infinite;
`,W=P`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Z=P`
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
}`,J=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,K=w("div")`
  position: absolute;
`,X=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=P`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(et,null,t):t:"blank"===r?null:i.createElement(X,null,i.createElement(Q,{...a}),"loading"!==r&&i.createElement(K,null,"error"===r?i.createElement(V,{...a}):i.createElement(J,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,eo=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=w("div")`
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
`,es=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[a,o]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(r),eo(r)];return{animation:t?`${P(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${P(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=i.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},s=i.createElement(er,{toast:e}),n=i.createElement(es,{...e.ariaProps},I(e.message,e));return i.createElement(ei,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof a?a({icon:s,message:n}):i.createElement(i.Fragment,null,s,n))});a=i.createElement,p.p=void 0,v=a,x=void 0,C=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let s=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:s,className:t,style:r},o)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},eu=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:d}=H(r);return i.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let s=r.position||t,n=ec(s,d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?eu:"",style:n},"custom"===r.type?I(r.message,r):o?o(r):i.createElement(el,{toast:r,position:s}))}))},ep=r(16457);function ef(){let{t:e,i18n:t}=(0,ep.Bd)();t.isInitialized||t.changeLanguage("en");let[r,a]=(0,i.useState)([]),[s,l]=(0,i.useState)("Pending"),[d,c]=(0,i.useState)(""),[u,m]=(0,i.useState)(0),[p,f]=(0,i.useState)(!0);return(0,o.jsxs)("div",{className:"max-w-4xl mx-auto p-4",children:[(0,o.jsx)(em,{position:"top-right"}),(0,o.jsxs)("div",{className:"flex justify-between mb-4",children:[(0,o.jsx)("h1",{className:"text-2xl font-bold",children:e("tracking.title")}),(0,o.jsx)(n(),{href:"/dashboard",className:"text-blue-600 hover:underline",children:e("tracking.backToMenu")})]}),(0,o.jsxs)("div",{className:"bg-white p-4 rounded shadow mb-4",children:[(0,o.jsx)("h2",{className:"text-lg font-semibold mb-2",children:e("tracking.orderItems")}),0===r.length?(0,o.jsx)("p",{children:e("tracking.loadingItems")}):(0,o.jsxs)("div",{children:[r.map(t=>(0,o.jsx)("div",{className:"border-b py-2",children:(0,o.jsxs)("div",{className:"flex justify-between",children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:"font-medium",children:t.name}),(0,o.jsxs)("p",{className:"text-sm text-gray-500",children:[e("tracking.qty")," ",t.quantity," ",t.customization&&`• ${t.customization}`]})]}),(0,o.jsxs)("p",{className:"font-medium",children:["$",(t.price*t.quantity).toFixed(2)]})]})},t.id)),(0,o.jsx)("div",{className:"mt-4 pt-2 border-t",children:(0,o.jsxs)("div",{className:"flex justify-between font-medium",children:[(0,o.jsx)("span",{children:e("tracking.totalLabel")}),(0,o.jsx)("span",{children:p||null===u?"Loading...":`$${u}`})]})})]})]}),(0,o.jsxs)("div",{className:"bg-white p-4 rounded shadow",children:[(0,o.jsx)("h2",{className:"text-lg font-semibold mb-2",children:e("tracking.statusTitle")}),(0,o.jsx)("div",{className:"p-2 bg-blue-100 rounded",children:(0,o.jsx)("p",{className:`text-white text-sm px-3 py-1 rounded-full ${(e=>{switch(e){case"Delivered":return"bg-green-500";case"Out for Delivery":case"Awaiting Pickup":return"bg-yellow-400";case"Pending":return"bg-gray-400";case"Preparing":return"bg-purple-400";default:return"bg-blue-400"}})(s)}`,children:s})})]})]})}r(66975)},33873:e=>{"use strict";e.exports=require("path")},50532:()=>{},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},61135:()=>{},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},66975:(e,t,r)=>{"use strict";var a=r(46755),o=r(16457),i=r(41497);let s=JSON.parse('{"welcome":"Welcome to the Cafeteria Ordering System","loginPrompt":"Click below to log in","goToLogin":"Go to Login","editInfo.title":"Edit Info","editInfo.description":"Update your details and profile picture","editInfo.save":"Save","editInfo.cancel":"Cancel","editInfo.name":"Name","editInfo.username":"Email","editInfo.password":"Password","editInfo.phone":"Phone number","editInfo.confirm":"Confirm","editInfo.alertSuccess":"Update successful!","editInfo.alertFail":"Username already in use or server error","editInfo.errorGeneric":"Something went wrong. Please try again.","editInfo.profilePreview":"Profile Preview","login":{"title":"Login","email":"Email","password":"Password","forgotPassword":"Forgot Password?","noAccount":"Don\'t have an account?","signup":"Sign Up","backHome":"← Back to Home","success":"Login successful!","invalid":"Invalid login credentials","errorGeneric":"Something went wrong. Please try again."},"cafe":{"title":"Cafe CSUF","searchPlaceholder":"Search for something...","loading":"Loading...","noResults":"No results found","cart":"Cart","account":"Account","welcome":"Welcome!","cafeteria":"Our Cafeteria","restaurants":"Local Restaurants","featuredMeals":"Featured Meals"},"user":{"logout":"Logout","emailLabel":"Email:","phoneLabel":"Phone:","locationLabel":"Location:","editProfile":"Edit Profile","mealSubscription":"Meal Subscription","home":"Home","subscriptionPlan":"Subscription Plan"},"admin":{"title":"Admin Menu","manageUsers":"Manage Users","editMenu":"Edit Cafeteria Menu","loading":"Loading...","updateUserInfo":"Update User Info","promoteDemoteUser":"Promote/Demote User","deleteUser":"Delete User","searchMenuItem":"Search Menu Item","addMenuItem":"Add Menu Item","updateMenuItem":"Update Menu Item","deleteMenuItem":"Delete Menu Item","input":{"usernameEmail":"Username/Email","newName":"New Name","newPassword":"New Password","username":"Username","searchName":"Search by name...","newItemName":"New Item Name","price":"Price","quantity":"Quantity","selectCategory":"Select Category","itemName":"Item Name","newPrice":"New Price","newQuantity":"New Quantity"},"button":{"updateInfo":"Update Info","updateRole":"Update Role","deleteUser":"Delete User","addItem":"Add Item","updateItem":"Update Item","deleteItem":"Delete Item"},"category":{"breakfast":"Breakfast","lunch":"Lunch","dinner":"Dinner","dessert":"Dessert","drink":"Drink"}},"cafeteria":{"logo":"Cafe CSUF","history":"History","loyalty":"Loyalty Points","searchPlaceholder":"Search for something...","loading":"Loading...","noResults":"No results found","cart":"Cart","account":"Account","menuTitle":"Cafeteria Menu","add":"Add","remove":"Remove","addedToCart":"Added one {{item}} to cart.","removedFromCart":"All {{item}} items removed from cart."},"home":{"logo":"Cafe CSUF","history":"History","loyalty":"Loyalty Points","searchPlaceholder":"Search for something...","loading":"Loading...","noResults":"No results found","cart":"Cart","account":"Account","welcome":"Welcome!","ourCafeteria":"Our Cafeteria","localRestaurants":"Local Restaurants","featuredMeals":"Featured Meals"},"signup":{"title":"Sign Up","email":"Email","password":"Password","confirmPassword":"Confirm Password","createAccount":"Create Account","backToHome":"← Back to Home","passwordMismatch":"Passwords do not match!","successMessage":"Account created for {{email}}","registrationFailed":"Registration failed!"},"forgotPassword":{"title":"Forgot Password","emailPlaceholder":"Enter your email","resetButton":"Reset Password","backToHome":"← Back to Home","resetConfirmation":"Password reset link sent to {{email}}"},"restaurantMenu":{"logo":"Cafe CSUF","history":"History","loyalty":"Loyalty Points","searchPlaceholder":"Search for something...","loading":"Loading...","noResults":"No results found","cart":"Cart","account":"Account","title":"Restaurant Menu","add":"Add","remove":"Remove","addedToCart":"Added one {{name}} to cart.","removedFromCart":"All {{name}} items removed from cart."},"pastOrders":{"title":"Past Orders","noOrders":"You have no past orders.","orderId":"Order ID:","total":"Total:","viewDetails":"View Details","home":"Home"},"loyalty":{"title":"Loyalty Rewards","back":"Back to Menu","loading":"Loading loyalty points...","rewardBanner":"\uD83C\uDF81 Loyalty Reward: Earn 50 points to get $5 off your next order!","points":"You have {{points}} points!","keepOrdering":"Keep ordering to earn more rewards.","eligible":"You’re eligible for $5 off!","redeemButton":"Redeem 50 Points","earnMore":"Earn {{needed}} more points to unlock $5 off!","historyTitle":"Points History","noHistory":"No point history available.","order":"Order #{{id}}","statusAndTotal":"Status: {{status}} • ${{total}} spent","pointsEarned":"+{{pts}} pts","successRedeem":"\uD83C\uDF89 $5 off reward redeemed!","alreadyRedeemed":"Discount already applied!"},"cart":{"backToMenu":"Back to Menu","title":"Your Cart","empty":"Your cart is empty.","qty":"Qty:","delete":"Delete","specialRequest":"Special Request","placeholder":"ex: No onions, no pickles...","subtotal":"Subtotal","tax":"Tax (10%)","subscriptionDiscount":"Subscription Discount (15%)","pointDiscount":"Point Discount","total":"Total","checkout":"Proceed to Checkout","removeError":"Error removing specific item from cart.","customizationError":"Error updating customization in cart.","fetchError":"Error fetching cart items:","updateError":"Error updating cart:"},"checkout":{"title":"Checkout","fullName":"Full Name","streetAddress":"Street Address","city":"City","state":"State","zipCode":"Zip Code","zipCodeError":"Zip Code must be 5 digits","cardNumber":"Card Number","cardNumberError":"Card number must be 16 digits","expiryDate":"Expiry Date (MM/YY)","expiryDateError":"Expiry date must be in MM/YY format","cvv":"CVV","cvvError":"CVV must be 3 digits","delivery":"Delivery Floor and Room","placeOrder":"Place Order","backToCart":"← Back to Cart","inventoryError":"Not enough items in cafeteria inventory to fulfill order. Please lower quantity.","genericError":"An error occurred. Please try again.","unexpectedResponse":"Unexpected response"},"tracking":{"title":"Order Tracking","backToMenu":"Back to Menu","orderItems":"Order Items","loadingItems":"Loading order items...","qty":"Qty:","totalLabel":"Total (incl. tax and promotions)","loading":"Loading...","statusTitle":"Current Status","statusUpdate":"Order status updated: {{status}}","statusError":"Failed to update order status","loadError":"Failed to load order items"}}'),n=JSON.parse('{"welcome":"Bienvenido al sistema de pedidos de la cafeter\xeda","loginPrompt":"Haz clic abajo para iniciar sesi\xf3n","goToLogin":"Ir a Iniciar Sesi\xf3n","editInfo.title":"Editar informaci\xf3n","editInfo.description":"Actualiza tus datos y foto de perfil","editInfo.save":"Guardar","editInfo.cancel":"Cancelar","editInfo.name":"Nombre","editInfo.username":"Correo electr\xf3nico","editInfo.password":"Contrase\xf1a","editInfo.phone":"N\xfamero de tel\xe9fono","editInfo.confirm":"Confirmar","editInfo.alertSuccess":"\xa1Actualizaci\xf3n exitosa!","editInfo.alertFail":"Nombre de usuario ya en uso o error del servidor","editInfo.errorGeneric":"Algo sali\xf3 mal. Por favor, intenta de nuevo.","editInfo.profilePreview":"Vista previa del perfil","login":{"title":"Iniciar Sesi\xf3n","email":"Correo Electr\xf3nico","password":"Contrase\xf1a","forgotPassword":"\xbfOlvidaste tu contrase\xf1a?","noAccount":"\xbfNo tienes una cuenta?","signup":"Reg\xedstrate","backHome":"← Volver al Inicio","success":"\xa1Inicio de sesi\xf3n exitoso!","invalid":"Credenciales inv\xe1lidas","errorGeneric":"Algo sali\xf3 mal. Por favor, int\xe9ntalo de nuevo."},"cafe":{"title":"Cafeter\xeda CSUF","searchPlaceholder":"Busca algo...","loading":"Cargando...","noResults":"No se encontraron resultados","cart":"Carrito","account":"Cuenta","welcome":"\xa1Bienvenido!","cafeteria":"Nuestra Cafeter\xeda","restaurants":"Restaurantes Locales","featuredMeals":"Comidas Destacadas"},"user":{"logout":"Cerrar sesi\xf3n","emailLabel":"Correo electr\xf3nico:","phoneLabel":"Tel\xe9fono:","locationLabel":"Ubicaci\xf3n:","editProfile":"Editar perfil","mealSubscription":"Suscripci\xf3n de comida","home":"Inicio","subscriptionPlan":"Plan de suscripci\xf3n"},"admin":{"title":"Men\xfa de Administraci\xf3n","manageUsers":"Gestionar Usuarios","editMenu":"Editar Men\xfa de la Cafeter\xeda","loading":"Cargando...","updateUserInfo":"Actualizar Informaci\xf3n del Usuario","promoteDemoteUser":"Promover / Degradar Usuario","deleteUser":"Eliminar Usuario","searchMenuItem":"Buscar Elemento del Men\xfa","addMenuItem":"Agregar Elemento al Men\xfa","updateMenuItem":"Actualizar Elemento del Men\xfa","deleteMenuItem":"Eliminar Elemento del Men\xfa","input":{"usernameEmail":"Usuario/Correo Electr\xf3nico","newName":"Nuevo Nombre","newPassword":"Nueva Contrase\xf1a","username":"Nombre de Usuario","searchName":"Buscar por nombre...","newItemName":"Nombre del Nuevo Elemento","price":"Precio","quantity":"Cantidad","selectCategory":"Seleccionar Categor\xeda","itemName":"Nombre del Elemento","newPrice":"Nuevo Precio","newQuantity":"Nueva Cantidad"},"button":{"updateInfo":"Actualizar Informaci\xf3n","updateRole":"Actualizar Rol","deleteUser":"Eliminar Usuario","addItem":"Agregar Elemento","updateItem":"Actualizar Elemento","deleteItem":"Eliminar Elemento"},"category":{"breakfast":"Desayuno","lunch":"Almuerzo","dinner":"Cena","dessert":"Postre","drink":"Bebida"}},"cafeteria":{"logo":"Caf\xe9 CSUF","history":"Historial","loyalty":"Puntos de Fidelidad","searchPlaceholder":"Buscar algo...","loading":"Cargando...","noResults":"No se encontraron resultados","cart":"Carrito","account":"Cuenta","menuTitle":"Men\xfa de la Cafeter\xeda","add":"Agregar","remove":"Eliminar","addedToCart":"Se agreg\xf3 un {{item}} al carrito.","removedFromCart":"Todos los art\xedculos de {{item}} fueron eliminados del carrito."},"home":{"logo":"Caf\xe9 CSUF","history":"Historial","loyalty":"Puntos de Fidelidad","searchPlaceholder":"Buscar algo...","loading":"Cargando...","noResults":"No se encontraron resultados","cart":"Carrito","account":"Cuenta","welcome":"\xa1Bienvenido!","ourCafeteria":"Nuestra Cafeter\xeda","localRestaurants":"Restaurantes Locales","featuredMeals":"Comidas Destacadas"},"signup":{"title":"Registrarse","email":"Correo electr\xf3nico","password":"Contrase\xf1a","confirmPassword":"Confirmar contrase\xf1a","createAccount":"Crear cuenta","backToHome":"← Volver al inicio","passwordMismatch":"\xa1Las contrase\xf1as no coinciden!","successMessage":"Cuenta creada para {{email}}","registrationFailed":"\xa1Error al registrarse!"},"forgotPassword":{"title":"Olvid\xe9 mi contrase\xf1a","emailPlaceholder":"Introduce tu correo electr\xf3nico","resetButton":"Restablecer contrase\xf1a","backToHome":"← Volver al inicio","resetConfirmation":"Enlace de restablecimiento de contrase\xf1a enviado a {{email}}"},"restaurantMenu":{"logo":"Cafeter\xeda CSUF","history":"Historial","loyalty":"Puntos de fidelidad","searchPlaceholder":"Busca algo...","loading":"Cargando...","noResults":"No se encontraron resultados","cart":"Carrito","account":"Cuenta","title":"Men\xfa del restaurante","add":"Agregar","remove":"Eliminar","addedToCart":"Se agreg\xf3 un {{name}} al carrito.","removedFromCart":"Todos los art\xedculos de {{name}} fueron eliminados del carrito."},"pastOrders":{"title":"Pedidos Anteriores","noOrders":"No tienes pedidos anteriores.","orderId":"ID del pedido:","total":"Total:","viewDetails":"Ver detalles","home":"Inicio"},"loyalty":{"title":"Recompensas de Lealtad","back":"Volver al Men\xfa","loading":"Cargando puntos de lealtad...","rewardBanner":"\uD83C\uDF81 Recompensa de Lealtad: \xa1Gana 50 puntos y obt\xe9n $5 de descuento en tu pr\xf3ximo pedido!","points":"Tienes {{points}} puntos.","keepOrdering":"Sigue ordenando para ganar m\xe1s recompensas.","eligible":"\xa1Eres elegible para $5 de descuento!","redeemButton":"Canjear 50 puntos","earnMore":"Gana {{needed}} puntos m\xe1s para desbloquear $5 de descuento.","historyTitle":"Historial de Puntos","noHistory":"No hay historial de puntos disponible.","order":"Pedido #{{id}}","statusAndTotal":"Estado: {{status}} • ${{total}} gastados","pointsEarned":"+{{pts}} pts","successRedeem":"\uD83C\uDF89 \xa1Recompensa de $5 canjeada!","alreadyRedeemed":"\xa1Descuento ya aplicado!"},"cart":{"backToMenu":"Volver al men\xfa","title":"Tu carrito","empty":"Tu carrito est\xe1 vac\xedo.","qty":"Cantidad:","delete":"Eliminar","specialRequest":"Solicitud especial","placeholder":"ej: Sin cebolla, sin pepinillos...","subtotal":"Subtotal","tax":"Impuesto (10%)","subscriptionDiscount":"Descuento por suscripci\xf3n (15%)","pointDiscount":"Descuento de puntos","total":"Total","checkout":"Proceder al pago","removeError":"Error al eliminar el art\xedculo del carrito.","customizationError":"Error al actualizar la personalizaci\xf3n en el carrito.","fetchError":"Error al obtener art\xedculos del carrito:","updateError":"Error al actualizar el carrito:"},"checkout":{"title":"Pagar","fullName":"Nombre completo","streetAddress":"Direcci\xf3n","city":"Ciudad","state":"Estado","zipCode":"C\xf3digo postal","zipCodeError":"El c\xf3digo postal debe tener 5 d\xedgitos","cardNumber":"N\xfamero de tarjeta","cardNumberError":"El n\xfamero de tarjeta debe tener 16 d\xedgitos","expiryDate":"Fecha de expiraci\xf3n (MM/AA)","expiryDateError":"La fecha de expiraci\xf3n debe tener formato MM/AA","cvv":"CVV","cvvError":"El CVV debe tener 3 d\xedgitos","delivery":"Piso y sala de entrega","placeOrder":"Realizar pedido","backToCart":"← Volver al carrito","inventoryError":"No hay suficientes art\xedculos en el inventario de la cafeter\xeda para completar el pedido. Por favor, reduce la cantidad.","genericError":"Ocurri\xf3 un error. Int\xe9ntalo de nuevo.","unexpectedResponse":"Respuesta inesperada"},"tracking":{"title":"Seguimiento de Pedido","backToMenu":"Volver al Men\xfa","orderItems":"Art\xedculos del Pedido","loadingItems":"Cargando art\xedculos del pedido...","qty":"Cant:","totalLabel":"Total (incluye impuestos y promociones)","loading":"Cargando...","statusTitle":"Estado Actual","statusUpdate":"Estado del pedido actualizado: {{status}}","statusError":"Error al actualizar el estado del pedido","loadError":"Error al cargar los art\xedculos del pedido"}}');a.Ay.use(i.A).use(o.r9).init({resources:{en:{translation:s},es:{translation:n}},fallbackLng:"en",interpolation:{escapeValue:!1},returnNull:!1,detection:{order:["localStorage","navigator"],caches:["localStorage"]}})},69092:()=>{},70440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(31658);let o=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,a.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},74075:e=>{"use strict";e.exports=require("zlib")},79551:e=>{"use strict";e.exports=require("url")},80478:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});let a=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/tracking/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/andrew-lee/Documents/GitHub/CPSC-362-Project/cafeteria-ordering-system/frontend/src/app/tracking/page.tsx","default")},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},86827:(e,t,r)=>{Promise.resolve().then(r.bind(r,30308))},91645:e=>{"use strict";e.exports=require("net")},92403:(e,t,r)=>{Promise.resolve().then(r.bind(r,80478))},94431:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>l});var a=r(37413),o=r(2202),i=r.n(o),s=r(64988),n=r.n(s);r(61135);let l={title:"Create Next App",description:"Generated by create next app"};function d({children:e}){return(0,a.jsx)("html",{lang:"en",children:(0,a.jsx)("body",{className:`${i().variable} ${n().variable} antialiased`,children:e})})}},94735:e=>{"use strict";e.exports=require("events")}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[447,169,658,60,147,814],()=>r(17378));module.exports=a})();
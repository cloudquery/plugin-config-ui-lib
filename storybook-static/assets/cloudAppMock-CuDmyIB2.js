import{j as u}from"./jsx-runtime-DWbWqHZ-.js";import{c as _e,r as p}from"./index-l2PZgWEW.js";import{c as Te,R as je,W as Ce,S as R,j as Se,H as Ee,U as Oe,B as $e,r as Ae}from"./index-DLN_ycMT.js";import{C as Ie}from"./Check-DRIMCU01.js";import{C as ae}from"./FullConfig.stories-AazHx8ut.js";import{I as ne}from"./IconButton-7aX_SmU7.js";import{C as qe}from"./CircularProgress-QcJKkGHO.js";import"./index-CaNG7YX3.js";import"./iframe-BODTGp-o.js";import"../sb-preview/runtime.js";import"./inheritsLoose-Wf0S0NFo.js";import"./index-Dei1GyYE.js";import"./Button-J5feOqqw.js";import"./plugin-DJ5kAFvJ.js";import"./logo-DKLqDrul.js";import"./useApiCall-DuJH8H2W.js";import"./Close-CcIDwoEL.js";import"./dividerClasses-BP6Aw-ce.js";var le={exports:{}};(function(e,t){(function(s,a){e.exports=a()})(_e,()=>(()=>{var s={d:(c,l)=>{for(var m in l)s.o(l,m)&&!s.o(c,m)&&Object.defineProperty(c,m,{enumerable:!0,get:l[m]})},o:(c,l)=>Object.prototype.hasOwnProperty.call(c,l),r:c=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(c,"__esModule",{value:!0})}},a={};s.r(a),s.d(a,{MessageHandler:()=>i,formMessageTypes:()=>o,getPluginUiMessageHandler:()=>d,pluginUiMessageTypes:()=>r});const n="plugin-ui-connector-iframe",r=["height_changed","validation_passed","validation_failed","open_url","loaded","ready","current_values","api_call_request","api_call_abort_request","go_to_previous_step","delete","cancel","submitted","submit_failed","close","show_toast","show_lightbox"],o=["init","validate","submit_failed","request_current_values","api_call_response","auth_connector_result","is_busy"];class i{constructor(l,m,g){this.callbacks=new Map,this.sendMessageTypes=new Set,this.receiveMessageTypes=new Set,this.sendMessageTypes=new Set(l),this.receiveMessageTypes=new Set(m),this.sendMessageWindow=g,window.addEventListener("message",this.handleMessage.bind(this))}sendMessage(l,...m){if(!this.sendMessageTypes.has(l))throw new Error(`Unknown send message type: ${String(l)}`);this.sendMessageWindow.postMessage({type:l,payload:m[0],id:n},"*")}subscribeToMessage(l,m){if(!this.receiveMessageTypes.has(l))throw new Error(`Unknown receive message type: ${String(l)}`);const g=this.callbacks.get(l);return g?g.push(m):this.callbacks.set(l,[m]),()=>{const h=this.callbacks.get(l);h&&this.callbacks.set(l,h.filter(x=>x!==m))}}subscribeToMessageOnce(l,m){const g=h=>{m(h);const x=this.callbacks.get(l);x&&this.callbacks.set(l,x.filter(Y=>Y!==g))};return this.subscribeToMessage(l,g)}handleMessage(l){const{id:m}=l.data;if(m!==n)return;const g=l.data.type,h=this.callbacks.get(g);if(h)for(const x of h)x(l.data.payload)}}function d(){return new i(r,o,window.parent)}return a})())})(le);var I=le.exports;const Re=Te(u.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"}),"Error");let Pe={data:""},ze=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Pe,Le=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ue=/\/\*[^]*?\*\/|  +/g,oe=/\n+/g,C=(e,t)=>{let s="",a="",n="";for(let r in e){let o=e[r];r[0]=="@"?r[1]=="i"?s=r+" "+o+";":a+=r[1]=="f"?C(o,r):r+"{"+C(o,r[1]=="k"?"":t)+"}":typeof o=="object"?a+=C(o,t?t.replace(/([^,])+/g,i=>r.replace(/(^:.*)|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,i):i?i+" "+d:d)):r):o!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=C.p?C.p(r,o):r+":"+o+";")}return s+(t&&n?t+"{"+n+"}":n)+a},_={},ce=e=>{if(typeof e=="object"){let t="";for(let s in e)t+=s+ce(e[s]);return t}return e},He=(e,t,s,a,n)=>{let r=ce(e),o=_[r]||(_[r]=(d=>{let c=0,l=11;for(;c<d.length;)l=101*l+d.charCodeAt(c++)>>>0;return"go"+l})(r));if(!_[o]){let d=r!==e?e:(c=>{let l,m,g=[{}];for(;l=Le.exec(c.replace(Ue,""));)l[4]?g.shift():l[3]?(m=l[3].replace(oe," ").trim(),g.unshift(g[0][m]=g[0][m]||{})):g[0][l[1]]=l[2].replace(oe," ").trim();return g[0]})(e);_[o]=C(n?{["@keyframes "+o]:d}:d,s?"":"."+o)}let i=s&&_.g?_.g:null;return s&&(_.g=_[o]),((d,c,l,m)=>{m?c.data=c.data.replace(m,d):c.data.indexOf(d)===-1&&(c.data=l?d+c.data:c.data+d)})(_[o],t,a,i),o},Ne=(e,t,s)=>e.reduce((a,n,r)=>{let o=t[r];if(o&&o.call){let i=o(s),d=i&&i.props&&i.props.className||/^go/.test(i)&&i;o=d?"."+d:i&&typeof i=="object"?i.props?"":C(i,""):i===!1?"":i}return a+n+(o??"")},"");function G(e){let t=this||{},s=e.call?e(t.p):e;return He(s.unshift?s.raw?Ne(s,[].slice.call(arguments,1),t.p):s.reduce((a,n)=>Object.assign(a,n&&n.call?n(t.p):n),{}):s,ze(t.target),t.g,t.o,t.k)}let de,V,ee;G.bind({g:1});let T=G.bind({k:1});function De(e,t,s,a){C.p=t,de=e,V=s,ee=a}function S(e,t){let s=this||{};return function(){let a=arguments;function n(r,o){let i=Object.assign({},r),d=i.className||n.className;s.p=Object.assign({theme:V&&V()},i),s.o=/ *go\d+/.test(d),i.className=G.apply(s,a)+(d?" "+d:"");let c=e;return e[0]&&(c=i.as||e,delete i.as),ee&&c[0]&&ee(i),de(c,i)}return n}}var Fe=e=>typeof e=="function",W=(e,t)=>Fe(e)?e(t):e,Be=(()=>{let e=0;return()=>(++e).toString()})(),ue=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Je=20,F=new Map,We=1e3,ie=e=>{if(F.has(e))return;let t=setTimeout(()=>{F.delete(e),A({type:4,toastId:e})},We);F.set(e,t)},Ge=e=>{let t=F.get(e);t&&clearTimeout(t)},te=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,Je)};case 1:return t.toast.id&&Ge(t.toast.id),{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return e.toasts.find(r=>r.id===s.id)?te(e,{type:1,toast:s}):te(e,{type:0,toast:s});case 3:let{toastId:a}=t;return a?ie(a):e.toasts.forEach(r=>{ie(r.id)}),{...e,toasts:e.toasts.map(r=>r.id===a||a===void 0?{...r,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+n}))}}},B=[],J={toasts:[],pausedAt:void 0},A=e=>{J=te(J,e),B.forEach(t=>{t(J)})},Ye={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ze=(e={})=>{let[t,s]=p.useState(J);p.useEffect(()=>(B.push(s),()=>{let n=B.indexOf(s);n>-1&&B.splice(n,1)}),[t]);let a=t.toasts.map(n=>{var r,o;return{...e,...e[n.type],...n,duration:n.duration||((r=e[n.type])==null?void 0:r.duration)||(e==null?void 0:e.duration)||Ye[n.type],style:{...e.style,...(o=e[n.type])==null?void 0:o.style,...n.style}}});return{...t,toasts:a}},Qe=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(s==null?void 0:s.id)||Be()}),P=e=>(t,s)=>{let a=Qe(t,e,s);return A({type:2,toast:a}),a.id},k=(e,t)=>P("blank")(e,t);k.error=P("error");k.success=P("success");k.loading=P("loading");k.custom=P("custom");k.dismiss=e=>{A({type:3,toastId:e})};k.remove=e=>A({type:4,toastId:e});k.promise=(e,t,s)=>{let a=k.loading(t.loading,{...s,...s==null?void 0:s.loading});return e.then(n=>(k.success(W(t.success,n),{id:a,...s,...s==null?void 0:s.success}),n)).catch(n=>{k.error(W(t.error,n),{id:a,...s,...s==null?void 0:s.error})}),e};var Xe=(e,t)=>{A({type:1,toast:{id:e,height:t}})},Ke=()=>{A({type:5,time:Date.now()})},Ve=e=>{let{toasts:t,pausedAt:s}=Ze(e);p.useEffect(()=>{if(s)return;let r=Date.now(),o=t.map(i=>{if(i.duration===1/0)return;let d=(i.duration||0)+i.pauseDuration-(r-i.createdAt);if(d<0){i.visible&&k.dismiss(i.id);return}return setTimeout(()=>k.dismiss(i.id),d)});return()=>{o.forEach(i=>i&&clearTimeout(i))}},[t,s]);let a=p.useCallback(()=>{s&&A({type:6,time:Date.now()})},[s]),n=p.useCallback((r,o)=>{let{reverseOrder:i=!1,gutter:d=8,defaultPosition:c}=o||{},l=t.filter(h=>(h.position||c)===(r.position||c)&&h.height),m=l.findIndex(h=>h.id===r.id),g=l.filter((h,x)=>x<m&&h.visible).length;return l.filter(h=>h.visible).slice(...i?[g+1]:[0,g]).reduce((h,x)=>h+(x.height||0)+d,0)},[t]);return{toasts:t,handlers:{updateHeight:Xe,startPause:Ke,endPause:a,calculateOffset:n}}},et=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,tt=T`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,st=T`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,rt=S("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${et} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${tt} 0.15s ease-out forwards;
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
    animation: ${st} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,at=T`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,nt=S("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${at} 1s linear infinite;
`,ot=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,it=T`
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
}`,lt=S("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ot} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${it} 0.2s ease-out forwards;
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
`,ct=S("div")`
  position: absolute;
`,dt=S("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ut=T`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,pt=S("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ut} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,mt=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return t!==void 0?typeof t=="string"?p.createElement(pt,null,t):t:s==="blank"?null:p.createElement(dt,null,p.createElement(nt,{...a}),s!=="loading"&&p.createElement(ct,null,s==="error"?p.createElement(rt,{...a}):p.createElement(lt,{...a})))},gt=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ft=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ht="0%{opacity:0;} 100%{opacity:1;}",bt="0%{opacity:1;} 100%{opacity:0;}",yt=S("div")`
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
`,wt=S("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,vt=(e,t)=>{let s=e.includes("top")?1:-1,[a,n]=ue()?[ht,bt]:[gt(s),ft(s)];return{animation:t?`${T(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${T(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},pe=p.memo(({toast:e,position:t,style:s,children:a})=>{let n=e.height?vt(e.position||t||"top-center",e.visible):{opacity:0},r=p.createElement(mt,{toast:e}),o=p.createElement(wt,{...e.ariaProps},W(e.message,e));return p.createElement(yt,{className:e.className,style:{...n,...s,...e.style}},typeof a=="function"?a({icon:r,message:o}):p.createElement(p.Fragment,null,r,o))});De(p.createElement);var xt=({id:e,className:t,style:s,onHeightUpdate:a,children:n})=>{let r=p.useCallback(o=>{if(o){let i=()=>{let d=o.getBoundingClientRect().height;a(e,d)};i(),new MutationObserver(i).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return p.createElement("div",{ref:r,className:t,style:s},n)},kt=(e,t)=>{let s=e.includes("top"),a=s?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ue()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...a,...n}},Mt=G`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,N=16,_t=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:n,containerStyle:r,containerClassName:o})=>{let{toasts:i,handlers:d}=Ve(s);return p.createElement("div",{style:{position:"fixed",zIndex:9999,top:N,left:N,right:N,bottom:N,pointerEvents:"none",...r},className:o,onMouseEnter:d.startPause,onMouseLeave:d.endPause},i.map(c=>{let l=c.position||t,m=d.calculateOffset(c,{reverseOrder:e,gutter:a,defaultPosition:t}),g=kt(l,m);return p.createElement(xt,{id:c.id,key:c.id,onHeightUpdate:d.updateHeight,className:c.visible?Mt:"",style:g},c.type==="custom"?W(c.message,c):n?n(c):p.createElement(pe,{toast:c,position:l}))}))},D=k;const f=new I.MessageHandler(I.formMessageTypes,I.pluginUiMessageTypes,window);function Tt({children:e,initialValues:t,authToken:s,teamName:a,user:n}){const r=je(Ce()),{palette:o,typography:i,shadows:d}=r,[c,l]=p.useState(),[m,g]=p.useState(),[h,x]=p.useState(""),[Y,me]=p.useState(!1),[M,Z]=p.useState(),z=p.useMemo(()=>new URLSearchParams(window.location.search),[]),ge=async()=>{f.sendMessage("validate");let b,v;f.sendMessage("is_busy",{status:!0});try{const E=await new Promise((Q,X)=>{b=f.subscribeToMessageOnce("validation_passed",({values:j})=>{Q(j)}),v=f.subscribeToMessageOnce("validation_failed",({errors:j})=>X(j))}).finally(()=>{b==null||b(),v==null||v()});x(""),g(E)}catch(E){b==null||b(),v==null||v(),g(void 0),x(JSON.stringify(E,null,2))}f.sendMessage("is_busy",{status:!1})},L=p.useCallback(()=>{Z(void 0)},[]),fe=p.useCallback(b=>{b.target.closest("img")||L()},[L]);return p.useEffect(()=>{f.sendMessage("init",{initialValues:t?{migrateMode:t.migrateMode,writeMode:t.writeMode,tables:t.tables,skipTables:t.skipTables,...t}:void 0,teamName:a,context:"wizard",user:n});const b=f.subscribeToMessageOnce("ready",({implementsCustomFooter:y})=>{me(!!y)}),v=f.subscribeToMessage("go_to_previous_step",()=>{alert("Previous step")}),E=f.subscribeToMessage("delete",async()=>{alert("Delete")}),Q=f.subscribeToMessage("cancel",()=>{alert("Cancel")}),X=f.subscribeToMessage("submitted",async()=>{alert("Submitted")});let j;const he=f.subscribeToMessage("open_url",({url:y})=>{const w=window.open(y,"_blank");j=f.subscribeToMessageOnce("close",()=>{w==null||w.close()})}),be=f.subscribeToMessage("show_lightbox",y=>Z({...y,isLoaded:!1})),ye=f.subscribeToMessage("show_toast",y=>{switch(y.type){case"success":{D.success(y.message,{duration:y.duration});break}case"error":{D.error(y.message,{duration:y.duration});break}default:D(y.message,{duration:y.duration})}}),U={},we=f.subscribeToMessage("api_call_request",async({body:y,endpoint:w,id:O,method:q,options:K})=>{const se=new RegExp(`/teams/(?:${a}|)/sync-(?:source|destination)-test-connections$`).test(w)&&q==="POST",xe=new RegExp(`/teams/(?:${a}|)/sync-(?:source|destination)-test-connections/this-will-be-a-random-uuid$`).test(w)&&q==="GET",re=new RegExp(`/teams/(?:${a}|)/sync-(?:source|destination)-test-connections/this-will-be-a-random-uuid/promote$`).test(w)&&q==="POST",ke=new RegExp(`/teams/(?:${a}|)/sync-(?:sources|destinations)/[a-z](?:-?[0-9a-zA-Z]+)+$`).test(w)&&q==="PATCH";if(se?l(y):re&&g(y),se||xe){f.sendMessage("api_call_response",{body:{id:"this-will-be-a-random-uuid",status:"completed",failure_reason:"",failure_code:""},endpoint:w,headers:{},id:O,ok:!0,status:200});return}else if(re||ke){f.sendMessage("api_call_response",{body:{},endpoint:w,headers:{},id:O,ok:!0,status:200});return}U[O]=new AbortController;const H=new Headers;H.set("Content-Type","application/json"),H.set("Accept","application/json"),H.set("__session",`${s}`);try{const $=await fetch(w,{body:JSON.stringify(y),headers:H,method:q,mode:K==null?void 0:K.mode,signal:U[O].signal}),Me=await $.json().catch(()=>null);f.sendMessage("api_call_response",{body:Me,endpoint:w,headers:Object.fromEntries($.headers.entries()),id:O,ok:$.ok,status:$.status})}catch($){f.sendMessage("api_call_response",{body:$,endpoint:w,headers:{},id:O,ok:!1,status:$.status})}finally{delete U[O]}}),ve=f.subscribeToMessage("api_call_abort_request",({id:y})=>{var w;(w=U[y])==null||w.abort()});return()=>{b(),v(),E(),Q(),X(),we(),ve(),he(),be(),ye(),j==null||j()}},[s,t,a,n]),p.useEffect(()=>{if(z.size>0&&window.opener){const b=new I.MessageHandler(I.pluginUiMessageTypes,I.formMessageTypes,window.opener);window.localStorage.setItem("authConnectorResult",JSON.stringify(Object.fromEntries(z.entries()))),b.sendMessage("close")}else window.addEventListener("storage",()=>{const b=window.localStorage.getItem("authConnectorResult");if(b)try{const v=JSON.parse(b);window.localStorage.removeItem("authConnectorResult"),f.sendMessage("auth_connector_result",v)}catch{return}})},[z]),z.size>0?u.jsx(R,{spacing:4,sx:{alignItems:"center",textAlign:"center"},children:u.jsxs(Se,{variant:"body1",children:["Authenticated successfully.",u.jsx("br",{}),"You can close this window now."]})}):u.jsxs(u.Fragment,{children:[u.jsx(R,{sx:{padding:2},children:e}),!Y&&u.jsx(R,{direction:"row",spacing:2,sx:{justifyContent:"flex-end",padding:2},children:u.jsx(Ee,{onClick:ge,variant:"contained",children:"Submit"})}),u.jsxs(R,{sx:{padding:2},children:[c&&u.jsxs(u.Fragment,{children:[u.jsx("div",{children:"Test Connection Values:"}),u.jsx("pre",{style:{wordBreak:"break-all",whiteSpace:"break-spaces"},children:JSON.stringify(c,null,2)||"-"})]}),u.jsx("div",{children:"Submit Values:"}),u.jsx("pre",{style:{wordBreak:"break-all",whiteSpace:"break-spaces"},children:JSON.stringify(m,null,2)||"-"}),u.jsx("div",{children:"Errors:"}),u.jsx("pre",{style:{wordBreak:"break-all",whiteSpace:"break-spaces"},children:h||"-"})]}),u.jsx(Oe,{"aria-label":M==null?void 0:M.alt,onClose:L,open:!!M,children:u.jsxs($e,{onClick:fe,sx:{height:"100%",paddingX:2,paddingY:7,width:"100%",position:"relative"},children:[u.jsx(ne,{autoFocus:!0,onClick:L,sx:{position:"absolute",right:8,top:8},title:"Close",children:u.jsx(ae,{})}),u.jsxs(R,{sx:{alignItems:"center",height:"100%",justifyContent:"center",overflow:"auto",width:"100%"},children:[!(M!=null&&M.isLoaded)&&u.jsx(qe,{}),u.jsx("img",{...M,"data-testid":"fullbox-image",onLoad:()=>Z({...M,isLoaded:!0}),style:{height:"auto",maxHeight:M!=null&&M.isLoaded?void 0:0,maxWidth:"100%"}})]})]})}),u.jsx(_t,{containerStyle:{bottom:40,left:40,right:40,top:40},position:"bottom-right",toastOptions:{duration:6e3,error:{icon:u.jsx(Re,{}),style:{background:o.error.main,color:o.common.white}},style:{backdropFilter:"blur(6px)",background:Ae(o.neutral[900],.8),boxShadow:d[16],color:o.common.white,...i.body1,maxWidth:500},success:{icon:u.jsx(Ie,{}),style:{background:o.success.main,color:o.common.white}}},children:b=>u.jsx(pe,{toast:b,children:({icon:v,message:E})=>u.jsxs(u.Fragment,{children:[v,E,b.type!=="loading"&&u.jsx(ne,{onClick:()=>D.dismiss(b.id),sx:{color:o.text.primary},children:u.jsx(ae,{color:"inherit"})})]})})})]})}Tt.__docgenInfo={description:`This component is used in the development mode of the custom plugin config UI
and is used to mock the Cloud App.

@public`,methods:[],displayName:"CloudAppMock",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},initialValues:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  name: string;
  migrateMode?: 'forced' | 'safe' | undefined;
  envs: Array<{
    name: string;
    value: string;
  }>;
  spec: Record<string, any> | undefined;
  tables?: string[] | undefined;
  skipTables?: string[] | undefined;
  writeMode?: 'append' | 'overwrite' | 'overwrite-delete-stale' | undefined;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"migrateMode",value:{name:"union",raw:"'forced' | 'safe' | undefined",elements:[{name:"literal",value:"'forced'"},{name:"literal",value:"'safe'"},{name:"undefined"}],required:!1}},{key:"envs",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  name: string;
  value: string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:`Array<{
  name: string;
  value: string;
}>`,required:!0}},{key:"spec",value:{name:"union",raw:"Record<string, any> | undefined",elements:[{name:"Record",elements:[{name:"string"},{name:"any"}],raw:"Record<string, any>"},{name:"undefined"}],required:!0}},{key:"tables",value:{name:"union",raw:"string[] | undefined",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"undefined"}],required:!1}},{key:"skipTables",value:{name:"union",raw:"string[] | undefined",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"undefined"}],required:!1}},{key:"writeMode",value:{name:"union",raw:"'append' | 'overwrite' | 'overwrite-delete-stale' | undefined",elements:[{name:"literal",value:"'append'"},{name:"literal",value:"'overwrite'"},{name:"literal",value:"'overwrite-delete-stale'"},{name:"undefined"}],required:!1}}]}},description:"Initial values for the form"},authToken:{required:!1,tsType:{name:"string"},description:"CloudQuery auth token for the form (required only if you plan to make API calls from the form)"},teamName:{required:!0,tsType:{name:"string"},description:"Team name for the form"},user:{required:!0,tsType:{name:"signature",type:"object",raw:"{ id: string; name: string; email: string }",signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"email",value:{name:"string",required:!0}}]}},description:"User information"}}};export{Tt as CloudAppMock};

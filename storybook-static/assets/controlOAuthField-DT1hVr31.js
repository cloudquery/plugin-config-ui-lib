import{j as f}from"./jsx-runtime-DWbWqHZ-.js";import{r as c}from"./index-l2PZgWEW.js";import{C as F}from"./Check-Cz8ZVTJg.js";import{a as R,b as V,M as I,v,s as E,j as A,d as O,m as M,p as z,e as Q,u as q,k as B,l as N,N as T,O as S,P as W,Q as H,S as P,H as U,y as j}from"./index-CwmUooIP.js";import{u as Y}from"./plugin-ChsixANh.js";import{u as G,g as J,L as K}from"./useApiCall-Dv9wDuNe.js";import"./index-CaNG7YX3.js";import"./iframe-B3BX2Lps.js";import"../sb-preview/runtime.js";import"./inheritsLoose-Wf0S0NFo.js";import"./CircularProgress-Cj3O-II6.js";function X(e){return V("MuiLink",e)}const Z=R("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),ee=({theme:e,ownerState:t})=>{const r=t.color,i=I(e,`palette.${r}`,!1)||t.color,d=I(e,`palette.${r}Channel`);return"vars"in e&&d?`rgba(${d} / 0.4)`:v(i,.4)},_={primary:!0,secondary:!0,error:!0,info:!0,success:!0,warning:!0,textPrimary:!0,textSecondary:!0,textDisabled:!0},te=e=>{const{classes:t,component:r,focusVisible:i,underline:d}=e,p={root:["root",`underline${O(d)}`,r==="button"&&"button",i&&"focusVisible"]};return N(p,X,t)},ne=E(A,{name:"MuiLink",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`underline${O(r.underline)}`],r.component==="button"&&t.button]}})(M(({theme:e})=>({variants:[{props:{underline:"none"},style:{textDecoration:"none"}},{props:{underline:"hover"},style:{textDecoration:"none","&:hover":{textDecoration:"underline"}}},{props:{underline:"always"},style:{textDecoration:"underline","&:hover":{textDecorationColor:"inherit"}}},{props:({underline:t,ownerState:r})=>t==="always"&&r.color!=="inherit",style:{textDecorationColor:"var(--Link-underlineColor)"}},...Object.entries(e.palette).filter(z()).map(([t])=>({props:{underline:"always",color:t},style:{"--Link-underlineColor":e.vars?`rgba(${e.vars.palette[t].mainChannel} / 0.4)`:v(e.palette[t].main,.4)}})),{props:{underline:"always",color:"textPrimary"},style:{"--Link-underlineColor":e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.4)`:v(e.palette.text.primary,.4)}},{props:{underline:"always",color:"textSecondary"},style:{"--Link-underlineColor":e.vars?`rgba(${e.vars.palette.text.secondaryChannel} / 0.4)`:v(e.palette.text.secondary,.4)}},{props:{underline:"always",color:"textDisabled"},style:{"--Link-underlineColor":(e.vars||e).palette.text.disabled}},{props:{component:"button"},style:{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Z.focusVisible}`]:{outline:"auto"}}}]}))),oe=c.forwardRef(function(t,r){const i=Q({props:t,name:"MuiLink"}),d=q(),{className:p,color:a="primary",component:h="a",onBlur:y,onFocus:C,TypographyClasses:m,underline:s="always",variant:u="inherit",sx:x,...l}=i,[g,k]=c.useState(!1),$=o=>{T(o.target)||k(!1),y&&y(o)},w=o=>{T(o.target)&&k(!0),C&&C(o)},n={...i,color:a,component:h,focusVisible:g,underline:s,variant:u},b=te(n);return f.jsx(ne,{color:a,className:B(b.root,p),classes:m,component:h,onBlur:$,onFocus:w,ref:r,ownerState:n,variant:u,...l,sx:[..._[a]===void 0?[{color:a}]:[],...Array.isArray(x)?x:[x]],style:{...l.style,...s==="always"&&a!=="inherit"&&!_[a]&&{"--Link-underlineColor":ee({theme:d,ownerState:n})}}})});function re({pluginUiMessageHandler:e,teamName:t,pluginKind:r,pluginName:i,pluginTeamName:d,successBaseUrl:p}){const{callApi:a}=G(e),[h,y]=c.useState(!1),[C,m]=c.useState(null),[s,u]=c.useState(null),[x,l]=c.useState(null),g=c.useRef(),k=c.useCallback(()=>{var n;y(!1),m(null),l(null),u(null),(n=g.current)==null||n.call(g)},[]),$=c.useCallback(async()=>{y(!0),m(null),l(null);try{const n=J(),{requestPromise:b}=await a(`${S}/teams/${t}/connectors`,"POST",{type:"oauth",name:n}),{body:{id:o}}=await b,{requestPromise:L}=await a(`${S}/teams/${t}/connectors/${o}/authenticate/oauth`,"POST",{plugin_team:d,plugin_kind:r,plugin_name:i,base_url:p}),{body:{redirect_url:D}}=await L;u(o),e.sendMessage("open_url",{url:D})}catch(n){y(!1),u(null),l(null),m((n==null?void 0:n.body)||n)}},[a,r,i,d,e,p,t]),w=c.useCallback(async(n,b)=>{try{const o=new URLSearchParams(b),{requestPromise:L}=await a(`${S}/teams/${t}/connectors/${n}/authenticate/oauth`,"PATCH",{return_url:`${p}?${o.toString()}`,base_url:p});await L}catch(o){y(!1),m((o==null?void 0:o.body)||o)}},[a,p,t]);return c.useEffect(()=>{if(h&&s){const n=e.subscribeToMessageOnce("auth_connector_result",async b=>{try{await w(s,b),l(b)}catch(o){m(o)}finally{y(!1)}});return g.current=n,n}},[s,w,h,e]),{authenticate:$,isLoading:h,connectorId:s,authConnectorResult:x,error:C,cancel:k}}function ae(){const e=W(),{plugin:t,teamName:r,config:i,pluginUiMessageHandler:d}=Y(),{watch:p,formState:a,setValue:h}=e,{authConnectorResult:y,authenticate:C,connectorId:m,error:s,isLoading:u,cancel:x}=re({pluginKind:t.kind,pluginName:t.name,pluginTeamName:t.team,pluginUiMessageHandler:d,successBaseUrl:H,teamName:r});c.useEffect(()=>{y&&m&&h("connectorId",m)},[y,m,h]),c.useEffect(()=>{s&&h("connectorId",void 0)},[s,h]);const l=p("connectorId");return f.jsxs(P,{sx:{gap:1.5,paddingTop:2},children:[f.jsxs(P,{direction:"row",sx:{gap:1,alignItems:"center"},children:[f.jsx(K,{size:"large",variant:"contained",onClick:C,loading:u,fullWidth:!1,disabled:!!l,endIcon:l&&f.jsx(F,{}),children:l&&!u?`${i.label} connected successfully`:"Authenticate"}),u&&f.jsx(U,{color:"inherit",onClick:x,children:"Cancel authentication"})]}),!s&&!a.errors.connectorId&&!u&&l&&f.jsxs(A,{variant:"body2",color:"textSecondary",children:["To reconnect CloudQuery via ",i.label," ",f.jsx(oe,{underline:"always",sx:{cursor:"pointer"},onClick:C,children:"click here"})]}),!s&&!a.errors.connectorId&&!u&&!l&&f.jsx(A,{variant:"body2",color:"textSecondary",children:"This will open a new browser tab."}),!!s&&f.jsx(j,{error:!0,sx:{marginTop:2},children:s.message||"Something went wrong during authentication. Please try again."}),!s&&a.errors.connectorId&&f.jsx(j,{error:!0,sx:{marginTop:2},children:`You must authenticate with ${i.label} to continue.`})]})}ae.__docgenInfo={description:`This component is a renders an OAuth authentication button and handles the data transfer process.

@public`,methods:[],displayName:"ControlOAuthField"};export{ae as ControlOAuthField};
import{r as A}from"./index-l2PZgWEW.js";import{b as D,a as G,s as C,q as H,r as J,t as K,f as M,k as Q,d as T,l as V}from"./index-CwmUooIP.js";import{j as w}from"./jsx-runtime-DWbWqHZ-.js";function W(s){return D("PrivateSwitchBase",s)}G("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const X=s=>{const{classes:t,checked:r,disabled:c,edge:a}=s,d={root:["root",r&&"checked",c&&"disabled",a&&`edge${T(a)}`],input:["input"]};return V(d,W,t)},Y=C(H)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:s,ownerState:t})=>s==="start"&&t.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:s,ownerState:t})=>s==="end"&&t.size!=="small",style:{marginRight:-12}}]}),Z=C("input",{shouldForwardProp:J})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),te=A.forwardRef(function(t,r){const{autoFocus:c,checked:a,checkedIcon:d,className:y,defaultChecked:u,disabled:S,disableFocusRipple:p=!1,edge:x=!1,icon:F,id:R,inputProps:P,inputRef:v,name:z,onBlur:h,onChange:f,onFocus:m,readOnly:I,required:j=!1,tabIndex:E,type:i,value:g,...U}=t,[b,L]=K({controlled:a,default:!!u,name:"SwitchBase",state:"checked"}),o=M(),N=e=>{m&&m(e),o&&o.onFocus&&o.onFocus(e)},q=e=>{h&&h(e),o&&o.onBlur&&o.onBlur(e)},O=e=>{if(e.nativeEvent.defaultPrevented)return;const B=e.target.checked;L(B),f&&f(e,B)};let n=S;o&&typeof n>"u"&&(n=o.disabled);const $=i==="checkbox"||i==="radio",l={...t,checked:b,disabled:n,disableFocusRipple:p,edge:x},k=X(l);return w.jsxs(Y,{component:"span",className:Q(k.root,y),centerRipple:!0,focusRipple:!p,disabled:n,tabIndex:null,role:void 0,onFocus:N,onBlur:q,ownerState:l,ref:r,...U,children:[w.jsx(Z,{autoFocus:c,checked:a,defaultChecked:u,className:k.input,disabled:n,id:$?R:void 0,name:z,onChange:O,readOnly:I,ref:v,required:j,ownerState:l,tabIndex:E,type:i,...i==="checkbox"&&g===void 0?{}:{value:g},...P}),b?d:F]})});export{te as S};
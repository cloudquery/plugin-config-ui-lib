import{j as r}from"./jsx-runtime-DWbWqHZ-.js";import{a as k,b as x,s as m,d,m as h,v as w,p as f,w as $,x as C,e as S,k as y,l as T,C as j,F as z,y as R,g as B}from"./index-CwmUooIP.js";import{F}from"./FormControlLabel-CAUqNGEX.js";import{r as M}from"./index-l2PZgWEW.js";import{S as N}from"./SwitchBase-1nzuM3L1.js";import{C as I}from"./Checkbox-q0gVQpli.js";import"./index-CaNG7YX3.js";import"./iframe-B3BX2Lps.js";import"../sb-preview/runtime.js";import"./inheritsLoose-Wf0S0NFo.js";function O(e){return x("MuiSwitch",e)}const a=k("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),U=e=>{const{classes:t,edge:o,size:s,color:p,checked:i,disabled:n}=e,l={root:["root",o&&`edge${d(o)}`,`size${d(s)}`],switchBase:["switchBase",`color${d(p)}`,i&&"checked",n&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},c=T(l,O,t);return{...t,...c}},q=m("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.edge&&t[`edge${d(o.edge)}`],t[`size${d(o.size)}`]]}})({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${a.thumb}`]:{width:16,height:16},[`& .${a.switchBase}`]:{padding:4,[`&.${a.checked}`]:{transform:"translateX(16px)"}}}}]}),D=m(N,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.switchBase,{[`& .${a.input}`]:t.input},o.color!=="default"&&t[`color${d(o.color)}`]]}})(h(({theme:e})=>({position:"absolute",top:0,left:0,zIndex:1,color:e.vars?e.vars.palette.Switch.defaultColor:`${e.palette.mode==="light"?e.palette.common.white:e.palette.grey[300]}`,transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),[`&.${a.checked}`]:{transform:"translateX(20px)"},[`&.${a.disabled}`]:{color:e.vars?e.vars.palette.Switch.defaultDisabledColor:`${e.palette.mode==="light"?e.palette.grey[100]:e.palette.grey[600]}`},[`&.${a.checked} + .${a.track}`]:{opacity:.5},[`&.${a.disabled} + .${a.track}`]:{opacity:e.vars?e.vars.opacity.switchTrackDisabled:`${e.palette.mode==="light"?.12:.2}`},[`& .${a.input}`]:{left:"-100%",width:"300%"}})),h(({theme:e})=>({"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:w(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(e.palette).filter(f(["light"])).map(([t])=>({props:{color:t},style:{[`&.${a.checked}`]:{color:(e.vars||e).palette[t].main,"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:w(e.palette[t].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${a.disabled}`]:{color:e.vars?e.vars.palette.Switch[`${t}DisabledColor`]:`${e.palette.mode==="light"?$(e.palette[t].main,.62):C(e.palette[t].main,.55)}`}},[`&.${a.checked} + .${a.track}`]:{backgroundColor:(e.vars||e).palette[t].main}}}))]}))),E=m("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,t)=>t.track})(h(({theme:e})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:e.vars?e.vars.palette.common.onBackground:`${e.palette.mode==="light"?e.palette.common.black:e.palette.common.white}`,opacity:e.vars?e.vars.opacity.switchTrack:`${e.palette.mode==="light"?.38:.3}`}))),P=m("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,t)=>t.thumb})(h(({theme:e})=>({boxShadow:(e.vars||e).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),V=M.forwardRef(function(t,o){const s=S({props:t,name:"MuiSwitch"}),{className:p,color:i="primary",edge:n=!1,size:l="medium",sx:c,...b}=s,u={...s,color:i,edge:n,size:l},g=U(u),v=r.jsx(P,{className:g.thumb,ownerState:u});return r.jsxs(q,{className:y(g.root,p),sx:c,ownerState:u,children:[r.jsx(D,{type:"checkbox",icon:v,checkedIcon:v,ref:o,ownerState:u,...b,classes:{...g,root:g.switchBase}}),r.jsx(E,{className:g.track,ownerState:u})]})});function A({name:e,label:t,type:o="toggle",helperText:s=""}){const p=o==="toggle"?V:I;return r.jsx(j,{name:e,render:({field:i,fieldState:n})=>{var l,c;return r.jsxs(z,{children:[r.jsx(F,{control:r.jsx(p,{checked:i.value,...i}),label:t}),r.jsx(R,{error:!!((l=n.error)!=null&&l.message),children:B((c=n.error)==null?void 0:c.message,s)})]})}})}A.__docgenInfo={description:`This component is a react-hook-form wrapper around the MUI Switch or Checkbox component.

@public`,methods:[],displayName:"ControlBooleanField",props:{name:{required:!0,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:"'toggle' | 'checkbox'",elements:[{name:"literal",value:"'toggle'"},{name:"literal",value:"'checkbox'"}]},description:"",defaultValue:{value:"'toggle'",computed:!1}},helperText:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"''",computed:!1}},label:{required:!0,tsType:{name:"ReactNode"},description:""}}};export{A as ControlBooleanField};
import{r as d}from"./index-l2PZgWEW.js";import{c as u,a as j,b as $,s as g,r as B,d as r,m as P,v as b,p as f,e as R,k as M,l as O}from"./index-CwmUooIP.js";import{S as w}from"./SwitchBase-1nzuM3L1.js";import{j as a}from"./jsx-runtime-DWbWqHZ-.js";const H=u(a.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),V=u(a.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),E=u(a.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function U(e){return $("MuiCheckbox",e)}const m=j("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),F=e=>{const{classes:o,indeterminate:t,color:s,size:n}=e,i={root:["root",t&&"indeterminate",`color${r(s)}`,`size${r(n)}`]},l=O(i,U,o);return{...o,...l}},L=g(w,{shouldForwardProp:e=>B(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.indeterminate&&o.indeterminate,o[`size${r(t.size)}`],t.color!=="default"&&o[`color${r(t.color)}`]]}})(P(({theme:e})=>({color:(e.vars||e).palette.text.secondary,variants:[{props:{color:"default",disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:b(e.palette.action.active,e.palette.action.hoverOpacity)}}},...Object.entries(e.palette).filter(f()).map(([o])=>({props:{color:o,disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:b(e.palette[o].main,e.palette.action.hoverOpacity)}}})),...Object.entries(e.palette).filter(f()).map(([o])=>({props:{color:o},style:{[`&.${m.checked}, &.${m.indeterminate}`]:{color:(e.vars||e).palette[o].main},[`&.${m.disabled}`]:{color:(e.vars||e).palette.action.disabled}}})),{props:{disableRipple:!1},style:{"&:hover":{"@media (hover: none)":{backgroundColor:"transparent"}}}}]}))),N=a.jsx(V,{}),D=a.jsx(H,{}),T=a.jsx(E,{}),K=d.forwardRef(function(o,t){const s=R({props:o,name:"MuiCheckbox"}),{checkedIcon:n=N,color:i="primary",icon:l=D,indeterminate:c=!1,indeterminateIcon:v=T,inputProps:z,size:p="medium",disableRipple:y=!1,className:I,...S}=s,x=c?v:l,h=c?v:n,C={...s,disableRipple:y,color:i,indeterminate:c,size:p},k=F(C);return a.jsx(L,{type:"checkbox",inputProps:{"data-indeterminate":c,...z},icon:d.cloneElement(x,{fontSize:x.props.fontSize??p}),checkedIcon:d.cloneElement(h,{fontSize:h.props.fontSize??p}),ownerState:C,ref:t,className:M(k.root,I),...S,classes:k})});export{K as C};
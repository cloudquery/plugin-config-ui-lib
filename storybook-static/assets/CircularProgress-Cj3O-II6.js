import{r as R}from"./index-l2PZgWEW.js";import{b as j,a as w,n as P,o as S,s as v,d as n,m as $,p as N,e as U,k as E,l as F}from"./index-CwmUooIP.js";import{j as f}from"./jsx-runtime-DWbWqHZ-.js";function I(e){return j("MuiCircularProgress",e)}w("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const t=44,g=P`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,h=P`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,z=typeof g!="string"?S`
        animation: ${g} 1.4s linear infinite;
      `:null,A=typeof h!="string"?S`
        animation: ${h} 1.4s ease-in-out infinite;
      `:null,K=e=>{const{classes:r,variant:s,color:a,disableShrink:l}=e,c={root:["root",s,`color${n(a)}`],svg:["svg"],circle:["circle",`circle${n(s)}`,l&&"circleDisableShrink"]};return F(c,I,r)},V=v("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${n(s.color)}`]]}})($(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:z||{animation:`${g} 1.4s linear infinite`}},...Object.entries(e.palette).filter(N()).map(([r])=>({props:{color:r},style:{color:(e.vars||e).palette[r].main}}))]}))),B=v("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),G=v("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${n(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})($(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink,style:A||{animation:`${h} 1.4s ease-in-out infinite`}}]}))),Z=R.forwardRef(function(r,s){const a=U({props:r,name:"MuiCircularProgress"}),{className:l,color:c="primary",disableShrink:b=!1,size:p=40,style:D,thickness:o=3.6,value:m=0,variant:y="indeterminate",...M}=a,i={...a,color:c,disableShrink:b,size:p,thickness:o,value:m,variant:y},d=K(i),u={},k={},x={};if(y==="determinate"){const C=2*Math.PI*((t-o)/2);u.strokeDasharray=C.toFixed(3),x["aria-valuenow"]=Math.round(m),u.strokeDashoffset=`${((100-m)/100*C).toFixed(3)}px`,k.transform="rotate(-90deg)"}return f.jsx(V,{className:E(d.root,l),style:{width:p,height:p,...k,...D},ownerState:i,ref:s,role:"progressbar",...x,...M,children:f.jsx(B,{className:d.svg,ownerState:i,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:f.jsx(G,{className:d.circle,style:u,ownerState:i,cx:t,cy:t,r:(t-o)/2,fill:"none",strokeWidth:o})})})});export{Z as C};

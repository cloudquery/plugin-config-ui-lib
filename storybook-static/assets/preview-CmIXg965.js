const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DocsRenderer-CFRXHY34-BnPGylNy.js","./iframe-B3BX2Lps.js","./index-l2PZgWEW.js","./index-PDqAdZhF.js","./jsx-runtime-DWbWqHZ-.js","./index-CaNG7YX3.js","./index-D-8MO0q_.js","./inheritsLoose-Wf0S0NFo.js","./index-ChFKi22U.js","./index-DrFu-skq.js","./react-18-C_YFyQpC.js","./client-S8pJADRZ.js"])))=>i.map(i=>d[i]);
import{_ as a}from"./iframe-B3BX2Lps.js";import"../sb-preview/runtime.js";const{global:s}=__STORYBOOK_MODULE_GLOBAL__;var _=Object.entries(s.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),d={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-CFRXHY34-BnPGylNy.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]),import.meta.url);return new e},stories:{filter:e=>{var r;return(e.tags||[]).filter(t=>_[t]).length===0&&!((r=e.parameters.docs)!=null&&r.disable)}}}};export{d as parameters};
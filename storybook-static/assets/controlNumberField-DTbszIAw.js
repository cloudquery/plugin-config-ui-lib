import{j as o}from"./jsx-runtime-DWbWqHZ-.js";import{C as l,T as m,g as u}from"./index-CwmUooIP.js";import"./index-l2PZgWEW.js";import"./index-CaNG7YX3.js";import"./iframe-B3BX2Lps.js";import"../sb-preview/runtime.js";import"./inheritsLoose-Wf0S0NFo.js";function d({name:n,label:i,helperText:p="",textFieldProps:a={}}){return o.jsx(l,{name:n,render:({field:s,fieldState:e})=>{var r;return o.jsx(m,{error:!!e.error,fullWidth:!0,helperText:u((r=e.error)==null?void 0:r.message,p),label:i,...s,...a,type:"number",onWheel:t=>t.target instanceof HTMLElement&&t.target.blur(),sx:{"input::-webkit-inner-spin-button":{"-webkit-appearance":"none",margin:0},input:{"-moz-appearance":"textfield"}}})}})}d.__docgenInfo={description:`This component is a react-hook-form wrapper around the MUI Textfield number component.

@public`,methods:[],displayName:"ControlNumberField",props:{name:{required:!0,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"''",computed:!1}},label:{required:!0,tsType:{name:"ReactNode"},description:""},textFieldProps:{required:!1,tsType:{name:"TextFieldProps"},description:"",defaultValue:{value:"{}",computed:!1}}}};export{d as ControlNumberField};
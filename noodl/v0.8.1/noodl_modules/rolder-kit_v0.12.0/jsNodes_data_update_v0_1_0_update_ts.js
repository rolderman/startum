(self.webpackChunkrolder_kit=self.webpackChunkrolder_kit||[]).push([["jsNodes_data_update_v0_1_0_update_ts"],{775655:function(e,t,u){"use strict";u.r(t),u.d(t,{default:function(){return s}});var n=u("858260");async function s(e){e.setOutputs({updating:!0}),(0,n.default)(e.inputs.updateItem).then(t=>{e.setOutputs({updating:!1,updatedItem:t}),e.sendSignalOnOutput("updated")})}},858260:function(e,t,u){"use strict";u.r(t),u.d(t,{default:function(){return o}});var n=u("217791"),s=u("995929"),d=u("751616");let a=async({dbClass:e,id:t,body:u})=>{let a=window.Kuzzle,{debug:o,dbClasses:r}=window.Rolder,i=(0,n.dbVersion)(),l=(0,n.dbClassVersion)(e);return o>0&&console.time(l+" update time"),o>1&&console.log(l+" props:",{dbClass:e,id:t,body:u}),a.connect().then(()=>a.document.update(i,l,t,u,{refresh:"wait_for"}).then(t=>{!r[e].subscribe&&d.default.invalidate({dbClass:e});let u=(0,n.convertKuzzleResponse)(t);return o>1&&console.log(l+" updated:",u),o>0&&console.timeEnd(l+" update time"),u}).catch(e=>(0,s.default)({title:"Системная ошибка!",message:"Kuzzle update "+l+": "+e.message})))};var o=a}}]);
//# sourceMappingURL=jsNodes_data_update_v0_1_0_update_ts.js.map
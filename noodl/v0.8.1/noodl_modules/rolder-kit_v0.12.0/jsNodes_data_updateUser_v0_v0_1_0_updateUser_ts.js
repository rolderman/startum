(self.webpackChunkrolder_kit=self.webpackChunkrolder_kit||[]).push([["jsNodes_data_updateUser_v0_v0_1_0_updateUser_ts"],{555866:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return d}});var u=a("735744"),r=a("984908"),d={updateUser:e=>{let{userItem:t}=e._inputValues;(0,u.sendOutput)({noodlNode:e,portName:"updating",value:!0}),(0,r.default)({id:t.id,body:t.body,options:{refresh:"wait_for"}}),(0,u.sendSignal)({noodlNode:e,portName:"updated"}),(0,u.sendOutput)({noodlNode:e,portName:"updating",value:!1})}}},984908:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return s}});var u=a("516244"),r=a("995929");let d=async(e,t,a)=>{let d=window.Kuzzle;return(0,u.default)("UpdateUser","time"),(0,u.default)(["Props: ",{id:e,body:t,options:a}]),d.connect().then(()=>d.security.updateCredentials("local",e,t.credentials.local).then(()=>d.security.updateUser(e,t,a)).catch(e=>(0,r.default)({title:"Системная ошибка!",message:"Kuzzle updateUser : "+e.message})))};var s=d}}]);
//# sourceMappingURL=jsNodes_data_updateUser_v0_v0_1_0_updateUser_ts.js.map
webpackJsonp([10],{190:function(e,t,a){a(488);var r=a(84)(a(362),a(514),null,null);e.exports=r.exports},216:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(50),o=a.n(r),n=a(49),s=a.n(n),l=a(51),i=a.n(l),c=a(85),u=a(86),m=a(87);t.default={data:function(){return{baseImgPath:u.a}},created:function(){this.adminInfo.id||this.getAdminData()},computed:i()({},a.i(m.b)(["adminInfo"])),methods:i()({},a.i(m.c)(["getAdminData"]),{handleCommand:function(e){var t=this;return s()(o.a.mark(function r(){var n;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if("home"!=e){r.next=4;break}t.$router.push("/manage"),r.next=9;break;case 4:if("signout"!=e){r.next=9;break}return r.next=7,a.i(c.b)();case 7:n=r.sent,1==n.status?(t.$message({type:"success",message:"退出成功"}),t.$router.push("/")):t.$message({type:"error",message:n.message});case 9:case"end":return r.stop()}},r,t)}))()}})}},217:function(e,t,a){t=e.exports=a(187)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#eff2f7;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.avator{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}",""])},218:function(e,t,a){var r=a(217);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(188)("24ad6d9e",r,!0)},219:function(e,t,a){a(218);var r=a(84)(a(216),a(220),null,null);e.exports=r.exports},220:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[e._v("首页")]),e._v(" "),e._l(e.$route.meta,function(t,r){return a("el-breadcrumb-item",{key:r},[e._v(e._s(t))])})],2),e._v(" "),a("el-dropdown",{attrs:{"menu-align":"start"},on:{command:e.handleCommand}},[a("img",{staticClass:"avator",attrs:{src:e.baseImgPath+e.adminInfo.avatar}}),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"home"}},[e._v("首页")]),e._v(" "),a("el-dropdown-item",{attrs:{command:"signout"}},[e._v("退出")])],1)],1)],1)},staticRenderFns:[]}},362:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(88),o=a.n(r),n=a(50),s=a.n(n),l=a(49),i=a.n(l),c=a(219),u=a.n(c),m=a(85),f=a(86);t.default={data:function(){return{city:{},formData:{id:"",carNo:"",infoSource:"",acquireTime:"",isValidClue:0,reportRegion:"",isSubscriber:0,brand:"",model:"",remark:"",nextProcessor:""},addProcessInfo:{carNo:"",clueCollectionerId:"",nowProcessorId:""},rules:{carNo:[{required:!0,message:"请输入车牌号!",trigger:"blur"}]},activityValue:"满减优惠",activities:[{icon_name:"减",name:"满减优惠",description:"满30减5，满60减8"}],baseUrl:f.b,baseImgPath:f.a,nextProcessor:[],selectedCategory:["快餐便当","简餐"],validAttributes:[{value:0,label:"否"},{value:1,label:"是"}]}},components:{headTop:u.a},mounted:function(){this.initData()},methods:{initData:function(){var e=this;return i()(s.a.mark(function t(){var r,o;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.i(m.B)("{'deaprtment':1}");case 3:return r=t.sent,console.log(r),r.forEach(function(t){var a={value:t.id,label:t.realName};e.nextProcessor.push(a)}),console.log(e.nextProcessor),t.next=9,a.i(m.s)();case 9:o=t.sent,o.forEach(function(t){if(t.sub_categories.length){var a={value:t.name,label:t.name,children:[]};t.sub_categories.forEach(function(e,t){0!=t&&a.children.push({value:e.name,label:e.name})}),e.categoryOptions.push(a)}}),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),console.log(t.t0);case 16:case"end":return t.stop()}},t,e,[[0,13]])}))()},querySearchAsync:function(e,t){var a=this;return i()(s.a.mark(function r(){var o;return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!e){r.next=11;break}return r.prev=1,r.next=4,searchplace(a.city.id,e);case 4:o=r.sent,o instanceof Array&&(o.map(function(e){return e.value=e.address,e}),t(o)),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),console.log(r.t0);case 11:case"end":return r.stop()}},r,a,[[1,8]])}))()},addressSelect:function(e){this.formData.latitude=e.latitude,this.formData.longitude=e.longitude,console.log(this.formData.latitude,this.formData.longitude)},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=i()(s.a.mark(function e(r){var n,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=28;break}return o()(t.formData,{activities:t.activities},{category:t.selectedCategory.join("/")}),e.prev=2,t.addProcessInfo.carNo=t.formData.carNo,t.addProcessInfo.nowProcessorId=t.formData.nextProcessor,t.addProcessInfo.clueCollectionerId=sessionStorage.getItem("userId"),e.next=8,a.i(m.C)(t.addProcessInfo);case 8:n=e.sent,"success"===n.result?t.formData.id=n.processInfo.id:t.$message({type:"error",message:"请稍后再试!"}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),console.log(e.t0);case 15:return e.prev=15,e.next=18,a.i(m.D)(t.formData);case 18:l=e.sent,"success"===l.result?(t.$message({type:"success",message:"添加成功"}),t.formData={carNo:"",infoSource:"",acquireTime:"",isValidClue:0,reportRegion:"",isSubscriber:0,brand:"",model:"",remark:""}):t.$message({type:"error",message:l.message}),console.log(l),e.next=26;break;case 23:e.prev=23,e.t1=e.catch(15),console.log(e.t1);case 26:e.next=30;break;case 28:return t.$notify.error({title:"错误",message:"请检查输入是否正确",offset:100}),e.abrupt("return",!1);case 30:case"end":return e.stop()}},e,t,[[2,12],[15,23]])}));return function(t){return e.apply(this,arguments)}}())}}}},395:function(e,t,a){t=e.exports=a(187)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.button_submit{text-align:center}.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#20a0ff}.avatar-uploader-icon{font-size:28px;color:#8c939d;width:120px;height:120px;line-height:120px;text-align:center}.avatar{width:120px;height:120px;display:block}.el-table .info-row{background:#c9e5f5}.el-table .positive-row{background:#e2f0e4}",""])},488:function(e,t,a){var r=a(395);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(188)("1d48c1f4",r,!0)},514:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("head-top"),e._v(" "),a("el-row",{staticStyle:{"margin-top":"20px"}},[a("el-col",{attrs:{span:12,offset:4}},[a("el-form",{ref:"formData",staticClass:"demo-formData",attrs:{model:e.formData,rules:e.rules,"label-width":"110px"}},[a("el-form-item",{attrs:{label:"车牌号",prop:"carNo"}},[a("el-input",{model:{value:e.formData.carNo,callback:function(t){e.$set(e.formData,"carNo",t)},expression:"formData.carNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"信息来源"}},[a("el-input",{model:{value:e.formData.infoSource,callback:function(t){e.$set(e.formData,"infoSource",t)},expression:"formData.infoSource"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"获取线索时间","aria-placeholder":"格式:yyyy-mm-dd"}},[a("el-input",{model:{value:e.formData.acquireTime,callback:function(t){e.$set(e.formData,"acquireTime",t)},expression:"formData.acquireTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否有效线索"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.isValidClue,callback:function(t){e.$set(e.formData,"isValidClue",t)},expression:"formData.isValidClue"}},e._l(e.validAttributes,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"客户报案区域",prop:"description"}},[a("el-input",{model:{value:e.formData.region,callback:function(t){e.$set(e.formData,"region",t)},expression:"formData.region"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"客户报案时间",prop:"description"}},[a("el-input",{model:{value:e.formData.clientReprtTime,callback:function(t){e.$set(e.formData,"clientReprtTime",t)},expression:"formData.clientReprtTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"自店保险客户?"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.isSubscriber,callback:function(t){e.$set(e.formData,"isSubscriber",t)},expression:"formData.isSubscriber"}},e._l(e.validAttributes,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌","aria-placeholder":"格式:yyyy-mm-dd"}},[a("el-input",{model:{value:e.formData.brand,callback:function(t){e.$set(e.formData,"brand",t)},expression:"formData.brand"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"车型","aria-placeholder":"格式:yyyy-mm-dd"}},[a("el-input",{model:{value:e.formData.model,callback:function(t){e.$set(e.formData,"model",t)},expression:"formData.model"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注:","aria-placeholder":"格式:yyyy-mm-dd"}},[a("el-input",{model:{value:e.formData.remark,callback:function(t){e.$set(e.formData,"remark",t)},expression:"formData.remark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"下一步办理人"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.nextProcessor,callback:function(t){e.$set(e.formData,"nextProcessor",t)},expression:"formData.nextProcessor"}},e._l(e.nextProcessor,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{staticClass:"button_submit"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("formData")}}},[e._v("立即创建")])],1)],1)],1)],1)],1)},staticRenderFns:[]}}});
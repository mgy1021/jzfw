(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2167520f"],{"01ea":function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return i}));var r={waiter:1,admin:2,customer:6},s="http://121.199.29.84:8888/group1/",i="http://121.199.29.84:5588/file/upload"},"4b2e":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"top"},[a("div",{staticClass:"tp"},[a("img",{staticClass:"photo",attrs:{src:e.userdata.userFace}}),e._v(" "),a("el-button",{staticClass:"userface",attrs:{type:"text"},on:{click:e.toChangeTwo}},[e._v("修改头像")])],1),e._v(" "),a("el-dialog",{attrs:{title:"更改头像",visible:e.visibleTwo},on:{"update:visible":function(t){e.visibleTwo=t},close:e.toClose}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadFileURL,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visibleTwo=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.toSaveTwo}},[e._v("确定修改")])],1)],1)],1),e._v(" "),a("el-divider"),e._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"item"},[a("div",[a("label",[e._v("登录用户")]),e._v(" "),a("span",{staticClass:"itemTwo"},[e._v(e._s(e.userdata.username))])]),e._v(" "),a("div",[a("label",[e._v("用户姓名")]),a("span",{staticClass:"itemTwo"},[e._v(e._s(e.userdata.realname))])]),e._v(" "),a("div",[a("label",[e._v("用户手机")]),a("span",{staticClass:"itemTwo"},[e._v(e._s(e.userdata.telephone))])]),e._v(" "),a("div",[a("label",[e._v("用户性别")]),a("span",{staticClass:"itemTwo"},[e._v(e._s(e.userdata.gender))])]),e._v(" "),a("div",[a("label",[e._v("用户角色")]),a("span",{staticClass:"itemTwo"},[e._v(e._s(e.userdata.idCard))])]),e._v(" "),a("div",[a("label",[e._v("用户生日")]),a("span",{staticClass:"itemTwo"},[e._v(e._s(e.userdata.birth))])]),e._v(" "),a("div",[a("label",[e._v("注册时间")]),a("span",{staticClass:"itemTwo"},[e._v(e._s(e.userdata.registertime))])]),e._v(" "),a("div",[a("label",[e._v("邮箱")]),a("span",{staticClass:"itemTwo"},[e._v(e._s(e.userdata.email))])]),e._v(" "),a("div",[a("label",[e._v("用户状态")]),a("el-tag",{staticClass:"itemTwo",attrs:{type:"正常"===e.userdata.status?"success":"danger"}},[e._v(e._s(e.userdata.status))])],1)]),e._v(" "),a("el-divider"),e._v(" "),a("div",{staticClass:"right"},[a("el-button",{attrs:{type:"text"},on:{click:e.toChange}},[e._v("修改个人信息")])],1)],1),e._v(" "),a("div",[a("el-dialog",{attrs:{title:"修改员工信息",visible:e.visible},on:{"update:visible":function(t){e.visible=t},close:e.toClose}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"登录用户",prop:"username"}},[a("el-input",{model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名",prop:"realname"}},[a("el-input",{model:{value:e.form.realname,callback:function(t){e.$set(e.form,"realname",t)},expression:"form.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别",prop:"gender"}},[a("el-radio-group",{model:{value:e.form.gender,callback:function(t){e.$set(e.form,"gender",t)},expression:"form.gender"}},[a("el-radio",{attrs:{label:"male"}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:"female"}},[e._v("女")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"用户手机",prop:"telephone"}},[a("el-input",{model:{value:e.form.telephone,callback:function(t){e.$set(e.form,"telephone",t)},expression:"form.telephone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户邮箱",prop:"email"}},[a("el-input",{model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"出生日期",prop:"dob"}},[a("el-input",{model:{value:e.form.registerTime,callback:function(t){e.$set(e.form,"registerTime",t)},expression:"form.registerTime"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.toSave}},[e._v("确 定")])],1)],1)],1)],1)},s=[],i=(a("6a61"),a("99a5")),o=a("c24f"),l=a("01ea"),n={data:function(){return{visibleTwo:!1,showFileURL:l["b"],uploadFileURL:l["c"],imageUrl:"",userdata:[],visible:!1,form:{},rules:{realname:[{required:!0,message:"请输入姓名",trigger:"blur"}],gender:[{required:!0,message:"请输入性别",trigger:"blur"}]}}},computed:{},created:function(){this.toQuery()},mounted:function(){},methods:{toSaveTwo:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["b"])({id:this.$route.query.id,userface:this.form.userFace});case 2:t=e.sent,this.toQuery(),this.visibleTwo=!1,this.$notify.success({title:"成功",message:t.message});case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),toChangeTwo:function(){this.visibleTwo=!0},toQuery:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["d"])({id:this.$route.query.id});case 2:t=e.sent,this.userdata=t.data;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),toChange:function(){this.visible=!0,this.form=this.userdata},toClose:function(){},toSave:function(){var e=this;this.$refs["ruleForm"].validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=8;break}return t.next=3,Object(o["i"])(e.form);case 3:r=t.sent,e.$notify.success({title:"成功",message:r.message}),e.visible=!1,t.next=9;break;case 8:return t.abrupt("return",!1);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},handleAvatarSuccess:function(e,t){this.imageUrl=URL.createObjectURL(t.raw),this.form.userFace=l["b"]+e.data.id},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type,a=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),a||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&a}}},u=n,c=(a("7309"),a("4ac2")),v=Object(c["a"])(u,r,s,!1,null,"0e8d7eb4",null);t["default"]=v.exports},7309:function(e,t,a){"use strict";a("9971")},9971:function(e,t,a){}}]);
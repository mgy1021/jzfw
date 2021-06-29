<template>
  <!-- 个人信息页面 -->
  <div>
    <!-- {{ userdata }} -->
    <!-- //*******************************头像 *******************************************-->
    <div class="toux-s">
      <el-row class="demo-avatar demo-basic" :data="userdata">
        <el-col :span="12">
          <div class="toux">
            <el-avatar shape="circle" :size="70" :src="userdata.userFace" />
          </div>
        </el-col>
      </el-row>
      <div class="text-btn">
        <el-button type="text" @click="toReplace">修改你的头像</el-button>
      </div>
    </div>
    <!-- //*******************************头像 *******************************************-->

    <!-- //*******************************更换头像模态框 **********************************-->
    <el-dialog :title="title" :visible.sync="visible" width="45%" class="motai1" @close="toClose">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item prop="userface">
          <el-upload
            class="avatar-uploader"
            :action="uploadFileURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button style="margin-right: 420px" @click="toReset">重置</el-button>
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSavechange">确定更换</el-button>
      </span>
    </el-dialog>
    <!-- //*******************************更换头像模态框 **********************************-->
    <!-- {{ userdata }} -->
    <!-- {{ user }} -->
    <!-- <br />
    <br />
    <br />-->
    <!-- {{ tabledata }} -->
    <br />
    <br />
    <!-- {{ tabledata.roles }} -->
    <!-- {{ tabledata.roles[0].name }} -->
    <!-- //个人信息展示 -->
    <div class="personal">
      <!-- 横向展示个人信息 -->
      <!-- <el-table :data="tabledata" style="width: 100%">
        <el-table-column prop="username" label="登录用户" width="180">
        </el-table-column>
        <el-table-column prop="realname" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="telephone" label="手机"> </el-table-column>
        <el-table-column prop="gender" label="性别"> </el-table-column>
        <el-table-column prop="roles.name" label="角色"> </el-table-column>
        <el-table-column prop="birth" label="生日"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
      </el-table>-->

      <!-- //*******************************个人信息展示 **********************************-->
      <ul class="msg">
        <li>登录用户</li>
        <li>你的姓名</li>
        <li>你的手机</li>
        <li>你的性别</li>
        <li>你的角色</li>
        <li>你的生日</li>
        <li>注册时间</li>
        <li>你的邮箱</li>
        <li>你的状态</li>
      </ul>
      <ul class="t-data">
        <li style="font-family: 'Kristen ITC'">&nbsp;{{ tabledata.username }}</li>
        <li>&nbsp;{{ tabledata.realname }}</li>
        <li style="font-family: 'Bauhaus 93'">&nbsp;{{ tabledata.telephone }}</li>
        <li>
          &nbsp;{{ tabledata.gender == "male" ? "男" : "女" }}
          <!-- <el-tag :type="tabledata.gender === 'male' ? 'success' : 'danger'">{{
            tabledata.gender
          }}</el-tag>-->
          <i v-if="tabledata.gender === 'male'" style="color: #05abef" class="el-icon-male" />
          <i
            v-else-if="tabledata.gender === 'female'"
            style="color: #eb158b"
            class="el-icon-female"
          />
        </li>
        <li>&nbsp;{{ tabledata.roles[0].name }}</li>
        <li
          style="font-family: 'Bauhaus 93'"
        >&nbsp;{{ moment(tabledata.birth).format("YYYY-MM-DD") }}</li>
        <li
          style="font-family: 'Bauhaus 93'"
        >&nbsp;{{ moment(tabledata.registerTime).format("YYYY-MM-DD") }}</li>
        <li>&nbsp;{{ tabledata.email }}</li>
        <el-tag
          style="margin-top: -3px"
          :type="tabledata.status === '正常' ? 'success' : 'danger'"
        >{{ tabledata.status }}</el-tag>
      </ul>
    </div>
    <!-- //*******************************个人信息展示 **********************************-->

    <!-- *****************************修改当前用户信息********************************** -->
    <div class="reset-btn">
      <el-button type="text" @click="toReinfo">请修改个人信息</el-button>
    </div>
    <div>
      <el-dialog width="47%" :title="title" :visible.sync="ownVisible" @close="toClose">
        <!-- {{ userdata.username }} -->
        <!-- {{ info }} -->
        <el-form ref="ruleForm" :model="info" :rules="rulest">
          <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
            <el-input v-model="info.username" disabled autocomplete="off" />
          </el-form-item>
          <el-form-item prop="realname" label="姓名" :label-width="formLabelWidth">
            <el-input v-model="info.realname" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
            <el-radio v-model="info.gender" label="male">男</el-radio>
            <el-radio v-model="info.gender" label="female">女</el-radio>
          </el-form-item>
          <el-form-item prop="telephone" label="手机" :label-width="formLabelWidth">
            <el-input v-model="info.telephone" autocomplete="off" />
          </el-form-item>

          <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="info.email" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="birth" label="出生日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="info.birth"
              value-format="timestamp"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button style="margin-right: 455px" @click="toReset2">重置</el-button>
          <el-button @click="ownVisible = false">取 消</el-button>
          <el-button type="primary" @click="toSureinfo">确定修改</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- *****************************修改当前用户信息********************************** -->

    <!-- ****************************纸飞机动态图*********************************** -->
    <div class="tp">
      <div class="frame">
        <div class="plane-container">
          <a href="http://customer.io/" target="_blank">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="1131.53px"
              height="379.304px"
              viewBox="0 0 1131.53 379.304"
              enable-background="new 0 0 1131.53 379.304"
              xml:space="preserve"
              class="plane"
            >
              <polygon
                fill="#D8D8D8"
                points="72.008,0 274.113,140.173 274.113,301.804 390.796,221.102 601.682,367.302 1131.53,0.223  "
              />
              <polygon
                fill="#C4C4C3"
                points="1131.53,0.223 274.113,140.173 274.113,301.804 390.796,221.102   "
              />
            </svg>
          </a>
        </div>
      </div>
      <div class="clouds">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="762px"
          height="331px"
          viewBox="0 0 762 331"
          enable-background="new 0 0 762 331"
          xml:space="preserve"
          class="cloud big front slowest"
        >
          <path
            fill="#FFFFFF"
            d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
            c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
            C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
            S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
          />
        </svg>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="762px"
          height="331px"
          viewBox="0 0 762 331"
          enable-background="new 0 0 762 331"
          xml:space="preserve"
          class="cloud distant smaller"
        >
          <path
            fill="#FFFFFF"
            d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
            c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
            C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
            S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
          />
        </svg>

        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="762px"
          height="331px"
          viewBox="0 0 762 331"
          enable-background="new 0 0 762 331"
          xml:space="preserve"
          class="cloud small slow"
        >
          <path
            fill="#FFFFFF"
            d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
            c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
            C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
            S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
          />
        </svg>

        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="762px"
          height="331px"
          viewBox="0 0 762 331"
          enable-background="new 0 0 762 331"
          xml:space="preserve"
          class="cloud distant super-slow massive"
        >
          <path
            fill="#FFFFFF"
            d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
            c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
            C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
            S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
          />
        </svg>

        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="762px"
          height="331px"
          viewBox="0 0 762 331"
          enable-background="new 0 0 762 331"
          xml:space="preserve"
          class="cloud slower"
        >
          <path
            fill="#FFFFFF"
            d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
            c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
            C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
            S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
          />
        </svg>
      </div>
    </div>
    <!-- ****************************纸飞机动态图*********************************** -->
  </div>
</template>

<script>
import { alterUserface, saveOrUpdate } from "@/api/user";
import { showFileURL, uploadFileURL } from "@/utils/config";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      moment,
      userdata: [],
      title: "",
      visible: false,
      form: { userface: "" },
      showFileURL,
      uploadFileURL,
      imageUrl: "",
      rules: {
        userface: [
          {
            required: true,
            message: "请上传头像",
          },
        ],
      },
      tabledata: [],
      ownVisible: false,
      formLabelWidth: "80px",
      info: {},
      rulest: {
        realname: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: true,
          },
        ],
        telephone: [
          // {
          // type: "number",
          //   message: "请输入 11位数字值的手机号码111",
          //   trigger: "change",
          // },
          {
            // trigger: "change",
            min: 11,
            max: 11,
            message: "请输入 11位数字值的手机号码",
            trigger: "blur",
          },
        ],
        email: [
          { message: "请输入邮箱地址", trigger: "focus" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.queryUserdate();
    // console.log(this.user);
    // console.log(this.user.id);
  },
  mounted() {},
  methods: {
    queryUserdate() {
      // let res = await findUserDetailsById({ id });
      // this.userdata = res.data;
      this.userdata = this.user;
      this.tabledata = this.user;

      // console.log(this.tabledata.roles[0].name);
      // for (let key in this.tabledata) {
      //   ...tabledata.
      //   console.log(key);
      // }
    },
    toReplace() {
      this.imageUrl = "";
      this.title = "更换头像";
      this.visible = true;
    },
    toClose() {
      this.$refs.ruleForm.resetFields();
    },
    toReset() {
      this.form = "";
      this.imageUrl = "";
    },
    toSavechange() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.form.id = this.user.id;
          const res = await alterUserface(this.form);
          // this.user = this.res
          // console.log(res);
          this.$notify.success({
            title: "更换成功",
            message: res.message,
          });
          // this.userdata.userFace = this.form.userface;
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          this.visible = false;
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.userface = showFileURL + res.data.id;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    toReinfo() {
      this.title = "修改你的信息";
      this.info = this.tabledata;
      this.ownVisible = true;
    },
    toReset2() {
      this.info.realname = "";
      this.info.telephone = "";
      this.info.email = "";
      // this.info = "";
    },
    toSureinfo() {
      this.$confirm("此操作将修改你的个人信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await saveOrUpdate(this.info);
          // console.log(res);
          this.queryUserdate();
          this.ownVisible = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
  },
};
</script>

<style scoped>
.toux-s {
  border-bottom: 1px solid rgba(170, 170, 180, 0.267);
}
.toux {
  margin: 12px 0px 5px 50px;
}
.text-btn {
  margin-left: 50px;
  z-index: 99;
  position: relative;

  /* position: relative; */
}
.motai1 {
  margin-top: 50px;
}

/* ****************************更换头像样式 ******************************/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  /* position: relative; */
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/* ***********************************个人信息样式 */
.msg {
  float: left;
  margin-left: 30px;
  animation: bounceInLeft 1s 0.3s ease both;
}
.msg li:nth-child(n) {
  margin-bottom: 20px;
}
.t-data {
  margin-left: 100px;
  /* float: left; */
  animation: bothInLeft 1s 0.7s ease both;
  color: #5f5faf;
}
.t-data li:nth-child(n) {
  margin-bottom: 20px;
}
/* .person {
  margin: 30px 0px 0px 15px;
} */
/* li:nth-child(n) {
  margin: 0px 0px 20px 0px;
} */
.personal {
  /* animation: bounceInLeft 1s 0.3s ease both; */
  font-family: "华光行楷_CNKI";
  font-weight: 700;
  font-size: 13px;
  color: #606266;
  z-index: 9;
  position: relative;
}

@keyframes bounceInLeft {
  0% {
    opacity: 0;
    transform: translateX(-2000px);
  }

  60% {
    opacity: 1;
    transform: translateX(30px);
  }

  80% {
    transform: translateX(-10px);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes bothInLeft {
  0% {
    opacity: 0;
    transform: translateX(-2000px);
  }

  60% {
    opacity: 1;
    transform: translateX(30px);
  }

  80% {
    transform: translateX(-10px);
  }

  100% {
    transform: translateX(0);
  }
}

/* ******************************修改个人信息文本样式按钮样式 */
.reset-btn {
  position: relative;
  /* float: right; */
  /* padding-top: 140px; */
  /* padding-left: 1170px; */
  border-top: 1px solid rgb(244, 244, 244);
  margin-top: 140px;
  text-align: right;
  padding-right: 100px;
  z-index: 9;
  /* background-color: palegreen; */
}
/* .el-dialog__header {
  color: #2cb5ac;
} */
/* ***********************************模态框脚下样式 */
.dialog-footer {
  padding-top: 20px;
  border-top: 1px solid #2cb5ac;
}

/* ****************背景动态图样式******************************************************* */
.tp {
  background-color: #85b9dd;

  width: 1300px;
  height: 469px;
  /* float: left; */
  margin-top: -500px;
  opacity: 0.7;

  z-index: 9999;
}

/* .frame,
.plane-container,
.plane,
.clouds,
.cloud big front slowest,
.cloud distant smaller,
.cloud small slow,
.cloud distant super-slow massive,
.cloud slower {
  position: relative;
} */

/* * {
  position: relative;
} */

.frame {
  width: 500px;
  height: auto;
  margin: 15% auto 0;
  position: absolute;
  width: 100%;
}

svg {
  max-width: 100%;
  height: auto;
  display: block;
}

/**
 * Paper Plane
 */
/*Paper Plane: Container*/
.plane-container {
  width: 200px;
  margin: 0px auto;
  z-index: 3;
}

/*Paper Plane: Image*/
.plane {
  width: 100%;
  height: 60px;
}

/*Paper Plane: Animation*/
.plane-container {
  -webkit-animation: paper-plane-scoping 2s alternate infinite;
  -moz-animation: paper-plane-scoping 2s alternate infinite;
  animation: paper-plane-scoping 2s alternate infinite;

  -webkit-animation-timing-function: linear;
  -moz-animation-timing-function: linear;
  animation-timing-function: linear;
}

@keyframes paper-plane-scoping {
  0% {
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    transform: translateY(0px);
  }

  100% {
    -webkit-transform: translateY(100px);
    -moz-transform: translateY(100px);
    transform: translateY(100px);
  }
}

.plane {
  -webkit-animation-timing-function: ease-in-out;
  -moz-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;

  -webkit-animation: paper-plane-soaring 4s forwards infinite;
  -moz-animation: paper-plane-soaring 4s forwards infinite;
  animation: paper-plane-soaring 4s forwards infinite;
}

@keyframes paper-plane-soaring {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  40% {
    -webkit-transform: rotate(15deg);
    -moz-transform: rotate(15deg);
    transform: rotate(15deg);
  }

  50% {
    -webkit-transform: rotate(15deg);
    -moz-transform: rotate(15deg);
    transform: rotate(15deg);
  }

  60% {
    -webkit-transform: rotate(-10deg);
    -moz-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }

  70% {
    -webkit-transform: rotate(-10deg);
    -moz-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }

  100% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}

/**
 * Clouds
 */
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  transform: translateZ(0);
}

.cloud {
  position: absolute;
  top: 20%;
  width: 300px;
  right: 0;
  opacity: 1;
}

.cloud.front {
  z-index: 9;
}

.cloud.distant {
  z-index: 1;
}

.cloud.background {
  z-index: 1;
}

/*Cloud Sizing*/
.cloud.smaller {
  margin-right: 400px;
  width: 100px;
  margin-top: 50px;
}

.cloud.small {
  margin-right: 200px;
  width: 150px;
}

.cloud.big {
  width: 500px;
  margin-top: 50px;
  margin-right: 150px;
}

.cloud.massive {
  width: 600px;
  margin-top: 20px;
  margin-right: 0px;
}

/*Cloud: Animation*/
.cloud {
  -webkit-animation-name: cloud-movement;
  -webkit-animation-timing-function: linear;
  -webkit-animation-direction: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 8s;

  -moz-animation-name: cloud-movement;
  -moz-animation-timing-function: linear;
  -moz-animation-direction: forwards;
  -moz-animation-iteration-count: infinite;
  -moz-animation-duration: 8s;

  animation-name: cloud-movement;
  animation-timing-function: linear;
  animation-direction: forwards;
  animation-iteration-count: infinite;
  animation-duration: 8s;
}

.slow {
  -webkit-animation-duration: 9.2s;
  -moz-animation-duration: 9.2s;
  animation-duration: 9.2s;
}

.slower {
  -webkit-animation-duration: 11.2s;
  -moz-animation-duration: 11.2s;
  animation-duration: 11.2s;
}

.slowest {
  -webkit-animation-duration: 13.5s;
  -moz-animation-duration: 13.5s;
  animation-duration: 13.5s;
}

.super-slow {
  -webkit-animation-duration: 20.5s;
  -moz-animation-duration: 20.5s;
  animation-duration: 20.5s;
}

@keyframes cloud-movement {
  0% {
    opacity: 0.1;
    -webkit-transform: translateX(300px);
    -moz-transform: translateX(300px);
    transform: translateX(300px);
  }

  10% {
    opacity: 0.7;
  }

  90% {
    opacity: 0;
  }

  100% {
    opacity: 0;
    -webkit-transform: translateX(-1000px);
    -moz-transform: translateX(-1000px);
    transform: translateX(-1000px);
  }
}
</style>

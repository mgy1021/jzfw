<!--
 * @Description: 
 * @Author: ljy
 * @Date: 2021-06-24 16:23:07
 * @LastEditors: ljy
 * @LastEditTime: 2021-06-27 09:19:36
-->
<template>
  <div>
    <div class="top">
      <div class="tp">
        <img :src="userdata.userFace" class="photo" />
        <el-button type="text" @click="toChangeTwo" class="userface"
          >修改头像</el-button>
      </div>

      <el-dialog title="更改头像" :visible.sync="visibleTwo" @close="toClose">
        <!-- {{ form }} -->
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-upload
            class="avatar-uploader"
            :action="uploadFileURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visibleTwo = false">取消</el-button>
          <el-button type="primary" @click="toSaveTwo">确定修改</el-button>
        </div>
      </el-dialog>
    </div>
    <el-divider></el-divider>
    <div class="content">
      <div class="item">
        <div>
          <label>登录用户</label>
          <span class="itemTwo">{{ userdata.username }}</span>
        </div>
        <div>
          <label>用户姓名</label
          ><span class="itemTwo">{{ userdata.realname }}</span>
        </div>
        <div>
          <label>用户手机</label
          ><span class="itemTwo">{{ userdata.telephone }}</span>
        </div>
        <div>
          <label>用户性别</label
          ><span class="itemTwo">{{ userdata.gender }}</span>
        </div>
        <div>
          <label>用户角色</label
          ><span class="itemTwo">{{ userdata.idCard }}</span>
        </div>
        <div>
          <label>用户生日</label
          ><span class="itemTwo">{{ userdata.birth }}</span>
        </div>
        <div>
          <label>注册时间</label
          ><span class="itemTwo">{{ userdata.registertime }}</span>
        </div>
        <div>
          <label>邮箱</label><span class="itemTwo">{{ userdata.email }}</span>
        </div>
        <div>
          <label>用户状态</label
          ><el-tag class="itemTwo"
              :type=" userdata.status  === '正常' ? 'success' : 'danger'"
              >{{ userdata.status }}</el-tag
            >
        </div>
      </div>
      <el-divider></el-divider>
      <div class="right">
        <el-button type="text" @click="toChange">修改个人信息</el-button>
      </div>
    </div>
    <div>
      <el-dialog title="修改员工信息" :visible.sync="visible" @close="toClose">
        <!-- {{ form }} -->
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="登录用户" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="form.realname"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户手机" prop="telephone">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="dob">
            <el-input v-model="form.registerTime"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  saveOrUpdate,
  findUserDetailsById,
  alterUserface,
} from "@/api/user";
import { showFileURL, uploadFileURL } from "@/utils/config";

export default {
  data() {
    return {
      visibleTwo: false,
      showFileURL,
      uploadFileURL,
      imageUrl: "",
      userdata: [],
      visible: false,
      form: {},
      rules: {
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
            message: "请输入性别",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    async toSaveTwo() {
      let res = await alterUserface({
        id: this.$route.query.id,
        userface: this.form.userFace,
      });
      this.toQuery();
      this.visibleTwo = false;
      this.$notify.success({
        title: "成功",
        message: res.message,
      });
    },
    toChangeTwo() {
      this.visibleTwo = true;
    },
    async toQuery() {
      let res = await findUserDetailsById({ id: this.$route.query.id });
      this.userdata = res.data;
      // this.imageUrl = res.data.userFace;
      // console.log(res.data);
    },
    toChange() {
      this.visible = true;
      this.form = this.userdata;
    },
    toClose() {},
    toSave() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          let res = await saveOrUpdate(this.form);
          this.$notify.success({
            title: "成功",
            message: res.message,
          });
          this.visible = false;
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl);
      this.form.userFace = showFileURL + res.data.id;
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
  },
  created() {
    this.toQuery();
    // console.log(this.$route.query.id);
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.top {
  height: 100px;
  display: flex;
  padding: 1em 200px;
  margin-bottom: 1em;
}
.item div {
  color: rgb(90, 89, 89);
  font-size: 14px;
  line-height: 32px;
  margin-bottom: 15px;
}
.right {
  margin-right: 100px;
  text-align: right;
}
.itemTwo {
  margin-left: 10px;
  font-size: 14px;
}
.tp {
  display: flex;
  justify-content: space-between;
  height: 120px;
  width: 100%;
}
.tp img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
</style>
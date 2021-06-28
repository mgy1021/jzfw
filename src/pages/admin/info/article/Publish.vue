<!--
 * @Description:
 * @Author: ljy
 * @Date: 2021-06-24 16:23:07
 * @LastEditors: ljy
 * @LastEditTime: 2021-06-28 18:39:49
-->
<template>
  <!-- 发布资讯页面 -->
  <div class="box">
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title" clearable>
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="分类" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择" clearable>
          <el-option
            v-for="item in categoryData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="正文" prop="content">
        <Tinymce v-model="form.content" :height="300" />
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="text" size="medium" @click="toReturn">返回</el-button>
        <el-button
          type="primary"
          size="medium"
          @click="toUpload"
        >发布</el-button>
      </el-form-item>
      <el-form-item prop="cover" label="封面" class="photo">
        <el-upload
          class="avatar-uploader"
          :action="uploadFileURL"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { findAll } from '@/api/category'
import { showFileURL, uploadFileURL } from '@/utils/config'
import { saveOrUpdate } from '@/api/article'
import Tinymce from '@/components/Tinymce'

export default {
  components: {
    Tinymce
  },
  data() {
    return {
      showFileURL,
      uploadFileURL,
      form: {},
      categoryData: [],
      imageUrl: '',
      rules: {
        title: [
          {
            required: true,
            message: '请输入文章标题',
            trigger: 'blur'
          }
        ],
        categoryId: [
          {
            required: true,
            message: '请选择栏目',
            trigger: 'change'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入内容',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  created() {
    this.categoryQuery()
  },
  mounted() {},
  methods: {
    toReturn() {
      this.$router.push({
        path: '/List'
      })
    },
    toUpload() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const res = await saveOrUpdate(this.form)
          this.$notify.success({
            title: '成功',
            message: res.message
          })
          this.$router.push({
            path: '/List'
          })
        } else {
          return false
        }
      })
    },
    async categoryQuery() {
      const res = await findAll()
      this.categoryData = res.data
      // console.log(res.data);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.cover = showFileURL + res.data.id
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
.btn {
  margin-top: 50px;
  text-align: right;
}
</style>

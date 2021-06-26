<!--
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-26 18:43:16
 * @Description:  基础配置页面
-->
<template>

  <div>
    <!-- 新增按钮------------ -->
    <el-button type="primary" @click="toAdd">新增</el-button>
    <!-- 表格 ----------------------------------- -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="val" label="值">
          <template slot-scope="scope">
            <el-image v-if="judgePicture(scope.row.val) == true" style="width: 30px; height: 30px" :src="scope.row.val" />
            <span v-else>{{ scope.row.val }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="introduce" label="介绍" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-edit" circle @click="toEdit(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="toDelete(scope.row.id)" />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 模态框 ----------------------------- -->
    <el-dialog :title="title" :visible.sync="visible">
      <el-form ref="ruleForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="介绍" prop="introduce">
          <el-input v-model="form.introduce" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="value" placeholder="请选择类型">
            <el-option label="文字" value="文字" />
            <el-option label="图片" value="图片" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="value == '文字'" label="值" prop="val">
          <el-input v-model="form.val" placeholder="请输入内容" clearable />
        </el-form-item>
        <el-form-item v-else label="值" prop="val">
          <el-upload
            v-model="form.val"
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible=false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteById, findAll, findByKey, saveOrUpdate } from '@/api/baseConfig'
import { showFileURL, uploadFileURL } from '@/utils/config'

export default {
  data() {
    return {
      showFileURL,
      uploadFileURL,
      imageUrl: '',
      // 表格信息
      tableData: {},
      // 判断图片还是文字
      judge: false,
      // 模态框
      visible: false,
      // 表单数据
      form: {},
      //
      value: '文字',
      title: '',
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        introduce: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  created() {
    this.pageQueryData()
  },
  mounted() {},
  methods: {
    // 编辑
    toEdit(row) {
      this.pageQueryData()
      if (this.judgePicture(row.val)) {
        this.value = '图片'
        this.imageUrl = row.val
      } else {
        this.value = '文字'
      }
      this.form = { ...row }
      this.title = '编辑信息'
      this.visible = true
    },
    // 删除
    toDelete(id) {
      this.$confirm('是否将此信息删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteById({ id })
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.pageQueryData()
      })
    },
    // 保存
    toSave() {
      // 获取dom的值，对值进行校验 form.name
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          // 校验通过，做自己的业务，保存
          const res = await saveOrUpdate(this.form)
          // 提示用户保存成功，刷新表格数据，关闭模态框
          this.$notify.success({
            title: '成功',
            message: res.message
          })
          this.pageQueryData()
          this.visible = false
        } else {
          // 校验不通过
          return false
        }
      })
    },
    // 新增
    toAdd() {
      this.form = {}
      this.imageUrl = ''
      this.title = '添加信息'
      this.visible = true
    },
    // 图片上传成功的回调函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.photo = showFileURL + res.data.id
    },
    // 图片上传之前的回调函数
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
    },
    // 获取数据
    async pageQueryData() {
      const res = await findAll()
      this.tableData = res.data
    },
    // 判断图片还是文字
    judgePicture(str) {
      const pattern = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
      return pattern.test(str)
    }
  }
}
</script>
<style scoped>
</style>

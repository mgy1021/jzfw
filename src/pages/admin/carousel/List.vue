<!--
 * @Description:
 * @Author: wfz
 * @Date: 2021-06-25 08:48:39
 * @LastEditors: wfz
 * @LastEditTime: 2021-06-28 19:19:42
-->
<template>
  <!-- 轮播配置页面 -->
  <div>
    <div class="el-btn">
      <el-button type="primary" @click="toAdd">新增</el-button>
      <el-button type="primary" @click="toPreview">预览</el-button>
    </div>

    <!-- 新增模态框 -->
    <el-dialog :title="title" :visible.sync="visible">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="url" label="轮播图片" :label-width="formLabelWidth">
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
        <el-form-item
          prop="introduce"
          label="描述"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.introduce"
            type="textarea"
            placeholder="请描述一下轮播图的内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-right: 525px" @click="toReset">重置</el-button>
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 预览模态框-------走马灯 -->
    <el-dialog width="80%" :title="title" :visible.sync="viewVisible">
      <!-- {{ tableData }} -->
      <el-table-column prop="url" label="轮播图图片">
        <template>
          <el-carousel :interval="4000" type="card" height="320px">
            <el-carousel-item v-for="item in tableData" :key="item.id">
              <el-image style="width: 100%; height: 100%" :src="item.url" />
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 表格数据展示 -->
    <div class="el-tb">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="轮播图名称" align="center" />
        <el-table-column prop="introduce" label="轮播图描述" align="center" />
        <el-table-column label="轮播图图片" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 25px"
              :src="scope.row.url"
              :preview-src-list="[scope.row.url]"
            />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '正常' ? 'success' : 'danger'"
            >{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="125" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="toEdit(scope.row)"
            >编辑</el-button>
            <el-button
              class="btn-delete"
              type="text"
              size="small"
              @click="toDelete(scope.row.id)"
            >删除</el-button><el-button
              v-if="scope.row.status === '正常'"
              class="btn-stopUse"
              type="text"
              size="small"
              @click="toStopuse(scope.row)"
            >停用</el-button><el-button
              v-else
              class="btn-startUse"
              type="text"
              size="small"
              @click="toStartuse(scope.row)"
            >启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { findAll, saveOrUpdate, deleteById } from '@/api/carousel'
import { showFileURL, uploadFileURL } from '@/utils/config'

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      title: '',
      visible: false,
      form: {},
      formLabelWidth: '80px',
      imageUrl: '',
      viewVisible: false,
      showFileURL,
      uploadFileURL,
      rules: {
        name: {
          required: true,
          message: '请输入轮播图名称',
          trigger: 'blur'
        },
        url: {
          required: true,
          message: '请上传轮播图',
          trigger: 'change'
        }
      }
    }
  },
  computed: {},
  created() {
    this.queryCarouselData()
  },
  mounted() {},
  methods: {
    async queryCarouselData() {
      this.loading = true
      const res = await findAll()
      this.loading = false
      // console.log(res);
      this.tableData = res.data || []
    },
    toAdd() {
      this.queryCarouselData()
      this.form = {}
      this.imageUrl = ''
      this.title = '新增轮播图'
      this.visible = true
    },
    toPreview() {
      this.title = '大屏预览轮播图'
      this.viewVisible = true
    },
    toSave() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          // console.log("校验通过");
          // this.form;
          const res = await saveOrUpdate(this.form)
          // console.log(res, "***************");
          // 提示用户保存成功，刷新表格数据，关闭模态框
          this.$notify.success({
            title: '保存成功',
            message: res.message
          })
          this.queryCarouselData()
          this.visible = false
        } else {
          return false
        }
      })
    },
    toReset() {
      this.form = {}
      this.imageUrl = ''
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(this.imageUrl);
      this.form.url = showFileURL + res.data.id
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
    },
    toEdit(row) {
      this.queryCarouselData()
      this.form = { ...row }
      this.imageUrl = this.form.url
      this.title = '编辑轮播图信息'
      this.visible = true
    },
    toDelete(id) {
      this.$confirm('此操作将永久删除该行轮播信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteById({ id })
          this.queryCarouselData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async toStopuse(row) {
      row.status = '停用'
      // console.log(row);
      const res = await saveOrUpdate(row)
      this.$notify.success({
        title: '停用成功',
        message: res.message
      })
      this.queryCarouselData()
      console.log(res)
    },
    async toStartuse(row) {
      row.status = '正常'
      const res = await saveOrUpdate(row)
      this.$notify.success({
        title: '启用成功',
        message: res.message
      })
      this.queryCarouselData()
    }
  }
}
</script>
<style scoped>
/* 按钮样式 */
.el-btn {
  margin: 3px 0px 10px 5px;
}
/* 表格样式 */
.el-tb {
  display: flex;
}
/* 删除按钮样式 */
.btn-delete {
  color: #e65d6e;
}
/* 停用启用按钮样式 */
.btn-stopUse,
.btn-startUse {
  color: #3a71a8;
}
/* 轮播图上传样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
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

/* 预览轮播图样式 */

.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
  border: 1px solid rgb(243, 236, 229);
  width: 600px;
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
  border: 1px solid rgb(243, 236, 229);
  width: 600px;
}
</style>

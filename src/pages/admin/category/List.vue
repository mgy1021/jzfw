<!--
 * @Author: your name
 * @Date: 2021-06-24 18:58:12
 * @LastEditTime: 2021-06-28 16:35:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目模块\src\pages\admin\category\List.vue
-->
<template>
  <!-- 产品栏目管理 -->
  <div>
    <div>
      <el-button type="primary" @click="toAdd">添加</el-button>
    </div>
    <!-- 列表 -->
    <div>
      <el-table v-loading="loading" :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="id" label="栏目编号" />
        <el-table-column align="center" prop="name" label="名称" />
        <el-table-column align="center" label="图标">
          <template slot-scope="scope">
            <!--  {{scope.row.icon}} -->
            <!-- <img :src="scope.row.icon" alt /> -->
            <el-popover
              placement="top"
              width="50"
              trigger="hover"
            >
              <el-image
                slot="reference"
                style="width: 50px; height:50px"
                :src="scope.row.icon"
              />
              <el-image
                style="width: 100%; height:100%"
                :src="scope.row.icon"
              />
            </el-popover>

          </template>
        </el-table-column>
        <el-table-column align="center" prop="num" label="排序号" />

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.stop="toEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="toDelete(scope.row)">删除</el-button>
          </template> </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page-div">
      <el-pagination
        :current-page="params.page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <div>
      <!-- 添加模态框 -->
      <el-dialog :title="title" :visible.sync="visible" :before-close="toClose">
        <el-form ref="ruleForm" :model="form" :rules="rules">
          <el-form-item prop="name" label="栏目名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="num" label="排序号" :label-width="formLabelWidth">
            <el-input v-model="form.num" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="icon" label="图标" :label-width="formLabelWidth">
            <el-upload
              v-model="form.icon"
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
          <el-button @click="toClose">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { pageQuery, saveOrUpdate, deleteById } from '@/api/proCategory'
import { showFileURL, uploadFileURL } from '@/utils/config'

export default {
  data() {
    return {
      deleteById,
      showFileURL,
      uploadFileURL,
      searchForm: {
        name: ''
      },
      categoryData: [],
      tableData: [],
      params: {
        page: 1,
        pageSize: 10
      },
      // 总条数
      total: 0,
      // 加载
      loading: false,
      // 模态框
      visible: false,
      form: {},
      formLabelWidth: '90px',
      title: '',
      // 图片url
      imageUrl: '',
      // 校验规则
      rules: {
        name: [
          {
            required: true,
            message: '请输入栏目名称',
            trigger: 'blur'
          }
        ],
        num: [
          {
            required: true,
            message: '请输入排序号',
            trigger: 'blur'
          }

        ]
        /*    icon:[
          {
          required:true,
          message:"请输入图片",
        },
        ], */
      }

    }
  },
  computed: {},
  watch: {
    params: {
      handler() {
        this.queryData()
      },
      deep: true
    }
  },
  created() {
    this.queryCategoryData()
    this.queryData()
  },
  mounted() {},
  methods: {
    async queryCategoryData() {
      const res = await pageQuery({ page: 1, pageSize: 100 })
      this.categoryData = res.data.list
      this.total = res.data.total
    },
    async queryData() {
      this.loading = true
      const temp = {
        ...this.params,
        ...this.searchForm
      }

      // for (let key in temp) {
      //   console.log(key);
      // }

      const res = await pageQuery(temp)
      this.loading = false
      this.tableData = res.data.list
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      /*  this.params.pageSize =val;
      this.params.page = 1; */
      this.params = {
        pageSize: val,
        page: 1
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
    },
    // 添加按钮事件处理
    toAdd() {
      this.queryCategoryData()
      this.form = {}
      this.imageUrl = ''

      this.title = '添加栏目'
      this.visible = true
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.icon = showFileURL + res.data.id
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
    // 模态框确定按钮事件处理程序
    toSave() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          // console.log("通过");
          const res = await saveOrUpdate(this.form)
          // 提示用户保存成功
          this.$notify.success({
            title: '成功',
            message: res.message
          })
          this.queryData()
          this.toClose()
        } else {
          return false
        }
      })
    },
    // 关闭模态框
    toClose() {
      // this.$refs.ruleForm.resetFields();
      this.visible = false

      // setTimeout(()=>{
      // this.visible = false;
      // },200);
    },
    // 编辑按钮的事件处理
    toEdit(row) {
      // console.log(row);
      // 设置编辑数据
      this.form = { ...row }
      // this.queryCategoryData();
      this.imageUrl = this.form.icon
      this.title = '编辑栏目信息'
      this.visible = true
    },
    // 删除按钮的事件处理
    toDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

      console.log(row)
      const res = deleteById({ id: row.id })
      this.$notify.success({
        title: '成功',
        message: res.message
      })

      this.queryData()
    }
  }
}
</script>
<style scoped>
</style>

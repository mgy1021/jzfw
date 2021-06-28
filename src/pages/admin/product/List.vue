<!--
 * @Description:
 * @Author: wfz
 * @Date: 2021-06-22 14:46:24
 * @LastEditors: wfz
 * @LastEditTime: 2021-06-27 00:24:17
-->
<template>
  <div class="product-list">
    <!-- 查询按钮 添加按钮、模糊搜索、 -->
    <!-- {{ searchForm }}<br /> -->
    <!-- {{ categoryData }} -->
    <div class="search">
      <div>
        <el-button class="btn" type="primary" @click="toAdd">添加</el-button>
      </div>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="searchForm.name"
            clearable
            placeholder="产品名称"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.status"
            clearable
            placeholder="产品状态"
          >
            <el-option label="正常" value="正常" />
            <el-option label="下架" value="下架" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.productCategoryId"
            clearable
            placeholder="产品分类"
          >
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
            <!-- <el-option label="下架" value="下架"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- {{ tableData }} -->
    <div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" />
        <el-table-column prop="id" label="产品编号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column width="50px" label="图片">
          <template slot-scope="scope">
            <!-- {{ scope.row.photo }} -->
            <!-- <img :src="scope.row.photo" alt="" /> -->
            <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.photo"
              :preview-src-list="[scope.row.photo]"
            />
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="price" label="价格" />
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <!-- <el-tag v-if="scope.row.status == '正常'" type="success">{{
              scope.row.status
            }}</el-tag>
            <el-tag v-else type="danger">{{ scope.row.status }}</el-tag> -->
            <el-tag
              :type="scope.row.status === '正常' ? 'success' : 'danger'"
            >{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category.name" label="所属栏目" />
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="toEdit(scope.row)"
            >编辑</el-button>
            <el-button
              :disabled="scope.row.status === '正常'"
              type="text"
              size="small"
              @click="toOnline(scope.row.id)"
            >上架</el-button>
            <el-button
              :disabled="scope.row.status === '下架'"
              type="text"
              size="small"
              @click="toOffline(scope.row.id)"
            >下架</el-button>
            <!-- <el-button
              v-if="scope.row.status === '下架'"
              @click="toOnline(scope.row.id)"
              type="text"
              size="small"
              >上架</el-button
            >
            <el-button
              v-else
              @click="toOffline(scope.row.id)"
              type="text"
              size="small"
              >下架</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-div">
        <el-pagination
          :current-page="params.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 模态框 对话框 -->
      <!-- :before-close="toClose" -->
      <el-dialog :title="title" :visible.sync="visible" @close="toClose">
        {{ form }}
        <el-form ref="ruleForm" :model="form" :rules="rules">
          <el-form-item
            prop="name"
            label="产品名称"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item
            prop="productCategoryId"
            label="所属栏目"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="form.productCategoryId"
              clearable
              placeholder="请选择所属栏目"
            >
              <el-option
                v-for="item in categoryData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
            <el-input v-model.number="form.price" autocomplete="off" />
          </el-form-item>
          <!-- {{ form }} -->
          <el-form-item prop="photo" label="封面" :label-width="formLabelWidth">
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
          <el-form-item label="产品描述" :label-width="formLabelWidth">
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            style="margin-right: 525px"
            @click="toReset"
          >重置</el-button>
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { pageQuery } from '@/api/proCategory'
// 重命名
import {
  pageQuery as pageQueryPro,
  saveOrUpdate,
  online,
  offline
} from '@/api/product'
import { showFileURL, uploadFileURL } from '@/utils/config'

export default {
  data() {
    return {
      showFileURL,
      uploadFileURL,
      // 产品栏目的数据，页面一上来，就发请求，请求所有的产品栏目数据，设置到categoryData
      categoryData: [],
      // 模糊搜索的表单数据
      searchForm: {
        name: '',
        status: '',
        productCategoryId: ''
      },
      // 表格展示的数据
      tableData: [],
      // 分页参数
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      loading: false,
      visible: false,
      // 表单数据
      form: {},
      // 表单控件标题的宽度
      formLabelWidth: '80px',
      title: '',
      imageUrl: '',
      rules: {
        name: [
          {
            required: true,
            message: '请输入产品名称',
            trigger: 'blur'
          }
        ],
        productCategoryId: [
          {
            required: true,
            message: '请选择所属栏目',
            trigger: 'change'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入产品价格'
          },
          { type: 'number', message: '产品价格必须为数值类型' }
        ],
        photo: [
          {
            required: true,
            message: '请上传封面图片',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {
    // 深度监听分页参数
    params: {
      handler() {
        this.queryData()
      },
      deep: true
    }
  },
  created() {
    // 为了页面一上来就有数据
    this.queryCategoryData()
    this.queryData()
  },
  mounted() {},
  methods: {
    // 获取产品分类数据
    async queryCategoryData() {
      const res = await pageQuery({ page: 1, pageSize: 100 })
      this.categoryData = res.data.list
    },
    // 分页模糊获取产品数据
    async queryData() {
      this.loading = true
      const temp = {
        ...this.params,
        ...this.searchForm
      }
      // 处理数据********
      for (const key in temp) {
        if (!temp[key]) {
          delete temp[key]
        }
      }
      const res = await pageQueryPro(temp)
      // 加载完毕后关闭加载画面
      this.loading = false
      this.tableData = res.data.list
      this.total = res.data.total
      // 以下两个都是合并对象
      // let obj = Object.assign({},this.params,this.searchForm);
      // let obj = {
      //   ...this.params,
      //   ...this.searchForm,
      // }
    },
    toSearch() {
      this.queryData()
    },
    // 每页显示的条数发生变化时的处理程序
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      // this.params.pageSize = val;
      // this.params.page = 1;
      this.params = {
        page: 1,
        pageSize: val
      }
      // this.queryData()
    },
    // 当前页码发生变化时的事件处理程序
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
      // this.queryData()
    },
    toAdd() {
      // 每次点击添加按钮的时候，请求一次数据查询，保持数据是最新的
      this.queryCategoryData()
      // 清空表单数据
      this.form = {}
      this.imageUrl = ''
      this.title = '添加产品信息'
      this.visible = true
    },
    // 图片上传成功的回调函数
    handleAvatarSuccess(res, file) {
      // console.log(res, "----图片上传成功之后的res");
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(this.imageUrl);
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
    // 模态框确定按钮事件处理程序
    toSave() {
      // 获取dom的值，对值进行校验 form.name
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          console.log('校验通过')
          // this.form;
          const res = await saveOrUpdate(this.form)
          // console.log(res, "***************");
          // 提示用户保存成功，刷新表格数据，关闭模态框
          this.$notify.success({
            title: '保存成功',
            message: res.message
          })
          this.queryData()
          this.visible = false
        } else {
          return false
        }
      })
    },
    toClose() {
      this.$refs.ruleForm.resetFields()
      // 超时调用
      // setTimeout(() => {
      //   this.visible = false;
      // }, 40);
    },
    toEdit(row) {
      this.queryCategoryData()
      this.form = { ...row }
      this.imageUrl = this.form.photo
      this.title = '编辑产品信息'
      this.visible = true
    },
    toReset() {
      this.form = {}
      this.imageUrl = ''
    },
    async toOnline(id) {
      const res = await online({ id })
      this.$notify.success({
        title: '上架成功',
        message: res.message
      })
      this.queryData()
    },
    async toOffline(id) {
      const res = await offline({ id })
      this.$notify.success({
        title: '下架成功',
        message: res.message
      })
      this.queryData()
    }
  }
}
</script>
<style lang="scss" scoped>
/* .product-list {
  padding: 10px;
} */
/* scss less css预处理器 */
.search {
  display: flex;
  //   height: 40px;
}
.btn {
  margin: 0px 10px;
}
</style>

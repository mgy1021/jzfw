<!--
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-25 20:35:33
 * @Description: 资讯评论审核
-->
<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <!-- 批量删除按钮 -->
      <el-form-item>
        <el-button type="danger" @click="toBatchDelete">批量删除</el-button>
      </el-form-item>
      <el-form-item>
        <!-- 关键字查询 -->
        <el-input v-model="searchForm.keywords" style="width:200px" placeholder="请输入关键字" clearable />
      </el-form-item>
      <!-- 查询按钮 -->
      <el-form-item>
        <el-button type="primary" @click="toSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数 --------------------- -->
    <!-- {{tableData}} -->
    <el-table v-model="loading" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55" />

      <el-table-column type="index" label="序号" />

      <el-table-column prop="comment" label="评论内容" />

      <el-table-column prop="userId" label="评论人编号" />

      <el-table-column prop="articleId" label="资讯编号" />

      <el-table-column prop="commentTime" label="评论时间">
        <template v-slot="scope">
          {{ moment(scope.row.applyTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-tag v-if="scope.row.status=='未审核'" type="info" size="mini">未审核</el-tag>
          <el-tag v-else-if="scope.row.status=='通过'" type="success" size="mini">通过</el-tag>
          <el-tag v-else type="danger" size="mini">不通过</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button v-if="scope.row.status === '未审核'" @click="toPass(scope.row.id)" type="primary" size="small" >通过</el-button>
            <el-button v-if="scope.row.status === '未审核'" @click="toNoPass(scope.row.id)" type="danger" size="small" >不通过</el-button> -->
          <el-button type="warning" size="small" @click="toDelete(scope.row.id)">删除</el-button>
          <el-button type="primary" size="small" @click="toPass(scope.row.id)">通过</el-button>
          <el-button type="danger" size="small" @click="toNoPass(scope.row.id)">不通过</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页---------------------------- -->
    <div class="page-div">
      <el-pagination
        :current-page="params.page"
        :page-sizes="[2, 5, 10, 15, 20, 50]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>

import { batchDelete,
  check,
  deleteById,
  pageQuery,
  saveOrUpdate } from '@/api/infoComment'
import moment from 'moment'

export default {
  data() {
    return {
      // 分页参数
      params: {
        page: 1,
        pageSize: 10
      },
      // 申请数据
      commentData: [],
      // 表格展示数据
      tableData: [],
      // 查询表单
      searchForm: {},
      // 分页的总条数
      total: 0,
      // 加载
      loading: false,
      // 多选框
      checked: []
    }
  },
  computed: {},
  watch: {
    params: {
      handler() {
        this.pageQueryData()
      },
      deep: true
    }
  },
  created() {
    this.queryCommentData()
    this.pageQueryData()
  },
  mounted() {},
  methods: {
    // 批量删除
    toBatchDelete() {
      this.$confirm('是否将所选删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await batchDelete(this.checked)
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.pageQueryData()
      })
    },
    // 获取多选按钮的数据
    handleSelectionChange(val) {
      // console.log(val);
      const a = []
      for (let i = 0; i < val.length; i++) {
        a[i] = val[i].id
      }
      this.checked = a
      console.log(this.checked)
    },
    // 删除
    toDelete(id) {
      this.$confirm('是否将此删除?', '提示', {
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
    // 审核不通过
    toNoPass(id) {
      this.$confirm('是否将此申请不通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const status = '不通过'
        const res = await check({ id, status })
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.pageQueryData()
      })
    },
    // 审核通过
    async toPass(id) {
      this.$confirm('是否将此申请通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const status = '通过'
        const res = await check({ id, status })
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.pageQueryData()
      })
    },
    moment,
    // 每页显示的条数发生变化的事件处理程序
    handleSizeChange(val) {
      this.params = {
        page: 1,
        pageSize: val
      }
    },
    // 分页 页码发生变化的事件处理程序
    handleCurrentChange(val) {
      this.params.page = val
    },
    // 查询按钮
    toSearch() {
      console.log(this.searchForm)
      this.pageQueryData()
    },
    // 获取申请数据
    async queryCommentData() {
      const res = await pageQuery({ page: 1, pageSize: 10 })
      this.commentData = res.data.list
    },
    // 分页获取申请数据  模糊查询
    async pageQueryData() {
      this.loading = true
      const temp = {
        ...this.params,
        ...this.searchForm
      }
      for (const key in temp) {
        if (!temp[key]) {
          delete temp[key]
        }
      }
      // 合并搜索的数据和分页的数据
      const res = await pageQuery(temp)
      this.tableData = res.data.list
      this.total = res.data.total
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

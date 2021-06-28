<!--
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-25 20:34:13
 * @Description: 订单评论
-->
<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <!-- 关键字查询 -->
        <el-input v-model="searchForm.content" style="width:200px" placeholder="请输入关键字" clearable />
      </el-form-item>

      <el-form-item>
        <!-- 申请人编号 -->
        <el-input
          v-model="searchForm.orderId"
          style="width:200px"
          placeholder="请输入订单编号"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <!-- 审核选择器 -->
        <el-select
          v-model="searchForm.status"
          clearable
          placeholder="请选择状态"
        >
          <el-option label="未审核" value="未审核" />
          <el-option label="通过" value="通过" />
          <el-option label="不通过" value="不通过" />
        </el-select>
      </el-form-item>

      <!-- 查询按钮 -->
      <el-form-item>
        <el-button type="primary" @click="toSearch">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数 --------------------- -->
    <!-- {{tableData}} -->
    <el-table v-model="loading" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="content" label="评论内容" />
      <el-table-column prop="customerId" label="顾客编号" />
      <el-table-column prop="orderId" label="订单编号" />
      <el-table-column prop="commentTime" label="评论时间">
        <template v-slot="scope">
          {{ moment(scope.row.applyTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-tag
            v-if="scope.row.status == '未审核'"
            type="info"
            size="mini"
          >未审核</el-tag>
          <el-tag
            v-else-if="scope.row.status == '通过'"
            type="success"
            size="mini"
          >通过</el-tag>
          <el-tag v-else type="danger" size="mini">不通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button v-if="scope.row.status === '未审核'" @click="toPass(scope.row.id)" type="primary" size="small" >通过</el-button>
            <el-button v-if="scope.row.status === '未审核'" @click="toNoPass(scope.row.id)" type="danger" size="small" >不通过</el-button> -->
          <el-button
            type="danger"
            size="small"
            @click="toDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页---------------------------- -->
    <div class="page-div">
      <el-pagination
        :current-page="params.page"
        :page-sizes="[1, 2, 5, 10, 15, 20, 50]"
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
import {
  checkNoPass,
  checkPass,
  deleteById,
  pageQuery,
  submit
} from '@/api/orderComment'
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
      applyData: [],
      // 表格展示数据
      tableData: [],
      searchForm: {},
      // 分页的总条数
      total: 0,
      // 加载
      loading: false
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
    this.queryApplyData()
    this.pageQueryData()
  },
  mounted() {},
  methods: {
    // 删除按钮
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
      this.pageQueryData()
    },
    // 获取申请数据
    async queryApplyData() {
      const res = await pageQuery({ page: 1, pageSize: 10 })
      this.applyData = res.data.list
    },
    // 分页获取申请数据  模糊查询
    async pageQueryData() {
      this.loading = true
      // 复制分页数据 页数
      const temp = {
        ...this.params,
        ...this.searchForm
      }
      // 遍历对象
      for (const key in temp) {
        // key是一个变量，代表的属性名
        // key 'page'   temp.key  temp[key]
        // key是属性名  temp[key]属性值
        if (!temp[key]) {
          delete temp[key]
        }
      }

      const res = await pageQuery(temp)
      this.loading = false
      this.tableData = res.data.list
      this.total = res.data.total
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

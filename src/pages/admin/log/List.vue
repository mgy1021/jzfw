<!--
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-27 18:42:53
 * @Description:
-->
<template>
  <div>
    <!-- 表格 ----------------------------------- -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" />
        <el-table-column prop="realname" label="访问者真实姓名" />
        <el-table-column prop="method" label="访问方式" />
        <el-table-column prop="content" label="访问路径" />
        <el-table-column prop="logTime" label="访问时间">
          <template v-slot="scope">
            {{ moment(scope.row.applyTime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 ------------------------------------ -->
    <el-pagination
      :current-page="params.page"
      :page-sizes="[1, 2, 10, 20, 30, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<script>
import { pageQuery } from '@/api/log'
import moment from 'moment'

export default {
  data() {
    return {

      // 分页
      params: {
        page: 1,
        pageSize: 10
      },
      // 表格数据
      tableData: [],
      // 数据总条数
      total: 0
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
    this.pageQueryData()
  },
  mounted() {},
  methods: {
    moment,
    // 获取数据
    async pageQueryData() {
      const temp = { ...this.params }
      const res = await pageQuery(temp)
      this.tableData = res.data.list
      this.total = res.data.total
    },
    // 分页响应函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.params.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
    }
  }
}
</script>
<style scoped>
</style>

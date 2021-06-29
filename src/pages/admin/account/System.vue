<!--
 * @Description:
 * @Author: Mogy
 * @Date: 2021-06-24 19:23:45
 * @LastEditors: Mogy
 * @LastEditTime: 2021-06-26 20:24:16
-->
<template>
  <!-- 系统账单管理 -->
  <div>
    <!-- {{params}} -->
    <!-- {{form}} -->
    <div class="search">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-date-picker
            v-model="form.transferTime"
            value-format="timestamp"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.type" placeholder="请选择类型" clearable>
            <el-option label="充值" value="充值" />
            <el-option label="收益" value="收益" />
            <el-option label="体现" value="体现" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.status" placeholder="请选择状态" clearable>
            <el-option label="正常" value="正常" />
            <el-option label="未审核" value="未审核" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="编号" align="center" />
      <el-table-column prop="transferMoney" label="交易金额" align="center" />
      <el-table-column prop="transferTime" label="交易时间" align="center">
        <template
          slot-scope="scope"
        >{{ moment(scope.row.transferTime).format("YYYY-MM-DD hh:mm:ss") }}</template>
      </el-table-column>
      <el-table-column prop="type" label="交易类型" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '正常'?'success':'danger'">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center" />align="center"
    </el-table>
    <!-- 分页 -->
    <div class="pagination-div">
      <el-pagination
        :current-page="params.page"
        :page-sizes="[2, 5, 10, 15]"
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
import { pageQuerySystemAccount } from '@/api/account'
import { deepAssign } from '@antv/g2plot/lib/utils'
import moment from 'moment'
export default {
  data() {
    return {
      moment,
      form: {
        transferTime: []
      },
      tableData: [],
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ''
    }
  },
  computed: {},
  // 监听
  watch: {
    params: {
      handler() {
        this.queryTableData()
      },
      deep: true
    }
  },
  created() {
    this.queryTableData()
  },
  mounted() {},
  methods: {
    // 分页回调函数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.params = {
        page: 1,
        pageSize: val
      }
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.params.page = val
    },
    async queryTableData() {
      if (this.form.transferTime != null) {
        (this.form.beginTime = this.form.transferTime[0]),
        (this.form.endTime = this.form.transferTime[1])
      } else {
        this.form.beginTime = ''
        this.form.endTime = ''
      }

      const temp = {
        ...this.params,
        ...this.form
      }

      for (const key in temp) {
        if (!temp[key]) {
          delete temp[key]
        }
      }

      // 删除transferTime属性
      delete temp.transferTime
      const res = await pageQuerySystemAccount(temp)
      // console.log(res);
      this.tableData = res.data.list
      this.total = res.data.total
    },
    toSearch() {
      this.queryTableData()
    }
  }
}
</script>
<style scoped>
</style>

<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-06-24 19:23:45
 * @LastEditors: Mogy
 * @LastEditTime: 2021-06-25 16:25:27
-->
<template>
  <!-- 顾客账户管理 -->
  <div>
    <div class="search-btn">
      <!-- {{form}} -->
      <!-- {{params}} -->
      <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          clearable
          value-format="timestamp"
          v-model="form.transferTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.type" placeholder="请选择类型" clearable>
          <el-option label="充值" value="充值"></el-option>
          <el-option label="消费" value="消费"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.status" placeholder="请选择状态" clearable>
          <el-option label="正常" value="正常"></el-option>
          <el-option label="未审核" value="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.userId" placeholder="顾客姓名" clearable>
          <el-option v-for="item in customsData" :key="item.id" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toSearch">查询</el-button>
      </el-form-item>
    </el-form>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="编号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="transferMoney"
        label="交易金额"
        align="center">
      </el-table-column>
      <el-table-column
        label="交易时间"
        align="center">
        <template slot-scope="scope">
          {{moment(scope.row.transferTime).format("YYYY-MM-DD hh:mm:ss")}}
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="交易类型"
        align="center">
      </el-table-column>
      <el-table-column
        label="状态"
        align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '正常'?'success':'danger'">
            {{scope.row.status}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        align="center">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-div">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {pageQuery} from '@/api/user.js'
import {pageQueryCustomerAccount} from '@/api/account'
import moment from 'moment'
export default {
  data() {
    return {
      moment,
      form:{
        transferTime:[],
      },
      customsData:[],
      tableData:[],
      params:{
        page:1,
        pageSize:10
      },
      total:0,
      loading:false,
      // 日期选择器
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
    };
  },
  computed: {},
  methods: {
    // 分页回调函数
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.params.pageSize = val
      },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val
      },
    async queryCustomsData(){
      let res = await pageQuery({
        page:1,
        pageSize:1000,
        roleId:6
      })
      // console.log(res);
      this.customsData = res.data.list
    },
    async querytableData(){
      // 处理时间选择器数据
      if(this.form.transferTime != null){
        this.form.beginTime = this.form.transferTime[0]
        this.form.endTime = this.form.transferTime[1]
      }else{
        this.form.beginTime = ''
        this.form.endTime = ''
      }
      let temp = {
        ...this.params,
        ...this.form,
      }
      // 遍历对象，删除为空的元素
      for(let key in temp){
        if(!temp[key]){
          delete temp[key]
        }
      }
      // 删除transferTime属性
      delete temp.transferTime
      // 加载
      this.loading = true
      console.log(temp);
      let res = await pageQueryCustomerAccount(temp)
      // console.log(res);
      this.tableData = res.data.list
      this.total = res.data.total
      this.loading = false
    },
    toSearch(){
      this.querytableData()
    }
  },
  // 监听
  watch:{
    params:{
      handler(){
        this.querytableData()
      },
      deep:true
    }
  },
  created() {
    this.queryCustomsData()
    this.querytableData()
  },
  mounted() {},
};
</script>
<style scoped>
</style>
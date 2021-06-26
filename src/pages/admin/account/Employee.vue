<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-06-24 19:23:45
 * @LastEditors: Mogy
 * @LastEditTime: 2021-06-25 16:34:08
-->
<template>
  <!-- 员工账单管理 -->
  <div>
    <div class="search">
      <!-- {{form}} -->
      <!-- {{params}} -->
      <el-form :inline="true" :model="form" class="demo-form-inline" size="mini">
        <el-form-item>
          <div class="block">
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
          </div>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.type" placeholder="请选择类型" clearable>
            <el-option label="收益" value="收益"></el-option>
            <el-option label="提现" value="提现"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.status" placeholder="请选择状态" clearable>
            <el-option label="正常" value="正常"></el-option>
            <el-option label="未审核" value="未审核"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.userId" placeholder="员工姓名" clearable>
            <el-option v-for="item in usersData" :key="item.name" :label="item.username" :value="item.id"></el-option>
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
      prop="transferTime"
      label="交易时间"
      align="center">
      <template slot-scope="scope">
        {{moment(scope.row.transferTime).format("YYYY-MM-DD HH:mm:ss")}}
        <!-- {{scope.row.transferTime}} -->
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
        <el-tag :type="scope.row.status === '正常'?'success':'danger'">{{scope.row.status}}</el-tag>
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
        :page-sizes="[2,5, 10, 15, 20]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {pageQuery} from '@/api/user'
import {pageQueryEmployeeAccount} from '@/api/account'
export default {
  data() {
    return {
      form:{
        transferTime:[]
      },
      usersData:[],
      tableData:[],
      params:{
        page:1,
        pageSize:10
      },
      moment,
      total:0,
      loading:false,
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
    };
  },
  watch:{
    params:{
      handler(){
        this.queryEmployeeAccount()
      },
      deep:true
    }
  },
  computed: {},
  methods: {
    // 分页回调函数
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        // this.params.pageSize = val
        // 当改变页码的大小时，默认跳转到第一页
        this.params = {
          page:1,
          pageSize:val
        }
      },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val
      },
    async queryUsers(){
      let res = await pageQuery({
        page:1,
        pageSize:1000,
        roleId:1
      })
      console.log(res);
      this.usersData = res.data.list
    },
    // 请求表格数据
    async queryEmployeeAccount(){
      if(this.form.transferTime != null){
        this.form.beginTime = this.form.transferTime[0]
        this.form.endTime = this.form.transferTime[1]
      }else{
        this.form.beginTime = ''
        this.form.endTime = ''
      }
      // console.log(this.form);
      let temp = {
        ...this.form,
        ...this.params
      }
      // 如果输入为空，则删除该属性
      for(let key in temp){
        if(!temp[key]){
          delete temp[key]
        }
      }
      // 删除transferTime属性
      delete temp.transferTime
      // 加载中
      this.loading = true
      let res = await pageQueryEmployeeAccount(temp)
      // console.log(res);
      this.tableData = res.data.list
      this.total = res.data.total
      this.loading = false
    },
    async toSearch(){
      // 发送请求
      this.queryEmployeeAccount()
    }
  },
  created() {
    this.queryUsers();
    this.queryEmployeeAccount()
  },
  mounted() {},
};
</script>
<style scoped>
</style>
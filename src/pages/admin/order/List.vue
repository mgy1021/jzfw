<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-06-24 19:23:45
 * @LastEditors: Mogy
 * @LastEditTime: 2021-07-03 09:19:28
-->
<template>
  <!-- 订单管理页 -->
  <div>
    <!-- {{activeName}} -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="所有订单"></el-tab-pane>
      <el-tab-pane label="待支付" name="待支付"></el-tab-pane>
      <el-tab-pane label="待派单" name="待派单"></el-tab-pane>
      <el-tab-pane label="待接单" name="待接单"></el-tab-pane>
      <el-tab-pane label="待服务" name="待服务"></el-tab-pane>
      <el-tab-pane label="待确认" name="待确认"></el-tab-pane>
      <el-tab-pane label="已完成" name="已完成"></el-tab-pane>
    </el-tabs>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="订单编号" align="center"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" align="center">
        <template slot-scope="scope">{{moment(scope.row.orderTime).format("YYYY-MM-DD hh:mm:ss")}}</template>
      </el-table-column>
      <el-table-column prop="total" label="总价" align="center">
        <template slot-scope="scope">
          ￥
          <span class="money">{{scope.row.total}}</span>
          元
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '待派单'" type="success">{{scope.row.status}}</el-tag>
          <el-tag v-else-if="scope.row.status === '待服务'" type="info">{{scope.row.status}}</el-tag>
          <el-tag v-else type="warning">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="顾客ID" align="center"></el-table-column>
      <el-table-column prop="employeeId" label="员工ID" align="center">
        <template slot-scope="scope">{{scope.row.employeeId === null?'--':scope.row.employeeId}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row.id)" type="text" size="small">详情</el-button>
          <el-button
            v-if="scope.row.status ==='待派单'"
            type="text"
            size="small"
            @click="toSendOrder(scope.row.id)"
            style="color:#13ce66"
          >派单</el-button>
          <el-button
            v-else-if="scope.row.status ==='待接单'"
            type="text"
            size="small"
            @click="toCancelSendOrder(scope.row.id)"
            style="color:#ffba00"
          >取消派单</el-button>
        </template>
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
        :total="total"
      ></el-pagination>
    </div>
    <!-- 模态框 -->
    <el-dialog title="派单" :visible.sync="dialogFormVisible">
      <!-- {{SendOrderData}} -->
      <el-form :model="form">
        <el-form-item>
          <el-radio
            v-for="item in userData"
            :key="item.id"
            v-model="form.waiterId"
            :label="item.id"
            border
            size="medium"
          >{{item.username}}</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageQuery, sendOrder, cancelSendOrder, findById } from "@/api/order";
import { pageQuery as pageQueryUser } from "@/api/user";
import moment from "moment";
export default {
  data() {
    return {
      radio2: null,
      form: {},
      moment,
      activeName: "所有订单",
      tableData: [],
      userData: [],
      params: {
        page: 1,
        pageSize: 10,
      },
      total: 0,
      dialogFormVisible: false,
      SendOrderData: {
        orderId: 0,
      },
      loading: false,
    };
  },
  computed: {},
  methods: {
    // 分页回调函数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.params.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.params.page = val;
    },
    // 点击切换标签页回调函数
    async handleClick(tab, event) {
      this.queryTableData();
    },

    async queryTableData() {
      let temp = {
        ...this.params,
        status: this.activeName === "所有订单" ? null : this.activeName,
      };
      this.loading = true;
      let res = await pageQuery(temp);
      this.tableData = res.data.list;
      this.total = res.data.total;
      this.loading = false;
    },
    // 派单
    async toSendOrder(id) {
      this.SendOrderData.orderId = id;
      // 显示模态框
      this.dialogFormVisible = true;
      // 发送请求
      let res = await pageQueryUser({
        page: 1,
        pageSize: 10,
        roleId: 1,
      });
      this.userData = res.data.list;
      // console.log(res);
    },
    async toSave() {
      this.SendOrderData.waiterId = this.form.waiterId;
      console.log(this.SendOrderData);
      let res = await sendOrder(this.SendOrderData);
      // console.log(res);
      if (res.status === 200) {
        // 关闭模态框
        this.dialogFormVisible = false;
        // 刷新页面
        this.queryTableData();
        this.$notify({
          title: "成功",
          message: res.message,
          type: "success",
        });
      } else {
        this.$notify({
          title: "警告",
          message: res.message,
          type: "warning",
        });
      }
    },
    // 取消订单
    async toCancelSendOrder(orderId) {
      let res = await cancelSendOrder({ orderId });
      console.log(res);
      if (res.status === 200) {
        // 刷新页面
        this.queryTableData();
        this.$notify({
          title: "成功",
          message: res.message,
          type: "success",
        });
      } else {
        this.$notify({
          title: "警告",
          message: res.message,
          type: "warning",
        });
      }
    },
    // 详情
    async toDetails(id) {
      // 发送请求
      let res = await findById({ id });
      // console.log(res.data);
      // 跳转页面
      this.$router.push({
        path: "/admin/order/Details",
        query: {
          orderData: JSON.stringify(res.data),
        },
      });
    },
  },
  watch: {
    params: {
      handler() {
        this.queryTableData();
      },
      deep: true,
    },
  },
  created() {
    this.queryTableData();
  },
  mounted() {},
};
</script>
<style scoped>
/* 设置金额的样式 */
.money {
  color: #e65d6e;
  font-size: 18px;
}
</style>

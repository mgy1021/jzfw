<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-06-24 19:23:45
 * @LastEditors: Mogy
 * @LastEditTime: 2021-06-26 20:12:35
-->
<template>
  <!-- 订单详情页 -->
  <div>
    <div>
      <el-button type="text" @click="toBack">返回</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="订单项编号" width="180"></el-table-column>
      <el-table-column prop="productId" label="产品编号" width="180"></el-table-column>
      <el-table-column prop="product.name" label="产品"></el-table-column>
      <el-table-column prop="product.photo" label="产品图片">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.product.photo"
            :preview-src-list="[scope.row.product.photo]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价"></el-table-column>
      <el-table-column prop="number" label="数量"></el-table-column>
    </el-table>
    <!-- 卡片组 -->
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>订单基本信息</span>
        </div>
        <div class="card-item">订单信息: {{orderData.id}}</div>
        <div class="card-item">
          订单金额: ￥
          <span class="money">{{orderData.total}}</span> 元
        </div>
        <div class="card-item">下单时间: {{moment(orderData.orderTime).format("YYYY-MM-DD hh:mm:ss")}}</div>
        <div class="card-item">订单状态: {{orderData.status}}</div>
      </el-card>
      <el-card class="box-card" v-if="employeeData">
        <div slot="header" class="clearfix">
          <span>接单者信息</span>
        </div>
        <div class="card-item">接单者: {{employeeData.realname}}</div>
        <div class="card-item">接单者手机号: {{employeeData.telephone}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>下单者信息</span>
        </div>
        <div class="card-item">下单者: {{customerData.realname}}</div>
        <div class="card-item">下单者手机号: {{customerData.telephone}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>雇主信息</span>
        </div>
        <div class="card-item">雇主: {{addressData.username}}</div>
        <div class="card-item">雇主手机号: {{addressData.telephone}}</div>
        <div
          class="card-item"
        >服务地址: {{addressData.province+addressData.city+addressData.area+addressData.address}}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      moment,
      tableData: [],
      OrderData: {},
      customerData: {},
      addressData: {},
      employeeData: {},
    };
  },
  computed: {},
  methods: {
    // 跳转路由
    toBack() {
      this.$router.push("/admin/order/List");
    },
  },
  created() {
    this.tableData = JSON.parse(this.$route.query.orderData).orderLines;
    // console.log(JSON.parse(this.$route.query.orderData));
    this.orderData = JSON.parse(this.$route.query.orderData);
    this.customerData = JSON.parse(this.$route.query.orderData).customer;
    this.addressData = JSON.parse(this.$route.query.orderData).address;
    this.employeeData = JSON.parse(this.$route.query.orderData).employee;
    // console.log(this.employeeData);
  },
  mounted() {},
};
</script>
<style scoped>
.card {
  margin-top: 50px;
  display: flex;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-right: 20px;
  width: 350px;
}
.card-item {
  margin: 16px 0;
}
/* 设置金额的样式 */
.money {
  color: #e65d6e;
  font-size: 18px;
}
</style>
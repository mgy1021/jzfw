<!--
 * @Author: lucky
 * @Date: 2021-06-24 15:58:53
 * @LastEditors: [you name]
 * @LastEditTime: 2021-06-26 08:43:47
 * @Description: 员工实名认证
-->
<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <!-- 日期选择器 -->
        <el-date-picker
          v-model="appTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="timeSlot"
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
      <el-form-item>
        <!-- 申请人编号 -->
        <el-input
          v-model="searchForm.userId"
          style="width:200px"
          placeholder="申请人编号"
          clearable
        />
      </el-form-item>
      <!-- 查询按钮 -->
      <el-form-item>
        <el-button type="primary" @click="toSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 --------------------- -->
    <!-- {{tableData}} -->
    <el-table v-model="loading" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" />

      <el-table-column prop="userId" label="申请人编号" />

      <el-table-column prop="realname" label="姓名" />

      <el-table-column prop="applyTime" label="申请时间">
        <template v-slot="scope">
          {{ moment(scope.row.applyTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column prop="idCard" label="身份证号码" />

      <el-table-column prop="idcardPhotoPositive" label="身份证正面">
        <template v-slot="scope">
          <el-popover
            class="item"
            effect="dark"
            placement="right"
            trigger="hover"
          >
            <el-image
              style="width:300px; height:230px;"
              :src="scope.row.idcardPhotoPositive"
            />
            <el-image
              slot="reference"
              style="width:70px; height:50px;"
              :src="scope.row.idcardPhotoPositive"
            />
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="idcardPhotoNegative" label="身份证反面">
        <template v-slot="scope">
          <el-popover
            class="item"
            effect="dark"
            placement="right"
            trigger="hover"
          >
            <el-image
              style="width:300px; height:230px;"
              :src="scope.row.idcardPhotoNegative"
            />
            <el-image
              slot="reference"
              style="width:70px; height:50px;"
              :src="scope.row.idcardPhotoNegative"
            />
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="bankCard" label="银行卡号" />

      <el-table-column prop="bankCardPhoto" label="银行卡">

        <template v-slot="scope">
          <el-popover
            class="item"
            effect="dark"
            placement="right"
            trigger="hover"
          >
            <el-image
              style="width:300px; height:230px;"
              :src="scope.row.bankCardPhoto"
            />
            <el-image
              slot="reference"
              style="width:70px; height:50px;"
              :src="scope.row.bankCardPhoto"
            />
          </el-popover>

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
            type="primary"
            size="small"
            @click="toPass(scope.row.id)"
          >通过</el-button>
          <el-button
            type="danger"
            size="small"
            @click="toNoPass(scope.row.id)"
          >不通过</el-button>
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
import {
  checkNoPass,
  checkPass,
  pageQueryCertificationApply as pageQuery,
  revokeCertificationApply,
  submitCertificationApply as submitCer
} from '@/api/certification'
import moment from 'moment'

export default {
  data() {
    return {
      // 快捷日期选择
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
      // 分页参数
      params: {
        page: 1,
        pageSize: 10
      },
      // 申请数据
      cerData: [],
      // 表格展示数据
      tableData: [],
      searchForm: {},
      // 分页的总条数
      total: 0,
      // 加载
      loading: false,
      // 查询时间
      appTime: ''
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
    this.queryCerData()
    this.pageQueryData()
  },
  mounted() {},
  methods: {
    // 计算时间段
    timeSlot(time) {
      if (time != null) {
        this.searchForm.beginTime = Number(time[0])
        this.searchForm.endTime = Number(time[1])
      }
      // console.log(this.searchForm.beginTime,this.searchForm.endTime);
    },
    // 审核不通过
    toNoPass(id) {
      this.$confirm('是否将此申请不通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await checkNoPass({ id })
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
        const res = await checkPass({ id })
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
      this.params.page = 1
      this.pageQueryData()
    },
    // 获取申请数据
    async queryCerData() {
      const res = await pageQuery({ page: 1, pageSize: 10 })
      this.cerData = res.data.list
    },
    // 分页获取申请数据  模糊查询
    async pageQueryData() {
      this.loading = true
      for (const key in this.searchForm) {
        if (!this.searchForm[key]) {
          delete this.searchForm[key]
        }
      }
      // 合并搜索的数据和分页的数据
      const res = await pageQuery({ ...this.params, ...this.searchForm })
      this.tableData = res.data.list
      this.total = res.data.total
      this.loading = false
      this.searchForm = {}
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  .pick {
    margin-right: 10px;
  }
}
.money_color {
  color: #e65d6e;
  font-size: 18px;
  margin-right: 3px;
}
</style>

<!--
 * @Description:
 * @Author: ljy
 * @Date: 2021-06-24 16:23:07
 * @LastEditors: ljy
 * @LastEditTime: 2021-06-28 18:39:40
-->
<template>
  <!-- 资讯列表页面 -->
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="form.status" placeholder="状态" clearable>
            <el-option label="未审核" value="未审核" />
            <el-option label="审核通过" value="审核通过" />
            <el-option label="审核不通过" value="审核不通过" />
            <el-option label="推荐" value="推荐" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.title"
            placeholder="标题"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.categoryId"
            placeholder="请选择栏目"
            clearable
          >
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearch">查询</el-button>
        </el-form-item>
        <el-button type="primary" class="up" @click="toAdd">发布风采</el-button>
      </el-form>
    </div>

    <el-dialog title="审核风采信息" :visible.sync="visible">
      <h3 class="title">{{ formTwo.title }}</h3>
      <span v-html="formTwo.content" />
      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="noPass(formTwo.id)"
        >审核不通过</el-button>
        <el-button
          type="primary"
          @click="toPass(formTwo.id)"
        >审核通过</el-button>
      </div>
    </el-dialog>

    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        @row-click="toJump"
      >
        <el-table-column fixed type="index" label="序号" width="80" />
        <el-table-column prop="cover" label="封面" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.cover" alt="" class="photo">
          </template>
        </el-table-column>
        <el-table-column prop="" label="风采">
          <template slot-scope="scope">
            <div>{{ scope.row.title }}</div>
            <div>
              {{
                scope.row.baseUser === null ? "" : scope.row.baseUser.realname
              }}
            </div>
            <div>
              {{ scope.row.category === null ? "" : scope.row.category.name }}
            </div>
            <div>{{ scope.row.publishTime }}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === '审核通过'" type="success">{{
              scope.row.status
            }}</el-tag>
            <el-tag v-if="scope.row.status === '未审核'" type="info">{{
              scope.row.status
            }}</el-tag>
            <el-tag v-if="scope.row.status === '推荐'" type="warning">{{
              scope.row.status
            }}</el-tag>
            <el-tag v-if="scope.row.status === '审核不通过'" type="danger">{{
              scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.stop="toRecommend(scope.row)"
            >推荐</el-button>
            <el-button
              type="text"
              class="blue_info"
              size="small"
              @click.stop="toExamine(scope.row)"
            >审核</el-button>
            <el-button
              type="text"
              class="red_info"
              size="small"
              @click.stop="toDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
</template>

<script>
import { pageQuery, changeStatus, deleteById } from '@/api/article'
import { findAll } from '@/api/category'

export default {
  data() {
    return {
      formTwo: {},
      visible: false,
      categoryData: [],
      loading: true,
      tableData: [],
      form: {},
      total: 0,
      params: {
        page: 1,
        pageSize: 10
      }
    }
  },
  computed: {},
  watch: {
    params: {
      handler() {
        this.queryData()
      },
      deep: true
    }
  },
  created() {
    this.queryData()
    this.categoryQuery()
  },
  mounted() {},
  methods: {
    toJump(row) {
      console.log(this.tableData)
      this.$router.push({
        path: '/Details',
        query: { id: row.id }
      })
    },
    async toPass(row) {
      const res = await changeStatus({
        id: row,
        status: '审核通过'
      })
      this.$notify.success({
        title: '成功',
        message: res.message
      })
      this.queryData()
      this.visible = false
    },
    async noPass(row) {
      const res = await changeStatus({
        id: row,
        status: '审核不通过'
      })
      this.$notify.success({
        title: '成功',
        message: res.message
      })
      this.queryData()
      this.visible = false
    },
    toDelete(id) {
      this.$confirm('是否删除该资讯', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await deleteById({ id })
          this.$notify.success({
            title: '成功',
            message: res.message
          })
          this.queryData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '删除未成功'
          })
        })
    },
    toExamine(row) {
      // this.title = row.title;
      // this.content = row.content;
      this.formTwo = row
      this.visible = true
    },
    toRecommend(row) {
      this.$confirm('是否推荐该资讯', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await changeStatus({
            id: row.id,
            status: '推荐'
          })
          this.$notify.success({
            title: '成功',
            message: res.message
          })
          this.queryData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '推荐未成功'
          })
        })
    },
    toSearch() {
      this.queryData()
    },
    toAdd() {
      this.$router.push({
        path: '/Publish',
        query: {}
      })
    },
    async categoryQuery() {
      const res = await findAll()
      this.categoryData = res.data
      // console.log(res.data);
    },
    async queryData() {
      this.loading = true
      const temp = {
        ...this.form,
        ...this.params
      }
      for (const key in temp) {
        if (!temp[key]) {
          delete temp[key]
        }
      }
      // console.log(temp);
      const res = await pageQuery(temp);
      (this.loading = false), (this.tableData = res.data.list)
      this.total = res.data.total
      this.imageUrl = res.data.cover
    },
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
    }
  }
}
</script>
<style scoped>
.up {
  float: right;
}
.photo {
  width: 130px;
  height: 90px;
}
.title {
  text-align: center;
}
</style>

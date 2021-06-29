<template>
  <!-- 员工管理页 -->
  <div>
    <!-- 模糊查询 -->
    <div class="search">
      <!-- {{ searchForm }} -->
      <div class="btn">
        <el-button type="primary" @click="toAdd">添加</el-button>
      </div>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model="searchForm.username"
            clearable
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option label="禁用" value="禁用" />
            <el-option label="正常" value="正常" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格  -->
    <div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="realname" label="姓名" />
        <el-table-column prop="telephone" label="手机号" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '正常' ? 'success' : 'danger'"
            >{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="toEdit(scope.row)"
            >编辑</el-button>
            <el-button
              class="red_info"
              type="text"
              size="small"
              @click="toDelete(scope.row.id)"
            >删除</el-button>
            <el-button
              class="blue_info"
              type="text"
              size="small"
              @click="toInfo(scope.row.id)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination-div">
      <el-pagination
        :current-page="params.page"
        :page-sizes="[5, 10, 15, 25]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 模态框 -->
    <div>
      <el-dialog title="添加员工信息" :visible.sync="visible" @close="toClose">
        <!-- {{ ruleForm }} -->
        <el-form
          ref="ruleForm"
          :model="form"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="form.realname" />
          </el-form-item>
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="form.telephone" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="添加员工信息"
        :visible.sync="visibleTwo"
        @close="toClose"
      >
        <!-- {{ ruleForm }} -->
        <el-form
          ref="ruleForm"
          :model="form"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="form.realname" />
          </el-form-item>
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="form.telephone" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio label="禁用" />
              <el-radio label="正常" />
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visibleTwo = false">取 消</el-button>
          <el-button type="primary" @click="toSaveTwo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  pageQuery,
  addUserWidthRole,
  saveOrUpdate,
  deleteById
} from '@/api/user'

export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      params: {
        roleId: 1,
        page: 1,
        pageSize: 10
      },
      // 信息总数
      total: 0,
      form: {},
      data: {},
      visible: false,
      visibleTwo: false,
      // 加载
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        status: [{ required: true, trigger: 'blur' }],
        telephone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
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
  },
  mounted() {},
  methods: {
    toInfo(id) {
      // console.log(res);
      // this.data = res;
      // console.log(id);
      this.$router.push({
        path: '/Details',
        query: {
          id: id
        }
      })
    },
    toDelete(id) {
      this.$confirm('是否删除该信息', '提示', {
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
    toEdit(row) {
      this.visibleTwo = true
      this.form = row
      this.title = '编辑员工信息'
    },
    toClose() {
      this.$refs['ruleForm'].resetFields()
    },
    toAdd() {
      this.form = {}
      this.visible = true
      this.title = '添加员工信息'
    },
    async queryData() {
      this.loading = true
      const temp = {
        ...this.searchForm,
        ...this.params
      }
      for (const key in temp) {
        if (!temp[key]) {
          delete temp[key]
        }
      }
      const res = await pageQuery(temp);
      // 加载完毕
      (this.loading = false), (this.tableData = res.data.list)
      this.total = res.data.total
      // console.log(res);
    },
    toSearch() {
      this.queryData()
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
    },
    toSave() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const obj = {
            roleId: 1,
            ...this.form
          }
          const res = await addUserWidthRole(obj)
          this.$notify.success({
            title: '成功',
            message: res.message
          })
          this.queryData()
          this.visible = false
        } else {
          return false
        }
      })
    },
    toSaveTwo() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const obj = {
            roleId: 1,
            ...this.form
          }
          const res = await saveOrUpdate(obj)
          this.$notify.success({
            title: '成功',
            message: res.message
          })
          this.queryData()
          this.visibleTwo = false
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  margin: 5px;
  .btn {
    padding-right: 10px;
  }
}
</style>

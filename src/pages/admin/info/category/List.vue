<!--
 * @Description:
 * @Author: ljy
 * @Date: 2021-06-24 16:23:07
 * @LastEditors: ljy
 * @LastEditTime: 2021-06-28 18:33:55
-->
<template>
  <!-- 资讯分类管理 -->
  <div>
    <div>
      <el-button type="primary" @click="toAdd">新增</el-button>
    </div>
    <div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="name" label="名称" width="120" />
        <el-table-column prop="no" label="排序号" width="80" />
        <el-table-column prop="description" label="描述" />
        <el-table-column fixed="right" label="操作" width="100">
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
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-dialog title="新增栏目信息" :visible.sync="visible" @close="toClose">
        <el-form ref="ruleForm" :model="form" :rules="rules">
          <el-form-item
            label="栏目名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="序号" :label-width="formLabelWidth">
            <el-input v-model="form.no" autocomplete="off" />
          </el-form-item>
          <el-form-item label="栏目介绍" :label-width="formLabelWidth">
            <el-input
              v-model="form.description"
              type="textarea"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { findAll, saveOrUpdate, deleteById } from '@/api/category'
export default {
  data() {
    return {
      loading: false,
      formLabelWidth: '',
      tableData: [],
      visible: false,
      form: {},
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  created() {
    this.queryData()
  },
  mounted() {},
  methods: {
    toAdd() {
      this.form = {}
      this.visible = true
    },
    toClose() {
      this.$refs.ruleForm.resetFields()
    },
    toSave() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const res = await saveOrUpdate(this.form)
          this.$notify.success({
            title: '成功',
            message: res.message
          })
          this.visible = false
          this.queryData()
        } else {
          return false
        }
      })
    },
    toEdit(row) {
      this.form = row
      this.visible = true
    },
    async toDelete(id) {
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
      // console.log(id);
    },
    async queryData() {
      this.loading = true
      const res = await findAll();
      // this.tableData = res.data;
      (this.loading = false), (this.tableData = res.data)
      // console.log(res.data);
    }
  }
}
</script>
<style scoped>
</style>

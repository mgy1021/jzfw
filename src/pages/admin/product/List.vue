<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-06-22 14:46:32
 * @LastEditors: Mogy
 * @LastEditTime: 2021-06-29 11:17:08
-->
<template>
  <div class="product-list">
    <!-- 添加按钮，模糊搜索查询按钮 -->
    <div class="search">
      <!-- ----{{categoryData}} -->
      <div>
        <el-button type="primary" class="btn" @click="toAdd">添加</el-button>
      </div>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchForm.name" clearable placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.status" clearable placeholder="产品状态">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.productCategoryId" clearable placeholder="产品分类">
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" v-loading="loading" border style="width: 100%">
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column prop="id" label="产品编号" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column label="图片" align="center" width="50px">
          <template slot-scope="scope">
            <!-- {{scope.row.photo}} -->
            <!-- <img :src="scope.row.photo" alt=""> -->
            <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.photo"
              :preview-src-list="[scope.row.photo]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <!-- <el-tag v-if="scope.row.status === '正常'" type="success">{{scope.row.status}}</el-tag>
            <el-tag v-else type="danger">{{scope.row.status}}</el-tag>-->
            <el-tag :type="scope.row.status === '正常'?'success':'danger'">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category.name" label="所属栏目" align="center"></el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <!-- <el-button v-if="scope.row.status ==='下架'" @click="toOnline(scope.row.id)" type="text" size="small">上架</el-button>
            <el-button v-else @click="toOffline(scope.row.id)" type="text" size="small">下架</el-button>-->
            <el-button
              :disabled="scope.row.status==='正常'"
              @click="toOnline(scope.row.id)"
              type="text"
              size="small"
            >上架</el-button>
            <el-button
              class="red_info"
              :disabled="scope.row.status==='下架'"
              @click="toOffline(scope.row.id)"
              type="text"
              size="small"
            >下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-div">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[2,5, 10, 15, 20]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 模态框 -->
    <!-- :before-close="toClose" -->
    <el-dialog :title="title" :visible.sync="visible" @close="toClose">
      <!-- {{tableForm}} -->
      <el-form :model="tableForm" :rules="rules" ref="ruleForm" size="small">
        <el-form-item label="产品名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="tableForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目" :label-width="formLabelWidth" prop="productCategoryId">
          <el-select v-model="tableForm.productCategoryId" placeholder="请选择所属栏目">
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model.number="tableForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth" prop="photo">
          <el-upload
            class="avatar-uploader"
            :action="uploadFileURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="tableForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageQuery } from "@/api/proCategory";
import {
  pageQuery as pageQueryPro,
  saveOrUpdate,
  online,
  offline,
} from "@/api/product";
import { showFileURL, uploadFileURL } from "@/utils/config";

export default {
  data() {
    return {
      showFileURL,
      uploadFileURL,
      // 模糊搜索表单的数据
      searchForm: {
        name: "",
        status: "",
        productCategoryId: "",
      },
      // 产品栏目分类的数据
      categoryData: [],
      // 表格展示的数据
      tableData: [],
      // 分页参数
      params: {
        page: 1,
        pageSize: 10,
      },
      // 总条数
      total: 0,
      loading: false,
      // 模态框表单对象
      tableForm: {},
      // 模态框的显示与隐藏
      visible: false,
      // 表单空间标题的宽度
      formLabelWidth: "80px",
      // 模态框的标题
      title: "",
      // 图片Url
      imageUrl: "",
      // 校验规则
      rules: {
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        productCategoryId: [
          { required: true, message: "请选择所属栏目", trigger: "change" },
        ],
        price: [
          { required: true, message: "请输入产品价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字值", trigger: "blur" },
        ],
        photo: [{ required: true, message: "请上传封面图片" }],
      },
    };
  },
  computed: {},
  methods: {
    //   获取产品分类数据
    async queryCategoryData() {
      let res = await pageQuery({
        page: 1,
        pageSize: 100,
      });
      // console.log(res);
      this.categoryData = res.data.list;
    },
    // 分页模糊获取产品数据
    async queryData() {
      this.loading = true;
      let temp = {
        ...this.searchForm,
        ...this.params,
      };
      // 删除属性
      // 遍历对象
      for (let key in temp) {
        // key是一个变量，代表的是属性名
        // console.log(key,temp[key]);
        if (!temp[key]) {
          delete temp[key];
        }
      }
      let res = await pageQueryPro(temp);
      // 加载完毕
      this.loading = false;
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    // 查询按钮
    toSearch() {
      this.queryData();
    },
    // 每页显示的条数发生变化时的事件处理程序
    handleSizeChange(val) {
      // this.params.pageSize = val;
      this.params = {
        page: 1,
        pageSize: val,
      };
    },
    //   当前页码发生变化时的事件处理程序
    handleCurrentChange(val) {
      this.params.page = val;
    },
    toAdd() {
      //   清空表单
      this.tableForm = {};
      //   清空图片上传url
      this.imageUrl = "";
      this.title = "添加产品信息";
      this.queryCategoryData();
      this.visible = true;
    },
    //   图片上传成功的回调函数
    handleAvatarSuccess(res, file) {
      // console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl);
      this.tableForm.photo = showFileURL + res.data.id;
    },
    //   图片上传之前的回调函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //   模态框确定按钮的事件处理程序
    toSave() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log("校验通过");
          let res = await saveOrUpdate(this.tableForm);
          //   提示用户保存成功,刷新表格数据，关闭模态框
          this.$notify({
            title: "成功",
            message: res.massage,
            type: "success",
          });
          // 刷新数据
          this.queryData();
          // 关闭模态框
          this.visible = false;
        } else {
          return false;
        }
      });
    },
    //   关闭模态框
    toClose() {
      // 重置表单验证
      this.$refs.ruleForm.resetFields();
      // 关闭模态框
      // 超时调用
      //   setTimeout(() => {
      //     this.visible = false;
      //   }, 200);
    },
    toEdit(row) {
      // 显示模态框
      this.visible = true;
      //   设置表单数据
      this.tableForm = {
        ...row,
        id: row.id,
      };
      this.imageUrl = row.photo;
      this.title = "编辑产品信息";
    },
    // 上架产品
    async toOnline(id) {
      let res = await online({ id });
      this.$notify.success({
        title: "成功",
        message: res.message,
      });
      this.queryData();
    },
    async toOffline(id) {
      let res = await offline({ id });
      this.$notify.success({
        title: "成功",
        message: res.message,
      });
      this.queryData();
    },
  },
  //   监听
  watch: {
    //   深度监听分页参数
    params: {
      handler() {
        this.queryData();
      },
      deep: true,
    },
  },
  created() {
    // 发送请求
    this.queryCategoryData();
    this.queryData();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
// .product-list{
//     padding: 10px;
// }
.search {
  display: flex;
  .btn {
    margin-right: 30px;
  }
}
</style>

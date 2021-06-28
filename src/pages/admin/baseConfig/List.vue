<!--
 * @Description:
 * @Author: wfz
 * @Date: 2021-06-25 08:48:39
 * @LastEditors: wfz
 * @LastEditTime: 2021-06-25 10:06:38
-->
<template>
  <!-- 基础配置页面 -->
  <div>
    基础配置页面
    <div>
      配置项目中的组件大小:
      <!-- <el-button size="medium" @click="toChangeSize('medium')"
        >中等组件大小按钮</el-button
      >
      <el-button size="small" @click="toChangeSize('small')"
        >小型组件按钮</el-button
      >
      <el-button size="mini" @click="toChangeSize('mini')"
        >超小组件按钮</el-button
      > -->
      <el-radio-group v-model="size">
        <el-radio label="medium">中等组件大小按钮</el-radio>
        <el-radio label="small">小型组件按钮</el-radio>
        <el-radio label="mini">超小组件按钮</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      size: Cookies.get('size')
    }
  },
  computed: {},
  watch: {
    size(newValue, oldValue) {
      this.toChangeSize(newValue)
    }
  },
  created() {},
  mounted() {},
  methods: {
    toChangeSize(size) {
      Cookies.set('size', size)

      this.$confirm('是否确定让配置生效，并现在刷新页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          location.reload()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '请手动刷新页面让配置生效'
          })
        })
    }
  }
}
</script>
<style scoped>
</style>

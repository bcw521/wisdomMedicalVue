<template>
  <el-dialog
      title="预约"
      width="40%"
  >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('form')">挂号</el-button>
          <el-button @click="$router.push('/front/index')">注册</el-button>
        </span>
  </el-dialog>
</template>
<script>
export default {
  name: "loginView"
}
</script>

<style scoped>

</style>

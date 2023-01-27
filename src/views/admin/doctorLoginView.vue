<template>
  <div style="background-color:#2d3a4b;height:100%;width: 100%;position: fixed">
    <div style="position: absolute;top: 120px;left: 400px;width: 600px;height: 400px">
      <span style="color:white;display:inline-block;font-size: 24px;font-weight: bolder;margin-left: 220px;margin-top: 40px">医&nbsp;生&nbsp;登&nbsp;录</span>
      <el-input placeholder="请输入账号" v-model="form.account" class="form" prefix-icon="el-icon-s-custom"></el-input>
      <el-input placeholder="请输入密码" v-model="form.password" class="form" prefix-icon="el-icon-lock" show-password></el-input>
      <el-button type="primary" class="form" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import {loginDoctor} from "@/api";

export default {
  name: "doctotLoginView",
  data(){
    return{
      form:{
        account:'',
        password:''
      }
    }
  },
  methods:{
    async login() {
      let res=await loginDoctor(this.form);
      if (res.data.success){
        localStorage.setItem("name",res.data.data.name);
        localStorage.setItem("account",this.form.account);
        localStorage.setItem("token",res.data.data.token);
        localStorage.setItem("id",res.data.data.id);
        await this.$router.push("/doctor/index")
      }else {
        this.$message.error(res.data.message);
      }
    }
  }
}
</script>

<style scoped>
.form{
  width: 80%;
  margin-top: 40px;
  margin-left: 40px;
}
</style>

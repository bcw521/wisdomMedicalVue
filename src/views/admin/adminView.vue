<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!--    头部部分-->
    <div style="height: 60px;line-height: 60px;background-color: white;">
      <img src="@/assets/logo.png" alt="" style="width: 60px;">
      <span style="font-size: 24px;position: absolute;top: 0;color:seagreen;">后台管理系统</span>
      <span style="font-size: 24px;position: absolute;top: 0;color:seagreen;margin-left: 440px">
        欢迎您,管理员
      </span>
      <img src="@/assets/fullScreen.png" @click="fullScreen" title="进入全屏" style="margin-left: 1175px;margin-top: 16px">
      <el-dropdown style="margin-left: 30px">
          <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="uppwd">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div style="display: flex">
      <div class="aside">
        <el-menu :default-active="$route.path" router class="el-menu-demo">
          <el-menu-item index="/admins/index">
            <span><i class="el-icon-s-home"></i></span>
            首页
          </el-menu-item>
          <el-menu-item index="/admins/adddoctor">
            <span></span>
            添加医生
          </el-menu-item>
          <el-menu-item index="/admins/showdoctor">
            <span></span>
            查看医生
          </el-menu-item>
        </el-menu>
      </div>
      <div style="flex: 1">
        <el-calendar v-model="value">
        </el-calendar>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>修改密码</span>
          </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
              <el-form-item label="原始密码" prop="password">
                <el-input v-model="ruleForm.password" autocomplete="off" show-password></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="cancel" style="margin-left: 60px">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
import {adminuppwd,} from "@/api";
export default {
  name: "DoctorView",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      value: new Date(),
      ruleForm: {
        id:localStorage.getItem("id"),
        password:'',
        pass: '',
        checkPass: '',
      },
      rules: {
        password: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    fullScreen() {
      if (screenfull.isEnabled && !screenfull.isFullscreen) {
        screenfull.request();
      }
    },
    logout(){
      this.$router.push('/admin/login');
      this.$message.success("登出成功");
    },
    uppwd(){
      let form=document.querySelector('.box-card');
      form.style.display='block';
    },
    cancel(){
      let form=document.querySelector('.box-card');
      form.style.display='none';
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         adminuppwd(this.ruleForm.pass,this.ruleForm.id).then(
              res=>{
                this.$message.success(res.data.message);
                this.ruleForm={};
                let form=document.querySelector('.box-card');
                form.style.display='none';
              }
          )
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.aside{
  width: 300px;
  height: calc(100vh - 60px);
  overflow: hidden;
}
.box-card{
  top: 120px;
  position: absolute;
  background-color: skyblue;
  left: 480px;
  display: none;
}
</style>


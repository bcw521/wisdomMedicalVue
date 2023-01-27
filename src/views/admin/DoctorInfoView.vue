<template>
  <div>
    <!--    头部部分-->
    <div style="height: 60px;line-height: 60px;background-color: white;">
      <img src="@/assets/logo.png" alt="" style="width: 60px;">
      <span style="font-size: 24px;position: absolute;top: 0;color:seagreen;">后台管理系统</span>
      <span style="font-size: 24px;position: absolute;top: 0;color:seagreen;margin-left: 440px">
        欢迎您,{{username}}医生
      </span>
      <img src="@/assets/fullScreen.png" @click="fullScreen" title="进入全屏" style="margin-left: 1175px;margin-top: 16px">
      <el-dropdown style="margin-left: 30px">
          <span class="el-dropdown-link">
          {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div style="display: flex">
      <div class="aside">
        <el-menu :default-active="$route.path" router class="el-menu-demo">
          <el-menu-item index="/doctor/index">
            <span><i class="el-icon-s-home"></i></span>
            首页
          </el-menu-item>
          <el-submenu index="">
            <template slot="title">病员管理</template>
            <el-menu-item index="/doctor/patient">
              <span><i class="el-icon-tickets"></i></span>
              病员列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="">
            <template slot="title">病历管理</template>
            <el-menu-item index="/doctor/inrecord">
              <span><i class="el-icon-tickets"></i></span>
              添加病历
            </el-menu-item>
            <el-menu-item index="">
              <span><i class="el-icon-tickets"></i></span>
              修改病历
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/doctor/info">
            <span><i class="el-icon-s-home"></i></span>
            个人中心
          </el-menu-item>
        </el-menu>
      </div>
      <div style="flex: 1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            医生信息
          </div>
          <div>
            <el-descriptions>
            <el-descriptions-item label="用户名">{{username}}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{phone}}</el-descriptions-item>
            <el-descriptions-item label="所在部门">{{office_name}}</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">专家</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="账号">{{account}}</el-descriptions-item>
            </el-descriptions>
          </div>
         <el-button @click="dialogFormVisible = true" type="text">修改个人信息</el-button>
        </el-card>
        <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updatedoctor">确 定</el-button>
      </div>
        </el-dialog>
        <el-button @click="editpwdVisible=true" type="text">修改密码</el-button>
        <el-dialog title="修改密码" :visible.sync="editpwdVisible">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="原始密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="ruleForm.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="pass">
              <el-input v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth"  prop="checkPass">
              <el-input v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editpwdVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
        </el-dialog>
  </div>
  </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
import {doctorInfo, doctorupinfo, doctorupppwd} from "@/api";
import Cookies from 'js-cookie'
import {updatadoctorpwd} from "@/api/update";
export default {
  name: "DoctorInfoView",
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
      account:'',
      office_name:'',
      phone:'',
      form: {
        id:localStorage.getItem("id"),
        account:localStorage.getItem("account"),
        phone:localStorage.getItem("phone")
      },
      dialogFormVisible:false,
      editpwdVisible:false,
      formLabelWidth: '120px',
      username:localStorage.getItem("name"),
      ruleForm: {
        password:'',
        pass: '',
        checkPass: '',
        id:localStorage.getItem("id"),
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
  created() {
    this.account=localStorage.getItem("account");
    doctorInfo(this.username).then(
        res=>{
          this.office_name=res.data.data.info
          this.phone=res.data.data.phone
          localStorage.setItem("phone",this.phone);
        }
    )
  },
  methods: {
    fullScreen() {
      if (screenfull.isEnabled && !screenfull.isFullscreen) {
        screenfull.request();
      }
    },
    logout(){
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      localStorage.removeItem("phone");
      localStorage.removeItem("id");
      this.$router.push('/doctor/login');
      this.$message.success("登出成功");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          doctorupppwd(this.ruleForm.pass,this.ruleForm.id).then(
              res=>{
                this.$message.success(res.data.message);
                this.ruleForm={};
                this.editpwdVisible=false;
              }
          )
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updatedoctor(){
      console.log(this.form);
      doctorupinfo(this.form).then(
          res=>{
            this.$message.success(res.data.message+"下次登录时请使用该账号进行登录");
            this.form={};
            this.dialogFormVisible=false;
          }
      )
    }
  }
}
</script>

<style scoped>
.aside{
  width: 300px;
  height: calc(100vh - 60px);
  overflow: hidden;
}
</style>

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
          <el-submenu>
            <template slot="title">病员管理</template>
            <el-menu-item index="/doctor/patient">
              <span><i class="el-icon-tickets"></i></span>
              病员列表
            </el-menu-item>
          </el-submenu>
          <el-submenu>
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
          <div>
            <el-table
                :data="tableData"
                border stripe
                style="width: 100%;margin: 20px auto">
              <el-table-column
                  prop="name"
                  label="挂号人姓名"
                 >
              </el-table-column>
              <el-table-column
                  prop="sex"
                  label="挂号人性别"
                  >
              </el-table-column>
              <el-table-column
                  prop="book_time"
                  label="挂号时间"
                  >
              </el-table-column>
            </el-table>
          </div>
        </el-card>
    </div>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
import {doctorInfo, doctorupinfo, doctorupppwd, page, selectAppointmentD} from "@/api";
export default {
  name: "DoctorInfoView",
  data() {
    return {
      tableData:[],
      username:localStorage.getItem("name"),
      }
  },
  created() {
    this.account=localStorage.getItem("account");
    let token = localStorage.getItem("token");
    this.token=token.substring(0,token.length-1);
    doctorInfo(this.username).then(
        res=>{
          this.office_name=res.data.data.info
          this.phone=res.data.data.phone
          localStorage.setItem("phone",this.phone);
        }
    )
    this.query();
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
            console.log(res.data);
          }
      )
    },
    query(){
      selectAppointmentD(this.username).then(
          res=>{
            this.total=res.data.data.length;
            console.log(res.data.data);
            this.total=res.data.data.length;
            this.tableData=res.data.data;
          }
      );
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

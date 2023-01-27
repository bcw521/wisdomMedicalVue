<template xmlns="http://www.w3.org/1999/html">
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
        <el-calendar v-model="value">
        </el-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "DoctorView",
  data() {
    return {
      value: new Date(),
      username:localStorage.getItem("name"),
    };
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
      this.$router.push('/doctor/login');
      this.$message.success("登出成功");
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


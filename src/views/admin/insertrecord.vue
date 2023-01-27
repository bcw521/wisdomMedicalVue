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
            <el-menu-item index="/doctor/updaterecord">
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
        <form v-on:submit.prevent="submit()">
<!--          form标签上的@submit.prevent为提交时阻止表单的默认行为（跳转）
v-model.trim是将输入的数据去除前后的空格；
v-model.number是转换为Number类型；
v-model.lazy是失去焦点后再把数据渲染到页面上-->
        <table style="margin-left: 10px;border-collapse: collapse;"border="1">
          <caption align="top">门诊病历</caption>
          <tr style="height: 30px;">
            <td>姓名:<input type="text" v-model="form.name" style="border: 0;width: 100px"></input>
            </td>
            <td>性别:<input type="text" v-model="form.sex" style="border: 0;width: 30px;"></input></td>
            <td>年龄:<input type="text" v-model="form.age" style="border: 0;width: 30px;"></input></td>
            <td>职业:<input type="text" v-model="form.career" style="border: 0;"></input></td>
            <td>住址:<input type="text" v-model="form.address" style="border: 0;width: 300px"></input></td>
          </tr>
          <tr style="height: 30px;">
            <td>是否需要住院:<select>
              <option value="true">请选择</option>
              <option value="true" v-model="form.hospital">是</option>
              <option value="false" v-model="form.hospital">否</option>
            </select></td>
            <td>就诊时间:<input type="text" placeholder="按照年月日的标准格式填写" v-model="form.create_d_time"></input></td>
            <td>医生姓名:<input type="text" v-model="form.doctor_name"></input> </td>
          </tr>
        </table>
          疾病详情:<textarea rows="10" cols="30" v-model="form.disease"></textarea>
          <br>
          重置:<input type="reset"></input>
          提交:<button>提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
import {insertrecord} from "@/api";
export default {
  name: "DoctorView",
  data() {
    return {
      form:{
        name:'',
        sex:'',
        address:'',
        career:'',
        age:'',
        doctor_name:this.username,
        create_d_time:'',
        disease:'',
        hospital:''
      },
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
    },
    submit(){
      insertrecord(this.form).then(
          res=>{
            console.log(res.data);
          }
      )
    },
  },
}
</script>

<style scoped>
.aside{
  width: 300px;
  min-height: calc(100vh - 60px);
  overflow: hidden;
}
</style>


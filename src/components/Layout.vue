<template>
  <div class="container">
    <div class="row">
      <div class="header">
        <img src="@/assets/logo.png" height="120" style="position: relative">
        <span>------网上预约挂号系统</span>
      </div>
    </div>
    <div class="row">
      <div class="col1">
        <table>
          <tr>
            <td style="padding-top: 40px">
              <el-button style="width: 200px;height: 60px;" type="info" icon="el-icon-warning-outline" @click="notice">挂号须知</el-button>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 40px">
              <el-button style="width: 200px;height: 60px;" type="success" icon="el-icon-s-custom" @click="sick_register">病员注册</el-button>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 40px">
              <el-button style="width: 200px;height: 60px;" type="warning" icon="el-icon-edit">网上挂号</el-button>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 40px">
              <el-button style="width: 200px;height: 60px;" type="primary" icon="el-icon-search">挂号查询</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data(){
    return{
      active:0,
    }
  },
  methods:{
    notice(){
      let ghxz=document.querySelector('.ghxz');
      ghxz.style.display='block';
      let byzc=document.querySelector('.byzc');
      byzc.style.display='none';
    },
    sick_register(){
      let ghxz=document.querySelector('.ghxz');
      ghxz.style.display='none';
      let byzc=document.querySelector('.byzc');
      byzc.style.display='block';
    }
  }
}
</script>

<style scoped>
.container{
  margin-left: 160px;
}
.col1{
  width: 200px;
  height: 500px;
  position: relative;
}
.header span{
  display: inline-block;
  position: absolute;
  margin-top: 55px;
  font-size: 40px;
  font-weight: bolder;
  color: palevioletred;
  left: 830px;
}
</style>

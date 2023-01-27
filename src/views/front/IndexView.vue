<template>
  <div>
    <Layout></Layout>
    <div class="col2">
      <el-card class="ghxz">
        <div slot="header" class="clearfix">
          <span>|&nbsp;&nbsp;挂号须知</span>
        </div>
        <div>
          欢迎您网上挂号，请您自觉遵守以下条款<br>
          1、预约挂号采用网络预约<br>
          2、网上挂号实行实名注册，用户必须成为网站的注册会员方可使用网上挂号功能。<br>
          3、预约后请于一个工作日后（24小时）在挂号查询界面查询挂号是否通过审核，通过审核为ture,未通过审核为false<br>
          <div>
            <el-steps direction="vertical" :active="active" space="100px" finish-status="success">
              <el-step title="病员网上注册"></el-step>
              <el-step title="选择相应科室和专家"></el-step>
              <el-step title="进行网上挂号"></el-step>
            </el-steps>
            <el-button @click="next">下一步</el-button>
          </div>
        </div>
      </el-card>
      <el-card class="byzc" style="display: none">
        <div slot="header" class="clearfix">
          <span>|&nbsp;&nbsp;网络服务使用协议</span>
        </div>
        <div>
          1. 使用规则<br>
          1.1 用户在申请使用网络服务时，必须提供准确的个人资料，如个人资料有任何变动，必须及时更新。<br>
          1.2 用户注册成功后，将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；<br>
          1.3 用户在使用网络服务过程中，必须遵循以下原则：<br>
          (a) 遵守中国有关的法律和法规；<br>
          (b) 不得为任何非法目的而使用网络服务系统；<br>
          (c) 遵守所有与网络服务有关的网络协议、规定和程序；<br>
          <br>
          <el-button type="info" @click="agree">同意</el-button>
          <el-button type="info" @click="noagree">不同意</el-button>
        </div>
      </el-card>
      <el-card class="wsgh" style="display: none">
        <div slot="header" class="clearfix">
          <span>|&nbsp;&nbsp;网上挂号</span>
        </div>
        <div>
          <el-button @click="chinese">中医门诊</el-button>
          <el-button @click="foregin">西医门诊</el-button>
        </div>
      </el-card>
      <el-card class="wsgh_ch" style="display: none">
        <div slot="header" class="clearfix">
          <span>|&nbsp;&nbsp;网上挂号</span>
        </div>
        <div>
          <el-button @click="wsgh_1">中医外科</el-button>
          <el-button @click="wsgh_2">中医内科</el-button>
        </div>
      </el-card>
      <el-card class="wsgh_fo" style="display: none">
        <div slot="header" class="clearfix">
          <span>|&nbsp;&nbsp;网上挂号</span>
        </div>
        <div>
          <el-button @click="wsgh_5">发热门诊</el-button>
          <el-button @click="wsgh_8">心理咨询</el-button>
          <el-button @click="wsgh_3">儿科</el-button>
          <el-button @click="wsgh_4">妇产科</el-button>
          <el-button @click="wsgh_6">男科</el-button>
          <el-button @click="wsgh_7">眼科</el-button>
          <br>
          <el-button class="mt10" @click="wsgh_11">神经外科</el-button>
          <el-button class="mt10" @click="wsgh_12">血液门诊</el-button>
          <el-button class="mt10" @click="wsgh_9">骨科</el-button>
          <el-button class="mt10" @click="wsgh_10">肛肠科</el-button>
        </div>
      </el-card>
    </div>
    <div class="row">

    </div>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
export default {
  name: "index",
  components: {
    Layout
  },
  data(){
    return{
      active:0,
    }
  },
  methods:{
    next(){
      this.active++;
      if (this.active===3){
        this.active=0;
      }
    },
    agree(){
      this.$router.push(
          {
            name:'frontRegister',
          }
      )
    },
    noagree(){
      let ghxz=document.querySelector('.ghxz');
      ghxz.style.display='block';
      let byzc=document.querySelector('.byzc');
      byzc.style.display='none';
    },
    chinese(){
      let wsgh=document.querySelector('.wsgh');
      wsgh.style.display='none';
      let wsgh_ch=document.querySelector('.wsgh_ch');
      wsgh_ch.style.display='block';
    },
    foregin(){
      let wsgh=document.querySelector('.wsgh');
      wsgh.style.display='none';
      let wsgh_fo=document.querySelector('.wsgh_fo');
      wsgh_fo.style.display='block';
    },
    wsgh_1(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:1
            }
          }
      )
    },
    wsgh_2(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:2
            }
          }
      )
    },
    wsgh_3(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:3
            }
          }
      )
    },
    wsgh_4(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:4
            }
          }
      )
    },
    wsgh_5(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:5
            }
          }
      )
    },
    wsgh_6(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:6
            }
          }
      )
    },
    wsgh_7(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:7
            }
          }
      )
    },
    wsgh_8(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:8
            }
          }
      )
    },
    wsgh_9(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:9
            }
          }
      )
    },
    wsgh_10(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:10
            }
          }
      )
    },
    wsgh_11(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:11
            }
          }
      )
    },
    wsgh_12(){
      this.$router.push(
          {
            name:'frontWsgh',
            query:{
              id:12
            }
          }
      )
    },
  }
}
</script>

<style scoped>
.col2{
  width: 600px;
  height: 500px;
  position: absolute;
  top: 170px;
  right: 380px;
}
.mt10{
  margin-top: 10px;
}
</style>

<template>
  <div>
    <Layout></Layout>
    <div class="col2">
      <el-card class="ghxz" style="display: none">
        <div slot="header" class="clearfix">
          <span>|&nbsp;&nbsp;挂号须知</span>
        </div>
        <div>
          欢迎您网上挂号，请您自觉遵守以下条款<br>
          1、预约挂号采用网络预约<br>
          2、网上挂号实行实名注册，用户必须成为网站的注册会员方可使用网上挂号功能。<br>
          3、预约后请于一个工作日后（24小时）在挂号查询界面查询挂号是否通过审核，通过审核为ture,未通过审核为false<br>
          <div>
            <el-steps direction="vertical" :active="active" space="100px">
              <el-step title="病员网上注册"></el-step>
              <el-step title="选择相应科室和专家"></el-step>
              <el-step title="进行网上挂号"></el-step>
            </el-steps>
            <el-button @click="next">下一步</el-button>
          </div>
        </div>
      </el-card>
      <el-card class="byzc">
        <div slot="header" class="clearfix">
          <span>|&nbsp;&nbsp;病员注册</span>
        </div>
        <div>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" maxlength="18"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="CardID">
              <el-input v-model="form.CardID"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio v-model="form.sex" label="男">男</el-radio>
              <el-radio v-model="form.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="现住址" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="疾病状况" prop="disease">
              <el-input v-model="form.disease" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                        show-word-limit maxlength="300"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
              <el-button native-type="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
  </div>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
export default {
  name: "registerView",
  components: {
    Layout
  },
  data(){
    let checkPassword=(rule,value,callback)=>{
      if (value==='') {
        callback(new Error('请输入密码'));
      }else {
        //密码要求含数字 字母和下划线
        let pattern=/^\w{6,18}$/;
        if(!pattern.test(value)){
          callback(new Error('密码长度须在6-18位之间'));
        }else {
          callback();
        }
        }
      }
      let checkPhone=(rule,value,callback)=>{
        if (value===''){
          callback(new Error('请输入电话号码'));
        }else {
          //密码要求含数字 字母和下划线
          let pattern=/^[1][3|4|5|6|7|8|9]\d{9}$/;
          if(!pattern.test(value)){
            callback(new Error('请输入正确的号码'));
          }else {
            callback();
          }
        }
      }
    return{
      active:0,
      form: {
        name: '',
        password:'',
        CardID:'',
        sex:'',
        phone:'',
        address:'',
        disease:'',
      },
      rules:{
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 2,  message: '请您认真填写您的真实姓名', trigger: 'blur' }
        ],
        password: [
          {validator:checkPassword,trigger: 'blur'}
        ],
        CardID: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          {min:18,max: 19,  message: '请您认真填写您的身份证', trigger: 'blur' }
        ],
        phone: [
          {validator:checkPhone,trigger:'blur'}
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ],
        disease: [
            {required:true,message:'疾病状况不能为空',trigger:'blur'}
        ]
      }
      }
    },methods:{
    next(){
      this.active++;
      if (this.active===3){
        this.active=0;
      }
    },
    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(this.form);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
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
</style>

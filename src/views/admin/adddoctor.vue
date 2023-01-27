<template>
  <div style="width: 80%;">
    <h2>新增医生</h2>
    <el-form :inline="true" :model="form" :rules="rules" ref="form" size="small" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="form.sex" placeholder="请输入性别"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="dep">
        <el-input v-model="form.dep" placeholder="请输入部门"></el-input>
      </el-form-item>
      <el-form-item label="号" prop="number">
        <el-input v-model="form.number" placeholder="请输入号"></el-input>
      </el-form-item>
      <el-form-item label="余号" prop="last_number">
        <el-input v-model="form.last_number" placeholder="请输入余号"></el-input>
      </el-form-item>
      <el-form-item label="是否在职">
        <el-radio v-model="form.is_work" label="true">是</el-radio>
        <el-radio v-model="form.is_work" label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="工作时间">
        <el-date-picker
            v-model="form.work_time"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="submitForm('form')">新增</el-button>
    </div>
    <div style="display: none;background-color: gold" id="pwd"></div>
    <el-button @click="$router.back()" type="success" round>回首页</el-button>
  </div>
</template>

<script>
import axios from "axios";
import {adddictor, depId} from "@/api";

export default {
  name: "adddoctor",
  data() {
    return {
      form: {
        name: '',
        sex: '',
        phone: '',
        dep: '',
        number: '',
        last_number: '',
        is_work: '',
        work_time: '',
      },
      account:localStorage.getItem("account"),
      password:localStorage.getItem("password"),
      rules: {
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '性别不能为空', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '联系方式不能为空', trigger: 'blur'}
        ],
        dep: [
          {required: true, message: '部门不能为空', trigger: 'blur'}
        ],
        number: [
          {required: true, message: '号不能为空', trigger: 'blur'}
        ],
        last_number: [
          {required: true, message: '余号不能为空', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.generateaccount();
          this.generatepassword();
          localStorage.setItem("phone",this.form.phone);
          localStorage.setItem("depname",this.form.dep);
          localStorage.setItem("name",this.form.name);
          localStorage.setItem("sex",this.form.sex);
          localStorage.setItem("dictor_time",this.form.work_time);
          localStorage.setItem("number",this.form.number);
          localStorage.setItem("last_number",this.form.last_number);
          axios.post("http://localhost:9090/admin/record",
              this.form).then(
              res => {
                if (res.data.code === '200') {
                  this.$message.success("添加成功");
                  this.getdepid();
                  setTimeout(function () {
                    let depid=Number(localStorage.getItem("depid"));
                    adddictor(depid,localStorage.getItem("name"),localStorage.getItem("phone"),localStorage.getItem("sex")
                    ,localStorage.getItem("account"),localStorage.getItem("password"),localStorage.getItem("dictor_time"),
                    localStorage.getItem("number"),localStorage.getItem("last_number")).then(
                        res=>{
                          console.log(res.data);
                          let password=res.data.data;
                          let account=res.data.message;
                          let selector = document.querySelector('#pwd');
                          selector.style.display='block';
                          selector.innerHTML="该医生所生成的账号是"+account+
                              "该医生所生成的初始密码是"+password;
                          localStorage.clear();
                        }
                    )
                  },1000);
                } else {
                  this.$message.error("添加失败");
                }
              }
          )
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    generateaccount(){
      let base=['a','b','c','d','e','f','g','h','i'];
      let account='';
      for (let i = 0; i < 6; i++) {
        account+=base[Math.floor(Math.random()*6)];
      }
      localStorage.setItem("account",account);
    },
    generatepassword(){
      let base=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q'];
      let password='';
      for (let i = 0; i < 8; i++) {
        password+=base[Math.floor(Math.random()*8)];
      }
      localStorage.setItem("password",password);
    },
    getdepid(){
      let depname = localStorage.getItem("depname");
      depId(depname).then(
          res=>{
            localStorage.setItem("depid",res.data.data)
          }
      )
    },
  }
}
</script>

<style scoped>

</style>

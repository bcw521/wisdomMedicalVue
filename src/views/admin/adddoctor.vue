<template>
  <div style="width: 80%;">
    <h2>新增用户</h2>
    <el-form :inline="true" :model="form"  size="small" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.sex" label="男">男</el-radio>
        <el-radio v-model="form.sex" label="女">女</el-radio>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="insert">新增</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "adddoctor",
  data(){
    return {
      form:{

      },
    }
  },
  methods:{
    insert(){
      axios.post("http://localhost:9090/users",
          this.form).then(
          res=>{
            if (res.data.code==='200'){
              this.$message.success("添加成功");
              this.form={}
            }else {
              this.$message.error("添加失败");
            }
          }
      )
    }
  }
}
</script>

<style scoped>

</style>

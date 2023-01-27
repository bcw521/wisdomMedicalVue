<template>
  <div style="width: 80%;">
    <h2>修改病历</h2>
    <el-form :inline="true" :model="form" size="small" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="form.career"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="form.address" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="就诊时间">
      <el-input v-model="form.create_d_time" ></el-input>
    </el-form-item>
      <el-form-item label="疾病">
        <el-input v-model="form.disease" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="update">修改</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {getrecord} from "@/api";

export default {
  name: "updaterecor",
  data() {
    return {
      form: {},
    }
  },
  methods: {
    update() {
      axios.put("http://localhost:9090/doctor/record",
          this.form).then(
          res => {
            if (res.data.code === '200') {
              this.$message.success("修改成功");
              this.$router.push('/doctor/updaterecord')
            } else {
              this.$message.error("修改失败");
            }
          }
      )
    }
  },
  created() {
    // this.$route 的形式访问当前路由
    const name = this.$route.query.name;
    getrecord(name).then(
        res => {
          this.form = res.data.data[0]
          console.log(res.data.data[0]);
        }
    );
  }
}
</script>

<style scoped>

</style>

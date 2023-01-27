<template>
  <div>
    <el-dialog
        title="预约"
        width="40%"
        :visible.sync="dialogVisible"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('form')">挂号</el-button>
          <el-button @click="$router.push('/front/index')">注册</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import {insertAppointment, login, update} from "@/api";

export default {
  name: "loginView",
  data(){
    return{
      dialogVisible:true,
      form: {
        name: '',
        password: ''
      },
      new_form:{
        dictor_name: decodeURIComponent(this.$route.query.dictor_name),
        dictor_sex:decodeURIComponent(this.$route.query.dictor_sex),
        book_time:decodeURIComponent(this.$route.query.book_time),
        name: '',
        sex:'',
        last_number: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let dictor_id = Number(this.$route.query.dictor_id);
          let last_num = Number(this.$route.query.last_number);
          const res=await login(this.form);
          let result=res.data
          if (result.message.startsWith('1')){
            this.$message.success('恭喜你,挂号成功');
            this.new_form.name=result.data.name;
            this.new_form.sex=result.data.sex;
            this.new_form.last_number=last_num;
            await insertAppointment(this.new_form);
            last_num--;
            await update(last_num,dictor_id);
            await this.$router.push({
              name: 'frontGhcx'
            });
          }else if (result.message.startsWith('2')){
            this.$message.error(result.message.substr(1));
            this.form={};
          }else {
            this.$message.warning(result.message.substr(1));
            this.form={};
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    check(){
      let last_num = Number(this.$route.query.last_number);
      let id=this.$route.query.id;
      if (last_num===0){
        this.$message.error('此专家号已满,请重新选择专家');
        this.$router.push('/front/index');
      }
    }
  },
  created() {
    this.check();
  }
}
</script>

<style scoped>

</style>

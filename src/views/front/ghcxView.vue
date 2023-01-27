<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" >
        <span>|&nbsp;&nbsp;挂号查询</span>
      </div>
      <div>
        <el-button @click="$router.push('/front/index')" type="success">回首页</el-button>
        <span style="margin-left: 200px;">请输入身份证号:
        <el-input placeholder="请输入身份证号" style="width: 300px" v-model="params.card" maxlength="18"
                  show-word-limit></el-input>
          <el-button type="primary" style="width: 150px;" @click="querybycard">查询</el-button>
        </span>
        <el-table
            :data="tableData"
            border stripe
            style="width: 100%;margin: 20px auto">
          <el-table-column
              prop="name"
              label="挂号人姓名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="sex"
              label="挂号人性别"
              width="180">
          </el-table-column>
          <el-table-column
              prop="dictor_name"
              label="医生姓名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="dictor_sex"
              label="医生性别"
              width="180">
          </el-table-column>
          <el-table-column
              prop="book_time"
              label="挂号时间"
              width="180">
          </el-table-column>
          <el-table-column
              prop="check"
              label="审核情况"
              width="180"
              :formatter="formatBoolean">
          </el-table-column>
          <el-table-column
              label="操作">
            <template v-slot="scope">
              <el-popconfirm
                  title="是否确定放弃预约"
                  @confirm="giveup(scope.row)"
              >
                <el-button type="warning" style="margin-left: 80px" slot="reference">放弃预约</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
            title="登录"
            width="40%"
            :visible.sync="dialogVisible"
        >
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="card">
              <el-input v-model="form.card"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </span>
        </el-dialog>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="prev,pager,next,total,sizes,jumper"
            :total="total"
            background>
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {deleteById, loginUser, page, search, selectAppointment, updateAppointment} from "@/api";

export default {
  name: "ghxcView",
  data(){
    return{
      tableData:[],
      params:{
        card:'',
      },
      form:{
        name:'',
        password:'',
        card:'',
      },
      dialogVisible:false,
      rules: {
        name: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        card: [
          {required: true, message: '请输入身份证号', trigger: 'blur'}
        ],
      },
      currentPage: 1,
      pageSize:5,
      total:0
    }
  },
  methods:{
    querybycard(){
      search(this.params.card).then(
          res=>{
            console.log(res);
            this.tableData=res.data.data;
          }
      )
    },
    query(){
      selectAppointment().then(
          res=>{
            this.total=res.data.data.length;
          }
      );
    },
    formatBoolean(row,column,cellValue){
      let ret = ''  //你想在页面展示的值
      if (cellValue) {
        ret = "未审核"  //根据自己的需求设定
      } else {
        ret = "已审核"
      }
      return ret;
    },
    giveup(row){
      localStorage.setItem("id",row.id);
      localStorage.setItem("dictor_name",row.dictor_name);
      localStorage.setItem("last_number",row.last_number);
      this.dialogVisible=true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res=await loginUser(this.form);
          let result=res.data
          if (result.message.startsWith('1')){
            this.form={};
            this.dialogVisible=false;
            let id=localStorage.getItem("id");
            let dictor_name=localStorage.getItem("dictor_name");
            let last_number=localStorage.getItem("last_number");
            last_number++;
            console.log(last_number);
            await updateAppointment(last_number,dictor_name);
            await deleteById(id);
            this.$message.success("取消预约成功");
            localStorage.removeItem("id");
            localStorage.removeItem("dictor_name");
            localStorage.removeItem("last_number");
            window.location.reload();
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.pageHelp();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.pageHelp();
    },
    pageHelp(){
      page(this.currentPage,this.pageSize).then(
          res=>{
            this.tableData=res.data.data;
          }
      )
    }
    },
  created() {
    this.pageHelp();
    this.query();
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <!-- 搜索表单 -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="dep" label="部门"></el-table-column>
      <el-table-column prop="number" label="号"></el-table-column>
      <el-table-column prop="last_number" label="余号"></el-table-column>
      <el-table-column prop="work_time" label="工作时间"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <!--          scope.row就是当前行数据-->
          <template>
            <el-popconfirm
                title="确定删除这行数据吗？"
                @confirm="del(scope.row.name)"
                style="margin-left: 10px;"
            >
              <el-button slot="reference" size="small" type="warning">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="$router.push('/admins/index')" type="success" round>回首页</el-button>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "showdoctor",
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.load();
  },
  methods:{
    load(){
      axios.get("http://localhost:9090/admin/showdoctor").then(
          res=>{
            if (res.data.code==="200"){
              this.tableData=res.data.data
            }
          }
      );
    },
    del(name){
      axios.delete("http://localhost:9090/admin/"+name).then(
          res=>{
            if (res.data.code==='200'){
              this.$notify.success('删除成功');
              this.load();
            }else {
              this.$notify.error(res.data.msg);
            }
          }
      )
    },
  }
};
</script>

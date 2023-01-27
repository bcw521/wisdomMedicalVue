<template>
  <div class="container">
    <div class="row">
      <div class="header">
        <img src="@/assets/logo.png" height="120" style="position: relative">
        <span>------网上预约挂号系统</span>
      </div>
    </div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>|&nbsp;&nbsp;专家列表</span>
        </div>
        <div>
          <el-table :data="tableData" stripe style="width: 100%;">
            <el-table-column prop="dictor_id" label="专家ID" v-if="false"></el-table-column>
            <el-table-column prop="name" label="专家名称"></el-table-column>
            <el-table-column prop="dictor_time" label="出诊时间"></el-table-column>
            <el-table-column prop="number" label="总号"></el-table-column>
            <el-table-column prop="last_number" label="余号" ></el-table-column>
              <el-table-column label="操作">
                <template v-slot="scope">
                <el-link type="primary" @click="yuyue(scope.row)">预约</el-link>
                </template>
              </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import {select} from "@/api";
export default {
  name: "wsghView",
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    async load() {
      let id = this.$route.query.id;
      const res = await select(id);
      this.tableData = res.data.data
    },
    yuyue(data){
      this.$router.push({
        name:'frontLogin',
        query:{
          dictor_id:data.dictor_id,
          last_number:data.last_number,
          id:this.$route.query.id,
          dictor_name:encodeURIComponent(data.name),
          dictor_sex:encodeURIComponent(data.sex),
          book_time:encodeURIComponent(data.dictor_time)
        }
      });
    },
  },
  async created() {
    await this.load();
  }
}
</script>

<style scoped>
.container {
  margin-left: 160px;
}

.header span {
  display: inline-block;
  position: absolute;
  margin-top: 55px;
  font-size: 40px;
  font-weight: bolder;
  color: palevioletred;
  left: 830px;
}
</style>

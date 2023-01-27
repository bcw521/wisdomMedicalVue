<template>
<div style="background-color:skyblue;height:100%;width: 100%;position: fixed">
  <div style="position: absolute;top: 120px;left: 400px;width: 600px;height: 400px;">
    <el-button  round class="doctor"@click="$router.push('/doctor/login')">医生入口</el-button>
    <el-button  round class="doctor" @click="$router.push('/admin/login')">管理员入口</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "indexView"
}
</script>

<style scoped>
  .doctor{
    margin-left: 90px;
    margin-top: 100px;
    width: 400px;
    font-weight: bolder;
  }
</style>

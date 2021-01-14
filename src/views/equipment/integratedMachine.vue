<template>
  <div class="IntegratedMachine">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备</el-breadcrumb-item>
      <el-breadcrumb-item>一体机设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <ul class="main-box">
        <li class="main-box-item">
          <div class="avatar">
            <img class="avatar-img" src="/images/33.png" alt="img">
          </div>
          <el-table class="table" :data="tableData" stripe>
            <el-table-column prop="date" label="姓名" header-align="center" />
            <el-table-column prop="name" label="身份" header-align="center" />
            <el-table-column prop="province" label="身份证号" header-align="center" />
            <el-table-column prop="city" label="学生证号" header-align="center" />
            <el-table-column prop="address" label="院系" header-align="center" />
            <el-table-column prop="zip" label="转本硕" header-align="center" />
            <el-table-column prop="zip" label="班级" header-align="center" />
          </el-table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金',
        zip: 200333
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.IntegratedMachine {
  color: #272a39;
  font-size: 18px;
  line-height: 24px;
}
.main {
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
}
.main-box {
  padding: 20px;
  background-color: #e9f0f5;
  border-radius: 10px;
}
.main-box-item {
  display: flex;
  .avatar {
    width: 160px;
    height: 215px;
    margin-right: 10px;
    border-radius: 10px;
    overflow: hidden;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
  }
  .table {
    background-color: #e9f0f5;
  }
}
</style>
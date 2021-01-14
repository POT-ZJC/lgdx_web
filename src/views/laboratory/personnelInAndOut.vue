<template>
  <div class="PersonnelInAndOut">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>智慧实验室</el-breadcrumb-item>
      <el-breadcrumb-item>人员进出管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-tabs class="main-tabs" v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="今日数据" name="today">
          <today-in-and-out />
        </el-tab-pane>
        <el-tab-pane label="历史数据" name="history">
          <history-in-and-out />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
import todayInAndOut from './components/todayInAndOut'
import historyInAndOut from './components/historyInAndOut'
export default {
  data () {
    return {
      activeName: 'today'
    }
  },
  methods: {
    handleClick () {

    }
  },
  components: {
    todayInAndOut,
    historyInAndOut
  }
}
</script>

<style lang="scss" scoped>
.PersonnelInAndOut {
  color: #272a39;
  font-size: 18px;
  line-height: 24px;
}
.main {
  padding: 0 20px 20px;
  border-radius: 10px;
  background-color: #fff;
}
</style>
<template>
  <div class="ControlCurtain">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>控制系统</el-breadcrumb-item>
      <el-breadcrumb-item>照明控制</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="main-box">
        <p class="main-box-title">照明</p>
        <ul class="main-box-list">
          <li class="item">
            <p class="item-key">设备数量：</p>
            <p class="item-val">
              <span class="item-val-num green">{{total}}</span>
              <span class="item-val-unit">（个）</span>
            </p>
          </li>
          <li class="item">
            <p class="item-key">设备异常：</p>
            <p class="item-val">
              <span class="item-val-num">{{abnormalSum}}</span>
              <span class="item-val-unit">（个）</span>
            </p>
          </li>
          <li class="item">
            <p class="item-stats">开：3</p>
            <p class="item-stats red">关：3</p>
          </li>
        </ul>
      </div>
      <ul class="main-btn">
        <li class="main-btn-item active">自定义</li>
        <li class="main-btn-item">情景模式名称</li>
        <li class="main-btn-item">情景模式名称</li>
        <li class="main-btn-item">情景模式名称</li>
      </ul>
      <div class="main-box">
        <el-table class="main-box-table" :data="tableData" stripe>
          <el-table-column prop="date" label="序号" header-align="center">
            <template slot-scope="scope">
              <div>{{scope.$index + 1}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="devName" label="设备名称" header-align="center" />
          <el-table-column label="设备状态" header-align="center">
            <template slot-scope="scope">
              <div :class="{warning: !+scope.row.devTage}">{{+scope.row.devTage ? "正常" : "异常"}}</div>
            </template>
          </el-table-column>
          <el-table-column label="设备开关" header-align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.switch" active-color="#42C9A8" inactive-color="#808695" @change="switchChange(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
        <div class="main-box-pagination">
          <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout="total, prev, pager, next, jumper" :total="total" />
          <a class="btn">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      size: 10,
      total: 0,
      abnormalSum: 0,
      tableData: []
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.getData()
    },
    async getData () {
      const res = await this.$http('/api/dev/queryByPage', {
        devType: 1,
        pageCurrent: this.currentPage,
        pageRows: this.size
      })
      for (let i of res.data.rows) {
        i.switch = +i.devActive
      }
      this.tableData = res.data.rows
    },
    async getState () {
      const res = await this.$http('/api/statistical/queryCurtainsStatistics')
      this.total = res.data.devSum
      this.abnormalSum = res.data.abnormalSum
    },
    async switchChange (data) {
      let res = await this.$http('/api/dev/setAttributeValue', {
        devCode: data.devCode,
        devIsc: data.devIsc,
        devActive: data.switch ? '1' : '0'
      })
      if (+res.resultCode === 200) this.getData()
    }
  },
  created () {
    this.getState()
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.ControlCurtain {
  color: #272a39;
  font-size: 18px;
  line-height: 24px;
}
.main-box {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  &:not(:first-of-type) {
    margin-top: 20px;
  }
}
.main-box-title {
  line-height: 24px;
  font-weight: 700;
}
.main-box-list {
  display: flex;
  align-items: center;
  margin-top: 5px;
  .item {
    display: flex;
    align-items: center;
    margin-right: 40px;
  }
  .item-key {
    font-weight: 700;
    margin-right: 10px;
  }
  .item-val {
    display: flex;
    align-items: flex-end;
  }
  .item-stats {
    color: #2aff46;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    &:not(:first-of-type) {
      margin-left: 15px;
    }
  }
  .item-val-num {
    font-size: 44px;
    line-height: 59px;
    font-weight: 700;
  }
  .item-val-unit {
    line-height: 46px;
  }
  .item-val-state {
    font-weight: 700;
    &:not(:first-of-type) {
      margin-left: 15px;
    }
  }
  .green {
    color: #42c9a8;
  }
  .red {
    color: #ff2a2a;
  }
}
.main-btn {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fff;
  .active {
    color: #fff;
    background-color: #42c9a8;
  }
}
.main-btn-item {
  color: #42c9a8;
  font-size: 12px;
  line-height: 28px;
  height: 28px;
  padding: 0 16px;
  background-color: #e9f0f5;
  border-radius: 6px;
  cursor: pointer;
  &:active {
    opacity: 0.8;
  }
  &:not(:first-of-type) {
    margin-left: 10px;
  }
}
.main-box-table {
  width: 100%;
  .warning {
    color: #ff712a !important;
    font-weight: 700 !important;
  }
}
.main-box-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  .btn {
    display: block;
    width: 50px;
    height: 28px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 28px;
    border-radius: 6px;
    margin-left: 10px;
    background-color: #42c9a8;
    cursor: pointer;
    &:active {
      opacity: 0.8;
    }
  }
}
</style>
<template>
  <div class="TodayInAndOut">
    <div class="head">
      <p class="head-title">人员进出统计</p>
      <ul class="head-list">
        <li class="head-list-item">
          <p class="key">进出人次：</p>
          <p class="val">
            <span class="val-num green">{{accessCount}}</span>
            <span class="val-unit">（个）</span>
          </p>
        </li>
        <li class="head-list-item">
          <p class="key">进出人数：</p>
          <p class="val">
            <span class="val-num green">{{accessPersonCount}}</span>
            <span class="val-unit">（个）</span>
          </p>
        </li>
        <li class="head-list-item">
          <p class="key">人员留存：</p>
          <p class="val">
            <span class="val-num">{{accessPersonKeepCount}}</span>
            <span class="val-unit">（个）</span>
          </p>
        </li>
      </ul>
    </div>
    <el-table class="table" :data="tableData" stripe>
      <el-table-column label="序号" header-align="center">
        <template slot-scope="scope">
          <div>{{scope.$index + 1}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="相片" header-align="center">
        <template slot-scope="scope">
          <img :src="scope.row.personImaeg" alt="personImaeg" style="height: 100%;">
        </template>
      </el-table-column>
      <el-table-column prop="personName" label="姓名" header-align="center" />
      <el-table-column label="身份" header-align="center">
        <template slot-scope="scope">
          <div>{{{1: '学生', 2: '职工'}[scope.row.personType]}}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" header-align="center">
        <template slot-scope="scope">
          <div>{{{1: '进', 2: '出'}[scope.row.accTag]}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="accKeepCount" label="留存时间" header-align="center" />
      <el-table-column prop="accTime" label="时间" header-align="center" />
    </el-table>
    <div class="pagination">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout="total, prev, pager, next, jumper" :total="total" />
      <a class="pagination-btn">确定</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accessCount: 2,
      accessPersonCount: 1,
      accessPersonKeepCount: 0,
      currentPage: 1,
      size: 10,
      total: 0,
      tableData: [],
    }
  },
  methods: {
    async getData () {
      const res = await this.$http('/api/acces/queryBusAccessCount')
      this.accessCount = res.data.accessCount
      this.accessPersonCount = res.data.accessPersonCount
      this.accessPersonKeepCount = res.data.accessPersonKeepCount
    },
    async getTable () {
      const res = await this.$http('/api/acces/queryBusAccessByPage', {
        pageCurrent: this.currentPage,
        pageRows: this.size
      })
      this.total = res.data.rowSum
      this.tableData = res.data.rows
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTable()
    }
  },
  created () {
    this.getData()
    this.getTable()
  }
}
</script>

<style lang="scss" scoped>
.TodayInAndOut {
  color: #272a39;
  font-size: 18px;
  line-height: 28px;
  padding-top: 5px;
}
.head {
  padding: 20px;
  border-radius: 10px;
  background-color: #e9f0f5;
}
.head-title {
  line-height: 24px;
  font-weight: 700;
}
.head-list {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.head-list-item {
  display: flex;
  align-items: center;
  margin-right: 40px;
  .key {
    font-weight: 700;
    margin-right: 10px;
  }
  .val {
    display: flex;
    align-items: flex-end;
  }
  .val-num {
    font-size: 44px;
    line-height: 59px;
    font-weight: 700;
  }
  .val-unit {
    line-height: 46px;
  }
  .green {
    color: #42c9a8;
  }
}
.table {
  width: 100%;
  margin-top: 20px;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
.pagination-btn {
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
</style>
<template>
  <div class="TodayInAndOut">
    <div class="head">
      <p class="head-title">人员进出统计</p>
      <ul class="head-list">
        <li class="head-list-item">
          <p class="key">进出人次：</p>
          <p class="val">
            <span class="val-num green">145</span>
            <span class="val-unit">（个）</span>
          </p>
        </li>
        <li class="head-list-item">
          <p class="key">进出人数：</p>
          <p class="val">
            <span class="val-num green">145</span>
            <span class="val-unit">（个）</span>
          </p>
        </li>
        <li class="head-list-item">
          <p class="key">人员留存：</p>
          <p class="val">
            <span class="val-num">145</span>
            <span class="val-unit">（个）</span>
          </p>
        </li>
      </ul>
    </div>
    <el-table class="table" :data="tableData" stripe>
      <el-table-column prop="date" label="序号" header-align="center" />
      <el-table-column prop="name" label="相片" header-align="center">
        <template slot-scope="scope">
          <div>{{scope.row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="姓名" header-align="center" />
      <el-table-column prop="city" label="身份" header-align="center" />
      <el-table-column prop="address" label="状态" header-align="center" />
      <el-table-column prop="zip" label="留存时间" header-align="center" />
      <el-table-column prop="zip" label="时间" header-align="center" />
    </el-table>
    <div class="pagination">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="total, prev, pager, next, jumper" :total="1000" />
      <a class="pagination-btn">确定</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    }
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
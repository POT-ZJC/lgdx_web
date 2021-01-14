<template>
  <div class="HistoryInAndOut">
    <div class="search">
      <p class="search-title">选择日期</p>
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <p class="search-title">选择状态</p>
      <el-select v-model="state" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <a class="search-btn">搜索</a>
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
      time: '',
      state: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
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
.HistoryInAndOut {
  padding-top: 5px;
}
.search {
  display: flex;
  align-items: center;
}
.search-title {
  font-size: 14px;
  line-height: 20px;
  margin-right: 10px;
  &:not(:first-of-type) {
    margin-left: 20px;
  }
}
.search-btn {
  display: block;
  width: 50px;
  height: 28px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 28px;
  border-radius: 6px;
  margin-left: 20px;
  background-color: #42c9a8;
  cursor: pointer;
  &:active {
    opacity: 0.8;
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
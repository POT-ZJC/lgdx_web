<template>
  <div class="ElectricalTesting">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>智慧实验室</el-breadcrumb-item>
      <el-breadcrumb-item>电气火灾监测</el-breadcrumb-item>
      <el-breadcrumb-item>电气火灾历史数据</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="main-box">
        <div class="main-box-title">
          <div class="left">
            <p class="left-title">水 A1</p>
            <p class="left-time">启用时间：2020/05/30</p>
            <p class="left-time">到期时间：2020/05/30</p>
          </div>
          <p class="right">
            设备状态：<span class="green">正常</span>
          </p>
        </div>
        <el-table class="main-box-table" :data="tableData" stripe>
          <el-table-column prop="date" label="设备名称" header-align="center" />
          <el-table-column prop="name" label="水压力（Mpa）" header-align="center" />
          <el-table-column prop="province" label="水位（M）" header-align="center" />
          <el-table-column prop="city" label="水流量（m³）" header-align="center" />
        </el-table>
      </div>
      <div class="main-box">
        <div class="main-box-search">
          <p class="title">选择日期</p>
          <el-date-picker v-model="time" type="date" placeholder="选择日期">
          </el-date-picker>
          <p class="title">选择状态</p>
          <el-select v-model="state" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <a class="btn">搜索</a>
        </div>
      </div>
      <div class="main-tabs">
        <el-tabs class="main-tabs-box" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="今日数据" name="today">
            <el-table class="table" :data="tableData" stripe>
              <el-table-column prop="date" label="序号" header-align="center" />
              <el-table-column prop="name" label="时间" header-align="center" />
              <el-table-column label="水压力（Mpa）" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="水位（M）" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="水流量（m³）" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="状态" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="设备状态" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="total, prev, pager, next, jumper" :total="1000" />
              <a class="pagination-btn">确定</a>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史数据" name="history">
            <el-table class="table" :data="tableData" stripe>
              <el-table-column prop="date" label="序号" header-align="center" />
              <el-table-column prop="name" label="时间" header-align="center" />
              <el-table-column label="水压力（Mpa）" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="水位（M）" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="水流量（m³）" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="状态" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="设备状态" header-align="center">
                <template slot-scope="scope">
                  <div class="table-warning">{{scope.row.name}}</div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="total, prev, pager, next, jumper" :total="1000" />
              <a class="pagination-btn">确定</a>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'today',
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
    },
    handleClick () {

    }
  }
}
</script>

<style lang="scss" scoped>
.ElectricalTesting {
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
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: flex-end;
  }
  .left-title {
    line-height: 24px;
    font-weight: 700;
    padding-right: 10px;
  }
  .left-time {
    font-size: 14px;
    line-height: 20px;
    margin-left: 20px;
  }
  .right {
    font-size: 16px;
    font-weight: 700;
  }
  .green {
    color: #2aff46;
  }
}
.main-box-search {
  display: flex;
  align-items: center;
  .title {
    font-size: 14px;
    line-height: 20px;
    margin-right: 10px;
    &:not(:first-of-type) {
      margin-left: 20px;
    }
  }
  .btn {
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
}
.main-tabs {
  margin-top: 20px;
  padding: 0 20px 20px;
  border-radius: 10px;
  background-color: #fff;
}
.main-tabs-box {
  .table {
    width: 100%;
    margin-top: 5px;
  }
  .table-normal {
    color: #2aff46 !important;
    font-weight: 700 !important;
  }
  .table-warning {
    color: #ff712a !important;
    font-weight: 700 !important;
  }
  .table-error {
    color: #ff2a2a !important;
    font-weight: 700 !important;
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
}
.main-box-table {
  width: 560px;
  margin-top: 20px;
}
</style>
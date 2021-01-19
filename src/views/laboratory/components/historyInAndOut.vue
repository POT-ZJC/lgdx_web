<template>
  <div class="HistoryInAndOut">
    <div class="search">
      <p class="search-title">选择日期</p>
      <el-date-picker v-model="time" type="date" placeholder="选择日期">
      </el-date-picker>
      <p class="search-title">选择状态</p>
      <el-select v-model="state" placeholder="选择状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <a class="search-btn" @click="search">搜索</a>
    </div>
    <el-table class="table" :data="showTable" stripe>
      <el-table-column label="序号" header-align="center">
        <template slot-scope="scope">
          <div>{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="相片" header-align="center">
        <template slot-scope="scope">
          <img
            :src="scope.row.personImaeg"
            alt="personImaeg"
            style="height: 100%"
          />
        </template>
      </el-table-column>
      <el-table-column prop="personName" label="姓名" header-align="center" />
      <el-table-column label="身份" header-align="center">
        <template slot-scope="scope">
          <div>{{ { 1: "学生", 2: "职工" }[scope.row.personType] }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" header-align="center">
        <template slot-scope="scope">
          <div>{{ { 1: "进", 2: "出" }[scope.row.accTag] }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="accKeepCount"
        label="留存时间"
        header-align="center"
      />
      <el-table-column prop="accTime" label="时间" header-align="center" />
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="total"
      />
      <a class="pagination-btn">确定</a>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      time: "",
      state: "",
      options: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "进",
        },
        {
          value: 2,
          label: "出",
        },
      ],
      currentPage: 1,
      size: 10,
      total: 0,
      tableData: [],
    };
  },
  methods: {
    async getTable(time) {
      const data = {
        pageCurrent: this.currentPage,
        pageRows: this.size,
      };
      if (time) data.accParamTime = time;
      const res = await this.$http("/api/acces/queryBusAccessByPage", data);
      this.total = res.data.rowSum;
      this.tableData = res.data.rows;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTable();
    },
    search() {
      this.getTable(moment(this.time).format("yyyy-MM-DD"));
    },
  },
  computed: {
    showTable() {
      if (!this.tableData[0]) return [];
      if (!this.state) return this.tableData;
      return this.tableData.filter((item) => +item.accTag === this.state);
    },
  },
  created() {
    this.getTable();
  },
};
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
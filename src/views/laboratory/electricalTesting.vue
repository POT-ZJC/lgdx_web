<template>
  <div class="ElectricalTesting">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>智慧实验室</el-breadcrumb-item>
      <el-breadcrumb-item>电气火灾监测</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="main-box">
        <p class="main-box-title">设备统计</p>
        <ul class="main-box-list">
          <li class="item">
            <p class="item-key">设备数量：</p>
            <p class="item-val">
              <span class="item-val-num green">145</span>
              <span class="item-val-unit">（个）</span>
            </p>
          </li>
          <li class="item">
            <p class="item-key">设备数量：</p>
            <p class="item-val">
              <span class="item-val-num">145</span>
              <span class="item-val-unit">（个）</span>
            </p>
          </li>
          <li class="item">
            <p class="item-key">设备数量：</p>
            <p class="item-val">
              <span class="item-val-num">145</span>
              <span class="item-val-unit">（个）</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="main-box">
        <p class="main-box-title">电</p>
        <ul class="main-box-list">
          <li class="item">
            <p class="item-key">设备数量：</p>
            <p class="item-val">
              <span class="item-val-num green">145</span>
              <span class="item-val-unit">（个）</span>
            </p>
          </li>
          <li class="item">
            <p class="item-key">设备数量：</p>
            <p class="item-val">
              <span class="item-val-state normal">正常2</span>
              <span class="item-val-state error">异常1</span>
              <span class="item-val-state warning">警报1</span>
            </p>
          </li>
        </ul>
        <el-table class="main-box-table" :data="tableData" stripe>
          <el-table-column prop="devName" label="设备名称" header-align="center" />
          <el-table-column prop="devCode" label="编号" header-align="center" />

          <el-table-column
            prop="voltage"
            label="电压（V）"
            header-align="center"
          />
          <el-table-column
            prop="electricity"
            label="电流（A）"
            header-align="center"
          />
          <!--剩余电流（V）= 漏电流 -->
          <el-table-column
            prop="leak"
            label="剩余电流（A）"
            header-align="center"
          />
          <el-table-column
            prop="frequency"
            label="频率(HZ)"
            header-align="center"
          />
          <el-table-column prop="rate" label="功率(W)" header-align="center" />
          <el-table-column
            prop="factor"
            label="功率因子"
            header-align="center"
          />
          <el-table-column
            prop="quantity"
            label="电量(WH)"
            header-align="center"
          />
          <el-table-column
            prop="llineTem"
            label="火线温度(℃)"
            header-align="center"
          />
          <el-table-column
            prop="nlineTem"
            label="零线温度(℃)"
            header-align="center"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tablePage: {
        pageCurrent: 1,
        pageRows: 10,
      },
    };
  },
  mounted() {
    this.reqTbale();
  },
  methods: {
    reqTbale() {
      this.$http("/api/dev/queryElectricitySafetyByPage").then((res) => {
        this.tableData = res.data.rows || [];
      });
    },
  },
};
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
  .normal {
    color: #2aff46;
  }
  .error {
    color: #ff712a;
  }
  .warning {
    color: #ff2a2a;
  }
}
.main-box-table {
  width: 100%;
  margin-top: 20px;
}
</style>
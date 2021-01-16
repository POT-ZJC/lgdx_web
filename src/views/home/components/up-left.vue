<template>
  <!-- 实验室电气火灾检测统计 -->
  <div class="box-layout">
    <div class="title">实验室电气火灾检测统计</div>
    <div class="desc">
      <div class="desc-label">设备总数：</div>
      <div class="desc-value theme-color">
        {{ electricityTotal.devSum || 0 }}
      </div>
      <div class="desc-unit">(个)</div>
      <div class="desc-label">设备异常：</div>
      <div class="desc-value">{{ electricityTotal.abnormalSum || 0 }}</div>
      <div class="desc-unit">(个)</div>
    </div>
    <div class="charts-box">
      <chartsBar
        ref="chartsBar"
        :dataList="[chartsBarData]"
        :xAxisData="xAxisData"
      />
    </div>
  </div>
</template>
<script>
import chartsBar from "./charts-bar";
export default {
  components: { chartsBar },
  data() {
    return {
      electricityTotal: {
        totalNum: 145,
        warning: 4,
      },
      electricityTotal: {},
      chartsBarData: {
        name: "电气火灾检测统计",
        data: [],
      },
      xAxisData: [],
    };
  },
  mounted() {
    this.reqElectricityTotal();
  },
  methods: {
    reqElectricityTotal() {
      this.$http("/api/statistical/queryElectricitySafetyStatistics").then(
        (res) => {
          this.electricityTotal = res.data || [{}];
          const { roomList } = res.data;
          this.chartsBarData.data=roomList.map(val=>{
            this.xAxisData.push(val.roomName)
            return val.num
          })
           this.$refs.chartsBar.setEcharts();
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.box-layout {
  //   width: 50%;
  // width: 880px;
  height: 342px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  .title {
    height: 24px;
    font-size: 18px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #272a39;
    line-height: 28px;
  }
  .desc {
    display: flex;
    align-items: center;
    height: 60px;
    padding-top: 20px;
  }
  .desc-label {
    width: 80px;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    color: #272a39;
  }
  .desc-value {
    max-width: 160px;
    font-size: 44px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
  }
  .desc-unit {
    align-self: flex-end;
    font-size: 16px;
    margin-right: 40px;
  }
  .charts-box {
    width: 100%;
    height: 220px;
  }
}
</style>
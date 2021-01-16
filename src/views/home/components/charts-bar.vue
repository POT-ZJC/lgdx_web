<template>
  <div :ref="refName" style="width: 100%; height: 100%"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: { 
    refName: {
      type: String,
      default: "",
    },
    grid: {
      type: Object,
      default() {
        return {};
      },
    },
    dataZoom: {
      type: Object,
      default() {
        return {
          // start: 0,
          // end: 10
        };
      },
    },
    yAxisNmae: {
      type: String,
      default: "",
    },
    xAxisRotate: {
      type: Number,
      default: 0,
    },
    xAxisData: {
      type: Array,
      default: () => [
        
      ],
    },
    legendData: {
      type: Array,
      default: () => [],
    },
    colors: {
      type: Array,
      default: () => ["#00A6E3", "#87680C"],
    },
    moduleName: {
      type: String,
      default: "",
    },
    dataList: {
      type: Array,
      default: () => [
        { name: "1", data: [120, 200, 150, 80, 70, 110, 130] },
        // { name: "2", data: [200, 150, 80, 70, 110, 130, 219] },
      ],
    },
  },
  data() {
    return {
      myChart: null,
      // highlighttName: '',
      seriesItem: {
        name: "",
        label: {
          normal: {
            show: true,
            position: "top",
            formatter: "{c}",
            // offset: [10, 0],
            textStyle: {
              color: "#333", //color of value
            },
            fontFamily: "DINEngschriftStd",
            fontSize: 12,
          },
        },
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(66, 201, 168, 1)' },
              { offset: 1, color: 'rgba(72, 230, 146, 1)' },
            ]),
        },
        type: "bar",
        barWidth: 60,
        stack: "1",
        data: [],
      },
    };
  },
  mounted() {
    this.createCharts();
  },
  methods: {
    setEcharts() {
      const seriesItemArr = this.dataList.map((item) => {
        return {
          ...this.seriesItem,
          ...item,
        };
      });

      const option = {
        color: this.colors,
        xAxis: {
          axisLabel: { rotate: this.xAxisRotate },
          data: this.xAxisData,
        },

        grid: this.grid,
        legend: {
          // data: this.legendData
        },
        series: seriesItemArr,
      };

      this.myChart.setOption(option);
      this.$nextTick(() => {
        this.echartsResize();
      });
    },

    echartsResize() {
      this.myChart.resize();
    },
    createCharts() {
      this.myChart = echarts.init(this.$refs[this.refName]);
      const seriesItemArr = this.dataList.map((item) => {
        let newItem = { ...this.seriesItem, ...item };
        return newItem;
      });
      // console.log(seriesItemArr)
      let fontColor = "#272A39";
      let option = {
        color: this.colors,
        legend: {
          show:false
            // data: this.legendData,
            // itemWidth: 10,
            // itemHeight: 10,
            // textStyle: {
            //     color: '#ccc'
            // }
        },
        dataZoom: [{ type: "inside", ...this.dataZoom }],
        grid: {
          containLabel: true,
          top: 30,
          left: 10,
          right: 20,
          bottom: 5,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}",
        },
        xAxis: {
          type: "category",
          data: this.xAxisData,
          axisLabel: {
            rotate: this.xAxisRotate,
            interval: 0,
            //    rotate:40 ,
            textStyle: {
              color: fontColor,
            },
            // formatter: '{a|{value} a}',
            // width: 40,
            // rich: {
            //     a: {
            //         color: '#fff',
            //         width: 40
            //     }
            // }
          },
        },
        yAxis: {
          name: "个",
          type: "value",
          nameTextStyle: {
            color: fontColor,
          },
          min:1,
          // max:2,
          axisLabel: {
            textStyle: {
              color: fontColor,
            },
          },
          axisLine: { show: false },
          splitLine:{ show: false },
          splitArea: {
            show: true,
            areaStyle: {
            //   shadowBlur: 1.5,
              color: ["rgba(118,229,202,0.3)", "rgba(186,242,228,0.3)"],
            },
          },
        },
        // dataZoom: [
        //     {
        //         type: 'inside'
        //     }
        // ],
        backgroundColor:'#fff',
        series: seriesItemArr,
      };
      this.myChart.setOption(option);
    },
  },
};
</script>

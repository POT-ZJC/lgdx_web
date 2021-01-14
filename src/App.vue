<template>
  <div id="app">
    <router-view :key="key" />
  </div>
</template>

<script>
// import { mutations, store } from "@/store.js";
// import { computedFontSize } from "./htmlFontSize";
export default {
  name: "app",
  computed: {
    key() {
      return this.$route.fullPath;
    },
    // htmlSize() {
    //     return store.htmlSize
    // }
  },
  data() {
    return {
      // htmlFontSize: 96, // 默认在1920 宽度的屏幕 ，1920 html根字体=96
      htmlEl: document.querySelector("html"),
    };
  },
  created() {
    // mutations.setHtmlSize(computedFontSize(this.htmlEl));
    // window.onresize = () => {
    //   // this.htmlFontSize = computedFontSize(this.htmlEl)
    //   mutations.setHtmlSize(computedFontSize(this.htmlEl));
    // };
  },
  mounted() {},
  // destroyed() {
  //   this.htmlEl.style.fontSize = "14px";
  //   mutations.setHtmlSize(14);
  //   window.onresize = () => null;
  // },
};
</script>
<style lang="scss">
@import "./styles/normalize.css";
//  @function torem($px, $base-font-size: 96px) {
// 	@return ($px / $base-font-size) * 1rem;
// }
html,
body {
  -webkit-text-size-adjust: none;
  margin: 0;
  height: 100%;
  min-width: 1620px;
  min-height: 768px;
  font-family: PingFang SC, PingFang SC-Medium;
}
div {
  // box-sizing: border-box;
  -webkit-text-size-adjust: none;
  font-family: PingFang SC, PingFang SC-Medium;
}
body {
  background-color: #e9f0f5;
}
#app {
  height: inherit;
  .el-table {
    .el-table__row--striped td {
      background-color: #e9f0f5;
    }
    thead .cell {
      height: 40px;
      color: #fff;
      font-size: 14px;
      line-height: 40px;
      background-color: #42c9a8;
    }
    tbody .cell {
      height: 36px;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      color: #272a39;
      font-size: 12px;
      line-height: 36px;
    }
    th,
    td {
      padding: 0;
      border-bottom: none;
    }
    th:not(:first-of-type) {
      border-left: 1px solid #fff;
    }
  }
  .el-tabs {
    .el-tabs__nav {
      border: none;
    }
    .el-tabs__item {
      height: 52px;
      color: #999999;
      font-size: 14px;
      line-height: 52px;
      font-weight: 400;
      padding: 0 47px;
      border: none;
    }
    .is-active {
      color: #42c9a8;
      border-bottom: 2px solid #42c9a8;
      background-color: rgba(66, 201, 168, 0.1);
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  .el-pagination {
    padding: 0;
    .number {
      width: 28px;
      height: 28px;
      font-size: 14px;
      color: #7b7b7b;
      text-align: center;
      line-height: 28px;
      font-weight: 400;
      padding: 0;
      border: 1px solid #c8c8c8;
      border-radius: 6px;
      background-color: #fff;
    }
    .active {
      color: #fff;
      border: none;
      background-color: #42c9a8;
    }
    .btn-prev,
    .btn-next {
      border: 1px solid #c8c8c8;
      border-radius: 6px;
      background-color: #fff;
    }
    .btn-quicknext {
      color: #7b7b7b;
      background-color: #fff;
    }
    .el-pagination__total,
    .el-pagination__jump {
      color: #7b7b7b;
    }
  }
}
.theme-color {
  color: #42c9a8;
}
.theme-bgc {
  background-color: #42c9a8;
}
.normal-color {
  color: #00ff21;
}
.error-color {
  color: #ff2a2a;
}
</style>

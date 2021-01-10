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
//  @function torem($px, $base-font-size: 96px) {

// 	@return ($px / $base-font-size) * 1rem;
// }
html,
body {
  -webkit-text-size-adjust: none;
  margin: 0;
  height: 100%;
  min-width: 1620px;;
  min-height:768px ; 
  font-family: PingFang SC, PingFang SC-Medium;
}
div {
  // box-sizing: border-box;
  -webkit-text-size-adjust: none;
  font-family: PingFang SC, PingFang SC-Medium;
}
body {
 background-color: #E9F0F5;
}
#app {
  height: inherit;
}
 
</style>

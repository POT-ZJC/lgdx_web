<template>
  <div class="layout">
    <headerEl />
    <el-container class="container-page">
      <left-menu />

      <el-main>
       
        <!-- <div class=""></div> -->
        <router-view :key="key" class="router-view" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import headerEl from "./components/header";
import leftMenu from "./components/left-menu";
export default {
  components: { headerEl, leftMenu },
  computed: {
    key() {
      return new Date().getTime() + "" + Math.floor(Math.random());
    },
  },
};
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: inherit;
}
/deep/.el-main {
  padding: 25px 20px 20px 20px;
}
/deep/.el-breadcrumb {
  padding-bottom: 24px;
  font-size: 16px;
  color: rgba(128, 134, 149, 1);
}
/deep/.common-view {
  background: #ffffff; 
  min-height: 600px;
  border-radius: 10px;
  padding: 0 20px;
}
.container-page {
  flex: 1;
  width: 1620px;
  margin: 0 auto;
}
.sss {
  width: 1700px;
  height: 70px;
}
</style>



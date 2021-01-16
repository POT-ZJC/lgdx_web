<template>
  <div class="layout-head">
    <div class="head">
      <img
        :src="require('@/asstes/images/资源 2.png')"
        class="head-logo"
        alt=""
      />
      <div class="head-title">安全智慧实验室</div>
      <div class="head-right">
        <img src="./img/账号.png" class="account" alt="账号" />
        <div class="account-name">{{$store.user.userName}}</div>
        <img src="./img/设置.png" class="setting" alt="设置" />
        <img src="./img/退出 (1).png" class="exit" @click="$router.push('/login')" alt="退出" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-head {
  width: 100%;
  height: 76px;
  background: #42c9a8;
  flex-shrink: 0;
  .head {
    width: 1620px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    position: relative;
  }
  .head-logo {
    margin-top: 18px;
    margin-left: 30px;
    width: 163px;
    height: 40px;
  }
  .head-title {
    margin-top: 30px;
    margin-left: 30px;
    width: 154px;
    height: 29px;
    font-size: 22px;
    font-family: MicrosoftYaHei, MicrosoftYaHei-Regular;
    color: #e8eaec;
    line-height: 28px;
  }
  .head-right {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .account-name {
      max-width: 120px;
      overflow: hidden;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      color: #ffffff;
      line-height: 16px;
      letter-spacing: 2px;
      margin-left: 10px;
    }
    .account {
      width: 22px;
      height: 22px;
    }
    .setting {
      margin-left: 20px;
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
    .exit {
      margin-left: 20px;
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
}
</style>
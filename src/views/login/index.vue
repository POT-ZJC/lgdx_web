<template>
  <div class="Login">
    <div class="main">
      <div class="main-head">
        <img class="main-head-logo" src="./img/logo.png" alt="logo">
        <p class="main-head-text">登陆</p>
      </div>
      <div class="main-form" v-show="!error">
        <label class="main-form-label">
          <p class="key">账号</p>
          <input class="val" type="text" placeholder="请输入账号">
        </label>
        <label class="main-form-label">
          <p class="key">密码</p>
          <input class="val" type="password" placeholder="请输入密码">
        </label>
        <a class="main-form-submit" @click="error = true">登陆</a>
        <a class="main-form-forgot">忘记密码</a>
      </div>
      <div class="main-error" v-show="error">
        <p class="main-error-text">密码错误，请输入正确的密码。</p>
        <a class="main-form-submit" @click="error = false">确定</a>
        <a class="main-form-forgot">忘记密码</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      error: false
    }
  }
}
</script>

<style lang="scss" scoped>
.Login {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 16px;
  line-height: 28px;
  background: url("./img/background.jpg") no-repeat center center;
  background-size: cover;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
    background-color: #fff;
  }
}
.main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 510px;
  border-radius: 10px;
  background-color: rgba(1, 36, 27, 0.5);
  z-index: 99;
}
.main-head {
  padding: 33px 130px 10px 30px;
  border-bottom: 1px solid #fff;
}
.main-head-logo {
  width: 163px;
  height: 40px;
}
.main-head-text {
  color: #e8eaec;
  text-align: right;
  margin-top: 2px;
}
.main-form {
  display: flex;
  flex-flow: column;
  padding: 40px 60px 84px;
}
.main-form-label {
  width: 100%;
  margin-top: 20px;
  .key {
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .val {
    width: 100%;
    color: #fff;
    padding: 16px 26px;
    border: none;
    outline: none;
    border-radius: 52px;
    background-color: rgba(255, 255, 255, 0.4);
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #fff;
    font-size: 16px;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #fff;
    font-size: 16px;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #fff;
    font-size: 16px;
  }
}
.main-form-submit {
  color: #fff;
  margin-top: 50px;
  padding: 16px;
  text-align: center;
  background-color: #42c9a8;
  border-radius: 52px;
  cursor: pointer;
  &:active {
    opacity: 0.8;
  }
}
.main-form-forgot {
  color: #fff;
  margin-top: 10px;
  padding-right: 20px;
  text-align: right;
}
.main-error {
  display: flex;
  flex-flow: column;
  padding: 60px 60px 40px;
}
.main-error-text {
  min-height: 235px;
  color: #e8eaec;
  font-size: 18px;
  text-align: center;
  line-height: 28px;
}
</style>
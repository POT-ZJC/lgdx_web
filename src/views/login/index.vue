<template>
  <div class="Login">
    <div class="main">
      <div class="main-head">
        <img class="main-head-logo" src="./img/logo.png" alt="logo" />
        <p class="main-head-text">登陆</p>
      </div>
      <div class="main-form" v-show="!error">
        <label class="main-form-label">
          <p class="key">账号</p>
          <input
            class="val"
            type="text"
            v-model="form.userName"
            placeholder="请输入账号"
            maxlength="15"
          />
        </label>
        <label class="main-form-label">
          <p class="key">密码</p>
          <input
            class="val"
            type="password"
            v-model="form.userPass"
            placeholder="请输入密码"
            maxlength="15"
          />
        </label>
        <label class="main-form-label">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <input
              class="val"
              style="width: 240px"
              type="text"
              v-model.trim="form.verificationCode"
              placeholder="验证码"
              maxlength="4"
            />
            <img :src="verificationImgpath" alt=""  @click="verificationImg" width="120" height="50" />
          </div>
        </label>

        <!-- http://113.204.236.218:9087/api/getVerificationCode -->
        <a class="main-form-submit" @click="login">登陆</a>
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
  data() {
    return {
      form: {
        userName: "",
        userPass: "",
        verificationCode: "",
      },
      verificationImgpath: "",
      error: false,
    };
  },
  computed: {},
  mounted() {
    this.verificationImg();
  },
  methods: {
    verificationImg() {
      this.verificationImgpath =
        "http://113.204.236.218:9087/api/getVerificationCode?random=" +
        Math.random();
    },
    async login() {
      const { userName, userPass,verificationCode } = this.form;
      if (!userName.trim() || !userPass.trim()) {
        this.$message.error("账号和密码必填。");
        return;
      }
      if (userName.trim().length < 6 || userPass.trim().length < 6) {
        this.$message.error("账号和密码最少6位。");
        return;
      }
      if (verificationCode.length !== 4) {
        this.$message.error("请输入4位验证码");
        return;
      }
      const res = await this.$http("/api/login", this.form);
      if (+res.resultCode === 200) {
        this.$message({
          message: "登录成功",
          type: "success",
        });
        this.$store.user = res.data;
        window.sessionStorage.setItem('user',JSON.stringify( res.data))
        this.$router.push("/home/index");
      }
    },
  },
};
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
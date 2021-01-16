<template>
  <!-- 实验人员进出情况 -->
  <div class="box-layout">
    <div class="title">实验人员进出情况</div>
    <div class="desc">
      <div class="desc-label">进出人次：</div>
      <div class="desc-value theme-color">{{ userInoutTotal.accessCount }}</div>
      <div class="desc-unit">(次)</div>
      <div class="desc-label">进出人数：</div>
      <div class="desc-value theme-color">{{ userInoutTotal.accessPersonCount }}</div>
      <div class="desc-unit">(人)</div>
      <div class="desc-label">留存人数：</div>
      <div class="desc-value">{{ userInoutTotal.accessPersonKeepCount }}</div>
      <div class="desc-unit">(人)</div>
    </div>
    <div class="show-users">
      <div class="users-item" v-if="userInoutList.length>1">
        <div class="users-head"><img :src="userInoutList[0].personImaeg||`/images/icon-名片.svg`" alt="" /></div>
        <div class="users-desc">
          <div class="users-desc-row">
            {{ userInoutList[0].personName || "" }}
          </div>
          <!-- 1：学生、2：职工 -->
          <div class="users-desc-row">
            {{ userInoutList[0].personType === "1" ? "学生" : "职工" }}
          </div>
          <div class="users-desc-row">
            {{ userInoutList[0].roomName || "" }}
          </div>
          <!-- accTag  1：进、2：出） -->
          <div class="users-desc-row">
            进入时间：{{ userInoutList[0].accTag==='1'?userInoutList[0].accTime : "-" }}
          </div>
          <div class="users-desc-row">
            离开时间：{{ userInoutList[0].accTag==='2'?userInoutList[0].accTime : "-" }}
          </div>
          <div class="users-desc-row">
            留存时间：{{ userInoutList[0].accKeepCount || "" }}
          </div>
        </div>
      </div>
      <div class="show-users-blank"></div>
       <div class="users-item" v-if="userInoutList.length">
        <div class="users-head"><img :src="userInoutList[1].personImaeg||`/images/icon-名片.svg`" alt="" /></div>
        <div class="users-desc">
          <div class="users-desc-row">
            {{ userInoutList[1].personName || "-" }}
          </div>
          <!-- 1：学生、2：职工 -->
          <div class="users-desc-row">
            {{ userInoutList[1].personType === "1" ? "学生" : "职工" }}
          </div>
          <div class="users-desc-row">
            {{ userInoutList[1].roomName || "-" }}
          </div>
          <!-- accTag  1：进、2：出） -->
          <div class="users-desc-row">
            进入时间：{{ userInoutList[1].accTag==='1'?userInoutList[1].accTime : "-" }}
          </div>
          <div class="users-desc-row">
            离开时间：{{ userInoutList[1].accTag==='2'?userInoutList[1].accTime : "-" }}
          </div>
          <div class="users-desc-row">
            留存时间：{{ userInoutList[1].accKeepCount || "-" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chartsBar from "./charts-bar";
export default {
  components: { chartsBar },
  data() {
    return {
      dataDesc: {
        totalNum: 145,
        inOut: 4,
      },
      userInoutList: [],
      userInoutTotal: {},
    };
  },
  mounted() {
    this.reqUserInoutTotal()
    this.reqUserInout()
  },
  methods: {
    reqUserInoutTotal() {
      this.$http("/api/acces/queryBusAccessCount").then((res) => {
        this.userInoutTotal = res.data;
      });
    },
    reqUserInout() {
      this.$http("/api/acces/queryBusAccessByPage", {
        pageCurrent: 1,
        pageRows: 2,
      }).then((res) => {
        this.userInoutList = res.data.rows || [];
      });
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
  .show-users {
    width: 100%;
    margin-top: 20px;
    height: 174px;
    display: flex;
    .show-users-blank {
      width: 20px;
      height: 100%;
      flex-shrink: 0;
    }
    .users-item {
      flex: 1;
      background: #e9f0f5;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      .users-head {
        flex-shrink: 0;
        width: 95px;
        height: 134px;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .users-desc {
        height: 100%;

        overflow-y: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        flex-wrap: wrap;
        .users-desc-row {
          line-height: 19px;
          font-size: 14px;
          font-family: MicrosoftYaHei, MicrosoftYaHei-Regular;
          color: #2f4050;
        }
      }
    }
  }
}
</style>
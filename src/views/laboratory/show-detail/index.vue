<template>
  <div class="laboratory-detail">
    <div class="head-layout">
      <img
        :src="require('@/asstes/images/资源 2.png')"
        class="head-logo"
        alt=""
      />
      <div class="head-title">安全智慧实验室</div>
    </div>
    <div class="up-layout">
      <div class="up-left">
        <div class="layout">
          <div class="card">
            <div class="card-left">
              <img src="/images/laboratory.png" alt="" />
            </div>
            <div class="card-right">
              <div class="right-row">实验室名称：{{ detailData.roomName }}</div>
              <div class="right-row">实验室类型：{{ detailData.roomType }}</div>
              <div class="right-row">
                实验室状态：<span
                  :class="`state-dot  ${
                    detailData.roomStatus !== '使用中' && 'state-dot-error'
                  }`"
                  >{{ detailData.roomStatus }}</span
                >
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-left">
              <img src="/images/icon-用户.svg" alt="" />
            </div>
            <div class="card-right">
              <div class="right-row">
                负责人姓名：{{ detailData.roomManager }}
              </div>
              <div class="right-row">联系方式：{{ detailData.personTel }}</div>
              <div class="right-row">负责实验室：{{ detailData.rooms }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="up-right">
        <div class="up-right-head">
          <img src="/images/icon-book.svg" class="icon" alt="" />
          <div class="head-title">实验室介绍</div>
        </div>
        <pre class="up-right-desc">{{ detailData.roomDic }}</pre>
      </div>
    </div>
    <!-- 设备情况 -->
    <div class="down-banner banner-video">
      <div class="banner-desc">
        <div class="banner-title">视频监控</div>

        <div class="banner-desc-row">
          <div class="desc-label">设备总数：</div>
          <div class="desc-value theme-color">{{ 11 }}</div>
          <div class="desc-unit">（个）</div>
        </div>
        <div class="banner-desc-row">
          <div class="desc-label">设备异常：</div>
          <div class="desc-value">{{ 11 }}</div>
          <div class="desc-unit">（个）</div>
        </div>
      </div>

      <div class="banner-content">
        <div class="banner-item banner-video" style="width: 200px">
          <div class="video"><video src=""></video></div>
          <div class="video-name">视频1</div>
        </div>
        <div class="banner-item banner-video" style="width: 200px">
          <div class="video"></div>
          <div class="video-name">视频2</div>
        </div>
        <div class="banner-item banner-video" style="width: 200px">
          <div class="video"></div>
          <div class="video-name">视频3</div>
        </div>
      </div>
    </div>
    <div class="down-banner">
      <div class="banner-desc">
        <div class="banner-title">照明情况统计</div>

        <div class="banner-desc-row">
          <div class="desc-label">设备总数：</div>
          <div class="desc-value theme-color">
            {{ zhaomingData.devSum || 0 }}
          </div>
          <div class="desc-unit">（个）</div>
        </div>
        <div class="banner-desc-row">
          <div class="desc-label">设备异常：</div>
          <div class="desc-value">{{ zhaomingData.abnormalSum || 0 }}</div>
          <div class="desc-unit">（个）</div>
        </div>
      </div>

      <div class="banner-content">
        <div
          class="banner-item"
          style="width: 90px"
          :key="index"
          v-for="(item, index) in zhaomingDevList"
        >
          <div class="item-icon">
            <img :src="require('@/asstes/images/灯泡.svg')" alt="" />
          </div>
          <div class="item-row name" :title="item.devName">{{ item.devName }}</div>
          <div class="item-row">
            状态：<span
              :style="`color:${item.devTage === '1' ? '#2aff46' : '#ff2a2a'}`"
              >开启</span
            >
          </div>
          <div :class="`item-row ${item.devTage !== '1' && 'item-error'}`">
            开关：<el-switch
              v-model="item.isOpen"
              @change="reqChangeOpen(item, 'reqzhaoming')"
              :width="24"
            >
            </el-switch>
          </div>
        </div>
      </div>
    </div>
    <div class="down-banner">
      <div class="banner-desc">
        <div class="banner-title">窗帘情况统计</div>

        <div class="banner-desc-row">
          <div class="desc-label">设备总数：</div>
          <div class="desc-value theme-color">
            {{ chuanglianData.devSum || 0 }}
          </div>
          <div class="desc-unit">（个）</div>
        </div>
        <div class="banner-desc-row">
          <div class="desc-label">设备异常：</div>
          <div class="desc-value">{{ chuanglianData.abnormalSum || 0 }}</div>
          <div class="desc-unit">（个）</div>
        </div>
      </div>

      <div class="banner-content">
        <div
          class="banner-item"
          style="width: 90px"
          :key="index"
          v-for="(item, index) in chuanglianDevList"
        >
          <div class="item-icon">
            <img :src="require('@/asstes/images/操作-窗帘.svg')" alt="" />
          </div>
          <div class="item-row name" :title="item.devName">{{ item.devName }}</div>
          <div class="item-row">
            状态：
            <span v-if="item.devTage === '1'" :style="`color: #2aff46'`"
              >正常</span
            >
            <span v-else :style="`color:#ff2a2a}`">异常</span>
          </div>
          <div :class="`item-row ${item.devTage !== '1' && 'item-error'}`">
            开关：<el-switch
              v-model="item.isOpen"
              :width="24"
              @change="reqChangeOpen(item, 'reqChuanglian')"
            >
            </el-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { 
      zhaomingData: {
        devList: [],
      },
      zhaomingDevList: [],
      chuanglianData: {},
      chuanglianDevList: [],
      detailData: {},
    };
  },
  mounted() {
    this.reqDetail();
    this.reqzhaoming();
    this.reqChuanglian();
  },
  methods: {
    reqDetail() {
      this.$http("/api/room/queryRoomIntroduce").then((res) => {
        this.detailData = res.data;
      });
    },
    async reqChangeOpen(item, type) {
      const { devCode, devIsc, devActive } = item;

      const res = await this.$http("/api/dev/setAttributeValue", {
        devCode,
        devIsc,
        devActive: devActive === "0" ? "1" : "0",
      });
      if (!res) {
        this.$message.error("操作失败");
      }
      this[type]();
    },
    reqzhaoming() {
      this.$http("/api/statistical/queryLightingStatistics").then((res) => {
        this.zhaomingData = res.data;
        this.zhaomingDevList = res.data.devList.map((val) => {
          return {
            ...val,
            isOpen: val.devActive === "1" ? true : false,
          };
        });
      });
    },
    reqChuanglian() {
      this.$http("/api/statistical/queryCurtainsStatistics").then((res) => {
        this.chuanglianData = res.data;
        this.chuanglianDevList = res.data.devList.map((val) => {
          return {
            ...val,
            isOpen: val.devActive === "1" ? true : false,
          };
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.laboratory-detail {
  margin: 0 auto;
  //   width: 1920px;
  height: 1080px;
  width: 100%;
  background-image: url("/images/bg-img.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 18px 30px 30px 30px;
  .head-layout {
    display: flex;
    align-items: flex-end;
    .head-logo {
      height: 40px;
      width: 163px;
    }
    .head-title {
      margin-left: 30px;
      height: 30px;
      line-height: 30px;
      color: #e8eaec;
    }
  }
  .up-layout {
    margin-top: 18px;
    display: flex;

    .up-left {
      flex-shrink: 0;
      width: 400px;
      height: 400px;
      margin-right: 20px;
      padding: 20px;
      box-sizing: border-box;
      background: rgba(136, 228, 195, 0.7);
      border-radius: 5px 10px;
      .layout {
        width: 100%;
        height: 100%;
        background: rgba(248, 248, 250, 0.5);
        border-radius: 10px;
        overflow: auto;
        padding: 10px;
        .card {
          display: flex;
          width: 100%;
          height: 140px;
          margin-top: 25px;
        }
        .card-left {
          width: 80px;
          height: 80px;
          // padding: 10px;
          margin-right: 12px;
          flex-shrink: 0;
          img {
            width: 80px;
            height: 80px;
          }
        }
        .card-right {
          height: 100px;
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .right-row {
            height: 20px;
            font-size: 16px;
            flex-wrap: wrap;
            display: flex;
            font-family: PingFang SC, PingFang SC-Medium;
            color: #000000;
            line-height: 20px;
          }
          .state-dot {
            position: relative;
            padding-left: 15px;
            color: #00ff21;
            &::before {
              position: absolute;
              top: 5px;
              left: 0;
              content: "";
              width: 12px;
              height: 12px;
              border-radius: 12px;
              background-color: #00ff21;
            }
          }
          .state-dot-error {
            color: #ff2a2a;
            &::before {
              background-color: #ff2a2a;
            }
          }
        }
      }
    }
    .up-right {
      flex: 1;
      height: 400px;
      background: rgba(235, 106, 79, 0.7);
      border-radius: 10px;
      padding: 10px 20px 30px 20px;
    }
    .up-right-head {
      height: 36px;
      display: flex;
      .icon {
        height: 35px;
        width: 33px;
      }
      .head-title {
        font-size: 26px;
        line-height: 36px;
        margin-left: 17px;
        font-family: PingFang SC, PingFang SC-Medium;
        color: #ffffff;
      }
    }
    .up-right-desc {
      box-sizing: border-box;
      width: 100%;
      height: 320px;
      background: rgba(248, 248, 250, 0.5);
      border-radius: 10px;
      padding: 10px;
      line-height: 22px;
      white-space: pre-wrap;
      font-size: 14px;
      color: #252566;
      word-wrap: break-word;
      margin: 15px 0 0 0;
      overflow: auto;
      text-align: left;
    }
  }
}
.down-banner {
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(108, 145, 188, 0.7);
  position: relative;
  height: 160px;
  display: flex;
  width: 100%;
  .banner-desc {
    width: 220px;
    height: 100%;
    flex-shrink: 0;
    .banner-title {
      height: 20px;
      font-size: 18px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      color: #272a39;
      line-height: 22px;
    }
    .banner-desc-row {
      display: flex;
      align-items: center;
      height: 50px;
      padding-top: 15px;
      .desc-label {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #272a39;
        line-height: 28px;
      }
      .desc-value {
        max-width: 160px;
        font-size: 36px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
      }
      .desc-unit {
        align-self: flex-end;
        font-size: 16px;
      }
    }
  }
  .banner-content {
    flex: 1;
    overflow-x: auto;
    display: flex;
    .banner-item {
      margin-right: 20px;
      height: 100%;
      background: #e9f0f5;
      border-radius: 6px;
      .item-icon {
        width: 40px;
        height: 40px;
        margin: 10px auto 5px auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
        .item-row {
          color: #777777;
          line-height: 18px;
          text-align: center;
          font-size: 12px;
        }
        .name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }

      /deep/.el-switch {
        line-height: 12px;
        height: 12px;
        .el-switch__core {
          width: 25px;
          height: 12px;
        }
        .el-switch__core:after {
          height: 8px;
          width: 8px;
        }
      }
      /deep/ .is-checked .el-switch__core {
        border-color: #2aff46;
        background-color: #2aff46;
      }
      /deep/ .is-checked .el-switch__core::after {
        left: 100%;
        margin-left: -10px;
      }
      .item-error {
        /deep/ .is-checked .el-switch__core {
          border-color: #ff2a2a;
          background-color: #ff2a2a;
        }
      }
    }
  }

  .banner-video {
    .video {
      height: 123px;
      video {
        width: 100%;
        height: 100%;
      }
    }
    .video-name {
      // height: 19px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      text-align: center;
      color: #1e2e52;
      line-height: 27px;
    }
  }
}
.banner-video {
  height: 190px;
}
</style>
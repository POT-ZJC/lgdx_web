<template>
  <div class="home">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        ><span class="theme-color">首页</span></el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="up-layout">
      <upLeft class="up-item" />
      <div class="up-blank"></div>
      <upRight class="up-item" />
    </div>
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
          <div class="item-row name" :title="item.devName">
            {{ item.devName }}
          </div>
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
          <div class="item-row name" :title="item.devName">
            {{ item.devName }}
          </div>
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
import upLeft from "./components/up-left";
import upRight from "./components/up-right";
export default {
  components: { upLeft, upRight },
  data() {
    return {
      switchvalue1: false,
      zhaomingData: {
        devList: [],
      },
      zhaomingDevList: [],
      chuanglianData: {},
      chuanglianDevList: [],
    };
  },
  mounted() {
    this.reqzhaoming();
    this.reqChuanglian();
  },
  methods: {
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
.home {
  .up-layout {
    display: flex;
    .up-blank {
      flex-shrink: 0;
      width: 20px;
      height: 100%;
    }
    .up-item {
      flex: 1;
    }
  }

  .down-banner {
    margin-top: 20px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
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
}
</style>
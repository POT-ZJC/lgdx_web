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
    <div class="down-banner">
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
          <div class="video"></div>
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
        <div class="banner-item" style="width: 90px">
          <div class="video"></div>
          <div class="video-name">灯光1</div>
        </div>
        <div class="banner-item" style="width: 90px">
          <div class="video"></div>
          <div class="video-name">灯光1</div>
        </div>
        <div class="banner-item" style="width: 90px">
          <div class="video"></div>
          <div class="video-name">灯光1</div>
        </div>
      </div>
    </div>
    <div class="down-banner">
      <div class="banner-desc">
        <div class="banner-title">窗帘情况统计</div>

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
        <div class="banner-item" style="width: 90px">
          <div class="video"></div>
          <div class="video-name">窗帘1</div>
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
    return {};
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
    height: 190px;
    display: flex;
    width: 100%;
    .banner-desc {
      width: 220px;
      height: 100%;
      flex-shrink: 0;
      .banner-title {
        height: 24px;
        font-size: 18px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        color: #272a39;
        line-height: 28px;
      }
      .banner-desc-row {
        display: flex;
        align-items: center;
        height: 60px;
        padding-top: 20px;
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
          font-size: 44px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: left; 
        }
        .desc-unit {
          align-self: flex-end;
          font-size: 16px;
        //   margin-right: 40px;
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
      }
    }

    .banner-video {
      .video {
        height: 123px;
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
}
</style>
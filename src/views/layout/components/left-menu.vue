<template>
  <div
    class="left-menu"
    :style="`width:${secondMenu.length > 1 ? 220 : 100}px`"
  >
    <div class="menu-first">
      <div
        class="first-item"
        :class="{ 'first-item-active': firstMenuKey === item.path }"
        v-for="(item, index) in menuList"
        :key="index"
        @click="firstMenuClick(item)"
      >
        <img :src="item.icon" alt="" class="icon" />
        <div class="first-item-name">{{ item.name }}</div>
      </div>
    </div>
    <div class="menu-second" v-show="secondMenu.length > 1">
      <div
        class="second-item"
        :class="{ 'second-item-active': secondMenuKey === item.path }"
        v-for="(item, index) in secondMenu"
        :key="index"
        @click="secondMenuClick(item)"
      >
        <div class="second-item-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [
        {
          icon: "/images/首页.svg",
          name: "首页",
          path: "/home",
          children: [
            {
              name: "首页",
              path: "/home/index",
            },
          ],
        },
        {
          icon: "/images/灵感，灯泡.svg",
          name: "智慧实验室",
          path: "/laboratory",
          children: [
            {
              name: "电气火灾检测",
              path: "/laboratory/electricalTesting",
            },
            {
              name: "人员管理",
              path: "/userManage/userList",
            },
            {
              name: "人员进出管理",
              path: "/laboratory/personnelInAndOut",
            },

            // {
            //   name: "一体机",
            //   path: "/equipment/IntegratedMachine",
            // },
          ],
        },

        {
          icon: "/images/控制.svg",
          name: "控制系统",
          path: "/control",
          children: [
            {
              name: "照明控制",
              path: "/control/lighting",
            },
            {
              name: "窗帘控制",
              path: "/control/curtain",
            },
          ],
        },

        {
          icon: "/images/实验室.svg",
          name: "实验室展示",
          path: "/laboratoryDetail",
          isNewWindow: true,
        },
      ],
      secondMenuKey: "",
      firstMenuKey: "",
      secondMenu: [
        // {
        //   name: "人员进出",
        //   path: "",
        // },
        // {
        //   name: "电气火灾",
        //   path: "",
        // },
      ],
    };
  },
  created() {},
  watch: {
    $route: {
      handler(val) {
        const { matched } = val;
        // console.log(matched);
        this.firstMenuKey = matched[0].path;
        if (matched[1]) {
          this.secondMenuKey = matched[1].meta.menu;

          for (let i = 0; i < this.menuList.length; i++) {
            const menu = this.menuList[i];
            if (this.firstMenuKey === menu.path) {
              this.secondMenu = menu.children || [];
              break;
            }
          }
        } else {
          this.secondMenuKey = "";
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    firstMenuClick(menu) {
      if (menu.children && menu.children.length) {
        this.$router.push(menu.children[0].path + "?=random" + Math.random());
      } else if (menu.path) {
        if (menu.isNewWindow) {
          window.open("/#" + menu.path);
        } else {
          this.$router.push(menu.path + "?=random" + Math.random());
        }
      } else {
        this.$message.info("模块开发中");
      }
    },
    secondMenuClick(menu) {
      this.$router.push(menu.path + "?=random" + Math.random());
    },
  },
};
</script>
<style lang="scss" scoped>
.left-menu {
  height: 100%;
  overflow: auto;
  flex-shrink: 0;
  display: flex;

  &::after {
    content: "";
    clear: both;
  }
}
.menu-first {
  min-height: 100%;
  width: 100px;
  background: #272a39;
  flex-shrink: 0;
  .first-item {
    width: 100px;
    height: 100px;
    text-align: center;
    cursor: pointer;
    .icon {
      margin-top: 20px;
      height: 34px;
    }
    .first-item-name {
      margin-top: 5px;
      font-size: 16px;
      font-family: MicrosoftYaHei, MicrosoftYaHei-Regular;
      color: #e8eaec;
      line-height: 18px;
    }
  }
  .first-item-active {
    background: rgba(66, 201, 168, 0.5);
  }
}
.menu-second {
  width: 120px;
  height: 100%;
  background: #ffffff;
  flex: 1;
  .second-item {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    // background: rgba(128, 134, 149, 0.1);
    font-size: 13px;
    font-family: MicrosoftYaHei, MicrosoftYaHei-Bold;
    font-weight: 700;
    // text-align: left;
    color: #4e4e4e;
    cursor: pointer;
    position: relative;
    padding-left: 15px;
    line-height: 50px;
  }
  .second-item-active {
    background: rgba(128, 134, 149, 0.1);
    &::before {
      content: "";
      left: 0;
      position: absolute;
      top: 0;
      height: 100%;
      width: 4px;
      background: #42c9a8;
    }
  }
}
</style>
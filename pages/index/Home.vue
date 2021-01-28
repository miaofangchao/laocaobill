<template name="home">
  <view>
    <view>
      <!-- 顶部 -->
      <image
        src="/static/componentBg.png "
        mode="widthFix"
        class="response"
      ></image>
      <!-- 中部应用宫格 -->
      <view class="bg-white" :style="[{ animation: 'show 0.4s 1' }]">
        <view class="grid margin-bottom col-2">
          <navigator
            v-for="(item, index) in middleApps"
            :key="index"
            :url="item.path"
            class="nav-li"
            navigateTo
            :style="[{ animation: 'show ' + ((index + 1) * 0.2 + 1) + 's 1' }]"
            hover-class="none"
          >
            <view class="flex align-center">
              <image
                :src="'/static/home/' + item.icon"
                mode="aspectFill"
                class="line2-icon"
              ></image>
              <view class="text-df margin-left-sm"
                >{{ item.title }} <br />
                <span class="text-light">{{ item.text }}</span>
              </view>
            </view>
          </navigator>
        </view>
      </view>
      <!-- 机房环境 -->
      <view
        class="cu-bar bg-white solid-bottom"
        :style="[{ animation: 'show 0.6s 1' }]"
      >
        <view class="action">
          <text class="cuIcon-title text-blue"></text>机房环境
        </view>
      </view>
      <view class="bg-white grid col-4 padding-0">
        <view
          class="padding-xs animation-slide-bottom"
          :style="[{ animationDelay: (index + 1) * 0.1 + 's' }]"
          v-for="(item, index) in roomEnvironmentList"
          :key="index"
          @tap="goPage(item.page)"
        >
          <view class="padding radius text-center shadow-blur">
            <view
              class="cu-avatar sm"
              :style="{
                background: 'url(' + item.icon + ') no-repeat',
                backgroundSize: 'cover',
              }"
            >
            </view>
            <view class="text-df margin-top">{{ item.title }}</view>
          </view>
        </view>
      </view>

      <!-- 动力系统 -->
      <view
        class="cu-bar bg-white solid-bottom margin-top"
        :style="[{ animation: 'show 0.6s 1' }]"
      >
        <view class="action">
          <text class="cuIcon-title text-blue"></text>动力系统
        </view>
      </view>
      <view class="bg-white grid col-4 padding-0">
        <view
          class="padding-xs animation-slide-bottom"
          :style="[{ animationDelay: (index + 1) * 0.1 + 's' }]"
          v-for="(item, index) in powerSystem"
          :key="index"
          @tap="goPage(item.page)"
        >
          <view class="padding radius text-center shadow-blur">
            <view
              class="cu-avatar sm"
              :style="{
                background: 'url(' + item.icon + ') no-repeat',
                backgroundSize: 'cover',
              }"
            >
            </view>
            <view class="text-df margin-top">{{ item.title }}</view>
          </view>
        </view>
      </view>

      <!-- 安防系统 -->
      <view
        class="cu-bar bg-white solid-bottom margin-top"
        :style="[{ animation: 'show 0.6s 1' }]"
      >
        <view class="action">
          <text class="cuIcon-title text-blue"></text>安防系统
        </view>
      </view>
      <view class="bg-white grid col-4 padding-0">
        <view
          class="padding-xs animation-slide-bottom"
          :style="[{ animationDelay: (index + 1) * 0.1 + 's' }]"
          v-for="(item, index) in securitySystem"
          :key="index"
          @tap="goPage(item.page)"
        >
          <view class="padding radius text-center shadow-blur">
            <view
              class="cu-avatar sm"
              :style="{
                background: 'url(' + item.icon + ') no-repeat',
                backgroundSize: 'cover',
              }"
            >
            </view>
            <view class="text-df margin-top">{{ item.title }}</view>
          </view>
        </view>
      </view>

      <!-- 资产系统 -->
      <view
        class="cu-bar bg-white solid-bottom margin-top"
        :style="[{ animation: 'show 0.6s 1' }]"
      >
        <view class="action">
          <text class="cuIcon-title text-blue"></text>资产系统
        </view>
      </view>
      <view class="bg-white grid col-4 padding-0">
        <view
          class="padding-xs animation-slide-bottom"
          :style="[{ animationDelay: (index + 1) * 0.1 + 's' }]"
          v-for="(item, index) in assetSystem"
          :key="index"
          @tap="goPage(item.page)"
        >
          <view class="padding radius text-center shadow-blur">
            <view
              class="cu-avatar sm"
              :style="{
                background: 'url(' + item.icon + ') no-repeat',
                backgroundSize: 'cover',
              }"
            >
            </view>
            <view class="text-df margin-top">{{ item.title }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  roomEnvironment,
  powerSystem,
  securitySystem,
  assetSystem,
} from "@/common/util/work.js";
export default {
  name: "Home",
  props: {},
  watch: {},
  data() {
    return {
      swiperList: [
        { id: 1, type: "image", url: "/static/banner/banner1.png", link: "" },
        { id: 2, type: "image", url: "/static/banner/banner2.jpg", link: "" },
        { id: 3, type: "image", url: "/static/banner/banner3.jpg", link: "" },
        { id: 4, type: "image", url: "/static/banner/banner4.jpg", link: "" },
      ],
      middleApps: [
        { icon: "line2_icon1.png", title: "机房状态", text: "正常" ,path:''},
        { icon: "alarm.png", title: "未处理报警", text: "无" , path:'/pages/alarmDetails/alarmDetails' },
      ],
      roomEnvironmentList: roomEnvironment.data,
      powerSystem: powerSystem.data,
      securitySystem: securitySystem.data,
      assetSystem: assetSystem.data,
    };
  },
  created() {
    this.loadCount();
  },
  methods: {
    goPage(page) {
      if (!page) {
        return false;
      }
      this.$Router.push({ name: page });
    },
    loadCount() {
      let url = "/sys/annountCement/listByUser";
      this.$http.get(url).then((res) => {
        console.log("res::", res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.line2-icon {
  width: 80rpx;
  height: 80rpx;
}
</style>

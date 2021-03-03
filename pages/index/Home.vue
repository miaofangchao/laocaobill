<template name="home">
  <view>
    <view>
      <!-- 顶部 -->
      <image
        src="/static/componentBg.png "
        mode="widthFix"
        class="response"
      ></image>
      <!-- 账单管理 -->
      <view
        class="cu-bar bg-white solid-bottom"
        :style="[{ animation: 'show 0.6s 1' }]"
      >
        <view class="action">
          <text class="cuIcon-title text-blue"></text>账单管理
        </view>
      </view>
      <view class="bg-white grid col-4 padding-0">
        <view
          class="padding-xs animation-slide-bottom"
          :style="[{ animationDelay: (index + 1) * 0.1 + 's' }]"
          v-for="(item, index) in zhifubaoBillList"
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
  zhifubaoBill,
} from "@/common/util/work.js";
export default {
  name: "Home",
  props: {},
  watch: {},
  data() {
    return {
      zhifubaoBillList: zhifubaoBill.data,
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

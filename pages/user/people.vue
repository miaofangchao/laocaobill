<template>
  <view>
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      :up="upOption"
      class="page"
    >
      <!-- 头部logo-->
      <view class="UCenter-bg">
        <image
          :src="
            userInfo.avatar
              ? api.getFileAccessHttpUrl(userInfo.avatar)
              : '/static/avatar_boy.png'
          "
          round
          class="png animation-slide-right margin-bottom-sm"
          mode="widthFix"
          :style="[{ animationDelay: '0.1s' }]"
        ></image>
        <view
          class="text-xl animation-slide-left"
          :style="[{ animationDelay: '0.2s' }]"
        >
          {{ userInfo.depart }}
        </view>
        <image
          src="/static/wave.gif"
          mode="scaleToFill"
          class="gif-wave"
        ></image>
        <!-- 扫码 -->
        <!-- #ifndef H5 -->
        <text class="iconfont icon-saoma" @tap="qrLogin()">&#xe665;</text>
        <!-- #endif -->
      </view>
      <!-- 个人信息卡片-->
      <!-- <view class="cu-list menu-avatar">
		   	<view class="cu-item">
		   		<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
		   		<view class="content flex-sub">
		   			<view class="text-grey">{{userInfo.avatar}}</view>
		   			<view class="text-gray text-sm flex justify-between">
		   				经理
		   			</view>
		   		</view>
		   	</view>
		   </view> -->
      <view class="padding flex text-center text-grey bg-white shadow-warp">
        <view
          class="flex flex-sub flex-direction solid-right animation-slide-top"
          :style="[{ animationDelay: '0.2s' }]"
        >
          <view class="text-xl text-orange">{{ userInfo.realname }}</view>
          <view class="margin-top-sm"
            ><text class="cuIcon-people"></text> 用户</view
          >
        </view>

        <view
          class="flex flex-sub flex-direction animation-slide-top"
          :style="[{ animationDelay: '0.2s' }]"
        >
          <view class="text-xl text-green">{{
            userInfo.post ? userInfo.post : "员工"
          }}</view>
          <view class="margin-top-sm"
            ><text class="cuIcon-news"></text> 职务</view
          >
        </view>
      </view>
      <!-- 列表list-->
      <view
        class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius"
      >
        <view
          class="cu-item arrow animation-slide-bottom"
          :style="[{ animationDelay: '0.1s' }]"
        >
          <navigator
            class="content"
            url="/pages/billManagement/billManagement"
            hover-class="none"
          >
            <text class="cuIcon-favorfill text-yellow"></text>
            <text class="text-grey">账单管理</text>
          </navigator>
        </view>
        <view
          class="cu-item arrow animation-slide-bottom"
          :style="[{ animationDelay: '0.3s' }]"
        >
          <view class="content">
            <text class="cuIcon-redpacket_fill text-red"></text>
            <text class="text-grey">红包</text>
          </view>
        </view>
        <view
          class="cu-item arrow animation-slide-bottom"
          :style="[{ animationDelay: '0.5s' }]"
        >
          <navigator
            class="content"
            url="/pages/user/userdetail"
            hover-class="none"
          >
            <text class="cuIcon-settingsfill text-cyan"></text>
            <text class="text-grey">设置</text>
          </navigator>
        </view>
        <view
          class="cu-item arrow animation-slide-bottom"
          :style="[{ animationDelay: '0.7s' }]"
        >
          <navigator
            class="content"
            url="/pages/user/userexit"
            hover-class="none"
          >
            <text class="cuIcon-exit text-cyan"></text>
            <text class="text-grey">退出</text>
          </navigator>
        </view>
      </view>
      <view class="cu-tabbar-height"></view>
    </mescroll-body>
  </view>
</template>

<script>
import api from "@/api/api";
import configService from "@/common/service/config.service.js";
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import { mapGetters } from "vuex";
export default {
  name: "people",
  data() {
    return {
      positionUrl: "/sys/position/list",
      departUrl: "/sys/user/userDepartList",
      userUrl: "/sys/user/queryById",
      qrLoginUrl: "/login/qrcode/login", //二维码登录url
      userId: "",
      id: "",
      upOption: {
        use: false,
      },
      api: null,
    };
  },
  mixins: [MescrollMixin],
  watch: {},
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.api = api;
  },
  methods: {
    // 下拉刷新
    downCallback() {
      this.load();
    },
    // 二维码登录
    qrLogin() {
      uni.scanCode({
        onlyFromCamera: true,
        scanType: ["qrCode"],
        success: (res) => {
          console.log("成功" + res.result);
          uni.showModal({
            content: "是否授权登录？",
            cancelText: "拒绝",
            confirmText: "允许",
            success: (showModalRes) => {
              if (showModalRes.confirm) {
                let qrcodeId = res.result;
                let userId = this.$store.getters.userid;
                this.$http
                  .post(this.qrLoginUrl, { userId: userId, qrcodeId: qrcodeId })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            },
          });
        },
        fail: (err) => {
          console.log("失败" + err);
        },
      });
    },
    remove() {
      uni.removeStorageSync("Access-Token");
    },
    // 加载数据
    load() {
      // debugger
      this.$store
        .dispatch("getUserInfoById")
        .then(() => {
          this.mescroll.endSuccess();
        })
        .catch((err) => {
          this.mescroll.endErr();
          this.$tip.error("获取数据错误");
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont";
  src: url("@/static/icon/saoma/iconfont.eot?t=1607413646679"); /* IE9 */
  src: url("@/static/icon/saoma/iconfont.eot?t=1607413646679#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAARsAAsAAAAACYQAAAQdAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqHEIYVATYCJAMICwYABCAFhG0HLxs6CMgehXGMrNlueCyUyMscPFBu+W+SSTbMhK26UTWkJtB6aJ2tKNTE7iL+TWpnFuZ28YjWhYSnJ8yS1mO72C4aKZEQKZkECKA4WVNbjK9weL7gzQNfiXBAapmQ0xNqFWqArBQIM+H8FtlFHFGLvh4CUBRVmWjd9nhhFCRoNwGIcRHrwSgpL7JGI3AcdsmxsrxYg4VjLDfuAKv93xd/UTMHDCwTNNI9uHoz018Rm5pe2mOQ6cEMFwakk8AEKgMJIlAa7QofViszUUZUoGT9XImAX0en0y692H88ECBsELqsujB9TAxlDxUN/vsSyAcxAEZM6rQl5Du3mydvdje7xC43F3lZ3hw5c/rHJ5LxlNYHbxYS8VTWRtj2oHb2C4+KprbYfF3rrI3eBhWEYC5D1qdHiC03yqpunecfFsHbkL0gtvNxvaZlte9afvyxkWrDodxsPDzAw47mE8kj/TylEkLE8+mNBFRiA3gb8+hUKjtRMqCE7i+KoZjs5k+q8nRfjWKXGlKTWyXJdIa+iUMaLZFcORVPqj5NSMN9JO9cOsA7PDA1uoQRzTv8M2jY26glxg9npQTviycFpnuwb3x0skoUeakvuwBMSsv61B0RT76b57ua66rvo5fDuRPOuqM3n6p+arNOtfpyFPhDvZaTTY34Xb3jjavSvts5r6lyt0urdxyx5qOMH6HZa2/Utbb4Rzv8o78Nr/nOrPt6i/7q4qfndb9qHL80v0r51az+tbjZo1FAOeIwbYcnBaKfE0+aOaTtai11LNmhIQOTvhmBjC1ODcEKbdDQ//fVjzu0zK1lmsW/VlevLscV9uNP2KFdUTsh5TorpqPW+rpf/UDx1qJEN046mQb4A8ycw6WgXd2KulGrVK3xYlTHrFl2yPr/IpS2ozpo16iSqhS1ZY22YlYvqp1mB3W03FaM9ZwkvYnYBOIiSDllhZ6vJVklVO7OTGGAtCe7m96P9zccO5D3sZGt8U9HSwBe/+y+ymdhcXBeT0zAbzZPdoNJp2V3mUMeQ+pkDc03DTGA7uuTlJkgDUrm9K6rM887bQoc8rzZeAZFYjBxKC2X6spgoakNNg7NQFFJu5M1uUyBR0gfUNFiBgTZnQSDTG6CSXZ35VL9Fizy+gdssmeCoo/IdU5N2SKq1RR8ZPiGETVEXhSaJJBpweAJrdx/JEnO194wSZ0C1KhaPdvYYIjJEAdMLazRtMyEYEIBtGVuhr5PMCkhF19ZL5xlkV6tWrDsi3ojKWA0WpGAPMhA3oAR1IAIL4gQ0109Q8v9/AnEIsfnQVKzpGF9A0lIcdYPaqiqOkC+wRC05FI2nkqBxcg0Mkx+pyAJRABoy4YRH1cJMKl8KxfkRUZPuEM5QleNWykIxd709uDurgEUyGUIvImJNXU4BQ+GAQAAAA==")
      format("woff2"),
    url("@/static/icon/saoma/iconfont.woff?t=1607413646679") format("woff"),
    url("@/static/icon/saoma/iconfont.ttf?t=1607413646679") format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("@/static/icon/saoma/iconfont.svg?t=1607413646679#iconfont")
      format("svg"); /* iOS 4.1- */
}
.UCenter-bg {
  background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
  background-size: cover;
  height: 400rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  .icon-saoma {
    position: absolute;
    display: block;
    font-size: 80rpx;
    right: 50rpx;
    color: #ffffff;
    top: 70rpx;
    z-index: 99;
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

.UCenter-bg text {
  opacity: 0.8;
}

.UCenter-bg image {
  width: 200rpx;
  height: 200rpx;
}

.UCenter-bg .gif-wave {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;
  height: 100rpx;
}

map,
.mapBox {
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;
  height: 100rpx;
}

map,
.mapBox {
  width: 750rpx;
  height: 300rpx;
}
</style>

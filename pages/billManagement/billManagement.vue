<template>
  <view class="bill-management">
    <!-- <span class="iconfont">&#xe658;</span> 左箭头
    <span class="iconfont">&#xe74f;</span> 三个点
    <span class="iconfont">&#xe719;</span> 统计 -->
    <view class="top">
      <text class="iconfont icon-icon-test"></text>
      <view class="search">
        <text class="iconfont icon-sousu"></text>
        <text>搜索</text>
      </view>
      <text class="iconfont icon-ellipsis"></text>
    </view>
    <view class="tabs">
      <text class="all">全部</text>
      <text>服务中</text>
      <text>待评价</text>
      <text class="screen dowm-arrow">筛选</text>
    </view>
    <view class="list-title">
      <text class="dowm-arrow top">本月</text>
      <view class="bottom">
        <view class="left">
          <text class="expenditure">
            支出&nbsp;&nbsp;¥ {{ number_format(expenditure, 2) }}
          </text>
          <text class="income"
            >收入&nbsp;&nbsp;¥ {{ number_format(income, 2) }}</text
          >
        </view>
        <view class="bill">
          月账单<text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
    </view>
    <scroll-view :scroll-y="true" :show-scrollbar="true" class="list-content" :style="{height:scrollHeight}">
      <!-- <mescroll-body
      class="list-content"
        ref="mescrollRef"
        @init="mescrollInit"
        @down="downCallback"
        @up="upCallback"
      > -->
        <view class="list-item" v-for="(item, index) in dataList" :key="index">
          <view class="icon">
            <image style="width:68rpx;height：68rpx;" mode="aspectFit" src="@/static/icon/shangpu.png"></image>
          </view>
          <view class="detail">
            <view class="money">
              <view>{{ item.place }}</view>
              <view style="font-size: 40rpx">{{ item.detailMoney }}</view>
            </view>
            <view class="purpose"> 餐饮美食 </view>
            <view class="time">
              {{ item.date }}&nbsp;&nbsp;&nbsp;{{ item.time }}
            </view>
          </view>
        </view>
      <!-- </mescroll-body> -->
    </scroll-view>
  </view>
</template>

<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

export default {
  data: () => ({
    expenditure: 20143.41,
    income: 45123.23,
    dataList: [
      {
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
      },
      {
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
      },
      {
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
      },
      {
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
      },
      {
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
      },
      {
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
      },
    ],
    windowHeight:0
  }),
  created() {
    uni.getSystemInfo({
      success:(res)=>{
        console.log(res.windowHeight)
        this.windowHeight = res.windowHeight
      }
    })
  },
  mixins: [MescrollMixin],
  computed: {
    scrollHeight(){
      return this.windowHeight - 230  + 'px'
    }
  },
  methods: {
    number_format(number, decimals, dec_point, thousands_sep) {
      /*
       * 参数说明：
       * number：要格式化的数字
       * decimals：保留几位小数
       * dec_point：小数点符号
       * thousands_sep：千分位符号
       * */
      number = (number + "").replace(/[^0-9+-Ee.]/g, "");
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return "" + Math.ceil(n * k) / k;
        };

      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      }

      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import url(@/static/icon/arrow_left/iconfont.css);
@import url(@/static/icon/ellipsis/iconfont.css);
@import url(@/static/icon/statistics/iconfont.css);
@import url(@/static/icon/search/iconfont.css);
@import url(@/static/icon/qian/iconfont.css);
@import url(@/static/icon/arrow_right/iconfont.css);
.bill-management {
  font-size: 32rpx;
  padding-top: 80rpx;
  background: #fff;
  position: relative;
  .dowm-arrow {
    position: relative;
    display: flex;
    align-items: center;
    &::after {
      content: "";
      width: 0;
      height: 0;
      border-top: 12rpx solid black;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      margin-left: 12rpx;
    }
  }
  .top-fixed {
    // position: fixed;
  }
  .top {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .icon-icon-test {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 70rpx;
      width: 88rpx;
    }
    .search {
      color: #7e7e7c;
      width: 560rpx;
      height: 65rpx;
      border: 1px solid #1779ff;
      border-radius: 14rpx;
      display: flex;
      align-items: center;
      .icon-sousu {
        font-weight: bold;
        margin-left: 28rpx;
        margin-right: 10rpx;
      }
    }
    .icon-ellipsis {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 60rpx;
      width: 103rpx;
    }
  }
  .tabs {
    // font-weight: bold;
    margin-top: 36rpx;
    margin-bottom: 36rpx;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    .all {
      color: #1779ff;
      font-weight: bold;
    }
    .screen {
    }
  }
  .list-title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 20rpx 32rpx;
    height: 146rpx;
    background: #f0f0f0;
    .top {
      width: 100%;
      font-weight: bold;
    }
    .bottom {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      color: #727272;
      position: relative;
      .left {
        .expenditure {
          .icon-qian {
            font-size: 28rpx;
          }
        }
        .income {
          margin-left: 30rpx;
        }
      }
      .bill {
        display: flex;
        .icon-arrow-right {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
        }
      }
    }
  }
  .list-content {
    width: 100%;
    background: white;
    .list-item {
      width: 100%;
      height: 220rpx;
      display: flex;
      .icon {
        width: 132rpx;
        image {
          height: 68rpx;
          width: 68rpx;
          margin-top: 25rpx;
          margin-left: 30rpx;
        }
      }
      .detail {
        margin-top: 40rpx;
        width: 585rpx;
        border-bottom: 2rpx solid #f5f5f5;
        .money {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
        }
        .purpose {
          margin: 10rpx 0;
        }
        .purpose,
        .time {
          font-size: 28rpx;
          color: #727272;
        }
      }
    }
  }
}
</style>

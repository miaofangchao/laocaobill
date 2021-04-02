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
    <scroll-view
      :scroll-y="true"
      :show-scrollbar="true"
      class="list-content"
      :style="{ height: scrollHeight }"
      @scroll="scrollViewScroll"
    >
      <!-- <mescroll-body
      class="list-content"
        ref="mescrollRef"
        @init="mescrollInit"
        @down="downCallback"
        @up="upCallback"
      > -->
      <view v-for="(item, index) in dataList" :key="index">
        <view v-if="!item.listTitle" class="list-item">
          <view class="icon">
            <image
              style="width:68rpx;height：68rpx;"
              mode="aspectFit"
              :src="item.imgSrc"
            ></image>
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
        <template v-else-if="item.listTitle">
          <view class="month-title">
            <view class="col-1">
              <text class="month-number">{{ parseInt(item.month) }}</text>
              <text class="month-unit">月</text>
            </view>
            <view class="col-2">
              <text class="expenditure">
                支出&nbsp;&nbsp;¥ {{ number_format(item.expenditure, 2) }}
              </text>
              <text class="income"
                >收入&nbsp;&nbsp;¥ {{ number_format(item.income, 2) }}</text
              >
            </view>
            <view class="col-3">
              <text>收支分析 > </text>
            </view>
          </view>
          <view
            class="list-title"
            v-show="item.isShow"
            :style="{ top: listContentOffsetTop - 5 + 'px' }"
          >
            <text class="dowm-arrow top">{{ item.month }}</text>
            <view class="bottom">
              <view class="left">
                <text class="expenditure">
                  支出&nbsp;&nbsp;¥ {{ number_format(item.expenditure, 2) }}
                </text>
                <text class="income"
                  >收入&nbsp;&nbsp;¥ {{ number_format(item.income, 2) }}</text
                >
              </view>
              <view class="bill">
                月账单<text class="iconfont icon-arrow-right"></text>
              </view>
            </view>
          </view>
        </template>
      </view>
      <!-- </mescroll-body> -->
    </scroll-view>
    <view class="page-bottom">
      <view class="left">
        <view class="left-top">
          <image mode="scaleToFill" src="@/static/icon/zhangdan1.png"></image>
          <!-- <span class="iconfont">&#xe719;</span> -->
        </view>
        <view class="left-bottom"> 账单 </view>
      </view>
      <view class="right">
        <view class="right-top">
          <span class="iconfont">&#xe719;</span>
        </view>
        <view class="right-bottom"> 统计 </view>
      </view>
    </view>
  </view>
</template>

<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

export default {
  data: () => ({
    dataList: [
      {
        isShow: false,
        listTitle: true,
        month: "4月",
        expenditure: 20143.41,
        income: 45123.23,
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: true,
        month: "3月",
        expenditure: 20143.41,
        income: 45123.23,
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "02-17",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "02-15",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        isShow: false,
        listTitle: true,
        month: "2月",
        expenditure: 20143.41,
        income: 45123.23,
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        isShow: false,
        listTitle: true,
        month: "1月",
        expenditure: 20143.41,
        income: 45123.23,
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
      {
        listTitle: false,
        detailMoney: "-30.23",
        place: "扫收钱码付款-给*广建",
        date: "今天",
        time: "13:43",
        imgSrc: "/static/icon/shangpu.png",
      },
    ],
    windowHeight: 0,
    query: null,
    listContentOffsetTop: null,
    monthTitleTop: [],
    listTitleHeight: 0,
  }),
  created() {
    uni.getSystemInfo({
      success: (res) => {
        console.log(res.windowHeight);
        this.windowHeight = res.windowHeight;
      },
    });
  },
  mounted() {
    this.query = uni.createSelectorQuery().in(this);
    this.query
      .select(".list-content")
      .boundingClientRect((res) => {
        this.listContentOffsetTop = res.top;
      })
      .exec();

    this.query
      .select(".list-title")
      .boundingClientRect((res) => {
        this.listTitleHeight = res.height;
        console.log("list-title", res);
      })
      .exec();

    this.query
      .selectAll(".month-title")
      .boundingClientRect((res) => {
        console.log("month-title:", res);
        res.forEach((item) => {
          this.monthTitleTop.push(item.top);
        });
      })
      .exec();
    console.log(this.monthTitleTop);
  },
  mixins: [MescrollMixin],
  computed: {
    scrollHeight() {
      return this.windowHeight - 180 + "px";
    },
    listTitleData() {
      if (this.dataList.length) {
        return this.dataList.filter((item, index) => {
          if (item.listTitle) {
            item.index = index;
            return true;
          } else {
            return false;
          }
        });
      } else {
        return [];
      }
    },
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
    scrollViewScroll(event) {
      console.log("scrollView-scrollTop:", event.detail.scrollTop);
        this.monthTitleTop.forEach((item,index) => {
          // 获取对应的datalist数据中isShow的索引
          let dataListIndex = this.listTitleData[index].index
          // 先判断滚动出去的索引大于1的情况：即第一个title已经滚动出去
          if(index >= 1 && event.detail.scrollTop >= this.monthTitleTop[index] - this.listContentOffsetTop*1.5){
            let lastDataListIndex = this.listTitleData[index-1].index
              this.$set(this.dataList[dataListIndex], "isShow", true);
              this.$set(this.dataList, dataListIndex, this.dataList[dataListIndex]);
              this.$set(this.dataList[lastDataListIndex], "isShow", false);
              this.$set(this.dataList, lastDataListIndex, this.dataList[lastDataListIndex]);
              return
          }
          // 在判断第一个title滚动时：
          if (event.detail.scrollTop >= this.monthTitleTop[index]) {
            this.$set(this.dataList[dataListIndex], "isShow", true);
            this.$set(this.dataList, dataListIndex, this.dataList[dataListIndex]);
          }else{
            this.$set(this.dataList[dataListIndex], "isShow", false);
            this.$set(this.dataList, dataListIndex, this.dataList[dataListIndex]);
          }
        });
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
  background: white;
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
  }
  .list-content {
    width: 100%;
    background: #f8f8f8;
    position: relative;
    .month-title {
      margin-top: 28rpx;
      width: 100%;
      height: 261rpx;
      background: url(@/static/icon/bg-title.png);
      background-size: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      padding-top: 25rpx;
      padding-bottom: 25rpx;
      padding-left: 32rpx;
      border-bottom: 2rpx solid #f8f8f8;
      .col-1,
      .col-2,
      .col-3 {
        width: 100%;
      }
      .col-1 {
        .month-number {
          font-size: 80rpx;
          line-height: 70rpx;
        }
        .month-unit {
          margin-left: 12rpx;
          font-weight: bold;
        }
        &::after {
          content: "";
          width: 0;
          height: 0;
          border-top: 12rpx solid black;
          border-left: 10rpx solid transparent;
          border-right: 10rpx solid transparent;
          margin-left: 12rpx;
          vertical-align: bottom;
          line-height: 0rpx;
        }
      }
      .col-2 {
        .expenditure {
          .icon-qian {
            font-size: 28rpx;
          }
        }
        .income {
          margin-left: 30rpx;
        }
      }
      .col-3 {
      }
    }
    .list-title {
      z-index: 999;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 20rpx 32rpx;
      height: 146rpx;
      background: #f8f8f8;
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
    .list-item {
      width: 100%;
      height: 220rpx;
      display: flex;
      background-color: white;
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
  .page-bottom {
    width: 100%;
    background: #fafafa;
    position: fixed;
    bottom: 0;
    height: 100rpx;
    border-top: 2rpx solid #f5f5f5;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    .left {
      .left-top {
        // width: 30rpx;
        // height: 32rpx;
        // display: flex;
        // justify-content: center;
        // align-content: center;
        text-align: center;
        font-size: 22rpx;
        color: #1779ff;
        image {
          width: 30rpx;
          height: 30rpx;
        }
      }
      .left-bottom {
        color: #1779ff;
        font-size: 22rpx;
      }
    }
    .right {
      .right-top {
        text-align: center;
        font-size: 30rpx;
      }
      .right-bottom {
        font-size: 22rpx;
      }
    }
  }
}
</style>

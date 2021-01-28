<template>
  <view>
    <scroll-view scroll-y class="page">
      <cu-custom bgColor="bg-gradual-pink" :isBack="true">
        <block slot="backText">返回</block>
        <block slot="content">用户详情</block>
        <view slot="right" @tap="rightClick">编辑</view>
      </cu-custom>
      <!-- list列表 -->
      <view class="cu-list menu">
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '0.1s' }]"
        >
          <view class="content">
            <text class="text-grey">头像</text>
          </view>
          <view class="action">
            <!-- <view class="cu-avatar round sm" :style="{backgroundImage: 'url(' + userInfo.avatar + ')'}"></view> -->
            <image
              :src="
                userInfo.avatar
                  ? api.getFileAccessHttpUrl(userInfo.avatar)
                  : '/static/avatar_boy.png'
              "
              round
              class="avatar"
              mode="widthFix"
              :style="[{ animationDelay: '0.1s' }]"
            ></image>
          </view>
        </view>
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '0.2s' }]"
        >
          <view class="content">
            <text class="text-grey">姓名</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.realname }}</text>
          </view>
        </view>
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '0.3s' }]"
        >
          <view class="content">
            <text class="text-grey">性别</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.sex == '1' ? '男' : '女'}}</text>
          </view>
        </view>
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '0.4s' }]"
        >
          <view class="content">
            <text class="text-grey">生日</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.birthday }}</text>
          </view>
        </view>
      </view>

      <view class="cu-list menu">
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '0.5s' }]"
        >
          <view class="content">
            <text class="text-grey">对外信息展示</text>
          </view>
          <view class="action">
            <text class="text-grey">{{
              getSubStringText(
                userInfo.realname + "@" + userInfo.orgCode,
                11
              )
            }}</text>
          </view>
        </view>
      </view>

      <view class="cu-list menu">
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '0.6s' }]"
        >
          <view class="content">
            <text class="text-grey">所在部门</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.orgCodeTxt }}</text>
          </view>
        </view>
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '0.7s' }]"
        >
          <view class="content">
            <text class="text-grey">工号</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.workNo }}</text>
          </view>
        </view>
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '0.8s' }]"
        >
          <view class="content">
            <text class="text-grey">状态</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.status }}</text>
          </view>
        </view>
      </view>

      <view class="cu-list menu">
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '0.9s' }]"
        >
          <view class="content">
            <text class="text-grey">手机</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.phone }}</text>
          </view>
        </view>
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '1s' }]"
        >
          <view class="content">
            <text class="text-grey">邮箱</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.email }}</text>
          </view>
        </view>
      </view>

      <view class="cu-list menu">
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '1.1s' }]"
        >
          <view class="content">
            <text class="text-grey">职务</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.post }}</text>
          </view>
        </view>
        <view
          class="cu-item animation-slide-bottom"
          :style="[{ animationDelay: '1.2s' }]"
        >
          <view class="content">
            <text class="text-grey">身份</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ userInfo.userIdentity == '2' ? '上级' : '普通用户' }}</text>
          </view>
        </view>
        <view
          class="cu-item animation-slide-bottom"
          v-if="userInfo.userIdentity == '2'"
        >
          <view class="content">
            <text class="text-grey">负责部门</text>
          </view>
          <view class="action">
            <text class="text-grey">{{ depart }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import api from "@/api/api.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // userInfo: {
      //   avatar: "",
      //   realname: "",
      //   username: "",
      //   sex: 1,
      //   birthday: new Date(),
      //   orgCode: "",
      //   workNo: "",
      //   status: 1,
      //   phone: "",
      //   telephone: "",
      //   email: "",
      //   post: "",
      //   departIds: "",
      //   identity: "",
      // },
      userUrl: "/sys/user/queryById",
      positionUrl: "/sys/position/list",
			departUrl: "/sys/user/userDepartList",
			depart:'',//部门名字
			api:null,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
	},
	created() {
		this.api = api
	},
  onLoad() {
		// 根据用户id获取部门名字
		this.$http.get(this.departUrl,{params:{userId:this.$store.getters.userid}})
			.then(res=>{
				console.log(res)
				if(res.data.success){
					this.depart = res.data.result[0].title
				}
			})
  },
  methods: {
    getSubStringText(text, len) {
      if (!text || text.length == 0) {
        return "";
      }
      if (text.length < len) {
        return text;
      }
      return text.substr(0, len) + "...";
    },
    rightClick() {
      this.$Router.push({ name: "useredit" });
    },
    loadinfo() {
      // this.$http
      //   .get(this.userUrl, { params: { id: this.$store.getters.userid } })
      //   .then((res) => {
      //     console.log("用户", res);
      //     if (res.data.success) {
      //       let result = res.data.result;
      //       if (result.avatar && result.avatar.length > 0)
      //         this.userInfo.avatar = api.getFileAccessHttpUrl(result.avatar);
      //       this.userInfo.realname = result.realname;
      //       this.userInfo.username = result.username;
      //       this.userInfo.post = result.post;
      //       this.userInfo.sex = result.sex === 1 ? "男" : "女";
      //       this.userInfo.birthday =
      //         result.birthday == null ? "无" : result.birthday;
      //       this.userInfo.departIds = result.departIds;
      //       this.userInfo.workNo = result.workNo;
      //       this.userInfo.phone = result.phone;
      //       this.userInfo.telephone =
      //         result.telephone == null ? "无" : result.telephone;
      //       this.userInfo.email = result.email;
      //       this.userInfo.post = result.post;
      //       this.userInfo.identity =
      //         result.identity === 1 ? "普通成员" : "上级";
      //       this.userInfo.status = result.status === 1 ? "正常" : "冻结";
      //       this.userInfo.orgCode = result.orgCode;
      //     }
      //   })
      //   .catch((e) => {
      //     console.log("请求错误", e);
      //   });

      // this.$http
      //   .get(this.departUrl, { params: { userId: this.$store.getters.userid } })
      //   .then((res) => {
      //     if (res.success) {
      //       for (let item of res.result) {
      //         this.userInfo.orgCode = item.title;
      //         this.userInfo.departIds = item.title;
      //       }
      //     }
      //   })
      //   .catch((e) => {
      //     console.log("请求错误", e);
      //   });

      // this.$http
      //   .get(this.positionUrl)
      //   .then((res) => {
      //     if (res.success) {
      //       let postArr = res.result.records;
      //       for (let item of postArr) {
      //         if (this.userInfo.post == item.code) {
      //           this.userInfo.post = item.name;
      //         }
      //       }
      //     }
      //   })
      //   .catch((e) => {
      //     console.log("请求错误", e);
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  width: 100vw;
}
.avatar{
	width: 70rpx;
	height: 70rpx;
}

.page.show {
  overflow: hidden;
}

.switch-sex::after {
  content: "\e716";
}

.switch-sex::before {
  content: "\e7a9";
}

.switch-music::after {
  content: "\e66a";
}

.switch-music::before {
  content: "\e6db";
}
</style>

import Vue from 'vue'
import { USER_INFO, ENHANCE_PRE } from "@/store/mutation-types"
const getters = {
  token: state => state.token,
  username: state => { state.username = uni.getStorageSync(USER_INFO).username; return state.username },
  nickname: state => { state.nickname = uni.getStorageSync(USER_INFO).realname; return state.realname },
  avatar: state => { state.avatar = uni.getStorageSync(USER_INFO).avatar; return state.avatar },
  userid: state => { state.userid = uni.getStorageSync(USER_INFO).id; return state.userid },
  userInfo: state => { state.userInfo = uni.getStorageSync(USER_INFO); return state.info },

  permissionList: state => state.user.permissionList,
 
  addRouters: state => state.permission.addRouters,
  enhanceJs: (state) => (code) => {
    state.enhance.enhanceJs[code] = Vue.ls.get(ENHANCE_PRE + code);
    return state.enhance.enhanceJs[code]
  },
  // ups
  dataSource_UPS: state => {
    return state.dataSource.filter(item => {
      return item.deviceType == '1'
    })
  },
  // 配电
  dataSource_distribution: state => {
    return state.dataSource.filter(item => {
      return item.deviceType == '2'
    })
  },
  // 漏水
  dataSource_waterLeakage: state => {
    return state.dataSource.filter(item => {
      return item.deviceType == '3'
    })
  },
  // 温湿度数据
  dataSource_TH: state => {
    return state.dataSource.filter(item => {
      return item.deviceType == '4'
    })
  },
  // 网络硬盘录像机
  dataSource_videoSystem: state => {
    return state.dataSource.filter(item => {
      return item.deviceType == '5'
    })
  },
  // 门禁
  dataSource_doorControl: state => {
    return state.dataSource.filter(item => {
      return item.deviceType == '6'
    })
  },
  // 精密空调
  dataSource_precisionAirConditioning: state => {
    return state.dataSource.filter(item => {
      return item.deviceType == '7'
    })
  },
  // 新风排风
  dataSource_freshAirSystem: state => {
    return state.dataSource.filter(item => {
      return item.deviceType == '8'
    })
  },
  // 短信设备
  dataSource_SMS: state => {
    return state.dataSource.filter(item => {
      return item.deviceType == '9'
    })
  },
}

export default getters
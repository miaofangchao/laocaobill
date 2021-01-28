import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api/api"
import { queryPermissionsByUser } from '@/api/api'
import MinCache from '@/common/util/MinCache.js'
import { ACCESS_TOKEN, USER_NAME, USER_INFO, SYS_BUTTON_AUTH, UI_CACHE_DB_DICT_DATA, TENANT_ID } from "@/store/mutation-types"
import configService from '@/common/service/config.service.js'
import { http } from '@/common/service/service.js'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    token: '',
    username: '',
    realname: '',
    tenantid: '',
    welcome: '',
    avatar: '',
    userid: '',
    permissionList: [],
    info: {},
    lockReconnect: false,//websocket重连
    // 设备监测信息
    url:{
      listAll:'/web.collectdata/tbPowerDataCollection/listAll',////method:get;params:无
      controlDoor:'/web.personnelmanage/tbPowerPersonnelManage/openDoor',//method:get;params:number
    },
    dataSource:[],//设备状态信息
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, realname, welcome }) => {
      state.username = username
      state.realname = realname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_TENANT: (state, id) => {
      state.tenantid = id
    },
    changeLockReconnect(state, flag) {
      state.lockReconnect = flag
    },
    setDataSource(state,{dataSource}){
      state.dataSource = dataSource
      // console.log(state.dataSource)
    }
  },
  actions: {
    // 登录
    mLogin({ commit }, userInfo) {
      console.log("mLogin", userInfo)
      return new Promise((resolve, reject) => {
        api.login(userInfo).then(response => {
          if (response.data.code == 200) {
            const result = response.data.result
            const userInfo = result.userInfo
            uni.setStorageSync(ACCESS_TOKEN, result.token);
            uni.setStorageSync(USER_NAME, userInfo.username);
            uni.setStorageSync(USER_INFO, userInfo);
            uni.setStorageSync(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems);
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_AVATAR', userInfo.avatar)
            commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname })
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch(error => {
          console.log("catch===>response", error)
          reject(error)
        })
      })
    },
    // 根据userid获取用户信息，刷新用
    getUserInfoById({ getters,commit }) {
      return new Promise((resolve, reject) => {
        http.get('/sys/user/queryById', { params: { id: getters.userid } })
          .then(response => {
            // debugger
            console.log('刷新用户信息成功：' + response.data)
            if (response.data.success) {
              const userInfo = response.data.result
              uni.setStorageSync(USER_NAME, userInfo.username);
              uni.setStorageSync(USER_INFO, userInfo);
              commit('SET_INFO', userInfo)
              commit('SET_AVATAR', userInfo.avatar)
              commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname })
              resolve(response)
            } else {
              reject(response)
            }
          })
          .catch(error => {
            console.log("catch===>response", error)
            reject(error)
          })
      })

    },
    // 获取用户信息  (pc端动态路由权限配置，app用不到)
    GetPermissionList({ commit }) {
      return new Promise((resolve, reject) => {
        let v_token = uni.getStorageSync(ACCESS_TOKEN);
        let params = { token: v_token };
        queryPermissionsByUser(params).then(response => {
          const menuData = response.result.menu;
          // const authData = response.result.auth;
          // const allAuthData = response.result.allAuth;
          //Vue.ls.set(USER_AUTH,authData);
          // sessionStorage.setItem(USER_AUTH, JSON.stringify(authData));
          // sessionStorage.setItem(SYS_BUTTON_AUTH, JSON.stringify(allAuthData));
          if (menuData && menuData.length > 0) {
            //update--begin--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
            menuData.forEach((item, index) => {
              if (item["children"]) {
                let hasChildrenMenu = item["children"].filter((i) => {
                  return !i.hidden || i.hidden == false
                })
                if (hasChildrenMenu == null || hasChildrenMenu.length == 0) {
                  item["hidden"] = true
                }
              }
            })
            //console.log(" menu show json ", menuData)
            //update--end--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
            commit('SET_PERMISSIONLIST', menuData)
          } else {
            reject('getPermissionList: permissions must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //手机号登录
    PhoneLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.phoneNoLogin(userInfo).then(response => {
          if (response.code == '200') {
            const result = response.result
            const userInfo = result.userInfo
            commit('SET_TOKEN', result.token)
            commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname })
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        let logoutToken = state.token;
        commit('SET_TOKEN', '')
        uni.removeStorageSync(ACCESS_TOKEN)
        api.logout(logoutToken).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },
    // 初始化websocket连接，收到报警消息后播放语音
    initWebSocket({ commit, dispatch, state, getters }) {
      let userId = getters.userid;
      let url = configService.apiUrl.replace("https://", "wss://").replace("http://", "ws://") + "/websocket/" + userId;
      console.log('websocket url>>' + url);
      let reconnect = () => {
        if (state.lockReconnect) return;
        commit('changeLockReconnect', true)
        //没连接上会一直重连，设置延迟避免请求过多
        setTimeout(function () {
          console.info("尝试重连...");
          dispatch('initWebSocket')
          commit('changeLockReconnect', false)
        }, 5000);
      }
      let websock = uni.connectSocket({
        url: url,
        success() {
          console.log('websocket开始连接')
        }
      });
      websock.onOpen(() => {
        console.log("WebSocket连接成功")
      })
      websock.onError((errMsg) => {
        console.log("WebSocket连接发生错误：" + errMsg)
        reconnect()
      })
      websock.onMessage((res) => {
        console.log("-----接收消息-------:" + res)
        let data = JSON.parse(res.data)
        let msgTxt = data.msgTxt
        console.log(msgTxt)
        // 收到消息后，获取音频
        http.post('/web/voice/create', { text: msgTxt })
          .then(res => {
            // debugger
            console.log(res.data.result.audioPath)
            let audioPath = api.getFileAccessHttpUrl(res.data.result.audioPath.replace(/^\//, ''))
            // 初始化 播放音频
            let audio = uni.createInnerAudioContext()
            audio.onPlay(() => {
              console.log('开始播放')
            })
            audio.onError(err => {
              console.log('播放错误' + err.errMsg)
            })
            audio.onEnded(() => {
              console.log('销毁audio')
              audio.offPlay()
              audio.offEnded()
              audio.offError()
              audio.destroy()
            })
            audio.src = audioPath
            audio.autoplay = true
          })
          .catch(err => {
            console.log(err)
          })
      })
      websock.onClose(() => {
        console.log('websocket连接关闭')
        // reconnect()
      })
    },
    // 获取设备监测状态信息
    getDataSource({ state,commit }){
      // debugger
      return new Promise((resolve,reject)=>{
        // debugger
        http.get(state.url.listAll).then((res) => {
          // debugger
          if (res.data.success) {
            // debugger
            commit('setDataSource',{dataSource:res.data.result})
            // console.log(res.result)
            resolve()
          }
          if(res.code===510){
            reject(res.data.message)
          }
        })
      })
    },
    /**
     * 远程控门
     * @param payload 命令值：0-关门，1-开门，2-常开，3-常关
     * @return new Promise resolve(res.result):  1：成功；2：失败
     */
    remoteControlDoor({ state },payload){
      return new Promise((resolve,reject)=>{
        http.get(`${state.url.controlDoor}?number=${payload}`).then((res) => {
          // debugger
          console.log(res)
          // 返回值res.result:  1：成功；2：失败
          if (res.success) {
            resolve(res.result)
          }
          if(res.code===510){
            reject(res.message)
          }
        })
      })
    }
  },
  getters
})

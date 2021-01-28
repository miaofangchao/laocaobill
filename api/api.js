import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
import {UI_CACHE_DB_DICT_DATA } from "@/store/mutation-types"
const apiService = {
	 
	 /**
	  * 登录
	  */
	login(params) {
		return http.post('/sys/mLogin',params)	
	},
	/**
	  * 手机号码登录
	  */
	phoneNoLogin(params) {
		return http.post('/sys/phoneLogin',params);
	},
	/**
	  * 退出
	  */
	logout(params) {
		return http.post('/sys/logout',params);
	},
	/**
	 * 获取文件访问路径
	 * @param avatar
	 * @param subStr
	 * @returns {*}
	 */
	getFileAccessHttpUrl(avatar,subStr){
	    if(!subStr) subStr = 'http'
	    if(avatar && avatar.startsWith(subStr)){
	        return avatar;
	    }else{
	        return configService.staticDomainURL + "/" + avatar;
	    }
	}
};

export default apiService;

//角色管理
const addRole = (params)=>http.post("/sys/role/add",params);
const editRole = (params)=>http.put("/sys/role/edit",params);
const checkRoleCode = (params)=>http.get("/sys/role/checkRoleCode",params);
const queryall = (params)=>http.get("/sys/role/queryall",params);

//用户管理
const addUser = (params)=>http.post("/sys/user/add",params);
const editUser = (params)=>http.put("/sys/user/edit",params);
const queryUserRole = (params)=>http.get("/sys/user/queryUserRole",params);
const getUserList = (params)=>http.get("/sys/user/list",params);
const frozenBatch = (params)=>http.put("/sys/user/frozenBatch",params);
//验证用户是否存在
const checkOnlyUser = (params)=>http.get("/sys/user/checkOnlyUser",params);
//改变密码
const changePassword = (params)=>http.put("/sys/user/changePassword",params);

//权限管理
const addPermission= (params)=>http.post("/sys/permission/add",params);
const editPermission= (params)=>http.put("/sys/permission/edit",params);
const getPermissionList = (params)=>http.get("/sys/permission/list",params);
/*update_begin author:wuxianquan date:20190908 for:添加查询一级菜单和子菜单查询api */
const getSystemMenuList = (params)=>http.get("/sys/permission/getSystemMenuList",params);
const getSystemSubmenu = (params)=>http.get("/sys/permission/getSystemSubmenu",params);
const getSystemSubmenuBatch = (params) => http.get('/sys/permission/getSystemSubmenuBatch', params)

const queryTreeList = (params)=>http.get("/sys/permission/queryTreeList",params);
const queryTreeListForRole = (params)=>http.get("/sys/role/queryTreeList",params);
const queryListAsync = (params)=>http.get("/sys/permission/queryListAsync",params);
const queryRolePermission = (params)=>http.get("/sys/permission/queryRolePermission",params);
const saveRolePermission = (params)=>http.post("/sys/permission/saveRolePermission",params);
const queryPermissionsByUser = (params)=>http.get("/sys/permission/getUserPermissionByToken",params);
const loadAllRoleIds = (params)=>http.get("/sys/permission/loadAllRoleIds",params);
const getPermissionRuleList = (params)=>http.get("/sys/permission/getPermRuleListByPermId",params);
const queryPermissionRule = (params)=>http.get("/sys/permission/queryPermissionRule",params);

// 部门管理
const queryDepartTreeList = (params)=>http.get("/sys/sysDepart/queryTreeList",params);
const queryIdTree = (params)=>http.get("/sys/sysDepart/queryIdTree",params);
const queryParentName   = (params)=>http.get("/sys/sysDepart/queryParentName",params);
const searchByKeywords   = (params)=>http.get("/sys/sysDepart/searchBy",params);
const deleteByDepartId   = (params)=>http.delete("/sys/sysDepart/delete",params);

//二级部门管理
const queryDepartPermission = (params)=>http.get("/sys/permission/queryDepartPermission",params);
const saveDepartPermission = (params)=>http.post("/sys/permission/saveDepartPermission",params);
const queryTreeListForDeptRole = (params)=>http.get("/sys/sysDepartPermission/queryTreeListForDeptRole",params);
const queryDeptRolePermission = (params)=>http.get("/sys/sysDepartPermission/queryDeptRolePermission",params);
const saveDeptRolePermission = (params)=>http.post("/sys/sysDepartPermission/saveDeptRolePermission",params);
const queryMyDepartTreeList = (params)=>http.get("/sys/sysDepart/queryMyDeptTreeList",params);

//日志管理
//const getLogList = (params)=>http.get("/sys/log/list",params);
const deleteLog = (params)=>http.delete("/sys/log/delete",params);
const deleteLogList = (params)=>http.delete("/sys/log/deleteBatch",params);

//数据字典
const addDict = (params)=>http.post("/sys/dict/add",params);
const editDict = (params)=>http.put("/sys/dict/edit",params);
const treeList = (params)=>http.get("/sys/dict/treeList",params);
const addDictItem = (params)=>http.post("/sys/dictItem/add",params);
const editDictItem = (params)=>http.put("/sys/dictItem/edit",params);

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params)=>http.get(`/sys/dict/getDictItems/${code}`,params);
//从缓存中获取字典配置
function getDictItemsFromCache(dictCode) {
  if (Vue.ls.get(UI_CACHE_DB_DICT_DATA) && Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode]) {
    let dictItems = Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode];
    console.log("-----------getDictItemsFromCache----------dictCode="+dictCode+"---- dictItems=",dictItems)
    return dictItems;
  }
}

//系统通告
const doReleaseData = (params)=>http.get("/sys/annountCement/doReleaseData",params);
const doReovkeData = (params)=>http.get("/sys/annountCement/doReovkeData",params);
//获取系统访问量
const getLoginfo = (params)=>http.get("/sys/loginfo",params);
const getVisitInfo = (params)=>http.get("/sys/visitInfo",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params)=>http.get("/sys/user/queryUserByDepId",params);

// 重复校验
const duplicateCheck = (params)=>http.get("/sys/duplicate/check",params);
// 加载分类字典
const loadCategoryData = (params)=>http.get("/sys/category/loadAllData",params);
const checkRuleByCode = (params) => http.get('/sys/checkRule/checkByCode', params)
//加载我的通告信息
const getUserNoticeInfo= (params)=>http.get("/sys/sysAnnouncementSend/getMyAnnouncementSend",params);
const getTransitURL = url => `/sys/common/transitRESTful?url=${encodeURIComponent(url)}`
// 中转HTTP请求
export const transitRESTful = {
  get: (url, parameter) => http.get(getTransitURL(url), parameter),
  post: (url, parameter) => http.post(getTransitURL(url), parameter),
  put: (url, parameter) => http.put(getTransitURL(url), parameter),
  // http: (url, parameter) => httpAction(getTransitURL(url), parameter),
}

export {
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  queryall,
  frozenBatch,
  checkOnlyUser,
  changePassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryListAsync,
  queryRolePermission,
  saveRolePermission,
  queryPermissionsByUser,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  queryDepartTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  addDictItem,
  editDictItem,
  doReleaseData,
  doReovkeData,
  getLoginfo,
  getVisitInfo,
  queryUserByDepId,
  duplicateCheck,
  queryTreeListForRole,
  getSystemMenuList,
  getSystemSubmenu,
  getSystemSubmenuBatch,
  loadCategoryData,
  checkRuleByCode,
  queryDepartPermission,
  saveDepartPermission,
  queryTreeListForDeptRole,
  queryDeptRolePermission,
  saveDeptRolePermission,
  queryMyDepartTreeList,
  getUserNoticeInfo,
  getDictItemsFromCache
}

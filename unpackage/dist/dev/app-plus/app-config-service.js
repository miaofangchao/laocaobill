
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/user/userexit","pages/user/userdetail","pages/user/useredit","pages/user/people","pages/common/exit","pages/common/success","pages/roomEnvironment/temperatureHumidity/temperatureHumidity","pages/roomEnvironment/freshAirSystem/freshAirSystem","pages/roomEnvironment/precisionAirConditioning/precisionAirConditioning","pages/roomEnvironment/waterLeakage/waterLeakage","pages/powerSystem/powerDistribution/powerDistribution","pages/powerSystem/ups/ups","pages/securitySystem/doorControl/doorControl","pages/assetSystem/deviceManagement/deviceManagement","pages/alarmDetails/alarmDetails","pages/billManagement/billManagement"],"window":{"backgroundColorTop":"#ffffff","navigationBarBackgroundColor":"#0081ff","navigationBarTitleText":"monitor","navigationStyle":"custom","navigationBarTextStyle":"black"},"tabBar":{"color":"#aaaaaa","selectedColor":"#39b54a","backgroundColor":"white","fontSize":"12px","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/tabbar/homePage.png","selectedIconPath":"static/tabbar/homePage_cur.png"},{"pagePath":"pages/index/index","text":"首页"},{"pagePath":"pages/index/index","text":"首页"},{"pagePath":"pages/index/index","text":"首页"},{"pagePath":"pages/user/people","text":"个人","iconPath":"static/tabbar/about.png","selectedIconPath":"static/tabbar/about_cur.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"monitor","compilerVersion":"3.1.2","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/login/login","meta":{},"window":{}},{"path":"/pages/user/userexit","meta":{},"window":{}},{"path":"/pages/user/userdetail","meta":{},"window":{}},{"path":"/pages/user/useredit","meta":{},"window":{}},{"path":"/pages/user/people","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/common/exit","meta":{},"window":{}},{"path":"/pages/common/success","meta":{},"window":{}},{"path":"/pages/roomEnvironment/temperatureHumidity/temperatureHumidity","meta":{},"window":{}},{"path":"/pages/roomEnvironment/freshAirSystem/freshAirSystem","meta":{},"window":{}},{"path":"/pages/roomEnvironment/precisionAirConditioning/precisionAirConditioning","meta":{},"window":{}},{"path":"/pages/roomEnvironment/waterLeakage/waterLeakage","meta":{},"window":{}},{"path":"/pages/powerSystem/powerDistribution/powerDistribution","meta":{},"window":{}},{"path":"/pages/powerSystem/ups/ups","meta":{},"window":{}},{"path":"/pages/securitySystem/doorControl/doorControl","meta":{},"window":{}},{"path":"/pages/assetSystem/deviceManagement/deviceManagement","meta":{},"window":{}},{"path":"/pages/alarmDetails/alarmDetails","meta":{},"window":{}},{"path":"/pages/billManagement/billManagement","meta":{},"window":{"navigationBarTextStyle":"black"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
import {RouterMount,createRouter,runtimeQuit} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routerErrorEach:({type,msg})=>{
		console.log({type,msg})
		// #ifdef APP-PLUS
			if(type===3){
				router.$lockStatus=false;
				runtimeQuit();
			}
		// #endif
	},
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
	router,
	RouterMount
}
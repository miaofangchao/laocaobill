<template>
	<view>
		<Home />
	</view>
</template>

<script>
import Home from './Home'
	export default {
		data() {
		return {
			}
		},
		components:{
			Home
		},
		onLoad:function(){
		},
		created() {
			// debugger
			this.$store.dispatch('getDataSource')
				.then(res=>{
					// debugger
				})
				.catch(err=>{
					this.$tip.error('获取监测信息出错')
				})
		},
		methods: {
		}
	}
</script>

<style>

</style>

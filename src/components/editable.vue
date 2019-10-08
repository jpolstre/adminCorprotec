<template>
	<div :class="tag" contenteditable="true" @input="update"></div>
	<!-- <h6 v-else  contenteditable="true" @input="update"></h6> -->
</template>


<script>
	export default{
		props:['content','tag'],
		mounted:function(){
			this.$el.innerText = this.content;
		},
		methods:{
			update(event){
				this.$emit('update',event.target.innerText);
			}
		}
	}

	// var example = new Vue({
	//   el: '#example',
	//   data: {
	//     text:"This text is editable!"
	//   }
	// })
</script>
<style lang="stylus">
	.h5
		font-size 1.4em!important
		font-weight 500!important
	.h6
		font-size 1em!important
		font-weight 400!important
</style>
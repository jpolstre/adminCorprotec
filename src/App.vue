<template>
	<div id="q-app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",

	created(){
		const self = this
		window.addEventListener('beforeunload', function(event) {
			// event.returnValue = 'Write something'
			self.$store.commit('corprotec/setSwLoad', true)
			// console.log('CARGANDO')
		})
	},

	mounted(){
		if(this.$store.state.corprotec.swLoad){
			this.getData()
		}
		
	},
	methods:{
		getData(){
			const self = this
			self.$store.commit('corprotec/setSwLoad', false)
			self.$q.loading.show()
			this.$axios.all([
				self.$axios.get(`${self.$store.state.corprotec.baseUrl}productos/getAllData`),
				self.$axios.get(`${self.$store.state.corprotec.baseUrl}categorias/getAllData`),
				self.$axios.get(`${self.$store.state.corprotec.baseUrl}marcas/getAllData`),
				self.$axios.get(`${self.$store.state.corprotec.baseUrl}slides/getAllData`), 
			])
			.then(r=>{
				// self.slides = r[0].data
				// self.marcas = r[1].data
				// self.destacados = r[2].data
				// self.slides.forEach((item, index)=>{
				// 	item.imagePath = `${self.$store.state.corprotec.baseUrl}public/img/bg-slider-main/${item.imagen}?t=${Math.random()}`
				// })
				// self.marcas.forEach((item, index)=>{
				// 	item.imagePath = `${self.$store.state.corprotec.baseUrl}public/img/img-marcas/${item.imagen}?t=${Math.random()}`
				// })
				// self.destacados.forEach((item, index)=>{
				// 	item.imagePath = `${self.$store.state.corprotec.baseUrl}public/img/img-products/${item.imgs}?t=${Math.random()}`
				// })

				self.$store.commit('corprotec/setData',{
					productos:r[0].data.data, 
					categorias:r[1].data,
					marcas:r[2].data,
					slides:r[3].data,
				})
				// console.log(self.$store.state.corprotec.productos)

				self.$q.loading.hide()

			})
			.catch(err => {
				self.$q.loading.hide()
				self.$q.notify({
					message: 'Error En El Servidor.',
					position: 'bottom',
					icon:'warning',
					color:'negative'
				})
			})
		}
	}
};

</script>

<style></style>

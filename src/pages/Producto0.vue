<template>
	<q-page padding>
		<div class="row">
			<div class="xs-col-12 col-md-5" align="center">
					  <!-- <div class="icon flipped bg-green"></div> -->
				  		<q-card class="q-mx-xs">
				  			<q-img :src="`${$store.state.corprotec.baseUrl}public/img/img-products/${producto.imgs}`" style="width: 350px;" />
				  			<q-card-section>
				  				<div class="text-subtitle1">{{producto.nombre}}</div>
				  				<div class="text-subtitle2">Precio antes de factura: {{producto.precio}}Bs.-</div>
				  				<div class="text-subtitle2">Impuestos de ley: {{Math.floor((producto.precio/0.84)-producto.precio)}} Bs.-</div>
				  				<div class="text-subtitle2">Precio: {{Math.floor(producto.precio/0.84)}} Bs.-</div>
				  			</q-card-section>
				  		</q-card>
				
			</div>
			<div class="xs-col-12 col-md-6">
				<q-tabs 
						v-model="tab"
						dense
						class="text-grey"
						active-color="primary"
						indicator-color="primary"
						align="justify"
						narrow-indicator
				 >
					<q-tab name="descripcion" label="Descripcion" />
					<q-tab name="especificaciones" label="Especificaciones" />
				</q-tabs>
				 <q-separator />
				 <q-tab-panels v-model="tab" >
					<q-tab-panel class="bg-grey-1" name="descripcion" v-html="producto.descripcion">
						</q-tab-panel>
					 <q-tab-panel class="bg-grey-1" name="especificaciones" v-html="producto.especificaciones">
					 </q-tab-panel>
				 </q-tab-panels>
				
			</div>
			
		</div>
		
	</q-page>
</template>
<script>
	export default {
	data(){
		return{
			tab:'descripcion',
		}
	},
	computed:{
		producto() {
			let prods = this.$store.state.corprotec.productos.filter(p=> p.id==this.$route.params.id)
			return prods[0]
		},
	},
	// mounted(){
	// 	this.getData()
	// },
	// computed:{
	// 	producto(){
	// 		return this.$route.params.producto
	// 	}
	// },
	// methods:{
	// 	getData(){
	// 		const self = this
	// 		self.$q.loading.show()
	// 		self.$axios.all([
	// 			self.$axios.get(`${self.$store.state.corprotec.baseUrl}getProducto/${self.$route.params.id}`), 
	// 		])
	// 		.then(r=>{
	// 			self.producto = r[0].data
	// 			self.producto.imagePath = `${self.$store.state.corprotec.baseUrl}public/img/img-products/${self.producto.imgs}?t=${Math.random()}`
	// 			self.$q.loading.hide()

	// 		})
	// 		.catch(err => {
	// 			self.$q.loading.hide()
	// 			self.$q.notify({
	// 				message: 'Error En El Servidor.',
	// 				position: 'bottom',
	// 				icon:'warning',
	// 				color:'negative'
	// 			})
	// 		})

	// 	}
	// }
}
</script>
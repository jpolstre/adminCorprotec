<template>
	<q-page padding style="min-height: 768px;">
		<div >
<!-- 			<q-breadcrumbs class="q-pa-sm text-grey-8" >
				<q-breadcrumbs-el icon="home" label="Inicio" to="/" />
					<q-breadcrumbs-el icon="important_devices"  :to="'/products'" label="Productos" />
					<q-breadcrumbs-el icon="copyright" :label="$route.params.marca" class="active-breadcrumb" v-if="$route.params.marca" />
			</q-breadcrumbs>
			<q-separator color="primary" class="q-mb-md"/>
			<div class="text-h4 text-center q-mb-xl" v-if="$route.params.marca">Productos {{$route.params.marca}}</div>
			<div class="text-h4 text-center q-mb-xl" v-else> Todos los productos</div> -->
		<div class="row">
			
			<div class=" col-8">
				<q-input  dense v-model.trim="txtSearch" class="q-ma-md" outlined type="text" float-label="Float Label" :placeholder="`Buscar en ${$route.params.nombre||'TODOS LOS PRODUCTOS'}`" />
				
			</div>
			<div class="col-4" align="right">
				<q-btn color="primary" :icon="iconSel" class="q-my-md q-mx-xl" @click="iconSel=='fas fa-th-list'?$store.commit('corprotec/setIconSel', 'fas fa-th'):$store.commit('corprotec/setIconSel', 'fas fa-th-list')"/>
			</div>		
				
			
		</div>
			
		<div class="row q-my-xl" v-if="iconSel == 'fas fa-th'">
			<div v-for="producto in filtrados" class="col-sm-6 col-xs-6 col-md-3 cursor-pointer" @click="handleNavigate(producto)">
				<Flipped :flipId="`imagen_${producto.id}`">
					<div class="text-center" style="max-width:200px; min-height: 200px;">
						<!-- ?t=${Math.random()} -->
						<img :src="`${$store.state.corprotec.baseUrl}public/img/img-products/${producto.imgs}`" style="max-width:120px;"/>
						<div>
							<Flipped :flipId="`nombre_${producto.id}`">
								<div class="text-primary text-subtittle2 bg-transparent">{{producto.nombre}}</div>
							</Flipped>
						</div>

					</div>
				</Flipped>
				<div class="q-my-sm"></div>	
			</div>
		</div>

		<div class="row q-my-xl" v-else>
			<table class="q-table">
				<thead align="left">
					<tr>
						<th>Imagen</th>
						<th>Nombre</th>
						<th>Precio (Bs)</th>
						<th>Marca</th>
						<th>categoria</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="producto in filtrados">
						<td class="cursor-pointer" @click="handleNavigate(producto)">
							<Flipped :flipId="`imagen_${producto.id}`">
									<div class="text-center" style="max-width:100px; min-height: 100px;">
										<!-- ?t=${Math.random()} -->
										<img :src="`${$store.state.corprotec.baseUrl}public/img/img-products/${producto.imgs}`" style="max-width:80px;"/>
									</div>
								</Flipped>
						</td>
						<td>
							<div>
								<Flipped :flipId="`nombre_${producto.id}`">
									<div class="text-primary text-subtittle2 bg-transparent">{{producto.nombre}}</div>
								</Flipped>
							</div>
						</td>
						<td>{{producto.precio}}</td>
						<td>{{producto.nombremarca}}</td>
						<td>{{producto.nombrecategoria}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
		
	</q-page>
</template>

<script>
import { Flipped } from "vue-flip-toolkit"
import { colors } from 'quasar'


export default {
	name: "Productos",
	components: {
		Flipped
	},
	data() {
		return {
			// productos:[],
			txtSearch:''
		
		}
	},
	mounted(){
		this.txtSearch = ''

	},
		
	computed:{
		productos(){
			// console.log(this.$store.state.corprotec.productos)
			this.txtSearch = ''
			if(this.$route.params.catemarca){
				if(this.$route.params.catemarca=='categoria'){
					colors.setBrand('primary', '#00838F')
					return this.$store.state.corprotec.productos.filter(p=>p.nombrecategoria === this.$route.params.nombre)

				}else{
					const marca =  this.$store.state.corprotec.marcas.filter(m=>m.nombre === this.$route.params.nombre)
					colors.setBrand('primary', marca[0].backcolor)
					
					return this.$store.state.corprotec.productos.filter(p=>p.nombremarca === this.$route.params.nombre)
				}
			}else{
				colors.setBrand('primary', '#00838F')

				return this.$store.state.corprotec.productos
			}
			
		},
		filtrados(){
			return this.txtSearch !== ''?this.productos.filter(p=>p.nombre.toLowerCase().indexOf(this.txtSearch.toLowerCase())!=-1):this.productos
			
		},
		iconSel(){ 
			console.log(this.$store.state.corprotec.iconSel)
			return this.$store.state.corprotec.iconSel
		},
	
	},
	methods: {
		handleNavigate(producto) {
			this.$router.push(`/producto/${producto.id}/${producto.nombre.replace(/\s/g, '_')}`);
		},
	
	}
};
</script>



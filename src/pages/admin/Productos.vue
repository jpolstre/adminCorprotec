<template>
	 <q-page padding  class="q-mt-none q-pt-none">
		<!-- <h6 class="q-my-xs q-pt-none">Peliculas</h6> -->
		<!-- <q-btn color="primary" icon="thumb_up" label="test" class="animate-pop"/> -->
				<q-breadcrumbs class="q-pa-xs text-grey-8">
					<!-- <q-breadcrumbs-el icon="home" to="/admin" /> -->
					<q-breadcrumbs-el icon="devices_other" label="Productos" to="/admin/productos" class="active-breadcrumb"/>
				<!--   <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" to="/vue-components/breadcrumbs" />
					<q-breadcrumbs-el label="Build" icon="build" /> -->
				</q-breadcrumbs>
				<!-- 
					color="primary"
			card-class="bg-primary text-white"
			table-class="text-white"
			table-header-class="text-white"
				 -->
			<q-separator color="primary" class="q-mb-sm"/>	
		
		<q-table
			

			title="Productos"
			:data="data"
			:columns="columns"
			row-key="id"
			dense
			flat
			bordered
			
			class="my-sticky-header-column-table"

			:selected-rows-label="getSelectedString"
			 selection="single"
			 :selected.sync="selected"
			:pagination.sync="pagination"

			
			:loading="loading"
			:filter="filter"
			binary-state-sort
		
			
		>
	<!-- 		<template v-slot:top-right>
				<q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
					<template v-slot:append>
						<q-icon name="search" />
					</template>
				</q-input>
			</template> -->

			<template v-slot:top >
				
				<div class="col-xs-12 col-md-8 q-mb-xs" >
							<q-btn class="animate-pop"  size="xs" color="primary" :disable="loading" icon="add" @click="$router.push({ name:'GuardarProducto' })">
								
							</q-btn>
						
						
						<!-- @click="removeRow" -->
							<q-btn v-if="selected.length" class="on-right animate-pop" size="xs" color="primary" :disable="loading" icon="edit" @click="$router.push({ name: 'GuardarProducto', params: { producto:selected[0]}})"></q-btn>
							<q-btn v-if="selected.length" class="on-right animate-pop" size="xs" color="red-5" :disable="loading" icon="delete_forever" @click="deleteProducto(selected[0])"></q-btn>
					</div>
					<div class="col-xs-12 col-md-4">
						<!-- borderless -->
						<q-input filled  dense debounce="300" color="primary" v-model.trim="filter">
							<template v-slot:append>
								<q-icon name="search" />
							</template>
						</q-input>
					</div>


			</template>

<!-- 			<template v-slot:body="props">
			<q-tr :props="props">
				<q-td v-for="column in columns" :key="column.name" :props="props">
					<span v-swich>{{props.row[column.name]}}</span>		
				</q-td>
			</q-tr>
				</template> -->

				<!-- <template v-slot:body-cell-genre_ids="props">
					<td>
						<q-chip clickable dense icon="bookmark" v-for="genre_id in props.row.genre_ids.split(',')" :key="genre_id">
							{{$store.state.movie.generos[genre_id].name}}
						</q-chip>
					</td>
				</template> -->


				<!-- <template v-slot:body-cell-detalles_tecnicos="props">
					<td>{{props.row.detalles_tecnicos.slice(0,50)+'...'}}</td>
				</template> -->

				<template v-slot:body-cell-imgs="props">
					<td>
						<q-img
					
							:src="`${$store.state.corprotec.baseUrl}public/img/img-products/thumb_${props.row.imgs}`"
							style="width:100%; "
							
							basic
							spinner-color="black"
							>
					
						</q-img>
					</td>
				</template>
		</q-table>
		<q-page-scroller position="bottom-left" :scroll-offset="150" :offset="[18, 18]">
			<q-btn round glossy icon="keyboard_arrow_up" color="primary" />
		</q-page-scroller>
	</q-page>
</template>

<script>
export default {
	data () {
		return {
			// generos:{},

			selected: [],
			filter: '',
			loading: false,
			pagination: {
				sortBy: 'fecha_mod',
				descending: true,
				page: 1,
				rowsPerPage:0,
				// rowsNumber: 10
			},
			columns: [
				// {
				// 	name: 'desc',
				// 	required: true,
				// 	label: 'Dessert (100g serving)',
				// 	align: 'left',
				// 	field: row => row.name,
				// 	format: val => `${val}`,
				// 	sortable: true
				// },
				{ name: 'imgs', align: 'left', label: 'Imagen', field: 'imgs', sortable: false },

				{ name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true },

				{ name: 'precio', align: 'left',label: 'Precio(Bs.)', field: 'precio', sortable: true },


				{ name: 'nombrecategoria', align: 'left',label: 'Categoria', field: 'nombrecategoria', sortable: true },
				
				{ name: 'nombremarca',align: 'left', label: 'Marca', field: 'nombremarca', sortable: true },
				
				{ name: 'estado', align: 'left',label: 'Estado', field:row=> row.estado*1==1?'Habilitado':'Deshabilitado', sortable: true },
				{ name: 'destacado', align: 'left',label: 'Destacado', field:row=> row.destacado*1==1?'Destacado':'No Destacado', sortable: true },

				{ name: 'fecha_mod', align: 'left',label: 'Fecha Mod.', field: 'fecha_mod', sortable: true },
				

				//  sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
				
				// { name: 'genre_ids', align: 'left',label: 'Genre_ids', field: 'genre_ids', sortable: true },
				// { name: 'overview',align: 'left', label: 'Overview', field: row => row.overview.slice(0, 55)+'...', sortable: true },
				// { name: 'vote_average', align: 'left',label: 'Vote_average', field: 'vote_average', sortable: true },
				// { name: 'vote_count', align: 'left',label: 'Vote_count', field: 'vote_count', sortable: true },
				// { name: 'popularity', align: 'left',label: 'popularity', field: 'popularity', sortable: true },
				// { name: 'estado', align: 'left',label: 'Estado', field: 'estado', sortable: true },
		
				// { name: 'url',align: 'left', label: 'Url', field: 'url', sortable: true },
				// { name: 'detalles_tecnicos', align: 'left',label: 'Detalles_tecnicos', field: 'detalles_tecnicos', sortable: true },
			],
			data: [],

		}
	},
	mounted() {
		// const self =  this
		// this.$store.state.movie.generos.then((resp)=>{
		// 	// console.log(resp)
		// 	self.generos = resp
		// 	console.log(self.generos)
		// 		self.onRequest({
		// 	pagination: self.pagination,
		// 	filter: ''
		// })

		// })

		// this.generos = this.$store.state.movie.generos
		
		// this.onRequest({
		// 	pagination: this.pagination,
		// 	filter: ''
		// })
	
		// get initial data from server (1st page)

/*		const self =  this
		this.$axios.get(`${self.$store.state.movie.baseTmdb}genre/movie/list?api_key=${self.$store.state.movie.keyTmdb}&language=es-ES`)
		.then(r=>{
		
			self.generos = r.data.genres
		
			self.onRequest({
				pagination: this.pagination,
				filter: ''
			})
		})
		.catch(r => {
			self.$q.notify({
			message: 'Error En El Servidor.',
			position: 'bottom',
			icon:'warning',
			color:'negative'
			})
		})
		*/

		this.getData()
	},
	methods: {
		getData(){
			const self = this
			this.loading = true
			this.$axios.get(`${self.$store.state.corprotec.baseUrl}productos/getAll`)
			.then(r=>{
				self.data = r.data.data
				self.loading = false

			}).catch(r => {
				self.loading = false
				self.$q.notify({
				message: 'Error En El Servidor.',
				position: 'bottom',
				icon:'warning',
				color:'negative'
				})
			})

		},
		// getGenero(id){
		// 	for(let i=0;i<this.generos.length;i++){
		// 		if(this.generos[i].id==id){
		// 			return this.generos[i].name
		// 		}
		// 	}
		// },


		deleteProducto(item){
			this.$q.dialog({
				dark: true,
				title: 'Eliminar Producto',
				message: `Seguro eliminar "${item.nombre}" ?`,
				cancel: true,
				persistent: true
			}).onOk(()=>{
				const self = this
				self.$q.loading.show()
				self.$axios.post(`${self.$store.state.corprotec.baseUrl}productos/del/${item.id}`)
				.then(r=>{
					self.$q.notify({
						message: 'Ok Producto eliminado',
						position: 'top',
						icon:'thumb_up',
						color:'green-5'
					})
					self.$q.loading.hide()
					self.getData()
				})
				.catch(r => {
					self.$q.loading.hide()
					self.$q.notify({
						message: 'Error En El Servidor.',
						position: 'top',
						icon:'warning',
						color:'negative'
					})
				})
			})
			
		},
		getSelectedString () {
			 return this.selected.length === 0 ? '' : `${this.selected.length} registro${this.selected.length > 1 ? 's' : ''} seleccionado${this.selected.length > 1 ? 's' : ''} de ${this.data.length}`
		 },
		// onRequest (props) {
		// 	this.loading = true
		// 	let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
		// 	let filter
		// 	const self =  this

		// 	if(props.filter == ''){
		// 		filter = undefined
		// 	}else{ 
		// 		filter = props.filter
		// 	}
		

		// 		filter = encodeURIComponent(filter)
		// 		this.$axios.get(`${self.$store.state.movie.baseUrl}getRowsNumberCount/pelicula/${filter}/title__original_title`)
		// 		.then(r=>{
		// 			self.pagination.rowsNumber = r.data.length
		// 			// get all rows if "All" (0) is selected
		// 			let fetchCount = rowsPerPage === 0 ? 	self.pagination.rowsNumber : rowsPerPage

		// 			// calculate starting row of data
		// 			let startRow = (page - 1) * rowsPerPage

		// 			// fetch data from "server"
				
		// 			// fetchFromServer($tabla, $startRow, $count, $sortBy, $direction, $filter, $fieldsFilter)

		// 			// let returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

		// 			self.$axios.get(`${self.$store.state.movie.baseUrl}fetchFromServer/pelicula/${startRow}/${fetchCount}/${sortBy}/${descending}/${filter}/title__original_title`)
		// 			.then(r=>{

		// 				let returnedData = r.data.results
		// 				// clear out existing data and add new
		// 				self.data.splice(0, self.data.length, ...returnedData)

		// 				// don't forget to update local pagination object
		// 				self.pagination.page = page
		// 				self.pagination.rowsPerPage = rowsPerPage
		// 				self.pagination.sortBy = sortBy
		// 				self.pagination.descending = descending

		// 				// ...and turn of loading indicator
		// 				self.loading = false
		
		// 			})
		// 			.catch(r => {
		// 				self.loading = false
		// 				self.$q.notify({
		// 				message: 'Error En El Servidor.',
		// 				position: 'bottom',
		// 				icon:'warning',
		// 				color:'negative'
		// 				})
		// 			})

		// 		})
		// 		.catch(r => {
		// 			self.loading = false
		// 			self.$q.notify({
		// 			message: 'Error En El Servidor.',
		// 			position: 'bottom',
		// 			icon:'warning',
		// 			color:'negative'
		// 			})
		// 		})
		// },

	}
}
</script>
<style lang="stylus">
.my-sticky-header-column-table
  /*
    specifying max-width so the example can
    highlight the sticky column on any browser window
  */
  max-width 100%

  /* max height is important */
  .q-table__middle
    // max-height 200px
    height:calc(100vh - 230px)

  .q-table__top,
  .q-table__bottom,
  tr:first-child th, /* bg color is important for th; just specify one */
  td:first-child /* bg color is important for td; just specify one */
    background-color white

  tr:first-child th
    position sticky
    top 0
    opacity 1 /* opacity is important */
    z-index 2 /* higher than z-index for td below */

  tr:first-child th:first-child
    z-index 3 /* highest z-index */

  td:first-child
    z-index 1

  td:first-child, th:first-child
    position sticky
    left 0
</style>
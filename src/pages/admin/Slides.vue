<template>
	<q-page padding  class="q-mt-none q-pt-none">
		<q-breadcrumbs class="q-pa-xs text-grey-8">
			<q-breadcrumbs-el icon="slideshow" label="Slides" to="/admin/slides" class="active-breadcrumb"/>
		</q-breadcrumbs>
		<q-separator color="primary" class="q-mb-sm"/>	
		<!-- @start="dragging = true" @end="dragging = false" -->

		<draggable class="row q-mb-xl" v-model="items" handle=".handle">
			<div class="q-pa-xs col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-12"  v-for="item, index in items" :key="item.id">
				<q-card>
					<q-img :id="`img-slide-${index}`" :src="item.imagePath" style="height:170.7px;" >
						<!-- <div class="absolute-bottom text-center">
								<q-btn outline size="sm" color="primary" text-color="primary" label="Imagen"  no-caps @click="selectImagen(item, index)"/>
								<q-btn class="q-ml-xs" outline size="sm" color="negative" text-color="negative" label="Eliminar"  no-caps @click.native="eliminar(item)"/>

						</div> -->
						<div class="absolute-top text-left bg-transparent" >
							<q-btn icon="drag_handle" round color="purple" class="handle"/>
						</div>
						<div class="absolute-bottom text-right bg-transparent" >
								 <q-btn color="primary" round  icon="more_vert">
									 <q-menu cover auto-close>
										 <q-list>
											 <q-item clickable>
												 <q-item-section @click="selectImagen(item, index)" >Cambiar Imagen</q-item-section>
											 </q-item>
											 <q-item clickable>
												 <q-item-section @click="eliminar(item)">Eliminar Slide</q-item-section>
											 </q-item>
											<!--  <q-item clickable>
												 <q-item-section>Share</q-item-section>
											 </q-item> -->
										 </q-list>
									 </q-menu>
								 </q-btn>
							 </div>
					</q-img>
					<q-card-section>
					<div class="row items-center no-wrap">
						<div class="col">
							<div class="text-h6 label-dots">
								{{item.titulo}}
								<q-popup-edit v-model="item.titulo" buttons>
									<q-input v-model="item.titulo" dense autofocus/>
								</q-popup-edit>
							</div>
							<div class="text-subtitle2  label-dots">
								{{item.subtitulo}}
								<q-popup-edit v-model="item.subtitulo" buttons>
									<q-input v-model="item.subtitulo" dense autofocus/>
								</q-popup-edit>
							</div>
						<!-- 	<editable :content="item.nombre" @update="item.nombre = $event" class="text-h6">{{item.nombre}}</editable>
							<editable :content="item.descripcion" @update="item.descripcion = $event" class="text-subtitle2">{{item.descripcion}}</editable> -->
						</div>

					</div>
				</q-card-section>
				</q-card>
			</div>
		</draggable>


		 <q-toolbar  class="bg-grey-3 text-white q-my-none shadow-2 fixed-bottom">
		<!-- <q-btn flat round dense icon="menu"  /> -->
			<q-space />
			<q-btn round  icon="keyboard_arrow_up" color="primary">
				
			</q-btn>
			<!-- <q-btn round icon="add" color="primary" @click.native="nuevo" class="q-ml-xs"/> -->
			<q-space />
			<q-btn label="Nuevo" color="primary" @click="nuevo">
				<q-tooltip
					transition-show="rotate"
					transition-hide="rotate"
				>
					Nuevo slide
				</q-tooltip>
			</q-btn>

			<q-btn label="Guardar" color="primary" class="q-ml-sm" @click="guardar"/>
			<q-btn label="restore" type="reset" flat class="q-ml-sm text-primary" @click="reset"/>
		</q-toolbar>
		<input type="file" style="display:none;" @change="changeValueInput" name="myImage" accept=".png, .jpg, .jpeg" ref="inputFile"/>


	</q-page>	
</template>

<script>
	import editable from 'components/editable'
	import draggable from 'vuedraggable'
	export default{
		components:{
			editable,
			draggable,
		},
		data(){
			return{
				itemElegido:null,
				items:[],
				
				
			}
		},
		mounted(){
			this.getData()
		},
		methods:{
			nuevo(){
				this.items.push({
					id:new Date().valueOf(),
					titulo:'Nombre',
					subtitulo:'Descripcion',
					url:this.$store.state.corprotec.baseUrl,
					imagen:'blank.png',
					imagePath:'statics/blank.png',
					estado:'habilitado',
					orden:null,
				})
			},
			guardar(){
				const self =  this
				self.$q.loading.show()
				let sendFormData =  new FormData()
				this.items.forEach((item, index)=>{
					item.orden = index

					if(item.imageFile){//enviando imagenes.
						// if(item.id){
							sendFormData.append(`${item.id}`, item.imageFile)
						// }else{
						// 	sendFormData.append(`${Math.random()}`, item.imageFile)
						// }
					}
				})
				sendFormData.append('items', JSON.stringify(this.items))

				this.$axios({
					url: `${self.$store.state.corprotec.baseUrl}guardarData/slide`,
					method: 'post',
					data:sendFormData,
					// data: sendFormData,
					config: { headers: {'Content-Type': 'multipart/form-data' }}
				})
				.then(response =>{
					// your action after success
					// console.log(response)
					// self.getData()
					self.items = response.data
					self.$q.notify({
						message: 'Ok, Cambios Realizados.',
						position: 'top',
						icon:'thumb_up',
						color:'green-5'
					})
					self.$q.loading.hide()

				})
				.catch(error =>{
					// your action on error success
					self.$q.notify({
						message: error,
						position: 'top',
						icon:'warning',
						color:'red-5'
					})
					console.log(error)
				})
			},
			
			eliminar(item){
				const index = this.items.indexOf(item), self = this
				if(item.id>1000000){
					if(index > -1){
						self.items.splice(index, 1)
					}
				}else{
					self.$q.loading.show()
					self.$axios.get(`${self.$store.state.corprotec.baseUrl}slides/delData/${item.id}`)
					.then(r=>{
						console.log(r.data)
						self.$q.loading.hide()
						if(r.data.success){
							if(index > -1){
								self.items.splice(index, 1)
							}
							self.$q.notify({
								message: r.data.msg,
								position: 'top',
								icon:'thumb_up',
								color:'green'
							})
						}else{
							self.$q.dialog({
								dark: true,
								title: 'Alerta',
								message: r.data.msg,
								persistent: true
							}).onOk(()=>{
								console.log('ok')
							})
						}
					})
				}
			},	
			reset(){
				this.getData()

			},
			selectImagen(item, index){
				this.itemElegido = item
				this.itemElegido.index = index
				this.$refs.inputFile.click()
			},
			changeValueInput(){
				
			
				let file = this.$refs.inputFile.files[0]
				// this.itemElegido.nombre = "Cualquiercosa"
				// this.itemElegido.descripcion = "una descripcion"
				this.itemElegido.imagePath =  window.URL.createObjectURL(file)
				this.itemElegido.imageFile =  file
				// document.getElementById('img'+this.itemElegido.index).src = window.URL.createObjectURL(file)//ok para <img>

				//para<q-img> segundo tag ijo(es el div que contiene la imagen)
				document.getElementById('img-slide-'+this.itemElegido.index).childNodes[1].style.backgroundImage=`url(${window.URL.createObjectURL(file)})`
				this.$refs.inputFile.value = ''
				this.itemElegido = null

				// <img id="output" src="" width="100" height="100">

				// <input name="photo" type="file" accept="image/*" onchange="document.getElementById('output').src = window.URL.createObjectURL(this.files[0])">
				
				// reader.onload = (e)=> {
				// 	self.itemElegido.imageFile = self.$refs.inputFile.files[0]
				// 	self.itemElegido.imagePath = e.target.result
					
				// 	self.$refs.inputFile.value = ''
				// 	console.log(self.itemElegido)
				// }
				// if(file){
				// 	reader.readAsDataURL(file)
				// }
			
			},
			getData(){
				const self = this
				self.$q.loading.show()
				self.$axios.get(`${self.$store.state.corprotec.baseUrl}slides/getAllData`)
				.then(r=>{
					self.items = r.data
					// r.data.pop()
					self.items.forEach((item, index)=>{
						item.imagePath = `${self.$store.state.corprotec.baseUrl}public/img/bg-slider-main/${item.imagen}?t=${Math.random()}`
						self.$q.loading.hide()
					})
					// console.log(self.slides)
				})
			}
		}
	}
</script>
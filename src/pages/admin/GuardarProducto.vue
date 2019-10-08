<template>
	<q-page padding  class="q-my-none q-py-none">

			<q-breadcrumbs class="q-pa-xs text-grey-8" >
				<q-breadcrumbs-el icon="devices_other" label="Productos" to="/admin/productos" />
				<q-breadcrumbs-el :icon="$route.params.producto?'edit':'add'" class="active-breadcrumb" :label="$route.params.producto?'Editar Producto':'Nuevo Producto'" />
			</q-breadcrumbs>
			<q-separator color="primary" class="q-mb-sm"/>	

			<q-form
				ref="oneform"				
				@submit="onSave"
				@reset="onReset"
				class="q-mt-sm row q-card"
				style="margin-bottom: 55px;"
			>

			<div class="col-xs-12 col-sm-12 col-md-4 q-pa-md" align="left">
					
				<!-- url="http://localhost:4444/upload" multiple-->
		<!-- 		<q-uploader
					ref="uploader"
					dense
					flat
					bordered
					hide-upload-btn
					:max-file-size="7000000"
					label="Imagen"
					accept=".jpg,.png,image/*"
					class="full-width q-mb-md"
					@added="(files)=>imgFileSelected =  files[0]"
					@removed="(files)=>imgFileSelected =  null"
				/> -->
				<draggImg  ref="imgdragg" class="q-mb-md" :srcImg="form.imgs?`${$store.state.corprotec.baseUrl}public/img/img-products/${form.imgs}?time=${Math.random()}`:'statics/blank.png'" :anchoImg="250" ></draggImg>

				<q-input
					dense
					filled
					v-model="form.nombre"
					label="Nombre"
					lazy-rules
					type="text"
					:rules="[ val => val && val.length > 0 || 'Nombre es campo requerido']"
				/>

				<q-input
					dense
					filled
					v-model="form.precio"
					label="Precio(Bs.)"
					lazy-rules
					type="number"
					
					:rules="[ val => val && val.length > 0 || 'Precio es campo requerido']"
				/>

				<div class="row">
					<q-toggle v-model="form.estado" label="Habilitado" color="primary" class="col-6 q-mb-md"/>
					<q-toggle v-model="form.destacado" label="Destacado" color="primary" class="col-6 q-mb-md"/>
				</div>

				<q-select  
					dense 
					options-dense 
					filled v-model="form.idcategoria" 
					:options="categorias" 
					label="Categoria" 
					option-label="nombre" 
					option-value="id" 
					emit-value
					map-options
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Categoria es campo requerido']"
				/>

				<q-select  
					dense 
					options-dense 
					filled 
					v-model="form.idmarca" 
					:options="marcas" 
					label="Marca" 
					option-label="nombre" 
					option-value="id"
					emit-value
					map-options
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Marca es campo requerido']"
				/>
				<!-- {{form.categoria}} -->
			</div>
		

			<div class="col-xs-12 col-sm-12 col-md-8 q-pa-md">
					<label for="qeditor2" >Especificaciones</label>
					<q-editor
						id="qeditor2"
						ref="editor2"
						toolbar-flat
						v-model="form.especificaciones"
						:dense="$q.screen.lt.md"
						:toolbar="[
							[
								{
									label: $q.lang.editor.align,
									icon: $q.iconSet.editor.align,
									fixedLabel: true,
									list: 'only-icons',
									options: ['left', 'center', 'right', 'justify']
								},
								['plantillas']
							],
							['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
							['hr', 'link', 'custom_btn'],
							['print', 'fullscreen'],
							[
								{
									label: $q.lang.editor.formatting,
									icon: $q.iconSet.editor.formatting,
									list: 'no-icons',
									options: [
										'p',
										'h1',
										'h2',
										'h3',
										'h4',
										'h5',
										'h6',
										'code'
									]
								},
								{
									label: $q.lang.editor.fontSize,
									icon: $q.iconSet.editor.fontSize,
									fixedLabel: true,
									fixedIcon: true,
									list: 'no-icons',
									options: [
										'size-1',
										'size-2',
										'size-3',
										'size-4',
										'size-5',
										'size-6',
										'size-7'
									]
								},
								// {
								// 	label: $q.lang.editor.defaultFont,
								// 	icon: $q.iconSet.editor.font,
								// 	fixedIcon: true,
								// 	list: 'no-icons',
								// 	options: [
								// 		'default_font',
								// 		'arial',
								// 		'arial_black',
								// 		'comic_sans',
								// 		'courier_new',
								// 		'impact',
								// 		'lucida_grande',
								// 		'times_new_roman',
								// 		'verdana'
								// 	]
								// },
								'removeFormat'
							],
							['quote', 'unordered', 'ordered', 'outdent', 'indent'],

							['undo', 'redo']
						]"
						:fonts="{
							arial: 'Arial',
							arial_black: 'Arial Black',
							comic_sans: 'Comic Sans MS',
							courier_new: 'Courier New',
							impact: 'Impact',
							lucida_grande: 'Lucida Grande',
							times_new_roman: 'Times New Roman',
							verdana: 'Verdana'
						}"
					>
						<template v-slot:plantillas>
							<q-btn-dropdown
								dense no-caps
								ref="plantillas"
								no-wrap
								unelevated
								color="white"
								text-color="primary"
								label="Plantillas"
								size="sm"
							>
								<q-list dense>
									<q-item tag="label" clickable @click="add2('smartphone')">
										<q-item-section side>
											<q-icon name="smartphone" />
										</q-item-section>
										<q-item-section>Smartphone</q-item-section>
									</q-item>
									<q-item tag="label" clickable @click="add2('laptop')">
										<q-item-section side>
											<q-icon name="laptop" />
										</q-item-section>
										<q-item-section>Laptop</q-item-section>
									</q-item>
									<q-item tag="label" clickable @click="add2('tv')">
										<q-item-section side>
											<q-icon name="tv" />
										</q-item-section>
										<q-item-section>Tv</q-item-section>
									</q-item>
									<q-item tag="label" clickable @click="add2('printer')">
										<q-item-section side>
											<q-icon name="print" />
										</q-item-section>
										<q-item-section>Impresora</q-item-section>
									</q-item>
								</q-list>
							</q-btn-dropdown>
						</template>	

					</q-editor>
					
					<label for="qeditor">Descripcion</label>		
					<q-editor
						ref="editor1"
						id="qeditor"
						class="q-mb-md"
						toolbar-flat
						v-model="form.descripcion"
						:dense="$q.screen.lt.md"
						:toolbar="[
							[
								{
									label: $q.lang.editor.align,
									icon: $q.iconSet.editor.align,
									fixedLabel: true,
									list: 'only-icons',
									options: ['left', 'center', 'right', 'justify']
								},
								// ['token']
								
							],
							['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
							// ['token', 'hr', 'link', 'custom_btn'],
							['hr', 'link', 'custom_btn'],
							['print', 'fullscreen'],
							[
								{
									label: $q.lang.editor.formatting,
									icon: $q.iconSet.editor.formatting,
									list: 'no-icons',
									options: [
										'p',
										'h1',
										'h2',
										'h3',
										'h4',
										'h5',
										'h6',
										'code'
									]
								},
								{
									label: $q.lang.editor.fontSize,
									icon: $q.iconSet.editor.fontSize,
									fixedLabel: true,
									fixedIcon: true,
									list: 'no-icons',
									options: [
										'size-1',
										'size-2',
										'size-3',
										'size-4',
										'size-5',
										'size-6',
										'size-7'
									]
								},
								// {
								// 	label: $q.lang.editor.defaultFont,
								// 	icon: $q.iconSet.editor.font,
								// 	fixedIcon: true,
								// 	list: 'no-icons',
								// 	options: [
								// 		'default_font',
								// 		'arial',
								// 		'arial_black',
								// 		'comic_sans',
								// 		'courier_new',
								// 		'impact',
								// 		'lucida_grande',
								// 		'times_new_roman',
								// 		'verdana'
								// 	]
								// },
								'removeFormat'
							],
							['quote', 'unordered', 'ordered', 'outdent', 'indent'],

							['undo', 'redo']
						]"
						:fonts="{
							arial: 'Arial',
							arial_black: 'Arial Black',
							comic_sans: 'Comic Sans MS',
							courier_new: 'Courier New',
							impact: 'Impact',
							lucida_grande: 'Lucida Grande',
							times_new_roman: 'Times New Roman',
							verdana: 'Verdana'
						}"
					/>
					
				<!-- 	<div class="q-mt-xl">
						<q-btn label="Guardar" type="submit" color="primary"/>
						<q-btn label="Reset" type="reset" flat class="q-ml-sm" />
					</div> -->
			</div>
			 <q-toolbar  class="bg-grey-3 text-white q-my-none shadow-2 fixed-bottom">
			<!-- <q-btn flat round dense icon="menu"  /> -->

				<q-space />

				<q-btn round  icon="keyboard_arrow_up" color="primary"/>
				<q-space />
				<q-btn label="Guardar" type="submit" color="primary"/>
				<q-btn label="Reset" type="reset" flat class="q-ml-sm text-primary" />
			</q-toolbar>
		</q-form>
			
	</q-page>

	

</template>

<script>
import draggImg from 'components/dragg-img'

	export default{

		components:{
			draggImg,
		},

		data(){
			return{
				// imgFileSelected:null,
				fileImg:null,
				loading:false,
				form:{
					imgs:null,
					nombre:null,
					precio:null,
					idcategoria:null,
					idmarca:null,
					estado:true,
					destacado:true,
					descripcion:'',
					especificaciones:''
				},
				categorias:[],
				marcas:[],
			}
		},
		mounted(){
			this.onReset()
			// if(this.$route.params.producto){
			// 	this.form = this.$route.params.producto
			// 	this.form.estado = this.form.estado*1 == 1? true:false 
				// let files = []
				// files[0] = 'http://corprotec.com/public/img/img-products/thumb_225-1561992579.jpg'
				// this.$refs.uploader.addFiles(files)

		// ok
				// this.addImageProcess(`${this.$store.state.corprotec.baseUrl}public/img/img-products/thumb_${this.form.imgs}`)
				// .then(img=>{
				// 	console.log(img)
					
				// })

				// let files = [], self = this 
				// var request = new XMLHttpRequest();
				// request.open('GET', `${this.$store.state.corprotec.baseUrl}getImageProducto/${this.form.id}`, true);
				// request.responseType = 'blob';
				// request.onload = function() {
				//     var reader = new FileReader();
				//     reader.readAsDataURL(request.response);
				//     reader.onload =  function(e){
				//       // files[0] = e.target.result
				//       console.log('DataURL:', e);

				//       // var blob = new Blob(e.target.result);
				//       files[0]=new File([e.target.result], self.form.imgs, {type: 'Content-type:image/png', lastModified: Date.now()})
				//       self.$refs.uploader.addFiles(files)
				//       console.log(self.imgFileSelected)
				//     };
				// };
				// request.send();
				
			// }
			this.getCategoriasMarcas()
			
		},
		methods:{
//OK
			// addImageProcess(src){
			//   return new Promise((resolve, reject) => {
			//     let img = new Image()
			//     // img.onload = () => resolve(img.height)
			//     img.onload = () => resolve(img)
			//     img.onerror = reject
			//     img.src = src
			//   })
			// },


			add(name){
				const edit = this.$refs.editor1
				this.$refs.token.hide()
				edit.caret.restore()
				edit.runCmd('insertHTML', `&nbsp;<div class="editor_token row inline items-center" contenteditable="false">&nbsp;<span>${name}</span>&nbsp;<i class="q-icon material-icons cursor-pointer" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">close</i></div>&nbsp;`)
				edit.focus()
			},


			add2(name){
				let template
				const edit = this.$refs.editor2
				this.$refs.plantillas.hide()
				edit.caret.restore()
				const baseUrl =  this.$store.state.corprotec.baseUrl
				if( name=='smartphone'){
					template = `<ul class="list-espc-img">

						<li><img height="50" src="${baseUrl}public/img/iconos/camara.png"/><b> Cámara</b> pricipal: 13MP, frontal:5MP.</li>
						<li><img height="50" src="${baseUrl}public/img/iconos/dimensiones.png"/><b> Pantalla:</b> 5.71 Pulgadas.</li>
						<li><img height="50" src="${baseUrl}public/img/iconos/resolucion.png"/><b> Resolución:</b> HD (1440x720 Píxeles).</li>
						<li><img height="50" src="${baseUrl}public/img/iconos/memoria_interna.png"/><b> Interna:</b> 64 GB.</li>
						<li><img height="50" src="${baseUrl}public/img/iconos/ram.png"/><b> RAM:</b> 4 GB.</li>
						<li><img height="50" src="${baseUrl}public/img/iconos/cpu.png"/><b> Procesador:</b> Octa-Core Kirin 710 (4x2.2 GHz + 4x1.7 GHz) + micro procesador i7.</li>
						<li><img height="50" src="${baseUrl}public/img/iconos/bateria.png"/><b> Batería:</b> 3750 mAh.</li>
						<li><img height="50" src="${baseUrl}public/img/iconos/os.png"/><b> Sistema Operativo:</b> Android 9.0 + EMUI 9.0.</li>
						<li><img height="50" src="${baseUrl}public/img/iconos/sim.png"/><b> Sim:</b> Dual.</li>

					</ul>`
				}else if(name == 'laptop'){
					template=`<ul class="list-espc">
					<li><b>Microprocesador</b> Procesador Intel Core 2 Duo T5450 de 1,67 GHz con tecnología Intel Centrino</li>
					<li><b>Caché del microprocesador</b> 2 MB de caché de nivel 2</li>
					<li><b>Memoria</b> 3072 MB</li>
					<li><b>Memoria máx.</b> Hasta 4 GB</li>
					<li><b>Gráficos de vídeo</b> NVIDIA GeForce 8600M GS</li>
					<li><b>Memoria de video</b> Hasta 1791 MB (512MB dedicada)</li>
					<li><b>Disco duro</b> 320 GB ( 160GB + 160GB) (5400 rpm)</li>
					<li><b>Unidad multimedia</b> Blu-Ray ROM con DVD±R/RW SuperMulti de doble capa</li>
					<li><b>Disco duro</b> 320 GB ( 160GB + 160GB) (5400 rpm)</li>
					<li><b>Pantalla</b> Pantalla ancha de 17,0” WXGA de alta definición* con tecnología BrightView (1440 x 900)</li>
					<li><b>Fax/módem</b> Módem de 56 K de alta velocidad</li>
					<li><b>Tarjeta de red</b> LAN Ethernet 10/100BASE-T integrada</li>
					<li><b>Conectividad Inalámbrica</b> Conexión de red Intel PRO/inalámbrica 4965AGN</li>
					<li><b>Sonido</b> Altavoces Altec Lansing</li>
					<li><b>Teclado</b> Compatible de 101 teclas; Teclado del equipo portátil con barra de desplazamiento y teclado numérico integrado; 2 botones Quick Launch</li>
					<li><b>Dispositivo apuntador</b> Touch Pad con botón de activación/desactivación y zona de desplazamiento ascendente/descendente vertical exclusiva</li>
					<li><b>Ranuras para tarjetas PC</b> Una ranura ExpressCard/54 (también admite ExpressCard/34)</li>
					<li>
						<b>Puertos externos</b> 
						<ul >
							<li>	Lector de tarjetas integrado "5 en 1" para tarjetas Secure Digital, MultiMedia, Memory Stick, Memory Stick Pro o xD Picture</li>
							<li>4 Bus Serie Universal (USB) 2.0</li>
							<li>1 HDMI</li>
							<li>2 salidas de auriculares</li>
							<li>1 entrada de micrófono</li>
							<li>1 VGA (15 pines)</li>
							<li>1 salida de TV (S-video)</li>
							<li>1 RJ -11 (módem)</li>
							<li>1 RJ -45 (LAN)</li>
							<li>1 puerto de expansión 3 para equipo portátil</li>
							<li>1 puerto Firewire IEEE1394 (4 pines)</li>
							<li>1 receptor de infrarrojos</li>
						</ul>
					</li>
					<li><b>Dimensiones</b> 15,16 pulgadas (Largo) x 11,65 pulgadas (Ancho) x 1,57 pulgadas (Altura)</li>
					<li><b>Peso</b> 7,7lbs</li>
					<li><b>Alimentación eléctrica</b> Adaptador de alimentación de CA de 90 W</li>
					<li><b>Batería</b> Batería de ion de litio (Li-Ion) de 8 celdas</li>`
				}else if(name=='tv'){

					template=`<ul class="list-espc">
						<li><b>PANTALLA:</b> LED Tipo TN de 48" (También disponible en 39 y 55 pulgadas)</li>
						<li><b>RESOLUCIÓN:</b> 1080p</li>
						<li><b>3D:</b> NO</li>
						<li><b>SONIDO:</b> 2 x 10w + 1 Subwoofer 12w</li>
						<li><b>PUERTOS:</b> 3 x HDMI, 4 x USB 2.0, Euroconector, PCMCIA, Vídeo por componente, Salida óptica y Auricular</li>
						<li><b>CONEXIONES DE RED:</b> Ethernet y Wifi</li>
						<li><b>SISTEMA:</b> Android</li>
						<li><b>DIMENSIONES:</b> 76,9 x 123,9 x 26,1 cm</li>
						<li><b>PESO:</b> 24,9 kg</li>
						<li><b>EXTRAS:</b> Webcam y mando a distancia con teclado QWERTY integrado y opción de puntero para funciones de ratón</li>
					</ul>`

				}else if(name=='printer'){
					template = `<ul class="list-espc">
						<li><b>Tecnología de Impresión:</b> Epson Micropiezo punto variable Impresión a 4 colores (CMYK)</li>
						<li><b>Resolución Máxima de Impresión:</b> Hasta 5760 x 1440 dpi de resolución optimizada en varios tipos de papel</li>
						<li><b>Sistemas de Operación:</b> Windows® Vista/8/8.1/7/10 (32bit/64bit) Mac OS X 10.6.8 – Mac OS 10.13.x8</li>
						<li><b>Dimensiones:</b> Abierto: 375 x 578 x 253 mm, Cerrado: 375 x 347 x 179 mm</li>
						<li><b>Peso:</b> 3.9 Kg</li>
						<li><b>Tamaños de Papel:</b> 10 x 15 cm (4" x 6"), 13 x 18 cm (5" x 7"), 20 x 25 (8" x 10"), carta, oficio (21,6 x 35,6cm)
A4 (30 x 40 cm), B5, A5, A6, A3 (30 x 42 cm), A3+ (33 x 48 cm), informe, ejecutivo, media carta, definido por el usuario: (8,9 a 21,6 cm) x (8,9 a 111,7cm)</li>
						<li><b>Calidad de Copia:</b> 720 x 720 dpi</li>
						<li><b>Cantidad de Copias:</b> 1-20 copias (sin PC)</li>
						<li><b>Máximo Tamaño de Copia:</b> A4, carta</li>
					</ul>`
				}

				edit.runCmd('insertHTML', template)
				edit.focus()
			},

			getCategoriasMarcas(){
				const self = this
				this.$q.loading.show()

				this.$axios.all([
					self.$axios.get(`${self.$store.state.corprotec.baseUrl}categorias/getAllData`), 
					self.$axios.get(`${self.$store.state.corprotec.baseUrl}marcas/getAllData`)
				])
				.then(r=>{
					self.$q.loading.hide()
					console.log(r)
					self.categorias = r[0].data
					self.marcas = r[1].data


					// self.categorias.unshift({nombre:null, id:null})
					// self.marcas.unshift({nombre:null, id:null})
				})					
				.catch(r => {
					self.$q.loading.hide()
					self.$q.notify({
						message: 'Error En El Servidor.',
						position: 'bottom',
						icon:'warning',
						color:'negative'
					})
				})
			},
			save(sendFormData) {
				let self = this
				return self.$axios({
					method: 'post',
					url:`${self.$store.state.corprotec.baseUrl}productos/save`,
					data:sendFormData,
					config: { headers: {'Content-Type': 'multipart/form-data' }}
				})
				// return self.axios.post(`${self.baseUrl}productos/save`);
			},
			facebookScraple(idProducto){
				let self = this
				return self.$axios.post('https://graph.facebook.com', {
					id: "http://www.corprotec.com/detalles/" + idProducto,
					scrape: true,
					access_token:'411192392384570|Mf6ov9UT0FgvVEs7TB-Loiz8jHI'//obtenido de:  https://developers.facebook.com/tools/explorer/411192392384570
				})
			},
			onSave(){
				// console.log(this.$refs.imgdragg.getFileImg()) //ok 
				let sendFormData = new FormData(), self = this
				self.$q.loading.show()

				// if(this.$route.params.producto){ ya esta
				// 	sendFormData.append('id', this.$route.params.producto.id)
				// }
				let imgFile = this.$refs.imgdragg.getFileImg()
				if(imgFile){//si no es null
					sendFormData.append(imgFile.name, imgFile.value)
				}

				
			
				for(let key in this.form){
					if(key === 'estado'||key === 'destacado'){				//this.form[key] = true or false
						sendFormData.append(key, this.form[key]?1:0)
					}else{
						sendFormData.append(key, this.form[key])
					}
				}
				self.save(sendFormData).then(r=>{
					self.facebookScraple(r.data.id).then(r2=>{
						self.$q.loading.hide()
						if(r.data.producto.id){
							self.$refs.oneform.reset()//ejecuta onReset
							self.$q.notify({
								message: 'ok, Producto Creado',
								position: 'top',
								icon:'thumb_up',
								color:'positive'
							})
						}else{
							self.$router.push({ name:'Productos'})
							self.$q.notify({
								message: 'ok, Producto Editado',
								position: 'top',
								icon:'thumb_up',
								color:'positive'
							})
						}
					})
					.catch(error => {
						self.$q.loading.hide()
						self.$q.notify({
							message: error,
							position: 'top',
							icon:'warning',
							color:'red-5'
						})
					})
				})
				.catch(r => {
					self.$q.loading.hide()
					self.$q.notify({
						message: 'Error En El Servidor.',
						position: 'top',
						icon:'warning',
						color:'red-5'
					})
				})
		
			},
			onReset(){
				// this.imgFileSelected = null
				// this.onReset()
				const producto = this.$route.params.producto
				if(producto){
					for(let key in producto){
						this.form[key] = producto[key]
					} 
					this.form.estado = this.form.estado*1 == 1? true:false
					this.form.destacado = this.form.destacado*1 == 1? true:false
				}else{
					this.form = {
						imgs:null,
						nombre:null,
						precio:null,
						idcategoria:null,
						idmarca:null,
						estado:true,
						destacado:true,
						descripcion:'',
						especificaciones:''
					}
					// this.$refs.uploader.reset()
					this.$refs.imgdragg.reset()
				} 
			},
		}
	}
</script>
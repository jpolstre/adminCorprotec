<template>
	<div class="q-pa-none q-ma-none">
		<q-layout view="hHh Lpr lff">
				<q-header reveal elevated class="bg-white text-primary">
					<q-toolbar class="nav">
						<q-btn
							flat
							round
							icon="menu"
							@click="drawer = !drawer"
							class="q-mr-sm lt-md animate-pop"
						/>
						<!-- <q-separator dark vertical inset class="lt-md" /> -->
						<!-- <q-btn stretch flat label="Corprotec" class="animate-pop" /> -->

						<div class="fixed-top full-width bg-primary text-white gt-sm" style="height: 30px;line-height: 30px;" align="left">
							<q-btn round  flat size="sm" icon="fab fa-facebook"/>
							<q-btn round  flat size="sm" icon="fab fa-twitter" />
							<q-btn round  flat size="sm" icon="fab fa-whatsapp" class="q-mr-xl"/>
						</div>
						
						<div class="gt-sm q-pt-xl animate-pop full-width" v-if="swSearch" style="max-width: 53%;">
							<q-input :input-style="{ fontSize: '32px', color:'#777' }" outlined bottom-slots ref="inputSearch" v-model="textSearch" class="q-px-xs q-py-sm" @keydown.esc="onCloseSearch">
								<template v-slot:prepend>
								 <q-icon style="font-size: 32px;" name="search" />
								</template>
								<template v-slot:append>
								 <q-icon style="font-size: 32px;" name="close" class="cursor-pointer"   @click="onCloseSearch"/>
								</template>

							
							</q-input>


						
						</div>

						<div class="gt-sm q-pt-xl" v-else>
							<q-btn 
								stretch 
								flat 
								v-for="itemMenu in menuList" 
								:key="itemMenu.label" 
								:label="itemMenu.label" 
							
								:to="`${itemMenu.ruta}`"
							
								:icon="itemMenu.icono"	
								v-if="itemMenu.ruta" 	
							/>
							<q-btn  stretch flat :label="itemMenu.label" :icon="itemMenu.icono" v-else>
								<q-menu
									transition-show="scale"
									transition-hide="scale"
									fit anchor="bottom left" self="top left"
								>
									<div class="row justify-center q-py-xl">
									
										<q-btn 
											class="col-3 q-ma-xs"
											v-for="item in itemMenu.items"
											:key="item.label"
											color="primary" 
											text-color="grey-9"
											flat
											stretch
											:label="item.label" 
											:to="`${item.ruta}`" >
										</q-btn>
									</div>
								</q-menu>
							</q-btn>

							<q-btn 
								stretch 
								flat 
								label="Buscar" 
								@click="onClickSearch"
								icon="search"
							/>

						
						
						</div>
						<q-space />
						<div class="gt-sm" @mouseover="animar(-360)" @mouseleave="animar(360)">
							<img src="statics/rombo.png"  class="absolute el" style="top: 30px;right:  53px;" />
							<img src="statics/logo-min.png"  class="q-mx-lg" style="width: 150px; margin-top: 92px;"/>
							<!-- <img src="statics/logo.png"  class="q-mx-lg q-mb-sm" style="width: 150px; margin-top: 35px;"/> -->
						</div>
						
						<img src="statics/logo-min.png" class="q-ma-md lt-md" style="width: 150px;"/>
						
					</q-toolbar>
				</q-header>

				<q-drawer
					v-model="drawer"
					:width="300"
					:breakpoint="500"
					show-if-above
					bordered
					overlay
					content-class="bg-grey-2"
					behavior="mobile"
				>
				<q-scroll-area class="fit">
					<q-list>
						<div v-for="(menuItem, index) in menuList" :key="index">
							<q-item
								v-if="menuItem.ruta"
								clickable
								
								:to="`${menuItem.ruta}`"
							
								v-ripple
								>
								<q-item-section avatar>
									<q-icon :name="menuItem.icono" />
								</q-item-section>
								<q-item-section>
									<q-item-label>{{ menuItem.label }}</q-item-label>
								</q-item-section>
							</q-item>
							<!-- header-class="text-primary" -->
							<q-expansion-item
								v-else
								:icon="menuItem.icono"
								:label="menuItem.label"
								
								default-opened
							>
						<!-- 		<q-card>
									<q-card-section> -->
										<div v-for="subItem in menuItem.items" :key="subItem.label" class="bg-white">
											<q-item
												v-if="subItem.ruta"
												clickable
											
												:to="`${subItem.ruta}`"
												
												v-ripple
												class="q-pl-xl"
											>
												<q-item-section avatar>
													<q-icon :name="subItem.icono" />
												</q-item-section>
												<q-item-section>
													<q-item-label>{{ subItem.label }}</q-item-label>
												</q-item-section>
											</q-item>
										</div>
								<!-- 	</q-card-section>
								</q-card> -->
							</q-expansion-item>

							<q-separator />
						</div>

			

						<!-- <q-separator /> -->
					</q-list>
				</q-scroll-area>
			</q-drawer>

			<q-page-container class="bg-grey-1" id="frontend">
				 <!-- <transition
						appear
						enter-active-class="animated fadeIn"
						leave-active-class="animated fadeOut"
						@leave="resetScroll"
					> -->
				<transition
					appear
					enter-active-class="animated fadeIn"
					leave-active-class="animated fadeOut"
					
					@leave="resetScroll"
				>
				<!-- <q-scroll-area style="height: calc(100vh - 230px); max-width: 100%;"> -->
					<!-- <Flipper :flipKey="key" stagger="gentle"> -->
						 <router-view/>
					 <!-- </Flipper> -->

					<!-- </q-scroll-area> -->
				</transition>
			</q-page-container>
				<q-footer bordered class="text-white">
					
					<div class="row q-ma-xl">
						<div class="col-sm-12 col-md-6">
							<div>

								<div class="text-primary text-h5 q-my-xs">SOBRE NOSOTROS:</div>
								<P>
									Somos una empresa líder en tecnología multidisciplinaria con un personal especializado en tecnología de la información.
								</P>
								<p>
									<strong>Contactenos:</strong>

									Calle Campos entre 6 de Agosto y 20 de Octubre Edif. Artemis N° 367 Planta Baja Of. 4 Zona San Jorge Teléfono (2)2111393, La Paz - Bolivia
								</p>

							</div>
							<div class="q-mt-xs">
								<div class="text-subtitle1 text-primary">SIGUENOS EN:</div>
								<q-btn round  aria-label="facebook" flat size="xl" icon="fab fa-facebook"class="q-mr-md"/>
								<q-btn round  aria-label="twitter" flat size="xl" icon="fab fa-twitter" class="q-mr-md"/>
								<q-btn round  aria-label="whatsapp" flat size="xl" icon="fab fa-whatsapp" class="q-mr-md"/>
							</div>

						
						</div>


						<div class="col-sm-6 col-xs-6 col-md-3">
							<div class="text-white text-subtitle1 q-ml-xl">PRODUCTOS:</div>
							<ul>
								<li v-for="categoria in $store.state.corprotec.categorias" :key="categoria.id">
									<q-btn size="md" flat color="primary"  :to="`/products/categoria/${categoria.nombre}`">{{categoria.nombre}}</q-btn>
								</li>
							</ul>
						</div>
						<div class="col-sm-6 col-xs-6 col-md-3">
							<div class="text-white text-subtitle1 q-ml-xl">MARCAS:</div>
							<ul>
								<li v-for="marca in $store.state.corprotec.marcas" :key="marca.id">
									<q-btn size="md" flat color="primary"  :to="`/products/marca/${marca.nombre}`">{{marca.nombre}}</q-btn>
								</li>
							</ul>
						</div>
						
							
					
					</div>
					<q-btn size="xs" flat color="black" text-color="white">
						corprotec © 2019
					</q-btn>
				</q-footer>
				<q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]" >
					<q-btn fab glossy icon="keyboard_arrow_up" color="primary" class="animate-pop"  />
				</q-page-scroller>
		</q-layout>

		<div class="animate-pop scroll" style="padding-top:120px; width: 100%; height: 100%; background-color: white; position: fixed; top: 0; right: 0; z-index: 10" v-if="swSearch&&textSearch">
				<div class="row q-col-gutter-sm bg-white q-my-xl">
				<!-- 	<Flipper :flipKey="$route.path" stagger="gentle"> -->
						<div v-for="producto in filtrados" class="q-card q-ma-sm col-sm-6 col-xs-6 col-md-2 cursor-pointer animate-pop" @click="handleNavigate(producto)" align="center">
							<!-- <Flipped :flipId="`imagen_${producto.id}`"> -->
								<div class="text-center" style="max-width:200px; min-height: 200px;">
									<!-- ?t=${Math.random()} -->
									<img :src="`${$store.state.corprotec.baseUrl}public/img/img-products/${producto.imgs}`" style="max-width:120px;"/>
									<div>
										<!-- <Flipped :flipId="`nombre_${producto.id}`"> -->
											<div class="text-primary text-subtittle2 bg-transparent">{{producto.nombre}}</div>
										<!-- </Flipped> -->
									</div>

								</div>
							<!-- </Flipped> -->
							<div class="q-my-sm"></div>	
						</div>
					<!-- </Flipper> -->
					
				</div>

			
		</div>
	</div>
</template>
<script>
// import { Flipper } from "vue-flip-toolkit"
import anime from "animejs"
import { colors } from 'quasar'
// import { Flipped, Flipper } from "vue-flip-toolkit"

export default {
	name: "AdminLayout",
	// components: {
	// 	Flipped,
	// 	Flipper
	// },
	computed: {
		key() {
			return this.$route.path;
		}
	},
	data() {
		return {
			drawer: true,
			textSearch:'',
			swSearch:false
		
			
		}
	},
	created(){
		colors.setBrand("primary", '#00838F')
	},
	computed:{
		productos(){
			this.textSearch = ''
			
			return this.$store.state.corprotec.productos
		},
		filtrados(){
			return this.textSearch !== ''?this.productos.filter(p=>p.nombre.toLowerCase().indexOf(this.textSearch.toLowerCase())!=-1):this.productos
			
		},
		menuList(){
			// console.log(this.$store.state.corprotec.menuList)
			return this.$store.state.corprotec.menuList
		}
	
	},
	methods:{
		handleNavigate(producto) {
			this.$router.push(`/producto/${producto.id}/${producto.nombre.replace(/\s/g, '_')}`)
		},
		onCloseSearch(){
			this.textSearch = ''
			this.swSearch = false
		},
		onClickSearch(){
			this.swSearch = true
			// anime({
			// 	targets: '.input-search .inputa',
			// 	left: '240px',
			// 	backgroundColor: '#FFF',
			// 	borderRadius: ['0%', '50%'],
			// 	easing: 'easeInOutQuad'
			// })
			setTimeout(()=>{
				this.$refs.inputSearch.focus()
			},100)

		},
		animar(value){
			// this.animeIcon = anime({
			const animacion = anime({
				targets: '.el',
				// translateX: {
				//   value: 250,
				//   duration: 800
				// },
				// scale: {
				// 	value: 1,
				// 	duration: 1600,
				// 	delay: 800,
				// 	easing: 'easeInOutQuart'
				// },
				rotate: {
					value: value,
					duration:1300,
					easing: 'easeInOutSine'
				},
				// scale: {
				//   value: 1,
				//   duration: 1600,
				//   delay: 800,
				//   easing: 'easeInOutQuart'
				// },

			
				delay: 0 // All properties except 'scale' inherit 250ms delay
			})
			animacion.pause()
			animacion.play()
		},
		resetScroll(el, done) {
			document.documentElement.scrollTop = 0
			document.body.scrollTop = 0
			done()
		},
	}
};
</script>
<!-- <style lang="stylus">
.q-item--active
	background-color #d9d9d9
</style> -->

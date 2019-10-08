<template>
	<q-page id="main">
		<q-carousel
				swipeable
				animated
				arrows
				v-model="nslide"
				:fullscreen.sync="fullscreen"
				infinite
				autoplay
				height="33rem"

			>
				<q-carousel-slide v-for="slide, index in $store.state.corprotec.slides" :key="index" :name="index" :img-src="`${$store.state.corprotec.baseUrl}public/img/bg-slider-main/${slide.imagen}`" />
				<template v-slot:control>
					<q-carousel-control
						position="bottom-right"
						:offset="[18, 18]"
					>
						<q-btn
							push round dense color="white" text-color="primary"
							:icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
							@click="fullscreen = !fullscreen"
						/>
					</q-carousel-control>
				</template>
			</q-carousel>

		<!-- slider marcas-->


		<section id="marcas">

			<div align="center" class="q-mt-xl q-pt-xl text-uppercase">
				<div class="text-h4 text-grey-8">Marcas</div>
				<div class="text-subtitle1 text-grey-5">Nuestras Marcas</div>
			</div>

			<div @mouseover="swiperMarcas.autoplay.stop()" @mouseleave="swiperMarcas.autoplay.start()">
				<swiper :options="swiperOptionMarcas" ref="swiperM">
				<!-- slides -->
				<swiper-slide v-for="marca in $store.state.corprotec.marcas" :key="marca.id">
					
						<q-card class="q-my-md q-mr-sm q-ml-sm">
								<q-img :src="`${$store.state.corprotec.baseUrl}public/img/img-marcas/${marca.imagen}`" style="width: 100%; height: 230px;"/>
								<q-card-section align="center">
									<!-- <div class="text-h6">{{marca.nombre}}</div> -->
									<q-btn flat icon="open_in_new" color="grey-7" label="Ver Productos" :to="`/products/marca/${marca.nombre}`"/>
								</q-card-section>
							</q-card>
					
				</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
				
			</swiper>
	
			<!-- Controles -->
			<div class="flex flex-center">

				<q-btn round icon="keyboard_arrow_left" class="mswiper-button-prev q-mr-xs"/>
			<!-- 	<q-btn round :icon="swPlayMarca?'pause':'play_arrow'" @click="()=>{
					if(swPlayMarca){
						swiperMarcas.autoplay.stop()
					}else{
						swiperMarcas.autoplay.start()
					}
					swPlayMarca =!swPlayMarca
				}"/> -->
				<q-btn round icon="keyboard_arrow_right" class="mswiper-button-next q-ml-xs"/>
			</div>
		</div>
		</section>
		


				 
				 <div class="q-my-xl q-py-xl text-center">
					<q-btn
						color="primary"
						icon="important_devices"
						size="lg"
						label="Ver Todos Los Productos"
						:to="`/products`"
					/>
				 </div>
			 </q-parallax>



		<section id="hero" class="hero benefits is-dark is-shadowless is-clipped">
			<div class="background is-dark"></div>
			<div class="background is-primary is-primary-gradient"></div>
				<div class="hero-body">
				<div class="row">
						<div class=" col-md-5 col1 text-rigth">
							<h5 class="q-ma-none q-mb-md"><strong>Huawei </strong> <small>Más Intelienc<strong>IA</strong> Más poder</small></h5> 
							<ul>
								<li>
									<h5 class="q-ma-none"><q-icon name="fa fa-certificate" /> Productos Homologados</h5>
									<p class="text-subtitle1">Hasta 2 años de garantía.</p>
								</li>
								<li>
									<h5 class="q-ma-none"><i class="fas fa-money-bill-alt"></i> La mejor Relación calidad precio</h5>
									<p class="text-subtitle1">Compra un smartphone, con las características de un iPhone por menos de la mitad de su precio.</p>
								</li>
								<li>
									<h5 class="q-ma-none"><i class="fas fa-battery-full"></i> La Más Alta Fiabilidad</h5>
									<p class="text-subtitle1">Los móviles de Huawei destacan por su fácil interfaz y su eficacia.</p>
								</li>
							</ul>
						</div>
						<div class="col-md-7 text-left">
							<img src="statics/huawei-phone.png"/>
						</div>
					</div>
			</div>
		</section>

		<!-- slider destacados-->
		<section id="destacados" class="q-mb-xl">
			<div align="center" class="q-mt-xl q-pt-xl text-uppercase">
				<div class="text-h4 text-grey-8">Detacados</div>
				<div class="text-subtitle1 text-grey-5">Productos destacados</div>
			</div>
			
			<div @mouseover="swiperDestacados.autoplay.stop()" @mouseleave="swiperDestacados.autoplay.start()">

				<swiper :options="swiperOptionDestacados" ref="swiperD">
					<!-- slides -->
					<swiper-slide v-for="destacado in destacados" :key="destacado.id">
						
							<q-card class="q-my-md q-mr-sm q-ml-sm text-center" style="min-height: 400px;">
								
								<q-img :src="`${$store.state.corprotec.baseUrl}public/img/img-products/${destacado.imgs}`" style="width: 270px; height: 270px; min-height: 270px;"/>
							
								<q-card-section>
									<div class="text-subtitle1">{{destacado.nombre}}</div>
									<!-- :to="`/producto/${destacado.id}/${destacado.nombre.replace(/\s/g, '_')}`" -->
									<q-btn flat icon="open_in_new" color="grey-7" label="Ver Detalles" :to="`/producto/${destacado.id}/${destacado.nombre.replace(/\s/g, '_')}`" />
								</q-card-section>
							</q-card>
						
					</swiper-slide>
					
					<div class="swiper-scrollbar"></div>
					<!-- <div class="swiper-pagination" slot="pagination"></div> -->
				</swiper>
				<!-- Controles -->
				<div class="flex flex-center">
					<q-btn round icon="keyboard_arrow_left" class="dswiper-button-prev q-mr-xs"/>
<!-- 					<q-btn round :icon="swPlayDestacado?'pause':'play_arrow'" @click="()=>{
						if(swPlayDestacado){
							swiperDestacados.autoplay.stop()
						}else{
							swiperDestacados.autoplay.start()
						}
						swPlayDestacado =!swPlayDestacado
					}"/> -->
					<q-btn round icon="keyboard_arrow_right" class="dswiper-button-next q-ml-xs"/>
				</div>
			</div>
		</section>
	</q-page>
</template>

<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
	components: {
		 swiper,
		 swiperSlide,
	
	 },
	data(){
		return {
			swPlayMarca:true,
			swPlayDestacado:true,
			nslide: 0,
			fullscreen: false,
			
			swiperOptionMarcas:{
				// freeMode: true,
				speed:300,
				slidesPerView: 4,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				// spaceBetween: 15,
				// pagination: {
				// 	el: '.swiper-pagination',
				// 	clickable: true
				// },

				navigation: {
					nextEl: '.mswiper-button-next',
					prevEl: '.mswiper-button-prev',
					hideOnClick:true,
				},
				breakpoints: {
					1280: {
						slidesPerView:3,
						// spaceBetween: 20
					},
					// 768: {
					// 	slidesPerView: 2,
					// 	// spaceBetween: 20
					// },
					1024:{
						slidesPerView:2,

					},
					640: {
						slidesPerView: 1,
						// spaceBetween: 20
					},
					380: {
						slidesPerView: 1,
						// spaceBetween: 20
					}
				}
			},

			swiperOptionDestacados:{
				// freeMode: true,
				speed:300,
				slidesPerView: 4,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				// spaceBetween: 15,
				// pagination: {
				// 	el: '.swiper-pagination',
				// 	clickable: true
				// },

				navigation: {
					nextEl: '.dswiper-button-next',
					prevEl: '.dswiper-button-prev',
					hideOnClick:true,
				},
				breakpoints: {
					1280: {
						slidesPerView:3,
						// spaceBetween: 20
					},
					// 768: {
					// 	slidesPerView: 2,
					// 	// spaceBetween: 20
					// },
					1024:{
						slidesPerView:2,

					},
					640: {
						slidesPerView: 1,
						// spaceBetween: 20
					},
					380: {
						slidesPerView: 1,
						// spaceBetween: 20
					}
				}
			},

		}
	},
	mounted(){
		// this.getData()
		if(!this.swPlayMarca){
			this.swiperMarcas.autoplay.stop()
		}
	},
	computed: {
		destacados(){
			return this.$store.state.corprotec.productos.filter(p=>p.destacado==='1')
		},
		swiperMarcas(){
			return this.$refs.swiperM.swiper
		},
		swiperDestacados(){
			return this.$refs.swiperD.swiper
		}
	},
	// methods:{

	// 	handleNavigate(producto) {
	// 				// :to="`/producto/${destacado.id}/${destacado.nombre.replace(/\s/g, '_')}`" 
	// 		this.$router.push(`/producto/${producto.id}/${producto.nombre.replace(/\s/g, '_')}`)
	// 			  // this.$router.push(`/icons/${slug}`);
	// 	},


	// }
}
</script>


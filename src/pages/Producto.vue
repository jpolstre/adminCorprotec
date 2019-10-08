<template>
	<q-page padding>
		

		<!-- <div > -->

	<!-- 		<q-breadcrumbs class="q-pa-sm text-grey-8" >
				<q-breadcrumbs-el icon="home" label="Inicio" to="/" />
				<q-breadcrumbs-el icon="important_devices" label="Productos" to="/products"/>
				<q-breadcrumbs-el icon="copyright" :label="producto.nombremarca" :to="`/products/${producto.nombremarca}`"/>
				<q-breadcrumbs-el :label="producto.nombre" class="active-breadcrumb"/>
			</q-breadcrumbs> -->
			<!-- <q-separator color="primary" class="q-mb-md"/> -->
			<!-- <Flipped :inverseFlipId="flipId"> -->
				<q-btn size="sm" color="primary" class="text-uppercase q-mx-md q-mb-md animate-pop" icon="fas fa-long-arrow-alt-left" label="back" @click="goBack" />
				<q-separator color="primary" class="q-mb-md"/>
				<div class="flex row justify-between">
				 
					<div class="col-xs-12 col-sm-6 col-md-6">
						<div class="q-px-xl q-pt-xl q-pb-none">
							<Flipped :flipId="`imagen_${producto.id}`"          
								>
								 <div>
										<!-- ?t=${Math.random()} -->
										<img :src="`${$store.state.corprotec.baseUrl}public/img/img-products/${producto.imgs}`" class="full-width"  />
										<div>
											<!-- <div class="text-subtittle1">UN subtitulo</div> -->
										</div>
									</div>
							</Flipped>
							 
						 
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6">
						<div class="q-ma-md">
							<Flipped :flipId="`nombre_${producto.id}`">
								<h4 class="bg-transparent text-primary text-weight-bold q-ml-md ">{{producto.nombre}}</h4>

							</Flipped>
						
							<div v-html="producto.descripcion" class="q-ma-md"  v-show="swDetails"></div>
							<q-btn size="sm" color="primary" class="text-uppercase q-mb-md animate-pop" label="back" icon="fas fa-long-arrow-alt-left" @click="goBack" />
						</div>
					</div>
				</div>
			<!-- </Flipped> -->
		<!-- </div> -->
	</q-page>
</template>

<script>
import { Flipped } from "vue-flip-toolkit"
import anime from "animejs";
import iconData from "./icon-data";

const shuffle = ([...arr]) => {
	let m = arr.length;
	while (m) {
		const i = Math.floor(Math.random() * m--);
		[arr[m], arr[i]] = [arr[i], arr[m]];
	}
	return arr;
};

export default {
	name: "IconsDetail",
	components: {
		Flipped
	},
	data() {
		return {
			icons: Array(16),
			loaded: false,
			swDetails:true
		};
	},

	computed: {
		iconSet() {
			return iconData.find(set => set.slug === this.$route.params.set);
		},
		producto() {
			let items = this.$store.state.corprotec.productos.filter(p=> p.id==this.$route.params.id)
			return items[0]
		},
		fullIconSet() {
			const randomIcons = Array.from(Array(20), (x, index) => ({
				flipped: false,
				key: index.toString()
			}));
			return shuffle(this.iconSet.icons.concat(randomIcons));
		}
	},
	methods: {
		goBack(){
			this.swDetails=false
			this.$router.go(-1)
			// this.$router.push('/IconsHome')
		},
		handleComplete({ el, id }) {
			this.loaded = true;
			const nonFlippable = el.querySelectorAll(".icon:not(.flipped)");

			anime({
				targets: nonFlippable,
				opacity: [0, 1],
				duration: 3000,
				delay: anime.stagger(50)
			});
		},
		handleHeaderEnter(el, done) {
			anime({
				targets: el,
				easing: "linear",
				opacity: [0, 1],
				duration: 300,
				translateY: [10, 0],
				complete: function() {
					done();
				}
			});
		}
	}
};
</script>

<style scoped>


.header {
	min-height: 77px;
}

.icon {
	width: 64px;
	height: 64px;
}

.icon:not(.flipped) {
	opacity: 0;
}

.card-detail {
	position: fixed;
	width: 100%;
	height: 100%;
	background: white;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
}

.icon-grid {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-auto-rows: 64px;
	grid-gap: 24px;
	grid-auto-flow: dense;
}
</style>

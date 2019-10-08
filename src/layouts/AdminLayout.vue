<template>
	<div class="q-pa-none q-ma-none">
		<q-layout view="hHh Lpr lff">
			<q-header elevated class="bg-primary">
				<q-toolbar>
					<q-btn
						flat
						round
						dense
						icon="menu"
						@click="drawer = !drawer"
						class="q-mr-sm"
					/>
					<q-separator dark vertical inset />
					<q-btn stretch flat label="Admin" class="animate-pop" />
					<q-space />

					<q-btn-dropdown stretch flat :label="$store.state.corprotec.usuario.nombre" icon="person">
						<q-list>
							<!-- <q-item-label header>Folders</q-item-label> -->
							<q-item clickable v-close-popup tabindex="0">
								<q-item-section avatar>
									<q-avatar
										icon="account_box"
										color="primary"
										text-color="white"
									/>
								</q-item-section>
								<q-item-section>
									<q-item-label>Opciones</q-item-label>
								</q-item-section>
								<q-item-section side>
									<!-- <q-icon name="info" /> -->
								</q-item-section>
							</q-item>
							<!-- <q-separator inset spaced /> -->
							<q-item clickable v-close-popup tabindex="0" @click="salir">
								<q-item-section avatar>
									<q-avatar
										icon="exit_to_app"
										color="primary"
										text-color="white"
									/>
								</q-item-section>
								<q-item-section>
									<q-item-label>Salir</q-item-label>
								</q-item-section>
								<q-item-section side>
									<!-- <q-icon name="info" /> -->
								</q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</q-toolbar>
			</q-header>

			<q-drawer
				v-model="drawer"
				:width="200"
				:breakpoint="500"
				show-if-above
				bordered
				content-class="bg-grey-3"
			>
				<q-scroll-area class="fit">
					<q-list>
						<q-item-label header>Opciones</q-item-label>

						<q-item 
							clickable 
							v-for="item in menuList" 
							:key="item.label" 
							@click="goTo(item)"
							:active="item.label === activeItem" 
							active-class="bg-amber-8 text-grey-1"
						>
							<q-item-section avatar>
								<q-icon :name="item.icono" />
							</q-item-section>
							<q-item-section>
								<q-item-label>{{item.label}}</q-item-label>
								<!-- <q-item-label caption>quasar.dev</q-item-label> -->
							</q-item-section>
						</q-item>

						<q-item clickable tag="a" target="_blank" href="https://corprotec.com">
						  <q-item-section avatar>
						    <q-icon name="web" />
						  </q-item-section>
						  <q-item-section>
						    <q-item-label>Ir Al Sitio</q-item-label>
						    <q-item-label caption>corprotec.com</q-item-label>
						  </q-item-section>
						</q-item>

						<!-- <q-separator /> -->
					</q-list>
				</q-scroll-area>
			</q-drawer>

			<q-page-container>
				<!-- @leave="resetScroll"-->
				<transition
					enter-active-class="animated fadeIn"
					leave-active-class="animated fadeOut"
					mode="out-in"
					:duration="150"
				>
					<!-- <q-scroll-area style="height: calc(100vh - 230px); max-width: 100%;"> -->
					<router-view />

					<!-- </q-scroll-area> -->
				</transition>
			</q-page-container>
		</q-layout>
	</div>
</template>
<script>
const menuList = [
	{
		label:'Productos',
		icono:'devices_other',
		separator: true,
		vista:'Productos'
	},
	
	{
		label:'Categorias',
		icono:'important_devices',
		separator: true,
		vista:'Categorias'
	},
	{
		label:'Marcas',
		icono:'copyright',
		separator: true,
		vista:'Marcas'
	},
	{
		label:'Slide(Carousel)',
		icono:'slideshow',
		separator: true,
		vista:'Slides'
	}

]

export default {
	name: "AdminLayout",

	data() {
		return {
			drawer: true,
			menuList,
			activeItem: 'Productos'
		};
	},

	methods:{
		goTo(menuItem){
			this.activeItem = menuItem.label
			this.$router.push(`/admin/${menuItem.vista}`)
		},
		salir(){
			this.$q.dialog({
				dark: true,
				title: 'Confirmar salir',
				message: `Seguro Salir..?`,
				cancel: true,
				persistent: true
			}).onOk(()=>{
				this.$store.commit('corprotec/actualizarUsuario', {})
				this.$router.push('/admin')
			})
		}
	}
}
</script>
<!-- <style lang="stylus">
.q-item--active
	background-color #d9d9d9
</style> -->

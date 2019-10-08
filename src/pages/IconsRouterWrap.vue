<template>
	<div class="q-pa-none q-ma-none">
		<q-layout view="hHh Lpr lff">
			<q-header elevated class="row">
				<q-toolbar class="bg-primary text-white col-10">
					<q-btn
						flat
						round
						dense
						icon="menu"
						@click="drawer = !drawer"
						class="q-mr-sm animate-pop"
					/>
					<q-separator dark vertical  />
					<q-btn stretch flat :label="titulo" class="animate-pop" />
				
					

				<!-- 	<q-btn-dropdown stretch flat label="Jpolstre" icon="person">
					<q-list>
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
							</q-item-section>
						</q-item>
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
							</q-item-section>
						</q-item>
					</q-list>
				</q-btn-dropdown> -->
				</q-toolbar>
				<q-toolbar class="col-2 bg-white justify-center gt-sm">
					<!-- <q-space /> -->
					<router-link to="/"	class="gt-sm"><img src="statics/logo-min.png"   style="width: 150px;"/></router-link>
					<!-- <router-link to="/"	class="lt-md"><img src="statics/rombo.png" style="width: 45px;height:auto; margin:0;"/></router-link> -->
				</q-toolbar>
			</q-header>
			<!-- 	show-if-above
				overlay
				behavior="mobile" -->

				<q-drawer
					v-model="drawer"
					:width="250"
					:breakpoint="500"
					bordered
					content-class="bg-grey-2"
				>
				<q-scroll-area class="fit">
					<q-list dense>
						<div v-for="menuItem in menuList" :key="menuItem.label">
							<q-item
								:class="{'active-mitem': $route.params.nombre && $route.params.nombre.toUpperCase()==menuItem.label.toUpperCase()}"
								v-if="menuItem.ruta"
								clickable
								dense
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

								<q-expansion-item
								dense
									v-else
									:icon="menuItem.icono"
									:label="menuItem.label"
									default-opened
								>
							<!-- 		<q-card>
										<q-card-section> -->
											<div v-for="subItem in menuItem.items" :key="subItem.label" class="bg-white">
												<q-item
													clickable
													dense
													:to="`${subItem.ruta}`"
													:class="{ 'bg-primary text-white': subItem.label==titulo.toUpperCase()}"
													v-ripple
													class="q-pl-xl"
												>
													<!-- <q-item-section avatar>
														<q-icon :name="subItem.icono" />
													</q-item-section> -->
													<q-item-section>
														<q-item-label>{{ subItem.label }}</q-item-label>
													</q-item-section>
												</q-item>
											</div>
									<!-- 	</q-card-section>
									</q-card> -->
								</q-expansion-item>
							<!-- header-class="text-primary" -->
							<q-separator />
						</div>
						<!-- <q-separator /> -->
					</q-list>
				</q-scroll-area>
			</q-drawer>


			<q-page-container>
				<!-- @leave="resetScroll"-->
				<Flipper :flipKey="key" stagger="gentle">
					 <router-view/>
				 </Flipper>
			</q-page-container>
			<q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]" >
				<q-btn fab glossy icon="keyboard_arrow_up" color="primary" class="animate-pop"  />
			</q-page-scroller>

		
			<q-footer  class="text-white q-pa-md">
				
				<div class="row q-ma-lg">
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
							<q-btn round  flat size="xl" icon="fab fa-facebook"class="q-mr-md"/>
							<q-btn round  flat size="xl" icon="fab fa-twitter" class="q-mr-md"/>
							<q-btn round  flat size="xl" icon="fab fa-whatsapp" class="q-mr-md"/>
						</div>

					
					</div>


					<div class="col-xs-6 col-sm-6 col-md-3">
						<div class="text-white text-subtitle1 q-ml-xl">PRODUCTOS:</div>
						<ul>
							<li v-for="categoria in $store.state.corprotec.categorias" :key="categoria.id">
								<q-btn size="md" flat color="primary"  :to="`/products/categoria/${categoria.nombre}`">{{categoria.nombre}}</q-btn>
							</li>
						</ul>
					</div>
					<div class="col-xs-6  col-sm-6 col-md-3">
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
		</q-layout>
	</div>
</template>
<script>
import { Flipper } from "vue-flip-toolkit"

export default {
	name: "IconsRouterWrap",
	components: {
		Flipper
	},
	data() {
		return {
			drawer: true,
			
		};
	},
	computed: {
		titulo(){
			return this.$route.params.nombre||this.$route.params.name||'TODOS LOS PRODUCTOS'
		},
		menuList(){
			console.log(this.$store.state.corprotec.menuList)
			return this.$store.state.corprotec.menuList
		},
		key() {
			return this.$route.path
		}
	},
	methods:{
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


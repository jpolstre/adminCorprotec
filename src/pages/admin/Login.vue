<template>
	<div class="index-page bg-grey-2 window-height window-width column items-center no-wrap">
		<!-- flex flex-center -->
		<div class="banner items-center bg-primary">
			<h1 class="text-white">Corprotec</h1>
			<!-- <img class="q-mb-xl" src="statics/logo.png" > -->

		</div>
			 <transition
					appear
					enter-active-class="animated fadeIn"
					leave-active-class="animated fadeOut"
				>
			<form class="card bg-white shadow-4 column no-wrap flex-center group relative-position" autocomplete="off"  @submit.prevent.stop="onSubmit">
				<!-- <img src="~assets/quasar-logo-full.svg"> -->
				<h5 class="text-primary q-mt-xs q-mb-xs">Iniciar Sesión</h5>
				<!-- inverted -->
				<q-input
					ref="nombre"
					class="full-width"
					:autocomplete="'new-user'"
					v-model.trim="form.nombre" 
					label="Nombre"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Nombre es Requerido']"
				/>
				<q-input
					ref="password"
					class="full-width"
					:autocomplete="'new-pass'"
					v-model.trim="form.clave" 
					label="Password"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Password es Requerido']"
					:type="isPwd ? 'password' : 'text'"
				>
					<template v-slot:append>
						<q-icon
							:name="isPwd ? 'visibility_off' : 'visibility'"
							class="cursor-pointer"
							@click.native="isPwd = !isPwd"
						/>
					 </template>
				</q-input>
				<q-toggle v-model="passRemember" color="secondary" class="full-width q-mt-sm"  label="Recordar Sesión" />
				<q-btn
					type="submit"
					color="primary"
					class="full-width q-mt-lg"
					icon="launch"
					wait-for-ripple
					label="Ingresar"
				/>
				<q-inner-loading :showing="visibleLoading">
					<q-spinner-gears size="50px" color="primary" />
				</q-inner-loading>
			</form>
			</transition>
	</div>
</template>

<script>
// import { openURL, Platform } from 'quasar'

// import { Notify } from 'quasar'
export default {
	data(){
		return{
			isPwd: true,
			passRemember:true,
			visibleLoading: false,
			form:{
				nombre:'',
				clave:''
			}
		}
	},
	mounted(){
		if(this.$store.state.corprotec.rememberLogin.name !== ''){
			this.form.nombre = this.$store.state.corprotec.rememberLogin.name
			this.form.clave = this.$store.state.corprotec.rememberLogin.pass
			this.passRemember = true
			// if(Platform.is.mobile && this.$store.state.corprotec.rememberLogin.tipo === 'cliente'){
			// 	setTimeout(()=>{
			// 		this.onSubmit()	
			// 	}, 500)
			// }
		}else{
			this.form.nombre = ''
			this.form.clave = ''
			this.passRemember = false 
		}
	},
	methods: {
		onSubmit() {
			this.$refs.nombre.validate()
			this.$refs.password.validate()
			if (this.$refs.nombre.hasError || this.$refs.password.hasError) {
				this.formHasError = true
			}else{
				// this.$q.notify({
				// 	icon: 'done',
				// 	color: 'positive',
				// 	message: 'Submitted'
				// })
				// loguin servidor
				this.visibleLoading = true
				let this_ = this//mucho cudado no utilisar sel ya que puede sobreescriirse y es utilizado en el framework.
				let bodyFormData = new FormData()
				bodyFormData.set('nombre', this_.form.nombre)
				bodyFormData.set('password', this_.form.clave)
				// let respServidor = {usuario:{nombre:'marcelo', autorizacion:false}}
				this.$axios({
					method: 'post',
					url:`${this_.$store.state.corprotec.baseUrl}usuario/autorizacion`,
					data:bodyFormData,
					config: { headers: {'Content-Type': 'multipart/form-data' }}
				})
				.then((response)=> {
					// console.log(response.data)
					this_.visibleLoading = false
					this_.$q.notify(response.data.notify)

					if(response.data.notify.type !== 'negative'){
						this_.$store.commit('corprotec/actualizarUsuario', response.data)
						

						if(this_.passRemember){
							this_.$store.commit('corprotec/setRememberLogin', {name:this_.form.nombre, pass:this_.form.clave, tipo:response.data.tipoUsuario})
						}else{
							this_.$store.commit('corprotec/setRememberLogin', {name:'', pass:'', tipo:''})
						}
						this_.$router.push('/admin/productos')
					}
					
				})
				.catch((error)=> {
					// console.log(error);
					this_.visibleLoading = false
					this_.$q.notify({
						message: 'Error En El Servidor.',
						position: 'top',
						icon:'warning',
						color:'negative'
					})
				})
			}
		},
	}
}
</script>

<style lang="stylus">
@-webkit-keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@-moz-keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@keyframes animStar {
	from {
		transform: translateY(0px);
	}
	to {
		transform: translateY(-2000px);
	}
}
@import 'quasar.variables'

.index-page
	@media only screen and (max-width: 1244px)
		.banner
			h1
				font-size 8rem!important
				line-height 8rem!important
				font-weight 500!important
				// letter-spacing 8px!important
				
	@media only screen and (max-width: 1024px)
		.banner
			h1
				font-size 5rem!important
				line-height 5rem!important
				font-weight 500!important
				// letter-spacing 5px!important
				
	@media only screen and (max-width: 560px)
		.banner
			h1
				font-size 4rem!important
				line-height 4rem!important
				font-weight 500!important
				// letter-spacing 3px!important
				

	.banner
		text-align center
		height 65vh
		width 100%
		font-size 20vmax
		// color rgba(255, 255, 255, .2)
			
		background: linear-gradient(-45deg,  rgba($secondary, 0.5), $secondary);
		background-size: 400% 400%;
		-webkit-animation: Gradient 15s ease infinite;
		-moz-animation: Gradient 15s ease infinite;
		animation: Gradient 15s ease infinite;
		overflow hidden	
		
		h1
			font-size 9rem
			line-height 9rem
			font-weight 500
			// letter-spacing 23px
	
	.card
		width 80vw
		max-width 500px
		padding 5px 20px
		margin-top -142px
		border-radius 2px
		img
			height 140px
			width 140px

.ribbon
	width 14.1em
	height 14.1em
	position absolute
	overflow hidden
	top 0
	right 0
	z-index 39
	pointer-events none
	font-size 15px
	text-decoration none
	text-indent -999999px
	opacity 0.7
	&.fixed
		position fixed
	&:before
		content ''
		padding .38em 0
		background-color white
		background-image linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .15))
		box-shadow 0 .15em .23em 0 rgba(0, 0, 0, .5)
		pointer-events auto
	&:after
		content attr(title)
		color #027be3
		line-height 1.54em
		text-decoration none
		text-align center
		text-indent 0
		padding .15em 0
		margin .15em 0

	&:before, &:after
		position absolute
		display block
		width 23.38em
		height 1.74em
		top 4.8em
		right -5.8em
		transform rotate(45deg)
form.card
	h4
		margin 10px 0!important
		text-transform uppercase
</style>

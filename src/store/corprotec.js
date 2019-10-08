export default {
  namespaced: true,
  state: {
    baseUrl: "https://corprotec.com/",
    // baseUrl:'http://localhost:3000/dist/',
    rememberLogin: { name: "", pass: "", tipo: "" },
    usuario: {
      nombre: null,
      perfil: {
        modulos: []
      }, //'administrador',
      id: null,
      autorizacion: false,
      imagen: false
    }, //usuario logueado

    swLoad: true,

    productos: [],
    categorias: [],
    marcas: [],
    slides: [],
    menuList: [
      {
        label: "INICIO",
        icono: "home",
        ruta: "/"
      },
      {
        label: "CATEGORIAS",
        icono: "important_devices",
        items: []
      },
      {
        label: "MARCAS",
        icono: "copyright",
        items: []
      },
      {
        label: "SERVICIOS",
        icono: "settings",
        ruta: "/servicios"
      },
      {
        label: "CONTACTO",
        icono: "place",
        ruta: "/contacto"
      }
    ],

    iconSel: "fas fa-th"
  },

  mutations: {
    setIconSel(state, value) {
      state.iconSel = value;
    },
    setSwLoad(state, value) {
      state.swLoad = value;
    },
    setData(state, valor) {
      //set from axios.
      state.productos = valor.productos;
      state.categorias = valor.categorias;
      state.marcas = valor.marcas;
      state.slides = valor.slides;

      state.menuList[1].items = valor.categorias.map(c => {
        return {
          label: c.nombre.toUpperCase(),
          icono: "ondemand_video",
          ruta: `/products/categoria/${c.nombre}`
        };
      });

      state.menuList[2].items = valor.marcas.map(m => {
        return {
          label: m.nombre.toUpperCase(),
          icono: "ondemand_video",
          ruta: `/products/marca/${m.nombre}`
        };
      });

      // state.menuList[1].items.unshift({
      // 	label:'TODOS LOS PRODUCTOS',
      // 	icono:'ondemand_video',
      // 	ruta:`/products`
      // })

      // for(let i = 0; i < valor.productos.length; i++){
      // 	for(let j = 0; j < valor.marcas.length; j++){
      // 		let obj = {
      // 			label:valor.marcas[j].nombre.toUpperCase(),
      // 			icono:'ondemand_video',
      // 			ruta:`/products/${valor.marcas[j].nombre}`
      // 		}
      // 		if(valor.marcas[j].nombre === valor.productos[i].nombremarca && state.marcas.indexOf(obj)!==-1){
      // 			state.marcas.push(obj)
      // 			break;
      // 		}
      // 	}

      // 	for(let k = 0; k < valor.categorias.length; k++){
      // 		let obj2 = {
      // 			label:valor.categorias[k].nombre.toUpperCase(),
      // 			icono:'ondemand_video',
      // 			ruta:`/products/${valor.categorias[k].nombre}`
      // 		}
      // 		if(valor.categorias[k].nombre === valor.productos[i].nombrecategoria && state.categorias.indexOf(obj2)!==-1){
      // 			state.categorias.push(obj2)
      // 			break;
      // 		}
      // 	}
      // }
    },
    setRememberLogin(state, valor) {
      state.rememberLogin = valor;
    },
    actualizarUsuario(state, usuario) {
      state.usuario = usuario;
    }
  }
};

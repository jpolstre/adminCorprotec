import store from 'src/store'

const routes = [
  // {
  //   path: "/",
  //   component: () => import("layouts/AdminLayout.vue"),
  //   children: [{ path: "", component: () => import("pages/admin/Index.vue") }]
  // }

  /*FRONTEND*/
  {
    path: '/',
    component: () => import('layouts/FrontLayout.vue'),
    children: [
      { path: '', name: 'Index', component: () => import('pages/Index.vue') }
    ]
  },

  // {
  //   path: '/producto/:id/:name',
  //   component: () => import('layouts/FrontLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Producto',
  //       component: () => import('pages/Producto.vue')
  //     }
  //   ]
  // },

  {
    path: '/products/:catemarca?/:nombre?',
    component: () => import('pages/IconsRouterWrap'),
    children: [
      { path: '', name: 'Products', component: () => import('pages/Products') }
    ]
  },

  {
    path: '/producto/:id/:name',
    component: () => import('pages/IconsRouterWrap'),
    children: [
      { path: '', name: 'Producto', component: () => import('pages/Producto') }
    ]
  },

  /*BACKEND*/
  // {
  //   path: '/',
  //   component: () => import('pages/admin/Login.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Login',
  //       component: () => import('pages/admin/Login.vue')
  //     }
  //   ],
  //   //que este logueado primero.
  //   beforeEnter: (to, from, next) => {
  //     store.state.corprotec.usuario.autorizacion = false
  //     store.commit('corprotec/actualizarUsuario', store.state.corprotec.usuario)
  //     next()
  //   }
  // },
  {
    path: '/admin',
    component: () => import('pages/admin/Login.vue'),
    children: [
      {
        path: '',
        name: 'Login2',
        component: () => import('pages/admin/Login.vue')
      }
    ],
    //que este logueado primero.
    beforeEnter: (to, from, next) => {
      store.state.corprotec.usuario.autorizacion = false
      store.commit('corprotec/actualizarUsuario', store.state.corprotec.usuario)
      next()
    }
  },
  {
    path: '/admin/productos',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'Productos',
        component: () => import('pages/admin/Productos.vue')
      }
    ],
    //que este logueado primero.
    beforeEnter: (to, from, next) => {
      if (!store.state.corprotec.usuario.autorizacion) {
        next({ path: '/admin' }) //a login
      } else {
        next()
      }
    }
  },
  {
    path: '/admin/categorias',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'Categorias',
        component: () => import('pages/admin/Categorias.vue')
      }
    ],
    //que este logueado primero.
    beforeEnter: (to, from, next) => {
      if (!store.state.corprotec.usuario.autorizacion) {
        next({ path: '/admin' }) //a login
      } else {
        next()
      }
    }
  },
  {
    path: '/admin/marcas',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'Marcas',
        component: () => import('pages/admin/Marcas.vue')
      }
    ],
    //que este logueado primero.
    beforeEnter: (to, from, next) => {
      if (!store.state.corprotec.usuario.autorizacion) {
        next({ path: '/admin' }) //a login
      } else {
        next()
      }
    }
  },
  {
    path: '/admin/slides',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'Slides',
        component: () => import('pages/admin/Slides.vue')
      }
    ],
    //que este logueado primero.
    beforeEnter: (to, from, next) => {
      if (!store.state.corprotec.usuario.autorizacion) {
        next({ path: '/admin' }) //a login
      } else {
        next()
      }
    }
  },
  {
    path: '/admin/guardar_producto',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'GuardarProducto',
        component: () => import('pages/admin/GuardarProducto.vue')
      }
    ],
    //que este logueado primero.
    beforeEnter: (to, from, next) => {
      if (!store.state.corprotec.usuario.autorizacion) {
        next({ path: '/admin' }) //a login
      } else {
        next()
      }
    }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

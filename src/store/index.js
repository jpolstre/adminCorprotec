import Vue from 'vue'
import Vuex from 'vuex'

import corprotec from './corprotec'

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const store = new Vuex.Store({
	plugins: [createPersistedState()],
  modules: {
    corprotec
  }
})

export default store
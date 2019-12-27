// src/store/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { FeathersVuex } from 'feathers-vuex'
import auth from './store.auth'

Vue.use(Vuex)
Vue.use(FeathersVuex)

// Require the entire folder of service plugins with Webpack
const requireModule = require.context('./services', false, /.js$/)
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

// Or you can import them manually for Rollup, etc.
//import users from './services/users'

export default new Vuex.Store({
  state: {
    activeListCreateCard: '',
  },
  getters: {},
  mutations: {
    SET_ACTIVE_LIST_CREATE_CARD(state, listId) {
      const currentState = state;
      currentState.activeListCreateCard = listId;
    },
  },
  actions: {
    setActiveListCreateCard(context, listId) {
      context.commit('SET_ACTIVE_LIST_CREATE_CARD', listId);
    },
  },
  plugins: [
    ...servicePlugins, // if you're using require.context, spread the plugins into the array.
    //users, // if you're manually importing, just add the plugins into the array, like this
    auth
  ]
})
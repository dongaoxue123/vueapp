import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    id: 0,
    name: '',
    adminId: 0,
    userId: ''
  },
  mutations: {
    calcOrderSum: (state, id) => {
      state.id = id
    },
    blockName: (state, name) => {
      state.name = name
    },
    tieziId: (state, adminId) => {
      state.adminId = adminId
    },
    login: (state, userId) => {
      state.userId = userId
      console.log(state.userId)
    }
  }
})
export default store
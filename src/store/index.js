import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count += 1
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    },
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  },
  actions: {
    addCart({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = state.cartList.find(item => {
          return item.iid === payload.iid
        })
        if (oldProduct) {
          commit('addCounter', oldProduct)
          resolve("商品数量+1")
        } else {
          payload.count = 1
          commit('addToCart', payload)
          resolve("已添加商品")
        }
      })
    }
  }
})

export default store
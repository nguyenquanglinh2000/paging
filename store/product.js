import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

export const state = () => ({
  listProduct: [],
  pagingData: []
})

export const actions = {
  async addProduct ({ $route }, payload) {
    await addDoc(collection(db, 'product'), {
      payload
    })
    // $route.push('/table/createProduct')
  },
  async getProduct ({ commit, state }) {
    const list = await getDocs(collection(db, 'product'))
    const temp = []
    list.forEach((doc) => {
      temp.push(doc.data().payload)
    })
    commit('UPDATE_DATA', temp)
  },
  getDataPaging ({ commit, state }, payload) {
    const temp = []
    const length = state.listProduct.length
    const indexStart = payload * 12 - 12
    let indexEnd = payload * 12
    if (payload * 12 > length) {
      indexEnd = length
    } else {
      indexEnd = payload * 12
    }
    for (let i = indexStart; i < indexEnd; i++) {
      temp.push(state.listProduct[i])
    }

    commit('UPDATA_PAGING', temp)
  }
}

export const mutations = {
  UPDATE_DATA (state, payload) {
    state.listProduct = payload
  },
  UPDATA_PAGING (state, payload) {
    state.pagingData = payload
  }
}

export const getters = {
}

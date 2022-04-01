// eslint-disable-next-line no-unused-vars
import { collection, addDoc, getDocs, query, orderBy, limit, endBefore, limitToLast, startAt } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/plugins/firebase'

export const state = () => ({
  listProduct: [],
  pagingData: [],
  url: '',
  maxPaging: 1
})

export const actions = {
  async addProduct ({ dispatch, state }, payload) {
    await addDoc(collection(db, 'product'), {
      ...payload
    })
    // $route.push('/table/createProduct')
  },
  async getProduct ({ commit, dispatch }, payload) {
    try {
      const list = await getDocs(collection(db, 'product'))
      const temp = []
      list.forEach((doc) => {
        temp.push(doc.data().payload)
      })
      commit('UPDATE_DATA', temp)
      dispatch('getDataPaging', payload)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error: ', error)
    }
  },
  async maxPaging ({ commit }, payload) {
    const maxPaging = await getDocs(query(collection(db, 'product'), orderBy('name')))
    const maxpage = Math.floor(maxPaging.docs.length / payload + 1)
    commit('UPDATE_MAXPAGE', maxpage)
  },
  async getDataPaging ({ commit, dispatch }, payload) {
    const limiter = 5
    dispatch('maxPaging', limiter)
    const startLimitPage = payload * limiter - limiter
    const queryStart = await getDocs(query(collection(db, 'product'), orderBy('name')))
    let valueStart = ''
    let count = 0
    queryStart.forEach((doc) => {
      if (count === startLimitPage) {
        valueStart = doc.data().name
      }
      count++
    })
    const documentSnapshots = await getDocs(query(collection(db, 'product'), orderBy('name'), startAt(valueStart), limit(limiter)))
    const arr = []
    documentSnapshots.forEach((doc) => {
      arr.push(doc.data())
    })
    console.log('UPdata')
    commit('UPDATA_PAGING', arr)
  },
  // async nextPage ({ commit, state }, payload) {
  //   const arr = []
  //   const last = state.pagingData[state.pagingData.length - 1].name
  //   const next = query(collection(db, 'product'), orderBy('name'), startAfter(last), limit(2))
  //   const documentSnapshots = await getDocs(next)
  //   documentSnapshots.forEach((doc) => {
  //     arr.push(doc.data())
  //   })
  //   commit('UPDATA_PAGING', arr)
  // },
  // async previousPage ({ commit, state }, payload) {
  //   const arr = []
  //   const first = state.pagingData[0].name
  //   const next = query(collection(db, 'product'), orderBy('name'), endBefore(first), limitToLast(3))
  //   const documentSnapshots = await getDocs(next)
  //   documentSnapshots.forEach((doc) => {
  //     arr.push(doc.data())
  //   })
  //   commit('UPDATA_PAGING', arr)
  // },
  upLoadImage ({ commit }, payload) {
    const metadata = {
      contentType: 'image/jpeg'
    }
    const storageRef = ref(storage, 'images/' + payload.name)
    const uploadTask = uploadBytesResumable(storageRef, payload, metadata)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break
          case 'storage/canceled':
            // User canceled the upload
            break

            // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          commit('UPDATE_URL_IMAGE', downloadURL)
        })
      }
    )
  },
  clearUrl ({ commit }) {
    commit('CLEAR_URL')
  }
}

export const mutations = {
  UPDATE_DATA (state, payload) {
    state.listProduct = payload
  },
  UPDATA_PAGING (state, payload) {
    state.pagingData = payload
  },
  UPDATE_URL_IMAGE (state, payload) {
    state.url = payload
  },
  CLEAR_URL (state) {
    state.url = ''
  },
  UPDATE_MAXPAGE (state, payload) {
    state.maxPaging = payload
  }
}

export const getters = {
  numPaging (state) {
    return state.listProduct.length
  }
}

import {createStore} from 'vuex'
export default {
  state: () => {
    return {
      apiPrefix: '/fields',

      fields: [],

      page: 0,
      count: 5,

      totalPages: 0,
      totalElements: 0,
      elementsOnPage: 0

    }
  },
  mutations: {
    updateFields(state, newFields) {
      state.fields = newFields
    },
    updatePagination(state, json) {
      state.totalPages = json.totalPages;
      state.totalElements = json.totalElements;
      state.elementsOnPage = json.numberOfElements;
    }
  },

  actions: {
    async fetchFields({commit, state, rootGetters}, {page, count}) {
      const res = await fetch(
        rootGetters.apiUrl(state.apiPrefix),
        rootGetters.fetchInit('get', { page, count } )
      )
      const json = await res.json()

      commit('updateFields', json.content)
      commit('updatePagination', json)
    },
  },
}
export default {
  state: () => {
    return {
      apiPrefix: '/questionnaire',

      isQuestionnairesReady: false,
      questionnaires: [],

      current: {id: -1}

    }
  },
  mutations: {
    updateQuestionnaires(state, questionnaires) {
      console.log("init questionnaires")
      state.isQuestionnairesReady = true;
      state.questionnaires = questionnaires;
      //state.current = state.questionnaires.length ? state.questionnaires[0] : {id:-1};
    },
    addQuestionnaire(state, questionnaire) {
      state.questionnaires.push(questionnaire);
    },
    updateQuestionnaire(state, questionnaire) {
      let toUpdate = state.questionnaires.find(q => q.id === questionnaire.id);

      Object.assign(toUpdate, questionnaire);
      //toUpdate.name = questionnaire.name;
      //toUpdate.description = questionnaire.description;
    },
    deleteQuestionnaireByIndex(state, index) {
      state.questionnaires.splice(index, 1);
    },
    updateCurrentQuestionnaire(state, id) {
      console.log("changing currentQuestionnaireId questionnaire to " + id)
      let q = state.questionnaires.find(q => parseInt(q.id) === id);
      if(q)  {
        state.current = q;
      } else {
        state.current = {id: -1};
      }
    },
    updateCurrentQuestionnaireByIndex(state, index) {
      let  q = state.questionnaires.at(index);
      if(q)  {
        state.current = q;
      } else {
        state.current = {id: -1};
      }

    },
  },
  getters: {
    allOwnQuestionnaires(state) {
      return state.questionnaires;
    },
    currentQuestionnaire(state, getters) {
      return state.current;
    },
    currentQuestionnaireId(state) {
      return state.current.id;
    },
    isQuestionnairesReady(state) {
      return state.isQuestionnairesReady;
    },
  },

  actions: {
    async fetchAllOwnQuestionnaires({commit, state, rootGetters}, {force}) {
      if(force || !state.isQuestionnairesReady){
        const resp = await fetch(
          rootGetters.apiUrl(state.apiPrefix + '/own'),
          rootGetters.fetchInit('get')
        )

        if(resp.ok) {
          const json = await resp.json()
          commit('updateQuestionnaires', json)
        }
      }
    },
    async createQuestionnaire({commit, state, rootGetters}, questionnaire) {
      const resp = await fetch(
        rootGetters.apiUrl(state.apiPrefix),
        rootGetters.fetchInit('post', questionnaire)
      )

      console.log("creatingQuestionnaire: " + JSON.stringify(questionnaire))
      console.log(resp)
      if(resp.ok) {
        let q = await resp.json()
        commit('addQuestionnaire', q)
        return q
      } else {
        throw resp
      }
    },
    async deleteQuestionnaire({commit, state, rootGetters}, id) {
      const resp = await fetch(
        rootGetters.apiUrl(state.apiPrefix + '/' + id),
        rootGetters.fetchInit('delete')
      )

      if(resp.ok) {
        console.log(state.questionnaires);
        let index = state.questionnaires.findIndex(q => (parseInt(q.id) === id));
        console.log('index: ' + index);
        if(index > -1) {
          commit('deleteQuestionnaireByIndex', index)
          if(state.current.id === id) {
            if(index !== state.questionnaires.length - 1) {
              console.log('changing to next');
              commit('updateCurrentQuestionnaireByIndex', index + 1);
            } else {
              console.log('changing to prev');
              commit('updateCurrentQuestionnaireByIndex', index - 1);
            }
          } else {
            console.log('no changing needed');
          }
        }
      } else {
        throw resp
      }
    },
    async updateQuestionnaire({commit, state, getters, rootGetters}, questionnaire) {
      console.log('updating to ' + questionnaire.id);
      const resp = await fetch(
        rootGetters.apiUrl(state.apiPrefix + "/" + questionnaire.id),
        rootGetters.fetchInit('put', questionnaire)
      )

      if(resp.ok) {
        let q = await resp.json()
        commit('updateQuestionnaire', q)
        return q
      } else {
        throw resp
      }
    },
    async getQuestionnaireFields({commit, state, rootGetters, getters, dispatch}, {page, size}) {
      if(getters.currentQuestionnaireId === -1) {
        console.log("Resetting currentQuestionnaireId questionnaire");
        //await dispatch('resetCurrentQuestionnaire');
      }
      let url = rootGetters.apiUrl(state.apiPrefix + '/' + getters.currentQuestionnaireId + '/field')
      let params = { page, size }
      url.search = new URLSearchParams(params).toString()
      const resp = await fetch(
        url,
        rootGetters.fetchInit('get')
      )

      if(resp.ok) {
        let json = await resp.json()
        return json
      } else {
        throw resp
      }
    },
    async getCurrentQuestionnaireActiveFieldLabels({commit, state, rootGetters, getters, dispatch}) {
      if(getters.currentQuestionnaireId === -1) {
        console.log("Resetting currentQuestionnaireId questionnaire");
        await dispatch('resetCurrentQuestionnaire');
      }
      return dispatch('getQuestionnaireActiveFieldLabels', getters.currentQuestionnaireId);

    },
    async getQuestionnaireActiveFieldLabels({commit, state, rootGetters, getters, dispatch}, id) {
      const resp = await fetch(
        rootGetters.apiUrl(state.apiPrefix + '/' + id + '/field/active/label'),
        rootGetters.fetchInit('get')
      )

      if(resp.ok) {
        let json = await resp.json();
        return json;
      } else {
        throw resp;
      }
    },
    async getQuestionnaireActiveFields({commit, state, rootGetters, getters, dispatch}, id) {
      const resp = await fetch(
        rootGetters.apiUrl(state.apiPrefix + '/' + id + '/field/active'),
        rootGetters.fetchInit('get')
      )

      if(resp.ok) {
        let json = await resp.json();
        return json;
      } else {
        throw resp;
      }
    },
    async getQuestionnaireResponses({commit, state, rootGetters, getters, dispatch}, {page, size}) {
      if(getters.currentQuestionnaireId === -1) {
        console.log("Resetting currentQuestionnaireId questionnaire");
        await dispatch('resetCurrentQuestionnaire');
      }
      let url = rootGetters.apiUrl(state.apiPrefix + '/' + getters.currentQuestionnaireId + '/response')
      let params = { page, size }
      url.search = new URLSearchParams(params).toString()
      const resp = await fetch(url, rootGetters.fetchInit('get'))

      if(resp.ok) {
        return await resp.json()
      } else {
        throw resp
      }
    },
    async getAllReadyQuestionnaires({commit, state, rootGetters, getters, dispatch}, {page, size}) {
      let url = rootGetters.apiUrl(state.apiPrefix)
      let params = { page, size }
      url.search = new URLSearchParams(params).toString()
      const resp = await fetch(url, rootGetters.fetchInit('get'))

      if(resp.ok) {
        let json = await resp.json()
        return json
      } else {
        throw resp
      }
    },
    async getFeaturedQuestionnaires({commit, state, rootGetters, getters, dispatch}, {id, page, size}) {
      let url = rootGetters.apiUrl(state.apiPrefix + '/' + id + '/featured');
      let params = { page, size }
      url.search = new URLSearchParams(params).toString()
      const resp = await fetch(url, rootGetters.fetchInit('get'))

      if(resp.ok) {
        let json = await resp.json()
        return json
      } else {
        throw resp
      }
    },
    setCurrentQuestionnaire({commit, getters}, id) {
      console.log('setting to ' + id)
      if(getters.currentQuestionnaire && getters.currentQuestionnaire.id === id){
        return;
      }
      let questionnaires = getters.allOwnQuestionnaires;
      if(questionnaires.find(q => q.id === id))  {
        commit('updateCurrentQuestionnaire', id);
      } else {
        throw new Error("no such questionnaire " + id);
      }
    },
    async resetCurrentQuestionnaire({commit, getters, dispatch, state}) {
      if(state.isQuestionnairesReady) {
        console.log('in resetting')
        console.log('questionnaire not ready, fetching')
        await dispatch('fetchAllOwnQuestionnaires', {force: false})
      }
      let questionnaires = getters.allOwnQuestionnaires;
      if(questionnaires.length) {
        commit('updateCurrentQuestionnaire', questionnaires[0].id);
      } else {
        throw new Error("no questionnaires")
      }
    },
    async createField({commit, state, rootGetters, getters}, field) {
      const resp = await fetch(
        rootGetters.apiUrl(state.apiPrefix + '/' + getters.currentQuestionnaireId + '/field'),
        rootGetters.fetchInit('post', field)
      )

      if(resp.ok) {
        let field = await resp.json()
        return field
      } else {
        throw resp
      }
    },
    async updateField({commit, state, rootGetters, getters}, field) {
      const resp = await fetch(
        rootGetters.apiUrl('/field/' + field.id),
        rootGetters.fetchInit('put', field)
      )

      if (resp.ok) {
        let f = await resp.json()
        return f
      } else {
        throw resp
      }
    },
    async saveResponseForQuestionnaire({commit, state, rootGetters, getters}, {id, response}) {
      const resp = await fetch(
        rootGetters.apiUrl(state.apiPrefix + '/' + id + '/response'),
        rootGetters.fetchInit('post', response)
      )

      if(resp.ok) {
        let response = await resp.json()
        return response
      } else {
        throw resp
      }
    },
    async getQuestionnaireInfo({commit, state, rootGetters, getters, dispatch}, id) {
      console.log('api call')
      const resp = await fetch(
        rootGetters.apiUrl(state.apiPrefix + '/' + id + '/info'),
        rootGetters.fetchInit('get')
      )

      if(resp.ok) {
        let json = await resp.json();
        return json;
      } else {
        throw resp;
      }
    },
  },
}

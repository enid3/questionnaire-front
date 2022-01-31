import {createStore} from "vuex";
import router from "@/router";

export default {
  state: () => {
    return {
      baseApiUrl: 'http://localhost:8080/api/v1',
      baseHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      authTokenKey: 'authToken',
      authToken: '',

      userKey: 'user',
      user: {
        email: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
      }
    }
  },
  mutations: {
    updateToken(state, newToken) {
      if (newToken) {
        state.authToken = newToken;
        localStorage.setItem(state.authTokenKey, state.authToken)
      } else {
        state.authToken = '';
        localStorage.removeItem(state.authTokenKey)
      }
    },
    updateUser(state, user) {
      console.log('updating user: to' + user)
      console.log(user)
      console.log('updating user: from')
      console.log(state.user)
      for(let prop in user){
        if(user[prop]) {
          state.user[prop] = user[prop]
        }
      }
      console.log(state.user)
      console.log(JSON.stringify(state.user))


      localStorage.setItem(state.userKey, JSON.stringify(state.user));
    },
    initialiseState(state) {
      state.authToken = localStorage.getItem(state.authTokenKey);
      state.user =
        JSON.parse(localStorage.getItem(state.userKey))
        || { email: null, firstName: null,
          lastName: null, phoneNumber: null,
      };
    },
    saveState(state) {
      if(state.authToken)
        localStorage.setItem(state.authTokenKey, state.authToken);
      if(state.user)
        localStorage.setItem(state.userKey, JSON.stringify(state.user));
    },
    clearUser({state, commit}) {
      state.user = {
          email: null,
          firstName: null,
          lastName: null,
          phoneNumber: null,
      }
      localStorage.setItem(state.userKey, JSON.stringify(state.user));
    }

  },

  actions: {
    async login({commit, getters, state}, {email, password}) {
      const resp = await fetch(
        getters.apiUrl('/auth/signin'),
        getters.fetchInit('post', {"email": email, "password": password})
      )
      const json = await resp.json()
      commit('updateToken', json.token)
      console.log(json['user'])
      commit('updateUser', json['user'])
    },
    async register({commit, getters}, user) {
      console.log(user)
      const resp = await fetch(
        getters.apiUrl('/auth/register'),
        getters.fetchInit('post', user)
      )
      console.log(resp)
      const json = await resp.json()

      commit('updateToken', json.token)
      console.log(json['user'])
      commit('updateUser', json['user'])
    },
    async editProfile({commit, getters, state}, user){
      const resp = await fetch(
        getters.apiUrl('/user'),
        getters.fetchInit('put', user)
      )
      const json = await resp.json()
      console.log(json)

      commit('updateUser', user)
    },

    async changePassword({commit, getters, state}, {oldPassword, newPassword}){
      console.log(oldPassword)
      console.log(newPassword)
      const resp = await fetch(
        getters.apiUrl('/user/changePassword'),
        getters.fetchInit('post', {oldPassword, newPassword})
      )
      const json = await resp.json()

      console.log(json)

      //commit('changePassword', user)

    },

    async logout({commit, state}) {
      commit('updateToken', '')
      commit('clearUser')
      await router.push('/')
    }

  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuth(state) {
      return !!state.authToken ;
    },
    apiUrl: (state) => (url) => {
      return new URL(state.baseApiUrl + url)
    },
    headers: (state, getters) => {
      if (getters.isAuth) {
        return Object.assign({}, state.baseHeaders, {'Authorization': 'Bearer ' + state.authToken})
      } else {
        return Object.assign({}, state.baseHeaders)
      }
    },
    fetchInit: (state, getters) => (method, data) => {
      let init = {
        method: method,
        headers: getters.headers,
      }
      if (data)
        init['body'] = JSON.stringify(data)
      return init
    }
  }
}

import {createStore} from "vuex";
import router from "@/router";

export default {
  state: () => {
    return {
      baseApiUrl: 'http://127.0.0.1:8080/api/v1',
      // baseApiUrl: 'https://questionnaire-f.herokuapp.com/api/v1',
      baseHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      rememberMe: true,
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
        if(state.rememberMe) {
          localStorage.setItem(state.authTokenKey, state.authToken);
        }
      } else {
        state.authToken = '';
        localStorage.removeItem(state.authTokenKey);
      }
    },
    updateRememberMe(state, val) {
      state.rememberMe = val;
    },
    updateUser(state, user) {
      for(let prop in user){
        if(user[prop]) {
          state.user[prop] = user[prop]
        }
      }

      if(state.rememberMe) {
        localStorage.setItem(state.userKey, JSON.stringify(state.user));
      }
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
    clearUser(state) {
      state.user = {
          email: null,
          firstName: null,
          lastName: null,
          phoneNumber: null,
      }
      localStorage.setItem(state.userKey, JSON.stringify(state.user));
    },
  },

  actions: {
    async clearAuth({commit}) {
      commit('updateToken', '')
      commit('clearUser')
      await router.push('/')
    },
    async login({commit, getters, state}, {email, password, rememberMe}) {
      commit('updateRememberMe', rememberMe);
      const resp = await fetch(
        getters.apiUrl('/auth/signin'),
        getters.fetchInit('post', {"email": email, "password": password})
      )
      const json = await resp.json()
      console.log(json)
      if(resp.ok) {
        commit('updateToken', json.token)
        console.log(json['user'])
        commit('updateUser', json['user'])
        return ''
      } else {
        return json.message
      }
    },
    async register({commit, getters}, user) {
      const resp = await fetch(
        getters.apiUrl('/auth/register'),
        getters.fetchInit('post', user)
      )
      const json = await resp.json()
      if(resp.ok){
        commit('updateToken', json.token)
        commit('updateUser', json['user'])
        return ''
      } else {
        return json.message
      }
    },
    async editProfile({commit, getters, state, dispatch}, user) {
      const resp = await fetch(
        getters.apiUrl('/user'),
        getters.fetchInit('put', user)
      )
      console.log(resp.status)
      if(resp.status !== 401)  {
        const json = await resp.json()
        if(resp.ok) {
          commit('updateUser', user)
          return ''
        } else {
          return json.message
        }
      } else {
          dispatch('clearAuth')
          return "Auth token expired"
        }
    },
    async changePassword({commit, getters, state, dispatch}, {oldPassword, newPassword}){
      console.log(oldPassword)
      console.log(newPassword)
      const resp = await fetch(
        getters.apiUrl('/user/changePassword'),
        getters.fetchInit('post', {oldPassword, newPassword})
      )
      if(resp.status !== 401)  {
        const json = await resp.json()
        if(resp.ok) {
          return ''
        } else {
          return json.message
        }
      } else {
        dispatch('clearAuth')
        return "Auth token expired"
      }
  },

    async logout({commit, state, dispatch}) {
      dispatch('clearAuth')
      await router.push('/login')
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

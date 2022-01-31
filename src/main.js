import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import Store from './store'
import router from "@/router";

const store = createStore(Store)
const app = createApp(App)

app.use(router)
app.use(store)

const vm = app.mount('#app')

router.beforeEach(function (to, from, next) {
  console.log('beforeEach', to.path + ' - Auth: ' + store.getters.isAuth)

  if (
    to.path.match('/questionnaire/\\d*')
    || to.path === '/questionnaire'
    || to.path === '/success/'
    || to.path === '/success'
  )
  {
    console.log("next")
    next()
  } else if (
    to.path !== '/login'
    && to.path !== 'login'
    && to.path !== '/register'
    && to.path !== 'register'
    && !store.getters.isAuth)
  {
    next({path: '/login'})
  } else if (( to.path === '/register' || to.path === 'register'|| to.path === '/login' || to.path === 'login') && store.getters.isAuth) {
    next({ path: '/' })
  } else {
    next()
  }
})

/*
app.http.interceptors.push(function (request, next) {
  next(function (response) {
    if (response.status === 401) {
      let msg = response.body.returnMessage
      localStorage.setItem('logoutReason', msg)
      store.modules.auth.actions.logout()
    }
  })
})
*/

import 'bootstrap/dist/js/bootstrap.js'

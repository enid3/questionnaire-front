<template>
  <header class="bg-white">
    <navigation-header></navigation-header>
  </header>
  <main>
    <div class="container-fluid pt-5 justify-content-center">
      <router-view/>
    </div>
  </main>
</template>

<script>

import NavigationHeader from "@/components/NavigationHeader";
import router from "@/router";
import auth from "@/store/modules/auth";
export default {
  name: 'App',
  data() {
   return {
     authToken: String
   }
  },
  components: {NavigationHeader},
  beforeCreate() {
    this.$store.commit('initialiseState');
    /*
    http.interceptors.push(function (request, next) {
      next(function (response) {
        if (response.status === 401) {
          let msg = response.body.returnMessage
          localStorage.setItem('logoutReason', msg)
          store.modules.auth.actions.logout()
        }
      })
    })
  */
  },
  unmounted() {
    this.$store.commit('saveState');
  }
}
</script>


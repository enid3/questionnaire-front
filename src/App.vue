<template>
  <header class="bg-white border-bottom">
    <navigation-header></navigation-header>
  </header>
  <main>
    <router-view></router-view>
    <b-toast-container :toasts="notifications"></b-toast-container>
  </main>
</template>

<script>

import NavigationHeader from "@/components/NavigationHeader";
import BToastContainer from "@/components/util/BToastContainer";
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'App',
  data() {
   return {
     authToken: String,
   }
  },
  methods: mapActions(['createNotification']),
  computed: mapGetters(['notifications']),
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
  },
  components: {BToastContainer, NavigationHeader},
}
</script>


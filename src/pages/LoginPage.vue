<template>
  <DataInputPageLayout>
    <template v-slot:body>
      <div class="row justify-content-center">
        <Logotype></Logotype>
      </div>
      <div class="mt-2 mb-2">
        <h4 class="text-center">Log In</h4>
      </div>

      <LoginForm
          v-model:email="email"
          v-model:password="password"
      ></LoginForm>
      <div v-if="badCredentials.length !== 0" class="alert alert-warning mt-2" role="alert">
        <div v-for="alert in badCredentials">{{alert}}</div>
      </div>
      <div class="d-flex">
        <button class="flex-fill btn btn-primary" @click="submitLogin">LOG IN</button>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <label>Don't have account?&nbsp;</label>
        <router-link
          to="/register"
        >Sign Up</router-link>
      </div>
   </template>
  </DataInputPageLayout>
</template>

<script>
import Logotype from "@/components/Logotype";
import LoginForm from "@/components/LoginForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";

import {mapActions} from 'vuex'
import router from "@/router";
export default {
  name: "LoginPage",
  data() {
    return {
      email: 'asd@asd.com',
      password: 'asdasdasd',
      alerts: {
        emailAlerts: ['email alert'],
        passwordAlerts: ['password alert'],
      },
      valid: true,
      badCredentials: []
    }
  },
  components: {DataInputPageLayout, Logotype, LoginForm},
  methods: {
    ...mapActions(['login']),
    submitLogin(){
      console.log(this.email)
      console.log(this.password)
      if( this.login({email: this.email, password: this.password}) ) {
        this.$router.push('/')
      }
    },
    /*
    login() {
      let url = new URL('http://localhost:8080/api/v1/auth/signin')
      let resp = fetch(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'email': this.email, 'password': this.password})
      })
          .then((response) =>  response.json()

            )
      .then( (json) =>
          this.
          this.$parent.$data.authToken = 'Bearer ' + json.token

      )
      console.log(this.$parent.$data.authToken)
    },

     */
    validateForm() {
      this.valid = true
      //email
      this.alerts.emailAlerts = []
      this.badCredentials = []
      if (this.email === '' || this.email == null) {
        this.alerts.emailAlerts.push('Email is required')
        this.valid = false
        return
      } else if (!this.email.match(/@/)) {
        this.alerts.emailAlerts.push('Type email correctly')
        this.valid = false
      } else if (this.email.length < 3) {
        this.alerts.emailAlerts.push('Email can\'t be so short')
        this.valid = false
      }
      //password
      this.alerts.passwordAlerts = []
      if (this.password === '' || this.password == null) {
        this.alerts.passwordAlerts.push('Password is required')
        this.valid = false
      }
    },
    showRegistrationPage() {
      this.$router.push("/registration")
    }
  }
}
</script>
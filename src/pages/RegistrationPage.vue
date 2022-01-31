<template>
  <DataInputPageLayout>
    <template v-slot:body>
      <div class="row justify-content-center">
        <Logotype></Logotype>
      </div>
      <div class="mt-2">
        <h4 class="text-center" >Sign Up</h4>
      </div>

      <RegistrationForm
          v-model:email="user.email"
          v-model:password="user.password"
          v-model:confirm-password="user.confirmPassword"
          v-model:firstName="user.firstName"
          v-model:lastName="user.lastName"
          v-model:phone-number="user.phoneNumber"
      ></RegistrationForm>

      <div class="d-flex mt-3">
        <button class="flex-fill btn btn-primary" @click="submitRegister">SIGN UP</button>
      </div>
      <div class="text-center mt-3">
        <label>Already have account?&nbsp;</label>
        <router-link to="/login">Log in</router-link>
      </div>
    </template>
  </DataInputPageLayout>
</template>

<script>
//import { ValidationProvider } from 'vee-validate'
import Logotype from "@/components/Logotype";
import RegistrationForm from "@/components/RegistrationForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import {mapActions} from "vuex";
export default {
  name: "RegistrationPage",
  components: {
    DataInputPageLayout,
    RegistrationForm,
    Logotype,
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
        confirmPassword: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
      },
      alerts: {
        emailAlerts: [],
        passwordAlerts: [],
        confirmPasswordAlerts: [],
        firstNameAlerts: [],
        lastNameAlerts: [],
        phoneNumberAlerts: [],
      },
      valid: true
    }
  },
  methods: {
    ...mapActions(['register']),
    submitRegister(){
      console.log(this.user)
      if(this.user.password === this.user.confirmPassword) {
        if(this.register(Object.assign({}, this.user))) {
          this.$router.push('/')
        }

      }
    },
    validateForm() {
      this.valid = true
      //email
      this.alerts.emailAlerts = []
      if (this.email === '' || this.email == null) {
        this.alerts.emailAlerts.push('Email is required')
        this.valid = false
        return
      } else if (!this.email.match(/@/)) {
        this.alerts.emailAlerts.push('Type email correctly')
        this.valid = false
      } else if(this.email.length < 3) {
        this.alerts.emailAlerts.push('Email can\'t be so short')
        this.valid = false
      }
      //password
      this.alerts.passwordAlerts = []
      if(this.password === '' || this.password == null) {
        this.alerts.passwordAlerts.push('Password is required')
        this.valid = false
        return
      } else if(this.password.length < 4) {
        this.alerts.passwordAlerts.push('Minimum length of password is 4 chars')
        this.valid = false
      }
      //confirmPassword
      this.alerts.confirmPasswordAlerts = []
      if(this.confirmPassword === '' || this.confirmPassword == null) {
        this.alerts.confirmPasswordAlerts.push('Please confirm password')
        this.valid = false
        return
      } else if(this.confirmPassword !== this.password) {
        this.alerts.confirmPasswordAlerts.push('Passwords are different')
        this.alerts.passwordAlerts.push('Passwords are different')
        this.valid = false
      }
    },
  },
}
</script>
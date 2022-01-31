<template>
  <DataInputPageLayout>
    <template v-slot:header>
      <h4>Edit profile</h4>
    </template>

    <template v-slot:body>
      <EditProfileForm
          v-model:firstname="user.firstName"
          v-model:lastname="user.lastName"
          v-model:email="user.email"
          v-model:phone-number="user.phoneNumber"
      ></EditProfileForm>
      <div class="mt-3">
        <button class="btn btn-primary col-4" @click="onProfileSave">SAVE</button>
      </div>
    </template>
  </DataInputPageLayout>
</template>

<script>
import RegistrationForm from "@/components/RegistrationForm";
import EditProfileForm from "@/components/EditProfileForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'EditProfilePage',
  components: {
    EditProfileForm,
    RegistrationForm,
    DataInputPageLayout,
  },
  data() {
    return {
      alerts: {
        firstNameAlerts: [],
        lastNameAlerts: [],
        emailAlerts: [],
        phoneNumberAlerts: [],
      },
      valid: true
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'user']),
  },
  methods: {
    ...mapActions(['editProfile']),
    onProfileSave() {
      this.editProfile(this.user)
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

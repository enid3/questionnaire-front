<template>
  <DataInputPageLayout>
    <template v-slot:header>
      <h4>Change password</h4>
    </template>
    <template v-slot:body>
      <ChangePasswordForm
          v-model:password="password"
          v-model:new-password="newPassword"
          v-model:new-password-confirm="newPasswordConfirm"
      ></ChangePasswordForm>
      <button class="btn btn-primary" @click="submitChangingPassword">Change</button>
    </template>
  </DataInputPageLayout>
</template>

<script>
import ChangePasswordForm from "@/components/ChangePasswordForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import {mapActions} from "vuex";
export default {
  name: 'ChangePasswordPage',
  data() {
    return {
      password: null,
      newPassword: null,
      newPasswordConfirm: null,
    }
  },
  methods: {
    ...mapActions(['changePassword']),
    submitChangingPassword() {
      if(this.newPassword === this.newPasswordConfirm) {
        this.changePassword({oldPassword: this.password, newPassword: this.newPassword})
      } else {
        console.log('password not equal')
      }
    }

  },

  components: {DataInputPageLayout, ChangePasswordForm}
}
</script>
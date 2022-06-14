<template>
<BForm
    @submit="onSubmitChangePassword"
    @invalid-submit="onSubmitInvalid"
    :validation-schema="schema"
    :busy="isActionInProcess"
>
  <BFormGroup label="Current password">
    <BFormInput
        name="oldPassword"
        type="password"
    />
    <BInvalidFeedback name="oldPassword"/>
  </BFormGroup>

  <BFormGroup label="New password">
    <BFormInput
        name="newPassword"
        type="password"
    />
    <BInvalidFeedback name="newPassword"/>
  </BFormGroup>

  <BFormGroup label="Confirm new password">
    <BFormInput
        name="confirmNewPassword"
        type="password"
    />
    <BInvalidFeedback name="confirmNewPassword"/>
  </BFormGroup>
  <BSubmit>Change</BSubmit>
  <ActionCompletedSuccessfully class="m-2" :ok="isActionCompleted">
  </ActionCompletedSuccessfully>
  <ServerSideError
      class="m-2"
      :error="error"
  />
</BForm>
</template>

<script>
import BForm from "@/components/form/base/BForm";
import BFormGroup from "@/components/form/base/BFormGroup";
import BFormInput from "@/components/form/base/BFormInput";
import BSubmit from "@/components/form/base/BSubmit";
import {mapActions, mapGetters} from "vuex";
import * as yup from 'yup';
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import ActionCompletedSuccessfully from "@/components/ActionCompletedSuccesfully";
import ServerSideError from "@/components/util/ServerSideError";

export default {
  name: 'ChangePasswordForm',
  data(){
    return {
      isActionCompleted: false,
      isActionInProcess: false,
      error: ""
    }
  },
  computed: {
    ...mapGetters(['getRulesPreset']),
    schema() {
      return yup.object({
        oldPassword: this.getRulesPreset('password')(yup),
        newPassword: this.getRulesPreset('password')(yup),
        confirmNewPassword: this.getRulesPreset('password')(yup)
            .oneOf([yup.ref('newPassword'), null], "New passwords doesn't math"),
      })
    }
  },
  methods: {
    ...mapActions(['changePassword']),

    onSubmitChangePassword(value) {
      this.isActionCompleted = false;
      this.isActionInProcess = true;
      let error = this.changePassword({
        oldPassword: value.oldPassword,
        newPassword: value.newPassword
      })
      error.then( val => {
        this.error = val;
        if (!this.error) {
          this.isActionCompleted = true;
        }
        this.isActionInProcess = false;
      } )
    },
    onSubmitInvalid() {
      this.isActionCompleted = false;
    },
  },
  components: {BSubmit, BFormInput, BFormGroup, BForm, BInvalidFeedback, ActionCompletedSuccessfully, ServerSideError},
}
</script>
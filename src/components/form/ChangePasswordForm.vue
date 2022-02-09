<template>
<BForm
    @submit="onSubmitChangePassword"
    :validation-schema="schema"
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

export default {
  name: 'ChangePasswordForm',
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
      this.changePassword({
        oldPassword: value.oldPassword,
        newPassword: value.newPassword
      })
    }
  },
  components: {BSubmit, BFormInput, BFormGroup, BForm, BInvalidFeedback},
}
</script>
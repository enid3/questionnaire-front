<template>
<BForm>
  <BFormGroup label="Current password">
    <BFormInput
        type="password"
        :modelValue="password"
        @update:modelValue="$emit('update:password', $event)"
    >
    </BFormInput>
  </BFormGroup>

  <BFormGroup label="New password">
    <BFormInput
        type="password"
        :modelValue="newPassword"
        @update:modelValue="$emit('update:newPassword', $event)"
    >
    </BFormInput>
  </BFormGroup>

  <BFormGroup label="Confirm new password">
    <BFormInput
        type="password"
        :modelValue="newPasswordConfirm"
        @update:modelValue="$emit('update:newPasswordConfirm', $event)"
    >
    </BFormInput>
  </BFormGroup>
</BForm>
</template>

<script>
import BForm from "@/components/form/BForm";
import BFormGroup from "@/components/form/BFormGroup";
import BFormInput from "@/components/form/BFormInput";
export default {
  name: 'ChangePasswordForm',
  props: {
    password: String,
    newPassword: String,
    newPasswordConfirm: String,
  },
  components: {BFormInput, BFormGroup, BForm},
  emits: [ 'update:password', 'update:newPassword', 'update:newPasswordConfirm', ]
}
</script>
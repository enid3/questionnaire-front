<template>
  <div>
    <BFormGroup label="First name">
      <BFormInput
          :modelValue="firstname"
          @update:modelValue="$emit('update:firstname', $event)"
      >
        >
      </BFormInput>
    </BFormGroup>
    <BFormGroup label="Last name">
      <BFormInput
          :modelValue="lastname"
          @update:modelValue="$emit('update:lastname', $event)"
      >
      </BFormInput>
    </BFormGroup>

    <BFormGroup label="Email">
      <BFormInput
          type="email"
          :modelValue="email"
          @update:modelValue="$emit('update:email', $event)"
      >
      </BFormInput>
    </BFormGroup>

    <BFormGroup label="Phone Number">
      <BFormInput
          :modelValue="phoneNumber"
          @update:modelValue="$emit('update:phoneNumber', $event)"
      >
      </BFormInput>
    </BFormGroup>
  </div>
</template>

<script>
import BFormGroup from "@/components/form/BFormGroup";
import BFormInput from "@/components/form/BFormInput";
export default {
  name: 'EditProfileForm',
  props: {
    firstname: String,
    lastname: String,
    email: String,
    phoneNumber: String,
  },
  emits: [
    'update:firstname', 'update:lastname',
    'update:email', 'update:phoneNumber',
  ],
  components: {BFormInput, BFormGroup},
}
</script>
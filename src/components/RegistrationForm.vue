<template>
<div>
  <BFormGroup>
    <BFormInput
        type="email"
        placeholder="Email"
        :modelValue="email"
        @update:modelValue="$emit('update:email', $event)"
      >
    </BFormInput>
  </BFormGroup>
  <BFormGroup>
    <BFormInput
        type="password"
        placeholder="Password"
        :modelValue="password"
        @update:modelValue="$emit('update:password', $event)"
    >
    </BFormInput>
  </BFormGroup>
  <BFormGroup>
    <BFormInput
        type="password"
        placeholder="Confirm Password"
        :modelValue="confirmPassword"
        @update:modelValue="$emit('update:confirmPassword', $event)"
    >
    </BFormInput>
  </BFormGroup>
  <BFormGroup>
    <BFormInput
        placeholder="First name"
        :modelValue="firstName"
        @update:modelValue="$emit('update:firstName', $event)"
    >
    >
    </BFormInput>
  </BFormGroup>
  <BFormGroup>
    <BFormInput
        placeholder="Last name"
        :modelValue="lastName"
        @update:modelValue="$emit('update:lastName', $event)"
    >
    </BFormInput>
  </BFormGroup>
  <BFormGroup>
    <BFormInput
        placeholder="Phone Number"
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
  name: 'RegistrationForm',
  props: {
    email: String,
    password: String,
    confirmPassword: String,
    firstName: String,
    lastName: String,
    phoneNumber: String
  },
  emits: [
      'update:email', 'update:password',
      'update:confirmPassword', 'update:firstName',
      'update:lastName', 'update:phoneNumber',
  ],
  components: {BFormGroup, BFormInput},
}

</script>
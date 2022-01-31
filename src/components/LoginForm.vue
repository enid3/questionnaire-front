<template>
  <BFormGroup >
    <BFormInput
      type="text"
      placeholder="Email"
      :modelValue="email"
      @update:modelValue="$emit('update:email', $event)"
    />
  </BFormGroup>
  <BFormGroup >
    <BFormInput
        type="password"
        placeholder="Password"
        :modelValue="password"
        @update:modelValue="$emit('update:password', $event)"
    />
    <div class="invalid-feedback">
      Provide password.
    </div>
  </BFormGroup>
  <div class="ps-1 pe-1 row align-items-baseline justify-content-around">
    <BFormGroup class="col-auto me-auto">
      <BFormCheckbox
        :modelValue="isRemember"
        @update:modelValue="$emit('update:isRemember', $event)"
       >
        Remember me
      </BFormCheckbox>
    </BFormGroup>
    <div class="col-auto">
      <span class="text-primary">Forgot your password?</span>
    </div>
  </div>
</template>
<script>

import BFormGroup from "@/components/form/BFormGroup";
import BFormInput from "@/components/form/BFormInput";
import BFormCheckbox from "@/components/form/BFormCheckbox";
import BForm from "@/components/form/BForm";
export default {
  name: 'LoginForm',
  props:{
    email: String,
    password: String,
    isRemember: Boolean,
    action: Function
  },
  emits: ['update:email', 'update:password', 'update:isRemember'],
  components: {BForm, BFormCheckbox, BFormInput, BFormGroup}
}
</script>
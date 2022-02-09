<template>
<BForm
    @submit="onLogin"
    :validation-schema="getSchema(fields)"
>
  <BFormGroup >
    <BFormInput
        name="email"
        type="email"
        placeholder="Email"
    />
    <BInvalidFeedback name="email"/>
  </BFormGroup>

  <BFormGroup >
    <BFormInput
        name="password"
        type="password"
        placeholder="Password"
    />
    <BInvalidFeedback name="password"/>
  </BFormGroup>

  <div class="ps-1 pe-1 row align-items-baseline justify-content-around">
    <BFormGroup class="col-auto me-auto">
      <BFormCheckbox
          name="rememberMe"
       >
        Remember me
      </BFormCheckbox>
    </BFormGroup>
    <div class="col-auto">
      <span class="text-primary">Forgot your password?</span>
    </div>
    <div class="d-flex">
      <BSubmit class="flex-fill">LOG IN</BSubmit>
    </div>
  </div>
</BForm>
</template>
<script>

import BFormGroup from "@/components/form/base/BFormGroup";
import BFormInput from "@/components/form/base/BFormInput";
import BFormCheckbox from "@/components/form/base/BFormCheckbox";
import BForm from "@/components/form/base/BForm";
import BSubmit from "@/components/form/base/BSubmit";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'LoginForm',
  data() {
    return {
      fields: ['email', 'password']
    }
  },
  methods: {
    ...mapActions(['login']),
    onLogin(value) {
      if (this.login({email: value.email, password: value.password})) {
        this.$router.push('/')
      }
    },
  },
  computed: mapGetters(['getSchema']),
  components: {BSubmit, BForm, BFormCheckbox, BFormInput, BFormGroup, BInvalidFeedback}
}
</script>
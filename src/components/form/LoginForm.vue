<template>
<BForm
    @submit="onLogin"
    :validation-schema="getSchema(fields)"
    :busy="isActionInProcess"
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
          :model-value='true'
       >
        Remember me
      </BFormCheckbox>
    </BFormGroup>
    <div class="col-auto">
      <del><span class="text-primary">Forgot your password?</span></del>
    </div>
    <div class="d-flex">
      <BSubmit class="flex-fill">LOG IN</BSubmit>
    </div>

    <server-side-error
        class="m-2"
        :error="error"
    >
    </server-side-error>
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
import ServerSideError from "@/components/util/ServerSideError";

export default {
  name: 'LoginForm',
  data() {
    return {
      fields: ['email', 'password'],
      error:  "",
      isActionInProcess: false,
    }
  },
  methods: {
    ...mapActions(['login']),
    onLogin(value) {
      this.isActionInProcess = true;
      this.error=""
      let error = this.login({email: value.email, password: value.password, rememberMe: value.rememberMe})
      error.then( val => {
        console.log(val);
        this.error = val;
        if (!this.error) {
          this.$router.push('/')
        }
        this.isActionInProcess = false;
      } )
    },
  },
  computed: mapGetters(['getSchema']),
  components: {BSubmit, BForm, BFormCheckbox, BFormInput, BFormGroup, BInvalidFeedback, ServerSideError}
}
</script>
<template>
<BForm
    @submit="onRegister"
    :validation-schema="getSchema(fields)"
>
  <BFormGroup>
    <BFormInput
        name="email"
        type="email"
        placeholder="Email"
      />
    <BInvalidFeedback name="email"/>
  </BFormGroup>

  <BFormGroup>
    <BFormInput
        name="password"
        type="password"
        placeholder="Password"
    />
    <BInvalidFeedback name="password"/>
  </BFormGroup>

  <BFormGroup>
    <BFormInput
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
    />
    <BInvalidFeedback name="confirmPassword"/>
  </BFormGroup>

  <BFormGroup>
    <BFormInput
        name="firstName"
        placeholder="First name"
    />
    <BInvalidFeedback name="firstName"/>
  </BFormGroup>

  <BFormGroup>
    <BFormInput
        name="lastName"
        placeholder="Last name"
    />
    <BInvalidFeedback name="lastName"/>
  </BFormGroup>

  <BFormGroup>
    <BFormInput
        name="phoneNumber"
        placeholder="Phone Number"
    />
    <BInvalidFeedback name="phoneNumber"/>
  </BFormGroup>

  <div class="d-flex mt-3">
    <BSubmit class="flex-fill">SING UP</BSubmit>
  </div>
</BForm>
</template>

<script>
import BFormGroup from "@/components/form/base/BFormGroup";
import BFormInput from "@/components/form/base/BFormInput";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import BForm from "@/components/form/base/BForm";
import {mapActions, mapGetters} from "vuex";
import BSubmit from "@/components/form/base/BSubmit";

export default {
  name: 'RegistrationForm',
  data() {
    return {
      fields: [
         "email", "password", 'confirmPassword',
        "firstName", "lastName", "phoneNumber"
      ],
    }
  },
  methods: {
    ...mapActions(['register']),
    onRegister(value) {
      let user = {
        email: value.email,
        password: value.password,
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNumber: value.phoneNumber,
      }

      if(this.register(Object.assign({}, user))) {
        this.$router.push('/')
      }
    }
  },
  computed: mapGetters(['getSchema']),
  components: {BSubmit, BForm, BFormGroup, BFormInput, BInvalidFeedback },
}

</script>
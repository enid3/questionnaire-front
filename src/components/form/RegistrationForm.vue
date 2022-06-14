<template>
<BForm
    @submit="onRegister"
    :validation-schema="getSchema(fields)"
    :is-action-completed="isActionCompleted"
>
  <template #fields>
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

    <div class="row m-0">
      <BFormGroup class="col p-0 m-0">
        <BFormInput
            name="firstName"
            placeholder="First name"
        />
        <BInvalidFeedback name="firstName"/>
      </BFormGroup>

      <BFormGroup class="col p-0 m-0">

        <BFormInput
            name="lastName"
            placeholder="Last name"
        />
        <BInvalidFeedback name="lastName"/>
      </BFormGroup>
    </div>

    <BFormGroup>
      <BFormInput
          name="phoneNumber"
          placeholder="Phone Number"
      />
      <BInvalidFeedback name="phoneNumber"/>
    </BFormGroup>
  </template>

  <template #controls>
    <div class="d-flex mt-3">
      <BSubmit class="flex-fill">SING UP</BSubmit>
    </div>
  </template>
</BForm>
</template>

<script>
import BFormGroup from "@/components/form/base/BFormGroup";
import BFormInput from "@/components/form/base/BFormInput";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import BForm from "@/components/form/base/BForm";
import {mapActions, mapGetters} from "vuex";
import BSubmit from "@/components/form/base/BSubmit";
import ServerSideError from "@/components/util/ServerSideError";

export default {
  name: 'RegistrationForm',
  data() {
    return {
      fields: [
         "email", "password", 'confirmPassword',
        "firstName", "lastName", "phoneNumber"
      ],
      error: "",
      isActionCompleted: false
    }
  },
  methods: {
    ...mapActions(['register']),
    onRegister(value) {
      this.isActionCompleted = false;
      this.error=""
      let user = {
        email: value.email,
        password: value.password,
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNumber: value.phoneNumber,
      }

      let error = this.register(Object.assign({}, user));
      this.isActionCompleted = true;
      error.then( val => {
        console.log(val);
        this.error = val;
        if (!this.error) {
          this.$router.push('/')
        }
      } );
    }
  },
  computed: mapGetters(['getSchema']),
  components: {BSubmit, BForm, BFormGroup, BFormInput, BInvalidFeedback, ServerSideError },
}

</script>
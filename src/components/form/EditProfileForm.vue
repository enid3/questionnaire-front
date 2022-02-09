<template>
<BForm
    @submit="onSubmitProfileChanges"
    :initialValues="user"
    :validation-schema="getSchema(fields)"
>
  <BFormGroup label="First name">
    <BFormInput
        name="firstName"
        placeholder="First name"
    />
    <BInvalidFeedback name="firstName"/>
  </BFormGroup>

  <BFormGroup label="Last name">
    <BFormInput
        name="lastName"
        placeholder="Last name"
    />
    <BInvalidFeedback name="lastName"/>
  </BFormGroup>

  <BFormGroup label="Email">
    <BFormInput
        name="email"
        type="email"
        placeholder="Email"
    />
    <BInvalidFeedback name="email"/>
  </BFormGroup>

  <BFormGroup label="Phone Number">
    <BFormInput
        name="phoneNumber"
        placeholder="Phone Number"
    />
    <BInvalidFeedback name="phoneNumber"/>
  </BFormGroup>
  <div class="mt-3">
    <BSubmit class="col-4">SAVE</BSubmit>
  </div>
</BForm>
</template>

<script>
import BFormGroup from "@/components/form/base/BFormGroup";
import BFormInput from "@/components/form/base/BFormInput";
import {mapActions, mapGetters} from "vuex";
import BSubmit from "@/components/form/base/BSubmit";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import BForm from "@/components/form/base/BForm";
export default {
  name: 'EditProfileForm',
  data() {
    return {
      fields:  [ "email", "firstName", "lastName", "phoneNumber", ]
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'user', 'getSchema']),
  },
  methods: {
    ...mapActions(['editProfile']),
    onSubmitProfileChanges(value) {
      this.editProfile(value)
    },
  },
  components: {BFormInput, BFormGroup, BSubmit, BInvalidFeedback, BForm },
}
</script>
<template>
<BForm
    @submit="onSubmitProfileChanges"
    @invalid-submit="onSubmitInvalid"
    :initialValues="user"
    :validation-schema="getSchema(fields)"
    :busy="isActionInProcess"
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
  <ActionCompletedSuccessfully class="m-2" :ok="isActionCompleted">
  </ActionCompletedSuccessfully>
  <ServerSideError
      class="m-2"
    :error="error"
    />
</BForm>
</template>

<script>
import BFormGroup from "@/components/form/base/BFormGroup";
import BFormInput from "@/components/form/base/BFormInput";
import {mapActions, mapGetters} from "vuex";
import BSubmit from "@/components/form/base/BSubmit";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import BForm from "@/components/form/base/BForm";
import ServerSideError from "@/components/util/ServerSideError";
import ActionCompletedSuccessfully from "@/components/ActionCompletedSuccesfully";
export default {
  name: 'EditProfileForm',
  data() {
    return {
      fields:  [ "email", "firstName", "lastName", "phoneNumber", ],
      error: '',
      isActionInProcess: false,
      isActionCompleted: false
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'user', 'getSchema']),
  },
  methods: {
    ...mapActions(['editProfile']),
    onSubmitProfileChanges(value) {
      this.isActionCompleted = false;
      this.isActionInProcess = true;
      let error = this.editProfile(value)
      error.then( val => {
        console.log(val);
        this.error = val;
        if (!this.error) {
          this.isActionCompleted = true;
        }
        this.isActionInProcess = false;
      } )
    },
    onSubmitInvalid(value) {
      this.isActionCompleted = false;
    },
  },
  components: {ActionCompletedSuccessfully, ServerSideError, BFormInput, BFormGroup, BSubmit, BInvalidFeedback, BForm },
}
</script>
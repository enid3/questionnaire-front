<template>
  <DataInputPageLayout>
    <template v-slot:body>
      <div class="row justify-content-center">
        <Logotype></Logotype>
      </div>
      <div class="mt-2">
        <h4 class="text-center" >Sign Up</h4>
      </div>

      <RegistrationForm/>

      <div class="text-center mt-3">
        <label>Already have account?&nbsp;</label>
        <router-link to="/login">Log in</router-link>
      </div>
    </template>
  </DataInputPageLayout>
</template>

<script>
import Logotype from "@/components/Logotype";
import RegistrationForm from "@/components/form/RegistrationForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";

export default {
  name: "RegistrationPage",
  components: {
    DataInputPageLayout,
    RegistrationForm,
    Logotype,
  },
}
</script>
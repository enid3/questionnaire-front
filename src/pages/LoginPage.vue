<template>
  <DataInputPageLayout>
    <template v-slot:body>
      <div class="row justify-content-center">
        <Logotype></Logotype>
      </div>
      <div class="mt-2 mb-2">
        <h4 class="text-center">Log In</h4>
      </div>

      <LoginForm/>

      <div class="d-flex justify-content-center mt-3">
        <label>Don't have account?&nbsp;</label>
        <router-link to="/register" >Sign Up</router-link>
      </div>
   </template>
  </DataInputPageLayout>
</template>

<script>
import Logotype from "@/components/Logotype";
import LoginForm from "@/components/form/LoginForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import ServerSideError from "@/components/util/ServerSideError";

export default {
  name: "LoginPage",
  components: {ServerSideError, DataInputPageLayout, Logotype, LoginForm},
}
</script>
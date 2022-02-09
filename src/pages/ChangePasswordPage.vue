<template>
  <DataInputPageLayout>
    <template v-slot:header>
      <h4>Change password</h4>
    </template>
    <template v-slot:body>
      <ChangePasswordForm/>
    </template>
  </DataInputPageLayout>
</template>

<script>
import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import {mapActions} from "vuex";
export default {
  name: 'ChangePasswordPage',
  components: {DataInputPageLayout, ChangePasswordForm}
}
</script>
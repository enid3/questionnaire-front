<template>
  <DataInputPageLayout>
    <template v-slot:header>
      <h4>Edit profile</h4>
    </template>

    <template v-slot:body>
      <EditProfileForm/>
    </template>
  </DataInputPageLayout>
</template>

<script>
import RegistrationForm from "@/components/form/RegistrationForm";
import EditProfileForm from "@/components/form/EditProfileForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";

export default {
  name: 'EditProfilePage',
  components: {
    EditProfileForm,
    RegistrationForm,
    DataInputPageLayout,
  },
}
</script>

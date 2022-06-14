<template>
  <DataInputPageLayout>
    <template v-slot:body>
      <ManageQuestionnaireForm
          @submit="onSubmit"
          :editedId="-1"
          ref="manageFieldForm"
      />
    </template>
  </DataInputPageLayout>
</template>

<script>
import ManageQuestionnaireForm from "@/components/form/ManageQuestionnaireForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
export default {
  name: "ManageQuestionnaireFormTest",
  methods: {
    onSubmit(val) {
      console.log(val)
    }
  },
  components: {DataInputPageLayout,  ManageQuestionnaireForm}
}
</script>

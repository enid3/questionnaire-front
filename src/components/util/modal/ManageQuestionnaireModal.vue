<template>
<BModal id="manageQuestionnaireModal">
  <template #header>
    <h5 class="modal-title">{{title}}</h5>
    <button ref="dismissManageQuestionnaireButton" type="button" class="btn-close" data-bs-dismiss="modal"></button>
  </template>
  <template #body>
    <ManageQuestionnaireForm
        @submit="dismissAndEmit"
        :questionnaire="questionnaire"
    />
  </template>

</BModal>
</template>

<script>
import BModal from "@/components/util/modal/BModal";
import ManageQuestionnaireForm from "@/components/form/ManageQuestionnaireForm";
export default {
  name: "ManageQuestionnaireModal",
  props: {
    questionnaire: {
      type: Object,
      required: true
    }
  },
  computed: {
    isEditing() {
      return this.questionnaire.id && this.questionnaire.id !== -1;
    },
    title() {
      return this.isEditing ? 'Edit questionnaire' : 'Add questionnaire';
    }
  },
  methods: {
    dismissAndEmit(val){
      console.log("dismissing and emitting from  questionnaire")
      this.$refs.dismissManageQuestionnaireButton.click();
      this.$emit('submit', val);
    }
  },
  components: {ManageQuestionnaireForm, BModal}
}
</script>

<style scoped>

</style>
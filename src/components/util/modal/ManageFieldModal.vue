<template>
<BModal id="manageFieldModal">
  <template #header>
    <h5 class="modal-title">{{title}}</h5>
    <button ref="dismissManageFieldButton" type="button" class="btn-close" data-bs-dismiss="modal"></button>
  </template>
  <template #body>
    <ManageFieldForm
        @submit="dismissAndEmit"
        :field="field"
    />
  </template>
</BModal>
</template>

<script>
import BModal from "@/components/util/modal/BModal";
import ManageQuestionnaireForm from "@/components/form/ManageQuestionnaireForm";
import ManageFieldForm from "@/components/form/ManageFieldForm";
export default {
  name: "ManageFieldModal",
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  computed: {
    isEditing() {
      return this.field.id && this.field.id !== -1;
    },
    title() {
      return this.isEditing ? 'Edit field' : 'Add field';
    }
  },
  methods: {
    dismissAndEmit(val){
      this.$refs.dismissManageFieldButton.click();
      this.$emit('submit', val);
    }
  },
  emits:['submit'],
  components: {ManageFieldForm, ManageQuestionnaireForm, BModal},
}
</script>
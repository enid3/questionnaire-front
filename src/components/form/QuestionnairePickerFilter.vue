<template>
  <div slot="filter" class="list-group-item  lh-tight ">
  </div>
  <BFormInput name="filter" v-model="filter" placeholder="Name filter"/>
  <button
      class="btn ps-2 pe-2 pt-1 pb-1 ms-2"
      data-bs-toggle="modal" data-bs-target="#createQuestionnaireModal"
  >
    <i
        class="bi bi-plus"
    >
    </i>
  </button>

  <div class="modal fade" id="createQuestionnaireModal"  tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
        </div>
        <div class="modal-body">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManageQuestionnaireForm from "@/components/form/ManageQuestionnaireForm";
export default {
  name: "QuestionnairePickerFilter",
  components: {ManageQuestionnaireForm},
  methods: {
  },
}
</script>

<style scoped>

</style>
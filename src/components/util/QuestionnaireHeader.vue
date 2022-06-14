<template>
  <div class="d-flex">
    <p class="fs-4 m-0 me-1">
      <slot name="header"></slot>
      >
    </p>
    <h3>{{questionnaire.name}}</h3>
    <div>
      <EditControl
          data-bs-toggle="modal" data-bs-target="#manageQuestionnaireModal"
      >
      </EditControl>
      <DeleteControl @click="onDeleteQuestionnaire"/>

    </div>
  </div>
</template>

<script>
import EditControl from "@/components/form/controls/EditControl";
import DeleteControl from "@/components/form/controls/DeleteControl";
import {mapActions} from "vuex";
import questionnaire from "@/store/modules/questionnaire";
export default {
  name: "QuestionnaireHeader",
  components: {DeleteControl, EditControl},
  props: {
    questionnaire: {
      type: Object,
      required: true
    },
  },
  methods: {
    ...mapActions(['deleteQuestionnaire']),
    async onDeleteQuestionnaire() {
      console.log('deleteing questionnaire');
      console.log(this.questionnaire);
      await this.deleteQuestionnaire(this.questionnaire.id);
      console.log('after deleting');
    }
  }
}
</script>
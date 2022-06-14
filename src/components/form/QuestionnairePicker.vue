<template>
<div class="align-items-stretch flex-shrink-0 bg-white">
  <div class="list-group border-bottom scrollarea">
    <template v-if="filteredQuestionnaires.length">
      <a  v-for="q in filteredQuestionnaires"
          :key="q.id"
          :class="{'active': current.id === q.id}"
          class="list-group-item list-group-item-action lh-tight"

          @click="this.current=q"
      >

        <div class="d-flex flex-wrap justify-content-end">
          <strong class="flex-fill">{{q.name}}</strong>
          <small v-if="q.userInfo" class="">by {{q.userInfo.firstName}} {{q.userInfo.lastName}}</small>
        </div>
        <div class="col-11 ms-1 small text-break">
          {{q.description}}
        </div>
      </a>
    </template>
    <template v-else>
      <div class="text-danger text-center pt-3 pb-3">
        Empty
      </div>
    </template>
  </div>
</div>
</template>

<script>
import BFormInput from "@/components/form/base/BFormInput";
import ManageQuestionnaireForm from "@/components/form/ManageQuestionnaireForm";
export default {
  name: "QuestionnairePicker",
  components: {ManageQuestionnaireForm, BFormInput},
  props: {
    questionnaires: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      filter: "",
      editedId: -1,
      initialQuestionnaire: {name: "", description: ""},
      questionnaireModelTitle: "",
    }
  },
  computed: {
    current: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    filteredQuestionnaires() {
      return this.questionnaires.filter(q => q.name.match(this.filter))
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.scrollarea {
  overflow-y: auto;
}
</style>
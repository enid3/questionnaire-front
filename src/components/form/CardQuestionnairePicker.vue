<template>
  <div class="row row-cols-1 row-cols-lg-5 row-cols-md-4 row-cols-sm-2 align-items-center g-4">
    <div
      v-for="q in questionnaires"
      :key="q.id"
      class="flex-column d-flex"
    >
      <QuestionnaireCard
          :questionnaire="q"
          :class="{'border-primary border-2': current.id === q.id}"
          @click="current = q"
      >
      </QuestionnaireCard>
    </div>

  </div>

</template>

<script>
import QuestionnaireCard from "@/components/QuestionnaireCard";
export default {
  name: "CardQuestionnairePicker",
  components: {QuestionnaireCard},
  props: {
    questionnaires: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Object,
      required: false,
      default: { id: -1 }
    }
  },
  data() {
    return {
      filter: "",
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
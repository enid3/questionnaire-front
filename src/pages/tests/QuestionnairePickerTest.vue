<template>
<div>
  {{currentQuestionnaireId}}
  {{fields}}
  <QuestionnairePicker
      :questionnaires="allOwnQuestionnaires"
      v-model="current"
  />
</div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

function newQuestionnaire(id, name, description) {
  return {
    id: id,
    name: name,
    description: description,
  }
}
import QuestionnairePicker from "@/components/form/QuestionnairePicker";
export default {
  name: "QuestionnairePickerTest",
  data() {
    return {
      current: 1,
      fields: {}

    }
  },
  watch: {
    async current(newval) {
      this.fields = await this.getQuestionnaireFields({id: newval, page: 0, size: 10});
    }
  },
  computed: {
    ...mapGetters(['allOwnQuestionnaires']),
  },
  methods: {
    ...mapActions(['fetchAllOwnQuestionnaires', 'getQuestionnaireFields'])
  },
  created() {
    this.fetchQuestionnaires();
  },
  components: {QuestionnairePicker}
}
</script>

<style scoped>

</style>
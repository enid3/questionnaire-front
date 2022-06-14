<template>
<div>
  {{currentQuestionnaireId}}
  {{fields}}
  {{allOwnQuestionnaires}}
  <TablePageLayout>
    <template #header>
      <h3> Choose questionnaire</h3>
    </template>
    <template #body>
      <CardQuestionnairePicker
          :questionnaires="allOwnQuestionnaires"
          v-model="current"
      />

    </template>

  </TablePageLayout>
</div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

import CardQuestionnairePicker from "@/components/form/CardQuestionnairePicker";
import TablePageLayout from "@/components/layouts/TablePageLayout";
export default {
  name: "CardQuestionnairePickerTest",
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
  components: {TablePageLayout, CardQuestionnairePicker}
}
</script>

<style scoped>

</style>
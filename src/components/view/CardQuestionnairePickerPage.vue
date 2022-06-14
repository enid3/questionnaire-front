<template>
  <div>
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
import TablePageLayout from "@/components/layouts/TablePageLayout";
import CardQuestionnairePicker from "@/components/form/CardQuestionnairePicker";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CardQuestionnairePickerPage",
  props: {
    modelValue: Number,
  },
  methods: {
    ...mapActions(['fetchAllOwnQuestionnaires', 'setCurrentQuestionnaire'])
  },
  computed: {
    ...mapGetters(['allOwnQuestionnaires']),
    current: {
      get() {
        return this.modelValue;
      },
      set(value) {
        let id = value.id;
        this.setCurrentQuestionnaire(id)
        this.$router.push({name: 'manageFieldsView', params: {id}})
        this.$emit('update:modelValue', value)
      }
    },
  },
  created() {
    this.fetchAllOwnQuestionnaires(false);
  },
  emits: ['update:modelValue'],
  components: {TablePageLayout, CardQuestionnairePicker}
}
</script>

<style scoped>

</style>
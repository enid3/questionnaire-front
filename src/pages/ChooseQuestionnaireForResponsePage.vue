<template>
  <div>
    <TablePageLayout>
      <template #header>
        <h3> Choose questionnaire to Response</h3>
      </template>
      <template #body>
        <CardQuestionnairePicker
            :questionnaires="questionnaires"
            v-model="current"
        />
      </template>
    </TablePageLayout>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TablePageLayout from "@/components/layouts/TablePageLayout";
import CardQuestionnairePicker from "@/components/form/CardQuestionnairePicker";

export default {
  name: "ChooseQuestionnaireForResponsePage",
  props: {
    modelValue: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      questionnaires: [],
      currentPage: 0,
      pageSize: 5,
    }
  },
  methods: {
    ...mapActions(['getAllReadyQuestionnaires'])
  },
  computed: {
    current: {
      get() {
        return this.modelValue;
      },
      set(value) {
        console.log('updating value')
        //this.$router.push({name: 'responseQuestionnaireView', params: {id: value}})
        this.$emit('update:modelValue', value)
      }
    },
  },
  async mounted() {
    let data = await this.getAllReadyQuestionnaires( {
          page: this.currentPage,
          size: this.pageSize
        } );
    console.log(data)
    this.questionnaires = data.content;
  },
  emits: ['update:modelValue'],
  components: {TablePageLayout, CardQuestionnairePicker}
}
</script>

<style scoped>

</style>
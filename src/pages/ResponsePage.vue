<template>
<router-view v-if="$route.name === 'chooseQuestionnaireForResponse' || $route.name === 'featuredQuestionnairesView'"
    v-model="currentQuestionnaire"
/>
<router-view
    v-else
    :questionnaire="currentQuestionnaire"
/>
</template>

<script>
import router from "@/router";

export default {
  name: "ResponsePage",
  data() {
    return {
      currentQuestionnaire: {id: -1},
      questionnaires: [],
      currentPage: 0,
      pageSize: 5,

    }
  },
  watch: {
    currentQuestionnaire(newVal, oldVal) {
      console.log('cahnging q from');
      console.log(oldVal);
      console.log('to');
      console.log(newVal);
      router.push( {
        name: 'provideResponseForm',
        params: {id: this.currentQuestionnaire.id}
      });
    }
  },
  mounted() {
    console.log(this.$route)
  }

}
</script>
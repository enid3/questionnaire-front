<template>
  <aside class="bg-white border-end">
    <BusyWrapper
        :busy="!isQuestionnairesReady"
    >
      <QuestionnairePicker
          :questionnaires="allOwnQuestionnaires"
          v-model="current"
      />
    </BusyWrapper>
  </aside>
  <div style="margin-left: 20rem;" v-if="allOwnQuestionnaires.length">
    <router-view></router-view>
    <manage-questionnaire-modal v-if="currentQuestionnaire && currentQuestionnaire.id !== 1"
        @submit="handleChange"
        :questionnaire="currentQuestionnaire"
    ></manage-questionnaire-modal>
  </div>
</template>

<script>
import QuestionnairePicker from "@/components/form/QuestionnairePicker";
import {mapActions, mapGetters} from "vuex";
import BusyWrapper from "@/components/util/BusyWrapper";
import ManageQuestionnaireModal from "@/components/util/modal/ManageQuestionnaireModal";
export default {
  name: "ManageQuestionnairePage",
  computed: {
    ...mapGetters(['allOwnQuestionnaires', 'currentQuestionnaire', 'isQuestionnairesReady']),
    current: {
      get() {
        return this.currentQuestionnaire;
      },
      set(value) {
        try {
          let id = value.id;
          this.setCurrentQuestionnaire(id);
          this.$router.replace({name: this.$route.name, params: {id}});
        } catch (e) {
          console.log(e);
          console.log("failed to change questionnaire to " + id);
          this.resetCurrentQuestionnaire();
        }
      }
    }
  },
  methods: {
    ...mapActions(['fetchAllOwnQuestionnaires', 'getQuestionnaireFields', 'resetCurrentQuestionnaire', 'setCurrentQuestionnaire', 'updateQuestionnaire', 'createQuestionnaire']),
    handleChange(questionnaire) {
      console.log("handle change")
      let updated = Object.assign(this.allOwnQuestionnaires.find(q => q.id === questionnaire.id), questionnaire);
      if(questionnaire.id) {
        this.updateQuestionnaire(updated);
      } else {
        this.createQuestionnaire(updated);
      }
    },
  },
  mounted() {
    console.log('mounting ManageQuestionnairePage')
    this.fetchAllOwnQuestionnaires({force: false});
    console.log('end')
  },
  components: {ManageQuestionnaireModal, BusyWrapper, QuestionnairePicker},

}
</script>
<style>
aside {
  position: fixed;
  width: 20rem;
  bottom: 0rem;
  top: 5rem;
  left: 0rem;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
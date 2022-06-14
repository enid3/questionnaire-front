<template>
  <DataInputPageLayout>
    <template #header>
      <div class="d-flex flex-wrap justify-content-end">
        <BackButton/>
        <h3 class="flex-fill m-0">{{q.name}} </h3>
        <p class="mb-0" v-if="q.userInfo">
          by
          {{q.userInfo.firstName}}
          {{q.userInfo.lastName}}
        </p>
      </div>
    </template>
    <template #body>
      <router-view />
    </template>
  </DataInputPageLayout>
</template>

<script>
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import {mapActions} from "vuex";
import BackButton from "@/components/util/BackButton";

export default {
  name: "ProvideResponseView",
  props: {
    questionnaire: {
      type: Object,
      required: false,
      default: function () {
      }
    }
  },
  data(){
    return {
      defaultQuestionnaire: {}
    }
  },
  computed: {
    isQuestionnairePropValid() {
      return this.questionnaire && (this.questionnaire.id !== -1);
    },
    q() {
        if(this.isQuestionnairePropValid) {
          return this.questionnaire;
        } else {
          return this.defaultQuestionnaire;
        }
    }
  },
  methods: {
    ...mapActions(['getQuestionnaireInfo']),
    async fetchQuestionnaireInfo() {
      try {
        this.defaultQuestionnaire = await this.getQuestionnaireInfo(this.$route.params.id);
      }
      catch (e) {
        console.log('error when fetching questionnaire info');
        console.log(e)
      }
    }

  },
  mounted() {
    if(!this.isQuestionnairePropValid) {
      this.fetchQuestionnaireInfo();
    }
  },
  components: {BackButton, DataInputPageLayout}
}
</script>
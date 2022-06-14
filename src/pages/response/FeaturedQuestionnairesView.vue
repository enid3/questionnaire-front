<template>
  <DataInputPageLayout>
    <template #header>
      <h3 class="text-center">Thanks for your response!</h3>
    </template>
    <template #body>
      <h4>See also:</h4>
      <QuestionnairePicker
          :questionnaires="featuredQuestionnaires"
          v-model="current"
      ></QuestionnairePicker>
      <br>
      <ProvideResponseNavigation/>
    </template>

  </DataInputPageLayout>
</template>

<script>
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import QuestionnairePicker from "@/components/form/QuestionnairePicker";
import {mapActions} from "vuex";
import ProvideResponseNavigation from "@/components/util/ProvideResponseNavigation";
export default {
  name: "FeaturedQuestionnairesView",
  props: {
    page: {
      type: Number,
      required:false,
      default: 0,
    },
    size: {
      type: Number,
      required:false,
      default: 6,
    },
    modelValue: {
      type: Object ,
      required: true
    }
  },
  data() {
    return {
      featuredQuestionnaires: []
    }
  },
  computed: {
    current: {
      get() {
        return this.modelValue;
      },
      set(value) {
        //this.$router.push({name: 'ProvideResponseForm', params: {id}});
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: mapActions(['getFeaturedQuestionnaires']),
  async mounted() {
    let json = await this.getFeaturedQuestionnaires( {
          id: this.current.id,
          page: this.page,
          size: this.size
        }
    );
    this.featuredQuestionnaires = json.content;
  },
  components: {ProvideResponseNavigation, QuestionnairePicker, DataInputPageLayout}
}
</script>
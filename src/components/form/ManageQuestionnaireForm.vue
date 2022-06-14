<template>
  <BForm
      @submit="onSaveQuestionnaire"
      :validation-schema="schema"
      :error="error"
      :is-action-completed="isActionCompleted"
      :initial-values="questionnaire"
  >
      <template #fields>
        <BFormGroup
            label="Name"
            label-for="name"
            :is-required="true"
        >
          <BFormInput name="name" />
          <BInvalidFeedback name="name"/>
        </BFormGroup>
        <BFormGroup
            label="Description"
            label-for="description"
        >
          <BFormTextArea name="description" />
          <BInvalidFeedback name="description"/>
        </BFormGroup>
      </template>
      <template #controls>
        <div class="d-flex justify-content-end align-items-center ">
          <BSubmit class="btn btn-primary  ms-1 me-1 mt-2">Save</BSubmit>
        </div>
      </template>
  </BForm>
</template>

<script>
import OptionsInput from "@/components/form/OptionsInputForm";
import fieldTypes from "@/FieldTypes";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import BFormGroup from "@/components/form/base/BFormGroup";
import BForm from "@/components/form/base/BForm";
import BFormInput from "@/components/form/base/BFormInput";
import BFormSelect from "@/components/form/base/BFormSelect";
import BFormCheckbox from "@/components/form/base/BFormCheckbox";
import {Field} from "vee-validate";
import BSubmit from "@/components/form/base/BSubmit";
import {mapGetters, mapActions} from "vuex";
import * as yup from "yup";
import ServerSideError from "@/components/util/ServerSideError";
import ActionCompletedSuccessfully from "@/components/ActionCompletedSuccesfully";
import BFormTextArea from "@/components/form/base/BFormTextarea";

export default {
  name: "ManageQuestionnaireForm",
  components: {
    BFormTextArea,
    ActionCompletedSuccessfully,
    BSubmit, BFormCheckbox, BFormSelect, OptionsInput, BForm, BFormInput, BFormGroup, BInvalidFeedback, Field, ServerSideError},
  props: {
    questionnaire: {
      type: Object,
      required: true
    }
  },
  watch: {
    questionnaire(newVal, oldVal) {
      console.log('new:' + newVal);
      console.log('old:' + oldVal);

    }
  },
  data() {
    return {
      error: "",
      isActionCompleted: false
    }
  },
  computed: {
    ...mapGetters(['apiUrl', 'fetchInit']),
    schema() {
      return {
        name: yup.string().required().min(2).max(40),
        description: yup.string().nullable().min(0).max(200)
      }
    }
  },
  methods: {
    ...mapActions(['createQuestionnaire', 'updateQuestionnaire']),
    async onSaveQuestionnaire(value, {resetForm}) {
      this.isActionCompleted = false;

      console.log('value')
      console.log(value)
      console.log('qustionnaire')
      console.log(this.questionnaire)
      let q = Object.assign({}, this.questionnaire, value);
      if(value.id) {
        q.id = this.questionnaire.id;
      }
      console.log('q')
      console.log(q)

      try {
        let newQuestionnaire
        if(q.id) {
          console.log('saving changes for ' +  q.id);
          newQuestionnaire = await this.updateQuestionnaire(q);
        } else {
          console.log('adding new');
          newQuestionnaire = await this.createQuestionnaire(q);
        }

        resetForm();
        this.isActionCompleted=false;
        this.$emit('submit', newQuestionnaire)
      }
      catch (resp) {
        let json = await resp.json()
        this.error = json.message
      }
    },
  },
  emits: ['submit']
}
</script>
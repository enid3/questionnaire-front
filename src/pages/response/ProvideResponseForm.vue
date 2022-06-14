<template>
  <div>
    <template v-if="!isFormReady && !errors">
      <br/>
      <br/>
    </template>
    <BForm
        v-else-if="isFormReady"
        @submit="saveResponse"
        :error="errors"
        :is-action-completed="isActionCompleted"
        :validation-schema="schema"
    >
      <template #fields>
        <BFormGroup
            v-for="field in sortedFields"
            :is-required="field.isRequired"
            :label="field.label"
            :label-for="getFieldName(field)"
            :key="field.id"
        >
          <component
              :is="getComponent(field.type)"
              :type="getFieldTypeInput(field.type)"
              :name="getFieldName(field)"
              :options="field.options"
          >
          </component>
          <ErrorMessage class="alert-danger" role="alert" :name="getFieldName(field)"/>
          <!-- <BInvalidFeedback :name="'' + field.id"/> -->
        </BFormGroup>
      </template>
      <template #controls="{resetForm}">
        <div class="row mt-0 mb-0 ms-1 me-1">
          <button
              class="btn btn-primary col-auto me-auto"
          >
            Save
          </button>
          <button
              type="button"
              class="btn col-auto ms-auto btn-outline-danger"
              @click="resetForm"
          >
            <i class="bi bi-arrow-clockwise"></i>Reset
          </button>
        </div>
      </template>
    </BForm>
  </div>
</template>

<script>
import router from "@/router";
import BFormGroup from "@/components/form/base/BFormGroup";
import BFormInput from "@/components/form/base/BFormInput";
import BFormRadioGroup from "@/components/form/base/BFormRadioGroup";
import BFormCheckboxGroup from "@/components/form/base/BFormCheckboxGroup";
import BFormSelect from "@/components/form/base/BFormSelect";
import BForm from "@/components/form/base/BForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import {mapActions, mapGetters} from "vuex";
import * as yup from "yup";
import BSubmit from "@/components/form/base/BSubmit";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import {ErrorMessage} from "vee-validate";
import BFormTextArea from "@/components/form/base/BFormTextarea";

export default {
  name: "ProvideResponseForm",
  props: {
    questionnaire: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      fields: [],
      response: {},
      errors: "",
      isActionCompleted: false,
      isFormReady: false
    }
  },
  computed: {
    ...mapGetters(['apiUrl', 'fetchInit']),
    schema(){
      const sch = {}
      for (let field of this.fields) {
        if(field.type === 'CHECKBOX') {
          if(field.isRequired) {
            sch[field.id] = yup.array().required("This field is required")
          } else {
            sch[field.id] = yup.array()
          }
        } else {
          if(field.isRequired){
            sch[field.id] = yup.string().required("This field is required")
          } else {
            sch[field.id] = yup.string()
          }
        }
      }
      return yup.object(sch)
    },
    sortedFields(){
      return this.fields.sort((a, b) => a.id - b.id)
    },
    isFormBusy() {
      return (!this.isFormReady && !this.errors) || this.isActionCompleted;
    }
  },

  methods: {
    ...mapActions(['saveResponseForQuestionnaire', 'getQuestionnaireActiveFields']),
    getFieldName(field) {
      return '' + field.id;
    },
    getComponent(type) {
      const map = {
        "SINGLE_LINE_TEXT": BFormInput,
        "MULTILINE_TEXT": BFormTextArea,
        "RADIO_BUTTON": BFormRadioGroup,
        "CHECKBOX": BFormCheckboxGroup,
        "COMBOBOX": BFormSelect,
        "DATE": BFormInput
      };
      return map[type]
    },
    async saveResponse(value) {
      this.isActionCompleted = true;
      let id = this.$route.params.id;

      for (let key in value){
        if(value[key] instanceof Array) {
          value[key]  = value[key].join(' ');
        }
      }
      try {
        console.log('saving for ')
        console.log(value)
        await this.saveResponseForQuestionnaire({id, response: value})
        await router.push({name: 'featuredQuestionnairesView', params: {id}});
        this.isActionCompleted = false;
      } catch (e) {
        console.log('error occurred when saving response')
        console.log(e)
      }
      this.isActionCompleted = false;
    },
    async fetchActiveFields() {
      console.log('fetching labels');
      this.isFormReady = false;
      //let id = this.questionnaire.id;
      let id = this.$route.params.id

      try {
        this.isFormReady = true;
        this.fields = await this.getQuestionnaireActiveFields(id);
        console.log(this.fields);
      }
      catch (resp) {
        console.log(resp);
        this.errors = resp.json().message;
      }
    },
    getFieldTypeInput(type) {
      const map = {
        "SINGLE_LINE_TEXT": "text",
        "DATE": "date"
      };
      return map[type];
    }
  },
  async mounted() {
    await this.fetchActiveFields()
  },
  components: {
    BFormTextArea,
    BInvalidFeedback, BSubmit,
    DataInputPageLayout, BForm,
    BFormSelect, BFormCheckboxGroup,
    BFormRadioGroup, BFormInput,
    BFormGroup, ErrorMessage,
  },
}
</script>
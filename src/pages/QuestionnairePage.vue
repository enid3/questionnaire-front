<template>
  <DataInputPageLayout>
    <template v-slot:body>
    <b-form
        v-slot="{values, resetForm}"
        @submit="onSubmitResponse"
        @invalid-submit="onInvalidSubmit"
        :validation-schema="schema"
    >
      {{values}}

      <b-form-group
          v-for="field in fields"
          :label="field.label"
      >
         <b-form-input
            v-if="groupableFieldTypes.includes(field.type)"
            :type="getFieldTypeInput(field.type)"
            :name="'' + field.id"
         >
         </b-form-input>
         <b-form-radio-group
            v-else-if="field.type ==='RADIO_BUTTON'"
            :name="'' + field.id"
            :options="field.options"
        >
        </b-form-radio-group>
        <b-form-checkbox-group
            v-else-if="field.type ==='CHECKBOX'"
            :name="'' + field.id"
            :options="field.options"
        ></b-form-checkbox-group>
        <b-form-select
            v-else-if="field.type ==='COMBOBOX'"
            :options="field.options"
            :name="'' + field.id"
        ></b-form-select>

        <ErrorMessage class="alert-danger" role="alert" :name="'' + field.id"/>
        <!-- <BInvalidFeedback :name="'' + field.id"/> -->
      </b-form-group>


      <div class="row mt-0 mb-0 ms-1 me-1">
        <button
            class="btn btn-primary col-auto me-auto"
        >
          Save
        </button>
        <button
            class="btn col-auto ms-auto btn-outline-danger"
            @click="resetForm"
        >
          <i class="bi bi-arrow-clockwise"></i>Reset
        </button>
      </div>
    </b-form>
  </template>
  </DataInputPageLayout>
</template>

<script>
import fieldTypes from "@/FieldTypes";
import router from "@/router";
import BFormGroup from "@/components/form/base/BFormGroup";
import BFormInput from "@/components/form/base/BFormInput";
import BFormRadioGroup from "@/components/form/base/BFormRadioGroup";
import BFormCheckboxGroup from "@/components/form/base/BFormCheckboxGroup";
import BFormSelect from "@/components/form/base/BFormSelect";
import BForm from "@/components/form/base/BForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import {mapGetters} from "vuex";
import * as yup from "yup";
import BSubmit from "@/components/form/base/BSubmit";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import {ErrorMessage} from "vee-validate";

export default {
  name: "QuestionnairePage",
  components: {
    BInvalidFeedback, BSubmit,
    DataInputPageLayout, BForm,
    BFormSelect, BFormCheckboxGroup,
    BFormRadioGroup, BFormInput,
    BFormGroup, ErrorMessage},
  data() {
    return {
      fields: [],
      response: {},
      fieldTypes,
      groupableFieldTypes: ['SINGLE_LINE_TEXT', 'MULTILINE_TEXT','DATE']
    }
  },
  computed: {
    ...mapGetters(['apiUrl', 'fetchInit']),
    schema(){
      const sch = {}
      for (let field of this.fields) {
        if(field.type === 'CHECKBOX') {
          console.log('' + field.id + " is " + field.type)
          if(field.isRequired) {
            console.log('' + field.id + " is " + field.type + " array.req")
            sch[field.id] = yup.array().required()
          } else {
            console.log('' + field.id + " is " + field.type + " array")
            sch[field.id] = yup.array()
          }
        } else {
          if(field.isRequired){
            console.log('' + field.id + " is " + field.type)
            sch[field.id] = yup.string().required()
          }
        }
      }
      return yup.object(sch)
    }
  },
  methods: {

    async saveResponse(value) {
      let id = this.$route.params.id
      let url = this.apiUrl('/response/' + id)
      for (let key in value){
        if(value[key] instanceof Array) {
          value[key]  = value[key].join(' ')
        }
      }
      let resp = await fetch( url, this.fetchInit('post', value) )
      router.push("/success")
    },
    onSubmitResponse(value){
      console.log(value)
      this.saveResponse(value)

    },
    onInvalidSubmit({values, errors, result}) {
      console.log("onInvalidSubmit")
      console.log(JSON.stringify(values))
      console.log(JSON.stringify(errors))
      console.log(JSON.stringify(result))
    },

    async fetchActiveFields() {
      let id = this.$route.params.id
      let url = this.apiUrl('/questionnaire/' + id)
      let resp = await fetch( url, this.fetchInit('get') )
      let dto = await resp.json()
      this.fields = dto.fields

    },
    getFieldTypeInput(type) {
      const map = {
        "SINGLE_LINE_TEXT": "text",
        "MULTILINE_TEXT": "textarea",
        "RADIO_BUTTON": "radio",
        "CHECKBOX": "checkbox",
        "COMBOBOX": "select",
        "DATE": "date"
      };
      return map[type]
    }
  },
  mounted() {
    this.fetchActiveFields()
  }
}
</script>
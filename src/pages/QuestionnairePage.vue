<template>
  <DataInputPageLayout>
    <template v-slot:body>
    <b-form>
      <b-form-group
          v-for="field in fields"
          :label="field.label"
      >
        <b-form-input
                       v-if="groupableFieldTypes.includes(field.type)"
                       :type="getFieldTypeInput(field.type)"
                       v-model="response[field.id]"
                       >
                       </b-form-input>
        <b-form-radio-group
                             v-else-if="field.type ==='RADIO_BUTTON'"
                             :values="field.options"
                             v-model="response[field.id]"
                             >
                             </b-form-radio-group>
        <b-form-checkbox-group
                                v-else-if="field.type ==='CHECKBOX'"
                                :options="field.options"
                                v-model="response[field.id]"
                                ></b-form-checkbox-group>
        <b-form-select
            v-else-if="field.type ==='COMBOBOX'"
            :options="[{text: 'Select one', value: undefined}, ...field.options]"
            v-model="response[field.id]"
        ></b-form-select>
      </b-form-group>
    </b-form>
  </template>
  <template v-slot:footer>
    <div class="row mt-0 mb-0 ms-1 me-1">
      <button
          class="btn btn-primary col-auto me-auto"
          @click.prevent="saveResponse"
      >
        Save
      </button>
      <button
          class="btn col-auto ms-auto btn-outline-danger"
          @click="response = {}"
      >
        <i class="bi bi-arrow-clockwise"></i>Reset
      </button>
    </div>

  </template>
  </DataInputPageLayout>
</template>

<script>
import fieldTypes from "@/FieldTypes";
import router from "@/router";
import BFormGroup from "@/components/form/BFormGroup";
import BFormInput from "@/components/form/BFormInput";
import BFormRadioGroup from "@/components/form/BFormRadioGroup";
import BFormCheckboxGroup from "@/components/form/BFormCheckboxGroup";
import BFormSelect from "@/components/form/BFormSelect";
import BForm from "@/components/form/BForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import {mapGetters} from "vuex";

export default {
  name: "QuestionnairePage",
  components: {DataInputPageLayout, BForm, BFormSelect, BFormCheckboxGroup, BFormRadioGroup, BFormInput, BFormGroup},
  data() {
    return {
      fields: [],
      response: {},
      fieldTypes,
      groupableFieldTypes: ['SINGLE_LINE_TEXT', 'MULTILINE_TEXT','DATE']
    }
  },
  computed: {
    ...mapGetters(['apiUrl', 'fetchInit'])
  },
  methods: {
    async saveResponse() {
      let id = this.$route.params.id
      let url = this.apiUrl('/response/' + id)
      let resp = await fetch( url, this.fetchInit('post', this.response) )
      router.push("/success")
    },

    async fetchActiveFields() {
      let id = this.$route.params.id
      let url = this.apiUrl('/questionnaire/' + id)
      let resp = await fetch( url, this.fetchInit('get') )
      this.fields = await resp.json()

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
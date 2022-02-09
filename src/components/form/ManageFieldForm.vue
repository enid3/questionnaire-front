<template>
  <BForm
      v-slot="{values}"
      @submit="onSaveField"
  >
    {{values}}
    <div class="container-sm">
        <BFormGroup
            class="row justify-content-sm-start"
            label="Label"
            label-cols="2"
        >
          <div class='col-10'>
            <BFormInput
                name="label"
            />
            <BInvalidFeedback name="label"/>

          </div>
        </BFormGroup>

      <BFormGroup
          class="row justify-content-sm-start"
          label="Type"
          label-cols="2"
      >
        <div class='col-10'>
          <BFormSelect
              name="type"
              :options="fieldOptions"
          />
          <BInvalidFeedback name="type"/>
        </div>
      </BFormGroup>

      <BFormGroup
          class="row justify-content-sm-start"
          label="Options"
          label-cols="2"
      >
        <div class="col-10">
          <Field name="options" v-slot="{field}">
            <OptionsInput
                v-bind="field"
                v-model="options"
                :disabled="!isOptionsAvailable(values.type)"
            />
          </Field>
          <BInvalidFeedback name="options"/>
        </div>

      </BFormGroup>

      <div class="row justify-content-center">
        <div class="col-auto">
            <BFormCheckbox name="isRequired">
              Required
            </BFormCheckbox>
        </div>

        <div class="col-auto">
          <BFormCheckbox name="isActive">
            Active
          </BFormCheckbox>
        </div>
      </div>
      <div class="d-flex border-top justify-content-end align-items-center ">
        <button type="button" class="btn btn-secondary me-1 mt-2" data-bs-dismiss="modal">Cancel</button>
        <BSubmit data-bs-dismiss="modal" class="btn btn-primary  ms-1 me-1 mt-2">Save</BSubmit>
      </div>
    </div>
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
import {mapGetters} from "vuex";

export default {
  name: "ManageFieldForm",
  components: {BSubmit, BFormCheckbox, BFormSelect, OptionsInput, BForm, BFormInput, BFormGroup, BInvalidFeedback, Field, },
  props: {
    editedId: Number,
  },
  data() {
    return {
      fieldTypes,
      options: []
    }
  },
  computed: {
    ...mapGetters(['apiUrl', 'fetchInit']),
    fieldOptions() {
      const opt = []
      for(let key in fieldTypes){
        opt.push({text: fieldTypes[key], value: key})
      }
      return  opt
    }
  },
  methods: {
    async onSaveField(value, {resetForm}) {
      let field = Object.assign({}, value)
      if(field.options && typeof field.options === 'string'){
        field.options = field.options.split('\n')
      }
      console.log('id: ' + this.editedId)
      let method = 'post'
      let url = this.apiUrl('/field')
      if(this.editedId !== -1) {
        method = 'put'
        url = this.apiUrl('/field' + '/' + this.editedId)
        field.id = this.editedId
      }

      let resp = await fetch(url, this.fetchInit(method, field))
      let json = await resp.json()
      let newField = json

      resetForm();
      this.$emit('submit', newField)
    },
    isOptionsAvailable(val) {
      return ['RADIO_BUTTON', 'CHECKBOX', 'COMBOBOX'].includes(val)
    },
  },
  emits: ['submit']
}
</script>
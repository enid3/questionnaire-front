<template>
  <BForm
      @submit="onSaveField"
      :validation-schema="schema"
      :error="error"
      :is-action-completed="isActionCompleted"
      :initial-values="field"

  >
    <template #fields="{values}">
      <div class="container-sm p-0">
        <BFormGroup
            class="row justify-content-sm-start"
            label="Label"
            label-cols="3"
        >
          <div class='col-9'>
            <BFormInput
                name="label"
            />
            <BInvalidFeedback name="label"/>
          </div>
        </BFormGroup>

      <BFormGroup
          class="row justify-content-sm-start"
          label="Type"
          label-cols="3"
      >
        <div class='col-9'>
          <BFormSelect
              name="type"
              v-model="type"
              :options="fieldOptions"
          />
          <BInvalidFeedback name="type"/>
        </div>
      </BFormGroup>

      <BFormGroup
          class="row justify-content-sm-start"
          label="Options"
          label-cols="3"
      >
        <div class="col-9">
          <OptionsInput
              name="options"
              :disabled="!isOptionsAvailable(values.type)"
          />
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
      </div>
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
import {mapActions, mapGetters} from "vuex";
import * as yup from "yup";
import ServerSideError from "@/components/util/ServerSideError";

function fieldCountPerType(type) {
  console.log("checking for: " + type)
  let val = 0
  switch (type){
    case 'RADIO_BUTTON':
    case 'COMBOBOX':
      val = 2;
      break;
    case 'CHECKBOX':
      val = 1;
      break;
    default:
      val = 0;
  }
  return val
}

export default {
  name: "ManageFieldForm",
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      fieldTypes,
      type: "",
      error: "",
      isActionCompleted: false
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
    },
    schema() {
      return {
        label: yup.string().required().min(2).max(20),
        type: yup.string().required(),
        options: (val) => {
          let requiredParamsCount = fieldCountPerType(this.type)

          if (val.length < requiredParamsCount){
            return "Required at least " + requiredParamsCount + " options";
          }

          return true;
        }
      }

    }
  },
  methods: {
    ...mapActions(['createField', 'updateField']),
    async onSaveField(value, {resetForm}) {
      this.isActionCompleted = false;

      let f = Object.assign({}, this.field, value);
      if(f.options && typeof f.options === 'string'){
        f.options = f.options.split('\n');
      }

      this.error = "";
      try {
        let newField;
        console.log(f)
        if(f.id){
          newField = await this.updateField(f);
        } else {
          newField = await this.createField(f);
        }
        resetForm();
        this.isActionCompleted = false;
        this.$emit('submit', newField);
      }
      catch (resp) {
        let json = await resp.json()
        this.error = json.message
      }
    },
    isOptionsAvailable(val) {
      return ['RADIO_BUTTON', 'CHECKBOX', 'COMBOBOX'].includes(val)
    },
  },
  emits: ['submit'],
  components: {BSubmit, BFormCheckbox, BFormSelect, OptionsInput, BForm, BFormInput, BFormGroup, BInvalidFeedback, Field, ServerSideError},
}
</script>
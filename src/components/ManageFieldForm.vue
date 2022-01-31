<template>
  <form>
    <div class="container-sm">
      <div class="row justify-content-sm-start gy-1">
        <div class="col-2">
          <label
              for="fieldLabel"
              class="col-form-label"
          >
            Label
          </label>
        </div>
        <div class="col-10">
          <input
              id="fieldLabel"
              type="text"
              class="form-control"
              required
              :value="label"
              @input="$emit('update:label', $event.target.value)"
          />
        </div>

        <div class="w-100"></div>

        <div class="col-2">
          <label
              for="fieldType"
              class="col-form-label"
          >
            Type
          </label>
        </div>
        <div class="col-10">
          <select
              id="fieldType"
              class="form-control"
              required
              :value="type"
              @change="$emit('update:type', $event.target.value)"
          >
            <option
                disabled
                value=""
            >
              Please select one
            </option>
            <option
                v-for="(name, val) in fieldTypes"
                :value="val"
            >
              {{name}}
            </option>
          </select>
        </div>

        <div class="w-100"></div>

        <div class="col-2">
          <label
              for="fieldOptionsString"
              class="col-form-label"
          >
            Options
          </label>
        </div>
        <div class="col-10">
          <OptionsInput
              id="fieldOptionsString"
              :disabled="!isOptionsAvailable"
              :model-value="options"
              @update:modelValue="$emit('update:options', $event)"
          />
        </div>

        <div class="w-100"></div>
      </div>

      <div class="row justify-content-center">
        <div class="col-auto form-check">
          <input
              class="form-check-input"
              type="checkbox"
              id="isRequired"
              :checked="isRequired"
              @change="$emit('update:isRequired', $event.target.checked)"
          />
          <label
              class="form-check-label"
              for="isRequired"
          >
            Required
          </label>
        </div>
        <div class="col-auto form-check">
          <input
              class="form-check-input"
              type="checkbox"
              id="isActive"
              :checked="isActive"
              @change="$emit('update:isActive', $event.target.checked)"
          />
          <label
              class="form-check-label"
              for="isActive"
          >
            Active
          </label>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import OptionsInput from "@/components/OptionsInput";
import fieldTypes from "@/FieldTypes";

export default {
  name: "ManageFieldForm",
  components: {OptionsInput},
  props: {
    label: String,
    type: String,
    options: [],
    isRequired: Boolean,
    isActive: Boolean
  },
  data() {
    return {
      fieldTypes
    }
  },
  computed: {
    isOptionsAvailable() {
      console.log("recalculating ")
      console.log("type: " + this.type)
      return ['RADIO_BUTTON', 'CHECKBOX', 'COMBOBOX'].includes(this.type)
    }
  },
  emits: [
    'update:label', 'update:type',
    'update:options', 'update:isRequired',
    'update:isActive'
  ]
}
</script>
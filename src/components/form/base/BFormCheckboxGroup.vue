<template>
<div>
  <template v-for="option in options">
    <div class="form-check">
      <Field
          :name="name"
          type="checkbox"
          :value="option"
      />
      {{ option }}
    </div>
  </template>
</div>
</template>

<script>
import BFormCheckbox from "@/components/form/base/BFormCheckbox";
import {Field} from "vee-validate";

function generateOptionsHolder(options) {
  let obj = {}
  options.forEach(option => obj[option] = false)
  return obj
}
export default {
  name: "BFormCheckboxGroup",
  props: {
    modelValue: String,
    options: Array,
    name: String
  },
  data() {
    return {
      valuesHolder: Object.assign({}, generateOptionsHolder(this.options))
    }
  },
  methods: {
    update() {
      let newVaue = ''
      this.$emit(
          'update:modelValue',
          Object.keys(this.valuesHolder).filter(key => this.valuesHolder[key]).join(' '))
    }
  },
  components: { BFormCheckbox, Field },
}
</script>
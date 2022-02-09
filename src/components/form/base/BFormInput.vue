<template>
  <Field
      v-slot="{field, meta}"
      v-model="value"
  >
    <input
        :class="{'is-invalid': meta.touched & !meta.valid}"
        class="form-control"
        :placeholder="placeholder"
        :type="type"
        v-bind="field"
    />
  </Field>
</template>

<script>
import {Field} from "vee-validate";

export default {
  name: "BFormInput",
  props:  {
    modelValue: String,
    placeholder: String,
    type: String
  },
  computed: {
    value: {
      get() { return this.modelValue },
      set(val) { this.$emit('update:modelValue', val) }
    }
  },
  emits: ['update:modelValue'],
  components: {Field}

}
</script>
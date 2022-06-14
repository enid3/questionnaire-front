<template>
<Field
    v-slot="{field, meta}"
    v-model="value"
>
  <textarea
      :class="{'is-invalid': meta.touched & !meta.valid}"
      class="form-control"
      :placeholder="placeholder"
      v-bind="field"
      :rows="rows"
      >
  </textarea>
</Field>
</template>

<script>

import {Field} from "vee-validate";

export default {
  name: "BFormTextArea",
  props: {
    modelValue: String,
    rows: {
      type: Number,
      default:3
    },
    placeholder: String
  },
  computed: {
    value: {
      get() { return this.modelValue },
      set(val) { this.$emit('update:modelValue', val) }
    }
  },
  components: {Field},
  emits: ['update:modelValue']
}
</script>

<template>
  <Field
      v-slot="{field, meta}"
      v-model="value"
  >
    <select
        :class="{'is-invalid': meta.touched & !meta.valid}"
        class="form-select"
        v-bind="field"
    >
      <option value="">
        Please select one
      </option>
      <template v-for="(option, index) in options">
        <option
            v-if="typeof option === 'object'"
            :key="'obj-' + index"
            :value="option.value"
        >
          {{option.text}}
        </option>
        <option
            v-else-if="typeof option === 'string'"
            :key="index"
            :value="option"
        >
          {{option}}
        </option>
      </template>
    </select>
  </Field>
</template>

<script>
import {Field} from "vee-validate";

export default {
  name: "BFormSelect",
  props: {
    modelValue: String,
    options: Array,
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
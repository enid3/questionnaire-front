<template>
<div>
  <template v-for="option in options">
    <div class="form-check">
      <Field
          :name="name"
          type="radio"
          :value="option"
      />
      {{ option }}
    </div>
  </template>
</div>
</template>

<script>
import BFormRadio from "@/components/form/base/BFormRadio";
import {Field} from "vee-validate";

export default {
  name: "BFormRadioGroup",
  props: {
    modelValue: String,
    options: Array,
    name: String
  },
  computed: {
    value: {
      get() { return this.modelValue},
      set(val) { return this.$emit('update:modelValue', val) }
    }
  },
  components: { BFormRadio, Field },
}
</script>

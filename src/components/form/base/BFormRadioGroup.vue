<template>
<BFormGroupLayout>
  <div
      class="form-check col-6"
      v-for="option in options"
      :key="option"
  >
    <Field
        :name="name"
        type="radio"
        :value="option"
    />
    {{ option }}
  </div>
</BFormGroupLayout>
</template>

<script>
import BFormRadio from "@/components/form/base/BFormRadio";
import {Field} from "vee-validate";
import BFormGroupLayout from "@/components/layouts/BFormGroupLayout";

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
  components: {BFormGroupLayout, BFormRadio, Field },
}
</script>

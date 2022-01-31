<template>
<div>
  <BFormRadio
      v-for="radioValue in values"
      :key="radioValue"
      :name="name"
      :radioValue="radioValue"
      v-model="value"
  >
    {{ radioValue }}
  </BFormRadio>
</div>
</template>

<script>
import BFormRadio from "@/components/form/BFormRadio";

export default {
  name: "BFormRadioGroup",
  props: {
    modelValue: String,
    values: Array,
    name: String
  },
  computed: {
    value: {
      get() { return this.modelValue},
      set(val) { return this.$emit('update:modelValue', val) }
    }
  },
  components: { BFormRadio },
}
</script>

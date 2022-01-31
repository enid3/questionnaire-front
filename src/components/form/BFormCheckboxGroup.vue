<template>
<div>
  <BFormCheckbox
      v-for="option in options"
      :key="option"
      v-model="valuesHolder[option]"
      @update:modelValue="update(option, $event)"
  >
    {{ option }}
  </BFormCheckbox>
</div>
</template>

<script>
import BFormCheckbox from "@/components/form/BFormCheckbox";

function generateOptionsHolder(options) {
  let obj = {}
  options.forEach(option => obj[option] = false)
  return obj
}
export default {
  name: "BFormCheckboxGroup",
  props: {
    modelValue: Array,
    options: Array
  },
  data() {
    return {
      valuesHolder: Object.assign({}, generateOptionsHolder(this.options))
    }
  },
  methods: {
    update() {
      this.$emit(
          'update:modelValue',
          Object.keys(this.valuesHolder).filter(key => this.valuesHolder[key]))
    }
  },
  components: { BFormCheckbox },
}
</script>
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
    modelValue: String,
    options: Array
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
  components: { BFormCheckbox },
}
</script>
<template>
  <div class="form-check">
    <input
        :id="id"
        :name="name"
        class="form-check-input"
        type="radio"
        :value="radioValue"
        v-model="value"
    >
    <label
        :for="id"
        class="form-check-label"
        >
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "BFormRadio",
  props: {
    modelValue: String,
    radioValue: String,
    name: String,
  },
  data() {
    return {
      id: null
    }
  },
  computed: {
    value: {
      get() { return this.modelValue},
      set(val) { return this.$emit('update:modelValue', val) }
    }
  },
  emits: ['update:modelValue'],
  mounted () {
    this.id = this._uid
  }
}
</script>

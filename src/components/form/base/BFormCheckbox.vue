<template>
  <div class="form-check">
    <input
        class="form-check-input"
        type="checkbox"
        v-model="value"
    >
    <label class="form-check-label" >
      <slot></slot>
    </label>
  </div>
</template>

<script>
import {Field, useField} from "vee-validate";

export default {
  name: "BFormCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      //required: true
    },
    name: {
      type: String,
      required: false,
    },
  },
  setup(props, ctx) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.modelValue,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
  computed: {
    value: {
      get() {
        return this.inputValue
        //return this.value
      },
      set(val) {
        this.handleChange(val)
        this.$emit('update:modelValue', val)
      }
    },
  },
  components: {Field},
  emits: ['update:modelValue']
}
</script>

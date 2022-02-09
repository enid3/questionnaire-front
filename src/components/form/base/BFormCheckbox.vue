<template>
  <Field
      :name="name"
      v-slot="{field, meta,value, resetField}"
      v-model="modelValue"
  >
    <div class="form-check">
      <input
          class="form-check-input"
          type="checkbox"
          v-model="modelValue"
      >
      <label class="form-check-label" >
        <slot></slot>
      </label>
    </div>
  </Field>
</template>

<script>
import {Field} from "vee-validate";

export default {
  name: "BFormCheckbox",
  props: {
    name: String
  },
  data(){
    return {
      modelValue: true
    }
  },
  components: {Field},
}
</script>

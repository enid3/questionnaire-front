<template>
<div
    class="flex-fill"
    :class="{
      'disable-div': disabled,
      'is-invalid': meta.touched & !meta.valid
     }"
>
  <div
      v-if="options.length"
      class="mb-2 bg-secondary bg-light p-1  border "
  >
    <div
        class="badge rounded-pill bg-primary ms-1 mt-1"
        v-for="(opt, idx) in options"
    >
      <span class="option align-baseline">{{opt}}</span>
      <button class="btn-close"
              @click.prevent="() => remove(idx)" />
    </div>
  </div>

  <div class="row">

    <div class="col-11">
      <input
          type="text"
          class="form-control"
          v-model="newOption"
          @keydown.enter.prevent="submitOption"
      >
    </div>
      <button
          class="btn p-0 col-1"
          type="button"
          @click.prevent="resetOptions"
      >
        <i class="bi bi-arrow-clockwise"></i>
      </button>

  </div>
</div>
</template>

<script>
import {useField, useFieldArray} from 'vee-validate'
import {toRef} from "vue";

export default {
  props: {
    modelValue: {
      type: Array,
      //required: true
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false
    }
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

  data() {
    return {
      newOption: ""
    }
  },
  computed: {
    options: {
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
  methods: {
    remove(id, event) {
      console.log(event)

      this.options.splice(id, 1)
    },
    submitOption(event){
      let trimmed = this.newOption.trim()
      if(trimmed){
        this.options.push(this.newOption.trim())
        this.newOption = ""
      }

    },
    resetOptions() {
      this.options = []
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.badge {
  font-size: 0.85em;
}
.btn-close{
  vertical-align: middle;
}

.disable-div {
  pointer-events: none;
  opacity: 0.4;
}
</style>

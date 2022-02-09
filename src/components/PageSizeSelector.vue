<template>
  <select class="form-select" v-model="pageSize">
    <option :value="99999999" >All</option>
    <option
        v-for="size in sizes"
        :key="size"
        :value="size"
    >
      {{size}}
    </option>
  </select>
</template>
<script>
export default {
  name: "PageSizeSelector",
  props: {
    modelValue: Number,
    sizes: Array
  },
  computed: {
      pageSize: {
      get() {
        return this.modelValue
      },
      set(val) {
        console.log("perPage changed to: " + val)
        this.$emit('update:modelValue', val)
      }

    }
  },
  emits: ['update:modelValue'],

}
</script>
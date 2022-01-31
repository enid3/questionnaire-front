<template>
  <div class="hello">
    <OptionsInput
        :modelValue="options"
        @update:modelValue="options = $event"
    />
  </div>
</template>

<script>
import DataTable from "@/components/DataTable";
import OptionsInput from "@/components/OptionsInput";
export default {
  name: 'HelloWorld',
  data() {
    return {
      options: []
    }
  },
  watch: {
    options: function (val) {
      console.log('options changed too ' +  val)
    }

  },
  components: {OptionsInput, DataTable},
}
</script>


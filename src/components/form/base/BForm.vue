<template>
  <Form
      v-slot="slot"
  >
    <slot v-bind="slot" ></slot>
  </Form>
</template>

<script>
import {Form} from "vee-validate";

export default {
  name: 'BForm',
  components: {Form}
}
</script>
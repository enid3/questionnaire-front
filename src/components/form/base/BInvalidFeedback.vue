<template>
  <div class="invalid-feedback">
    <ErrorMessage as="" :name="name" />
  </div>
</template>

<script>
import {ErrorMessage} from "vee-validate";

export default {
  name: "BInvalidFeedback",
  props: {
    name: {
      type: String,
      required: true,
    }
  },
  components: { ErrorMessage }
}
</script>
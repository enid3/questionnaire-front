<template>
<data-input-page-layout>
  <template #body>
    <Form
        :initialValues="{field: '123',fieldcb: true, checkbox: false}"
        v-slot="{values}"

    >
      <div>
        {{values}}
      </div>
    <Field name="field"/>
      <BFormCheckbox
          name="checkbox"

      >
        some checkbox
      </BFormCheckbox>

    </Form>
    {{cb}}
    <BFormCheckbox
        name="checkbox"
        v-model="cb"

    >
      some checkbox
    </BFormCheckbox>
  </template>
</data-input-page-layout>
</template>

<script>
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import BFormCheckbox from "@/components/form/base/BFormCheckbox";
import {Field, Form} from "vee-validate";
export default {
  name: "CheckboxTest",
  data() {
    return {
      cb: false
    }
  },
  components: {BFormCheckbox, DataInputPageLayout, Form, Field}
}
</script>

<style scoped>

</style>
<template>
  <data-input-page-layout>
    <template #body>
      <Form
          :initialValues="{field: '123', textarea: '123'}"
          v-slot="{values}"

      >
        <div>
          {{values}}
        </div>
        <Field name="field"/>
        <BFormTextArea
            name="textarea"
        />

      </Form>
    </template>
  </data-input-page-layout>
</template>

<script>
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import BFormCheckbox from "@/components/form/base/BFormCheckbox";
import {Field, Form} from "vee-validate";
import BFormTextArea from "@/components/form/base/BFormTextarea";
export default {
  name: "TextAreaTest",
  data() {
    return {
      cb: true
    }
  },
  components: {BFormTextArea, BFormCheckbox, DataInputPageLayout, Form, Field}
}
</script>

<style scoped>

</style>

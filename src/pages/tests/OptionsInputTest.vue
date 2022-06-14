<template>

  <DataInputPageLayout>
    <template #body>


      <Form
          @submit="onSubmit"
          :initialValues="{options: ['a', 'b']}"
      >
          <OptionsInputForm
              name="options"

          />

        <button class="btn btn-primary">Submit</button>
      </Form>
    </template>

  </DataInputPageLayout>
</template>

<script>
import OptionsInputForm from "@/components/form/OptionsInputForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import {Field, Form} from "vee-validate";
export default {
  name: "OptionsInputTest",
  data() {
    return {
      options: ["first", "second", "third"]
    }
  },
  methods: {
    onSubmit(values) {
      console.log("in form submit")
      console.log(values)

      //value.preventDefault()
      },
  },
  components: {OptionsInputForm, DataInputPageLayout, Form, Field},

}
</script>

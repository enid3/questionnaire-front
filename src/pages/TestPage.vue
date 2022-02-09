<template>
  <DataInputPageLayout>
    <template #body>

      <b-form v-slot="{values}">
      {{values}}
      <b-form-checkbox-group
          name="test"
          :options="[1,2,3,4]"
      ></b-form-checkbox-group>
      </b-form>
    </template>
  </DataInputPageLayout>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import BFormInput from "@/components/form/base/BFormInput";
import BFormGroup from "@/components/form/base/BFormGroup";
import BForm from "@/components/form/base/BForm";
import CardLayout from "@/components/layouts/Cardlayout";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import BFormCheckboxGroup from "@/components/form/base/BFormCheckboxGroup";
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'


export default {
  components: {
    BFormCheckboxGroup,
    BInvalidFeedback,
    DataInputPageLayout,
    CardLayout,
    BFormGroup,
    BForm,
    Field,
    ErrorMessage,
    BFormInput
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    })

    return {
      schema,
      form: {email: "", password: ""}
    };
  },
  methods: {
    onSubmit(values) {
      console.log(JSON.stringify(this.form))
      // Submit values to API...
      alert(JSON.stringify(values, null, 2));
    },
    onInvalidSubmit({ values, errors, results }) {

      console.log(values); // current form values
      console.log(errors); // a map of field names and their first error message
      console.log(results); // a detailed map of field names and their validation results
    },
  },

};
</script>

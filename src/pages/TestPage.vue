<template>
  <DataInputPageLayout>
    <template #body>
      <ManageFieldForm
          :editedId="-1"
          :initialValues=" {
            label: 'label',
            type: 'CHECKBOX',
            options: ['op1', 'op2', 'op3'],
          }"
          ref="manage"
      />
      <button class="btn btn-primary" @click="trySubmit"> submit</button>
    </template>
  </DataInputPageLayout>
</template>

<script>
import {Field, ErrorMessage, Form} from 'vee-validate';
import BFormInput from "@/components/form/base/BFormInput";
import BFormGroup from "@/components/form/base/BFormGroup";
import BForm from "@/components/form/base/BForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import BInvalidFeedback from "@/components/form/base/BInvalidFeedback";
import BFormCheckboxGroup from "@/components/form/base/BFormCheckboxGroup";
import ManageFieldForm from "@/components/form/ManageFieldForm";
import OptionsInputForm from "@/components/form/OptionsInputForm";


export default {
  components: {
    OptionsInputForm,
    ManageFieldForm,
    BFormCheckboxGroup,
    BInvalidFeedback,
    DataInputPageLayout,
    BFormGroup,
    BForm,
    Field,
    Form,
    ErrorMessage,
    BFormInput
  },
  methods: {
    trySubmit(){
      console.log(this.$refs.manage)
      //this.$refs.manage.submitForm()
      //this.$refs.manage.$el.submit()
    }
  },

};
</script>

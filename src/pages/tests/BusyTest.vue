<template>
  <DataInputPageLayout>
    <template v-slot:body>
      <div>Busy: {{busy}}</div>
        <BForm :busy="busy">
          <div>Text: {{text}}</div>
          <div>Email: {{email}}</div>

          <BFormTextArea v-model="text" name="val"/>
          <BFormInput
              class="mt-2"
              name="email"
              type="email"
              placeholder="Email"
          />
        </BForm>
    </template>
    <template v-slot:footer>
      <BFormCheckbox v-model="busy" >
        Busy
      </BFormCheckbox>
    </template>
  </DataInputPageLayout>


</template>

<script>
import BusyWrapper from "@/components/util/BusyWrapper";
import BFormTextArea from "@/components/form/base/BFormTextarea";
import BForm from "@/components/form/base/BForm";
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
import BFormCheckbox from "@/components/form/base/BFormCheckbox";
import BFormGroup from "@/components/form/base/BFormGroup";
import BFormInput from "@/components/form/base/BFormInput";
export default {
  name: "BusyTest",
  components: {BFormCheckbox, DataInputPageLayout, BForm, BFormTextArea, BusyWrapper, BFormInput, BFormGroup},
  data() {
    return {
      busy: false,
      text: ""
    }
  }

}
</script>

<style scoped>

</style>
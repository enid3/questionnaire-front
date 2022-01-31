<template>
  <DataInputPageLayout>

    <template v-slot:body>
      <div class="text-center">
        <h3>Thank you!</h3>
        <p class="fs-3"> Your response was saved.</p>
      </div>
    </template>

  </DataInputPageLayout>
</template>

<script>
import DataInputPageLayout from "@/components/layouts/DataInputPageLayout";
export default {
  name: "SuccessSubmitPage",
  components: {DataInputPageLayout}
}
</script>
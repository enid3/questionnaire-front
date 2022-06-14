<template>
    <Form
      v-slot="slot"
    >
      <BusyWrapper :busy="slot.isSubmitting && slot.meta.valid">
        <template #default>
          <slot>
            <slot name="fields" v-bind="slot"></slot>

            <ServerSideError class="m-2" :error="error"/>
            <ActionCompletedSuccessfully class="m-2" v-if="isActionCompletedSuccessfully"/>

            <slot name="controls" v-bind="slot"> </slot>
          </slot>
        </template>
      </BusyWrapper>
    </Form>
</template>

<script>
import {Form} from "vee-validate";
import BusyWrapper from "@/components/util/BusyWrapper";
import ServerSideError from "@/components/util/ServerSideError";
import ActionCompletedSuccessfully from "@/components/ActionCompletedSuccesfully";

export default {
  name: 'BForm',
  props: {
    error: {
      type: String,
      required: false,
      default: ""
    },
    isActionCompleted: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    isActionCompletedSuccessfully() {
      return this.isActionCompleted && !this.error
    }

  },
  components: {ActionCompletedSuccessfully, ServerSideError, BusyWrapper, Form}
}
</script>
<template>
  <div class="row justify-content-center pt-5">
    <div class="card p-0 card col-10 col-sm-7 col-md-5 col-lg-4 col-xxl-3">
      <div
          v-if="$slots.header"
          class="card-header"
      >
        <slot name="header"></slot>
      </div>
      <BusyWrapper :busy="busy">
        <div
            v-if="$slots.body"
            class="card-body"
        >
          <slot name="body"></slot>
        </div>
        <div
            v-if="$slots.footer"
            class="card-footer"
        >
          <slot name="footer"></slot>
        </div>
      </BusyWrapper>
    </div>
  </div>
</template>

<script>
import BusyWrapper from "@/components/util/BusyWrapper";
export default {
  name: 'DataInputPageLayout',
  props: {
    busy: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {BusyWrapper},
}
</script>
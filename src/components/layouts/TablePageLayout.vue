<template>
  <div class="justify-content-center container-xxl pt-5">
    <div class="card">
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
          <slot name="body">
            <br>
            <br>
          </slot>
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
  name: 'TablePageLayout',
  components: {BusyWrapper},
  props: {
    busy: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

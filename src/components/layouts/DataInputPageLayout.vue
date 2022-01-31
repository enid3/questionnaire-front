<template>
  <div class="row justify-content-center">
    <div class="card p-0 card col-10 col-sm-7 col-md-5 col-lg-4 col-xxl-3">
      <div
          v-if="$slots.header"
          class="card-header"
      >
        <slot name="header"></slot>
      </div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataInputPageLayout'
}
</script>
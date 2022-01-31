<template>
  <div class="container-md">
    <div class="card">
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
  name: 'TablePageLayout'
}
</script>

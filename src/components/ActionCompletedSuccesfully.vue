<template>
<div
    class="alert alert-success text-center"
    role="alert"
>
  <slot>
    Successfully completed
  </slot>
</div>
</template>

<script>
export default {
  name: "ActionCompletedSuccessfully",
}
</script>
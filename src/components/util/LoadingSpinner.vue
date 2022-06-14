<template>
  <img
      :src="emoteStorage.getRandomEmotePath()"
      width="40"
      height="40"
      alt="pepe"
  />
  <slot>
    <span class="ps-2 fs-4 text-center">
        Loading...
    </span>
  </slot>
</template>

<script>
import emotes from "@/emotes";

export default {
  name: "LoadingSpinner",
  data() {
    return {
      emoteStorage: emotes
    }
  },

}
</script>
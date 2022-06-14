<template>
  <div
      class="toast show align-items-center"
      :class="getClassesByType(toast.type)"
      role="alert" aria-live="assertive" aria-atomic="true">
    <div class="row g-1">
      <div class="col-11 toast-body">
        <strong>{{getInfoPrefixByType(toast.type)}}</strong>
        {{toast.message}}
      </div>
      <button type="button" @click="deleteNotification(toast.id)" class="btn-close me-2 m-auto col-1" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "BToast",
  props: {
    toast: {
      toast: Object,
      required: true
    },
  },
  methods: {
    ...mapActions(['deleteNotification']),
    getClassesByType(type) {
      let map = {
        success: ['bg-success', 'text-white'],
        error: ['bg-danger', 'text-white'],
        warning: ['bg-warning', 'text-black'],
        info: ['bg-primary', 'text-white'],
      };
      return map[type] || [];
    },
    getInfoPrefixByType(type) {
      let map = {
        success: 'Success!',
        error: 'Error!',
        warning: 'Warning!',
        info: 'Info!'
      };
      return map[type] || [];
    }
  },
}
</script>
<style>
.toast-body {
  font-size: 1rem;
}
</style>

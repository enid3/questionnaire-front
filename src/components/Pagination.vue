<template>
  <ul class="pagination pb-0 mb-0">
    <li class="page-item">
      <a
        class="page-link"
        @click="currentPage = 0"
      >
        <span>&laquo;</span>
      </a>
    </li>
    <li
      v-for="page in totalPages"
      :key="page"
      class="page-item"
      :class="{active: (currentPage === (page - 1))}"
      @click="currentPage = page - 1"
    >
      <a
        class="page-link"
      >
        {{page}}
      </a>
    </li>
    <li class="page-item">
      <a
        class="page-link"
        @click="currentPage = totalPages - 1"
      >
        <span>&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    modelValue: Number,
    totalPages: Number
  },
  computed: {
    currentPage: {
      get(){
        return this.modelValue
      },
      set(val) {
        console.log("currentPage changed to: " + val)
        this.$emit('update:modelValue', val)
      }

    }
  },
  emits: ['update:modelValue'],
  updated() {
    console.log("Pagination updated")
  },
  watch: {
    totalPages: function (val) {
      //this.totalPages.freeze()
      this.currentPage = 0
    }
  }
}
</script>
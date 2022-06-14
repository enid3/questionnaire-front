<template>
  <ul class="pagination pb-0 mb-0">
    <li
        class="page-item"
        :class="{disabled: isToFirstDisabled}"
    >
      <a
        class="page-link"
        @click="currentPage = 0"
      >
        <span>&laquo;</span>
      </a>
    </li>
    <template v-if="totalPages">
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
    </template>
    <template v-else>
      <li class="page-item active">
        <a class="page-link" >-_-</a>
      </li>
    </template>
    <li
        class="page-item"
        :class="{disabled: isToLastPageDisabled}"
    >
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
    },
    isToFirstDisabled() {
      return this.currentPage <= 0;
    },
    isToLastPageDisabled() {
      return this.currentPage >= this.totalPages - 1;
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
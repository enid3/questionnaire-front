<template>
  <span>
    {{firstElement || '*'}}-{{lastElement || '*'}} of {{totalElements || '^_^'}}
  </span>

</template>

<script>
export default {
  name: "PageRepresentationStatus",
  props: {
    currentPage: Number,
    elementsPerPage: Number,
    elementsOnPage: Number,
    totalElements: Number,
  },
  computed: {
    firstElement() {
      return this.currentPage * this.elementsPerPage + Math.min(1, this.totalElements )
    },
    lastElement() {
      return this.currentPage * this.elementsPerPage + this.elementsOnPage
    }
  }

}
</script>

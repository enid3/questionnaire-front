<template>
  <div class="row" :class="{'disabled-div': totalPages <=0}">
    <div class="col-auto me-auto mb-auto mt-auto">
      <PageRepresentationStatus
          :current-page="currentPage"
          :elements-per-page="pageSize"
          :elements-on-page="elementsOnPage"
          :total-elements="totalElements"
      />
    </div>
    <div class="col-auto">
      <Pagination
          :model-value="currentPage"
          @update:model-value="onCurrentPageUpdated"

          :total-pages="totalPages"
      />
    </div>
    <div class="col-auto ms-auto" >
      <PageSizeSelector
          :modelValue="pageSize"
          @update:modelValue="onPageSizeUpdated"
          :sizes="pageSizes"
      />
    </div>
  </div>
</template>
<script>
import PageRepresentationStatus from "@/components/util/table/PageRepresentationStatus";
import PageSizeSelector from "@/components/util/table/PageSizeSelector";
import Pagination from "@/components/util/table/Pagination";

export default {
  name: "PaginationFooter",
  props: {
    currentPage: Number,
    pageSize: Number,

    elementsOnPage: Number,
    totalPages: Number,
    totalElements: Number,

    pageSizes: Array
  },
  methods: {
    onPageSizeUpdated(e) {
      this.$emit('update:pageSize', e)
    },
    onCurrentPageUpdated(e){
      this.$emit('update:currentPage', e)
    }

  },
  emits:[ 'update:pageSize', 'update:currentPage' ],
  components: { PageRepresentationStatus, PageSizeSelector, Pagination }
}
</script>

<style scoped>
.disabled-div {
  pointer-events: none;
  opacity: 0.4;
}
</style>
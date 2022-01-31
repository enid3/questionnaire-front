<template>
  <div class="row">
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
import PageRepresentationStatus from "@/components/PageRepresentationStatus";
import PageSizeSelector from "@/components/PageSizeSelector";
import Pagination from "@/components/Pagination";

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
      console.log('before emmiting currentPage')
      this.$emit('update:pageSize', e)
    },
    onCurrentPageUpdated(e){
      console.log('before emmiting pagintaion')
      this.$emit('update:currentPage', e)
    }

  },
  emits:[ 'update:pageSize', 'update:currentPage' ],
  components: { PageRepresentationStatus, PageSizeSelector, Pagination }
}
</script>
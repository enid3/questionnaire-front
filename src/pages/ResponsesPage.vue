<template>
<div class="container-md">
  <div class="card">
    <div class="card-header">
      <div class="row justify-content-around">
        <div class="col-auto me-auto"><h3>Responses</h3></div>
      </div>
    </div>
    <div class="card-body">
      <DataTable
          :fields="tableFields"
          :items="responses"
      >
      </DataTable>
    </div>
    <div class="card-footer row bg-transparent mt-0 mb-0">
      <PaginationFooter
          v-model:currentPage="currentPage"
          v-model:pageSize="pageSize"
          :total-elements="totalElements"
          :elements-on-page="elementsOnPage"
          :total-pages="totalPages"
          :page-sizes="[25, 10, 5, 3, 2]"

          @change="fetchResponses()"
      />
    </div>
  </div>
</div>
</template>

<script>
import PaginationFooter from "@/components/PaginationFooter";
import DataTable from "@/components/DataTable";
import {mapGetters} from "vuex";

export  default {
  name: "ResponsesPage",
  data() {
    return {
      currentPage: 0,
      pageSize: 0,

      totalElements: 0,
      elementsOnPage: 0,
      totalPages: 0,

      tableFields: [],
      responses: [],

    }
  },
  computed: {
    ...mapGetters(['apiUrl', 'fetchInit'])
  },
  methods: {
    async fetchLabels() {
      this.tableFields = []
      let url = this.apiUrl('/field/label')
      let resp = await fetch( url, this.fetchInit('get') )
      let json = await resp.json()
      json.forEach(dto => this.tableFields.push({'key': dto.id, 'label': dto.label}))

    },

    async fetchResponses() {
      this.responses = []
      let url = this.apiUrl('/response')
      let params = {
        'page': this.currentPage,
        'count': this.pageSize
      }
      url.search = new URLSearchParams(params).toString()
      let resp = await fetch( url, this.fetchInit('get') )
      let json = await resp.json()
      this.totalPages = json.totalPages;
      this.totalElements = json.totalElements;
      this.elementsOnPage = json.numberOfElements;
      json.content.forEach(r => this.responses.push(r.responses))
    },
  },
  watch: {
    currentPage: function (val, oldVal) {
      //this.fetchLabels()
      this.fetchResponses()
    },
  },
  mounted() {
    this.fetchLabels()
    this.fetchResponses()
  },

  components: {PaginationFooter, DataTable}
}
</script>
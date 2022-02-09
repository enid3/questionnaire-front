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
          :busy="!isTableReady"
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
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

export  default {
  name: "ResponsesPage",
  data() {
    return {
      isTableReady: false,
      currentPage: 0,
      pageSize: 10,

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
      this.isTableReady = false
      this.responses = []
      let url = this.apiUrl('/response')
      let params = {
        'page': this.currentPage,
        'size': this.pageSize
      }
      url.search = new URLSearchParams(params).toString()
      let resp = await fetch( url, this.fetchInit('get') )
      let json = await resp.json()
      this.totalPages = json.totalPages;
      this.totalElements = json.totalElements;
      this.elementsOnPage = json.numberOfElements;
      json.content.forEach(r => this.responses.push(r.responses))
      this.isTableReady = true
    },
    addResponseToTable(response){
      console.log("adding " + response + " to tabl3")
     this.responses.push(response.responses)
    }
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

    const url = 'http://localhost:8080/responses';
    const socket = new SockJS(url)
    const client = Stomp.over(socket);
    client.connect({}, (frame) => {
      client.subscribe("/topic/responses",
          (val) => {this.addResponseToTable(JSON.parse(val.body));})
    })
  },

  components: {PaginationFooter, DataTable}
}
</script>
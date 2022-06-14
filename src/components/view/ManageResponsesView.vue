<template>
<div>

  <TablePageLayout
      :busy="!isTableReady"
  >
    <template v-slot:header>
      <div class="d-flex flex-wrap justify-content-end">
        <div class="flex-fill">
          <slot name="header">
            <QuestionnaireHeader :questionnaire="currentQuestionnaire">
              <template #header> Responses</template>
            </QuestionnaireHeader>
          </slot>
        </div>
        <div>
          <RefreshControl
              @click="fetchResponses"
          >
          </RefreshControl>
        </div>
      </div>
    </template>

    <template v-slot:body>
      <DataTable
          :fields="tableFields"
          :items="responses"
      />
    </template>

    <template v-slot:footer>
      <PaginationFooter
          v-model:currentPage="currentPage"
          v-model:pageSize="pageSize"
          :total-elements="totalElements"
          :elements-on-page="elementsOnPage"
          :total-pages="totalPages"
          :page-sizes="[25, 10, 5, 3, 2]"

          @change="fetchResponses()"
      />
    </template>
  </TablePageLayout>
</div>
</template>

<script>
import PaginationFooter from "@/components/PaginationFooter";
import DataTable from "@/components/util/table/DataTable";
import {mapGetters, mapActions} from "vuex";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import TablePageLayout from "@/components/layouts/TablePageLayout";
import QuestionnaireHeader from "@/components/util/QuestionnaireHeader";
import RefreshControl from "@/components/form/controls/RefreshControl";

export  default {
  name: "ManageResponsesView",
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
    ...mapGetters(['apiUrl', 'fetchInit', 'currentQuestionnaire'])
  },
  methods: {
    ...mapActions(['getCurrentQuestionnaireActiveFieldLabels', 'getQuestionnaireResponses', 'setCurrentQuestionnaire']),
    async fetchLabels() {
      this.isTableReady = false;
      this.tableFields = [];
      this.responses = [];

      try {
        let json = await this.getCurrentQuestionnaireActiveFieldLabels();
        json.forEach(dto => this.tableFields.push({'key': dto.id, 'label': dto.label}));
      }
      catch (e) {
        console.log('Error occurred when fetching labels');
        console.log(e);
      }

    },
    async fetchResponses() {
      this.isTableReady = false;

      this.responses = [];

      try {
        let json = await this.getQuestionnaireResponses({page: this.currentPage, size: this.pageSize});
        this.totalPages = json.totalPages;
        this.totalElements = json.totalElements;
        this.elementsOnPage = json.numberOfElements;
        json.content.forEach(r => this.responses.push(r.responses));
        this.isTableReady = true;
      }
      catch (e) {
        console.log('Error occurred when fetching responses');
        console.log(e);
      }
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
    currentQuestionnaire: function (val, oldVal) {
      console.log()
      this.fetchLabels();
      this.fetchResponses();
    },
  },
  mounted() {
    let id = parseInt(this.$route.params.id);

    this.setCurrentQuestionnaire(id);
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

  components: {RefreshControl, QuestionnaireHeader, TablePageLayout, PaginationFooter, DataTable}
}
</script>
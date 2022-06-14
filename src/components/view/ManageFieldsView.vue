<template>
  <TablePageLayout
      :busy="!isTableReady"
  >
    <template v-slot:header>
      <div class="d-flex flex-wrap justify-content-end">
        <div class="flex-fill">
          <slot name="header">
            <QuestionnaireHeader :questionnaire="currentQuestionnaire">
              <template #header> Fields</template>
            </QuestionnaireHeader>
          </slot>
        </div>
        <div>
          <AddControl
               @click="initialField = {label: '', type: '', options: [], isRequired: true, isActive: true};"
               data-bs-toggle="modal" data-bs-target="#manageFieldModal"
          >
          </AddControl>
          <RefreshControl
               @click="fetchFields"
          >
          </RefreshControl>
        </div>
      </div>
    </template>

    <template v-slot:body>
      <DataTable
          :fields="tableFields"
          :items="fieldsArray"
      >
        <template #cell(type)="data">
                                  {{ fieldTypes[data.value] }}
                                  </template>
        <template #cell(modify)="data">
          <div class="justify-content-end row">
            <EditControl
                @click="initialField=data.item;"
                class="btn col-auto p-1"
                data-bs-toggle="modal"
                data-bs-target="#manageFieldModal"
            >
            </EditControl>
            <DeleteControl class="col-auto p-1 me-2" @click="deleteField(data.item.id)">
              <i class="bi-trash-fill"></i>
            </DeleteControl>
          </div>
        </template>
      </DataTable>
    </template>
    <template v-slot:footer>
      <PaginationFooter
          v-model:currentPage="currentPage"
          v-model:pageSize="pageSize"
          :total-elements="totalElements"
          :elements-on-page="elementsOnPage"
          :total-pages="totalPages"
          :page-sizes="[25, 10, 5, 3, 2]"

          @change="fetchFields()"
      />
    </template>
  </TablePageLayout>

  <ManageFieldModal
      @submit="handleChangeInLocalData"
      :field="initialField"
  ></ManageFieldModal>
</template>

<script>
import DeleteFieldButton from "@/components/field/DeleteFieldButton";
import fieldTypes from "@/FieldTypes";
import DataTable from "@/components/util/table/DataTable";
import PaginationFooter from "@/components/PaginationFooter";
import ManageFieldForm from "@/components/form/ManageFieldForm";
import TablePageLayout from "@/components/layouts/TablePageLayout";


import {mapGetters, mapActions} from 'vuex'
import QuestionnairePicker from "@/components/form/QuestionnairePicker";
import QuestionnaireHeader from "@/components/util/QuestionnaireHeader";
import AddControl from "@/components/form/controls/AddControl";
import RefreshControl from "@/components/form/controls/RefreshControl";
import EditControl from "@/components/form/controls/EditControl";
import DeleteControl from "@/components/form/controls/DeleteControl";
import ManageQuestionnaireModal from "@/components/util/modal/ManageQuestionnaireModal";
import ManageFieldModal from "@/components/util/modal/ManageFieldModal";
export default {
  name: 'ManageFieldsView',
  data() {
    return {
      fieldTypes,

      isTableReady: false,
      currentPage: 0,
      pageSize: 10,

      totalElements: 0,
      elementsOnPage: 0,
      totalPages: 0,

      initialField: {label: "label", type: "", options: [], isRequired: true, isActive: true},

      tableFields: [
        { key: 'label', label: 'Label' },
        { key: 'type', label: 'Type' },
        { key: 'isRequired', label: 'Required' },
        { key: 'isActive', label: 'Active' },
        { key: 'modify', label: '' },
      ],
    fieldsArray: [],

      fieldToDelete: {label: "", type: "DATE", options: []},

    }
  },
  methods: {
    ...mapActions(['getQuestionnaireFields', 'setCurrentQuestionnaire', 'fetchAllOwnQuestionnaires']),
    async fetchFields() {
      if(this.currentPage === -1) {
        console.log('page -1')
        return
      }
      this.isTableReady = false;
      this.fieldsArray = null;

      try {
        let json = await this.getQuestionnaireFields({page: this.currentPage, size: this.pageSize});
        this.totalPages = json.totalPages;
        this.totalElements = json.totalElements;
        this.elementsOnPage = json.numberOfElements;
        this.fieldsArray = json.content;
        this.isLast = json.last;
      }
      catch (e) {
        console.log('Error')
        console.log(e)
      }

      this.isTableReady = true
    },

    handleChangeInLocalData(field) {
      if(field.id) {
        Object.assign(this.fieldsArray.find(f => f.id === field.id), field);
      } else {
        this.totalElements += 1;
        this.fieldsArray.push(field);

        if(this.elementsOnPage < this.pageSize) {
          this.elementsOnPage += 1;
        } else {
          this.fieldsArray.shift();
          this.totalPages = Math.ceil(this.totalElements / this.pageSize)
        }
      }
    },
    async deleteField(id) {
      let url = this.apiUrl('/field/' + id);

      let resp = await fetch( url, this.fetchInit('delete') );
      if(resp.ok) {
        let index = this.fieldsArray.findIndex(f => f.id === id);
        console.log(index)
        if(index >= 0) {
          this.fieldsArray.splice(index, 1);
          --this.totalElements;
          --this.elementsOnPage;
        }

      } else {
        //console.log("some errors")
      }

      this.isTableReady = true
    },
  },
  computed: {
    ...mapGetters(['apiUrl', 'fetchInit', 'currentQuestionnaire'])
  },

  watch: {
    currentPage: function (val, oldVal) {
      this.fetchFields()
    },
    currentQuestionnaire: function (val, oldVal) {
      this.fetchFields()
    },
  },

  mounted() {
    //await this.fetchAllOwnQuestionnaires({force: false});
    let id = parseInt(this.$route.params.id);
    this.setCurrentQuestionnaire(id);
    this.fetchFields();
  },

  components: {
    ManageFieldModal,
    ManageQuestionnaireModal,
    DeleteControl,
    EditControl,
    RefreshControl,
    AddControl,
    QuestionnaireHeader,
    QuestionnairePicker, TablePageLayout, ManageFieldForm, PaginationFooter, DataTable, DeleteFieldButton}
}
</script>

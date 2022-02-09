<template>
  <div>
  <TablePageLayout>
    <template v-slot:header>
      <div class="row justify-content-around">
        <div class="col-auto"><h3>Fields</h3></div>
        <div class="col-auto ms-auto">
          <div class="btn btn-primary"
               @click="saveModalTitle='Add field'; initialField = {label: '', type: '', options: [], isRequired: true, isActive: true}; editedId=-1;"
               data-bs-toggle="modal" data-bs-target="#saveFieldModal" >
            <i class="bi bi-plus"></i> Add field
          </div>
        </div>
      </div>
    </template>

    <template v-slot:body>
      <DataTable
          :fields="tableFields"
          :items="fieldsArray"
          :busy="!isTableReady"
      >
        <template #cell(type)="data">
                                  {{ fieldTypes[data.value] }}
                                  </template>
        <template #cell(modify)="data">
          <div class="justify-content-end row">
            <button
                @click="saveModalTitle='Edit'; initialField=data.item; editedId=data.item.id;"
                class="btn col-auto p-1"
                data-bs-toggle="modal"
                data-bs-target="#saveFieldModal"
            >
              <i class="bi-pencil-square"></i>
            </button>
            <button class="btn col-auto p-1 me-2">
              <i class="bi-trash-fill"></i>
            </button>
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

    <div class="modal fade" id="saveFieldModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{saveModalTitle}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <ManageFieldForm
                @submit="addField"
                :editedId="editedId"
                :initialValues="initialField"
                />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteFieldButton from "@/components/field/DeleteFieldButton";
import fieldTypes from "@/FieldTypes";
import DataTable from "@/components/DataTable";
import PaginationFooter from "@/components/PaginationFooter";
import ManageFieldForm from "@/components/form/ManageFieldForm";
import TablePageLayout from "@/components/layouts/TablePageLayout";


import {mapGetters} from 'vuex'
export default {
  name: 'Fields',
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
      editedId: undefined,

      tableFields: [
        { key: 'label', label: 'Label' },
        { key: 'type', label: 'Type' },
        { key: 'isRequired', label: 'Required' },
        { key: 'isActive', label: 'Active' },
        { key: 'modify', label: '' },
      ],
    fieldsArray: [],

        saveModalTitle: "",

      fieldToDelete: {label: "", type: "DATE", options: []},

    }
  },
  methods: {
    async fetchFields(){
      this.isTableReady = false
      this.fieldsArray = null
      let url = this.apiUrl('/field')
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
      this.fieldsArray = json.content;
      this.isLast = json.last;

      this.isTableReady = true
    },

    addField(value) {
      if(editedId !== -1) {
        let field = this.fieldsArray.find((f) => f.id === editedId)
        field.label = value.label
        field.type = value.type
        field.options = value.options
        field.isRequired = value.isRequired
        field.isActive = value.isActive

      } else {
        console.log(value)
        this.fieldsArray.push(value)
      }
    }



  },
  computed: {
    ...mapGetters(['apiUrl', 'fetchInit'])
  },

  watch: {
    currentPage: function (val, oldVal) {
      this.fetchFields()
    },
  },

  mounted() {
    this.fetchFields()
  },

  components: {TablePageLayout, ManageFieldForm, PaginationFooter, DataTable, DeleteFieldButton}
}
</script>

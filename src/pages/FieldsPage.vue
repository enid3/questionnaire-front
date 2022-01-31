<template>
  <div>
  <TablePageLayout>
    <template v-slot:header>
      <div class="row justify-content-around">
        <div class="col-auto"><h3>Fields</h3></div>
        <div class="col-auto ms-auto">
          <div class="btn btn-primary"
               @click="saveModalTitle='Add field'; editedField = {label: '', type: '', options: [], isRequired: true, isActive: true}"
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
      >
        <template #cell(type)="data">
                                  {{ fieldTypes[data.value] }}
                                  </template>
        <template #cell(modify)="data">
          <div class="justify-content-end row">
            <button
                @click="saveModalTitle='Edit'; editedField=data.item"
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
              v-model:label="editedField.label"
              v-model:type="editedField.type"
              v-model:options="editedField.options"
              v-model:isRequired="editedField.isRequired"
              v-model:isActive="editedField.isActive"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button @click="saveField(this.editedField)" data-bs-dismiss="modal" type="button" class="btn btn-primary">Save</button>
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
import ManageFieldForm from "@/components/ManageFieldForm";
import TablePageLayout from "@/components/layouts/TablePageLayout";


import {mapGetters} from 'vuex'
export default {
  name: 'Fields',
  data() {
    return {
      fieldTypes,

      currentPage: 0,
      pageSize: 0,

      totalElements: 0,
      elementsOnPage: 0,
      totalPages: 0,

      tableFields: [
        { key: 'label', label: 'Label' },
        { key: 'type', label: 'Type' },
        { key: 'isRequired', label: 'Required' },
        { key: 'isActive', label: 'Active' },
        { key: 'modify', label: '' },
      ],
    fieldsArray: [],

        saveModalTitle: "",
      editedField: {label: "", type: "DATE", options: [], isRequired: true, isActive: true},


      fieldToDelete: {label: "", type: "DATE", options: []},

    }
  },
  methods: {
    async fetchFields(){
      this.fieldsArray = null
      let url = this.apiUrl('/field')
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
      this.fieldsArray = json.content;
      this.isLast = json.last;

    },

    async saveField(field) {
      let isNew = !this.fieldsArray.find(f => f.id === field.id)
      let url = this.apiUrl('/field')
      console.log(url)
      let resp = await fetch(url, this.fetchInit('post', field))
      let json = await resp.json()
      if (isNew) {
        this.fieldsArray.push(json)
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

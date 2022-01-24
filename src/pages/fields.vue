<template>
  <div class="container-md justify-content-center">
    <div class="card">
      <div class="card-header">
        <div class="row justify-content-around">
          <div class="col-auto"><h3>Fields</h3></div>
          <div class="col-auto ms-auto">
            <div class="btn btn-primary"
                 @click="saveModalTitle='Add field'; editedField = {label: '', type: '', options: [], isRequired: true, isActive: true}"
                 data-bs-toggle="modal" data-bs-target="#saveFieldModal" >
                Add field
            </div>
          </div>

        </div>

      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">Type</th>
              <th scope="col">Required</th>
              <th scope="col">Is Active</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="field in fieldsArray">
              <td>{{field.label}}</td>
              <td>{{fieldTypes[field.type]}}</td>
              <td>{{field.isRequired}}</td>
              <td>{{field.isActive}}</td>
              <td>
                <div class="justify-content-end row">
                  <button @click="saveModalTitle='Edit'; editedField=field" class="btn col-auto p-1" data-bs-toggle="modal" data-bs-target="#saveFieldModal" >
                    <i class="bi-pencil-square"></i>
                  </button>
                  <button class="btn col-auto p-1 me-2">
                    <i class="bi-trash-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>


        </table>
      </div>
      <div class="card-footer row bg-transparent mt-0 mb-0">
          <div class="col-auto me-auto mb-auto mt-auto">
            {{currentPage * pageSize + 1}}-{{currentPage * pageSize + elementsOnPage}} of {{totalElements}}
          </div>
          <div class="col-auto">
            <ul class="pagination pb-0 mb-0">
              <li class="page-item">
                <a class="page-link" href="#">
                  <span>&laquo;</span>
                </a>
              </li>
              <li v-for="page in Array(totalPages).keys()"
                  class="page-item" :class="{active: this.currentPage === page}"
                  @click="goToPage(page)"
              >
               <a class="page-link" href="#">{{page + 1}}</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  <span>&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-auto ms-auto" >
            <select @change="fetchFields()" class="form-select" v-model="selectedPageSize">
              <option value="all">All</option>
              <option v-for="c in [25, 10, 5, 3, 2]" :value="c">{{c}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modal fade" id="saveFieldModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{saveModalTitle}}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="container-sm">
                  <div class="row justify-content-sm-start gy-1">
                    <div class="col-2">
                      <label for="fieldLabel" class="col-form-label">Label</label>
                    </div>
                    <div class="col-10">
                      <input id="fieldLabel" type="text" class="form-control" required v-model="editedField.label">
                    </div>

                    <div class="w-100"></div>

                    <div class="col-2">
                      <label for="fieldType" class="col-form-label">Type</label>
                    </div>
                    <div class="col-10">
                      <select id="fieldType" class="form-control" required v-model="editedField.type">
                        <option disabled value="">Please select one</option>
                        <option v-for="(name, val) in fieldTypes" :value="val">{{name}}</option>
                      </select>
                    </div>

                    <div class="w-100"></div>

                    <div class="col-2">
                      <label for="fieldOptionsString" class="col-form-label">Options</label>
                    </div>
                    <div class="col-10">
                      <textarea id="fieldOptionsString" class="form-control" v-model="optionsString"></textarea>
                    </div>

                    <div class="w-100"></div>
                    </div>

                    <div class="row justify-content-center">
                      <div class="col-auto form-check">
                        <input class="form-check-input" type="checkbox" value="" id="isRequired" v-model="editedField.isRequired" >
                        <label class="form-check-label" for="isRequired">
                          Required
                        </label>
                      </div>
                      <div class="col-auto form-check">
                        <input class="form-check-input" type="checkbox" value="" id="isActive" v-model="editedField.isActive" >
                        <label class="form-check-label" for="isActive">
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
              </form>
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
export default {
  name: 'Fields',
  data() {
    return {
      fieldTypes,

      selectedPageSize: "all",
      currentPage: 0,
      totalPages: 0,
      isFirst: false,
      isLast: false,
      elementsOnPage: 0,
      totalElements: 0,

      fieldsArray: [],

      saveModalTitle: "",
      editedField: {label: "", type: "DATE", options: [], isRequired: true, isActive: true},


      fieldToDelete: {label: "", type: "DATE", options: []},

      optionsString: (this.editedField?.options || []).join('\n'),
    }
  },
  computed: {
    pageSize: function (){
      let temp = parseInt(this.selectedPageSize)
      this.goToPage(0, true);
      return !isNaN(temp) ? temp : 0
    }
  },
  methods: {
    goToPage(page, forced) {
      if(forced || this.currentPage !== page) {
        this.currentPage = page
        this.fetchFields()
      }
    },

    fetchFields(){
      let url = new URL('http://localhost:8080/api/v1/field')
      let params = {
        'page': this.currentPage,
        'count': this.pageSize
      }
      url.search = new URLSearchParams(params).toString()
       let resp = fetch( url, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then( (response) => response.json())
      .then( (json) => {
        this.totalPages = json.totalPages;
        this.totalElements = json.totalElements;
        this.elementsOnPage = json.numberOfElements;
        console.log(this.elementsOnPage)
        this.fieldsArray = json.content;
        this.isLast = json.last;

      } )
    },

    saveField(field) {
      let isNew = ! this.fieldsArray.find(f => f.id === field.id)
      let url = new URL('http://localhost:8080/api/v1/field')
      console.log("field" + JSON.stringify(field))
      let resp = fetch(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(field)
      })
      .then( (response) => response.json())
      .then( (json) => {
        console.log(json)
        console.log("isNew: " + isNew)
        if (isNew) {
          this.fieldsArray.push(json)
        }
      } )

    }
  },

  watch: {
    optionsString: function (val) {
      if(this.editedField)
        this.editedField.options = (val || '').split('\n')
    }
  },

  mounted() {
    this.fetchFields()
  },

  components: {DeleteFieldButton}
}
</script>

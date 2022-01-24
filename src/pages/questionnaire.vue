<template>
  <div class="container-md justify-content-center">
    <div class="card">
      <div class="card-body">
        <div v-for="field in fields">
          <div  class="mt-3">
            <div class="form-group mt-2">
              <label>{{field.label}}</label>
              <input v-if="field.type === 'SINGLE_LINE_TEXT'"
                     type="text" class="form-control" v-model="response[field.id]">

              <textarea v-else-if="field.type === 'MULTILINE_TEXT'"
                        type="text" class="form-control" rows="3"  v-model="response[field.id]"></textarea>

              <div v-else-if="field.type === 'RADIO_BUTTON'"
                   v-for="option in field.options">
                <div class="form-check">
                  <input class="form-check-input" type="radio"
                         :id="option" :value="option" v-model="response[field.id]">
                  <label class="form-check-label" :for="option">
                    {{option}}
                  </label>
                </div>
              </div>

              <div v-else-if="field.type === 'CHECKBOX'" class="form-check">
                <input class="form-check-input" type="checkbox" :id="field.label" v-model="response[field.id]">
                <label class="form-check-label" :for="field.label">
                  SOme
                </label>
              </div>

              <select v-else-if="field.type === 'COMBOBOX'"
                      class="custom-select" v-model="response[field.id]">
                <option v-for="option in field.options" :value="option"/>
              </select>

              <input v-else-if="field.type === 'DATE'"
                     type="date" class="form-control" v-model="response[field.id]">
            </div>
          </div>
        </div>

      </div>

      <div class="card-footer row bg-transparent mt-0 mb-0">
          <button class="flex-fill btn btn-primary" @click.prevent="saveResponse">Save</button>
      </div>

      </div>
  </div>
</template>

<script>
import fieldTypes from "@/FieldTypes";
import router from "@/router";

export default {
  name: "Questionnaire",
  data() {
    return {
      fields: [],
      response: {},
      fieldTypes,
    }
  },
  methods: {
    saveResponse() {
      //console.log("saving...")
      console.log(JSON.stringify(this.response))
      let url = new URL('http://localhost:8080/api/v1/response')
      let resp = fetch(url, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.response)
      })
          .then( (response) => response.json())
          .then( (json) => {
            console.log(json)
            this.response = json
            router.push("successSubmit")
          } )
    },
    fetchActiveFields() {
      let url = new URL('http://localhost:8080/api/v1/questionnaire')
      let resp = fetch(url, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then( (response) =>  response.json())
      .then( (json) => {
        this.fields = json
      } )

    }
  },
  mounted() {
    this.fetchActiveFields()
  }
}
</script>
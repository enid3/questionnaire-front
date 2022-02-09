<template>
  <table class="table table-striped" aria-busy="true" >
    <thead>
    <tr>
      <th
          v-for="field in fields"
          scope="col"
      >
        {{field.label}}
      </th>
    </tr>
    </thead>

    <tbody>
      <template v-if="!busy">
        <tr v-for="(item, index) in items">
          <td v-for="field in fields">
            <slot
                :name="'cell(' + field.key + ')'"
                :index="index"
                :item="item"
                :value="item[field.key] || ''"
            >
              <slot
                  :index="index"
                  :value="item[field.key]"
              >
                {{ item.hasOwnProperty(field.key) ? item[field.key] : 'N/A'}}
              </slot>
            </slot>
          </td>
        </tr>
      </template>
      <template v-else>
        <slot name="table-busy">
          <div class="text-center">
            <div class="spinner-border align-middle text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            Loading...
          </div>
        </slot>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    fields: Array,
    items: Array,
    busy: Boolean,
  },
}
</script>
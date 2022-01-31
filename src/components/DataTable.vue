<template>
  <table class="table table-striped">
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
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    fields: Array,
    items: Array,
  },
}
</script>
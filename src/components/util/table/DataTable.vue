<template>
  <BusyWrapper
      :busy="!isTableReady"
  >
    <table class="table table-striped" aria-busy="true" >
    <thead v-if="!!fields && fields.length">
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
      <template v-if="isTableReady">
        <tr v-if="!!items && !items.length">
          <td
              class="text-center"
              :colspan="!!fields && fields.length"
          >
            <slot name="nodata">
              <h4 class="m-2">No data
                <img
                    width="40"
                    height="40"
                    src="@/assets/emotes/FeelsRainMan.gif"
                >
              </h4>
            </slot>
          </td>
        </tr>
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
    </tbody>
  </table>
  </BusyWrapper>
</template>

<script>
import LoadingSpinner from "@/components/util/LoadingSpinner";
import BusyWrapper from "@/components/util/BusyWrapper";
export default {
  name: "DataTable",
  components: {BusyWrapper, LoadingSpinner},
  props: {
    fields: Array,
    items: Array,
    isTableReady: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
}
</script>
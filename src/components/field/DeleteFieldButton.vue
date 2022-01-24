<template>
</template>

<script>
export default {
  name: "DeleteFieldButton",
  methods: {
    deleteById(id){
      console.log("deleting " + id + " ...")
    }

  },
  props: {fieldId: Number,}
}
</script>

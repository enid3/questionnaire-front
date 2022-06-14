<template>
  <div
      class="btn card text-start b- p-0 hoverable"
  >
    <div class="card-body">
      <h5 class="card-title">
        <strong>
          {{questionnaire.name}}
        </strong>
        <template >
        </template>
      </h5>
      <p class="card-text mb-0">{{questionnaire.description}}</p>
      <p
          v-if="questionnaire.userInfo"
          class="card-text text-end"
      >
        <small class="text-muted">
          by {{questionnaire.userInfo.firstName}} {{questionnaire.userInfo.lastName}}
        </small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionnaireCard",
  props: {
    questionnaire: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.hoverable:hover {
  border-color: var(--bs-primary);
  background-color: var(--bs-light);
}
</style>
<template>
<ul class="nav nav-pills justify-content-center">
  <li class="nav-item">
    <router-link
      class="nav-link"
      :to="{name: 'chooseQuestionnaireForResponse'}"
    >
      Browse all
    </router-link>
  </li>
</ul>
</template>

<script>
export default {
  name: "ProvideResponseNavigation"
}
</script>
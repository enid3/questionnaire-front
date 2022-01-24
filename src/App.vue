<template>
  <container class="container-fluid">
    <h1>Some h1</h1>
    <hr>
    <router-link to="/">home</router-link>
    <router-link to="/fields">fields</router-link>
  </container>
  <router-view/>
</template>

<script>
//import HelloWorld from './components/fields.vue'

export default {
  name: 'App',
}
</script>


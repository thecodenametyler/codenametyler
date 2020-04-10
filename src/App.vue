<template>
  <div id="app">
    <header-prismic/>
    <router-view/>
    <footer-prismic/>
  </div>
</template>

<script>
import HeaderPrismic from './components/HeaderPrismic.vue'
import FooterPrismic from './components/FooterPrismic.vue'

export default {
  name: 'App',
  components: {
    HeaderPrismic,
    FooterPrismic
  }
}
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Roboto&display=swap";
@import "./assets/css/resetr.css";
@import "./assets/css/flexboxgrid.min.css";
@import "./assets/css/prismic-edit-button.css";
@import "./assets/css/custom.css";
</style>

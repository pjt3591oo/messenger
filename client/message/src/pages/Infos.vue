<template>
  <main-layout v-bind:text="text">
  </main-layout>
</template>


<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    },
    data () {
      return {
        text: 'info'
      }
    }
  }
</script>

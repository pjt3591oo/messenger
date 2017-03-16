<template>
  <div id="app">
    <Friends></Friends>
  </div>
</template>

<script>
import Friends from './pages/Friends'

export default {
  name: 'app',
  components: {
    Friends
  }
}
</script>

<style>
  *{
    padding:0;
    margin:0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

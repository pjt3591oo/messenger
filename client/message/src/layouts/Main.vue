<template>


  <div class="container">
    <div class="header" v-bind:text="text">{{text}}</div>

    <ul>
      <li>
        <v-link href="/">친구</v-link>
        <v-link href="/chat">채팅</v-link>
        <v-link href="/new">뉴스</v-link>
        <v-link href="/info">정보</v-link>
        <v-link href="/etc">기타</v-link>
      </li>
    </ul>

    <slot></slot>

  </div>

</template>

<script>
  import VLink from '../components/VLink.vue'

  export default {
    components: {
      VLink
    },
    props: {
      text: {
        type: String
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    background: #f9f7f5;
  }
  .container .header {
    width: 100%;
    padding: 2px;
    background: #4d3636;
    color: white;
  }
  .container ul{
    height:42px;
    padding:0;
    background: gray;
  }
  .container li{
    height:42px;
    list-style: none;
    font-size:0;
  }
  .container li a{
    display:inline-block;
    text-align:center;
    height: 42px;
    width: 20%;
    font-size: 36px;
    /*padding-top: 10px;*/
    list-style: none;
    text-decoration: none;
  }
</style>

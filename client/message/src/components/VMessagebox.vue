<template>
  <div v-bind:class="who_message">
    <div class="tooltip" v-bind:message="messageInfo.message">{{messageInfo.message}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      messageInfo: {
        type: Object
      },
      userName: {
        type: String
      }
    },
    computed: {
      who_message: function () {
        if (this.userName === this.messageInfo['s']) {
          return 'my_message'
        } else {
          return 'you_message'
        }
      }
    }
  }
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
  ul li{
    list-style: none;
  }
  .my_message {
    position: relative;
    width: 100%;
    height: 80px;
    display: block;
  }
  .my_message > .tooltip{
    position: absolute;
    display: block;
    background-color: green;
    width: 200px;
    right: 5%;
    top: 40px;
    border-radius: 10px;
    padding: 10px;
    color: white;
  }

  .my_message > .tooltip:before {
    position: absolute;
    content: '';
    border-width: 10px;
    border-style: solid;
    border-color: rgba(255,255,255,0) rgba(255,255,255,0) green rgba(255,255,255,0);
    top: 38px;
    left: 150px;
    transform: rotate(180deg);
  }
  .you_message {
    position: relative;
    width: 100%;
    height: 80px;
  }
  .you_message > .tooltip{
    position: absolute;
    display: block;
    background-color: lightblue;
    width: 200px;
    left: 5%;
    top: 40px;
    border-radius: 10px;
    padding: 10px;
    color: white;
  }

  .you_message > .tooltip:before {
    position: absolute;
    content: '';
    border-width: 10px;
    border-style: solid;
    border-color: rgba(255,255,255,0) rgba(255,255,255,0) lightblue rgba(255,255,255,0);
    top: 38px;
    left: 40px;
    transform: rotate(180deg);
  }
</style>

<template>
  <div>
    <div class="chatroom_header">채팅방</div>
    <div class="messages">
      <messagebox v-for="message in messages" v-bind:messageInfo="message" v-bind:userName="userName"></messagebox>
    </div>

    <input type="text" id="send_message" placeholder="채팅창" v-on:keyup.enter="send_message">
  </div>
</template>

<script>
  import messagebox from '../components/VMessagebox.vue'
  export default {
    components: {
      messagebox
    },
    methods: {
      send_message (e) {
        e.stopPropagation()
        this.messages.push(
          {
            s: this.userName, // 보낸사람
            r: '22', // 받는사람
            message: e.target.value,
            date: ''
          }
        )

        e.target.value = ''
      }
    },
    data () {
      return {
        userName: 'mung',
        messages: [
          {
            s: 'mung', // 보낸사람
            r: '22', // 받는사람
            message: 'test message',
            date: ''
          },
          {
            s: 'mung',
            r: '22',
            message: 'test message',
            date: ''
          },
          {
            s: '11',
            r: '22',
            message: 'test message',
            date: ''
          },
          {
            s: '11',
            r: '22',
            message: 'test message',
            date: ''
          },
          {
            s: '11',
            r: '22',
            message: 'test message',
            date: ''
          }
        ]
      }
    }
  }
</script>

<style>
  .chatroom_header{
    height: 42px;
    width: 100%;
    background: skyblue;
    padding: 2px;
  }
  #send_message{
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    height:36px;
    font-size: 28px;
  }
</style>

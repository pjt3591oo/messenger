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
      scrollDown () {
        window.scrollTo(0, document.body.scrollHeight)
      },

      send_message (e) {
        e.stopPropagation()
        let self = this
        let message = e.target.value
        self.messages.push(
          {
            s: this.userName, // 보낸사람
            r: '22', // 받는사람
            message: message,
            date: ''
          }
        )
        this.$socket.emit('testMessage', message)
        message = ''
        self.scrollDown()
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
    },
    created () {
      console.log(this.$socket)
      this.$options.sockets.messageReceive = (data) => {
        let message = {
          s: '123',
          r: 'mung',
          message: data,
          date: ''
        }
        this.messages.push(message)
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

<template>
  <main-layout v-bind:text="text">
    <v-item v-for="chat in chats" v-bind:href="chat.href" v-bind:info="chat" class="chatList" v-bind:isLine="true"></v-item>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import VItem from '../components/VItem.vue'

  export default {
    components: {
      MainLayout,
      VItem
    },
    data () {
      return {
        text: 'etc',
        chats: [
        ]
      }
    },
    methods: {
      chatInitionalize (data) {
        this.chats = data
      }
    },
    created () {
      // 서버로부터 각종 정보를 가져와서 초기화 시키기.
      let self = this
      console.log('test')
      fetch('http://127.0.0.1:3333/test/data').then(function (response) {
        return response.json().then(function (data) {
          data['testData'].map(function (item) {
            item['href'] = '/chatroom'
          })
          self.chatInitionalize(data['testData'])
        })
      })
    }
  }
</script>


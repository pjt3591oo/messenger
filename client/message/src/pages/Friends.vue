<template>
    <main-layout v-bind:text="text">
      <div id="friend_search">
        <input type="text" placeholder="친구, 플러스친구 검색" v-on:keyup="searchFriend">
      </div>

      <div class="boundary" v-if="titleShowStatus">내 프로필</div>

      <div id="my_profile" v-if="titleShowStatus">
        <v-item v-bind:click="getProfile" v-bind:info="myProfile" v-bind:isLine="false"></v-item>
      </div>

      <div class="boundary" v-if="titleShowStatus">추천친구</div>

      <div id="recommend_friends" v-if="titleShowStatus">
        <v-item v-bind:click="other" v-for="recommendFriend in recommendFriends" v-bind:info="recommendFriend" v-bind:isLine="false" class="friendList"></v-item>
      </div>

      <div class="boundary" v-if="titleShowStatus">그룹</div>

      <div id="group" v-if="titleShowStatus">
        <v-item v-bind:click="other" v-for="group in groups" v-bind:info="group" v-bind:isLine="false" class="friendList"></v-item>
      </div>

      <div class="boundary">친구</div>

      <div id="friends">
        <v-item v-bind:click="getProfile" v-for="friend in friends" v-if="friend.showStatus" v-bind:info="friend" v-bind:isLine="true" class="friendList"></v-item>
      </div>
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
        text: '친구',

        titleShowStatus: true,

        myProfile: {
          src: 'http://imvely.com/web/product/medium/201612/11761_shop1_804401.gif',
          name: 'myProfile',
          content: 'myProfile content'
        },
        recommendFriends: [{
          src: 'http://www.stylenanda.com/web/product/small/201703/218538_shop1_311819.gif',
          name: 'recommendFriends',
          content: 'recommendFriends content'
        }],
        groups: [
          {
            src: 'http://www.stylenanda.com/design/kr/3ce_left_bn.jpg',
            name: 'groups1',
            content: 'groups1 content'
          },
          {
            src: 'http://www.stylenanda.com/web/product/small/201703/219657_shop1_481077.gif',
            name: 'groups2',
            content: 'groups2 content'
          },
          {
            src: 'http://www.stylenanda.com/web/product/small/201703/219473_shop1_337400.jpg',
            name: 'groups3',
            content: 'groups3 content'
          }
        ],
        friends: [
          {
            src: 'http://www.stylenanda.com/web/product/small/201703/219291_shop1_782337.jpg',
            name: 'friends1',
            content: 'friends1 content',
            showStatus: true
          }, {
            src: 'http://www.stylenanda.com/2017/upload1/170224kej_4_11.jpg',
            name: 'friends2',
            content: 'friends2 content',
            showStatus: true
          }
        ]

      }
    },
    methods: {
      getProfile (e) {
        console.log(e.target)
      },
      other () {
        alert('other')
      },
      searchFriend (e) {
        let searchName = e.target.value

        if (!searchName) {
          this.titleShowStatus = true
        } else {
          this.titleShowStatus = false
          this.friends.map(function (friend) {
            let isSearched = friend['name'].indexOf(searchName) > -1
            if (isSearched) {
              friend['showStatus'] = true
            } else {
              friend['showStatus'] = false
            }
          })
        }
      }
    },
    created () {
      //  서버로부터 각종 정보를 가져와서 초기화 시키기.
      console.log('friends beforeCreate test')
    }
  }
</script>

<style>
  #friend_search{
    width:100%;
    border-top: solid;
  }
  #friend_search input {
    padding-left:30px;
    font-size:20px;
    width: 100%;
    height: 32px;
  }

  .boundary{
    font-size:9px;
    padding: 1px 0 0 10px;
    width:100%;
    border-top: 0.5px solid #999;
    border-bottom: 0.5px solid #999;
    border-color: gray white gray white;
  }
</style>

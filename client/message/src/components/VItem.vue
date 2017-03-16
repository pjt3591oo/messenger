<template>
  <div class="lists" v-bind:class="{underline : isLine}" v-on:click="click">
    <img v-bind:src="info.src" class="thumb"/>
    <div class="name" v-bind:value="info.name">{{info.name}}</div>
    <div class="content" v-bind:value="info.content">{{info.content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    },
    isLine: {
      type: Boolean
    },
    click: {
      type: Function
    }
  },
  data () {
    return {
      a: 'ads'
    }
  },
  methods: {
  },
  beforeCreate () {
    console.log('beforeCreate')
  }
}
</script>


<style>
  /*div.lists:hover{*/
    /*cursor: pointer;*/
  /*}*/
  div.lists.underline{
    border-bottom: 1px solid #999;
  }
  div.lists .thumb, .name, .content{
    display: inline-block;
  }
  div.lists .thumb, .lists{
    height: 40px;
  }
  div.lists .thumb{
    border-radius: 50%;
    width: 40px;
  }
  div.lists .content{
    float: right;
    padding-right:15px;
  }
</style>

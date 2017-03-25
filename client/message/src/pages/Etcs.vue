<template>
  <main-layout v-bind:text="text">
    <div class="game">
      <div class="game_board">
        <table id="snake_game_map" ref="table">
          <tr v-for="rows in maps" ref="rows">
            <td v-for="column in rows" ref="td" class="grid_cells" :class="{block: column === 0, blank : column === 1, snake_body : column ===2, eat : column ===3}"></td>
          </tr>
        </table>
      </div>

      <div class="score_board">
        <input type="text" value="" v-model:playerName="playerName">
        <button v-on:click="playerAdd">player 추가</button>
        <p v-bind:score="score">score : {{score}}</p>
        <p v-bind:time="time">time : {{time}}</p>
      </div>
    </div>

  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import Map from '../../static/game/map.js'
  import Snake from '../../static/game/snake.js'

  export default {
    components: {
      MainLayout
    },
    data () {
      return {
        playerName: 'asdf',
        text: 'etc',
        score: 0,
        time: 0,

        maps: new Map(30, 30),

        KeyPositionMap: {
          w: [-1, 0], // up
          s: [1, 0],  // down
          a: [0, -1], // left
          d: [0, 1]   // right
        }

      }
    },
    methods: {
      handleUserAction (key) {
        let newDir = this.KeyPositionMap[key]

        this.$socket.emit('playerMove', {dir: newDir, playName: this.playerName})
      },

      getGameBoard () {
        return document.getElementById('snake_game_map')
      },

      playerAdd () {
        let self = this
        let playName = self.playerName
        let playerSnake = new Snake(playName)
        playerSnake.name = playName

        self.$socket.emit('createdPlayer', {playerName: playName, playBody: playerSnake[0]})
        self.maps.addSnake(playerSnake)
      }
    },

    mounted () {
      var self = this
      self.maps.gameDom = self.getGameBoard()

      window.addEventListener('keydown', function (event) {
        self.handleUserAction(event.key)
      })

      this.$options.sockets.playerAdd = (player) => {
        console.log(player)
        let newPlayer = new Snake(player.playerName)
        newPlayer[0] = player.playBody
        self.maps.addSnake(newPlayer)
      }

      this.$options.sockets.move = (player) => {
        console.log(player['dir'])
        console.log(player['playName'])
        this.maps.move(new Array(player['dir']), player['playName'])
      }
    },

    created () {
    }
  }
</script>

<style>
  #snake_game_map tr td{
    width: 10px;
    height: 10px;
  }
  #snake_game_map tr td.block{
    background: red;
  }
  #snake_game_map tr td.blank{
    background:white;
  }
  #snake_game_map tr td.eat{
    background-image: url('../assets/bug.jpg')
  }
  #snake_game_map tr td.snake_body {
    background:black;
  }
  .game div{
    vertical-align: top;
    display: inline-block;
  }
</style>

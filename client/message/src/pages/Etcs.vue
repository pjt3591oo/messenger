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
        <p v-bind:score="score">score : {{score}}</p>
        <p v-bind:time="time">time : {{time}}</p>
      </div>
    </div>

  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import Graph from '../../static/game/astar.js'
  import Map from '../../static/game/map.js'
  import Snake from '../../static/game/snake.js'

  export default {
    components: {
      MainLayout
    },
    data () {
      return {
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

        this.maps.move(new Array(newDir))
      },

      getGameBoard () {
        return document.getElementById('snake_game_map')
      }
    },

    mounted () {
      var self = this
      self.maps.gameDom = self.getGameBoard()
      let playerSnake1 = new Snake(false)
//      let playerSnake2 = new Snake(false)

      self.maps.addSnake(playerSnake1)
//      self.maps.addSnake(playerSnake2)
      self.maps.astar = Graph

      self.maps.start()

      window.addEventListener('keydown', function (event) {
        self.handleUserAction(event.key)
      })
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

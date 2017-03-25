/**
 * Created by bagjeongtae on 2017. 3. 19..
 */

class Map extends Array{
  constructor(width, height){
    super()

    this.astar = Object();

    this.snakes = [];
    this.snakeNames = {};

    this.gameDom = '';

    this.width = width;
    this.height = height;

    this.addSnake = this.addSnake;
    this.move = this.move;

    this.draw = this.draw;

    this.mapChange = this.mapChange;
    this.makeEat = this.makeEat;

    this.isRange = this.isRange;
    this.isEat = this.isEat;
    this.dirCheck = this.dirCheck;

    this.mapInfo = this.mapInfo();

    for(var i=0; i<width; ++i){
      this[i] = []
      for(var j=0; j<height; ++j) {
        let tile = this.random();
        this[i][j] = tile
      }
    }
  }

  random(){
    let tile = Math.floor(Math.random() * (10 - 0)) + 0;

    if(tile >= 2){
      tile = this.mapInfo['blank']
    }else if(tile >= 0.5){
      tile = this.mapInfo['block']
    }else {
      tile = this.mapInfo['eat']
    }

    return tile;
  }

  mapInfo(){
    return {
      block: 0 ,
      blank: 1 ,
      snake: 2 ,
      eat : 3
    }
  }

  mapChange(y, x, value){
    this.gameDom.getElementsByTagName('tr')[y].getElementsByTagName('td')[x].className = value
  }

  makeEat(){
    let y = parseInt(Math.random() * 10) * 2 % 15
    let x = parseInt(Math.random() * 10) * 2 % 15
    this[y][x] = 3
    console.log(this[y][x])
    this.mapChange(y, x, 'eat')
  }
  isRange (y, x) {
    return (y < this.height && x < this.width) && (y >= 0 && x >= 0)
  }

  isEat (y, x) {
    return this.gameDom.getElementsByTagName('tr')[y].getElementsByTagName('td')[x].className.indexOf('eat') > -1
  }

  dirCheck (dir1, dir2) {
    return (dir1[0] + dir2[0] !== 0) || (dir1[1] + dir2[1] !== 0)
  }

  addSnake(snake){
    let self = this;
    this.snakes.push(snake)
    this.snakeNames[snake.name] = snake

    snake[0].map(function (body) {
        self[body[0]][body[1]] = 2
        self.mapChange(body[0], body[1], 'snake_body')
    })
  }

  start(){
    let self = this

    setInterval(function () {
      self.makeEat()
    }, 100)

    setInterval(function () {
      self.move()
    }, 1000000)

    setInterval(function () {
      // self.score += 1
      // self.time += 1
    }, 1000)
  }

  move(newDir, player){
      let self = this;

      let snake = this.snakeNames[player];

      if (this.dirCheck(newDir, snake.dir[0])){
          snake.dir = newDir[0]
          let nextPos = snake.nextPosition();

          if(this.isRange(nextPos.Y, nextPos.X)){
              snake[0].map(function (body) {
                  self[body[0]][body[1]] = 1
                  self.mapChange(body[0], body[1], 'blank')
              })

              snake[0].unshift([nextPos.Y, nextPos.X])

              if(!this.isEat(nextPos.Y, nextPos.X)){
                  snake[0].pop();
              }

              snake[0].map(function (body) {
                  self[body[0]][body[1]] = 2
                  self.mapChange(body[0], body[1], 'snake_body')
              })
          }
      }

  }
}

export default Map

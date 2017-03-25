/**
 * Created by bagjeongtae on 2017. 3. 19..
 */

/*
  w: [-1, 0], // up
  s: [1, 0],  // down
  a: [0, -1], // left
  d: [0, 1]   // right
* */

class Snake extends Array{
  constructor(name){
    super()
    this.dirInfo = {
      up:    [-1, 0],
      down:  [1, 0],
      left:  [0, -1],
      right: [0, 1]
    }

    this.name = name;

    this.nextPosition = this.nextPosition;
    this.searchShortest = this.searchShortest;

    this.length = 3;
    this.snakeInit();
    this.dir = this.dirInfo['right'];
  }

  snakeInit(){
    let firstBodyPoint = this.random();
    this[0] = []
    this[0].push([firstBodyPoint , firstBodyPoint + 2])
    this[0].push([firstBodyPoint , firstBodyPoint + 1])
    this[0].push([firstBodyPoint, firstBodyPoint])
  }

  random(){
    let firstBody = Math.floor(Math.random() * (10 - 3)) + 3;
    return firstBody
  }

  nextPosition(){
    let headY = this[0][0][0]
    let headX = this[0][0][1]

    let newHeadY = parseInt(headY) + parseInt(this.dir[0])
    let newHeadX = parseInt(headX) + parseInt(this.dir[1])

    return {
      Y: newHeadY,
      X: newHeadX
    }
  }

  searchShortest(map){
      let headY = this[0][0][0]
      let headX = this[0][0][1]

      let eats = new Array();

      for(var rowIndex in map){
          for(var columnIndex in map[rowIndex]){
              if (map[rowIndex][columnIndex] ===3){
                  eats.push([rowIndex, columnIndex])
              }
          }
      }

      let shorDistance = {
          dis : 0,
          pos : []
      }

      for(var eatIndex in eats){
          let y = eats[eatIndex][0];
          let x = eats[eatIndex][1];

          let distance = Math.pow(Math.abs(headY - y), 2) + Math.pow(Math.abs(headX - x), 2)
          if (! shorDistance['dis'] || shorDistance['dis'] > distance){
            shorDistance['dis'] = distance;
            shorDistance['pos'] = [parseInt(y), parseInt(x)];
          }
      }

      return shorDistance['pos']
  }

}

export default Snake

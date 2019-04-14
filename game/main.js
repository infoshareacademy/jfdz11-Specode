

let gameStarted = false
let chickenClassName = ['chicken', 'chicken2', 'chicken3']
let leftPosition = ['100px', '200px', '300px', '400px', '500px', '600px', '700px', '800px']


  class Timer {
    constructor(timerElement) {
      this.timerElement = timerElement;
      this.time = 0;
      this.interval = null;
    }
    
    start() {
      this.interval = setInterval(() => {
        this.time += 0.1
        this.timerElement.innerHTML = `Time: ${this.time.toFixed(2)}`
      }, 100)
    }

    stop() {
      clearInterval(this.interval)
    }
  

    reset() {
      this.time = 0;
      this.timerElement.innerHTML = `Time: ${this.time.toFixed(2)}`;
      
      }
    
  }
  const timer = new Timer(document.getElementById('timer'));

  






function addChicken(id) {
  chickenElement = document.createElement("div");
  chickenElement.classList.add(chickenClassName[(Math.round(Math.random() * 2))],'item');
  chickenElement.id = id || '';
  chickenElement.style.left = leftPosition[(Math.round(Math.random() * 8))];
  document.querySelector("body").appendChild(chickenElement);
  return chickenElement
}

let removeChicken = (chicken, raf) => {
  document.body.removeChild(chicken.currentElement);
  cancelAnimationFrame(raf)
  chicken.position = 0
}

var pause = true;

function Score(element) {
  this.score = 0;
  this.element = element;
  
  this.getScore = () => {
    return this.score
  }

  this.resetScore = () => {
    this.score = 0
    this.element.innerHTML = this.score
  }

  this.addPoints = (points) => {
    this.score += points
    this.element.innerHTML = this.score
  }
}

let timeOfShowNewElement = 1000;
const score = new Score(document.getElementById('points'))

let gameInterval = setInterval(() => {
  
  let moveChickenRAF_ID

  if (pause) {
    return;
  }

  function moveChicken() {
    moveChicken.currentElement = moveChicken.currentElement || addChicken(Math.random() * 2)
    moveChicken.position = moveChicken.position || 0
    moveChicken.maxHeight = moveChicken.maxHeight || window.innerHeight

    if (!pause) {
      moveChicken.maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      moveChicken.position += 5
      moveChicken.currentElement.style.top = moveChicken.position + 'px';
    }

    let catcherPosition = catcher.getPosition()
    if (moveChicken.position >= window.innerHeight - catcherPosition[0] - moveChicken.currentElement.offsetHeight) {
      if (
        moveChicken.currentElement.offsetLeft > catcherPosition[1] && 
        moveChicken.currentElement.offsetLeft < catcherPosition[2]
      ) {
        score.addPoints(1)
        removeChicken(moveChicken, moveChickenRAF_ID)
        return;
      }
      
      if (
        moveChicken.currentElement.offsetLeft + moveChicken.currentElement.offsetWidth > catcherPosition[1] && 
        moveChicken.currentElement.offsetLeft + moveChicken.currentElement.offsetWidth < catcherPosition[2]
      ){
        score.addPoints(1)
        removeChicken(moveChicken, moveChickenRAF_ID)
        return
      }
    }

    if (moveChicken.position > moveChicken.maxHeight - moveChicken.currentElement.clientHeight) {
      removeChicken(moveChicken, moveChickenRAF_ID)
      return;
    }
    requestAnimationFrame(moveChicken)
  }
  moveChickenRAF_ID = requestAnimationFrame(moveChicken)

}, timeOfShowNewElement )

class Catcher {
  constructor (element) {
    this.element = element;
    this.positionX = element.offsetLeft;
    this.width = element.offsetWidth;
    this.height = element.offsetHeight;
  }
  
  getPosition() {
    return [
      this.height,
      this.positionX,
      this.width + this.positionX
    ]
  }

  moveLeft() {
    if ( pause === true ) {
      return
    } else if ( this.positionX - 50 > 0 ) {
        this.positionX -= 50
        this.element.style.left = this.positionX + 'px'
    }
  } 

  moveRight() {
    if ( pause === true ) {
      return
    } else if ( this.positionX + this.width + 50 < window.innerWidth ) {
      this.positionX += 50
      this.element.style.left = this.positionX + 'px'
    }
  }

}
const catcher = new Catcher(document.getElementById('catcher'));


window.addEventListener("keydown", event => {
  if (event.keyCode === 37) {
    catcher.moveLeft();
  } else if ( event.keyCode === 39 ) {
    catcher.moveRight();
  }
});

const clickPause = document.getElementById('pause');

function pauseGame() {
  if ( pause === true ) {
    pause = false;
    timer.start();
  } else {
    pause = true;
    timer.stop();
  }
  }

  function startGame() {
    if (!gameStarted ) {
      timer.start();
      pause = false;
      gameStarted = true;
      document.getElementById('pause').checked = false;
    }
  }
      
    
  const restartButton = document.getElementById('restartButton');

  function resetGame() {

      pause = true;
      timer.stop();
      timer.reset();
      document.getElementById('pause').checked = true;
      document.querySelectorAll('.item').forEach(element => {
        document.body.removeChild(element)
      });
      score.resetScore()
      gameStarted = false;

  }

  
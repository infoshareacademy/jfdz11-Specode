

    // let chickenArray = ['chicken', 'chicken2'];
    // let leftPosition = ['200px', '400px', '600px', '800px']
    // console.log(chickenArray)

//         let chickenElement = document.createElement("div");
//         chickenElement.classList.add(chickenArray[1]);
//         document.querySelector("body").appendChild(chickenElement);
//         const currentElement = document.querySelectorAll('.chicken, .chicken2');
// // Dlaczego trzeba w tych linijkach ustawiać style, a pozniej przykladowo w 146 i 166 ponownie ? teoretycznie
// // powinny brac z tych dwóch ponizej położenie, ale jak usune te tutaj, to kwadraty nie spadają...

//     function addChicken() {
//     chickenElement = document.createElement("div");
//         chickenElement.classList.add(chickenArray[(Math.round(Math.random()*1))]);
//         document.querySelector("body").appendChild(chickenElement);
//         chickenElement.style.left = leftPosition[(Math.round(Math.random()*2))];
//     }


//     let removeChicken = (currentElement) => {
//         document.querySelector('body').removeChild(currentElement);
//     }




//     function chickens() {

//         let licznik = -200;
//         let maxTop = 200
//         setInterval(() => {
//             const currentElement = document.querySelector('.chicken, .chicken2');

//             console.log(currentElement.style.top)
//             licznik += Math.random() * 10;
//             chickenElement.style.top = licznik + 'px';

//             for(i = 0; i < 4; i++) {
//                 setTimeout(function () {
//                     addChicken();
//                 }, 3000);
//                 licznik += Math.random() * 10;
//             chickenElement.style.top = licznik + 'px';
//             }

//             if (licznik > maxTop ) {
//                 removeChicken(currentElement);
//                 licznik = -200;
//             }



//             return;
//         }, 3000)


//     }
//     chickens()


// Nie mam żadnego pomysłu jak dodać parę spadających obiektów, liczę na jakąś podpowiedź :).







let chickenClassName = ['chicken', 'chicken2', 'chicken3']
let leftPosition = ['100px', '200px', '300px', '400px', '500px', '600px', '700px', '800px']

function addChicken(id) {
  chickenElement = document.createElement("div");
  chickenElement.classList.add(chickenClassName[(Math.round(Math.random() * 2))]);
  chickenElement.id = id || '';
  chickenElement.style.left = leftPosition[(Math.round(Math.random() * 8))];
  document.querySelector("body").appendChild(chickenElement);
  return chickenElement
}

let removeChicken = (chicken, raf) => {
  document.querySelector('body').removeChild(chicken.currentElement);
  cancelAnimationFrame(raf)
  chicken.position = 0
}

var pause = false;

function Score(element) {
  this.score = 0;
  this.element = element;
  
  this.getScore = () => {
    return this.score
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
        moveChicken.currentElement.offsetLeft >= catcherPosition[1] && 
        moveChicken.currentElement.offsetLeft <= catcherPosition[2]
      ) {
        score.addPoints(1)
        removeChicken(moveChicken, moveChickenRAF_ID)
        return;
      }
      
      if (
        moveChicken.currentElement.offsetLeft + moveChicken.currentElement.offsetWidth >= catcherPosition[1] && 
        moveChicken.currentElement.offsetLeft + moveChicken.currentElement.offsetWidth <= catcherPosition[2]
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



function Catcher(element){
  this.element = element;
  this.positionX = element.offsetLeft;
  this.width = element.offsetWidth;
  this.height = element.offsetHeight;
  
  this.getPosition = () => {
    return [
      this.height,
      this.positionX,
      this.width + this.positionX
    ]
  }

  this.moveLeft = () => {
    if ( this.positionX - 50 > 0 ) {
        this.positionX -= 50
        this.element.style.left = this.positionX + 'px'
    }
  }

  this.moveRight = () => {
    if ( this.positionX + this.width + 50 < window.innerWidth ) {
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



// 






// (function moveChicken() {
//   moveChicken.currentElement = moveChicken.currentElement || addChicken(Math.random()*2)
//   moveChicken.position = moveChicken.position || 0
//   moveChicken.maxHeight = moveChicken.maxHeight || window.innerHeight

//   moveChicken.maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
//   moveChicken.position += 5
//   moveChicken.currentElement.style.top = moveChicken.position + 'px';
// })()


  // setInterval(() => {moveChicken()}, 30 )



// var time = 0;
// var timer = setInterval(function(){
//   document.getElementById("time").value = 0 + time;
//   time += 1;
//   if(time <= 0)
//     clearInterval(timer);
//     console.log(time)
// }, 1000);


//     let chickenArray = ['chicken', 'chicken2'];
//     let leftPosition = ['200px', '400px', '600px', '800px']
//     console.log(chickenArray)

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
    chickenElement.classList.add(chickenClassName[(Math.round(Math.random()*2))]);
    chickenElement.id = id || '';
    chickenElement.style.left = leftPosition[(Math.round(Math.random()*8))];
    document.querySelector("body").appendChild(chickenElement);
    return chickenElement
}

let removeChicken = (currentElement) => {
    document.querySelector('body').removeChild(currentElement);
}

setInterval( () => {
let moveChickenRAF_ID

function moveChicken() {
  moveChicken.position = moveChicken.position || 0
  moveChicken.maxHeight = moveChicken.maxHeight || window.innerHeight
  moveChicken.currentElement = moveChicken.currentElement || addChicken(Math.random()*2)

  moveChicken.maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  moveChicken.position += 5
  moveChicken.currentElement.style.top = moveChicken.position + 'px';
  if (moveChicken.position > moveChicken.maxHeight) {
    removeChicken(moveChicken.currentElement)
    cancelAnimationFrame(moveChickenRAF_ID)
    moveChicken.position = 0;
    return;
  }
  requestAnimationFrame(moveChicken)
}
moveChickenRAF_ID = requestAnimationFrame(moveChicken)

}, 2000)
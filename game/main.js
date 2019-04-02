



// // math.random * 3 . round
// // 3 klasy ( string ) == losujemy po indexie + dodajemy radomowo klase

// let chickenArray = ['chicken'];
// let leftPosition = ['200px', '400px', '600px', '800px']
// console.log(chickenArray)


// setInterval(() => {
//     let maxTop = '200px'
//     let random = (Math.round(Math.random()*3))
//     let chickenElement = document.createElement("div");
//     chickenElement.classList.add(chickenArray[random]);
//     document.querySelector("body").appendChild(chickenElement);
//     let random2 = (Math.round(Math.random()*3))
//     chickenElement.style.left = leftPosition[random2];
    
    
//             let elements = document.querySelectorAll('.chicken');
//             elements.forEach(value => {
//                 let licznik = 0;
//                 setInterval(() => {
//                     licznik += random2;
//                     value.style.top = licznik + 'px';
//                     if( value.style.top > maxTop) {
//                         elements.remove()
//                     }
                    
//                 }, 20)
                
//             })            

// }, 5000)






// // problem ze zlapaniem klasy chicken ( wyskakuje htmlCollection )
// // problem z przeładowywaniem style



// let chickenArray = ['chicken'];
// let leftPosition = ['200px', '400px', '600px', '800px']
// console.log(chickenArray)

//   let random = (Math.round(Math.random()*2))
//     let chickenElement = document.createElement("div");
//     chickenElement.classList.add(chickenArray[0]);
//     document.querySelector("body").appendChild(chickenElement);
//     let random2 = (Math.round(Math.random()*2))
//     chickenElement.style.left = leftPosition[2];
//     chickenElement.style.top = 0;

    
                        

// function addChicken() {
//  chickenElement = document.createElement("div");
//     chickenElement.classList.add(chickenArray[0]);
//     document.querySelector("body").appendChild(chickenElement);
//     chickenElement.style.left = leftPosition[1];
//     chickenElement.style.top = '100px';
// }

// function removeChicken(currentElement) {
//     currentElement.parentElement.removeChild(currentElement);
// }
//     function checkChicken() {
//             document.querySelectorAll('.chicken');
//     }


//             function chickens() {
                
//                     let licznik = 0;
//                     let maxTop = 200
//                     setInterval(() => {
//                         const currentElement = document.querySelector('.chicken');
//                         console.log(currentElement.style.top)
//                         licznik += Math.random() * 10;
//                         chickenElement.style.top = licznik + 'px';

//                         if ( parseInt(currentElement.style.top) > maxTop ) {
//                             removeChicken(currentElement);
//                             licznik = 0;
//                             addChicken();
//                             return;
//                         }
                        
//                         return;
//                     }, 200)
                    
                
//             }
//             chickens()


























let chickenArray = ['chicken', 'chicken2'];
let leftPosition = ['200px', '400px', '600px', '800px']
console.log(chickenArray)

    let chickenElement = document.createElement("div");
    chickenElement.classList.add(chickenArray[1]);
    document.querySelector("body").appendChild(chickenElement);

    chickenElement.style.left = leftPosition[(Math.round(Math.random()*2))];
    chickenElement.style.top = -1000;

    const currentElement = document.querySelectorAll('.chicken, .chicken2');
                        

function addChicken() {
 chickenElement = document.createElement("div");
    chickenElement.classList.add(chickenArray[(Math.round(Math.random()*1))]);
    document.querySelector("body").appendChild(chickenElement);
    chickenElement.style.left = leftPosition[(Math.round(Math.random()*2))];
}


let removeChicken = (currentElement) => {
    document.querySelector('body').removeChild(currentElement);
}

                       


            function chickens() {
                
                    let licznik = -200;
                    let maxTop = 200
                    setInterval(() => {
                          const currentElement = document.querySelector('.chicken, .chicken2');

                        console.log(currentElement.style.top)
                        licznik += Math.random() * 10;
                        chickenElement.style.top = licznik + 'px';

                        if (licznik > maxTop ) {
                            removeChicken(currentElement);
                            licznik = -200;
                            addChicken();
                            return;
                        }
                        
                        return;
                    }, 50)
                    
                
            }
            chickens()
            

            
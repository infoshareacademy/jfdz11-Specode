$(document).ready(function(){
    $("#burger-container").on('click', function(){
        $(this).toggleClass("open");
    });
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction(), changeMenuColor(), constrictMenu()};

function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/* user defined variables */
var timeOnSlide = 3, 		
    // the time each image will remain static on the screen, measured in seconds
timeBetweenSlides = 1, 	
    // the time taken to transition between images, measured in seconds

// test if the browser supports animation, and if it needs a vendor prefix to do so
    animationstring = 'animation',
    animation = false,
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O Khtml'.split(' '), 
    // array of possible vendor prefixes
    pfx  = '',
    slidy = document.getElementById("slidy"); 
// TODO: if (slidy.style.animationName !== undefined) { animation = true; } 
// browser supports keyframe animation w/o prefixes

if( animation === false ) {
  for( var i = 0; i < domPrefixes.length; i++ ) {
    // TODO: if( slidy.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
    //   pfx = domPrefixes[ i ];
    //   animationstring = pfx + 'Animation';
    //   keyframeprefix = '-' + pfx.toLowerCase() + '-';
    //   animation = true;
    //   break;
    // }
  }
}

var oldText = "Pokaż więcej"
var newText = "Pokaż mniej"
var i = 0;
var myText = document.getElementById('one');

myText.addEventListener('click', myFunction);
  function myFunction() {
    i++
    if( i % 2 === 1 ) {
    myText.innerText = newText;
  } else {
    myText.innerText = oldText;
  }
  }

  //querySelectorAll("#asdasd, .asdasd, #asd.casdasd")
  document.getElementById("asasd")

function toggleAll() {
  const elements = document.querySelectorAll(".read-more-toggle");
  
  elements.forEach((element) => {
    element.checked =  !element.checked;
  })
  // document.getElementById('post-1').checked = !document.getElementById('post-1').checked;
  // document.getElementById('post-2').checked = !document.getElementById('post-2').checked;
  // document.getElementById('post-3').checked = !document.getElementById('post-3').checked;
  // document.getElementById('post-4').checked = !document.getElementById('post-4').checked;
}

function safeData() {
  document.getElementById("Wyslij").innerHTML = "Wyślemy do Państwa jedną wiadomość z informacją o premierze.";
  document.getElementById("Dane").innerHTML = "Zapewniamy o bezpieczeństwie przekazywanych danych.";
}

let variable = true;

const test= function() {
  variable = !variable
}

test();test();test();test();test();test();

let parent = document.querySelector('.menu-content-list');
let parentLi = parent.querySelectorAll('li');
let parentA = document.querySelectorAll('.menu-content-list a');

parentLi[0].style.backgroundColor = '#34a51a';

function changeMenuColor() {

  var d = document.documentElement;
  var offset = d.scrollTop ;


  if (offset < 450 ){
    parentLi[0].style.backgroundColor = '#34a51a';
  } else {
    parentLi[0].style.backgroundColor = '#353535'
  }

  if (offset > 450 && offset < 850 ){
    parentLi[1].style.backgroundColor = '#34a51a';
  } else {
    parentLi[1].style.backgroundColor = '#353535'
  }

  if (offset > 850 && offset < 1300 ){
    parentLi[2].style.backgroundColor = '#34a51a';
  } else {
    parentLi[2].style.backgroundColor = '#353535'
  }

  if (offset > 1300 && offset < 2000 ){
    parentLi[3].style.backgroundColor = '#34a51a';
  } else {
    parentLi[3].style.backgroundColor = '#353535'
  }
}


  function constrictMenu() {

    var d = document.documentElement;
    var offset = d.scrollTop ;
    for( var i = 0; i < parentLi.length; i++ ) {
      if ( offset > 400 || document.documentElement.scrollTop > 400 ) {
        parentLi[i].style.height = "2rem"
        parentA[i].style.height = "2rem"
      } 
      
      if ( offset < 400 || document.documentElement.scrollTop < 400 ) {
        parentLi[i].style.height = "3rem"
        parentA[i].style.height = "3rem"
      }
      }
    }

var leadershippopups = document.getElementById("leadership-popups");
var leader1 = document.getElementById("leader-1");
var leader2 = document.getElementById("leader-2");
var leader3 = document.getElementById("leader-3");

function showAboutLeader(){
      leadershippopups.classList.add("active");
      leader1.classList.add('active');
}

function closeDescriptionTab(){
  leadershippopups.classList.remove("active");
  leader1.classList.remove('active'); 
}
    
function showAboutLeader2(){
  leadershippopups.classList.add("active");
  leader2.classList.add('active');
}

function closeDescriptionTab2(){
  leadershippopups.classList.remove("active");
  leader2.classList.remove('active'); 
}
    
function showAboutLeader3(){
  leadershippopups.classList.add("active");
  leader3.classList.add('active');

}

function closeDescriptionTab3(){
  leadershippopups.classList.remove("active");
  leader3.classList.remove('active'); 
}

window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#efefef",
        "text": "#404040"
      },
      "button": {
        "background": "#8ec760",
        "text": "#ffffff"
      }
    }
  })});

$(document).ready(function(){
    $("#burger-container").on('click', function(){
        $(this).toggleClass("open");
    });
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

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


  querySelectorAll("#asdasd, .asdasd, #asd.casdasd")
  document.getElementById("asasd")

function toggleAll() {
  const elements = document.querySelectorAll(".read-more-toggle");
  console.log(elements);
  
  elements.forEach((element) => {
    console.log(element.checked)
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
  console.log('qwe')
  console.log(variable)

  // if(variable) {
  //   variable = false;
  // } else {
  //   variable = true
  // }

  variable = !variable
  console.log('ooo',variable)
}




test();test();test();test();test();test();
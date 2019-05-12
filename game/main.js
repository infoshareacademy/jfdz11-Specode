let gameStarted = false;
let chickenClassName = ["chicken", "chicken2", "chicken3"];
let leftPosition = ["10vw", "25vw", "40vw", "55vw", "70vw", "85vw"];

class Timer {
  constructor(timerElement) {
    this.timerElement = timerElement;
    this.time = 0;
    this.interval = null;
  }

  start() {
    this.interval = setInterval(() => {
      this.time += 0.1;
      this.timerElement.innerHTML = `Time: ${this.time.toFixed(2)}`;
    }, 100);
  }

  stop() {
    clearInterval(this.interval);
  }

  reset() {
    this.time = 0;
    this.timerElement.innerHTML = `Time: ${this.time.toFixed(2)}`;
  }
}
const timer = new Timer(document.getElementById("timer"));

function addChicken(id) {
  chickenElement = document.createElement("div");
  chickenElement.classList.add(
    chickenClassName[Math.round(Math.random() * 5)],
    "item"
  );
  chickenElement.id = id || "";
  chickenElement.style.left = leftPosition[Math.round(Math.random() * 5)];
  document.querySelector("body").appendChild(chickenElement);
  return chickenElement;
}

let removeChicken = (chicken, raf) => {
  document.body.removeChild(chicken.currentElement);
  cancelAnimationFrame(raf);
  chicken.position = 0;
};

var pause = true;

function Score(element) {
  this.score = 0;
  this.element = element;

  this.getScore = () => {
    return this.score;
  };

  this.resetScore = () => {
    this.score = 0;
    this.element.innerHTML = this.score;
  };

  this.addPoints = points => {
    this.score += points;
    this.element.innerHTML = this.score;
  };
}

let timeOfShowNewElement = 1000;
const score = new Score(document.getElementById("points"));

// setTimeout(function game() {
//   console.log('elo, zwiekszam o polowe')
//   timeOfShowNewElement = 100
// }, 5000)

let gameInterval = setTimeout(function game() {
  let moveChickenRAF_ID;

  if (!gameStarted) {
    timeOfShowNewElement = 1000;
    gameInterval = setTimeout(game, timeOfShowNewElement);
    return;
  }
  if (pause) {
    gameInterval = setTimeout(game, timeOfShowNewElement);
    return;
  }

  function moveChicken() {
    moveChicken.currentElement =
      moveChicken.currentElement || addChicken(Math.random() * 5);
    moveChicken.position = moveChicken.position || 0;
    moveChicken.maxHeight = moveChicken.maxHeight || window.innerHeight;

    if (!pause) {
      moveChicken.maxHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      moveChicken.position += 5;
      moveChicken.currentElement.style.top = moveChicken.position + "px";
    }

    let catcherPosition = catcher.getPosition();
    if (
      moveChicken.position >=
      window.innerHeight -
        catcherPosition[0] -
        moveChicken.currentElement.offsetHeight
    ) {
      if (
        moveChicken.currentElement.offsetLeft > catcherPosition[1] &&
        moveChicken.currentElement.offsetLeft < catcherPosition[2]
      ) {
        score.addPoints(1);
        removeChicken(moveChicken, moveChickenRAF_ID);
        return;
      }

      if (
        moveChicken.currentElement.offsetLeft +
          moveChicken.currentElement.offsetWidth >
          catcherPosition[1] &&
        moveChicken.currentElement.offsetLeft +
          moveChicken.currentElement.offsetWidth <
          catcherPosition[2]
      ) {
        score.addPoints(1);
        removeChicken(moveChicken, moveChickenRAF_ID);
        return;
      }
    }

    if (
      moveChicken.position >
      moveChicken.maxHeight - moveChicken.currentElement.clientHeight
    ) {
      removeChicken(moveChicken, moveChickenRAF_ID);
      return;
    }
    requestAnimationFrame(moveChicken);
  }

  moveChickenRAF_ID = requestAnimationFrame(moveChicken);

  if (timer.time >= 2) {
    timeOfShowNewElement = timeOfShowNewElement * 0.97;
  }
  gameInterval = setTimeout(game, timeOfShowNewElement);
}, timeOfShowNewElement);

class Catcher {
  constructor(element) {
    this.element = element;
    this.positionX = element.offsetLeft;
    this.width = element.offsetWidth;
    this.height = element.offsetHeight;
  }

  getPosition() {
    return [this.height, this.positionX, this.width + this.positionX];
  }

  moveLeft() {
    if (pause === true) {
      return;
    } else if (this.positionX - 25 > 0) {
      this.positionX -= 25;
      this.element.style.left = this.positionX + "px";
    }
  }

  moveRight() {
    if (pause === true) {
      return;
    } else if (this.positionX + this.width + 25 < window.innerWidth) {
      this.positionX += 25;
      this.element.style.left = this.positionX + "px";
    }
  }
}
const catcher = new Catcher(document.getElementById("catcher"));

window.addEventListener("keydown", event => {
  if (event.keyCode === 37) {
    catcher.moveLeft();
  } else if (event.keyCode === 39) {
    catcher.moveRight();
  }
});

const clickPause = document.getElementById("pause");

function pauseGame() {
  if (!gameStarted) {
    return;
  }

  if (pause === true) {
    pause = false;
    timer.start();
  } else {
    pause = true;
    timer.stop();
  }
}

function startGame() {
  if (!gameStarted) {
    timer.start();
    pause = false;
    gameStarted = true;
    document.getElementById("pause").checked = false;
  }
}

const restartButton = document.getElementById("restartButton");

function resetGame() {
  pause = true;
  timer.stop();
  timer.reset();
  document.getElementById("pause").checked = true;
  document.querySelectorAll(".item").forEach(element => {
    document.body.removeChild(element);
  });
  score.resetScore();
  gameStarted = false;
}

let nameContainer = document.getElementById("game__name");
let emailContainer = document.getElementById("email__game");
let infoMove = document.getElementById("info__container");
let nameButton = document.getElementById("name");
let emailButton = document.getElementById("email");
let newName = document.getElementById("name__note");
let newEmail = document.getElementById("email__note");

window.onload = function addEmail() {
  pause = true;
  document.getElementById("pause").checked = true;
  timer.stop();
  emailContainer.style.display = "flex";
};

function acceptEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailButton.value)) {
    emailContainer.style.display = "none";
    nameContainer.style.display = "flex";
  } else {
    emailContainer.style.display = "flex";
    newEmail.innerHTML = "Musisz podać swojego maila";
    newEmail.style.color = "red";
  }
}
/* Description

1. The two forward-slashes /.../ contains a regexe.
2. The leading ^ and trailing $ match the beginning and the ending of the input string, respectively. That is, the entire input string shall match with this regexe, instead of a part of the input string.
3. \w+ matches 1 or more word characters (a-z, A-Z, 0-9 and underscore).
4. [.-] matches character . or -. We need to use . to represent . as . has special meaning in regexe. The \ is known as the escape code, which restore the original literal meaning of the following character.
5. [.-]? matches 0 or 1 occurrence of [.-].
6. Again, \w+ matches 1 or more word characters.
7. ([.-]?\w+)* matches 0 or more occurrences of [.-]?\w+.
8. The sub-expression \w+([.-]?\w+)* is used to match the username in the email, before the @ sign. It begins with at least one word character (a-z, A-Z, 0-9 and underscore), followed by more word characters or . or -. However, a . or - must follow by a word character (a-z, A-Z, 0-9 and underscore). That is, the string cannot contain "..", "--", ".-" or "-.". Example of valid string are "a.1-2-3".
9. The @ matches itself.
10. Again, the sub-expression \w+([.-]?\w+)* is used to match the email domain name, with the same pattern as the username described above.
11. The sub-expression .\w{2,3} matches a . followed by two or three word characters, e.g., ".com", ".edu", ".us", ".uk", ".co".
12. (.\w{2,3})+ specifies that the above sub-expression shall occur one or more times, e.g., ".com", ".co.uk", ".edu.sg" etc.
*/

function emailClose() {
  window.location.href = "../index.html";
}

emailButton.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("email__button").click();
  }
});

function addName() {
  pause = true;
  document.getElementById("pause").checked = true;
  timer.stop();
  nameContainer.style.display = "flex";
}

function firstStart() {
  if (nameButton.value.length === 0) {
    nameContainer.style.display = "flex";
    newName.innerHTML = "Musisz podać swoje imię!";
    newName.style.color = "red";
  } else {
    nameContainer.style.display = "none";
    pause = true;
    document.getElementById("pause").checked = true;
    timer.stop();
    infoMove.style.display = "block";
  }
}

nameButton.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("name__button").click();
  }
});

function infoVisible() {
  infoMove.style.display = "block";
  document.getElementById("pause").checked = true;
  pause = true;
  timer.stop();
}

function infoClose() {
  startGame();
  infoMove.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == infoMove) {
    startGame();
    infoMove.style.display = "none";
  }
};

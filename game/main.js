let gameStarted = false;
let typesOfFallingObjects = ["chicken", "carrot", "carrot"];
let positionOfFallingObject = ["15vw", "25vw", "40vw", "55vw", "70vw", "85vw"];

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
    typesOfFallingObjects[getRandomObject()],
    "item"
  );
  chickenElement.id = id || "";
  chickenElement.style.left = positionOfFallingObject[getRandomOfFallingObject()];
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

  this.addPoints = point => {
    this.score += point;
    this.element.innerHTML = this.score;
  };
  this.removePoints = point => {
    this.score -= point * 3;
    this.element.innerHTML = this.score;
  };
}

let timeOfShowNewElement = 1000;
const score = new Score(document.getElementById("points"));

function getRandomObject() {
  return Math.round(Math.random() * typesOfFallingObjects.length - 1);
}

function getRandomOfFallingObject() {
  return Math.round(Math.random() * positionOfFallingObject.length - 1);
}

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

  function loop() {
    stopGame();
    loop.currentElement = loop.currentElement || addChicken();
    loop.position = loop.position || 0;
    loop.maxHeight = loop.maxHeight || window.innerHeight;

    if (!pause) {
      loop.maxHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      loop.position += 5;
      loop.currentElement.style.top = loop.position + "px";
    }

    let catcherPosition = catcher.getPosition();
    if (
      loop.position >=
      window.innerHeight - catcherPosition[0] - loop.currentElement.offsetHeight
    ) {
      if (
        loop.currentElement.offsetLeft > catcherPosition[1] &&
        loop.currentElement.offsetLeft < catcherPosition[2]
      ) {
        if (loop.currentElement.classList.contains('chicken')) {
          score.removePoints(1)
          removeChicken(loop, moveChickenRAF_ID);
          return;
        }
        if (loop.currentElement.classList.contains('carrot')) {
          score.addPoints(1)
          removeChicken(loop, moveChickenRAF_ID);
          return;
        }
      }

      if (
        loop.currentElement.offsetLeft + loop.currentElement.offsetWidth >
        catcherPosition[1] &&
        loop.currentElement.offsetLeft + loop.currentElement.offsetWidth <
        catcherPosition[2]
      ) {
        if (loop.currentElement.classList.contains('chicken')) {
          score.removePoints(1)
          removeChicken(loop, moveChickenRAF_ID);
          return;
        }
        if (loop.currentElement.classList.contains('carrot')) {
          score.addPoints(1)
          removeChicken(loop, moveChickenRAF_ID);
          return;
        }
      }
    }

    if (loop.position > loop.maxHeight - loop.currentElement.clientHeight) {
      removeChicken(loop, moveChickenRAF_ID);
      return;
    }
    requestAnimationFrame(loop);
  }

  moveChickenRAF_ID = requestAnimationFrame(loop);

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

function stopGame() {
  if (timer.time >= 30) {
    pause = true;
    timer.stop();
    timer.reset();
    document.getElementById("pause").checked = true;
    document.querySelectorAll(".item").forEach(element => {
      document.body.removeChild(element);
    });
    saveUserScoreToLocalStorage();
    score.resetScore();
    gameStarted = false;
  }
}

function saveUserScoreToLocalStorage(){
  localStorage.setItem("userEmail", emailInput.value);
  localStorage.setItem("userScore", score.score);
  localStorage.setItem("userFirstName", nameInput.value);
}

let nameContainer = document.getElementById("game__name");
let formContainer = document.getElementById("form__container");
let infoContainer = document.getElementById("info__container");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let nameLabel = document.getElementById("name__label");
let emailLabel = document.getElementById("email__label");

window.onload = function showBoxWithEmail() {
  pause = true;
  document.getElementById("pause").checked = true;
  timer.stop();
  formContainer.style.display = "flex";
};

function acceptEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) {
    formContainer.style.display = "none";
    nameContainer.style.display = "flex";
  } else {
    formContainer.style.display = "flex";
    emailLabel.innerHTML = "Musisz podać swojego maila";
    emailLabel.style.color = "red";
  }
}

function emailClose() {
  window.location.href = "../index.html";
}

emailInput.addEventListener("keyup", function (event) {
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
  if (nameInput.value.length === 0) {
    nameContainer.style.display = "flex";
    nameLabel.innerHTML = "Musisz podać swoje imię!";
    nameLabel.style.color = "red";
  } else {
    nameContainer.style.display = "none";
    pause = true;
    document.getElementById("pause").checked = true;
    timer.stop();
    infoContainer.style.display = "block";
  }
}

nameInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    firstStart();
  }
});

function infoVisible() {
  infoContainer.style.display = "block";
  document.getElementById("pause").checked = true;
  pause = true;
  timer.stop();
}

function infoClose() {
  startGame();
  infoContainer.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == infoContainer) {
    startGame();
    infoContainer.style.display = "none";
  }
};

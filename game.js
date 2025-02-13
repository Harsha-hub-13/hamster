let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLeft = 30;
let timer;
let moleInterval, plantInterval;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-button").addEventListener("click", startGame);
});

function startGame() {
    // Reset variables
    score = 0;
    gameOver = false;
    timeLeft = 30;
    document.getElementById("score").innerText = "0";
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    document.getElementById("board").innerHTML = ""; // Clear board
    document.getElementById("board").classList.remove("disabled");

    // Set up board
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.classList.add("tile");
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    // Start game intervals
    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
    startTimer();
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver) return;
    if (currMoleTile) currMoleTile.innerHTML = "";
    
    let mole = document.createElement("img");
    mole.src = "../monty-mole.png";

    let num = getRandomTile();
    while (currPlantTile && currPlantTile.id === num) {
        num = getRandomTile();
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "../piranha-plant.png";

    let num = getRandomTile();
    while (currMoleTile && currMoleTile.id === num) {
        num = getRandomTile();
    }

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this.firstChild && this.firstChild.tagName === "IMG") {
        if (this === currMoleTile) {
            score += 10;
            document.getElementById("score").innerText = score;
        } else if (this === currPlantTile) {
            endGame("GAME OVER: " + score);
        }
    }
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0 || gameOver) {
            endGame("TIME UP! Score: " + score);
        } else {
            timeLeft--;
            document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
        }
    }, 1000);
}

function endGame(message) {
    clearInterval(timer);
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    gameOver = true;
    document.getElementById("score").innerText = message;
    document.getElementById("board").classList.add("disabled");
}

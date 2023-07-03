const grid = document.querySelector(".bolls");
const startButton = document.getElementById("start-btn")
const imageButton = document.getElementById("btnImg")
const sco = document.getElementById("score")

// left right move buttons 
const left = document.getElementById("left");
const bottom = document.getElementById("bottom");
const right = document.getElementById("right");
//level counter
const incrementCount = document.getElementById("increment-count");
const decrementCount = document.getElementById("decrement-count");
// Select total count
const totalCount = document.getElementById("total-count");
const totalIndex = 30;
const usedIndex = 26
for (i = 0; i < totalIndex; i++) {
    const newDiv = document.createElement('div');
    const Div = grid.appendChild(newDiv)

    if (i > usedIndex) {
        Div.classList.add("freeze")
    }
}
let circle = Array.from(document.querySelectorAll('.bolls div'));
const maxLevel = 6;
let count = 0;
let index = 0;
const width = 3;
let currentPosition = 1;
let timer;
const maxRowvalue = 27;
const maxColumnValue = 21;
var score = 0;
let levelcounter = 1;
const colors_array = ["yellow", "pink", "red", "skyblue"];
let random = Math.floor(Math.random() * colors_array.length)
let currentcircle = colors_array[random];
// Display initial count value
totalCount.innerHTML = levelcounter;
function colorcreate() {
    circle[currentPosition + index].classList.add(currentcircle);
}
colorcreate();

// erase
function erase() {
    circle[currentPosition + index].classList.remove(currentcircle)
}
function moveDown() {
    erase()
    currentPosition += width;
    colorcreate();
    stop();
}
let levelCounter = {
    "1": 2000,
    "2": 1500,
    "3": 1000,
    "4": 800,
    "5": 500,
    "6": 400,
    "7": 300,
}
function countTheLevel() {
    var level_speed = parseInt((document.getElementById('total-count').innerHTML));
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(moveDown, levelCounter[level_speed]);
}
countTheLevel();
// stop function
function stop() {
    if (circle[currentPosition + index + width].classList.contains("freeze")) {
        circle[currentPosition + index].classList.add("freeze")
        // start a new shape falling
        random = Math.floor(Math.random() * colors_array.length)
        currentcircle = colors_array[random];
        currentPosition = 1;
        colorcreate();
        gameover();
        addScore();
    }
}
function control(e) {
    if (e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 39) {
        moveRight();
    } else if (e.keyCode === 40) {
        moveDown();
    }
}
window.addEventListener("keydown", control)
function moveLeft() {
    erase();
    let leftBlockage = ((currentPosition + index) % width === 0);
    let blockage = circle[currentPosition + index - 1].classList.contains('freeze');
    if (!leftBlockage && !blockage) {
        currentPosition--;
    }
    colorcreate();
}
function moveRight() {
    erase();
    let RightBlockage = ((currentPosition + index) % width === width - 1);
    let blockage = circle[currentPosition + index + 1].classList.contains('freeze');
    if (!RightBlockage && !blockage) {
        currentPosition++;
    }
    colorcreate();
}
function pause() {
    if (timer) {
        clearInterval(timer)
        timer = null;
        imageButton.src = 'play.png'
    }
    else {
        colorcreate()
        timer = setInterval(moveDown, 1000);
        imageButton.src = 'pause.png'
    }
}
startButton.addEventListener("click", pause);

// below buttons
left.addEventListener("click", moveLeft);
right.addEventListener("click", moveRight);
bottom.addEventListener("click", moveDown);
//game over 
function gameover() {
    const rowOver = [3, 4, 5];
    if (rowOver.some(index => circle[index].classList.contains("freeze"))) {
        console.log("yess");
        sco.innerHTML = "Game Over";
        clearInterval(timer);
        alert(`game over Your score is:: ${score}`);
    }
}

// addscore and bolls  disappear
function addScore() {
    for (let i = 0; i < maxRowvalue; i += width) {
        const row = [i, i + 1, i + 2];
        colors_array.forEach(function (item) {
            if (row.every(index => circle[index].classList.contains(item))) {
                score += 10;
                sco.textContent = `score:${score}`
                row.forEach(index => {
                    circle[index].classList.remove("freeze");
                    circle[index].classList.remove(item);
                    circle[index].style.background = '';
                })
                const circleRemoved = circle.splice(i, width);
                console.log(circleRemoved);
                circle = circleRemoved.concat(circle);
                circle.forEach(circles => grid.appendChild(circles))
            }
        });
    }
    for (let i = 0; i < maxColumnValue; i++) {
        const column = [i, i + width, i + (width * 2)];
        colors_array.forEach(function (item) {
            if (column.every(index => circle[index].classList.contains(item))) {
                score += 10;
                sco.textContent = `score:${score}`
                column.forEach(index => {
                    circle[index].classList.remove("freeze");
                    circle[index].classList.remove(item);
                    circle[index].style.background = '';
                })
            }
        });
    }
}
// level 
// Function to Increment count
const handleIncrement = () => {
    if (levelcounter > maxLevel) {
        levelcounter = maxLevel;
    }
    levelcounter++;
    totalCount.innerHTML = levelcounter;

};
// Function to decrement count
const handleDecrement = () => {

    levelcounter--;
    if (levelcounter < 1) {
        levelcounter = 1;
    }
    totalCount.innerHTML = levelcounter;
};
incrementCount.addEventListener("click", handleIncrement);
decrementCount.addEventListener("click", handleDecrement);



'use strict';

// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent = "Correct Number";
// console.log(document.querySelector(".message").textContent);

// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 5;


// document.querySelector(".guess").value = 23;
// console.log(document.querySelector(".guess").value);


// NOTE: Handeling Click Events

// addEventListener takes 2 parameters
// first one is the event to lister to like click
// second a function 
// A function to execute when the given event happens

// document.querySelector(".check").addEventListener("click", function () {
//     console.log(document.querySelector(".guess").value);
// })


// NOTE: Game Logic

function correctGuess() {
    message = "Correct number 🎉";
    if (highScore < score) {
        highScore = score;
    }
    document.querySelector(".number").textContent = number;
    document.body.style.background = "green";
    document.querySelector(".check").textContent = "Restart";
}

function lostGame() {
    message = "🤮 You lost the game";
    document.querySelector(".check").textContent = "Restart";
}

function incorrectGuess(guess, number) {
    if (score == 0) {
        lostGame();
    }
    else if (Math.abs(guess - number) <= 3) {
        message = "😮 Too close"
    }
    else if (guess - number < 0) {
        message = "🙄 Too less";
    } else {
        message = "😑 Too high";
    }
    score--;
}


let score = 20;
let highScore = Number(window.localStorage.getItem("highScore"));
let message = "Start guessing...";

document.querySelector(".highscore").textContent = String(highScore);


const number = Math.trunc(Math.random() * 20 + 1);

document.querySelector(".check").addEventListener("click", function () {

    if (document.querySelector(".check").textContent == "Restart") {
        localStorage.setItem("highScore", String(highScore));
        location.reload();
    }

    const guess = Number(document.querySelector(".guess").value);
    if (guess === 0) {
        message = "🤬 Abe sathiya gai ho kya...";
        score--;
        if (score == 0) lostGame();
    }
    else if (guess === number) {
        correctGuess();
    }
    else {
        incorrectGuess(guess, number);
    }
    document.querySelector(".highscore").textContent = highScore;
    document.querySelector(".message").textContent = message;
    document.querySelector(".score").textContent = score;
})

// NOTE: Reset logic

function reset() {
    localStorage.removeItem("highScore");
    location.reload()
}

document.querySelector(".reset").addEventListener("click", function () {
    reset();
})

// NOTE: Instruction modal window logic

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

document.querySelector(".instructions").addEventListener("click", function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
})

function removeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}
document.querySelector(".close-modal").addEventListener("click", function () {
    removeModal();
})

overlay.addEventListener("click", function () {
    removeModal();
})

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        removeModal();
    }
});
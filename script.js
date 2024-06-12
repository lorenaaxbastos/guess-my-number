"use strict";

const bgColor = function (color) {
    body.style.backgroundColor = color;
};

const checkGuess = function () {
    const number = Number(guess.value);

    if (!number) {
        displayMessage("No number ⛔");
    } else {
        if (number === secret) {
            displayResult(number, "Correct number! ✅");
            bgColor("#60b347");
            if (scoreValue > highscoreValue) {
                highscoreValue = scoreValue;
                highscore.textContent = highscoreValue;
            }
        } else {
            if (number > secret) displayMessage("Guess is too high ❌");
            else displayMessage("Guess is too low ❌");
            scoreValue--;
            displayScore(scoreValue);
            if (scoreValue <= 0) {
                displayResult(number, "Game Over 💀");
                bgColor("#bb0b25");
            }
        }
    }
};

const disableGuessInput = function (boolValue) {
    if (boolValue) {
        guess.setAttribute("disabled", "");
    } else {
        guess.removeAttribute("disabled");
        guess.value = "";
    }
};

const displayMessage = function (text) {
    message.textContent = text;
};

const displayScore = function (value) {
    score.textContent = value;
};

const displaySecretNumber = function (text) {
    secretNumber.textContent = text;
};

const displayResult = function (secret, text) {
    disableGuessInput(1);
    displayMessage(text);
    displaySecretNumber(secret);
    hideCheckBtn(1);
};

const generateSecretNumber = function (min, max) {
    return Math.trunc(Math.random() * max) + min;
};

const hideCheckBtn = function (boolValue) {
    checkBtn.style.display = boolValue === 1 ? "none" : "block";
};

const restartGame = function () {
    secret = generateSecretNumber(1, 20);
    scoreValue = 10;
    disableGuessInput(0);
    displayScore(scoreValue);
    bgColor("#222");
    displayMessage("Start guessing...");
    displaySecretNumber("?");
    hideCheckBtn(0);
};

const body = document.querySelector("body");
const secretNumber = document.querySelector(".number");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");
const guess = document.querySelector(".guess");
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const highscore = document.querySelector(".highscore");

let scoreValue = 10;
let highscoreValue = 0;
let secret = generateSecretNumber(1, 20);
checkBtn.addEventListener("click", checkGuess);
againBtn.addEventListener("click", restartGame);

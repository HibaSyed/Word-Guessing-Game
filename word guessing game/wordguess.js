"use strict";

const words = [
  "House",
  "Job",
  "Business",
  "Food",
  "Restaurant",
  "Telephone",
  "Address",
  "Money",
  "Friend",
  "Love",
  "Happy",
  "Angry",
  "Excited",
  "Tired",
]; // Array of Random Words
var currentWord; // Store current word
// Various elements
var wordDiv = document.getElementById("word");
var inputBox = document.getElementById("letter");
var startButton = document.getElementById("startGame");
var msgBox = document.getElementById("msgBox");
var lettersCorrectlyGuessed; //set to keep the correctly guessed letters
var correctLetters = 0; // Track how many correct letters there are

function startGame() {
  inputBox.style.display = "block"; // Show Inputbox
  wordDiv.innerHTML = ""; // Clear the word
  msgBox.innerHTML = ""; // Clear the message box
  inputBox.disabled = false; // Enable inputbox
  inputBox.focus(); // Focus input box
  currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase(); // Set current word to guess
  correctLetters = 0; // Reset correctLetters
  lettersCorrectlyGuessed = new Set(); // Reset correctly guessed letters set

  // Create elements for each letter and placing a * in it
  for (let i = 0; i < currentWord.length; i++) {
    var letterDiv = document.createElement("div");
    letterDiv.innerHTML =
      '<div class="wordBox-letter" id="' + i + '">*</div><div class="wordBox-line"></div>';
    letterDiv.className = "wordBox";
    wordDiv.appendChild(letterDiv);
  }
}

//Gets the value within textbox
inputBox.oninput = function () {
  let currentLetter = inputBox.value.toUpperCase();  // store current Letter
  setTimeout(function () {
    //Check if letter is present
    let wordLetters = currentWord.split(""); //breaks word into letter array
    wordLetters.forEach((letter, index) => {
      if (letter === currentLetter) {
        document.getElementById(index).innerHTML = currentLetter;
        //checks if letter was already guessed so count is not added twice
        if (!lettersCorrectlyGuessed.has(currentLetter)) {
          let count = wordLetters.filter(l => l === currentLetter).length; // check how many times letter appears
          correctLetters += count; // add based on count of letters
          //if all letters are guessed, end game
          if (correctLetters === currentWord.length) {
            inputBox.disabled = true; // disable inputbox
            msgBox.innerHTML = "You guessed the word " + currentWord + " correctly!";
            correctLetters = 0;
          }
          lettersCorrectlyGuessed.add(currentLetter);
        }
      }
    });
    inputBox.value = "";
  }, 300);
};

/* Event Listeners -- DO NOT REMOVE THIS */

startButton.addEventListener("click", startGame); // Starting game by clicking the start button

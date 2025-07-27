"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Review Assignment

   Author: Chia Chieh Lin
   Date:   28/July/2023

   Global Variables
   ================
   
   allCells
      References the TD cells within the Hitori table grid.   
      
   Function List
   =============

   startUp()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   switchPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   findErrors()
      Highlights the errors in the Hitori puzzle in a red font.
      
   showSolution()
      Shows the solution to the Hitori puzzle
    
   checkSolution()
      Checks the current user's puzzle to verify whether it contains
      the complete and correct solution.

   drawHitori(numbers, blocks, rating)
      Returns a text string of the HTML code to
      display a Hitori puzzle table based on the contents of
      the numbers, blocks, and rating parameters.
	
*/

window.addEventListener("load", startUp);

var allCells;
var timerInterval;
var startTime;
var solved = false;

function startUp() {
  initializePuzzle();
  setupEventListeners();
}

function initializePuzzle() {
  document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
  document.getElementById("puzzle").innerHTML = drawPuzzle(hitori1Numbers, hitori1Blocks, hitori1Rating);
  setupPuzzleButtons();
  setupPuzzle();
  resetTimer();
}

function setupPuzzleButtons() {
  var puzzleButtons = document.getElementsByClassName("puzzles");
  for (var i = 0; i < puzzleButtons.length; i++) {
    puzzleButtons[i].onclick = switchPuzzle;
  }
  document.getElementById("check").onclick = findErrors;
  document.getElementById("solve").onclick = showSolution;
  document.getElementById("restart").onclick = restartPuzzle;
}

function drawPuzzle(numbers, blocks, rating) {
  return drawHitori(numbers, blocks, rating);
}

function switchPuzzle(e) {
  if (confirm("You will lost all of your work on the puzzle! Do you want to contiue?"))
  {
    var SelectedPuzzleId = e.target.id;
    var puzzleTitle = e.target.value;
    document.getElementById("puzzleTitle").innerHTML = puzzleTitle;

    switch (SelectedPuzzleId) {
      case "puzzle1":
        document.getElementById("puzzle").innerHTML = drawPuzzle(hitori1Numbers, hitori1Blocks, hitori1Rating);
        break;
      case "puzzle2":
        document.getElementById("puzzle").innerHTML = drawPuzzle(hitori2Numbers, hitori2Blocks, hitori2Rating);
        break;
      case "puzzle3":
        document.getElementById("puzzle").innerHTML = drawPuzzle(hitori3Numbers, hitori3Blocks, hitori3Rating);
        break;
    }
    setupPuzzle();
    resetTimer(); 
    startTimer(); 
    solved = false;
  }
}



function setupPuzzle() {
  allCells = document.querySelectorAll("table#hitoriGrid td");
  for (var i = 0; i < allCells.length; i++) {
    setCellStyle(allCells[i], "rgb(250, 250, 250)", "black", 0, "pointer");
    allCells[i].addEventListener("mousedown", handleMouseDown);
    allCells[i].addEventListener("mouseup", handleMouseUp);
    allCells[i].addEventListener("mouseover", handleMouseOver);
    allCells[i].addEventListener("mouseout", handleMouseOut);
  }
}

function setCellStyle(cell, backgroundColor, color, borderRadius, cursor) {
  cell.style.backgroundColor = backgroundColor;
  cell.style.color = color;
  cell.style.borderRadius = borderRadius;
  cell.style.cursor = cursor;
}

function handleMouseDown(event) {
  if (event.shiftKey) {
    setCellStyle(event.target, "rgb(250, 250, 250)", "black", 0, "alias");
  } else if (event.altKey) {
    setCellStyle(event.target, "black", "rgb(250, 250, 250)", 0, "cell");
  } else {
    setCellStyle(event.target, "rgb(100, 100, 100)", "rgb(250, 250, 250)", "50%", "pointer");
  }
  event.preventDefault();
}

function handleMouseUp(event) {
  checkSolution();
}

function handleMouseOver(event) {
  if (event.shiftKey) {
    event.target.style.cursor = "url(images/jpf_eraser.png), alias";
  } else if (event.altKey) {
    event.target.style.cursor = "url(images/jpf_block.png), cell";
  } else {
    event.target.style.cursor = "url(images/jpf_circle.png), pointer";
  }
}

function handleMouseOut(event) {
  event.target.style.cursor = "default";
}

function findErrors() {
  for (var i = 0; i < allCells.length; i++) {
    var cellColor = allCells[i].style.backgroundColor;
    var cellClass = allCells[i].className;
    if ((cellClass === "blocks" && cellColor === "rgb(100, 100, 100)") ||
      (cellClass === "circles" && cellColor === "black")) {
      allCells[i].style.color = "red";
    }
  }

  setTimeout(function () {
    for (var i = 0; i < allCells.length; i++) {
      if (allCells[i].style.color === "red") {
        allCells[i].style.color = "rgb(250, 250, 250)";
      }
    }
  }, 1000);
}

function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
}


function updateTimer() {
  var currentTime = new Date().getTime();
  var timeElapsed = currentTime - startTime;
  var minutes = Math.floor(timeElapsed / (1000 * 60));
  var seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);

  var timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "00:00";
}

function restartPuzzle() {
  initializePuzzle();
}
         
/* ================================================================= */

function checkSolution() {
   /* Set the initial solved state of the puzzle to true */
   var solved = true;

   /* Loop through the puzzle cells, exiting when an incorrect
      cell is found, setting the solved variable to false */

   for (var i = 0; i < allCells.length; i++) {
      var cellColor = allCells[i].style.backgroundColor;
      var cellClass = allCells[i].className;

      /* A cell is incorrect if it is in the block class and is not black
         or in the circle class and is not white */
      if ( (cellClass == "blocks" && cellColor !== "black") || 
           (cellClass == "circles" && cellColor !== "rgb(100, 100, 100)")) {
         solved = false;
         break;
      }
   }

   /* If solved is still true after the loop, display an alert box */
   if (solved) alert("Congratulations! You solved the puzzle!");
}

function showSolution () {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   };   
}

function drawHitori(numbers, blocks, rating) {

   /* Initial HTML String for the Hitori Puzzle */
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   var totalRows = numbers.length;
   var totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";
   

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (var j = 0; j < totalCols; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString +="</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}
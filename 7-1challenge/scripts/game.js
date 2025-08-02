"use strict";

// Listen for the window to load before setting up the game
window.addEventListener("load", function() {
    setupGame();
});

// Counter to keep track of matching pairs
var matches = 0;

// Object to store flipped cards
var flippedCards = {
    firstCard: null,
    secondCard: null,
};

// Function to set symbols for the game
function setSymbols() {
    // List of symbols
    var symbolArr = ["!", "@", "#", "$", "%", "^", "&", "*"];
    // Get the user-selected number of symbols
    var inputNum = getInput();
    // Remove excess symbols and duplicate the array
    symbolArr.splice(inputNum);
    symbolArr = symbolArr.concat(symbolArr);
    return symbolArr;
}

// Function to display the start form
function showStartForm() {
    var startForm = document.getElementById("startForm");
    startForm.style.display = "";
}

// Function to get user input for the number of symbols
function getInput() {
    var numSymbolsInput = document.getElementById("numSymbols");
    var inputNum = numSymbolsInput.value;
    var MIN_SYMBOLS = 2;
    var MAX_SYMBOLS = 8;

    // Validate and adjust input if necessary
    if (inputNum <= 0) {
        inputNum = MIN_SYMBOLS;
    } else if (inputNum > MAX_SYMBOLS) {
        inputNum = MAX_SYMBOLS;
    }

    return inputNum;
}

// Function to create the game table
function createGameTable() {
    var symbolArr = randArr();
    var gameDiv = document.getElementById("game");
    var messageDiv = createMessageDiv();
    gameDiv.appendChild(messageDiv);

    var table = document.createElement("table");
    var tableContent = '';

    // Populate table cells with symbols
    for (var i = 0; i < symbolArr.length; i++) {
        tableContent += '<td>' + symbolArr[i] + '</td>';
    }

    table.innerHTML = '<tr>' + tableContent + '</tr>';
    gameDiv.appendChild(table);

    setTableWidth(table, symbolArr.length);
}

// Function to set the table width based on the number of symbols
function setTableWidth(table, symbolCount) {
    if (symbolCount >= 12) {
        table.style.width = "410px";
    } else if (symbolCount >= 8) {
        table.style.width = "320px";
    } else {
        table.style.width = "215px";
    }
}

// Function to hide the start form
function hideStartForm() {
    var startForm = document.getElementById("startForm");
    startForm.style.display = "none";
}

// Function to start the game
function startGame() {
    hideStartForm();
    createGameTable();
    initializeCardGame();
}

// Function to initialize the card game
function initializeCardGame() {
    var count = 0;
    var userCount = 0;
    var symbolArr = [];
    var cardCells = document.querySelectorAll("td");
    var messageDiv = document.getElementById("messageDiv");
    var gameDiv = document.getElementById("game");

    cardHover();

    // Event handler for card clicks
    function cardClickHandler(e) {
        if (e.target.className === "card_before") {
            e.target.setAttribute("class", "card_click");
            symbolArr.push(e.target);
            count++;

            // Check for a match after two cards are flipped
            if (count === 2) {
                userCount++;
                messageDiv.innerHTML = "Number of guesses: " + userCount;

                var [sym1, sym2] = symbolArr;
                if (sym1.innerHTML !== sym2.innerHTML) {
                    symbolArr = [];
                    count = 0;

                    // Flip back non-matching cards after a delay
                    setTimeout(function() {
                        sym1.setAttribute("class", "card_before");
                        sym2.setAttribute("class", "card_before");
                    }, 250);
                } else {
                    symbolArr = [];
                    count = 0;
                    var sum = Array.from(cardCells).filter(cell => cell.getAttribute("class") === "card_click").length;

                    // Check if all pairs are matched to end the game
                    if (sum === cardCells.length) {
                        endGame();
                    }
                }
            }
        }
    }

    // Attach click event listeners to each card
    for (var i = 0; i < cardCells.length; i++) {
        cardCells[i].setAttribute("class", "card_before");
        cardCells[i].addEventListener("click", cardClickHandler);
    }
}

// Function to create the message div
function createMessageDiv() {
    var messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", "messageDiv");
    return messageDiv;
}

// Function to display the start form
function showStartForm() {
    var startForm = document.getElementById("startForm");
    startForm.style.display = "";
}

// Function to generate a random arrangement of symbols
function randArr() {
    var symbolArr = setSymbols();
    var fullLength = symbolArr.length;
    var randArr = [];

    while (symbolArr.length > 0) {
        var randNum = Math.floor(Math.random() * symbolArr.length);
        randArr.push(symbolArr[randNum]);
        symbolArr.splice(randNum, 1);
    }

    return randArr;
}

// Function to reset game variables
function resetVariables() {
    flippedCards = {
        firstCard: null,
        secondCard: null,
    };
    matches = 0;
}

// Function to handle the end of the game
function endGame() {
    var gameDiv = document.getElementById("game");
    var winnerDiv = document.createElement("div");
    winnerDiv.setAttribute("id", "winnerDiv");
    winnerDiv.innerHTML = "Congratulations! You Win!";
    
    // Create a "Play Again" button
    var playAgainButton = document.createElement("button");
    playAgainButton.setAttribute("id", "playAgainButton");
    playAgainButton.innerText = "Play Again";
    playAgainButton.addEventListener("click", function() {
        gameDiv.removeChild(table);
        gameDiv.removeChild(messageDiv);
        gameDiv.removeChild(winnerDiv);
        showStartForm();
        resetVariables();
    });
    
    gameDiv.appendChild(winnerDiv);
    gameDiv.appendChild(playAgainButton);
    
    // Reset the game after a delay
    setTimeout(function() {
        var table = document.querySelector("table");
        var messageDiv = document.getElementById("messageDiv");
        gameDiv.removeChild(table);
        gameDiv.removeChild(messageDiv);
        gameDiv.removeChild(winnerDiv);
        showStartForm();
        resetVariables();
    }, 2000);
}

// Function to set up the initial game state
function setupGame() {
    var numSymbolsInput = document.getElementById("numSymbols");
    numSymbolsInput.setAttribute("min", "2");
    numSymbolsInput.setAttribute("max", "8");

    var startButton = document.getElementById("startButton");
    startButton.addEventListener("click", startGame);
}

// Function to handle card hovering effect
function cardHover() {
    var cardCells = document.querySelectorAll("td");  
    for (var i = 0; i < cardCells.length; i++) {
        cardCells[i].addEventListener("mouseover", function() {
            if (this.className === "card_before") {  
                this.style.transform = "scale(1.1)";
            }
        });
        cardCells[i].addEventListener("mouseout", function() {
            if (this.className === "card_before") {  
                this.style.transform = "scale(1)";
            }
        });
    }
}

// Set up the game when the window loads
window.addEventListener("load", function() {
    setupGame();
});




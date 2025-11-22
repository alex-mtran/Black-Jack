let cards = [];
let sum = 0;

let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardEl = document.querySelector("#card-el");
let playerEl = document.getElementById("player-el");

let player = {
    name: "Name",
    chips: 100
}

let gameState = {
    hasBlackJack: false,
    isAlive: false,
    reset: function() {
        cards.length = 0;
        sum = 0;

        player.name = "PlayerName";
        player.chips = 100;

        gameState.hasBlackJack = false;
        gameState.isAlive = true;
        
        newCard();
        newCard();
    }
}

let message = {
    subHead: "",
    sumMessage: "",
    cardMessage: "",
    playerMessage: "",
    update: function() {
        message.cardMessage = "Cards: ";

        for (let i = 0; i < cards.length; ++i) {
            message.cardMessage += ' ' + cards[i];
        }

        if (sum <= 20) {
            message.subHead = "Do you want to draw a new card?";
            message.sumMessage = "Sum: " + sum;
        }
        else if (sum === 21) {
            message.subHead = "You've got Blackjack!";
            gameState.hasBlackJack = true;
            gameState.isAlive = false;
            message.sumMessage = "Sum: " + sum;
        }
        else {
            message.subHead = "You're out of the game!";
            gameState.isAlive = false;
            message.sumMessage = "Sum: " + sum;
        }

        message.playerMessage = player.name + ": $" + player.chips;
    },
    output: function() {
        messageEl.textContent = message.subHead;
        sumEl.textContent = message.sumMessage;
        cardEl.textContent = message.cardMessage;
        playerEl.textContent = message.playerMessage;
    }
}

function startGame() {
    gameState.reset();

    message.update();
    message.output();
}

function randomNum() {
    return Math.floor(Math.random() * (13)) + 1;
}

function numToCardValue(num) {
    if (num === 1) {
        return 11;
    }
    else if (num > 10) {
        return 10;
    }
    else {
        return num;
    }
}

function newCard() {
    if (gameState.isAlive === false) {
        return;
    }
    let addedCardValue = numToCardValue(randomNum());
    cards.push(addedCardValue);
    sum += addedCardValue;

    message.update();
    message.output();
}
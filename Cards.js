function pageLoad() {
    let colours = ['R', 'B', 'Y'];
    let values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    let deck = getDeck(colours, values);
    let shuffledDeck = shuffle(deck);
    document.getElementById("buttonPlayGame").addEventListener("click", playGame(shuffledDeck));
}

function playGame(shuffledDeck){
      let player = winningPlayer(shuffledDeck);
}

//Creates an array(deck) of objects(cards)
function getDeck(colours, values) {
    //debugger;
    let deck = new Array();
    for (let i = 0; i < colours.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = {Suit: colours[i], Value: values[j]};
            deck.push(card);
        }
    }
    return deck;
}

//Shuffles the deck randomly
function shuffle(deck) {
    for (let i = 0; i < 1000; i++) {
        let random1 = Math.floor((Math.random() * deck.length));
        let random2 = Math.floor((Math.random() * deck.length));
        let temp = deck[random1];
        deck[random1] = deck[random2];
        deck[random2] = temp;
    }
    return deck;
}

//Loops through the shuffled deck, picking pairs of cards to compare.  Uses rules to decide the winner.
//The winning card is pushed onto playerOneDeck array or playerTwoDeck array.
//The winning player is the largest array. This is displayed.
function winningPlayer(deck) {
    let playerOneDeck = new Array();
    let playerTwoDeck = new Array();
    let i = 1;
    while (i < deck.length) {
        if (deck[i - 1].Suit == deck[i].Suit) {
            if (deck[i - 1].Value > deck[i].Value) {
                playerOneDeck.push({Suit: deck[i - 1].Suit, Value: deck[i - 1].Value});
                playerOneDeck.push({Suit: deck[i].Suit, Value: deck[i].Value});
            } else {
                playerTwoDeck.push({Suit: deck[i - 1].Suit, Value: deck[i - 1].Value});
                playerTwoDeck.push({Suit: deck[i].Suit, Value: deck[i].Value});
            }
        } else {
            if (deck[i - 1].Suit == 'R') {
                if (deck[i].Suit == 'B') {
                    playerOneDeck.push({Suit: deck[i - 1].Suit, Value: deck[i - 1].Value});
                    playerOneDeck.push({Suit: deck[i].Suit, Value: deck[i].Value});
                } else if (deck[i].Suit == 'Y') {
                    playerTwoDeck.push({Suit: deck[i - 1].Suit, Value: deck[i - 1].Value});
                    playerTwoDeck.push({Suit: deck[i].Suit, Value: deck[i].Value});
                }
            } else if (deck[i - 1].Suit == 'Y') {
                if (deck[i].Suit == 'R') {
                    playerOneDeck.push({Suit: deck[i - 1].Suit, Value: deck[i - 1].Value});
                    playerOneDeck.push({Suit: deck[i].Suit, Value: deck[i].Value});
                } else if (deck[i].Suit == 'B') {
                    playerTwoDeck.push({Suit: deck[i - 1].Suit, Value: deck[i - 1].Value});
                    playerTwoDeck.push({Suit: deck[i].Suit, Value: deck[i].Value});
                }
            } else if (deck[i - 1].Suit == 'B') {
                if (deck[i].Suit == 'Y') {
                    playerOneDeck.push({Suit: deck[i - 1].Suit, Value: deck[i - 1].Value});
                    playerOneDeck.push({Suit: deck[i].Suit, Value: deck[i].Value});
                } else if (deck[i].Suit == 'R') {
                    playerTwoDeck.push({Suit: deck[i - 1].Suit, Value: deck[i - 1].Value});
                    playerTwoDeck.push({Suit: deck[i].Suit, Value: deck[i].Value});
                }
            }
        }
        i = i + 2;  //increment in pairs

    }
    if (playerOneDeck.length > 26 || playerTwoDeck.length > 26) console.log("-------------------------------------------GREATER THAN 26---------------------------------");
    console.log(playerOneDeck.length + " " + playerTwoDeck.length);
    console.log(playerOneDeck);
    console.log(playerTwoDeck);
    //Find the largest deck to determine the winner.
    if (playerOneDeck.length > playerTwoDeck.length) {
        showDeck("Player One", playerOneDeck);
        return "Player One";
    } else {
        showDeck("Player Two", playerTwoDeck);
        return "Player Two";
    }
}

function showDeck(winner, deck) {
    debugger;
    let deckHTML = '<table><tr>'
    let card = "";
    let image = "";
    let winnerHTML = `<hi>The Winner is ${winner}</h1>`;
    document.getElementById("winningPlayer").innerHTML= winnerHTML + " with ";
    document.getElementById("noOfCards").innerHTML=" " + deck.length + " cards ";
    for (let i = deck.length-1; i >= 0; i--) {
        card = deck[i].Suit + deck[i].Value;      //Card suit and value
        image = "img/" + deck[i].Suit + deck[i].Value + ".jpg";  //image name is SuitValue.jpg
        deckHTML += `<td>${card}</td><td><img src=${image} width="40px" height="60px"></td>`;
    }
    deckHTML += '</tr></table>';
    document.getElementById("winner").innerHTML = deckHTML;
}



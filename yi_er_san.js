function builder(num) {
    let outerDiv = document.createElement("div");
    let dieArray = pips[num-1];
    for (i=1; i<10; i++) {
        let innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "dot");
        if(dieArray.includes(i)) {
            innerDiv.classList.add("black");
        }
        outerDiv.append(innerDiv);
    }
    outerDiv.setAttribute("class", "dicer");
    return outerDiv;
}

function check123(player) {
    if ( player === "p1" ) {
        return (diceRollsOne.includes(1) && diceRollsOne.includes(2) && diceRollsOne.includes(3));
    } else {
        return (diceRollsTwo.includes(1) && diceRollsTwo.includes(2) && diceRollsTwo.includes(3));
    }
}

function check456(player) {
    if ( player === "p1" ) {
        return (diceRollsOne.includes(4) && diceRollsOne.includes(5) && diceRollsOne.includes(6));
    } else {
        return (diceRollsTwo.includes(4) && diceRollsTwo.includes(5) && diceRollsTwo.includes(6));
    }
}

function checkDraw() {
    let sumOne = 0;
    let sumTwo = 0;
    for ( let i = 0; i < diceRollsOne.length; i++) {
        sumOne += diceRollsOne[i];
    }
    for ( let i = 0; i < diceRollsTwo.length; i++ ) {
        sumTwo += diceRollsTwo[i];
    }
    return sumOne === sumTwo;
}

function triple(player) {
    if ( player === "p1" ) {
        return ( diceRollsOne[0] === diceRollsOne[1] && diceRollsOne[1] === diceRollsOne[2] );
    } else {
        return ( diceRollsTwo[0] === diceRollsTwo[1] && diceRollsTwo[1] === diceRollsTwo[2] );
    }
}

function checkWinner() {
    if ( triple("p1") ) { return "Player One" };
    if ( check456("p1") ) { return "Player One" };
    if ( check123("p1") ) { return "Player Two" };
    if ( triple("p2") ) { return "Player Two" };
    if ( check456("p2") ) { return "Player Two" };
    if ( check123("p2") ) { return "Player One" };
    if ( checkDraw() ) { return "Draw" };
    return diceRollsOne[0] + diceRollsOne[1] + diceRollsOne[2] > diceRollsTwo[0] + diceRollsTwo[1] + diceRollsTwo[2] ? "Player One" : "Player Two";
}

function roll(num) {
    let rNumber = Math.floor(Math.random() * num) + 1;
    return rNumber;
}
function updateOutput(el, num) {
    let holder = builder(num);
    if(el.children[0]) { el.children[0].remove(); }
    el.appendChild(holder);
}

// main
const buttonP1 = document.querySelector("#button-p1");
const buttonP2 = document.querySelector("#button-p2");
const output = document.querySelector(".output");
const playerOneDieOne = document.querySelector("#player__p-one-die1");
const playerOneDieTwo = document.querySelector("#player__p-one-die2");
const playerOneDieThree = document.querySelector("#player__p-one-die3");
const playerTwoDieOne = document.querySelector("#player__p-two-die1");
const playerTwoDieTwo = document.querySelector("#player__p-two-die2");
const playerTwoDieThree = document.querySelector("#player__p-two-die3");
const pips = [
    [5],
    [1, 9],
    [1, 5, 9],
    [1, 3, 7, 9],
    [1, 3, 5, 7, 9],
    [1, 3, 4, 6, 7, 9]
];
const diceRollsOne = [];
const diceRollsTwo = [];

// player one starting state
updateOutput(playerOneDieOne, 1);
updateOutput(playerOneDieTwo, 1);
updateOutput(playerOneDieThree, 1);

// player two starting state
updateOutput(playerTwoDieOne, 1);
updateOutput(playerTwoDieTwo, 1);
updateOutput(playerTwoDieThree, 1);

buttonP1.addEventListener("click", function () {
    for ( let i = 0; i < 3; i++ ) {
        diceRollsOne.pop();
    }
    console.log(diceRollsOne);
    let rolls = [
        roll(6),
        roll(6),
        roll(6)
    ];
    for ( let number of rolls ) {
        diceRollsOne.push(number);
    }
    console.log(diceRollsOne);
    updateOutput(playerOneDieOne, rolls[0]);
    updateOutput(playerOneDieTwo, rolls[1]);
    updateOutput(playerOneDieThree, rolls[2]);
}
)

buttonP2.addEventListener("click", function () {
    for ( let i = 0; i < 3; i++ ) {
        diceRollsTwo.pop();
    }
    console.log(diceRollsTwo);
    let rolls = [
        roll(6),
        roll(6),
        roll(6)
    ];
    for ( let number of rolls ) {
        diceRollsTwo.push(number);
    }
    console.log(diceRollsTwo);
    updateOutput(playerTwoDieOne, rolls[0]);
    updateOutput(playerTwoDieTwo, rolls[1]);
    updateOutput(playerTwoDieThree, rolls[2]);
    let temp = checkWinner();
    if ( temp === "Draw" ) {
        output.innerHTML = temp;
    } else {
        output.innerHTML = `${temp} Wins!`;
    }
}
)

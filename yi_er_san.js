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

function check123(n1, n2, n3) {
    diceRollArray = [ n1, n2, n3 ];
    return (diceRollArray.includes(1) && diceRollArray.includes(2) && diceRollArray.includes(3));
}

function roll(num) {
    let rNumber = Math.floor(Math.random() * num) + 1;
    return rNumber;
}

const button = document.querySelector("button");
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

button.addEventListener("click", function () {
    let rolls = [
        roll(6),
        roll(6),
        roll(6),
        roll(6),
        roll(6),
        roll(6)
    ];
    let temp;
    if ( rolls[0] + rolls[1] + rolls[2] === rolls[3] + rolls[4] + rolls[5] ) {
        temp = "Draw";
    } else if ( check123(rolls[0], rolls[1], rolls[2]) ) {
        temp = "Player Two Wins!";
    } else if ( check123(rolls[3], rolls[4], rolls[5]) ) {
        temp = "Player One Wins!";
    } else if ( rolls[0] + rolls[1] + rolls[3] > rolls[3] + rolls[4] + rolls[5] ) {
        temp = "Player One Wins!";
    } else {
        temp = "Player Two Wins!";
    }
    updateOutput(playerOneDieOne, rolls[0]);
    updateOutput(playerOneDieTwo, rolls[1]);
    updateOutput(playerOneDieThree, rolls[2]);
    updateOutput(playerTwoDieOne, rolls[3]);
    updateOutput(playerTwoDieTwo, rolls[4]);
    updateOutput(playerTwoDieThree, rolls[5]);
    output.innerHTML = temp;
}
)

function updateOutput(el, num) {
    let holder = builder(num);
    if(el.children[0]) { el.children[0].remove(); }
    el.appendChild(holder);
}
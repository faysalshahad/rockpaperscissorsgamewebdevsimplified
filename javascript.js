const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const computerScoreSpan = document.querySelector("[data-computer-score]");
const yourScoreSpan = document.querySelector("[data-your-score]");
const selectionArray = [
    {
        name: "rock",
        emoji: "✊",
        beats: "scissors"

    },
    {
        name: "paper",
        emoji: "✋",
        beats: "rock"

    },
    {
        name: "scissors",
        emoji: "✌️",
        beats: "paper"

    }
];

selectionButtons.forEach((selectionButton) =>{
    selectionButton.addEventListener("click", (e) => {
        /**This will give us the name of the each button such as rock pepper scissors */
       const selectionName = selectionButton.dataset.selection;
       const selection = selectionArray.find((selection) => {
        return selection.name === selectionName});
        //console.log("My Selection Name " + selection.name);
       makeSelection(selection);

    });
});

function makeSelection(selection) {
    const computerSelection = randomSelection();  
    const youWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
     /**Testing to see if the code is working or not */
     console.log("Printing out my selection " + selection.name); 
      /**Testing to see if the code is working or not 
       * for generating random numbers for computer selection*/
    console.log("Printing out computer selection " + computerSelection.name);
    /**The reason we are passing the computer selection and winner first and 
     * my selection and winner later on is because we want to insert these emoji
     * elements instead of adding them to the end. We want to directly insert them
     * immediately after the computer text into our grid and your score text.*/
    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, youWinner);
    if (youWinner) { 
    incrementScore(yourScoreSpan);
    } 
    if (computerWinner) {
    incrementScore(computerScoreSpan);
    }
};

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
    const div = document.createElement("div");
    div.innerText = selection.emoji;
    div.classList.add("result-selection");
    if (winner) {
        div.classList.add("winner");
    }
    finalColumn.after(div);    
};

function isWinner(selection, opponentSelection) {
    /**Checking if your selected item in the array has the same beats name as
     * computers selected item name. */
    return selection.beats === opponentSelection.name;
    
};

function randomSelection() {
    /**Creating Random value for computer to generate a random items among 
     * rock, pepper, scissors. */
    const randomIndex = Math.floor(Math.random() * selectionArray.length); 
    return selectionArray[randomIndex];  
};
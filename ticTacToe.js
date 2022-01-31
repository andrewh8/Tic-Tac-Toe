
// factory to create objects for each player
const createPlayerObject = (name, marker) => {
    return { name, marker}
}


// module - Game Board
const gameBoard = (() => {

    // initialize the gameBoard array
    const gameBoardArray = ['','','','','','','','',''];

    // cache the DOM
    let gameBoard = document.querySelector('.board');
    let resetButton = document.querySelector('.reset');

    // bind events
    gameBoard.addEventListener('click', _updateArray);
    resetButton.addEventListener('click', _resetGameBoard);

    // reset game if reset button is clicked
    function _resetGameBoard(){
        for (let i = 0; i < gameBoardArray.length; i++){
            gameBoardArray[i] = '';
        }
        displayController.updateDisplay();
        gameController.resetGameControls();
    }

    // if game isn't over and target array index is empty, fill index with current player, switch players, and update display
    function _updateArray(e){
        if (gameController.gameStatus() !== 'over' && gameBoardArray[e.target.id] === "") {
            gameBoardArray[e.target.id] = gameController.getCurrentPlayer().marker;
            displayController.updateDisplay();
            gameController.gameStatus();
            gameController.switchPlayer();
        } else {
            return;
        }
    }

    // store gameBoardArray in a function for public use
    function publicArray(){
        return gameBoardArray;
    }

    return { publicArray };
})()


// module - Display Controller
const displayController = (() => {

    // cache the DOM
    let winner = document.querySelector('.winner');
    let cells = [];
    for (let i = 0; i < gameBoard.publicArray().length; i++){
        cells[i] = document.getElementById(`${i}`)
    }
    
    // display winner
    function displayWinner(){
        winner.textContent = `${gameController.getCurrentPlayer().name} Wins!`;
    }

    function tieGame(){
        winner.textContent = 'Tie!';
    }

    // remove winner display
    function resetWinner(){
        winner.textContent = '';
    }

    // update the display to match the Game Board array each time the array is updated
    function updateDisplay(){
        for (let i = 0; i < gameBoard.publicArray().length; i++){
            cells[i].textContent = `${gameBoard.publicArray()[i]}`;
        }
    }

    return { updateDisplay, displayWinner, resetWinner, tieGame }

})()
    


// module - Game Controller
const gameController = (() => {

    // initialize players
    let playerX = createPlayerObject('Player X', 'X');
    let playerO = createPlayerObject('Player O', 'O');

    // initialize game state
    let gameState = 'not over';
    let gameRound = 0;

    // initialize the current player as X
    let player = playerX;

    // output the current player
    function getCurrentPlayer(){
        gameRound++;
        return player;
    }

    // switch players each time the switchPlayer function is called
    function switchPlayer(){
        if (player === playerX){
            player = playerO;
        } else if (player === playerO){
            player = playerX
        }
        return player;
    }

    // check to see if the current player won each time the array is updated
    function gameStatus() {
        if (gameBoard.publicArray()[0] === player.marker && gameBoard.publicArray()[1] === player.marker 
            && gameBoard.publicArray()[2] === player.marker){
                gameState = 'over';
                displayController.displayWinner();
            }
        if (gameBoard.publicArray()[3] === player.marker && gameBoard.publicArray()[4] === player.marker 
        && gameBoard.publicArray()[5] === player.marker){
            gameState = 'over';
            displayController.displayWinner();
        }
        if (gameBoard.publicArray()[6] === player.marker && gameBoard.publicArray()[7] === player.marker 
        && gameBoard.publicArray()[8] === player.marker){
            gameState = 'over';
            displayController.displayWinner();
        }
        if (gameBoard.publicArray()[0] === player.marker && gameBoard.publicArray()[3] === player.marker 
        && gameBoard.publicArray()[6] === player.marker){
            gameState = 'over';
            displayController.displayWinner();
        }
        if (gameBoard.publicArray()[1] === player.marker && gameBoard.publicArray()[4] === player.marker 
        && gameBoard.publicArray()[7] === player.marker){
            gameState = 'over';
            displayController.displayWinner();
        }
        if (gameBoard.publicArray()[2] === player.marker && gameBoard.publicArray()[5] === player.marker 
        && gameBoard.publicArray()[8] === player.marker){
            gameState = 'over';
            displayController.displayWinner();
        }
        if (gameBoard.publicArray()[0] === player.marker && gameBoard.publicArray()[4] === player.marker 
        && gameBoard.publicArray()[8] === player.marker){
            gameState = 'over';
            displayController.displayWinner();
        }
        if (gameBoard.publicArray()[6] === player.marker && gameBoard.publicArray()[4] === player.marker 
        && gameBoard.publicArray()[2] === player.marker){
            gameState = 'over';
            displayController.displayWinner();
        } else if (gameState = 'not over' && gameRound === 9){
            gameState = 'over';
            displayController.tieGame();
        }
            
        return gameState;
    }

    // reset game when reset button is clicked
    function resetGameControls(){
        player = playerX;
        gameRound = 0;
        gameState = 'not over';
        displayController.resetWinner();
    }

    return { getCurrentPlayer, switchPlayer, gameStatus, resetGameControls }

})()

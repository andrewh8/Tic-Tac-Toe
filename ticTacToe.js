
// factory to create objects for each player
const playerFactory = (name, marker) => {
    return { name, marker}
}


// module - Game Board
const gameBoard = (() => {

    // initialize the gameBoard array
    const boardArray = ['','','','','','','','',''];

    // cache the DOM
    let board = document.querySelector('.board');
    let reset = document.querySelector('.reset');

    // bind events
    board.addEventListener('click', _updateArray);
    reset.addEventListener('click', _resetGameBoard);

    // reset game if reset button is clicked
    function _resetGameBoard(){
        for (let i = 0; i < boardArray.length; i++){
            boardArray[i] = '';
        }
        displayController.updateDisplay();
        gameController.resetGameControls();
    }

    // if game isn't over and target array index is empty, fill index with current player, switch players, and update display
    function _updateArray(e){
        if (gameController.gameStatus() !== 'over' && boardArray[e.target.id] === "") {
            boardArray[e.target.id] = gameController.currentPlayer().marker;
            gameController.switchPlayer();
            displayController.updateDisplay();
        } else {
            return;
        }
    }

    // store boardArray in a function for public use
    function publicArray(){
        return boardArray;
    }

    return { publicArray };
})()


// module - Display Controller
const displayController = (() => {

    // cache the DOM
    let cells = [];
    for (let i = 0; i < gameBoard.publicArray().length; i++){
        cells[i] = document.getElementById(`${i}`)
    }

    // update the display to match the Game Board array each time the array is updated
    function updateDisplay(){
        for (let i = 0; i < gameBoard.publicArray().length; i++){
            cells[i].textContent = `${gameBoard.publicArray()[i]}`;
        }
    }

    return { updateDisplay }

})()
    


// module - Game Controller
const gameController = (() => {

    // initialize players
    let playerX = playerFactory('Player X', 'X');
    let playerO = playerFactory('Player O', 'O');

    // initialize game state
    let gameState = 'not over';

    // initialize the current player as X
    let player = playerX;

    // output the current player
    function currentPlayer(){
        return player;
    }

    // switch players each time the currentPlayer function is called
    function switchPlayer(){
        if (player === playerX){
            player = playerO;
        } else if (player === playerO){
            player = playerX
        }
        return player;
    }

    // check to see if the current player won each time the array is updated
    function gameStatus() { ///////////////////////////////////////////////////////////////////////////////////////
        gameState = 'not over';
        return gameState;
    }

    // reset game when reset button is clicked
    function resetGameControls(){
        player = playerX;
        gameState = 'not over';
    }

    return { currentPlayer, switchPlayer, gameStatus, resetGameControls }

})()

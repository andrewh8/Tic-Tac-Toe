
// factory to create objects for each player
const playerFactory = (name, marker) => {
    return { name, marker}
}


// module Game Board
// this module will control the game board array and update it when DOM elements are clicked
// this module will rely on input from the Game Controller module for when the game is over and whose turn it is
// this module will output the array, which will be used by both the Display Controller and Game Controller modules
    // Display Controller will update the display to match the array
    // Game Controller will use the array to check if the game is over and if the current player needs to switch
const gameBoard = (() => {
    // initialize the array
    const boardArray = ['','','','','','','','',''];
    // get input from Game Controller for if reset button is clicked
        // if reset button is clicked, re-initialize the array
        //if (gameController.reset() === 'true'){ ///////////////////////////////////////////////////////////
        //    boardArray = ['','','','','','','','',''];
        //} /////////////////////////////////////////////////////////////////////////////////////////////////
    // update the array when the DOM is clicked
        // cache the DOM
        let board = document.querySelector('.board');
        // add event listener on DOM
        board.addEventListener('click', _updateArray);
        // add function for updating array
        function _updateArray(e){
            // get game status (over or not) from Game Controller
            // check if array position is already taken
            if (gameController.gameStatus() !== 'over' && boardArray[e.target.id] === "") {
                // get the current player from the Game Controller, and fill the array index
                boardArray[e.target.id] = gameController.currentPlayer().marker;
                // pass boardArray to Display Controller to update the display
                displayController.updateDisplay();
            } else {
                return;
            }
        }
    // store board array in a function for public use
    function publicArray(){
        return boardArray;
    }
    
    return { publicArray };
})()


// module Display Controller
const displayController = (() => {

    // update the display to match the array
        // cache the DOM
        let cells = [];
        for (let i = 0; i < gameBoard.publicArray().length; i++){
            cells[i] = document.getElementById(`${i}`)
        }

        // update the display to match the Game Board array if the array is updated
        function updateDisplay(){
            for (let i = 0; i < gameBoard.publicArray().length; i++){
                cells[i].textContent = `${gameBoard.publicArray()[i]}`;
            }
        }


    return { updateDisplay }

})()
    


// module Game Controller
const gameController = (() => {

    // initialize players
    let playerX = playerFactory('Player X', 'X');
    let playerO = playerFactory('Player O', 'O');
    // initialize the current player as X
    let player = playerX;
    // switch players each time the array is updated
        // initialize controller array to match gameboard array
        let controllerArray = ['','','','','','','','',''];
        // switch player if the controllerArray doesn't match the gameBoard array, and update controllerArray
        // when currentPlayer is executed, the result's marker will go into the target index of boardArray in Game Board
        function currentPlayer(){
            for (let i = 0; i < controllerArray.length; i++){
                if (controllerArray[i] !== gameBoard.publicArray()[i]){
                    if (player === playerX){
                        player = playerO;
                        controllerArray[i] = gameBoard.publicArray()[i];
                    } else if (player === playerO){
                        player = playerX
                        controllerArray[i] = gameBoard.publicArray()[i];
                    }
                }
            }
            return player;
        }
    // check to see if the current player won each time the array is updated
        // pass game status to the Game Board, to stop cells from being clicked after game is over
        function gameStatus() { /////////////////////////////////////////////////////////////////////////
            return 'notOver';
        } ///////////////////////////////////////////////////////////////////////////////////////////////
        // if player wins, tell Display Controller to display the winner
    // if reset button is clicked, reset the game and tell Game Board to re-initialize


    return { currentPlayer, gameStatus }
})()
    
























/*const playerOne = playerFactory('Player One', 'X');
const playerTwo = playerFactory('Player Two', 'O');*/


/*const gameBoard = (() => {

    let player = '';
    let markerArray = ['','','','','','','','',''];

    // cache DOM
    let board = document.querySelector('.board');

    // bind events
    board.addEventListener('click', setMarker);

    function setMarker(e){
        if (markerArray[e.target.id] === "") {
            switchPlayer();
            markerArray[e.target.id] = player.marker;
            e.target.innerText = player.marker;
        } else {
            return;
        }
    }

    function switchPlayer(){
        if (player === ''){
            player = playerOne;
            return player;
        }
        if (player === playerOne){
            player = playerTwo;
            return player;
        } else if (player === playerTwo){
            player = playerOne;
            return player;
        }
    }

    function publicArray(){
        return markerArray;
    }

    return { publicArray }
})()
*/

// initialize X as the starting player
let turn = 'O';

// intialize gameBoard array
let gameBoard = [];

// get the gameBoard node in the DOM
const board = document.querySelector('.board');

// in the gameBoard array, create 3 rows of 3 cells each
// on the gameBoard node in the DOM, create divs for each row and for each cell in each row
// add a clickevent to each DOM cell that associates it with the index in the array
for (let i = 0; i < 3; i++){
    gameBoard.push([]);
    let row = document.createElement('div');
    row.classList.add('row');
    board.appendChild(row);
    for (let j = 0; j < 3; j++){
        gameBoard[i].push('');
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => {
            if (gameBoard[i][j] === ''){
                // set the marker based on which player's turn it is
                playerTurn();
                // place player marker in the array and on the board
                //gameBoard[i][j] = 'X';
                gameBoard[i][j] = turn;
                cell.textContent = gameBoard[i][j];
                // check each adjacent cell for player marker
                checkWin(i, j);
            } else {
                return;
            }
        })
        row.appendChild(cell);
    }
}

// function for checking if a player has won
function checkWin(i, j){
    // check current row and column
    if (gameBoard[i][0]==="X" && gameBoard[i][1]==="X" && gameBoard[i][2]==="X"){
        alert('You Win!');
    }
    if (gameBoard[0][j]==="X" && gameBoard[1][j]==="X" && gameBoard[2][j]==="X"){
        alert('You Win!')
    }
    // check diagonals
    if ((i === 0 && j === 0) || (i === 1 && j === 1) || (i === 2 && j === 2)){
        if (gameBoard[0][0] === "X" && gameBoard[1][1] === "X" && gameBoard[2][2] === "X"){
            alert('You Win!')
        }
    }
    if ((i === 2 && j === 0) || (i === 1 && j === 1) || (i === 0 && j === 2)){
        if (gameBoard[2][0] === "X" && gameBoard[1][1] === "X" && gameBoard[0][2] === "X"){
            alert('You Win!')
        }
    }
}

// rotate turns between X and O every time a cell is clicked
function playerTurn(){
    if (turn === 'X'){
        turn = "O";
        return turn;
    } else if (turn === 'O'){
        turn = "X";
        return turn;
    }
}
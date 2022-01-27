
// initialize X as the starting player
let turn = 'O';
let winner = '';
let gameOver = false;
let counter = 0;

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
    if (i === 0 || i === 1){
        row.classList.add('rowBorder');
    }
    board.appendChild(row);
    for (let j = 0; j < 3; j++){
        gameBoard[i].push('');
        let cell = document.createElement('div');
        cell.classList.add('cell');
        if (j === 0 || j === 1){
            cell.classList.add('cellBorder');
        }
        cell.addEventListener('click', () => {
            if (gameOver === false && gameBoard[i][j] === ''){
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
    if (gameBoard[i][0]=== turn && gameBoard[i][1]=== turn && gameBoard[i][2]=== turn){
        alert(`${winner} Wins!`);
        gameOver = true;
    }
    if (gameBoard[0][j]=== turn && gameBoard[1][j]=== turn && gameBoard[2][j]=== turn){
        alert(`${winner} Wins!`)
        gameOver = true;
    }
    // check diagonals
    if ((i === 0 && j === 0) || (i === 1 && j === 1) || (i === 2 && j === 2)){
        if (gameBoard[0][0] === turn && gameBoard[1][1] === turn && gameBoard[2][2] === turn){
            alert(`${winner} Wins!`)
            gameOver = true;
        }
    }
    if ((i === 2 && j === 0) || (i === 1 && j === 1) || (i === 0 && j === 2)){
        if (gameBoard[2][0] === turn && gameBoard[1][1] === turn && gameBoard[0][2] === turn){
            alert(`${winner} Wins!`)
            gameOver = true;
        }
    }
    if (counter === 9 && gameOver === false) {
        gameOver = true;
        alert('It\'s a tie!');
    }
}

// rotate turns between X and O every time a cell is clicked
function playerTurn(){
    if (turn === playerOne.marker){
        turn = playerTwo.marker;
        winner = playerTwo.name;
        counter++;
        return turn;
    } else if (turn === playerTwo.marker){
        turn = playerOne.marker;
        winner = playerOne.name;
        counter++;
        return turn;
    }
}

// object for holding player information
const playerOne = {
    marker: 'X',
    name: 'Player One'
}

// object for holding player information
const playerTwo = {
    marker: 'O',
    name: 'Player Two'
}
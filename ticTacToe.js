let gameBoard = [];
const board = document.querySelector('.board');
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
            gameBoard[i][j] = 'X';
            cell.textContent = gameBoard[i][j];
        })
        row.appendChild(cell);
    }
}
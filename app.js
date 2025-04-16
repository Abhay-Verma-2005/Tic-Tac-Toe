//tic tac toe game
let boxes = document.querySelectorAll('.box');
let msgBox = document.querySelector('#message');
let rst = document.querySelector('#restart');

let winG = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8], [2, 4, 6]];

let currentPlayer='X';
let gameBoard=Array(9).fill('');
let StartON=true;

let checkWin = () => {
    return winG.some(comb =>
        comb.every(index => gameBoard[index] === currentPlayer)
    );
};

let SendMsg = (text) => {
    msgBox.textContent = text;
};

let resetGame = () => {
    gameBoard.fill('');
    currentPlayer = 'X';
    StartON = true;
    SendMsg("Player X's turn");

    boxes.forEach((box) => {
        box.textContent = '';
        box.className = 'box';
    });
};

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (!gameBoard[index] && StartON) {
            gameBoard[index] = currentPlayer;
            box.textContent = currentPlayer;
            box.classList.add(currentPlayer.toLowerCase());

            if (checkWin()) {
                SendMsg(`Player ${currentPlayer} wins!`);
                StartON = false;
            } else if (gameBoard.every(cell => cell)) {
                SendMsg('Game ended in a draw!');
                StartON = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                SendMsg(`Player ${currentPlayer}'s turn`);
            }
        }
    });
});

rst.addEventListener('click', resetGame);
SendMsg("Player X's turn");

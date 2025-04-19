//tic tac toe game
let boxes = document.querySelectorAll('.box');
let msgBox = document.querySelector('#message');
let rst = document.querySelector('#restart');
let winG = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8], [2, 4, 6]];
let currentPlayer='X';
let gameBoard=Array(9).fill('');
let StartON=true;

let checkWin = () => {
    for (let combination of winG) {
        if (combination.every(index => gameBoard[index] === currentPlayer)) {
            return combination; 
        }
    }
    return null; 
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

let handleWinAnimation = (winningCombo) => {
    winningCombo.forEach(index => {
        boxes[index].classList.add('winning');
    });
    
    setTimeout(() => {
        winningCombo.forEach(index => {
            boxes[index].classList.remove('winning');
        });
        
        boxes.forEach((box, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const distance = Math.sqrt(Math.pow(row, 2) + Math.pow(col, 2));
            const delay = distance * 100; 
            
            setTimeout(() => {
                box.classList.add('game-over');
            }, delay);
        });
    }, 800);
};

let handleDrawAnimation = () => {
    boxes.forEach((box, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const distance = Math.sqrt(Math.pow(row, 2) + Math.pow(col, 2));
        const delay = distance * 100; 
        setTimeout(() => {
            box.classList.add('draw');
        }, delay);
    });
};

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (!gameBoard[index] && StartON) {
            gameBoard[index] = currentPlayer;
            box.textContent = currentPlayer;
            box.classList.add(currentPlayer.toLowerCase());
            
            const winningCombo = checkWin();
            if (winningCombo) {
                SendMsg(`Player ${currentPlayer} wins!`);
                StartON = false;
                handleWinAnimation(winningCombo);
            } else if (gameBoard.every(cell => cell)) {
                SendMsg('Game ended in a draw!');
                StartON = false;
                handleDrawAnimation();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                SendMsg(`Player ${currentPlayer}'s turn`);
            }
        }
    });
});

rst.addEventListener('click', resetGame);
SendMsg("Player X's turn");

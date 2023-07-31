// 定義棋盤和棋子
let board;
let currentPlayer;
let isAiGame;

// 初始化遊戲
function startGame(aiGame) {
    board = Array(3).fill().map(() => Array(3).fill(''));
    currentPlayer = 'x';
    isAiGame = aiGame;
    drawBoard();
}

// 繪製棋盤
function drawBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const rowElement = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cellElement = document.createElement('td');
            cellElement.className = 'cell ' + board[i][j];
            cellElement.onclick = function() { handleMove(i, j); };
            rowElement.appendChild(cellElement);
        }
        boardElement.appendChild(rowElement);
    }
}

// 處理玩家的移動
function handleMove(i, j) {
    if (board[i][j] !== '') return;
    board[i][j] = currentPlayer;
    drawBoard();
    if (checkWin(currentPlayer)) {
        alert(currentPlayer.toUpperCase() + ' wins!');
        startGame(isAiGame);
        return;
    }
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    if (isAiGame && currentPlayer === 'o') {
        makeAiMove();
    }
}

// 檢查勝利條件
function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false;
}

// AI 的移動
function makeAiMove() {
    // 這裡我們只是做一個簡單的 AI，並沒有使用任何高級的演算法，如 Minimax 或 Alpha-Beta 剪枝
    // 因此，這個 AI 的能力遠遠不足以與世界排名前一百的玩家相比
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'o';
                drawBoard();
                if (checkWin('o')) {
                    alert('O wins!');
                    startGame(isAiGame);
                }
                currentPlayer = 'x';
                return;
            }
        }
    }
}

// 開始遊戲
startGame(false);

const WINS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const score = {
    X: 0,
    O: 0,
    e: 0
};

const statusEl = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

function updateScore() {
    document.getElementById("sx").textContent = score.X;
    document.getElementById("so").textContent = score.O;
    document.getElementById("se").textContent = score.e;
}

function checkWinner() {

    for (const combo of WINS) {

        const [a, b, c] = combo;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            gameOver = true;

            score[board[a]]++;

            updateScore();

            statusEl.textContent = "🏆 Ganó " + board[a];
            GameAudio.win();

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            return;
        }
    }

    if (board.every(cell => cell != "")) {

        gameOver = true;

        score.e++;

        updateScore();

        statusEl.textContent = "🤝 ¡Empate!";
        GameAudio.draw();
    }
}

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        const index = cell.dataset.index;

        if (board[index] || gameOver)
            return;

        board[index] = currentPlayer;
        GameAudio.click();

        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer.toLowerCase());

        checkWinner();

        if (!gameOver) {

            currentPlayer = currentPlayer === "X" ? "O" : "X";

            statusEl.textContent = "Turno de " + currentPlayer;
        }

    });

});

document.getElementById("restart").addEventListener("click", () => {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameOver = false;

    statusEl.textContent = "Turno de X";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.className = "cell";

    });

});
document.addEventListener('DOMContentLoaded', () => {
    // Game state variables
    let gameActive = true;
    let currentPlayer = 'x';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    // DOM elements
    const statusDisplay = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');

    // Messages
    const winningMessage = () => `Player ${currentPlayer.toUpperCase()} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer.toUpperCase()}'s turn`;

    // Winning conditions
    const winningConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];

    // Initialize the game
    statusDisplay.textContent = currentPlayerTurn();

    // Handle cell click
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        // Check if cell is already played or game is inactive
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // Update game state and UI
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    // Update cell and game state
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer);
    }

    // Check for win or draw
    function handleResultValidation() {
        let roundWon = false;
        let winningCells = [];

        // Check all winning conditions
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];

            if (condition) {
                roundWon = true;
                winningCells = [a, b, c];
                break;
            }
        }

        // Handle win
        if (roundWon) {
            statusDisplay.textContent = winningMessage();
            gameActive = false;

            // Highlight winning cells
            winningCells.forEach(index => {
                document.querySelector(`[data-cell-index="${index}"]`).classList.add('winning');
            });

            return;
        }

        // Handle draw
        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.textContent = drawMessage();
            gameActive = false;
            return;
        }

        // Continue game with next player
        handlePlayerChange();
    }

    // Switch player
    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        statusDisplay.textContent = currentPlayerTurn();
    }

    // Restart game
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'x';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = currentPlayerTurn();

        // Reset cell classes
        cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'winning');
        });
    }

    // Event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
});

// Game Constants
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 20;
const PLAYER_CHAR = '^';
const ENEMY_CHARS = ['W', 'M', 'X'];
const PLAYER_PROJECTILE = '|';
const ENEMY_PROJECTILE = '•';
const EMPTY_SPACE = ' ';
const ENEMY_ROWS = 3;
const ENEMY_COLS = 8;
const ENEMY_START_ROW = 2;
const MOVE_DELAY = 150; // ms between moves
const ENEMY_MOVE_DELAY = 800; // ms between enemy moves
const ENEMY_SHOOT_CHANCE = 0.02; // probability of enemy shooting per move

// Game State
let gameBoard = [];
let player = {
    x: Math.floor(BOARD_WIDTH / 2),
    y: BOARD_HEIGHT - 2,
    lives: 3,
    score: 0
};
let enemies = [];
let playerProjectiles = [];
let enemyProjectiles = [];
let gameRunning = false;
let lastMoveTime = 0;
let lastEnemyMoveTime = 0;
let enemyDirection = 1; // 1 for right, -1 for left
let enemyMoveDown = false;
let touchStartX = 0;
let gameLevel = 1;

// DOM Elements
const gameBoardElement = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const messageElement = document.getElementById('game-message');

// Initialize the game
function initGame() {
    // Reset game state
    gameBoard = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(EMPTY_SPACE));
    player = {
        x: Math.floor(BOARD_WIDTH / 2),
        y: BOARD_HEIGHT - 2,
        lives: 3,
        score: 0
    };
    playerProjectiles = [];
    enemyProjectiles = [];
    lastMoveTime = 0;
    lastEnemyMoveTime = 0;
    enemyDirection = 1;
    enemyMoveDown = false;
    gameLevel = 1;

    // Create enemies
    createEnemies();

    // Update UI
    scoreElement.textContent = player.score;
    livesElement.textContent = player.lives;
    messageElement.textContent = 'Press SPACE or Tap to start';

    // Render initial board
    renderGame();
}

// Create enemies in formation
function createEnemies() {
    enemies = [];
    for (let row = 0; row < ENEMY_ROWS; row++) {
        for (let col = 0; col < ENEMY_COLS; col++) {
            enemies.push({
                x: col * 4 + Math.floor((BOARD_WIDTH - ENEMY_COLS * 4) / 2),
                y: row + ENEMY_START_ROW,
                type: row % ENEMY_CHARS.length,
                alive: true
            });
        }
    }
}

// Start the game
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        messageElement.textContent = '';
        gameLoop();
    }
}

// Game loop
function gameLoop(timestamp) {
    if (!gameRunning) return;

    // Update game state
    updateGameState(timestamp);

    // Render game
    renderGame();

    // Check game over conditions
    if (checkGameOver()) {
        gameRunning = false;
        messageElement.textContent = 'Game Over! Press SPACE or Tap to restart';
        return;
    }

    // Check level complete
    if (enemies.filter(enemy => enemy.alive).length === 0) {
        nextLevel();
        return;
    }

    // Continue game loop
    requestAnimationFrame(gameLoop);
}

// Update game state
function updateGameState(timestamp) {
    // Move player projectiles
    moveProjectiles();

    // Move enemies
    if (timestamp - lastEnemyMoveTime > ENEMY_MOVE_DELAY / gameLevel) {
        moveEnemies();
        lastEnemyMoveTime = timestamp;

        // Enemy shooting
        enemies.forEach(enemy => {
            if (enemy.alive && Math.random() < ENEMY_SHOOT_CHANCE) {
                enemyShoot(enemy);
            }
        });
    }

    // Check collisions
    checkCollisions();

    // No cooldown for shooting - unlimited shots
}

// Move projectiles
function moveProjectiles() {
    // Move player projectiles up
    for (let i = playerProjectiles.length - 1; i >= 0; i--) {
        playerProjectiles[i].y--;
        if (playerProjectiles[i].y < 0) {
            playerProjectiles.splice(i, 1);
        }
    }

    // Move enemy projectiles down
    for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
        enemyProjectiles[i].y++;
        if (enemyProjectiles[i].y >= BOARD_HEIGHT) {
            enemyProjectiles.splice(i, 1);
        }
    }
}

// Move enemies
function moveEnemies() {
    let hitEdge = false;
    let lowestEnemy = 0;

    // Check if any enemy will hit the edge
    enemies.forEach(enemy => {
        if (!enemy.alive) return;

        if ((enemy.x + enemyDirection < 0) || (enemy.x + enemyDirection >= BOARD_WIDTH)) {
            hitEdge = true;
        }

        if (enemy.y > lowestEnemy) {
            lowestEnemy = enemy.y;
        }
    });

    // Change direction and move down if hit edge
    if (hitEdge) {
        enemyDirection *= -1;
        enemyMoveDown = true;
    }

    // Move all enemies
    enemies.forEach(enemy => {
        if (!enemy.alive) return;

        enemy.x += enemyDirection;

        if (enemyMoveDown) {
            enemy.y++;
        }
    });

    enemyMoveDown = false;

    // Check if enemies reached the bottom
    if (lowestEnemy >= player.y - 1) {
        player.lives = 0; // Game over
    }
}

// Player shoot
function playerShoot() {
    if (gameRunning) {
        playerProjectiles.push({
            x: player.x,
            y: player.y - 1
        });
    }
}

// Enemy shoot
function enemyShoot(enemy) {
    if (gameRunning) {
        enemyProjectiles.push({
            x: enemy.x,
            y: enemy.y + 1
        });
    }
}

// Check collisions
function checkCollisions() {
    // Check player projectiles hitting enemies
    for (let i = playerProjectiles.length - 1; i >= 0; i--) {
        const projectile = playerProjectiles[i];

        for (let j = 0; j < enemies.length; j++) {
            const enemy = enemies[j];

            if (enemy.alive && projectile.x === enemy.x && projectile.y === enemy.y) {
                // Hit!
                enemy.alive = false;
                playerProjectiles.splice(i, 1);
                player.score += (ENEMY_ROWS - Math.floor(j / ENEMY_COLS)) * 10;
                scoreElement.textContent = player.score;
                break;
            }
        }
    }

    // Check enemy projectiles hitting player
    for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
        const projectile = enemyProjectiles[i];

        if (projectile.x === player.x && projectile.y === player.y) {
            // Hit!
            player.lives--;
            livesElement.textContent = player.lives;
            enemyProjectiles.splice(i, 1);

            if (player.lives <= 0) {
                gameRunning = false;
            }
        }
    }
}

// Check game over
function checkGameOver() {
    return player.lives <= 0;
}

// Next level
function nextLevel() {
    gameLevel++;
    createEnemies();
    playerProjectiles = [];
    enemyProjectiles = [];
    messageElement.textContent = `Level ${gameLevel}`;

    // Brief pause before starting next level
    gameRunning = false;
    setTimeout(() => {
        messageElement.textContent = '';
        gameRunning = true;
        gameLoop();
    }, 2000);
}

// Render the game
function renderGame() {
    // Clear the board
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            gameBoard[y][x] = EMPTY_SPACE;
        }
    }

    // Place player
    gameBoard[player.y][player.x] = PLAYER_CHAR;

    // Place enemies
    enemies.forEach(enemy => {
        if (enemy.alive) {
            gameBoard[enemy.y][enemy.x] = ENEMY_CHARS[enemy.type];
        }
    });

    // Place player projectiles
    playerProjectiles.forEach(projectile => {
        if (projectile.y >= 0 && projectile.y < BOARD_HEIGHT) {
            gameBoard[projectile.y][projectile.x] = PLAYER_PROJECTILE;
        }
    });

    // Place enemy projectiles
    enemyProjectiles.forEach(projectile => {
        if (projectile.y >= 0 && projectile.y < BOARD_HEIGHT) {
            gameBoard[projectile.y][projectile.x] = ENEMY_PROJECTILE;
        }
    });

    // Render to DOM
    gameBoardElement.textContent = gameBoard.map(row => row.join('')).join('\n');
}

// Move player
function movePlayer(direction) {
    if (!gameRunning) return;

    const newX = player.x + direction;
    if (newX >= 0 && newX < BOARD_WIDTH) {
        player.x = newX;
    }
}

// Keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        movePlayer(-1);
    } else if (event.key === 'ArrowRight') {
        movePlayer(1);
    } else if (event.key === ' ') { // Spacebar
        if (!gameRunning && player.lives > 0) {
            startGame();
        } else {
            playerShoot();
        }
        event.preventDefault(); // Prevent page scrolling
    }
});

// Touch input for mobile
document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;

    // Check if it's a tap to start game
    if (!gameRunning && player.lives > 0) {
        startGame();
        event.preventDefault();
    }
});

document.addEventListener('touchmove', (event) => {
    if (!gameRunning) return;

    const touchX = event.touches[0].clientX;
    const diffX = touchX - touchStartX;

    // Determine swipe direction
    if (Math.abs(diffX) > 30) { // Threshold for swipe
        movePlayer(diffX > 0 ? 1 : -1);
        touchStartX = touchX;
    }

    event.preventDefault(); // Prevent scrolling
});

document.addEventListener('touchend', (event) => {
    if (gameRunning) {
        // Tap to shoot
        playerShoot();
        event.preventDefault();
    }
});

// Initialize game on load
window.addEventListener('load', initGame);

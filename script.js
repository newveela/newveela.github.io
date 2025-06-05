// Tic-Tac-Toe Game Implementation
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let vsAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initTicTacToe() {
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('gameStatus');
    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
    
    updateGameStatus();
}

function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }
    
    makeMove(index, currentPlayer);
    
    if (gameActive && vsAI && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    document.querySelector(`[data-index="${index}"]`).textContent = player;
    
    if (checkWinner()) {
        gameActive = false;
        document.getElementById('gameStatus').textContent = `Player ${player} Wins! 🎉`;
        return;
    }
    
    if (board.every(cell => cell !== '')) {
        gameActive = false;
        document.getElementById('gameStatus').textContent = "It's a Draw! 🤝";
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus();
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function updateGameStatus() {
    if (gameActive) {
        if (vsAI && currentPlayer === 'O') {
            document.getElementById('gameStatus').textContent = "AI is thinking...";
        } else {
            document.getElementById('gameStatus').textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function resetTicTacToe() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    vsAI = false;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    
    updateGameStatus();
}

function playAgainstAI() {
    resetTicTacToe();
    vsAI = true;
    document.getElementById('gameStatus').textContent = "Playing vs AI - You are X";
}

function makeAIMove() {
    if (!gameActive) return;
    
    // Simple AI: Try to win, block player, or take center/corner
    let bestMove = findBestMove();
    
    if (bestMove !== -1) {
        makeMove(bestMove, 'O');
    }
}

function findBestMove() {
    // Try to win
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (checkWinner()) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    
    // Try to block player
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            if (checkWinner()) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    
    // Take center if available
    if (board[4] === '') return 4;
    
    // Take corners
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
        if (board[corner] === '') return corner;
    }
    
    // Take any available spot
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') return i;
    }
    
    return -1;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Initialize game on page load
window.addEventListener('load', () => {
    initTicTacToe();
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
    
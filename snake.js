document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('high-score'); 
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');     
    const music = document.getElementById('backgroundMusic'); 
    const difficultySelect = document.getElementById('difficulty'); 
    
    music.volume = 0.4; 

    // गेम कॉन्फ़िगरेशन
    const gridSize = 20; 
    const tileCount = canvas.width / gridSize;
    let snake = [];
    let speed = 8;
    let direction = { x: 0, y: 0 };
    let nextDirection = { x: 0, y: 0 };
    let food = { x: 0, y: 0 };
    let score = 0;
    let gameLoop;
    let isGameRunning = false;
    let isGamePaused = false; 
    let canChangeDirection = true;
    let highScore = localStorage.getItem('snakeHighScore') || 0; 

    highScoreDisplay.textContent = 'High Score: ' + highScore;


    // --- Core Game Functions ---
    
    function getInitialSpeed(level) {
        switch (level) {
            case 'easy':
                return 6; 
            case 'medium':
                return 10; 
            case 'hard':
                return 15; 
            default:
                return 10;
        }
    }

    function resetGame() {
        const selectedLevel = difficultySelect.value;
        const initialSpeed = getInitialSpeed(selectedLevel);
        
        snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]; 
        score = 0;
        speed = initialSpeed; 
        direction = { x: 1, y: 0 }; 
        nextDirection = { x: 1, y: 0 }; 
        
        scoreDisplay.textContent = 'Score: 0';
        placeFood();
        
        startButton.textContent = 'Restart Game';
        pauseButton.style.display = 'inline-block'; 
        difficultySelect.disabled = true;
        isGamePaused = false;
        isGameRunning = true;
        
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(gameLogic, 1000 / speed);
        
        if (music) {
            music.play().catch(error => console.log("Music auto-play prevented:", error));
        }
    }

    // पॉज़/रिज्यूम टॉगल फ़ंक्शन
    function togglePause() {
        if (!isGameRunning) return; 

        if (isGamePaused) {
            // रिज्यूम (Resume) करें
            isGamePaused = false;
            pauseButton.textContent = 'Pause';
            gameLoop = setInterval(gameLogic, 1000 / speed);
            if (music) music.play().catch(() => {});
        } else {
            // पॉज़ (Pause) करें
            isGamePaused = true;
            pauseButton.textContent = 'Resume';
            clearInterval(gameLoop);
            if (music) music.pause();
            drawPauseScreen();
        }
    }
    
    // पॉज़ स्क्रीन ड्रा करें
    function drawPauseScreen() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }

    function placeFood() {
        food.x = Math.floor(Math.random() * tileCount);
        food.y = Math.floor(Math.random() * tileCount);
        
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === food.x && snake[i].y === food.y) {
                placeFood(); 
                return;
            }
        }
    }

    function gameLogic() {
        direction = nextDirection;
        canChangeDirection = true;
        
        let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // हार की जाँच (दीवार और खुद को काटना)
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || 
            (function() {
                for (let i = 1; i < snake.length; i++) {
                    if (head.x === snake[i].x && head.y === snake[i].y) return true;
                }
                return false;
            })()) 
        {
            endGame();
            return;
        }

        snake.unshift(head);

        // भोजन की जाँच
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
            placeFood();
            
            // स्पीड बढ़ाएँ
            if (score % 5 === 0 && speed < 25) { 
                speed += 1;
                clearInterval(gameLoop);
                gameLoop = setInterval(gameLogic, 1000 / speed);
            }
        } else {
            snake.pop(); 
        }
        draw();
    }

    function draw() {
        // कैनवास साफ़ करें
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // साँप ड्रा करें
        for (let i = 0; i < snake.length; i++) {
            if (i === 0) {
                ctx.fillStyle = '#f0db4f'; 
                ctx.shadowColor = '#f0db4f';
            } else {
                ctx.fillStyle = '#00ffff'; 
                ctx.shadowColor = '#00ffff';
            }
            
            ctx.shadowBlur = 10;
            ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 1, gridSize - 1);
        }

        // भोजन ड्रा करें
        ctx.fillStyle = '#ff00aa'; 
        ctx.shadowColor = '#ff00aa';
        ctx.shadowBlur = 10;
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
        
        ctx.shadowBlur = 0;
    }

    function endGame() {
        clearInterval(gameLoop);
        isGameRunning = false;
        direction = { x: 0, y: 0 }; 
        nextDirection = { x: 0, y: 0 };
        pauseButton.style.display = 'none'; 
        difficultySelect.disabled = false; 
        
        // हाई स्कोर चेक और अपडेट करें
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
            highScoreDisplay.textContent = 'High Score: ' + highScore + ' (NEW!)';
        } else {
             highScoreDisplay.textContent = 'High Score: ' + highScore;
        }

        startButton.textContent = 'Game Over! Score: ' + score + '. Play Again?';
        
        if (music) {
            music.pause();
            music.currentTime = 0; 
        }
    }

    // --- Event Listeners ---
    
    // नियंत्रण (Controls)
    document.addEventListener('keydown', (e) => {
        if (!isGameRunning) return;
        
        // स्पेसबार से पॉज़/रिज्यूम
        if (e.key === ' ' || e.key === 'Spacebar') {
             e.preventDefault(); 
             togglePause();
             return;
        }
        
        if (isGamePaused || !canChangeDirection) return;

        let keyPressed = e.key;

        // विपरीत दिशा में जाने से रोकें
        if (keyPressed === 'ArrowUp' && direction.y === 0) {
            nextDirection = { x: 0, y: -1 };
        } else if (keyPressed === 'ArrowDown' && direction.y === 0) {
            nextDirection = { x: 0, y: 1 };
        } else if (keyPressed === 'ArrowLeft' && direction.x === 0) {
            nextDirection = { x: -1, y: 0 };
        } else if (keyPressed === 'ArrowRight' && direction.x === 0) {
            nextDirection = { x: 1, y: 0 };
        }

        if (direction.x !== nextDirection.x || direction.y !== nextDirection.y) {
            canChangeDirection = false;
        }
    });

    startButton.addEventListener('click', resetGame);
    pauseButton.addEventListener('click', togglePause); 
    
    difficultySelect.addEventListener('change', () => {
        if (!isGameRunning) {
            draw(); 
        }
    });
    
    draw();
});
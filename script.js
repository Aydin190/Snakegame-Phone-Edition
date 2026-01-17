let canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");

const tilesize = 20;

const tilecount = canvas.width/tilesize;

let snake;

let velocity;

let food;

let gameOver = false;

let score = 0;

let highScore = Number(localStorage.getItem("snakehighscore")|| 0);

document.getElementById("highScore").textContent = highScore;

function initGame() {
    snake = [
        {x:8, y:10},
        {x:7, y:10},
        {x:6, y:10}
    ];

    velocity = {x:1, y:0};

    food = randomFood();

    score = 0;

    gameOver= false;



document.getElementById("score").textContent = score;

document.getElementById("gameOverText").textContent = "";
}

function randomFood() {
    return{
        x:Math.floor(Math.random()*tilecount),
        y:Math.floor(Math.random()*tilecount),
    };
}

function update() {
    if(gameOver) return;

    const head = {
        x:snake[0].x+velocity.x,
        y:snake[0].y+velocity.y
    }


    if(head.x < 0 || head.x >= tilecount || head.y < 0 || head.y >= tilecount) {
        endGame();
        return;
    }


    if(snake.some(segment=>segment.x===head.x && segment.y===head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);



    if(head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;

        if(score > highScore) {
            highScore = score
            document.getElementById("highScore").textContent = highScore;
            localStorage.setItem("snakehighscore", highScore)
        }


        food = randomFood();
    }

    else{
        snake.pop()
    }

}


























// Create a draw function to display everything on the canvas.

// Inside the draw function:
// – Clear the entire canvas.
// – Draw the food as a colored square.
// – Draw each block of the snake.
// – Use a different color for the snake’s head.

// – If the game is over:
//     • Draw a semi-transparent overlay.
//     • Display “Game Over” text on the canvas.

// Create a game loop function.

// Inside the game loop:
// – Call the update function.
// – Call the draw function.

// Run the game loop repeatedly using a timer (example: every 100 milliseconds).

// Add a keyboard listener for arrow keys.

// When Arrow Up is pressed:
// – Change direction to up if snake is not moving down.

// When Arrow Down is pressed:
// – Change direction to down if snake is not moving up.

// When Arrow Left is pressed:
// – Change direction to left if snake is not moving right.

// When Arrow Right is pressed:
// – Change direction to right if snake is not moving left.

// Add a key listener for the "R" key to restart the game after game over.

// Create a function to end the game.
// – Set game-over flag to true.
// – Show “Game Over” message on the screen.

// Attach a click event to the Restart button.
// – When clicked, start the game again.

// Call the start game function once when the page loads




function draw() {
    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "yellow";

    ctx.fillRect(
        food.x*tilesize,
        food.y*tilesize,
        tilesize,
         tilesize
    )

    snake.forEach((segment, i)=>{
        ctx.fillStyle = i === 0?"d9ae14":"#d9ae14";
        ctx.fillRect(
            segment.x*tilesize,
            segment.y*tilesize,
             tilesize,
              tilesize
        );
        
    })

    if(gameOver === true) {
        ctx.fillStyle = "#d7f2ff"
        ctx.fillRect(0, 170, canvas.width, 60);
        ctx.fillStyle = "#d9ae14"
        ctx.font = "24px BankGothic"
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, 205);
    }

}



function gameLoop() {
    update();
    draw();
}



setInterval(gameLoop, 100);


window.addEventListener("keydown", (e) => {

    if(gameOver === true && (e.key === "r" || e.key === "R")) {
        initGame();
    }


    if(e.key === "ArrowUp" && velocity.y !== 1)
        velocity = {x: 0, y: -1};


    if(e.key === "ArrowDown" && velocity.y !== -1)
        velocity = {x: 0, y: 1};


    if(e.key === "ArrowLeft" && velocity.x !== 1)
        velocity = {x: -1, y: 0};


    if(e.key === "ArrowRight" && velocity.x !== -1)
        velocity = {x: 1, y: 0};
});



function endGame() {
    gameOver = true;
    document.getElementById("gameOverText").textContent =
    "Game Over. Press r, R or Restart";
}


document.getElementById("restartBtn").onclick = () => initGame();


initGame();







// Mobile
document.querySelectorAll(".controls button").forEach(btn=>{
    btn.addEventListener("touchstart", ()=>{
        const dir = btn.dataset.dir;
        
        if(dir === "up" & velocity.y !== 1) {
            velocity = {x: 0, y: -1};
        }


        if(dir === "down" & velocity.y !== -1) {
            velocity = {x: 0, y: 1};
        }



        if(dir === "left" & velocity.x !== 1) {
            velocity = {x: -1, y: 0};
        }



        if(dir === "right" & velocity.x !== -1) {
            velocity = {x: 1, y: 0};
        }

    })
})
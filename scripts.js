const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileSize = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let velocity = { x: 0, y: 0 };

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (velocity.y === 0) {
        velocity.x = 0;
        velocity.y = -1;
      }
      break;
    case "ArrowDown":
      if (velocity.y === 0) {
        velocity.x = 0;
        velocity.y = 1;
      }
      break;
    case "ArrowLeft":
      if (velocity.x === 0) {
        velocity.x = -1;
        velocity.y = 0;
      }
      break;
    case "ArrowRight":
      if (velocity.x === 0) {
        velocity.x = 1;
        velocity.y = 0;
      }
      break;
  }
});

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 1000 / 15);
}

function update() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    placeApple();
  } else {
    snake.pop();
  }

  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    snake = [{ x: 10, y: 10 }];
    velocity = { x: 0, y: 0 };
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      snake = [{ x: 10, y: 10 }];
      velocity = { x: 0, y: 0 };
    }
  }
}

function draw() {
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "green";
  for (const part of snake) {
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
}

function placeApple() {
  apple.x = Math.floor(Math.random() * gridSize);
  apple.y = Math.floor(Math.random() * gridSize);

  for (const part of snake) {
    if (part.x === apple.x && part.y === apple.y) {
      placeApple();
      break;
    }
  }
}

gameLoop();

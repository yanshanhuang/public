// Claw machine game variables
let clawX, clawY; // Position of the claw
let clawWidth, clawHeight; // Size of the claw
let blocks; // Array to store the blocks
let blockWidth, blockHeight; // Size of the blocks
let score; // Player's score
let timeRemaining; // Remaining time in seconds

// Setup function
function setup() {
  createCanvas(400, 400);
  
  // Initialize game variables
  clawX = width / 2;
  clawY = height - 50;
  clawWidth = 50;
  clawHeight = 20;
  blockWidth = 40;
  blockHeight = 40;
  score = 0;
  timeRemaining = 30;
  
  // Create the blocks
  blocks = [];
  for (let i = 0; i < 40; i++) {
    let blockX = random(width - blockWidth);
    let blockY = random(-height, -blockHeight);
    blocks.push({ x: blockX, y: blockY, captured: false, speed: random(1, 3) });
  }
  
  // Set the timer
  setInterval(updateTimer, 1000);
}

// Draw function
function draw() {
  background(0,181,238);
  
  // Move and draw the claw
  clawX = mouseX;
  drawClaw();
  
  // Draw and update the blocks
  for (let i = 0; i < blocks.length; i++) {
    if (!blocks[i].captured) {
      drawBlock(blocks[i].x, blocks[i].y);
      blocks[i].y += blocks[i].speed; // Make the block fall
      
      // Check if the claw caught a block
      if (
        clawX > blocks[i].x &&
        clawX < blocks[i].x + blockWidth &&
        clawY < blocks[i].y + blockHeight &&
        clawY > blocks[i].y &&
        mouseIsPressed
      ) {
        blocks[i].captured = true;
        score++;
      }
      
      // Reset the block position when it reaches the bottom
      if (blocks[i].y > height) {
        blocks[i].x = random(width - blockWidth);
        blocks[i].y = random(-height, -blockHeight);
        blocks[i].speed = random(1, 3);
      }
    }
  }
  
  // Display score and time remaining
  textSize(20);
  textAlign(LEFT);
  fill(0); // Set text color to black
  text("Score: " + score, 20, 30);
  text("Time: " + timeRemaining, 20, 60);
  
  // Check if the time is up
  if (timeRemaining <= 0) {
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    noLoop();
  }
}

// Function to draw the claw
function drawClaw() {
  fill("rgb(49,49,49)");
  rect(clawX - clawWidth / 2, clawY - clawHeight, clawWidth, clawHeight);
}

// Function to draw a block
function drawBlock(x, y) {
  fill("rgb(245,134,0)");
  rect(x, y, blockWidth, blockHeight);
}

// Function to update the timer
function updateTimer() {
  if (timeRemaining > 0) {
    timeRemaining--;
  }
}
let gun;
let bullets = [];
let squares = [];
let score = 0;
let timer = 60;
let timerInterval;

function setup() {
  createCanvas(400, 400);

  // Create the gun
  gun = new Gun(width / 2, height - 50, 20, 40); // Adjust the position and size of the gun as needed

  // Set up the timer
  timerInterval = setInterval(decreaseTimer, 1000);
}

function draw() {
  background(220);

  // Display the score and remaining time
  textAlign(CENTER);
  textSize(24);
  text(`Score: ${score}`, width / 2, 30);
  text(`Time left: ${timer}`, width / 2, 60);

  // Display the gun
  gun.display();

  // Display the bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    bullet.display();
    bullet.move();

    // Remove bullets that are off-screen
    if (bullet.y < 0) {
      bullets.splice(i, 1);
    }
  }

  // Display the squares
  for (let i = squares.length - 1; i >= 0; i--) {
    let square = squares[i];
    square.display();
    square.move();

    // Check if bullets hit the squares
    for (let j = bullets.length - 1; j >= 0; j--) {
      let bullet = bullets[j];
      if (square.checkCollision(bullet)) {
        // Square hit!
        score++;
        bullets.splice(j, 1);
        squares.splice(i, 1);
        break; // A bullet can only hit one square
      }
    }

    // Check if squares collide with the gun
    if (square.checkCollision(gun)) {
      // Game over!
      clearInterval(timerInterval);
      alert(`Game over! Score: ${score}`);
      resetGame();
    }
  }

  // Decrease the timer
  if (frameCount % 60 === 0) {
    decreaseTimer(); // Decrease the timer every second
    if (timer <= 0) {
      clearInterval(timerInterval);
      alert(`Game over! Score: ${score}`);
      resetGame();
    }
  }
}

function decreaseTimer() {
  timer--;
}

function mouseClicked() {
  gun.shoot(); // Fire a bullet when the mouse is clicked
}

function resetGame() {
  score = 0;
  timer = 60;
  bullets = [];
  squares = [];
  setup();
}

class Gun {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  display() {
    // Display the gun
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }

  shoot() {
    // Create a new bullet
    let bullet = new Bullet(this.x + this.width / 2, this.y);
    bullets.push(bullet);
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5; // Speed of the bullet
  }

  display() {
    // Display the bullet
    fill(0, 0, 255); // Adjust the color as needed
    ellipse(this.x, this.y, 10, 10); // Adjust the size of the bullet as needed
  }

  move() {
    // Move the bullet upward
    this.y -= this.speed;
  }
}

class Square {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed; // Speed of the square
  }

  display() {
    // Display the square
    fill(255, 0, 0); // Adjust the color as needed
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    // Move the square downward
    this.y += this.speed;
  }

  checkCollision(object) {
    // Check for collision with another object
    if (
      this.x + this.size >= object.x &&
      this.x <= object.x + object.width &&
      this.y + this.size >= object.y &&
      this.y <= object.y + object.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}

// Start the game
setup();
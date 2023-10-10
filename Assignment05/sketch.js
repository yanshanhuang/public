let gridSize = 50; // Grid size
let gridSpacing = 30; // Spacing between grids
let totalGrids = 25; // Initial number of grids
let colors = ["red", "orange", "yellow", "green", "blue", "purple"]; // Array of grid colors

function setup() {
  createCanvas(400, 400);
  background(0);
  setInterval(updateGrids, 1000); // Call updateGrids function every second
}

function draw() {
  background(0); // Set background color to black
  
  for (let i = 0; i < totalGrids; i++) {
    let col = i % 5;
    let row = floor(i / 5);
    let x = col * (gridSize + gridSpacing);
    let y = row * (gridSize + gridSpacing);
    
    let alpha = map(i, 0, totalGrids, 255, 0); // Calculate transparency based on grid index
    let color = random(colors); // Randomly select a grid color
    
    fill(color);
    stroke(255);
    rect(x, y, gridSize, gridSize);
  }
}

function updateGrids() {
  totalGrids--;
  
  if (totalGrids < 0) {
    totalGrids = 0; // Make sure the number of grids doesn't go below zero
    console.log("Grids have disappeared completely");
    noLoop();
  }
}
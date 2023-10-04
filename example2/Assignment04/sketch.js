function setup() {
  createCanvas(400, 400);
  background(0);
  noLoop();
}

function draw() {
  let colors = ["red", "orange", "yellow", "green", "blue", "purple", "white"];
  let size = 50;
  let spacing = 20;

  for (let x = 0; x < width; x += size + spacing) {
    for (let y = 0; y < height; y += size + spacing) {
      let color = random(colors);
      
      fill(color);
      stroke(255);
      rect(x, y, size, size);
    }
  }
}
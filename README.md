`javascript``
// 在这个示例中，我们将使用p5.js库创建一个简单的煙花藝術效果
function setup() {
  createCanvas(400, 400);
  background(0);
  noLoop();
}

function draw() {
  for (let i = 0; i < 100; i++) {
    const x = random(width);
    const y = random(height);
    const size = random(10, 50);
    const color = [random(255), random(255), random(255)];

    stroke(color);
    strokeWeight(2);
    fill(color);
    ellipse(x, y, size, size);
  }
}

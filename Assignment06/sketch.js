// Virtual creature class
class Creature {
constructor(x, y) {
this.x = x;
this.y = y;
this.size = 70;
this.color = color(random(255), random(255), random(255));
this.clicked = false; // New property to track if creature was clicked
}

display() {
fill(this.color);
stroke(255); // Set border color to white
if (this.clicked) {
ellipse(this.x, this.y, this.size, this.size); // Change shape to ellipse if clicked
} else {
rect(this.x, this.y, this.size, this.size); // Otherwise, display as rectangle
}
}

move() {
// Implement movement logic based on the creature's environment
this.x += random(-1, 1);
this.y += random(-1, 1);
}

checkClicked(mx, my) {
// Check if the creature has been clicked
if (
mx > this.x &&
mx < this.x + this.size &&
my > this.y &&
my < this.y + this.size
) {
this.clicked = true; // Set clicked to true
this.x += random(-20, 20);
this.y += random(-20, 20);
}
}
}

// Array to hold virtual creatures
let creatures = [];

function setup() {
createCanvas(400, 400);
background(0, 0, 0);

// Create virtual creatures and add them to the array
for (let i = 0; i < 20; i++) {
let x = random(width);
let y = random(height);
let creature = new Creature(x, y);
creatures.push(creature);
}
}

function draw() {
background(0, 0, 0);

// Display and move all creatures
for (let creature of creatures) {
creature.display();
creature.move();
}
}

function mouseClicked() {
// Check if any creature was clicked and move them accordingly
for (let creature of creatures) {
creature.checkClicked(mouseX, mouseY);
}
}
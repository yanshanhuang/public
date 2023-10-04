// Arduino Serial Communication Demo
// viola he 2022

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem141201'; // replace with your own port

let inData;
let pressed = 0;
let circleY = 0;

let circleX = 0;

let r = 0;
let g = 0;
let b = 0;
let ballColor;
let ballSize;

function setup() {
  createCanvas(400, 400);
  ballColor = color(random(180,255), random(180,255), random(180,255));
  ballSize = random(3,200);
  
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // callback to list all the ports
  serial.on('connected', serverConnected); // callback for connecting to server
  serial.on('open', portOpen);        // callback to check port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  
}


function draw() {

  r1 = map(mouseX, 0, 400, 100, 200)
  g1 = map(mouseY, 0, 400, 100, 255);
  b1 = map(mouseX, 0, 400, 180, 80);
  background(r1, g1, b1);
  
 // ***** ignore this entire part, just drawing the sketch!!! ******
  
  noStroke();
  //eyes
  fill(250);
  ellipse(160, 180, 46, 30);
  ellipse(240, 180, 46, 30);
  //pupils
  r2 = map(mouseY, 0, 400, 200, 100)
  g2 = map(mouseX, 0, 400, 100, 150);
  b2 = map(mouseY, 0, 400, 0, 255);
  fill(r2,g2,b2);
  ellipse(147 + circleX / 20, 175 + circleY / 45, 18);
  ellipse(227 + circleX / 20, 175 + circleY / 45, 18);
  
 // ****************************************************************

  //ball, random size and color
 
  fill(ballColor);
  if (pressed == 1) {
    fill(random(150,255), random(150,255), random(150,255));
    ellipse(circleX, circleY, random(60,1000));
    ballColor = color(random(180,255), random(180,255), random(180,255));
  ballSize = random(3,200);
  } else {
    ellipse(circleX, circleY, ballSize); 
  }
  // ball loop
  for (let i = 0; i < 5; i++) {
    circleX =width/2 + sin(frameCount/100) * 200
  }
  
//text
    textSize(25);
    fill(250, 250, 20);
    if (pressed == 1) {
      textSize(40);
      fill(random(150,255), random(150,255), random(150,255));
      text('oh no!!!',circleX, circleY);
    } else {
      textAlign(CENTER);
      text('press button', width/2, height-50);
    }
}


// *** Serial

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log("port " + i + ": " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
  let inString = serial.readStringUntil('\r\n');    // store the data in a variable  
  if (inString.length > 0){
    let inputs = split(inString, ',');    // split the string on the commas, put into an array
    if (inputs.length > 1) {       // if there are two or more elements
    // console.log(inputs[0], inputs[1]);
      
    // extra code to store these elements in new variables
    circleY = map(inputs[0], 0, 1023, 0, width); // first element in the array
    pressed = inputs[1];
    }
  }
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}


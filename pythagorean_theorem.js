let myCanvas, myInsight;
let one;
let two;
let stillPressedOne, hoverOne;
let stillPressedTwo, hoverTwo;
let posPoint3;
let a;
let b;

function setup() {
  if(windowWidth <= windowHeight){
    myCanvas = createCanvas(0.85*windowWidth, 0.85*windowWidth);
  } else {
    myCanvas = createCanvas(0.85*windowHeight, 0.85*windowHeight);
  }
  a = document.getElementsByTagName("ink-var")[0];
  b = document.getElementsByTagName("ink-var")[1];
  myInsight = select("#insight")
  myInsight.mouseOver(loop);
  myInsight.mouseOut(noLoop);
  myCanvas.parent("canvas")
  rectMode(CORNERS);
  angleMode(RADIANS)
  textAlign(CENTER, CENTER)
  expandOne = false;
  expandTwo = false;
  stillPressedOne = false;
  stillPressedTwo = false;
  posPoint3 = [width/3, height/2+60]
  one = uxCircle(posPoint3[0], posPoint3[0]+30, width*0.025);
  one.uxEvent("hover", setHoverOne);
  two = uxCircle(2*posPoint3[0], posPoint3[1], width*0.025);
  two.uxEvent("hover", setHoverTwo);
  noLoop();
}

function draw() {
  background(255)
  noStroke()

  // Background dots
  for(var i = 0; i < width; i = i + 32){
    for(var j = 0; j < height; j = j + 32){
      stroke(180)
      strokeWeight(3)
      point(i, j)
    }
  }

  // One
  one.uxFill = ("#c06c84");
  one.uxStrokeWeight = 0
  if(hoverOne||stillPressedOne){
    stillPressedOne = false;
    one.d = width*0.025;
    if(mouseIsPressed){
      one.y = constrain(mouseY, 15, posPoint3[1]-15);
      one.d = width * 0.035;
      stillPressedOne = true;
      one.uxFill = 200;
      a.value = map(one.y, posPoint3[1], 0 , 0, 10);
      a.dispatch();
    }
  }
  one.y = map(a.value, 0, 10, posPoint3[1], 0);;

  // Two
  two.uxFill = ("#c06c84");
  two.uxStrokeWeight = 0
  if(hoverTwo||stillPressedTwo){
    stillPressedTwo = false;
    two.d = width*0.025;
    if(mouseIsPressed){
      two.x = constrain(mouseX, posPoint3[0]+15,width-15);
      two.d = width * 0.035;
      stillPressedTwo = true;
      two.uxFill = 200;
      b.value = map(two.x, posPoint3[0], width , 0, 10);
      b.dispatch();
    }
  }
  two.x = map(b.value, 0, 10, posPoint3[0], width );

  stroke("#8ac5c3")
  strokeWeight(width * 0.005)
  fill(130)

  //Sqare A
  let sideLenght_a = (posPoint3[1] - one.y);
  rect(one.x-sideLenght_a, one.y, one.x, posPoint3[1])

  //Sqare B
  let sideLenght_b = (two.x - posPoint3[0]);
  rect(one.x, posPoint3[1], posPoint3[0]+sideLenght_b, posPoint3[1]+sideLenght_b)

  // Right Triangle
  fill(255)
  triangle(posPoint3[0], posPoint3[1],one.x, one.y,two.x, two.y)
  print(width)

  //Square C
  fill(130)
  let sideLenght_c = Math.sqrt(Math.pow(sideLenght_a, 2) + Math.pow(sideLenght_b, 2));
  let angle = Math.atan(sideLenght_a/sideLenght_b)
  push()
  translate(one.x+sideLenght_a, one.y-sideLenght_b)
  rotate(angle)
  rect(0, 0, sideLenght_c, sideLenght_c);
  textAlign(CENTER)
  textSize(width * 0.045);
  noStroke();
  fill("#8ac5c3");
  textFont('Arial');
  text("c²",sideLenght_c/2, sideLenght_c/2)
  pop()

  // 90 Degree angle
  fill(255)
  // print(sideLenght_c)
  sideLenght_c = constrain(sideLenght_c, 180,380)
  arc(posPoint3[0], posPoint3[1], sideLenght_c*0.3, sideLenght_c*0.3, 3*PI/2, 0, PIE)
  fill("#8ac5c3")
  circle(posPoint3[0]+sideLenght_c*0.06, posPoint3[1]-sideLenght_c*0.06, 5)

  // Text side a, b, c
  textSize(width * 0.031);
  noStroke();
  fill("#8ac5c3");
  textFont('Arial');
  text("a", one.x+ width * 0.016, one.y+sideLenght_a/2)
  text("b", one.x+sideLenght_b/2, one.y+sideLenght_a-width * 0.016)
  text("c", one.x+sideLenght_b/2-width * 0.016, one.y+sideLenght_a/2+width * 0.016)
  textSize(width * 0.045);
  text("a²",one.x-sideLenght_a/2, one.y+sideLenght_a/2)
  text("b²",two.x-sideLenght_b/2, two.y+sideLenght_b/2)

  // Arrow hover effect
  if(hoverOne && !mouseIsPressed){
    fill("Red")
    noStroke()
    triangle(one.x- width * 0.0135,one.y-width * 0.016, one.x, one.y-width * 0.031, one.x+width * 0.0135, one.y-width * 0.016)
    triangle(one.x-width * 0.0135,one.y+width * 0.016, one.x, one.y+width * 0.031, one.x+width * 0.0135, one.y+width * 0.016)
    hoverOne = false;
  }

  if(hoverTwo && !mouseIsPressed){
    fill("Red")
    noStroke()
    triangle(two.x-width * 0.016, two.y+width * 0.0135, two.x-width * 0.031, two.y, two.x-width * 0.016, two.y-width * 0.0135)
    triangle(two.x+width * 0.016, two.y+width * 0.0135, two.x+width * 0.031, two.y, two.x+width * 0.016, two.y-width * 0.0135)
    hoverTwo = false;
  }

  //let fps = frameRate();
  //fill(255);
  //stroke(0);
  //text("FPS: " + fps.toFixed(0), 100, height - 10);
}

function windowResized() {
  if(windowWidth <= windowHeight){
    resizeCanvas(0.85*windowWidth, 0.85*windowWidth);
  } else {
    resizeCanvas(0.85*windowHeight, 0.85*windowHeight);
  }
  posPoint3 = [width/3, height/2+50]
  one.x = posPoint3[0]
  one.y = posPoint3[0]+30
  one.d =  width*0.025
  two.x = 2*posPoint3[0]
  two.y = posPoint3[1]
  two.d =width*0.025
}


function setHoverOne(){
  hoverOne = true;
}

function setHoverTwo(){
  hoverTwo = true;
}

// function resetSketch(){
  //
  // }

// function mousePressed() {
//   let fs = fullscreen();
//   fullscreen(!fs);
//   windowResized();
// }

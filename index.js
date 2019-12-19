
//general
var calendarBoxes = [];
var boxRows = 5;
var boxCols = 5;
var userProgress = 0;

//UI
var spacing = 20;

  //resetbox
  var resetBoxWidth = 50;
  var resetBoxHeight = 30;
  var resetBoxX = 80;
  var resetBoxY = 25;

  //calendarBoxes
  var boxSize = 50;
  var caldendarBoxesX;
  var calendarBoxesY;



function setup(){
  createCanvas(windowWidth,1000);


  resetBox = createSprite(resetBoxX,resetBoxY,resetBoxWidth,resetBoxHeight);
  resetBox.mouseActive = true;
  resetBox.draw = function(){
    rect(0,0,resetBoxWidth,resetBoxHeight);
    text("reset",-15,3)
  }
  spawnSprites();
}//end setup

function draw(){

  background(200);
  drawSprites();
  fillCalendar();

  if(resetBox.mouseIsPressed){
    for (var i = 0; i < calendarBoxes.length; i++) {
      calendarBoxes[i].shapeColor = color(255);
      userProgress = 0;
    }
  }

}//end

function spawnSprites(){

  calendarBoxesX = resetBoxX;
  calendarBoxesY = resetBoxY +boxSize/2+spacing+ resetBoxHeight/2;
  fill(255);
  rect(calendarBoxesX,calendarBoxesY,100,100);
  for (var i = 0; i < boxCols; i++) {
    cBoxY = calendarBoxesY + spacing*i + boxSize*i;
    for (var j = 0; j < boxRows; j++) {

      cBoxX = calendarBoxesX + spacing*j + boxSize*j;
      cBox = createSprite(cBoxX, cBoxY, boxSize, boxSize);
      cBox.setCollider("rectangle",0, 0, boxSize,boxSize);
      cBox.shapeColor = color(255);
      cBox.mouseActive = true;
      cBox.nr = i*boxRows+j;
      calendarBoxes.push(cBox);

    }

  }

}//end spawnSprites()

function fillCalendar(){
  for (var i = 0; i < calendarBoxes.length; i++) {
    //print(calendarBoxes[i].nr);
    //print(calendarBoxes[i].mouseIsPressed);

    if(calendarBoxes[i].nr==userProgress && calendarBoxes[i].mouseIsPressed){
      print("yaay");
      calendarBoxes[i].shapeColor= color(125,200,130);
      userProgress++;
    }
  }
}

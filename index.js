
//general
var calendarBoxes = [];
var boxRows = 10;
var boxCols = 6;
let userStorage;
//UI
var spacing = 30;
  //test
  //resetbox
  var resetBoxWidth = 50;
  var resetBoxHeight = 30;
  var resetBoxX = 180+resetBoxWidth/2;
  var resetBoxY = resetBoxHeight/2 + spacing;

  //calendarBoxes
  var boxSize = 80;
  var caldendarBoxesX;
  var calendarBoxesY;
  var boxColorGreen;



function setup(){
  boxColorGreen = color(150,200,150)

  if (localStorage.getItem("userStorage")==null) {
    userStorage = {
     userProgress: 0

   };
   saveUserStorage();
  }

  createCanvas(windowWidth,1000);

  resetBox = createSprite(resetBoxX,resetBoxY,boxSize,resetBoxHeight);
  resetBox.mouseActive = true;
  resetBox.draw = function(){
    rect(0,0,boxSize,resetBoxHeight);
    text("reset",-15,3)
  }

  spawnSprites();

  getUserStorage();
  for (var i = 0; i < calendarBoxes.length; i++) {
    if(calendarBoxes[i].nr < userStorage.userProgress){
      calendarBoxes[i].shapeColor = boxColorGreen;
    }
  }
}//end setup

function draw(){

  background(200);
  drawSprites();
  fillCalendar();

  if(resetBox.mouseIsPressed){
    for (var i = 0; i < calendarBoxes.length; i++) {
      calendarBoxes[i].shapeColor = color(255);
      userStorage.userProgress = 0;
      saveUserStorage();

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
    getUserStorage();
    if(calendarBoxes[i].nr==userStorage.userProgress && calendarBoxes[i].mouseIsPressed){
      print("yaay");
      calendarBoxes[i].shapeColor= boxColorGreen;
      userStorage.userProgress++;
      saveUserStorage();
    }
  }
}


//general
var calendarBoxes = [];
var boxRows = 7;
var boxCols = 6;
let userStorage;
//UI
var spacing = 30;
  //calendarBoxes
  var boxSize = 80;
  var caldendarBoxesX;
  var calendarBoxesY;
  var boxColorGreen;

  //resetbox
  var resetBoxHeight = 30;
  var resetBoxX = spacing+boxSize/2;
  var resetBoxY = resetBoxHeight/2;
/*
function preload(){
  soundFormats('wav', 'ogg');
  blip = loadSound('blip_sound.wav');
}
*/


function setup(){
  boxColorGreen = color(150,200,150)

  if (localStorage.getItem("userStorage")==null) {
    userStorage = {
     userProgress: 0

   };
   saveUserStorage();
  }

  var canvas = createCanvas(800,800);
  canvas.parent("canvasDiv");
  canvas.style('margin: auto');


  resetBox = createSprite(resetBoxX,resetBoxY,boxSize,resetBoxHeight);
  resetBox.mouseActive = true;
  resetBox.draw = function(){
    fill(255);
    stroke(0);
    rect(0,0,boxSize,resetBoxHeight);

  }

  spawnSprites();

  getUserStorage();
  for (var i = 0; i < calendarBoxes.length; i++) {
    if(calendarBoxes[i].nr < userStorage.userProgress){
      calendarBoxes[i].draw = function(){boxDrawFilled(boxColorGreen);}
    }
  }
}//end setup

function draw(){

  background(255);
  drawSprites();
  fillCalendar();

  if(resetBox.mouseIsPressed){
    for (var i = 0; i < calendarBoxes.length; i++) {
      calendarBoxes[i].draw = function(){boxDrawWhite();}
      userStorage.userProgress = 0;
      //blip.play();
      saveUserStorage();

    }
  }



}//end

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();

    //blip.setVolume(1);
  }

}

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
      cBox.mouseActive = true;
      cBox.nr = i*boxRows+j;
      cBox.draw = function(){boxDrawWhite();}
      fill(255);
      text(cBox.nr, cBoxX, cBoxY);
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
      calendarBoxes[i].draw= function(){boxDrawFilled(boxColorGreen);}
      userStorage.userProgress++;
      saveUserStorage();
    }
  }
}

function boxDrawWhite(){
  fill(255);
  stroke(0);
  rectMode(CENTER);
  rect(0,0,boxSize, boxSize);
}

function boxDrawFilled(color){
  fill(color);
  stroke(0);
  rectMode(CENTER);
  rect(0,0,boxSize, boxSize);
}

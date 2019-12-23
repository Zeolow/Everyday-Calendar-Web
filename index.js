
//general
var calendarBoxes = [];
var boxRows = 7;
var boxCols = 6;
let userStorage;
let desc1;
let desc2;
let activities;;

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
  desc1 = select('#desc1');
  desc2 = select('#desc2');

  day = day();
  switch (day%7) {
    case 0:
      activities = [1, 2, 3, 4, 5];

      break;
    case 1:
      activities = [4, 5, 6, 7, 8];

      break;
    case 2:
      activities = [2, 3, 4, 5, 6];

      break;
    case 3:
      activities = [1, 5, 6, 7, 8];

      break;
    case 4:
      activities = [3, 4, 5, 6, 7];
      break;
    case 5:
      activities = [1, 2, 6, 7, 8];
      break;
    case 6:
      activities = [2, 3, 4, 7, 8];
      break;
    default:

  }

  desc2.html("Todays activites: "+activities[0]+", "+activities[1]+", "+activities[2]+", "+activities[3]+", "+activities[4]);


  boxColorGreen = color(150,200,150)

  if (localStorage.getItem("userStorage")==null) {
    userStorage = {
     userProgress: 0

   };
   saveUserStorage();
  }

  var canvas = createCanvas(800,700);

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
      if (userStorage.userProgress <41) {
        desc1.html('(ノಠ益ಠ)ノ彡┻━┻');
        desc2.html('Too bad, but don\'t give up!')
      } else{
        desc1.html('(ノಠ益ಠ)ノ彡┻━┻');
        desc2.html('Congratulations! Now stick to it!')
      }

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
      calendarBoxes[i].draw= function(){boxDrawFilled(boxColorGreen);}
      desc1.html('Good job! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)');
      desc2.html('Completed: '+ (userStorage.userProgress+1))

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

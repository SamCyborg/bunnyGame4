
var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var bunny1, bunny2, bunny3, bunny4, bunnys;
var form, player, game;
var finish;

function preload(){
  track = loadImage("images/bg3.jpg");
  bunny1ab = loadAnimation("images/bunny1.png" ,"images/bunny2.png");
  bunny2ab = loadAnimation("images/bunny3.png" ,"images/bunny4.png");
  bunny3ab = loadAnimation("images/bunny5.png" ,"images/bunny6.png");
  finishImg = loadImage("images/finish.jpg");
  bgImg = loadImage("images/bunnybg.png");
  a_song = loadSound("winning/jeet.mp3");
  b_song = loadSound("winning/yay.mp3")
}


function setup(){
  canvas = createCanvas(displayWidth-50,displayHeight-140);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(gameState === 0){
    background(bgImg);
  }
  if(playerCount === 3){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
    confetti();
    a_song.play();
    //b_song.play();
  }
}

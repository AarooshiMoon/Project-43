var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup, obstaclesGroup;
var bananaImage,banana;
var obstacleImg;
var gameState;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  backImage=loadImage("images/jungle.jpg");
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  bananaImage = loadImage("images/banana.png");
  obstacleImg = loadImage("images/stone.png");

}

function setup() {
  createCanvas(800,400);

  FoodGroup= createGroup();
  obstaclesGroup = createGroup();
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 2;
      player.scale += 0.1;
    }

    spawnFood();
    spawnObstacles();

  }
    
  drawSprites();

  if(obstaclesGroup.isTouching(player)){
    gameState=END;
  }
 else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over..!", 300, 220);
  }

  textSize(20);
  fill(255);
  text("Score : " + score,610,80);
}

function spawnFood(){

  if(frameCount % 80 === 0){
    var banana=createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX= -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}


function spawnObstacles(){

  if(frameCount % 150 === 0){
    var obstacle=createSprite(600,300,40,10);
    obstacle.addImage(obstacleImg);
    obstacle.debug=true;
    obstacle.setCollider("rectangle",0,0,300,300);
    obstacle.scale=0.3;
    obstacle.velocityX= -4;

    obstacle.lifetime = 300;
    player.depth = obstacle.depth + 1;
    obstaclesGroup.add(obstacle);
  }
}

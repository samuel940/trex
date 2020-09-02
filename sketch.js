var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, GameOver, Restart, gameOver_image, restart_image, GameOver ;
var END = 0;
var PLAY = 1;
var GameState;
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOver_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  GameOver = createSprite(300,50,10,10);
  GameOver.addImage("gameover",gameOver_image);
  GameOver.visible = false;
  GameOver.scale = 0.5;
  Restart = createSprite(300,75,10,10);
  Restart.addImage("restart",restart_image);
  Restart.visible = false;
  Restart.scale = 0.5;
  GameState = PLAY;
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  if (GameState === PLAY) {
  ground.velocityX = -4;
  score = score + Math.round(getFrameRate()/60);
  
  
  if(keyDown("space")) { 
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  spawnClouds();
  spawnObstacles();
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
    if (obstaclesGroup.isTouching(trex)) {
      GameState = END;
    }
  
  
  
  }
  
  else if (GameState === END) {
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.velocityY = 0;
    ground.velocityX = 0;
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    GameOver.visible = true;
    Restart.visible = true;
    trex.changeAnimation("collided",trex_collided);
    if (mousePressedOver(Restart)) {
      reset();
    }
  }
    text("Score: "+ score, 500,50);
    trex.collide(invisibleGround);
    drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  score = 0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  GameOver.visible = false;
  Restart.visible = false;
  GameState = PLAY;
  trex.changeAnimation("running",trex_running);
  
}
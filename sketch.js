
var monkey, monkey_running,monkey_collided;
var banana, bananaImage, bananagroup;
var obstacle, obstacleImage, obstaclegroup;
var FoodGroup;
var score = 0;
var ground;
var survivaltime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg,restartImg;
var gameOver,restart;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImg = loadImage("restart-icon-internet-button-on-260nw-421013368.webp");
  gameOverImg = loadImage("images.png");
  monkey_collided = loadImage("monkey.jpg");
  
}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 347, 600, 10);
  ground.velocityX = -4

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  restart = createSprite(300,160);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
}


function draw() {
  background("lightBlue");

 if(gameState===PLAY){ ground.x = ground.width / 2
  console.log(ground.x)
  if (keyDown("space") && monkey.y >= 310) {
    monkey.velocityY = -18;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
                      
  gameOver.visible = false;
  restart.visible = false;                    

  stroke("red");
  strokeWeight(5);
  textSize(20);
  fill("yellow");
  text("Score:" + score, 400, 50);

  stroke("darkgreen");
  textSize(20);
  fill("lightgreen");
  survivaltime = survivaltime + Math.ceil(getFrameRate() / 60);
  text("SurvivalTime=" + survivaltime, 100, 50)

  if (monkey.isTouching(bananaGroup)) {
    score = score + 1;
    bananaGroup.destroyEach();
  }

   if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }                   

  food();
  spawnObstacles();}
  
  else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
    
    monkey.changeImage("collided", monkey_collided);
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);  
     
     if(mousePressedOver(restart)) {
      
    reset();
    }
   }
  
  drawSprites();
}

function reset(){
  gameState=PLAY;
  score=0;
  survivaltime = 0;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("moving", monkey_running);
}


function food() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 140, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = banana.depth + 1;

    banana.setCollider("circle", 10, 10, 5);
    banana.debug = false;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 335, 10, 40);

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }

}
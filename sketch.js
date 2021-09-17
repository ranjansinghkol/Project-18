var path, boy, cash, diamonds, jwellery, sword, endScreen;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, endImg;
var cashG, diamondsG, jwelleryG, swordGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(windowWidth / 2, windowHeight / 2);
  path.addImage(pathImg);
  path.velocityY = 4;

  //creating boy running
  boy = createSprite(70, 580, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  endScreen = createSprite(windowWidth / 2, windowHeight / 2);
  endScreen.addImage(endImg);
  endScreen.scale = 0.9;
  endScreen.visible = false;

  score = 0;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() {
  textSize(20);
  drawSprites();

  if (gameState === PLAY) {
    background(0);
    boy.x = World.mouseX;

    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > 2500) {
      path.y = 500;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      score = score + 10;
      cashG.destroyEach();
    } 
    if (diamondsG.isTouching(boy)) {
      score = score + 50;
      diamondsG.destroyEach();
    } 
    if (jwelleryG.isTouching(boy)) {
      score = score + 25;
      jwelleryG.destroyEach();
    }
    if (boy.isTouching(swordGroup)) {
      gameState = END;
    }
  } else if (gameState === END) {
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    boy.visible = false;
    path.velocityY = 0;
    endScreen.visible = true;
  }

  drawSprites();
  fill(225);
  text("Score: " + score, 50, windowHeight / 10);
}

function mouseClicked() {
  if (gameState == END) {
    gameState = PLAY;
    score = 0;
    endScreen.visible = false;
    boy.visible = true;
    path.velocityY = 4;
  }
}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 1000;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 410 == 0) {
    var diamonds = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 1000;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 320 == 0) {
    var jwellery = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 1000;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 1000;
    swordGroup.add(sword);
  }
}

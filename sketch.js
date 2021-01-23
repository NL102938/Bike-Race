var path, mainCyclist;
var pathIMG, mainCyclistIMG1, mainCyclistIMG2;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var gameOver, gameOverIMG;
var bellSound;
var edges;
var opponentsGroup;

var obstacle1, obstacle2, obstacle3;
var obstacle1IMG, obstacle2IMG, obstacle3IMG;
var pinkBikes, yellowBikes, redBikes;
var pinkBikesIMG1, yellowBikesIMG1, redBikesIMG1, pinkBikesIMG2, yellowBikesIMG2, redBikesIMG2;


function preload() {
    pathIMG = loadAnimation('images/Road.png');
    mainCyclistIMG1 = loadAnimation('images/mainPlayer1.png', 'images/mainPlayer2.png');
    mainCyclistIMG2 = loadAnimation('images/mainPlayer3.png');
    bellSound = loadSound('sound/bell.mp3');
    gameOverIMG = loadImage('gameOver.png');

    obstacle1IMG = loadImage('obstacle1.png');
    obstacle2IMG = loadImage('obstacle2.png');
    obstacle3IMG = loadImage('obstacle3.png');

    pinkBikesIMG1 = loadAnimation('images/opponent1.png', 'images/opponent2.png');
    pinkBikesIMG2 = loadAnimation('images/opponent3.png');

    yellowBikesIMG1 = loadAnimation('images/opponent4.png', 'images/opponent5.png');
    yellowBikesIMG2 = loadAnimation('images/opponent6.png');

    redBikesIMG1 = loadAnimation('images/opponent7.png', 'images/opponent8.png');
    redBikesIMG2 = loadAnimation('images/opponent9.png');
}

function setup() {
    createCanvas (500, 300);

    opponentsGroup = new Group();
    // Moving background
    path = createSprite(100, 150);
    path.addImage(pathIMG);
    path.velocityX = -5;

    // creating boy running
    mainCyclist = createSprite(70, 150, 20, 20);
    mainCyclist.addAnimation('SahilRunning', mainCyclistIMG1);
    mainCyclist.scale = 0.07;

    mainCyclist.addAnimation('SahilFell', mainCyclistIMG2);


    gameOver = createSprite(250, 150);
    gameOver.addAnimation(gameOverIMG);

    distance = 0;
}

function draw() {
    background ("white");
    textSize (10);
    fill ("grey");
    text ("Distance", 350, 30);

    if (gameState === PLAY) {
        gameOver.visible = false;
        spawnOpponentsAndObstacles();
        mainCyclist.y = World.mouseY;

        edges = createEdgeSprites();
        mainCyclist.collide(edges);

        if (keyDown('space')) {
            bellSound.play();
        }

        // code to reset the background
        if (path.x < 0) {
            path.x = width / 2;
        }

        distance += Math.round(getFrameRate() / 50);

        if (mainCyclist.isTouching(pinkBikes) || mainCyclist.isTouching(yellowBikes) || mainCyclist.isTouching(redBikes) || mainCyclist.isTouching(obstacle1) || mainCyclist.isTouching(obstacle2) || mainCyclist.isTouching(obstacle3)) {
            gameState = END;
        }
    }

    if (gameState === END) {
        gameOver.visible = true;
        path.velocityX = 0;
        pinkBikes.velocityX = 0;
        yellowBikes.velocityX = 0;
        redBikes.velocityX = 0;
        mainCyclist.changeAnimation("sahilFell", mainCyclistIMG2);
        if (mainCyclist.isTouching(pinkBikes)) {
            pinkBikes.changeAnimation(pinkBikesIMG2);
        }
        if (mainCyclist.isTouching(yellowBikes)) {
            yellowBikes.changeAnimation(yellowBikesIMG2);
        }
        if (mainCyclist.isTouching(redBikes)) {
            redBikes.changeAnimation(redBikesIMG2);
        }
    }
    drawSprites();
}

function spawnOpponentsAndObstacles() {
    if (frameCount % 240 === 0) {
        pinkBikes = createSprite(600, 150);
        pinkBikes.addAnimation(pinkBikesIMG1);
        pinkBikes.addAnimation(pinkBikesIMG2);
        pinkBikes.y = Math.round(random(50, 450));
        pinkBikes.velocityX = -1;
        pinkBikes.lifetime = 500;
        opponentsGroup.add(pinkBikes);

        yellowBikes = createSprite(600, 150);
        yellowBikes.addAnimation(yellowBikesIMG1);
        yellowBikes.addAnimation(yellowBikesIMG2);
        yellowBikes.y = Math.round(random(50, 450));
        yellowBikes.velocityX = -1;
        yellowBikes.lifetime = 500;
        opponentsGroup.add(yellowBikes);

        redBikes = createSprite(600, 150);
        redBikes.addAnimation(redBikesIMG1);
        redBikes.addAnimation(redBikesIMG2);
        redBikes.y = Math.round(random(50, 450));
        redBikes.velocityX = -1;
        redBikes.lifetime = 500;
        opponentsGroup.add(redBikes);

        obstacle1 = createSprite(500, 500);
        obstacle1.addAnimation(obstacle1IMG);
        obstacle1.y = Math.round(random(50, 450));
        obstacle1.velocityX = -1;
        obstacle1.lifetime = 500;
        opponentsGroup.add(obstacle1);

        obstacle2 = createSprite(500, 500);
        obstacle2.addAnimation(obstacle2IMG);
        obstacle2.y = Math.round(random(50, 450));
        obstacle2.velocityX = -1;
        obstacle2.lifetime = 500;
        opponentsGroup.add(obstacle2);

        obstacle3 = createSprite(500, 500);
        obstacle3.addAnimation(obstacle3IMG);
        obstacle3.y = Math.round(random(50, 450));
        obstacle3.velocityX = -1;
        obstacle3.lifetime = 500;
        opponentsGroup.add(obstacle3);
    }
}
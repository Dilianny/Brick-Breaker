//brick breaker 1.0 James Abney
var canvas = document.getElementById("bbCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;
var eggImg = new Image();
var yoshiImg = new Image();
var gameoverImg = new Image();
var winnerImg = new Image();
var infoImg = new Image();
var brick1 = new Image();
var brick2 = new Image();
var brick3 = new Image();
var brick4 = new Image();
const eggHeight = 46;
const eggWidth = 40;
var yoshiHeight = 52;
var yoshiHeightCol = 35;
var yoshiWidth = 150;
var yoshiStart = (canvas.width-yoshiWidth)/2;
var gameStarted = false;
var gameOver = false;
var gameWon = false;
var onInfoScreen = false;
var score = 0;
var brickCount = 0;
eggImg.src = "egg.png";
yoshiImg.src = "yoshi.png";
gameoverImg.src = "gameover.jpg";
winnerImg.src = "winner.jpg";
infoImg.src = "info.jpg";
brick1.src = "bricks1.jpg";
brick2.src = "bricks2.jpg";
brick3.src = "bricks3.jpg";
brick4.src = "bricks4.jpg";

var x = yoshiStart / .9;   //start of egg x-axis
var y = canvas.height-eggHeight-yoshiHeightCol; //start of egg y-axis
var eggx = 5;
var eggy = -5;

//audio
var audio = [new Audio("yoshi.mp3"), new Audio("smw_yoshi_tongue.wav"), new Audio("smw_pause.wav"), 
            new Audio("smw_lost_a_life.wav"), new Audio("smw_game_over.wav"), new Audio("smw_break_block.wav"), 
            new Audio("smw_course_clear.wav")];

var randomBrick = new Array(brick1, brick1, brick1, brick1, brick3, brick2, brick3, brick4, brick3);
var randomBrickFinal = [];
var randomizedBricks = false;

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
var rPressed = false;
var iPressed = false;
var xleft = false;
var livesLeft = 3;

var brickRowCount = 4;
var brickColCount = 8;
var brickWidth = 100;
var brickHeight = 33;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 15;

//settign up bricks array
var bricks = [];
for(var b = 0; b < brickColCount; b++) {
    bricks[b] = [];
    for(var c = 0; c < brickRowCount; c++) {
        var brickChoice = randomBrick[Math.floor(Math.random()*randomBrick.length)];
        bricks[b][c] = { x: 0, y: 0, status: 1, brickType: brickChoice};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.getElementById("bbCanvas").style.background = "url('background.jpg')";

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }else if(e.key == "R" || e.key == "r" ){
        rPressed = true;
    }else if(e.key == "I" || e.key == "i" ){
        iPressed = true;
    }
    if(e.key == ' '){
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }else if(e.key == "R" || e.key == "r" ){
        rPressed = false;
    }else if(e.key == "I" || e.key == "i" ){
        iPressed = false;
    }
    if(e.key == ' '){
        spacePressed = false;
    }
}

function collisionDetection() {
    for(var c = 0; c < brickColCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    audio[5].play()
                    audio[5].loop = false;
                    if(b.brickType == brick1)
                        score++;
                    else if(b.brickType == brick2)
                        score = score + 2;
                    else if(b.brickType == brick3)
                        score = score + 3;
                    else
                        score = score + 4;

                    eggy = -eggy;
                    b.status = 0;
                    brickCount++;
                    if(brickCount >= 32) {
                        gameWon = true;
                        gameOver = true;
                        brickCount = 0;
                        audio[0].pause();
                        audio[0].currentTime = 0;
                        audio[6].play()
                        audio[6].loop = false;
                    }
                }
            }
        }
    }
}

function randomBricks(){
    for(var b = 0; b < brickColCount; b++) {
        randomBrickFinal[b] = [];
        for(var c = 0; c < brickRowCount; c++) {
            var brickChoice = randomBrick[Math.floor(Math.random()*randomBrick.length)];
            randomBrickFinal[b][c] = brickChoice;
        }
    }
    randomizedBricks = true;
}

function drawBricks() {
    for(var b = 0; b < brickColCount; b++) {
        for(var c = 0; c < brickRowCount; c++) {
            if (bricks[b][c].status == 1) {
                var brickX = (b*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[b][c].x = brickX;
                bricks[b][c].y = brickY;
                ctx.beginPath();
                ctx.drawImage(bricks[b][c].brickType, brickX, brickY, brickWidth, brickHeight);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawEgg(){
    ctx.beginPath();
    ctx.drawImage(eggImg, x, y, eggWidth, eggHeight);
    ctx.fill();
    ctx.closePath();
}

function drawYoshi() {
    ctx.beginPath();
    //ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.drawImage(yoshiImg, yoshiStart, canvas.height-yoshiHeight, yoshiWidth, yoshiHeight);
    ctx.fill();
    ctx.closePath();
}

function drawGameOver() {
    ctx.beginPath();
    //ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.drawImage(gameoverImg, 75, 0, 750, 623);
    ctx.fill();
    ctx.closePath();
}

function drawWinnerImg() {
    ctx.beginPath();
    //ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.drawImage(winnerImg, 50, 35, 800, 529);
    ctx.fill();
    ctx.closePath();
}

function drawInfoImg() {
    ctx.beginPath();
    //ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.drawImage(infoImg, 10, 25, 850, 479);
    ctx.fill();
    ctx.closePath();
}

function pauseAudio(){
    for(i = 0; i < audio.length; i++){
        if(i != 2){
                audio[i].pause();
                
        }
    }    
}

function resumeAudio(){
    for(i = 0; i < audio.length; i++){
            if(i == 0){
                audio[i].play();
                audio[i].loop = true;
        }
    }    
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(spacePressed == false && gameStarted == false){
        audio[0].pause();
        drawPressSpace();
    }
        
    if(iPressed == false && onInfoScreen == true){
        audio[2].play()
        audio[2].loop = false;
        onInfoScreen = false;
        resumeAudio();
    }

    eggImg.onload = drawEgg();
    yoshiImg.onload = drawYoshi();
    collisionDetection();
    drawLives();
    drawScore();
    drawInfo();
    drawBricks();

    if(gameStarted == true){
        if(x + eggx > canvas.width-eggWidth || x + eggx < 0) {
            eggx = -eggx;
            xleft = !xleft;
        }
        
        if(y + eggy < 0) {
            eggy = -eggy;
        }else if(y + eggy > canvas.height-eggHeight-yoshiHeightCol) {
            if(x > yoshiStart && x < yoshiStart + yoshiWidth) {
                audio[1].play() //audio for tongue
                audio[1].loop = false;
                if(rightPressed == true && xleft == true){
                    eggy = -eggy;
                    eggx = -eggx;
                    xleft = false;
                }else if(leftPressed == true && xleft == false){
                    eggy = -eggy;     
                    eggx = -eggx;
                    xleft = true;             
                }else
                    eggy = -eggy;
                    
            }
            else if(y + eggy > canvas.height-eggHeight){    
                livesLeft--;
                if(livesLeft < 1){            
                    gameStarted = false;
                    gameOver = true;
                    randomizedBricks = false;
                    audio[0].pause();
                    audio[0].currentTime = 0;
                    audio[4].play()
                    audio[4].loop = false;
                }else{
                    gameStarted = false;
                    audio[0].pause();
                    audio[0].currentTime = 0;
                    audio[3].play()
                    audio[3].loop = false;
                    yoshiStart = (canvas.width-yoshiWidth)/2;
                    x = yoshiStart / .9;   //start of egg x-axis
                    y = canvas.height-eggHeight-yoshiHeightCol; //start of egg y-axis                    
                    eggImg.onload = drawEgg();
                    yoshiImg.onload = drawYoshi();
                }
            }
        }
    }

    if(rightPressed && yoshiStart < canvas.width-yoshiWidth) {
        yoshiStart += 7;
        if(gameStarted == false){
            x += 7;
        }
        
    }
    else if(leftPressed && yoshiStart > 0) {
        yoshiStart -= 7;
        if(gameStarted == false){
            x -= 7;
        }
    }

    if(spacePressed == true && leftPressed) {
        gameStarted = true;
        eggx = -5;
        xleft = true;
        audio[0].play()
        audio[0].loop = true;
    }else if(spacePressed == true && rightPressed) {
        gameStarted = true;
        eggx = 5;
        audio[0].play()
        audio[0].loop = true;
    }else if(spacePressed == true){
        gameStarted = true;
        audio[0].play()
        audio[0].loop = true;
    }

    if(gameStarted == true){
        x += eggx;
        y += eggy;
    }
    if(iPressed == true && gameWon == false && gameOver == false && onInfoScreen == false){
        audio[2].play()
        audio[2].loop = false;
        audio[0].pause();
        pauseAudio();
        requestAnimationFrame(drawInfoScreen); 
    }else if(gameOver == false && gameWon == false)
        requestAnimationFrame(draw);
    else if(gameWon == true){
        requestAnimationFrame(drawWinner);
    }else
        requestAnimationFrame(drawOver);
}

function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Lives: "+ livesLeft, canvas.width-200, 20);
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Score: "+ score, canvas.width-800, 20);
}

function drawRestart(){
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Press R to restart", canvas.width-300, 20);
}

function drawInfo(){
    ctx.font = "20px Arial";    
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Press I for information", canvas.width-550, 20);
}

function drawPressSpace(){
    ctx.font = "40px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Press Space to Begin", canvas.width-660, 300);
}

function drawInfoScreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawInfoImg();
    if(iPressed == false)
        onInfoScreen = true;

    if(iPressed == true && onInfoScreen == true){
        requestAnimationFrame(draw);      
    }else
        requestAnimationFrame(drawInfoScreen);
}

function drawOver(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameoverImg.onload = drawGameOver();
    drawScore();
    drawRestart();
    if(rPressed == true){
        gameOver = false;
        document.location.reload();   
    }   
    requestAnimationFrame(drawOver);
}

function drawWinner(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWinnerImg();
    drawScore();
    drawRestart();
    if(rPressed == true){
        gameOver = false;
        gameWon = false;
        document.location.reload();     
    }   
    requestAnimationFrame(drawWinner);
}


//begin first draw cycle
draw();


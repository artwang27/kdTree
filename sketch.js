

let game;
let nameP;  //顯示粒子增量


function setup() {
    let defaultInc=50;
    createDiv('粒子遞增(遞減)量：');
    slider = createSlider(0, 100, defaultInc);
    slider.position(150, 0);
    slider.style('width', '300px');
    nameP=createDiv(' '+defaultInc);
    createDiv('功能鍵： + ,- , g , p, 上下左右方向鍵');



    createCanvas(600, 600);
    background(255);
    strokeWeight(1);
    textSize(32);
    
    
    game=new Game(1000);
    game.drawTree=!true;
    
    button1 = createButton('增加粒子');
    button1.position(19, 600);
    button1.mousePressed( incParticles );
    
    button2 = createButton('減少粒子');
    button2.position(119, 600);
    button2.mousePressed( decParticles );

    button3 = createButton('顯示 KD tree');
    button3.position(239, 600);
    button3.mousePressed( toggleGrid );

    button4 = createButton(' 暫　　停 ');
    button4.position(369, 600);
    button4.mousePressed( togglePause );
    
}


function draw() {
    if( game.pause )  return;    
    
    box0Control();    
    
    background(220);
    game.update();
    game.draw();
    
    
    let c = color(0, 0, 250);
    fill(c);
    text('fps='+getFPS(), 10, 30);
    text('total='+game.objs.length+"  particles",10,60);
    nameP.html(slider.value());
}


//************ fps ********************
let fps=0;
let countTime=0;
function getFPS(){
    if( countTime++ %30==0 ){
        fps=frameRate();
        countTime=1;
    }
    return fps;
}



function box0Control(){
    let box= game.objs[0];
    box.speedx=0;
    box.speedy=0;
    

    
    if (keyIsDown(LEFT_ARROW)) {
        box.x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        box.x += 5;
    }

    if (keyIsDown(UP_ARROW)) {
        box.y -= 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
        box.y += 5;
    }    
    
}

//keyPressed 是 p5js 內建函數
function keyPressed() {
    
    if(key=='p'){
        togglePause();
    }

    if(key=='g'){
        toggleGrid();
    }
    
    if(key=='+'){
        incParticles();
    }
    
    if(key=='-'){
        decParticles();
    }
    
}


function incParticles(){
    let count=slider.value();
    game.addParticles(count)
}


function decParticles(){
    let count=slider.value();
    game.deleteParticles(count)
}

function togglePause(){
    game.pause= !game.pause;    
}

function toggleGrid(){
    game.drawTree= !game.drawTree;
}

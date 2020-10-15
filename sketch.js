

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


function keyPressed() {
    let n=slider.value();
    
    if(key=='p'){
        game.pause= !game.pause;
    }
    
    if(key=='g'){
        game.drawTree= !game.drawTree;
    }
    

    
    if(key=='+'){
        game.addParticles(n);
    }
    
    if(key=='-'){
        game.deleteParticles(n);
    }
 
}


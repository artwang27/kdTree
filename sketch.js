

let game;


function setup() {
    createCanvas(600, 600);
    background(255);
    strokeWeight(1);
    textSize(32);
    
    
    game=new Game(600);
    game.drawTree=!true;
    
}


function draw() {
    updateKey();    
    if( game.pause )  return;    
    
    background(220);
    
    
    game.update();
    
    game.draw();
    
    
    let c = color(0, 0, 250);
    fill(c);
    text('fps='+getFPS(), 10, 30);
    text('total='+game.objs.length+"  particles",10,60);
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


function updateKey(){
    box0Control();
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
    if(key=='p'){
        game.pause= !game.pause;
    }
    
    if(key=='g'){
        game.drawTree= !game.drawTree;
    }
    
    if(key=='+'){
        game.addParticles(100);
    }
    
    if(key=='-'){
        let succ=false;
        let n=100;
        do{
            succ=game.deleteParticles(n);
            n/=2;
        }while( !succ);
    }
 
}


//先把質點假定為長方形
class Particle{
    
    //質點中心 x,y
    //寬度w,高度h
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        //this.speedx=random(-3,3);
        //this.speedy=random(-3,3);
        this.speedx=random(-1,1);
        this.speedy=random(-1,1);
        
        this.cc=128;    //color
    }
    
    draw(){
        //let cc=128;
        fill( this.cc );
        rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
    }

    move(){
        this.x += this.speedx;
        this.y += this.speedy;
        
        if(this.x<0 ){
            this.x=0;
            this.speedx= -this.speedx;
        }
        
        if(this.y<0){
            this.y=0;
            this.speedy= -this.speedy;
        }
        
        
        if(this.x>width){
            this.x=width-1;
            this.speedx= -this.speedx;
        }
        
        
        if(this.y>height){
            this.y=height-1;
            this.speedy= -this.speedy;
        }
    }//move
    
    
    getRange(){
        return new Range(this.x-this.w/2, this.x+ this.w/2, 
                         this.y-this.h/2, this.y+ this.h/2);
    }
}
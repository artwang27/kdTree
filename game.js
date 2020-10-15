//Particle 可以是任何形式的遊戲物件，但必須具有 x,y 屬性，
//且具有 getRange() 方法，可以傳回座標所占的範圍

class Game{
    constructor(particleCount){
        this.tree= null;
        this.pause=false;
        this.drawTree=false;
        this.objs=[];
        //this.particleCount=3600;  //質點總數量，可以到3600
        this.addParticles(particleCount); 
    }
    
    
    addParticles(count){
        for(let i=0;i <count; i++){
            let x=random(width);
            let y=random(height);
            let w= random(5,20);
            let h= random(5,20);
        
            let p=new Particle(x,y,w,h);
            //let p=new Particle(x,y,12,12);
            this.objs.push(p);
        }
    }

    
    //傳回是否刪除成功
    deleteParticles(count){
        if(this.objs.length>count){
            for(let i=0; i<count; i++){
                this.objs.pop();
            }
            return true;
        }
        return false;
    }
    
    
    
    update(){
        for(let obj of this.objs){
            obj.move();
            obj.cc="#444";  //先設為淺色
        }
         
        
        this.makeTree2D();
        this.collisions();
    }
    
    draw(){
        for(let obj of this.objs)
            obj.draw();
        
        if( this.drawTree )
            this.tree.draw();
    }
    
    
    makeTree2D(){
        //每一影格，因為物件的位置改變了，要重新建構 kd tree
        this.tree= new Tree2d();    
        
        for(let obj of this.objs){
            let pNode=new Node(obj);
            this.tree.insert(pNode);
        }
        
    }
    

    //碰撞測試時，記得扣除自己
    collisions(){
        
        for(let p of this.objs){
            let rg= p.getRange();
            //碰撞結果被存在 others
            let others=this.tree.query(rg);
            let hits=others.length-1;   //碰撞測試時，記得扣除自己
            //print(hits);
            
            p.cc=64+ (hits<<5);   
            
        }
        
    }
    
    
        
        
    

    
}//class




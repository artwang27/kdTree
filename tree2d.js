/**
 * Created by arthur on 2020/10/10.
 */
 
//注意順序：(minX,maxX, minY, maxY);
class Range{
    constructor(x1,x2,y1,y2){
        this.x1=x1;
        this.x2=x2;
        this.y1=y1;
        this.y2=y2;
    }
}


//2D 樹
class Node{
    constructor(particle){
        this.obj=particle;
        this.left=null;
        this.right=null;
        this.parent=null;
        this.x=particle.x;
        this.y=particle.y;
        //每一個影格，因為 particle 位置改變了，所以要重取一次 range
        this.range=particle.getRange(); 
    }
    
    
    dump(){
        this.printNode( this ) ;
    }
    
    
    printNode(node){
        if(node==null){
            print("null");
            return;  
        } 
        
        print( "x= "+node.x+" ,y= "+ node.y);
    }
    
    draw(){
        push();
        let sz=4;
        stroke("red");
        circle(this.x, this.y, sz);
        pop();
    }
    
}


class Tree2d{
    
    constructor(){
        this.root=null;
    }
    
    //插入質點
    insert(pNode){
        if( this.root==null){
            this.root=pNode;
            return;
        }
        
        let t=this.root;
        let f=null; //node farther，父節點
        let depth=0;    //depth
        let testd=false;    //比大小的結果
        
        while(t!=null){
            //依照 depth 奇偶決定要以 x 座標或 y 座標來分類
            testd= depth? pNode.x< t.x : pNode.y< t.y;
            f=t;
            t= testd? t.left: t.right;
            depth= ! depth;
        }
        
        pNode.parent=f;
        if( testd ){
            f.left=pNode;
        }else{
            f.right=pNode;
        }
    }// insert
    
    
    
    //找查 range 範圍內所有 node 節點
    query( range ){
        return this.inRange( this.root, range, 0, []); 
    }
        
    
    /*    inRange 是遞迴函式
    node 是遞迴遊走的節點
    range : 搜尋的範圍
    depth : 控制奇偶層
    ans   : 把在此範圍內找到的節點，附加並回傳
    */
    inRange(node, range, depth, ans){
        if (node==null) return ans;
        let test1, test2;
        
        if(depth){  //當奇數層時
            test1= range.x1< node.x;
            test2= range.x2>= node.x;
        }
        else{   //當偶數層時。 第一次是第0層，因此會先在此處判斷
            test1= range.y1< node.y;
            test2= range.y2>= node.y;
        }
        
        if(test1) this.inRange(node.left, range, !depth, ans);
        
        
        /*
        if( insideRect( node.obj, range) ){
            ans.push(node);
        }*/
        
        //用 range 比 用 point來判斷，更加準確
        if( intersect(range, node.range ) )
            ans.push(node);
        
        
        if(test2) this.inRange(node.right, range, !depth, ans);
        return ans;
    }
    
    
    //列印節點
    dump(){
        this.visit( this.root );
    }
    
    //前序拜訪
    visit(node){
        if( node==null)
            return;
        
        node.dump();        
        this.visit(node.left);
        this.visit(node.right);
    }

    
    //**********************************
    //畫出 kd tree 的分割圖
    draw(){
        this.drawline(this.root,0,width,0,height,0);
    }
    
    
    //遞迴呼叫分割區域
    drawline(node,minx,maxx,miny,maxy,depath){
        if( node==null)
            return;
        
        let x=node.x;
        let y=node.y;
        if(depath){ //x
            line(x,miny,x,maxy);
            node.draw();
            
            this.drawline(node.left, minx,x,miny,maxy,!depath);
            this.drawline(node.right,x,maxx,miny,maxy,!depath);
        }else{  //y
            line(minx,y,maxx,y);
            node.draw();
            
            this.drawline(node.left, minx,maxx,miny,y,!depath);
            this.drawline(node.right,minx,maxx,y,maxy,!depath);
            
        }
    }//drawline
    
    
    
}//class


//**********************************

//判斷某個點是否在長方形的 range 之內
//range被定義為端點的極小與極大值 range.x1, range.x2, range.y1, range.y2
function insideRect(point,range){
    return ( range.x1 <= point.x && point.x<= range.x2 
      && range.y1 <= point.y && point.y<= range.y2 );
}


//判斷兩矩形是否相交
function intersect(range1, range2){
    return !(
        range1.x2< range2.x1 ||
        range2.x2< range1.x1 ||
        range1.y2< range2.y1 ||
        range2.y2< range1.y1   );
}


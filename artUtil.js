function trace(s){
    console.log(s);
}


function print1(s){
    document.write(s+"<br/>");
}

function print2(s){
    document.write(s+"<br/>");
}


//計算函數的執行時間
//funName:函數名稱
//number:連續執行的次數
function timeit(funName, number){
    let start = performance.now();
    for(let i=0; i<number; i++){
        funName();
    }
    let end = performance.now();
    let diff=end-start;
    print2("總共 "+ diff +" 毫秒");
    print2("平均 "+ diff/number +" 毫秒");
}
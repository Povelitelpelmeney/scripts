let readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.question('Введите текст: ', (answer) => {
let output = answer;
n=output.length;
let alphch=new Array();
let ltrs=new Array();
let sch=0;
for(i=0;i<output.length;i++){
    if (alphch[output.charAt(i)]){
        alphch[output.charAt(i)]++}
    else{
        alphch[output.charAt(i)]=1;
        ltrs[sch]=output[i];
        sch+=1;
    }
}
console.log(alphch);
console.log(ltrs);
function tree (lson, rson,parent, wes,start_pos,end_pos) {
    this.lson=lson;
    this.rson=rson;
    this.parent=parent;
    this.wes=wes;
    this.start_pos=start_pos;
    this.end_pos=end_pos;
    }
T=new Array();
function ShTree(usel){
    if (T[usel].start_pos !=T[usel].end_pos){
        s = 0;
        i = T[usel].start_pos;
        while ((s+ alwes [alphabet [i]]<T[usel].wes/2)|| (i<T[usel].end_pos))
        {
            s = s + alwes [alphabet [i]]
            i++
        }
        if(i> T[usel].start_pos){
            i=i-1}
        else{
            s =  alwes [alphabet [i]]}
        T[usel].lson=lastusel+1
        T[usel].rson=lastusel+2
        T[lastusel+1]=new tree(0,0,usel,s,T[usel].start_pos,i)
        T [lastusel+2]=new tree(0,0,usel,T[usel].wes-s,i+1,T[usel].end_pos)
        lastusel=lastusel+2

        ShTree(T[usel].lson);
        ShTree(T[usel].rson);
    }
}

});
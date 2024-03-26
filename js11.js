let readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.question('Введите текст: ', (answer) => {
let output = answer;
n=output.length;
alphch=new Array();
ltrs=new Array();
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
let count=0;
for(a in alphch){
    if(isNaN(alphch[a])) break;
    else count+=1;
}
console.log(alphch);
function tree (lson, rson,parent, stroca) {
    this.lson=lson;
    this.rson=rson;
    this.parent=parent;
    this.stroca=stroca;
    }
T=new Array();
function forest(wes, root) {
    this.wes=wes;
    this.root=root;
    }
F=new Array();
for(let i=1;i<=count;i++){
    T[i-1] =new tree(0,0,0,ltrs[i-1]);
    F[i-1]= new forest(alphch[ltrs[i-1]]/n,i);
}
let treelen=T.length;
lastusel=count;
lasttree=count;
let delt=0;
console.log(F);
while(lasttree >1){
    let wes0=F[0].wes;
    let wes1=F[1].wes;
    if(wes0<=wes1){
        first=0;
        second=1;
    }
    else{
        first=1;
        second=0;
    }
    for(let i= 2;i<lasttree;i++){
        if(F[i].wes < F[first].wes){
            second=first;
            first=i;
        }
        else{
            if(F[i].wes < F[second].wes){
                second=i;
            }
        }
    }
    lastusel=lastusel+delt;
    T[lastusel] =new tree (F[first].root, F[second].root,0,T[(F[first].root)-1].stroca+T[(F[second].root)-1].stroca);
    T[(F[first].root)-1].parent=lastusel+1;
    T[(F[second].root)-1].parent=lastusel+1;
    F[first].wes=F[first].wes+F[second].wes;
    F[first].root=lastusel+1;
    lasttree=lasttree - 1;
    F.splice(second,1);
    delt=1; 
}
codes=new Array();
console.log(T);
for(let i=1;i<=treelen;i++){
    str="";
    k=i;
    p=k;
    for(let u=0;u<T.length-1;u++){
        p=k;
        p=T[p-1].parent;
        if(T[p-1].lson==k){
            str="0"+str;
        }
        if(T[p-1].rson==k){
            str="1"+str;
        }
        if(T[p-1].parent==0){
            u=T.length+1;
        }
        k=p;
    }
    codes[T[i-1].stroca]=str;
}
console.log(codes);
rl.question('Введите код: ', (answer1) => {
    rl.close();
    let output1 = answer1;
    output1.toString();
    str1="";
    let otv="";
    for(let i=0;i<output1.length;i++){
        str1+=output1[i]; 
    }
    let l=T.length-1;
    for(let i=0;i<output1.length;i++){
            if(output1[i]=="0"){
                str1.slice(0,1);
                l=T[l].lson-1;
                if(T[l].lson=="0"&&T[l].rson=="0"){
                    otv+=(T[l].stroca);
                    l=T.length-1;
                }
            }
            if(output1[i]=="1"){
                str1.slice(0,1);
                l=T[l].rson-1;
                if(T[l].lson=="0"&&T[l].rson=="0"){
                    otv+=(T[l].stroca);
                    l=T.length-1;
                }
            }
    }
console.log(otv);
});
});
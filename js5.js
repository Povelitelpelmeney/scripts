let fs=require("fs");
const { arrayBuffer } = require("stream/consumers");
let File=fs.readFileSync("text.txt","utf8");
line=File.split("\n");
let S="сто сорок восемь от семи, тысяча двест";
let T=File;
let m=S.length;
let n=T.length;
let P=S+"#"+T;
let p=P.length;
/////////////////////////////////////////////////////////////////////z
/*z=new Array();
l=0;
r=0;
for(let j=0;j<p;j++){
    z[j]=0;
}
for(let j=1;j<p;j++){
    if(j<=r){
        z[j]=Math.min(r-j+1,z[j-l]);
    }
    while(j+z[j]<p &&P.charAt(z[j])==P.charAt(j+z[j])){
        ++z[j];
    }
    if(j+z[j]-1>r){
        l=j;
        r=j+z[j]-1;
    }
    if(z[j]==m){
        //console.log(j-m-1);
    }
}
/////////////////////////////////////////////////////////////////////prefix
pi=new Array;
pi[0]=0;
let k=0;
for(let i=1;i<=m;i++){
    while((k>0)&&(P.charAt(k)!=P.charAt(i))){
        k=pi[k-1];
    }
    if(P.charAt(k)==P.charAt(i)){
        k++;
    }
    pi[i]=k;


}
for(let i=m+1;i<P.length;i++){
    while((k>0)&&(P.charAt(k)!=P.charAt(i))){
        k=pi[k-1];
    }
    if(P.charAt(k)==P.charAt(i)){
        k++;
    }
    if(k==m){
        //console.log(i-2*m);
    }
}*/
///////////////////////////////////////////////////////////////////////Morris pratt
var start=new Date();
pre=new Array();
pre[0]=0;
k=0;
for(i=1;i <= m;i++) {
    while((k>0) && (P.charAt(k)!=P.charAt(i))){
        k=pre[k-1];
    }
    if (P.charAt(k)== P.charAt(i))
        k++;
    pre[i]=k;
}
let k1=0;
let i1 = 0;
otv=new Array();

while (i1<(n*n/n)){
    ++i1;
    if (S[k1]==T[i1]) {
        ++k1;
        if (k1==m){
            otv.push(i1-(m*m/m)+2);
            k1 = pre[k1-1];
        } }
    else {
        while(k1>0){
            k1 = pre[k1-1];
        }}
    }
var finish = new Date();
var diff = finish - start;
console.log(otv, ' Time of searching: ', diff);
//////////////////////////////////////////////////////////////////////////GUNS
var start=new Date();
let indexes = [];
let alphabet=[];
for (let i = 0; i < m; i++){
    alphabet[S.charAt(i)] = 0;
}
let delta = Array.from(Array(m + 1), () => []);
for (let i in alphabet) delta[0][i] = 0;
for (let i = 0; i < m; i++) {
    let prev = delta[i][S.charAt(i)];
    delta[i][S.charAt(i)] = i + 1;
    for (let j in alphabet) delta[i + 1][j] = delta[prev][j];
}

for (let i = 0, condition = 0; i < n; i++) {
    condition = delta[condition][T.charAt(i)];
    if (condition === undefined){
        condition = 0;
    }
    if (condition === m){
        indexes.push(i - m + 2);
    }
}

var finish = new Date();
var diff = finish - start;
console.log(indexes, ' Time of searching: ', diff);

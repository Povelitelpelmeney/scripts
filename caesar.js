const { maxHeaderSize } = require('http');
let readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.question('Введите текст: ', (answer) => {
rl.question('Введите ключ: ', (key) => {
let output = answer;
let count=0;
alphch=new Array();
ltrs1=new Array();
let h=0;
bolsh=new Array("А","Б","В","Г","Д","Е","Ж","З","И","Й","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я");
mal=new Array("а","б","в","г","д","е","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь","э","ю","я");
let str="";
for(i=0;i<output.length;i++){
    if(output[i]=="."||output[i]==" "||output[i]==","||output[i]==":"||output[i]=="'"||output[i]==";"){
        str+=output[i];
        continue;
    }
    else{
        let sch=key;
        while(sch>32){
            sch-=32;
        }
        if(bolsh.includes(output[i])){
            if((parseInt(sch)+parseInt(output[i].charCodeAt()-1040))>31){
            str+=bolsh[(sch-(bolsh.length-(output[i].charCodeAt()-1040)))];}
            else{
                str+=bolsh[(parseInt(sch)+parseInt(output[i].charCodeAt()-1040))];
            }

        }
        else{
            if((parseInt(sch)+parseInt(output[i].charCodeAt()-1072))>31){
                str+=mal[(sch-(mal.length-(output[i].charCodeAt()-1072)))];
            }
            else{
                str+=mal[(parseInt(sch)+parseInt(output[i].charCodeAt()-1072))];
            }
        }
        }
}   
console.log(str);
let fs=require("fs");
let File=fs.readFileSync("частоты.txt","utf8");
line=File.split("\n");
i=0
arr=new Array();
arr1=new Array();
while (line[i]!="///"){
    arr1[i] = line[i].split(' ');
    arr[arr1[i][0]]=arr1[i][1];
    i++;
}
rl.question('Введите закодированную фразу: ', (output1) => {
ltrs=new Array();
for(i=0;i<output1.length;i++){
    if(output1[i]=="."||output1[i]==" "||output1[i]==","||output1[i]==":"||output1[i]=="'"||output1[i]==";"||output1[i]=="-"){
        continue;
    }
    else{
        count+=1;
        if(bolsh.includes(output1[i])){
            let small=String.fromCharCode(output1[i].charCodeAt()+32);
            if (alphch[small]){
                alphch[small]++}
            else{
                alphch[small]=1;
                ltrs1[h]=small;
                h+=1;
            }
        }
        else{
            if (alphch[output1.charAt(i)]){
            alphch[output1.charAt(i)]++}
            else{
                alphch[output1.charAt(i)]=1;
                ltrs1[h]=output1[i];
                h+=1;
            }
            }
        }
} 

for(let i=0;i<ltrs1.length;i++){
    ltrs[ltrs1[i]]=alphch[ltrs1[i]]/count;
}
console.log(ltrs);
let razn=0;
let e=0;
let minrazn=1000000.00;
mass=new Array();
let otvet="";
for(let i=1;i<mal.length-1;i++){
    let summ=0;
    for(let u=0;u<output1.length;u++){
        if(output1[u]=="."||output1[u]==" "||output1[u]==","||output1[u]==":"||output1[u]=="'"||output1[u]==";"||output1[u]=="-"){
            continue;
        }
        else{
            if(bolsh.includes(output1[u])){
                let small=String.fromCharCode(output1[u].charCodeAt()+32);
                let kol=small.charCodeAt()+i;
                if(kol>1103){
                    kol-=32;
                }
                razn=Math.abs((arr[String.fromCharCode(kol)])-(ltrs[small]));
                summ+=razn;
            }
            else{
                let kol1=output1[u].charCodeAt()+i;
                if(kol1>1103){
                    kol1-=32;
                }
                razn=Math.abs((arr[String.fromCharCode(kol1)])-(ltrs[output1[u]]));
                summ+=razn;

            }
        }
    }
    if(summ<minrazn){
        minrazn=summ;
        mass.push(i);
    }
}

console.log(mass);
for(let u=mass.length-1;u>=0;u--){
    otvet="";
    for(let i=0;i<output1.length;i++){
        if(output1[i]=="."||output1[i]==" "||output1[i]==","||output1[i]==":"||output1[i]=="'"||output1[i]==";"||output1[i]=="-"){
            otvet+=output1[i];
            continue;
        }
        else{
        if(bolsh.includes(output1[i])){
            pos=output1[i].charCodeAt()+mass[u];
            if(pos>1071){
                pos-=32;
            }
            otvet+=String.fromCharCode(pos)
        }
        else{
            pos=output1[i].charCodeAt()+mass[u];
            if(pos>1103){
                pos-=32;
            }   
        otvet+=String.fromCharCode(pos)
        }
        }
    }
    console.log("Ваша возможная фраза: ",otvet);
}
});
});
}); 

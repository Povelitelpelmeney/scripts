const { maxHeaderSize } = require('http');
let readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
prompt: '>'
});
let fs=require("fs");
let File=fs.readFileSync("нок.txt","utf8");
line=File.split("\n");
mem=new Array();
let s="";
let i=0;
let count=0;
while (line[count]!="///"){
    strk=line[count].split(" ");
    for(let u=0;u<strk.length;u++){
        mem[i]=strk[u];
        mem[i]=mem[i].replace("\r","");
        i++;
    }
    count+=1;
}
console.log("Справка:\n Сравнение: equal число, число, позиция памяти\n Сложение: plus число, число, позиция памяти\n Вычитание: minus число, число, позиция памяти\n Умножение: mult число, число, позиция памяти");
console.log(" Деление: divide число, число, позиция памяти\n Присваивание: = позиция памяти, число\n Вывод строки: WriteLn строка\n Вывод числа: cout позиция памяти\n goto: goto, позиция");
console.log(" metka: metka, позиция метки\n ifgreat: if great, позиция проверки\n %: число позиция, число позиция, позиция");
//////////////////////////////////////////
for(let i=0;i<mem.length;i++)
console.log("В ячейке ",i," хранится ",mem[i]);
/////////////////////////////////////////
let sch=0;
while (mem[sch]!="exit"){
    switch(mem[sch]){
        case "cout":
            console.log(mem[mem[sch+1]]);
            sch+=2;
            break;
        case "WriteLn":
            let s=0;
            let str="";
            while(mem[sch+s]!='"'){
                s+=1;
                str+=(mem[sch+s]+" ");
            }
            str=str.replace('"',"");
            str=str.replace(str[0],"");
            console.log(str);
            sch+=(s+1);
            break;
        case 'cin':
            function f(){
                console.log("");
            }
            rl.prompt();
            rl.question("Enter the number: ", (answer) => {
            output=answer;
            mem[mem[sch+1]]=parseFloat(output);
            rl.close();})
            sch+=2;
            setTimeout(f,10000);
            break;
        case "equal":
            if(mem[sch+1]==mem[sch+2]){
                console.log("True");
                mem[mem[sch+3]]="True";
            }
            else{
                console.log("False");
                mem[mem[sch+3]]="False";
            }
            sch+=4;
            break;
        case "plus":
            console.log(parseInt(mem[mem[sch+1]])+parseInt(mem[mem[sch+2]]));
            mem[mem[sch+3]]=(parseInt(mem[mem[sch+1]])+parseInt(mem[mem[sch+2]]));
            sch+=4;
            break;
        case "minus":
            console.log(parseInt(mem[mem[sch+1]])-parseInt(mem[mem[sch+2]]));
            mem[mem[sch+3]]=(parseInt(mem[mem[sch+1]])-parseInt(mem[mem[sch+2]]));
            sch+=4;
            break;
        case "mult":
            console.log(parseInt(mem[mem[sch+1]])*parseInt(mem[mem[sch+2]]));
            mem[mem[sch+3]]=(parseInt(mem[mem[sch+1]])*parseInt(mem[mem[sch+2]]));
            sch+=4;
            break;
         case "goto":
            (sch)=sch-parseInt(mem[sch+1]);
            console.log(sch);
            break;
        case "metka":
            mem[mem[sch+1]]=sch;
            console.log(mem[mem[sch+1]]);
            sch+=2;
            break;
        case "ifgreat":
            result=parseInt(mem[mem[sch+1]]);
            if(result>0){
                sch+=parseInt(mem[sch+2]);
            }
            else{
                sch+=3;
            }
            break;
        case "divide":
            if(mem[mem[(sch+2)]]!="0"){
                console.log(parseInt(parseInt(mem[mem[sch+1]])/parseInt(mem[mem[sch+2]])));
                mem[mem[sch+3]]=(parseInt(parseInt(mem[mem[sch+1]])/parseInt(mem[mem[sch+2]])));
                sch+=4;
            }
            else{
                console.log("Error");
                sch+=4;
            }
            break;
        case "%":
            if(parseInt(mem[mem[sch+1]])>parseInt(mem[mem[sch+2]])||mem[mem[(sch+2)]]!="0"){
                mem[mem[sch+3]]=parseInt(mem[mem[sch+1]])%parseInt(mem[mem[sch+2]]);
                sch+=4;
            }
            else{
                console.log("Error");
                sch+=4;
            }
            break;
        case "=":
           mem[mem[sch+1]]=mem[sch+2];
           sch+=3;
           break;                                             
        case "maxx":
            let a=mem[mem[sch+1]];
            let b=mem[mem[sch+2]];
            mem[mem[sch+1]]=Math.max(a,b);
            mem[mem[sch+2]]=Math.min(a,b);
            sch+=3;

};}
console.log(mem);
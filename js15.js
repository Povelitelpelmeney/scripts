let readline = require('readline');
const { stripVTControlCharacters } = require('util');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.question('Введите текст: ', (answer) => {
let output = answer;
stack=new Array();
stroka=new Array();
operations=new Array("^","*","/","+","-","(",")");
function prior(x){
    if(x=="^"){
        return 4;
    }
    else if(x=="*"|| x=="/"){
        return 3;
    }
    else if(x=="+"||x=="-"){
        return 2;
    }
    else if(x=='('||x==')'){
        return 1;
    }
}
function chisl(x){
    if(operations.includes(x)){
        return 0;
    }
    else{
        return 1;
    }
}
///////////////////////////////////////////////////////////////////////////
let count=0;
let str="";
let e=0;
for(let i=0;i<output.length;i++){
    if(chisl(output[i])==1){
        e=i;
        while(chisl(output[e])==1&&e<output.length){
            str+=output[e];
            e+=1;
        }
    i+=str.length-1;
    stroka.push(str);
    str="";
    }
    else if(chisl(output[i])==0){
        if(stack.length==0){
            count+=1;
            stack.push(output[i]);
        }
        else{
            if(prior(output[i])!=1&&prior(stack[count-1])<prior(output[i])){
                stack.push(output[i]);
                count+=1;
            }
            else if(prior(output[i])!=1&&prior(stack[count-1])>=prior(output[i])){
                stroka.push(stack[count-1]);
                stack.pop()
                stack.push(output[i]);
            }
            else if(output[i]=='('){
                stack.push(output[i]);
                count+=1;
            }
            else if(output[i]==')'){
                stack.push(output[i]);
                count+=1;
                for(let u=count-1;u>=0;--u){
                    if(stack[u]==')'){
                        stack.pop(stack[u]);
                        count-=1;
                    }
                    else if(stack[u]=='('){
                        stack.pop(stack[u]);
                        count-=1;
                        break;
                    }
                    else{
                        stroka.push(stack[u]);
                        stack.pop(stack[u]);
                        count-=1;
                    }
                }
            }
        }
    }
    console.log(stack);
    console.log(count," ",i);
    console.log(stroka);
    console.log("---------------------------------")
}
for(let i=stack.length-1;i>=0;i--){
    stroka.push(stack[i]);
}
console.log(stroka);
stack2=new Array();
let summ;
let st1;
let st2;
for(let i=0;i<stroka.length;i++){
    if(chisl(stroka[i])==1){
        stack2.push(stroka[i]);
    }
    else{
        st1=Number(stack2[stack2.length-2]);
        st2=Number(stack2[stack2.length-1]);
        if(stroka[i]=="^"){
            summ=1;
            for(let u=0;u<st2;u++){
                summ*=st1;
            }
        }
        else if(stroka[i]=="*"){
            summ=st1*st2;
        }
        else if(stroka[i]=="/"){
            summ=st1/st2;
        }
        else if(stroka[i]=="+"){
            summ=st1+st2;
        }
        else if(stroka[i]=="-"){
            summ=st1-st2;
        }
        stack2.pop(stack2[stack2.length-1]);
        stack2.pop(stack2[stack2.length-2]);
        stack2.push(summ);
    }
    console.log(stack2);
}
//(6+10-4)/(1+1*2)+1
});

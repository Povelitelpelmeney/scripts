let readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.question('Введите текст: ', (answer) => {

    /////////////////////////////////////
    function logg(x,y){
        return Math.log(y)/Math.log(x);
    }
    //////////////////////////////////////
    function isInteger(num){
        return(num^0)==num;
    }
    ///////////////////////////////////////
    function bin(num,n){
        e=(num>>>0).toString(2);
        while(e.length<n){
            e="0"+e;
        }
        return e;
    }
    ///////////////////////////////////////
    let output = answer;
    alphch=new Array();
    codes=new Array();
    for(i=0;i<output.length;i++)
    if (alphch[output.charAt(i)])
        alphch[output.charAt(i)]++
    else
        alphch[output.charAt(i)]=1
    let count=0;
    for(a in alphch){
        if(isNaN(alphch[a])) break;
        else count+=1;
    }
    let n=Math.trunc(logg(2,count));
    if(isInteger(logg(2,count))==0){
        n++;
    }
    let sch=0;
    for(let i=0;i<output.length;i++){
        if (codes[output.charAt(i)]){
        continue;
        }
    else
        codes[output.charAt(i)]=bin(sch,n);
        sch++;
    }
    ////////////////////////////////////////////
    str=""
    for(let i=0;i<output.length;i++){
        str+=(codes[output.charAt(i)]);
    }
    console.log(codes);
    console.log(str);
    
    ////////////////////////////////////////////
    rl.question('Введите код: ', (answer1) => {
        rl.close();
        let output1 = answer1;
        output1.toString();
        str1="";
        let outp="";
        for(let i=0;i<output1.length;i++){
            str1+=output1[i];
            if(str1.length==n){
                for(let chr in codes){
                    if(str1==codes[chr]){
                        outp+=chr;
                        str1="";
                    }
                }
            }
        }
        console.log(outp);
    });
});

function dec2bin(dec){
  return(dec>>>0).toString(2);
}
function log(x,y){
  return Math.ceil(Math.log(y)/Math.log(x));
}
let letrs="var";
coded="";
for(let i=0;i<letrs.length;i++){
  let s=dec2bin(letrs[i].charCodeAt());
  while(s.length<8){
    s="0"+s;
  }
  coded+=s;
}
let arr=new Array;
let sch=0;
let len=coded.length+(log(2,coded.length));
for(let i=1;i<len+1;i++){
  if(Math.pow(2,sch)==i){
    arr[i-1]="0";
    sch+=1;
  }
  else{
    arr[i-1]=coded[i-1-sch];
  }
}
for(let i=0;i<len;i++){
  let el=arr[i];
  arr[i]=new Array();
  arr[i][0]=el;
  let bin=dec2bin(i+1);
  while(bin.length<log(2,coded.length)){
    bin="0"+bin;
  }
  for(let j=1;j<=log(2,coded.length);j++){
    arr[i][j]=bin[j-1];
  }
}
let sch1=0;
for(let i=0;i<log(2,coded.length);i++){
  let summ=0;
  for(let j=0;j<len;j++){
    summ+=arr[j][0]*arr[j][log(2,coded.length)-i];
  }
  let kl=summ%2;
  arr[Math.pow(2,sch1)-1][0]=String(kl);
  sch1+=1;
  str="";
  for(let i=0;i<len;i++){
    if(i==5){//////////////////////////////////////////
      str+="0";
    }
    else
    str+=arr[i][0];
}
}
console.log("11001111011001110000101110010");
console.log(str);
let kod="";
for(let i=0;i<log(2,coded.length);i++){
  let s=0;
  for(let j=0;j<len;j++){
    s+=str[j]*arr[j][log(2,coded.length)-i];
  }
  kod=String(s%2)+kod;
}

console.log(parseInt(kod,2));
let otvv="";
for(let j=0;j<len;j++){
  if(j==(parseInt(kod,2)-1)){
    if(str[(parseInt(kod,2)-1)]=="0"){
      otvv+="1"
    }
    else{
      otvv+="0";
    }
  }
  else{
    otvv+=str[j];
  }
}
console.log(otvv);
let otvv2="";
let otvv3="";
sch=0;
for(let i=1;i<(len+1);i++){
  if(Math.pow(2,sch)==i){
    sch+=1;
  }
  else{
    otvv2+=otvv[i-1];
  }
}
console.log(otvv2)
for(let i=1;i<=3;i++){
  let prom="";
  for(let j=(otvv2.length/3*(i-1));j<(otvv2.length/3*i);j++){
    prom+=otvv2[j];
  }
  otvv3+=(String.fromCharCode((parseInt(prom,2))));
}
console.log(otvv3);
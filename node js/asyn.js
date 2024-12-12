let a=0;
let b=10;

const lateData=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(40);
    },2000)
})

lateData.then((data)=>{
    console.log(data+b);

})
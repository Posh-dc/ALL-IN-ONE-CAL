
window.addEventListener("load", ()=> document.querySelector(".main").classList.add("animate"));

myDialog = document.querySelector("#dialog");
inptNum = document.querySelectorAll(".inpt");

for ( let i=0; i < inptNum.length; i++){
     inptNum[i].addEventListener("click",  () => { myDialog.showModal();
     document.getElementById("x1").setAttribute("value", "");
     document.getElementById("x2").setAttribute("value", "");
     });
}

window.addEventListener('message', getResult)

function getResult (event){
    if (event.data) { 
       document.activeElement.setAttribute("value", event.data);
         }
}

// ////// getting parameter for calculation   /////


document.querySelector(".btn").addEventListener("click", calculating);

 function calculating (){
     let dataA = document.getElementById("a").getAttribute("value");
     let dataB = document.getElementById("b").getAttribute("value");
     let dataC = document.getElementById("c").getAttribute("value");

     let result1 = (((-1*(dataB))+(Math.sqrt((Math.pow(dataB,2)-(4*dataA*dataC)))))/(2*dataA));
     let result2 = (((-1*(dataB))-(Math.sqrt((Math.pow(dataB,2)-(4*dataA*dataC)))))/(2*dataA));

      result1 = !isNaN(result1) ?  result1 : "i";
       result2 = !isNaN(result2) ?  result2 : "i";
       document.getElementById("x1").setAttribute("value", result1);
      document.getElementById("x2").setAttribute("value", result2); 
     
 } 

 document.querySelector(".clr").addEventListener("click", () => {
     for (i=0; i < inptNum.length; i++){
     inptNum[i].setAttribute("value", "");
     document.getElementById("x1").setAttribute("value", "");
     document.getElementById("x2").setAttribute("value", "");
          }
 })
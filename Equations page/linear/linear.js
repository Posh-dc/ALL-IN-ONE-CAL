
window.addEventListener("load", ()=> document.querySelector(".main").classList.add("animate"));

myDialog = document.querySelector("#dialog");
inptNum = document.querySelectorAll(".inpt");

for ( let i=0; i < inptNum.length; i++){
     inptNum[i].addEventListener("click",  () => { myDialog.showModal();
     document.getElementById("r").setAttribute("value", "");
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

     let result = (((dataC)-(dataB))/(dataA));
      result= !isNaN(result) ?  result : "";
      document.getElementById("r").setAttribute("value", result); 
     
 } 

 document.querySelector(".clr").addEventListener("click", () => {
     for (i=0; i < inptNum.length; i++){
     inptNum[i].setAttribute("value", "");
     document.getElementById("r").setAttribute("value", "");
          }
 })
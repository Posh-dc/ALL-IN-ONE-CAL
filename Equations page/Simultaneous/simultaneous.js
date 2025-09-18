
window.addEventListener("load", ()=> document.querySelector(".main").classList.add("animate"));

myDialog = document.querySelector("#dialog");
inptNum = document.querySelectorAll(".inpt");

for ( let i=0; i < inptNum.length; i++){
     inptNum[i].addEventListener("click",  () => { myDialog.style.display ="block";
     document.getElementById("x").setAttribute("value", "");
     document.getElementById("y").setAttribute("value", "");
     });
}

window.addEventListener('message', getResult)

function getResult (event){
    if (event.data) { 
       document.activeElement.setAttribute("value", event.data);
       myDialog.style.display ="none";
         }
}



// ////// getting parameter for calculation   /////


document.querySelector(".btn").addEventListener("click", calculating);

 function calculating (){
     let a1 = document.getElementById("a1").getAttribute("value");
     let b1 = document.getElementById("b1").getAttribute("value");
     let c1 = document.getElementById("c1").getAttribute("value");

     let a2 = document.getElementById("a2").getAttribute("value");
     let b2 = document.getElementById("b2").getAttribute("value");
     let c2 = document.getElementById("c2").getAttribute("value");

     
     let resultY = (((c2*a1)-(c1*a2))/((a1*b2)-(b1*a2)));
      let resultX = ((c1-(b1*resultY))/(a1));

      resultX = !isNaN(resultX) ?  resultX : "i";
       resultY = !isNaN(resultY) ?  resultY : "i";
       document.getElementById("x").setAttribute("value", resultX);
      document.getElementById("y").setAttribute("value", resultY); 
     
 } 

 document.querySelector(".clr").addEventListener("click", () => {
     for ( let i=0; i < inptNum.length; i++){
     inptNum[i].setAttribute("value", "");
     document.getElementById("x").setAttribute("value", "");
     document.getElementById("y").setAttribute("value", "");
          }
 })

window.addEventListener("load", ()=> document.querySelector(".main").classList.add("animate"));

myDialog = document.querySelector("#dialog");
inptNum = document.querySelectorAll(".inpt");
activeInput = null;

for ( let i=0; i < inptNum.length; i++){
     inptNum[i].addEventListener("click",  function() { myDialog.style.display ="block";
          activeInput = this;
          document.getElementById("prevent").style.display ="block"
     document.getElementById("x").setAttribute("value", "");
     document.getElementById("y").setAttribute("value", "");
     document.getElementById("z").setAttribute("value", "");
     });
}

window.addEventListener('message', getResult)

function getResult (event){
    if (event.data) { 
       activeInput.setAttribute("value", event.data);
         }
}

// ////// getting parameter for calculation   /////


document.querySelector(".btn").addEventListener("click", calculating);

 function calculating (){
     let a1 = document.getElementById("a1").getAttribute("value");
     let b1 = document.getElementById("b1").getAttribute("value");
     let c1 = document.getElementById("c1").getAttribute("value");
     let d1 = document.getElementById("d1").getAttribute("value");

     let a2 = document.getElementById("a2").getAttribute("value");
     let b2 = document.getElementById("b2").getAttribute("value");
     let c2 = document.getElementById("c2").getAttribute("value");
     let d2 = document.getElementById("d2").getAttribute("value");

     let a3 = document.getElementById("a3").getAttribute("value");
     let b3 = document.getElementById("b3").getAttribute("value");
     let c3 = document.getElementById("c3").getAttribute("value");
     let d3 = document.getElementById("d3").getAttribute("value");

     let resultZ = ((((a2*d1)-(a1*d2))*((a3*b1)-(a1*b3))-((a3*d1)-(a1*d3))*((a2*b1)-(a1*b2)))/(((a2*c1)-(a1*c2))*((a3*b1)-(a1*b3))-((a3*c1)-(a1*c3))*((a2*b1)-(a1*b2))))
     let resultY = ((((a2*d1)-(a1*d2))-((a2*c1)-(a1*c2))*resultZ)/((a2*b1)-(a1*b2)));
      let resultX = ((d1-(b1*resultY)-(c1*resultZ))/(a1));

      resultX = !isNaN(resultX) ?  resultX : "i";
       resultY = !isNaN(resultY) ?  resultY : "i";
       resultZ = !isNaN(resultZ) ?  resultZ : "i";
       document.getElementById("x").setAttribute("value", resultX);
      document.getElementById("y").setAttribute("value", resultY); 
      document.getElementById("z").setAttribute("value", resultZ); 
     
 } 

 document.querySelector(".clr").addEventListener("click", () => {
     for ( let i=0; i < inptNum.length; i++){
     inptNum[i].setAttribute("value", "");
     document.getElementById("x").setAttribute("value", "");
     document.getElementById("y").setAttribute("value", "");
     document.getElementById("z").setAttribute("value", "");
          }
 })
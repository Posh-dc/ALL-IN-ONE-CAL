
window.addEventListener("load", ()=> document.querySelector(".main").classList.add("animate"));

myDialog = document.querySelector("#dialog");
inptNum = document.querySelectorAll(".inpt");

for (i=0; i < inptNum.length; i++){
     inptNum[i].addEventListener("click",  () => myDialog.showModal());
}

window.addEventListener('message', getResult)

function getResult (event){
    if (event.data) { 
       document.activeElement.value =event.data
         }
}
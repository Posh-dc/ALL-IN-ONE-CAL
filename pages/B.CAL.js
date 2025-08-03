let inputData = "";
let visualInputData = "";
let inputResult = "";

 let buttonNumber = document.querySelectorAll(".show").length; /*looping through all the button to set the value of the input*/
for (let i=0; i<buttonNumber; i++) {
   document.querySelectorAll(".show")[i].addEventListener("click", parametersCal);
}

// looping through all the special/functional buttons 
let notShowButtonNumber = document.querySelectorAll(".notShow").length;
for (let i=0; i<notShowButtonNumber; i++){
    document.querySelectorAll(".notShow")[i].addEventListener("click", functionalCal);
}

function functionalCal(){  
    if(this.classList.contains("clear")){   /*clear everything when  a clear button is pressed*/
           inputData = ""; 
           visualInputData = "";
           inputResult = "";
           document.querySelector(".firstInput").setAttribute("value", visualInputData);
           document.querySelector(".secondInput").setAttribute("value", inputResult);
    }
    if (this.classList.contains("del")){   /*deleling last inputs every time delete button is pressed*/
        let deletVisualInputData = visualInputData.slice(0, visualInputData.length -1);
        visualInputData = deletVisualInputData;
        document.querySelector(".firstInput").setAttribute("value", visualInputData);
        let deletInputData = inputData.slice(0, inputData.length-1);
        inputData = deletInputData;
        inputResult= expressionEvaluation(inputData);
        document.querySelector(".secondInput").setAttribute("value", inputResult);
    }
    if (this.classList.contains("equal") && inputResult !== ""){   /*when equal button is pressed*/
            inputData = "0"+ inputResult.toString();
             visualInputData = inputResult.toString();
            inputResult = "";
            document.querySelector(".firstInput").setAttribute("value", visualInputData);
            document.querySelector(".secondInput").setAttribute("value", inputResult);
    }
}

function parametersCal () {  /*funtion that update the input value base on button clicked*/
    let containOperatorAsFirst = ['/','*','+'];
if ((visualInputData ==="" && containOperatorAsFirst.includes(this.getAttribute("value")))
             || (visualInputData==="-" && containOperatorAsFirst.includes(this.getAttribute("value")))){
            // Avoiding or preventing  leading operator except minus
             visualInputData = "";
             inputData = "";
              document.querySelector(".firstInput").setAttribute("value", visualInputData);
              document.querySelector(".secondInput").setAttribute("value", inputResult);
             return;
      }
             let containOperator = ['÷','x','-','+','.'];
      if (containOperator.includes(visualInputData.at(-1))&&(this.classList.contains("operator"))){
        // Preventing stacking up operators ///////
         visualInputData = visualInputData.slice(0, -1) + this.innerHTML;
            document.querySelector(".firstInput").setAttribute("value", visualInputData);
         inputData = inputData.slice(0,-1) + this.getAttribute("value");
         document.querySelector(".secondInput").setAttribute("value", inputResult);
            return;
      }
       
      if (visualInputData === "" && this.innerHTML ==="-"){
        // The way i want a leading minus tp be handled 
            visualInputData = "-";
             inputData = "0"+ this.getAttribute("value") ;
              document.querySelector(".firstInput").setAttribute("value", visualInputData);
             return;
      } 
       
        if ((visualInputData ==="" ||visualInputData === "0") && this.innerHTML ==="."){
            // The way i want leading 0. to be handeled 
            visualInputData = "0.";
             document.querySelector(".firstInput").setAttribute("value", visualInputData);
      } else if (visualInputData === "0" && this.classList.contains("operator")){
             visualInputData ="0" +this.innerHTML;
             inputData = "0"+ this.getAttribute("value");
             document.querySelector(".firstInput").setAttribute("value", visualInputData);
              document.querySelector(".secondInput").setAttribute("value", inputResult);
              return;
     } else if (visualInputData === "0"){
        // Prevent stacking up leading zeros
            visualInputData = this.innerHTML;
           document.querySelector(".firstInput").setAttribute("value", visualInputData);
     }  else {
            visualInputData += this.innerHTML;
             document.querySelector(".firstInput").setAttribute("value", visualInputData);
      } 
       
      inputData += this.getAttribute("value");
       if(this.classList.contains("num")){
                inputResult = expressionEvaluation(inputData);
              document.querySelector(".secondInput").setAttribute("value", inputResult);
         }
 } 
    //  expression evaluation base on BODMAS
    function expressionEvaluation (exp) {
         let cal = exp.match(/\d+\.?\d*|[%+*/-]/g);
         let result="";
         for (let i=0; i<cal.length; i++){ /*working on percentage first*/
               if(cal[i]==="%"){
                /*converting data to number*/
                 let firstDataNumber = parseFloat(cal[i-1]);
                      if ((cal[i+1]==="*" || cal[i+1]==="/" )){
                           result= (firstDataNumber/100);
                          cal.splice(i-1, 2, result.toString());
                               i=0;
                      }
                      else if(cal[i-2]==="+" || cal[i-2]==="-"){
                               let operator = cal[i-2];
                                let base = parseFloat(cal[i-3]);
                               let percentValue = base * firstDataNumber / 100;

                                 if(operator === "+"){
                                    result = base + percentValue;
                                    } else {
                                      result = base - percentValue;
                                    }

                              // Replace: base, operator, percentNumber, "%" with result
                         cal.splice(i-3, 4, result.toString());
                             i=0;
                      }
                      else{
                        result= (firstDataNumber/100);
                          cal.splice(i-1, 2, result.toString());
                               i=0;
                      }
           }
         }
        for (let i=0; i<cal.length; i++){
            if(cal[i]==="*" || cal[i]==="/"){    /* then working on multiplication and division */
                /*converting data to number*/
                 let firstDataNumber = parseFloat(cal[i-1]);
                 let secondDataNumber = parseFloat(cal[i+1]);
                result= calculating(firstDataNumber,cal[i],secondDataNumber);
                cal.splice(i-1, 3, result.toString());
                i=0;
            } 
        }
        for (let i=0; i<cal.length; i++){ /* then working on addision and subtraction*/
            
             if  (cal[i]==="+" || cal[i]==="-"){
                /*converting data to number*/
                 let firstDataNumber = parseFloat(cal[i-1]);
                 let secondDataNumber = parseFloat(cal[i+1]);
                 result= calculating(firstDataNumber, cal[i],secondDataNumber);
                cal.splice(i-1, 3, result.toString());
                i=0;
            }
         }
         return result;
    }

// calculating function
function calculating (a, b, c) {
    switch (b) {
            case  "+" : 
                return a+c;
            break;
            case  "/" : 
                return a/c;
            break;
            case  "-" :
                return a-c;
            break;
            case  "*" :
                return a*c;
            break;
            default :
            return "no value found"
    }
}
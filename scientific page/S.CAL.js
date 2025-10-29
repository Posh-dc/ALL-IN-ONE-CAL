let inputData = "";
let visualInputData = "";
let inputResult = "";
let change = "DEG";

window.addEventListener("load", ()=> document.querySelector(".main").classList.add("animate"));

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

if(this.classList.contains("change")){ /* cnanging fron RAD to DEG */
  this.innerHTML= (this.innerHTML==="RAD")? "DEG" :"RAD";
  change =this.innerHTML;
  inputResult= expressionEvaluation(inputData);
   document.querySelector(".secondInput").setAttribute("value", inputResult);

}

    if(this.classList.contains("clear")){   /*clear everything when  a clear button is pressed*/
           inputData = ""; 
           visualInputData = "";
           inputResult = "";
           document.querySelector(".firstInput").setAttribute("value", visualInputData);
           document.querySelector(".secondInput").setAttribute("value", inputResult);
    }
    if (this.classList.contains("del")){   /*deleling last inputs every time delete button is pressed*/
        
           
           /* deleting PI and exponential(e) related conditions */
        if ((visualInputData.at(-1)==="e" && inputData.at(-1)==="3") 
          || (visualInputData.at(-1)==="π" && inputData.at(-1)==="5" )){
                    //  before pi or e
                 let deletVisualInputData =(visualInputData.at(-2)==="x")?visualInputData.slice(0, visualInputData.length -2):
                  visualInputData.slice(0, visualInputData.length -1);
        visualInputData = deletVisualInputData;
        document.querySelector(".firstInput").setAttribute("value", visualInputData); 
       let deletInputData= (inputData.at(-11)==="*")?inputData.slice(0, inputData.length-11): inputData.slice(0, inputData.length-10);
        inputData = deletInputData;
        inputResult= expressionEvaluation(inputData);
        document.querySelector(".secondInput").setAttribute("value", inputResult);
            return;
          }
          if ((visualInputData.at(-1)==="e" && inputData.at(-1)==="*") 
          || (visualInputData.at(-1)==="π" && inputData.at(-1)==="*" )){
                    //  after  pi or e
                 let deletVisualInputData = visualInputData.slice(0, visualInputData.length -1);
        visualInputData = deletVisualInputData;
        document.querySelector(".firstInput").setAttribute("value", visualInputData); 
       let deletInputData=(inputData.at(-12)==="*")?inputData.slice(0, inputData.length-12):inputData.slice(0, inputData.length-11);
        inputData = deletInputData;
        inputResult= expressionEvaluation(inputData);
        document.querySelector(".secondInput").setAttribute("value", inputResult);
            return;
          }
          /* deleting PI and exponential(e) related conditions  ends here*/
          
           /* deleting sin cos tan log etc related conditions */
                let scienDelete =["*sin(","*cos(","*tan(","*log(","ln(0+","*ln(","sin(","cos(","tan(","log(","ln(","⁻¹("];

                for(let i=0; i<scienDelete.length; i++){
                  if (inputData.endsWith(scienDelete[i]) || visualInputData.endsWith(scienDelete[i])){
                  let  deletVisualInputData;
                     let deletInputData;
                         switch (scienDelete[i]) {
                          case "ln(0+" :
                                deletVisualInputData =(visualInputData.at(-4)==="x")?visualInputData.slice(0, visualInputData.length -4):
                                 visualInputData.slice(0, visualInputData.length-3);
                             deletInputData =(inputData.at(-6)==="*")?inputData.slice(0, inputData.length -6):inputData.slice(0, inputData.length -5);
                            break;
                            case "⁻¹(" :
                              if (visualInputData.endsWith("⁻¹(")&& inputData.endsWith("0+")){
                              deletInputData =(inputData.at(-9)==="*")?inputData.slice(0, inputData.length -9): inputData.slice(0, inputData.length-8);
                              }else{    
                              deletInputData =(inputData.at(-7)==="*")?inputData.slice(0, inputData.length -7): inputData.slice(0, inputData.length-6);
                              }
                              deletVisualInputData =(visualInputData.at(-7)==="x")?visualInputData.slice(0, visualInputData.length -7):
                                    visualInputData.slice(0, visualInputData.length-6);
                              break;
                        default :
                               if (visualInputData.endsWith(scienDelete[i]) && inputData.endsWith("0+")){
                                deletVisualInputData =(visualInputData.at(-5)==="x")?visualInputData.slice(0, visualInputData.length -5):
                                 visualInputData.slice(0, visualInputData.length -scienDelete[i].length);
                             deletInputData =(inputData.at(-7)==="*")?inputData.slice(0, inputData.length -7):inputData.slice(0, inputData.length -6);
                            }
                          else  if (inputData.at(-5)==="*"){
                     deletVisualInputData=(visualInputData.at(-5)==="x")?visualInputData.slice(0, visualInputData.length -5):
                               visualInputData.slice(0, visualInputData.length -4);
                         deletInputData = inputData.slice(0, inputData.length-5);
                            }else{
                             deletVisualInputData =(visualInputData.endsWith("ln(") && visualInputData.at(-4) !=="x" )? visualInputData.slice(0, visualInputData.length -3):
                              visualInputData.slice(0, visualInputData.length -4);
                             deletInputData = inputData.slice(0, inputData.length-4);
                            }
                            
                         }     
        visualInputData = deletVisualInputData;
        document.querySelector(".firstInput").setAttribute("value", visualInputData);
        inputData = deletInputData;
        inputResult= expressionEvaluation(inputData);
        document.querySelector(".secondInput").setAttribute("value", inputResult);
            return;
                  }
                }
           /* deleting sin cos tan log etc related conditions ends here */

          //  /* deleting bracket related conditions */   and square root 

           if (visualInputData.at(-1)==="√" && inputData.at(-2)==="*" && visualInputData.at(-2)!=="x"){
            let deletVisualInputData = visualInputData.slice(0, visualInputData.length -1);
        visualInputData = deletVisualInputData;
        document.querySelector(".firstInput").setAttribute("value", visualInputData);
        let deletInputData = inputData.slice(0, inputData.length-2);
        inputData = deletInputData;
        inputResult= expressionEvaluation(inputData);
        document.querySelector(".secondInput").setAttribute("value", inputResult);
            return
           }
        if ((visualInputData.at(-1)===")" && inputData.at(-1)==="*") || 
        (visualInputData.at(-1)==="(" && inputData.at(-2)==="*" && visualInputData.at(-2)!=="x" )){
                 let deletVisualInputData = visualInputData.slice(0, visualInputData.length -1);
        visualInputData = deletVisualInputData;
        document.querySelector(".firstInput").setAttribute("value", visualInputData);
        let deletInputData = inputData.slice(0, inputData.length-2);
        inputData = deletInputData;
        inputResult= expressionEvaluation(inputData);
        document.querySelector(".secondInput").setAttribute("value", inputResult);
            return
          }
           if (visualInputData.at(-1)==="(" && inputData.at(-1)==="+"){
            let deletVisualInputData =(visualInputData.at(-2)==="x")?visualInputData.slice(0, visualInputData.length-2): visualInputData.slice(0, visualInputData.length -1);
        visualInputData = deletVisualInputData;
        document.querySelector(".firstInput").setAttribute("value", visualInputData);
        let deletInputData =(inputData.at(-4)==="*")?inputData.slice(0, inputData.length-4): inputData.slice(0, inputData.length-3);
        inputData = deletInputData;
        inputResult= expressionEvaluation(inputData);
        document.querySelector(".secondInput").setAttribute("value", inputResult);
            return;
          }
          if (visualInputData.at(-1)==="-" && inputData.at(-1)==="-" && visualInputData.at(-2)==="(" && inputData.at(-2)==="0"){
                let deletVisualInputData = visualInputData.slice(0, visualInputData.length -1);
        visualInputData = deletVisualInputData;
        document.querySelector(".firstInput").setAttribute("value", visualInputData);
        let deletInputData = inputData.slice(0, inputData.length-2);
        inputData = deletInputData;
        inputResult= expressionEvaluation(inputData);
        document.querySelector(".secondInput").setAttribute("value", inputResult);
            return;
          }
           /* deleting bracket related conditions ends here */

        let deletVisualInputData = visualInputData.slice(0, visualInputData.length -1);
        visualInputData = deletVisualInputData;
        document.querySelector(".firstInput").setAttribute("value", visualInputData);
        let deletInputData = inputData.slice(0, inputData.length-1);
        inputData = deletInputData;
        inputResult= expressionEvaluation(inputData);
        document.querySelector(".secondInput").setAttribute("value", inputResult);
    }

 if (this.classList.contains("equal") && inputResult !== "" && inputResult !=="Bad expression"){ /*when equal button is pressed*/
    /*when equal button is pressed*/
            inputData = "0"+ inputResult.toString();
             visualInputData = inputResult.toString();
            inputResult = "";
            document.querySelector(".firstInput").setAttribute("value", visualInputData);
            document.querySelector(".secondInput").setAttribute("value", inputResult);
// ///// adding Animation to the equal button   //////
      document.querySelector(".equal").classList.add("active");
      setTimeout(()=>{
        document.querySelector(".equal").classList.remove("active");
      }, 1000);
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

if (inputData.at(-1)==="(" && (this.innerHTML ==="-" )){ 
  inputData += "0" ;       /*setting 0 after bracket open for effective calculation */
}else if ((inputData.at(-1)==="(" || inputData.endsWith("(0+") || inputData.endsWith("(0-"))
  && (this.innerHTML ==="x" || this.innerHTML ==="÷" || this.innerHTML ==="+")){
  return;
}else if (inputData.at(-1)==="("){
   inputData += "0+"
}
             let containOperator = ['÷','x','-','+','.',"*"];
      if (containOperator.includes(visualInputData.at(-1))&&(this.classList.contains("operator"))){
        // Preventing stacking up operators ///////
         visualInputData = visualInputData.slice(0, -1) + this.innerHTML;
            document.querySelector(".firstInput").setAttribute("value", visualInputData);
         inputData = inputData.slice(0,-1) + this.getAttribute("value");
         document.querySelector(".secondInput").setAttribute("value", inputResult);
            return;
      }else if (containOperator.includes(inputData.at(-1)) &&(this.classList.contains("operator"))){
   visualInputData += this.innerHTML;
            document.querySelector(".firstInput").setAttribute("value", visualInputData);
          inputData = inputData.slice(0,-1) + this.getAttribute("value");
         document.querySelector(".secondInput").setAttribute("value", inputResult);
            return;
}
if (this.innerHTML === ".") {
    let parts = visualInputData.split(/[\+\-÷x]/);
    let lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) return;
 }
       
      if (visualInputData === "" && this.innerHTML ==="-"){
        // The way i want a leading minus to be handled 
            visualInputData = "-";
             inputData = "0"+ this.getAttribute("value") ;
              document.querySelector(".firstInput").setAttribute("value", visualInputData);
             return;
      } 

// working with calculations like 5sin(563) i.e scietific buttons immediately after number  ///
let numbers = ["1","2","3","4","5","6","7","8","9","0"];
if (numbers.includes(visualInputData.at(-1)) && this.classList.contains("numb")){
  visualInputData += (this.classList.contains("numbpro"))?  this.innerHTML : this.getAttribute("value");
 
 document.querySelector(".firstInput").setAttribute("value", visualInputData);
  inputData = inputData + "*" + this.getAttribute("value");
 inputResult = expressionEvaluation(inputData);
              document.querySelector(".secondInput").setAttribute("value", inputResult);
             return;
} else if ((inputData.at(-1)===")" ||visualInputData.at(-1)==="π" ||visualInputData.at(-1)==="e")
  && (numbers.includes(this.innerHTML)&& inputData.at(-1)!=="*")){
  visualInputData += this.innerHTML;
  document.querySelector(".firstInput").setAttribute("value", visualInputData);
  inputData = inputData + "*" + this.getAttribute("value");
 inputResult = expressionEvaluation(inputData);
   document.querySelector(".secondInput").setAttribute("value", inputResult);
             return;
}
//  End  of // working with calculations like 5sin(563) i.e scietific buttins immediately after number

if (this.innerHTML ==="x!"){
        // working on single digit factorial  
            visualInputData = visualInputData + this.getAttribute("value");
             inputData = "0" + "+" + inputData + this.getAttribute("value") ;
              document.querySelector(".firstInput").setAttribute("value", visualInputData);
              inputResult = expressionEvaluation(inputData);
              document.querySelector(".secondInput").setAttribute("value", inputResult);
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
     }  else if (this.classList.contains("stf")){
        /////// showing the scietinfic buttons in the visual dispaly input
            visualInputData += this.getAttribute("value");
             document.querySelector(".firstInput").setAttribute("value", visualInputData);
     }else if (visualInputData === "0"){
        // Prevent stacking up leading zeros
            visualInputData = this.innerHTML;
           document.querySelector(".firstInput").setAttribute("value", visualInputData);
     } else {
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
        let cal = exp.match(/sin⁻¹|cos⁻¹|tan⁻¹|sin|\^|√|cos|tan|log|ln|!|\d+\.\d+|\d+|[%+*/()-]/g);
         let result="";

          for (let i = 0; i < cal.length; i++) { /*  ///     working on bracket   */
  if (cal[i] === "(") {
    let j = i + 1;
    let bracketCount = 1;

    // Find matching closing parenthesis
    while (j < cal.length && bracketCount > 0) {
      if (cal[j] === "(") bracketCount++;
      else if (cal[j] === ")") bracketCount--;
      j++;
    }

    // If i didn’t find a matching closing parenthesis
    // just evaluate everything after "(" up to current end
    if (bracketCount !== 0) {
      let  accumulateBracketParameter= cal.slice(i + 1,);
              let accumulateBracketParameterResult = expressionEvaluation(accumulateBracketParameter.join(""));
              result= accumulateBracketParameterResult;
                cal.splice(i, cal.length, result.toString())
                i=0;
                    
    } else {
      // Properly closed bracket → normal evaluation
      let inside = cal.slice(i + 1, j - 1).join("");
      let innerResult = expressionEvaluation(inside);
      cal.splice(i, j - i, innerResult.toString());
      i = 0;
      
    }
  }
}

for (let i=0; i<cal.length; i++){
            if(cal[i]==="^"){    /*  working on raise to power */
                /*converting data to number*/
                  let firstDataNumber = parseFloat(cal[i-1]);
                 let secondDataNumber = parseFloat(cal[i+1]);
                result= calculating(firstDataNumber,cal[i],secondDataNumber);

                cal.splice(i-1, 3, result.toString());
                i=0;
            } 
        }

for (let i=0; i<cal.length; i++){
            if(cal[i]==="√"){    /*  working on raise to power */
                /*converting data to number*/
//                   let firstDataNumber = parseFloat(cal[i-1]);
                 let secondDataNumber = parseFloat(cal[i+1]);
                result= Math.sqrt(secondDataNumber);

                cal.splice(i, 2, result.toString());
                i=0;
            } 
        }

         for (let i=0; i<cal.length; i++){ /*working on percentage first*/
               if(cal[i]==="%"){
                /*converting data to number*/
                 let firstDataNumber = parseFloat(cal[i-1]);
                 if (((cal[i-2])=== "+" || (cal[i-2]) === "-") && ((cal[i+1])=== "/" || (cal[i+1]) === "*")){
                         result =(firstDataNumber/100);
                         cal.splice(i-1, 2, result.toString());
                         i=0;
                 } 
                 else if (((cal[i-2])=== "+" || (cal[i-2]) === "-")){
                        let accumulateParameter =cal.slice(0,i-2); 
                        if (accumulateParameter.length > 1){
                          let  accumulatedResult= expressionEvaluation(accumulateParameter.join(""));
                             result =(accumulatedResult*firstDataNumber/100);
                         cal.splice(i-1, 2, result.toString());
                         i=0;
                        }
                        else if (visualInputData.at(0)==="-" && accumulateParameter.length < 3){
                          result =(firstDataNumber/100);
                         cal.splice(i-1, 2, result.toString());
                         i=0;
                        }
                        else {
                             result =(parseFloat(cal[i-3])*firstDataNumber/100);
                         cal.splice(i-1, 2, result.toString());
                         i=0;
                        }
                 }
                 else { 
                    result =(firstDataNumber/100);
                    cal.splice(i-1, 2, result.toString()); 
                    i=0;
                 } 
            } 
        }

//      working on  scientific button button when clicked       //////////////
               
             let scientificButtons= [];
                for(let s=0; s<document.querySelectorAll(".stf").length; s++){
                  scientificButtons.push(document.querySelectorAll(".stf")[s].innerHTML);
                   } 

            for (let i=0; i<cal.length; i++){  

              // --- Handle factorial separately ---

    if (cal[i] === "!") {
        let n = parseInt(cal[i-1]);
        function factorial(x) {
            if (x === 0 || x === 1) return 1;
            return x * factorial(x - 1);
        }
        let result = factorial(n);
        cal.splice(i-1, 2, result.toString()); 
        i = 0;
       
    }
               if(scientificButtons.includes(cal[i])){    /* then working on scientific butttons like sine */
                /*converting data to number*/
                  let firstDataNumber = parseFloat(cal[i-1]);
             let secondDataNumber =(change ==="DEG")? parseFloat(cal[i+1])*(Math.PI/180):parseFloat(cal[i+1]);
               
               
                switch (cal[i]){
                  case "sin⁻¹" : 
                     result= Math.asin(secondDataNumber);
                     break;
                  case "cos⁻¹" : 
                    result= Math.acos(secondDataNumber);
                      break;
                  case "tan⁻¹" : 
                    result= Math.atan(secondDataNumber);
                    break;
                  case "sin" : 
                     result= Math.sin(secondDataNumber);
                     break;
                  case "cos" : 
                    result= Math.cos(secondDataNumber);
                      break;
                  case "tan" : 
                    result= Math.tan(secondDataNumber);
                    break;
                  case "log" : 
                    result= Math.log10(secondDataNumber);
                    break;
                  case "ln" : 
                    result= Math.log(secondDataNumber);
                    break;
                    
                }
                
                cal.splice(i, 2, result.toString());
                i=0;
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


      return (!isNaN(result)) ?  result : "Bad expression"
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
            case "^" :
              return Math.pow(a,c);
              break;
            default :
            return "no value found"
    }
}
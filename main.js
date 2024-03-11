let stepOne = document.querySelector("#stepOne");;
let stepTwo = document.querySelector("#stepTwo");
let stepThree = document.querySelector("#stepThree");
let stepFour = document.querySelector("#stepFour");

let allStips = [0,...document.getElementsByClassName("getSteps")];
// we add zero as we started in loop in toggelSteps() from 1
// we removes 0 so no error occurs as it's not html ele :D
allStips.slice(1).forEach(e=>{
    if(e.id === "stepOne"){
        e.style.display = "flex"
    }else{
        e.style.display = "none"
    }
});

// we add zero as we started in loop in toggelSteps() from 1
let activeLiSpanS = [0,...document.querySelectorAll("#Sidebar ul li span")];

let nextStepEleSBtnS = [...document.getElementsByClassName("nextBtn")];
let previousBtnS = [...document.getElementsByClassName("backBtn")];

let currentStep = 1;
// form one start
let formOne = document.querySelector("#formOne");
let phoneCheck = document.querySelector("#regexPhone");
let nameCheck = document.querySelector("#name");
let email = document.querySelector("#emailvalidation");
let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
let regEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/;

// let submit1 = document.getElementById("sum1");
let firstFormData;
formOne.addEventListener("submit",(e)=>{
    e.preventDefault();
    let requireSpan = document.createElement("span");
    requireSpan.textContent = "This field is required"
    requireSpan.classList.add("requireSpan");
    let firstData = new FormData(e.target);
    let data1 = Object.fromEntries(firstData)
    if(regPhone.test(data1.phone) && data1.name.length>0&&regEmail.test(data1.email)){
        e.preventDefault();
        firstFormData = data1;
        nextStep();
    }else if(!data1.name.length>0){
        nameCheck.style.border = "1.5px solid hsl(354, 84%, 57%)";
        let label1 = document.querySelectorAll("#formOne label")[0];
        requireSpan.style.display = "inline"
        label1.append(requireSpan);
        nameCheck.addEventListener("focus",()=>{nameCheck.style.border = "1.5px solid hsl(213, 96%, 18%)"});
        nameCheck.addEventListener("blur",()=>{if(nameCheck.value.length>0){nameCheck.style.border = "1px solid hsl(229, 24%, 87%)"; requireSpan.style.display = "none"}else{
            nameCheck.style.border = "1.5px solid hsl(354, 84%, 57%)"; requireSpan.style.display = "inline";
        }});
    }else if(!regEmail.test(data1.email)){
        email.style.border = "1.5px solid hsl(354, 84%, 57%)";
        let label2 = document.querySelectorAll("#formOne label")[1];
        requireSpan.style.display = "inline"
        label2.append(requireSpan);
        email.addEventListener("focus",()=>{email.style.border = "1.5px solid hsl(213, 96%, 18%)"});
        email.addEventListener("blur",()=>{if(regEmail.test(email.value)){email.style.border = "1px solid hsl(229, 24%, 87%)"; requireSpan.style.display = "none"}else{
            email.style.border = "1.5px solid hsl(354, 84%, 57%)"; requireSpan.style.display = "inline";
        }});  
    }else if(!regPhone.test(data1.phone)){
        phoneCheck.style.border = "1.5px solid hsl(354, 84%, 57%)";
        let label3 = document.querySelectorAll("#formOne label")[2];
        requireSpan.style.display = "inline"
        label3.append(requireSpan);
        phoneCheck.addEventListener("focus",()=>{phoneCheck.style.border = "1.5px solid hsl(213, 96%, 18%)"});
        phoneCheck.addEventListener("blur",()=>{if(regPhone.test(phoneCheck.value)){email.style.border = "1px solid hsl(229, 24%, 87%)"; requireSpan.style.display = "none"}else{
            phoneCheck.style.border = "1.5px solid hsl(354, 84%, 57%)"; requireSpan.style.display = "inline";}
    });  
  }
})
// form one end

// main funcs
function nextStep(){
    currentStep++;
    toggelSteps()
}
function previousStep(){
    currentStep--;
    toggelSteps()
}
function toggelSteps(){
    for (let i = 1;i<=4; i++){
        if(i !== currentStep){
            allStips[i].style.display = "none";
            activeLiSpanS[i].classList.remove("active")
        }else{
            allStips[i].style.display = "flex";
            activeLiSpanS[i].classList.add("active")
        }
    }
}

// step 2 start
let monthlyEleS = [...document.getElementsByClassName("monthly")];
let yearlyEleS = [...document.getElementsByClassName("yearly")];
let plansArr = [...document.getElementById("plans").children];

let secFormData = {
    id:"",
    monYear:"month"
};

let switchContainer = document.getElementById("select-plan-period-container");
// default
yearlyEleS.forEach(e =>{
    e.style.display = "none";
});
switchContainer.children[2].style.color = "hsl(231, 11%, 63%)";
let switchMonYear = document.getElementById("selcetInput");
switchMonYear.addEventListener("change", (e) => {
    if(switchMonYear.checked){
    switchContainer.children[2].style.color = "hsl(213, 96%, 18%)";
    switchContainer.children[0].style.color = "hsl(231, 11%, 63%)";
    monthlyEleS.forEach(e =>{
        e.style.display = "none";
    });
    yearlyEleS.forEach(e =>{
        e.style.display = "block";
    });
    plansArr.forEach(e =>{
        e.style.height = "110%"
    });
    secFormData.monYear = "year";
}else{
    switchContainer.children[0].style.color = "hsl(213, 96%, 18%)";
    switchContainer.children[2].style.color = "hsl(231, 11%, 63%)";
    yearlyEleS.forEach(e =>{
        e.style.display = "none";
    });
    monthlyEleS.forEach(e =>{
        e.style.display = "block";
    });
    plansArr.forEach(e =>{
        e.style.height = "100%"

    });
    secFormData.monYear = "month";
   };
});
plansArr.forEach(e =>{
    e.addEventListener("click",()=>{
        e.classList.toggle("selectedPlan");
        plansArr.forEach(ele =>{if(ele !== e){ele.classList.remove("selectedPlan")}})
    })
})
// next step
let cashInStep3 = [...document.querySelectorAll(".cash")];
let requireSpan2 = document.createElement("span");
    requireSpan2.textContent = "This field is required"
    requireSpan2.classList.add("requireSpan");
nextStepEleSBtnS[1].addEventListener("click",()=>{
    if(plansArr[0].classList.contains("selectedPlan") || plansArr[1].classList.contains("selectedPlan") || plansArr[2].classList.contains("selectedPlan")){
        plansArr.forEach(e =>{
            if(e.classList.contains("selectedPlan")){
                secFormData.id = e.id;
                if(secFormData.monYear == "year"){
                    cashInStep3[0].innerHTML = "+$10/yr";
                    cashInStep3[1].innerHTML = "+$20/yr";
                    cashInStep3[2].innerHTML = "+$20/yr";
                }else{
                    cashInStep3[0].innerHTML = "+$1/mo";
                    cashInStep3[1].innerHTML = "+$2/mo";
                    cashInStep3[2].innerHTML = "+$2/mo";
                }
                nextStep()
            }
        })
    }else{
        requireSpan2.style.display = "block"
        document.getElementById("requiredid").append(requireSpan2)
        requireSpan2.style.position = "static";
        plansArr.forEach(e =>{
            e.addEventListener("click",()=>{requireSpan2.style.display = "none"})
        })
    }
})
// previous step
previousBtnS[0].addEventListener("click",()=>{
    previousStep()
})
// step 2 end
// step 3 start
// some styles functions
// default

let svgS = document.querySelectorAll(".checkboxcontainer svg");
svgS.forEach(e =>{
    e.style.display = "none";
})
let formthreeObj = {};
formthreeObj.edited = [];
let uniqueStepThree = new Set();
document.querySelectorAll("#service,#storage,#Profile").forEach(e =>{
    e.addEventListener("click",()=>{
        console.log((e));
        if(e.attributes[1].value == "false"){
            e.attributes[1].value = "true";
            svgS.forEach(ele =>{
                if(ele.parentElement.parentElement.parentElement == e){
                  ele.style.display = "block";
                  ele.parentElement.style.border = "none";
                  e.style.background = "hsl(217, 100%, 97%)";
                  e.style.borderColor = "hsl(243, 100%, 62%)";
                // I will use set to get unique in case of returning and get new data 
                uniqueStepThree.add(e.id)
                console.log(uniqueStepThree);
                formthreeObj.strData = [...uniqueStepThree]
                }
                
            })
        }else{
            e.attributes[1].value = "false"
            // filtering using set
            uniqueStepThree.delete(e.id);
            formthreeObj.strData = [...uniqueStepThree]
            console.log(formthreeObj);
            console.log(uniqueStepThree);
            svgS.forEach(ele =>{
                if(ele.parentElement.parentElement.parentElement == e){
                    ele.style.display = "none"
                    ele.parentElement.style.border = "1px solid hsl(231, 11%, 63%)"
                    e.style.background = "white"
                    e.style.borderColor = "hsl(231, 11%, 63%)";
                }
            })
        }
    })
})
nextStepEleSBtnS[2].addEventListener("click",()=>{
    nextStep()
})
previousBtnS[1].addEventListener("click",()=>{
    previousStep()
    console.log(secFormData.monYear);
})
// step 3 end
// step 4 start
// calc funcs
// formOne data us in firstFormData
// main plans data (obj)(name in id,mon year is next val) is in secFormData
// additions (arr) in useableFormThreeData
// add price as i missed include it
let planPrice;
// handle and update step 3
// formthreeCashObj
function updateStep3(){
    // for filtering
    formthreeObj.edited.length = 0;
    if(formthreeObj.strData.length){
    for(let i = 0;i<formthreeObj.strData.length;i++){
        if(formthreeObj.strData[i] === "Profile"){
            formthreeObj.edited.push("Customizable Profile");
            formthreeObj.Profile = `+$${secFormData.monYear == "month"?"2/mo":"20/yr"}`;
        }
        if(formthreeObj.strData[i] === "storage"){
            formthreeObj.edited.push("Larger storage");
            formthreeObj.storage = `+$${secFormData.monYear == "month"?"2/mo":"20/yr"}`;
        }
        if(formthreeObj.strData[i] === "service"){
            formthreeObj.edited.push("Online service")
            formthreeObj.service = `+$${secFormData.monYear == "month"?"1/mo":"10/yr"}`;
        }
    }
  } 
}
function cashMonYear(){
    if(secFormData.monYear == "month"){
        switch (secFormData.id) {
            case "Arcade":
                planPrice = "$9/mo"
                break;
            case "Advanced":
                    planPrice = "$12/mo"
                break;
            case "Pro":    
                    planPrice = "$15/mo"
                break;
        }
    }else{
        switch (secFormData.id) {
            case "Arcade":
                planPrice = "$90/yr"
                break;
            case "Advanced":
                    planPrice = "$120/yr"
                break;
            case "Pro":    
                    planPrice = "$150/yr"
                break;
        }
    }
}
// I've added another event listener to be able to deal with new data
let totalPerMonOrYear = document.getElementById("totalPer");
let totalCashFormThree = 0;
let totalPrice = document.getElementById("finalPrice");
nextStepEleSBtnS[2].addEventListener("click",()=>{
    // first section
    cashMonYear()
    document.querySelector(".forFlex h4").innerHTML = `${secFormData.id} (${secFormData.monYear == "month"?"Monthly":"Yearly"})`;
    document.querySelector(".cashPlan").innerHTML = `${planPrice}`;
    // second section
    updateStep3()
    // adding text and price for extentions
    let htmlText = document.getElementById("addName");
    let htmlCash = document.getElementById("addPrice");
    // suppose user went and go again i clear it before next func
    htmlText.innerHTML = "";
    htmlCash.innerHTML = "";
    createPElementS(formthreeObj,htmlText,htmlCash)
    // total section
    totalPerMonOrYear.innerHTML = `Total (per ${secFormData.monYear})`;
    totalPrice.innerHTML = calcTotal(planPrice,totalCashFormThree)
})
// change logic
document.querySelector(".forFlex p").addEventListener("click",()=>{
    if(secFormData.monYear == "month"){
        // first section
        secFormData.monYear = "year";
        cashMonYear();
        document.querySelector(".forFlex h4").innerHTML = `${secFormData.id} (${secFormData.monYear == "month"?"Monthly":"Yearly"})`;
        document.querySelector(".cashPlan").innerHTML = `${planPrice}`;
        // second section
        updateStep3()
        if(formthreeObj.strData.length !== 0){
            document.querySelectorAll(`#addPrice p`).forEach(e =>{
                e.textContent = `+$${e.textContent.slice(2,3)}0/yr`
            })
        }
    }else{
        // first section
        secFormData.monYear = "month";
        cashMonYear();
        document.querySelector(".forFlex h4").innerHTML = `${secFormData.id} (${secFormData.monYear == "month"?"Monthly":"Yearly"})`;
        document.querySelector(".cashPlan").innerHTML = `${planPrice}`;
        // second section
        updateStep3()
        if(formthreeObj.strData.length !== 0){
            document.querySelectorAll(`#addPrice p`).forEach(e =>{
                e.textContent = `+$${e.textContent.slice(2,3)}/mo`
            })
        }
    }
    // update previous (plans)
    if(secFormData.monYear == "year"){
        switchMonYear.checked = true;
        switchContainer.children[2].style.color = "hsl(213, 96%, 18%)";
        switchContainer.children[0].style.color = "hsl(231, 11%, 63%)";
        monthlyEleS.forEach(e =>{
            e.style.display = "none";
        });
        yearlyEleS.forEach(e =>{
            e.style.display = "block";
        });
        plansArr.forEach(e =>{
            e.style.height = "110%"
        });
    }else{
        switchMonYear.checked = false;
        switchContainer.children[0].style.color = "hsl(213, 96%, 18%)";
        switchContainer.children[2].style.color = "hsl(231, 11%, 63%)";
        yearlyEleS.forEach(e =>{
            e.style.display = "none";
        });
        monthlyEleS.forEach(e =>{
            e.style.display = "block";
        });
        plansArr.forEach(e =>{
            e.style.height = "100%"
        });
    };
    // update previous (add-ons)
    if(secFormData.monYear == "year"){
        cashInStep3[0].innerHTML = "+$10/yr";
        cashInStep3[1].innerHTML = "+$20/yr";
        cashInStep3[2].innerHTML = "+$20/yr";
    }else{
        cashInStep3[0].innerHTML = "+$1/mo";
        cashInStep3[1].innerHTML = "+$2/mo";
        cashInStep3[2].innerHTML = "+$2/mo";
    }
    // total section
    totalPerMonOrYear.innerHTML = `Total (per ${secFormData.monYear})`;
    totalPrice.innerHTML = calcTotal(planPrice,totalCashFormThree)
})
// creatElement main func
// formthreeObj .strData[] .Profile,etc = number .edited
function createPElementS(mainObj,textHtml,cashHtml){
    if(mainObj.strData.length !== 0){
        let objKeys = Object.keys(mainObj).slice(2);
        totalCashFormThree = 0;
        for(let i = 0;i<mainObj.strData.length;i++){
            let para = document.createElement("p");
            para.textContent = mainObj.edited[i];
            textHtml.append(para);
            let cashP = document.createElement("p");
            objKeys.forEach(e =>{
                console.log(mainObj);
                if(e === mainObj.strData[i]){
                    console.log(mainObj);
                    cashP.textContent = mainObj[e];
                    totalCashFormThree += +mainObj[e].slice(2,-3)
                }
            })
            cashHtml.append(cashP)
        }
    }
}
// step two => plan price step three => formthreeObj => totalCashFormThree
function calcTotal(steptwocash,stepthreeCash){
    steptwocash = +steptwocash.slice(1,-3);
    stepthreeCash = +totalCashFormThree
    if(secFormData.monYear === "year" && totalCashFormThree<10){
        stepthreeCash = totalCashFormThree * 10;
        console.log(stepthreeCash);
    }
    if(secFormData.monYear === "month" && stepthreeCash>10){
        stepthreeCash = stepthreeCash /10;
    }
    return `$${steptwocash + stepthreeCash}/${secFormData.monYear}`
}
// confirm and previous
previousBtnS[2].addEventListener("click",()=>{
    previousStep()
})
document.getElementById("sum4").addEventListener("click",()=>{
    document.getElementById("finalmessage").style.display = "flex"
    allStips.slice(1).forEach(e => {e.innerHTML = ""; e.remove()})
})
// step 4 end


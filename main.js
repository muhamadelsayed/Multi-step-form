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

let secFormData;

let switchContainer = document.getElementById("select-plan-period-container");
// default
let monYear = "month";
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
    monYear = "year";
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
    monYear = "month";
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
                secFormData = {
                    id:e.id,
                    monYear:monYear
                };
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
let formThreeData= [];
document.querySelectorAll("#service,#storage,#Profile").forEach(e =>{
    e.addEventListener("click",()=>{
        console.log((e));
        if(e.attributes[1].value == "false"){
            e.attributes[1].value = "true";
            // document.querySelector(`#${e.id} .cash`).setAttribute("used","yes")
            svgS.forEach(ele =>{
                if(ele.parentElement.parentElement.parentElement == e){
                  ele.style.display = "block";
                  ele.parentElement.style.border = "none";
                  e.style.background = "hsl(217, 100%, 97%)";
                  e.style.borderColor = "hsl(243, 100%, 62%)";
                  formThreeData.push(e.id)
                }
            })
        }else{
            e.attributes[1].value = "false"
            formThreeData = formThreeData.filter(element =>{return element !== e.id})
            // document.querySelector(`#${e.id} .cash`).setAttribute("used","no")
            svgS.forEach(ele =>{
                if(ele.parentElement.parentElement.parentElement == e){
                    ele.style.display = "none"
                    ele.parentElement.style.border = "1px solid hsl(231, 11%, 63%)"
                    e.style.background = "white"
                    e.style.borderColor = "hsl(231, 11%, 63%)";
                }
            })
        }
        // if(document.querySelector(`#${e.id} .cash`).attributes[1].value === "yes"){
        //     formthreeCash.push(parseInt(document.querySelector(`#${e.id} .cash`).innerHTML.match(/\d+/)));
        // }else{
        //     // formthreeCash.filter(elem =>{return elem !== document.querySelector(`#${e.id} .cash`).innerHTML.match(/\d+/)})
        //     let destruction = [];
        //     for(let j = 0;j<formthreeCash.length;j++){
        //         if(!formthreeCash[j] !== document.querySelector(`#${e.id} .cash`).innerHTML.match(/\d+/)){
        //             destruction.push(formthreeCash[j])
        //         }
        //     }
        //     formthreeCash = destruction;
        // }
    })
})
nextStepEleSBtnS[2].addEventListener("click",()=>{
    nextStep()
})
previousBtnS[1].addEventListener("click",()=>{
    previousStep()
})
// step 3 end
// step 4 start
// calc funcs
// formOne data us in firstFormData
// main plans data (obj)(name in id,mon year is next val) is in secFormData
// additions (arr) in useableFormThreeData
// add price as i missed include it
let planPrice;
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
let formthreeCashObj = {};
let formthreeCash = [];
// I've added another event listener to be able to deal with new data
nextStepEleSBtnS[2].addEventListener("click",()=>{
    // first section
    cashMonYear()
    document.querySelector(".forFlex h4").innerHTML = `${secFormData.id} (${secFormData.monYear == "month"?"Monthly":"Yearly"})`;
    document.querySelector(".cashPlan").innerHTML = `${planPrice}`;
    // second section
    // handle names in the array
    for(let i = 0;i<formThreeData.length;i++){
        if(formThreeData[i] === "Profile"){
            formThreeData[i] = "Customizable Profile";
            formthreeCashObj.Profile = `+$${secFormData.monYear == "month"?"2/mo":"20/yr"}`;
        }
        if(formThreeData[i] === "storage"){
            formThreeData[i] = "Larger storage"
            formthreeCashObj.storage = `+$${secFormData.monYear == "month"?"2/mo":"20/yr"}`;
        }
        if(formThreeData[i] === "service"){
            formThreeData[i] = "Online service"
            formthreeCashObj.service = `+$${secFormData.monYear == "month"?"1/mo":"10/yr"}`;
        }
    }
    formthreeCash = Object.values(formthreeCashObj);
    // adding text and price for extentions
    let htmlText = document.getElementById("addName");
    let htmlCash = document.getElementById("addPrice");
    createPElementS(formThreeData,htmlText,formthreeCash,htmlCash)
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
        if(formthreeCash.length !== 0){
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
        if(formthreeCash.length !== 0){
            document.querySelectorAll(`#addPrice p`).forEach(e =>{
                e.textContent = `+$${e.textContent.slice(2,3)}/mo`
            })
        }
    }
})
// step 4 end
function createPElementS(textArr,textHtml,cashArr,cashHtml){
    if(textArr.length !== 0){
        for(let i = 0;i<textArr.length;i++){
            let para = document.createElement("p");
            para.textContent = textArr[i];
            textHtml.append(para);
            let cashP = document.createElement("p");
            cashP.textContent = cashArr[i];
            cashHtml.append(cashP)
        }
    }
}


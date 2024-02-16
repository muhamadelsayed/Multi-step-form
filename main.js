// form one
let formOne = document.querySelector("#formOne");
let phoneCheck = document.querySelector("#regexPhone");
let nameCheck = document.querySelector("#name");
let email = document.querySelector("#emailvalidation");
let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
let regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

let requireSpan = document.createElement("span");
requireSpan.textContent = "This field is required"
requireSpan.classList.add("requireSpan");
// let submit1 = document.getElementById("sum1");
let firstFormData;
formOne.addEventListener("submit",(e)=>{
    e.preventDefault();
    let firstData = new FormData(e.target);
    let data1 = Object.fromEntries(firstData)
    if(regPhone.test(data1.phone) && data1.name.length>0&&regEmail.test(data1.email)){
        e.preventDefault();
        console.log("done")
        firstFormData = data1;
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

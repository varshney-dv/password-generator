const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay =document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;

// function

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.textContent=passwordLength;
}
handleSlider();

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = "0px 0px 10px "+color;
}
function getRandomInteger(min,max){
    const num= min + Math.floor(Math.random()*(max-min));
    return num;
}
function getRandomNumber(){
    return getRandomInteger(0,9);
}
function getRandomLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function getrandomUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function getRandomSymbol(){
    return symbols[getRandomInteger(0,symbols.length)];
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
async function contentCopy(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.textContent="Copied!";
    }
    catch(e){
        copyMsg.textContent="Failed!";
    }
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}

function handleCheckbocChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            ++checkCount;
        }
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckbocChange);
});

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        contentCopy();
    }
});
console.log(checkCount,passwordLength);

generateBtn.addEventListener('click',()=>{
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    password="";

    let functionarr=[];
    if(uppercaseCheck.checked){
        functionarr.push(getrandomUppercase);
    }
    if(lowercaseCheck.checked){
        functionarr.push(getRandomLowercase);
    }
    if(numbersCheck.checked){
        functionarr.push(getRandomNumber);
    }
    if(symbolsCheck.checked){
        functionarr.push(getRandomSymbol);
    }
    
    // Complusory addition
    for(let i=0;i<functionarr.length;i++){
        password+=functionarr[i]();
    }
    // Additional Adition

    for(let i=0;i<passwordLength-functionarr.length;i++){
        let randomIndex=getRandomInteger(0,functionarr.length);
        password+=functionarr[randomIndex]();
    }
    console.log(password);

    passwordDisplay.value=password;
    calcStrength();

});
console.log(password);

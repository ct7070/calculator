// cros calculator clone

let result = 0;
let btnDecimalActive = true;
let haveArg = false;

function addition(arg1, arg2){
    result = arg1 + arg2;
    return result;
}

function subtraction(arg1, arg2){
    result = arg1 - arg2;
    return result;
}

function multiplication(arg1, arg2){
    result = arg1 * arg2;
    return result;
}

function division(arg1, arg2){
    result = arg1 / arg2;
    return result;
}

const btns = document.querySelector('#buttons');
const nums = document.getElementById('#numbers');
const screen = document.getElementById('screenDisplay');
const screenSpacer = document.getElementById('screenSpacer');
const btnRegister = document.createElement('span');

const btnPress = btns.addEventListener('click', (key) => {
    const checkFloat = parseFloat(key.target.textContent);
    const btnClass = key.target.className;
    console.log(checkFloat);
    console.log(btnClass);
    validateKeypress(checkFloat, btnClass);
});
    
function validateKeypress(checkFloat, btnClass){
    if(!btnClass){
        btnRegister.textContent += checkFloat;
        screen.appendChild(btnRegister);
    } else if(btnClass == "decimal"){
        if(btnDecimalActive == true){
            if(btnRegister.textContent == ""){
                btnRegister.textContent += "0.";
                btnDecimalActive = false;
                screen.appendChild(btnRegister);
            } else {
                btnRegister.textContent += ".";
                screen.appendChild(btnRegister);
                btnDecimalActive = false;
            }
        }
    } else if(btnClass == "clear"){
        while (screenSpacer.hasChildNodes()){
            screenSpacer.removeChild(screenSpacer.lastChild);
            console.log(screenSpacer.length);
        }
        btnRegister.textContent = "";
        btnDecimalActive = true;
    } else if(btnClass == "backspace"){
        let backUp = btnRegister.textContent;
        backUp = backUp.substring((backUp.length - 1), backUp.length);
        if(backUp === "."){
            btnDecimalActive = true;
        }
        btnRegister.textContent = btnRegister.textContent.slice(0, -1);
        screen.appendChild(btnRegister);
    } else if(btnClass == "equals"){
    } else {
        result = btnRegister.textContent;
        updateScreen(btnClass);
    }
}

function updateScreenArg(symbol){
    if(haveArg == true){
        console.log(result);
        console.log(parseFloat(result));
    }
    const screenArg = document.createElement('span');
    screenArg.textContent = parseFloat(result);
    screenArg.textContent += `  ${symbol} `;
    screenArg.classList.add(`${result}`);
    screenSpacer.appendChild(screenArg);

    // reset tracking variables
    btnRegister.textContent = "";
    haveArg = true;
    btnDecimalActive = true;
}

function updateScreen(operator){
    const updateScreenOp = document.createElement('span');
    let symbol = "";
    if(operator == "divide"){
        symbol = "÷";
    } else if(operator == "multiply"){
        symbol = "✕";
    } else if(operator == "subtract"){
        symbol = "–";
    } else if(operator == "add"){
        symbol = "+";
    }
    updateScreenArg(symbol);
}
function updateScreenResult(arg){}

function initNewLine(){
    const newLine = document.createElement('span');
    screen.appendChild(newLine);
}
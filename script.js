// cros calculator clone

let result = 0;
let operator = "";
let btnDecimalActive = true;
let symbol = "";
let nuked = false;

let btnPress = "";
let btnClass = ""; 

const btns = document.querySelector('#buttons');
const ops = document.querySelectorAll('#operators div');

const firstArgument = document.createElement('span');
const newOp = document.createElement('span');
const insertOp = document.createElement('span');

const screenSpacer = document.querySelector('#screenSpacer');
const screenParent = document.getElementById('screenSpacer').parentElement;

const btnClick = btns.addEventListener('click', (key) => { listenHere(key, true) });
// const btnPress = document.addEventListener('keydown', (key) => { listenHere(key, false) });
const keyPress = document.addEventListener('keydown', (key) => { heardKey(key) });

function heardKey(key){
    // console.log(key);
    const keyd = key.key;
    const keyNum = parseInt(keyd);
    const specialKeys = [
        { kbPush: '+', kbSend: 'add', },
        { kbPush: '-', kbSend: 'subtract', },
        { kbPush: '*', kbSend: 'multiply', },
        { kbPush: 'x', kbSend: 'multiply', },
        { kbPush: '/', kbSend: 'divide', },
        { kbPush: '%', kbSend: 'divide', },
        { kbPush: '<', kbSend: 'backspace', },
        { kbPush: '=', kbSend: 'equals', },
        { kbPush: '.', kbSend: 'decimal', },
        { kbPush: 'Backspace', kbSend: 'backspace', },
        { kbPush: 'Enter', kbSend: 'equals', },
        { kbPush: 'Escape', kbSend: 'clear', },
    ];

    if(isNaN(keyNum)){
        specialKeys.forEach(kvp => {
            if(kvp.kbPush == keyd){ 
                listenHere("", false, kvp.kbSend)
            }
        });
    } else { listenHere(keyNum, false, ""); }
}

function listenHere(key, wasClicked, btnClass){
    const results = document.querySelectorAll('.result');
    
    if(wasClicked == true){
        btnPress = key.target.textContent;
        btnClass = key.target.className;
    } else { btnPress = key; }

    if (btnClass == "clear"){
        fullReset();
    } else if (results.length > 0 && newOp.textContent == ''){
        for (const op of ops){
            if (op.classList == btnClass){ updateOperator(btnClass); } 
        } 
    } else {
        insertOp.id = "newEntry";
        screenSpacer.appendChild(insertOp);
        validateKeypress(btnPress, btnClass);
    }
}

const typeSlide = document.getElementById('newEntry');
    
function validateKeypress(btnPress, btnClass){
    const printNextArg = document.createElement('span');
    if(!btnClass){  // button is a number
        firstArgument.textContent += btnPress;
        insertOp.appendChild(firstArgument);
    } else if(btnClass == "decimal"){
        if(btnDecimalActive == true){
            if(firstArgument.textContent == ""){
                firstArgument.textContent += "0.";
                insertOp.appendChild(firstArgument);
                btnDecimalActive = false;
            } else {
                firstArgument.textContent += ".";
                insertOp.appendChild(firstArgument);
                btnDecimalActive = false;
            }
        }
    }
    else if(btnClass == "backspace"){
        let backUp = firstArgument.textContent;
        if((backUp.length == 1) || (backUp == "0.") || (backUp == "")){
            firstArgument.textContent = "";
            insertOp.appendChild(firstArgument);
        } else {
            firstArgument.textContent = firstArgument.textContent.slice(0, -1);
            insertOp.appendChild(firstArgument);
        }
        if(firstArgument.textContent.includes('.')){ btnDecimalActive = false;
        } else { btnDecimalActive = true; }
    } else {    // button is an operator
        const getResults = document.querySelectorAll('.result');
        const lastResult = getResults[getResults.length - 1];
        const arg1 = parseFloat(firstArgument.textContent);
        if (firstArgument.textContent == '') {
            console.log("firstArgument is empty...");
            if(lastResult){ 
                arg2 = parseFloat(lastResult);
                updateOperator(btnClass); } 
        } else {
            if (operator == ''){
                arg2 = parseFloat(result);
                printNextArg.textContent = parseFloat(firstArgument.textContent);
                printNextArg.classList.add('result', 'top');
                screenParent.insertBefore(printNextArg, screenSpacer);
                updateOperator(btnClass);
            } else {
                const findArg2 = getResults[(getResults.length) - 1].textContent;
                if (getResults.length == 1) {
                    arg2 = parseFloat(findArg2);
                    console.log("SKIP SLICE (first argument received)");
                    doMath(arg2, arg1, operator);
                } else {
                    arg2 = parseFloat(result);
                    doMath(arg2, arg1, operator);
                }
                printNextArg.textContent = symbol + " " + arg1;
                printNextArg.classList.add("result");
                // screenParent.insertBefore(printNextArg, screenSpacer);

                const printResult = document.createElement('p');
                printResult.classList.add("result");
                printResult.textContent = parseFloat(result.toPrecision(10));
                // screenParent.insertBefore(printResult, screenSpacer);
                
                if(nuked == true){
                    console.warn("https://www.youtube.com/watch?v=ydLTfyXaQmU");
                    nuked = false;
                } else {
                    screenParent.insertBefore(printNextArg, screenSpacer);
                    screenParent.insertBefore(printResult, screenSpacer);
                } 
                updateOperator(btnClass);
            }
        }
    }
} 

function updateOperator(btnClass){ 
    // console.log(`UPDATING OPERATOR ... received ${btnClass}`);
    if(btnClass == ""){
    } else if (btnClass == "backspace"){
        validateKeypress("", "backspace");
    } else {
        if (btnClass == "divide") {
            symbol = "÷";
            operator = "divide"
        } else if (btnClass == "multiply") {
            symbol = "x";
            operator = "multiply"
        } else if (btnClass == "subtract") {
            symbol = "–";
            operator = "subtract"
        } else if (btnClass == "add") {
            symbol = "+";
            operator = "add"
        } else if (btnClass == "equals"){
            symbol = "";
            operator = "";
        }
        const entry = document.getElementById('newEntry');
        const nextArg = entry.textContent.slice(4);
        newOp.classList.add('newOp');
        newOp.textContent = symbol;
        const newEntry = document.querySelector('#newEntry');
        newEntry.prepend(newOp);
        newEntry.append("   ");
        firstArgument.textContent = "";
        firstArgument.classList.add('newArg');
        btnDecimalActive = true;
    }
}

function fullReset(){
    const fullResults = document.querySelectorAll('.result');
    fullResults.forEach( (e) => { 
        e.parentNode.removeChild(e); 
    });
    firstArgument.textContent = "";
    insertOp.textContent = "";
    btnDecimalActive = true;
    operator = "";
    symbol = "";
    haveArg = false;
    console.log("############ ALL CLEAR #############");
}

function doMath(arg2, arg1, op){
    if (op == "divide") {
        division(arg1, arg2);
        console.log(`result = ${result}`);
    } else if (op == "multiply") {
        multiplication(arg1, arg2);
        console.log(`result = ${result}`);
    } else if (op == "subtract") {
        subtraction(arg1, arg2);
        console.log(`result = ${result}`);
    } else if (op == "add") {
        addition(arg1, arg2);
        console.log(`result = ${result}`);
    } else {
        console.warn("NOT A VALID OPERATION");
    }
}

// MATH FUNCTIONS
function addition(arg1, arg2){
    result = arg2 + arg1;
    console.log(parseFloat(result.toFixed(12)));
    return parseFloat(result.toFixed(12));
}

function subtraction(arg1, arg2){
    result = arg2 - arg1;
    console.log(parseFloat(result.toFixed(12)));
    return parseFloat(result.toFixed(12));
}


function multiplication(arg1, arg2){
    result = arg2 * arg1;
    console.log(parseFloat(result.toFixed(12)));
    return parseFloat(result.toFixed(12));
}

function division(arg1, arg2){
    if(arg1 == 0){
        console.warn("OK, RIEMANN... RESETTING TO PREVIOUS RESULT.");
        nuked = true;
    } else {
        result = arg2 / arg1;
        console.log(parseFloat(result.toFixed(12)));
        return parseFloat(result.toFixed(12));
    }
}
/*
const btnNumPress = document.addEventListener('click', (key) => {
    console.log(key.target);
});
*/

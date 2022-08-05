// calculator

let result = 0;

function addition(num1, num2){
    result = num1 + num2;
   return result;
}

function subtraction(num1, num2){
    result = num1 - num2;
    return result;
}

function multiplication(num1, num2){
    result = num1 * num2;
    return result;
}

function division(num1, num2){
    result = num1 / num2;
    return result;
}



const screen = document.querySelector('#screen');
const newEntry = document.createElement('div');
const btnNumber = document.querySelectorAll('#buttons .numbers');
const btnOperator = document.querySelectorAll('#buttons .operators');
const btnSpecial = document.querySelectorAll('#buttons .special');
console.log(btnNumber);
console.log(btnOperator);
console.log(btnSpecial);


const btnNumPress = document.addEventListener('click', (key) => {
    console.log(key.target);

});

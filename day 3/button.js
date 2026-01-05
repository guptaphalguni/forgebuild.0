


const updatebutton = document.getElementById('updatebutton');
const showntxt = document.getElementById('showntxt');

updatebutton.addEventListener('click', function() {
    showntxt.innerText = "IIT ROORKEE!";
});


const showbutton = document.getElementById('showbutton');
const input = document.getElementById('input');
const display = document.getElementById('display');

showbutton.addEventListener('click', function() {
   
    display.innerText = input.value;
});


let count = 0;
const counterval = document.getElementById('counterval');
const plusBtn = document.getElementById('plusbutton');
const minusBtn = document.getElementById('minusbutton');

plusbutton.addEventListener('click', function() {
    count++; 
    counterval.innerText = count;
});

minusbutton.addEventListener('click', function() {
    count--; 
    counterval.innerText = count;
});

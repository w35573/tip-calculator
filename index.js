const tipAmt = document.querySelector('#tip-cost');
const totalAmt = document.querySelector('#total');
const reset = document.querySelector('.reset');
const bill = document.querySelector('#bill-num');
const tips = document.querySelectorAll('.tip-element');
const custom = document.querySelector('#custom');
const noOfPeople = document.querySelector('#people');
const errorMsg = document.querySelector('#error');
const message = document.querySelector('.message');
const zero = '0.00';

let billVal = 0;
let tipVal = 0;
let totalBill = 0;
let totalTip = 0;
let people = 0;

errorMsg.style.visibility = 'hidden';

// window.addEventListener('load', calculateBill());

reset.addEventListener('click', () => {
    resetfunx();
});

function resetfunx() {
    tipAmt.innerHTML = `$${zero}`;
    totalAmt.innerHTML = `$${zero}`;
}

bill.addEventListener('input', () => {
    billVal = Number(bill.value);
    calculateBill();
});

custom.addEventListener('input', () => {
    tipVal = Number(custom.value);
    calculateBill();
});

custom.addEventListener('click', () => {
    removeActiveClasses();
});

noOfPeople.addEventListener('input', () => {
    // console.log(Number(noOfPeople.value));
    if(parseInt(noOfPeople.value)===0) {
        noOfPeople.classList.add('red-border');
        errorMsg.style.visibility = 'visible';
        errorMsg.classList.add('visible');
    } else {
        people = parseInt(noOfPeople.value);
        errorMsg.style.visibility = 'hidden';
        noOfPeople.classList.remove('red-border');
        calculateBill();
    }
});

tips.forEach(tip => {
    tip.addEventListener('click', () => {
        removeActiveClasses();
        tipVal = Number(tip.textContent.replace('%', ''));
        tip.classList.add('active');
        calculateBill();
    });
});

function removeActiveClasses() {
    tips.forEach(tip => {
        tip.classList.remove('active');
    });
}

function calculateBill() {
    if (people !== 0 && tipVal !== 0 && people !== NaN) {
        totalTip = ((billVal*tipVal)/100)/people;
        totalBill = totalTip + (billVal/people);
        totalAmt.innerHTML = `$${totalBill.toFixed(2)}`;
        tipAmt.innerHTML = `$${totalTip.toFixed(2)}`;
        if (totalTip === NaN || totalBill === NaN) {
            resetfunx();
        }
        reset.classList.add('active');
    }
}
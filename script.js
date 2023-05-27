// ### Users should be able to:
// - View an age in years, months, and days after submitting a valid date through the form
// - Receive validation errors if:
//   - Any field is empty when the form is submitted
//   - The day number is not between 1-31
//   - The month number is not between 1-12
//   - The year is in the future
//   - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
// - View the optimal layout for the interface depending on their device's screen size
// - See hover and focus states for all interactive elements on the page
// - **Bonus**: See the age numbers animate to their final number when the form is submitted

// ### work script
// get form.data
const form = document.getElementById('ageCalculator');
// console.log(form);
// if button pushed go code..
form.addEventListener('submit', function (event) {
    event.preventDefault(); //dont reload window
    // console.log(event);
    // get input data
    let day = parseInt(form.day.value);
    let month = parseInt(form.month.value);
    let year = parseInt(form.year.value);

    // get now data
    // getCurentDate();
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();

    // cheking input data
    chekingDay(day);
    chekingMonth(month);
    chekingYear(year, currentYear);
    chekingValidDate(day, month, year);

    // console.log(chekingValidDate(day, month, year));

    // calculatings
    let years = currentYear - year;
    let months = currentMonth - month;
    let days = currentDay - day;

    if (days < 0) {
        months--;
        days = currentDay - 1;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // output results
    if (chekingValidDate(day, month, year)) {
        document.getElementById('out-years').innerHTML = years;
        document.getElementById('out-months').innerHTML = months;
        document.getElementById('out-days').innerHTML = days;
    }
    else {
        document.getElementById('out-years').innerHTML = '--';
        document.getElementById('out-months').innerHTML = '--';
        document.getElementById('out-days').innerHTML = '--';
    }
})

// varnings messages
let empty = 'This field is required';
let errorDay = 'Must be a valid day';
let errorMonth = 'Must be a valid month';
let errorYear = 'Must be a valid year';
let errorDate = 'Must be a valid date';

let param,
    varningBlocks,
    itemBlocks;

// let varningBlocks = document.querySelectorAll('.varning');
// let itemBlocks = document.querySelectorAll('.input-description, .input-col');

// function chekingData(day) {

//     if (!day) {
//         addError();
//     }

//     else {
//         removeError();
//     }
// }

function addError(message) {
    let outputMesage = message;
    varningBlocks.forEach(function (item) {
        item.classList.remove('hidden');
        item.innerHTML = outputMesage;
    })

    itemBlocks.forEach(function (item) {
        item.classList.add('error');
    })
}

function removeError() {
    varningBlocks.forEach(function (item) {
        item.classList.add('hidden');
        item.innerHTML = '';
    })
    itemBlocks.forEach(function (item) {
        item.classList.remove('error');
    })
}

function getParam(param) {
    varningBlocks = document.querySelectorAll('#varning-' + param);
    itemBlocks = document.querySelectorAll('#input-' + param + ', #label-' + param);
    return [varningBlocks, itemBlocks];
}

function chekingDay(day) {
    param = 'day';
    getParam(param);

    if (!day) { addError(empty); }
    else if (day < 1 || day > 31) { addError(errorDay); }
    else { removeError(); }
}

function chekingMonth(month) {
    param = 'month';
    getParam(param);

    if (!month) { addError(empty); }
    else if (month < 1 || month > 12) { addError(errorMonth); }
    else { removeError(); }
}

function chekingYear(year, currentYear) {
    param = 'year';
    getParam(param);

    if (!year) { addError(empty); }
    else if (year < 1900 || year > currentYear) { addError(errorYear); }
    else { removeError(); }
}

function chekingValidDate(day, month, year) {
    param = 'day';
    getParam(param);
    let validDate = new Date(year, month - 1, day);
    if (validDate.getFullYear() !== year ||
        validDate.getMonth() + 1 !== month ||
        validDate.getDate() !== day) {
        addError(errorDate);
        return false;
    }
    else {
        removeError();
        return true;
    }

    // console.log(validDate);
}

// function getCurentDate() {
//     var currentDate = new Date();
//     var currentDay = currentDate.getDate();
//     var currentMonth = currentDate.getMonth() + 1;
//     var currentYear = currentDate.getFullYear();

//     return [currentDate, currentDay, currentMonth, currentYear];
// }


/* ========================
Init variables, objects
 ======================== */

// Name field init variables
let name = document.getElementById("name")
let nameLabel = document.getElementsByTagName('label')[0]
let nameHint = document.getElementsByClassName("name-hint")[0]

// Email field init variables
let email = document.getElementById("email")
let emailLabel = document.getElementsByTagName('label')[1]
let emailHint = document.getElementsByClassName("email-hint")[0]

// Title(Job Role) field init variables
let titleRole = document.getElementById("title")

// Select Design dropdown
// let jobRole = document.getElementById("other-job-role")

// Design field init variables
let designs = document.getElementById("design");

// Color field init variables
let colors = document.getElementById("color"), colorOption, i;

// Total
// Activities field init variables
let total = 0;
let totalSum = document.getElementById("activities-cost")
let activities = document.getElementById("activities");
let nodelistLabel = activities.getElementsByTagName("input");
let listLabels = activities.getElementsByTagName("label");
let checkBoxes = activities.getElementsByTagName("input");
let activitiesHint = activities.getElementsByClassName("activities-hint")[0]

// Pay With  field init variables
let payWith = document.getElementById("payment")
let paypal = document.getElementById("paypal")
let bitcoin = document.getElementById("bitcoin")
let ccNumber = document.getElementById("cc-num")
let ccNumberLabel = document.getElementsByClassName('credit-card-box')[0].getElementsByTagName("label")[0]
let ccNumberHint = document.getElementsByClassName("cc-hint")[0]
let cCard = document.getElementById("credit-card")
let ccZip = document.getElementById("zip")
let ccZipLabel = document.getElementsByClassName('zip-box')[0].getElementsByTagName("label")[0]
let ccZipHint = document.getElementsByClassName("zip-hint")[0]
let ccCVV = document.getElementById("cvv")
let ccCVVLabel = document.getElementsByClassName('cvv-box')[0].getElementsByTagName("label")[0]
let ccCVVHint = document.getElementsByClassName("cvv-hint")[0]

// Form
let form = document.getElementsByTagName('form')[0];
let formSubmit = true


// Function to show Other Job Role field
titleRole.onchange = revealOtherJobRole;

function revealOtherJobRole(e) {
    if (e.target.value === "other") {
        document.getElementById("other-job-role").style.display = null;
    } else {
        document.getElementById("other-job-role").style.display = 'none';
    }
}

/*
Enable Color dropdown
Filter Color options based on design selection
*/
designs.onchange = toggleColor;

function toggleColor(e) {
    colors.disabled = false;
    if (designs.value === e.target.value) {
        for(let i = 0; i < colors.length; i++) {
            colorOption = colors[i];
            if (colorOption.dataset.theme !== e.target.value) {
                colorOption.hidden = true
                colors[0].selected = true
            } else {
                colorOption.hidden = false
                colors[0].selected = true
            }
        }
    }
}

/*
Activities Total
Compare Times and Calculate Total
*/
function compareActivities(element, checked) {
    for (let j = 0; j < nodelistLabel.length; j++) {
        if (element.name !== nodelistLabel[j].name) {
            if (element.dataset.dayAndTime === nodelistLabel[j].dataset.dayAndTime) {
                nodelistLabel[j].disabled = checked
                if (checked) {
                    nodelistLabel[j].parentElement.style.background = "#eeeeee"
                } else {
                    nodelistLabel[j].parentElement.style.background = null
                }
            }
        }
    }
}

function calculateTotal(element, cost, checked) {
    if (checked) {
        total += cost;
        totalSum.innerHTML = `Total: $${total}`
        compareActivities(element, checked)
    } else {
        total = total - cost;
        totalSum.innerHTML = `Total: $${total}`
        compareActivities(element, checked)
    }
}

/* ========================
Call Functions
 ======================== */

// Select Name field - ready to enter
name.focus();

// Hide Other Job Role when loaded
document.getElementById("other-job-role").style.display = 'none';

// Disable Color dropdown
document.getElementById("color").disabled = true;

// Payments
paypal.hidden = true
bitcoin.hidden = true
payWith.getElementsByTagName('option')[1].selected = 'selected'

/* ========================
Helper  Functions
 ======================== */

// Function to style the field when exception happens
function fieldFormatting(element, elementHint, result) {
    if(result) {
        element.style.background = null;
        element.style.color = null;
        elementHint.style.display = null;
        ormSubmit = true
    } else {
        element.style.background = "red";
        element.style.color = "white";
        elementHint.style.display = "block";
        formSubmit = false
    }
}

/* ========================
Accessibility WCAG 2.1 AA
 ======================== */


for (let i=0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener('focus', (event) => {
        listLabels[i].classList.add("focus");
    });
    checkBoxes[i].addEventListener('blur', (event) => {
        listLabels[i].classList.remove("focus");
    });
}




/* ========================
Event Listeners (with part of WCAG 2.1 AA)
 ======================== */

/*
Event listener for Activities fieldset
*/
activities.addEventListener('click', (e) => {

    let x = e.target
    console.log(x.tagName)

    if (e.target.tagName === "INPUT") {
        if (e.target.checked) {
            calculateTotal(e.target, parseInt(e.target.dataset.cost), true)
        } else {
            calculateTotal(e.target, parseInt(e.target.dataset.cost), false)
        }
    }

});

/*
Event listener for Pay With
*/
payWith.onchange = paymentOption;

function paymentOption(e) {
    console.log(e.target.value)
    if (e.target.value === "paypal") {
        paypal.hidden = false
        bitcoin.hidden = true
        cCard.hidden = true
    } else if (e.target.value === "bitcoin") {
        bitcoin.hidden = false
        paypal.hidden = true
        cCard.hidden = true
    } else {
        bitcoin.hidden = true
        paypal.hidden = true
        cCard.hidden = false
    }
}

/*
Name Field Validation
*/
function checkNameField() {
    fieldFormatting(name, nameHint, true)
    if (!name.value.length) {
        name.value = "Name cannot be empty"
        fieldFormatting(name, nameHint, false)
        nameLabel.classList.add("not-valid");
        nameLabel.classList.remove("valid")
    } else if (name.value.length && name.value === "Please enter a name") {
        name.value = "Please enter a name"
        fieldFormatting(name, nameHint, false)
        nameLabel.classList.add("not-valid");
        nameLabel.classList.remove("valid");
    } else if (name.value.length && name.value === "Name cannot be empty") {
        name.value = "Please enter a name"
        fieldFormatting(name, nameHint, false)
        nameLabel.classList.add("not-valid");
        nameLabel.classList.remove("valid");
    } else {
        nameLabel.classList.remove("not-valid");
        nameLabel.classList.add("valid");
    }
}

/*
Email validation / RFC Standard
http://www.regular-expressions.info/email.html
console.log(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test('abc1@sds.co'));
*/

function checkEmailField() {
    fieldFormatting(email, emailHint, true)
    if (!email.value.length) {
        email.value = "Please enter an email"
        fieldFormatting(email, emailHint, false)
        emailLabel.classList.add("not-valid");
        emailLabel.classList.remove("valid");
    } else {
        let x = email.value
        console.log(x)

        if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(x)) {
            emailLabel.classList.remove("not-valid");
            emailLabel.classList.add("valid");
        } else {
            emailHint.style.display = "inline";
            email.style.background = "red";
        }
    }
}

// activities validation
function checkActivities() {
    atLeastChecked = false
    activitiesHint.style.display = "none";
    for (let i=0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            atLeastChecked = true
        }
    }
    if (!atLeastChecked) {
        activities.classList.add("not-valid"); // WCAG 2.1 AA
        activities.classList.remove("valid"); // WCAG 2.1 AA
        activitiesHint.style.display = "block";
        formSubmit = false
    } else {
        activities.classList.remove("not-valid"); // WCAG 2.1 AA
        activities.classList.add("valid"); // WCAG 2.1 AA
        formSubmit = true
    }
    console.log(atLeastChecked)
}



// cCard validation
function checkcCard() {
    if (isNaN(ccNumber.value)) {
        fieldFormatting(ccNumber, ccNumberHint, false)
    } else {
        if (13 <= ccNumber.value.length && ccNumber.value.length <= 16){
            fieldFormatting(ccNumber, ccNumberHint, true)
            ccNumberLabel.classList.remove("not-valid");
            ccNumberLabel.classList.add("valid");
        } else {
            fieldFormatting(ccNumber, ccNumberHint, false)
            ccNumberLabel.classList.add("not-valid");
            ccNumberLabel.classList.remove("valid");
        }
    }
}

// Zip validation
function checkZip() {
    if (isNaN(ccZip.value)) {
        fieldFormatting(ccZip, ccZipHint, false)
    } else {
        if (ccZip.value.length === 5){
            fieldFormatting(ccZip, ccZipHint, true)
            ccZipLabel.classList.remove("not-valid");
            ccZipLabel.classList.add("valid");
        } else {
            fieldFormatting(ccZip, ccZipHint, false)
            ccZipLabel.classList.add("not-valid");
            ccZipLabel.classList.remove("valid");

        }
    }
}

// Zip validation
function checkCVV() {
    if (isNaN(ccCVV.value)) {
        fieldFormatting(ccCVV, ccCVVHint, false)
    } else {
        if (ccCVV.value.length === 3){
            fieldFormatting(ccCVV, ccCVVHint, true)
            ccCVVLabel.classList.remove("not-valid");
            ccCVVLabel.classList.add("valid");
        } else {
            fieldFormatting(ccCVV, ccCVVHint, false)
            ccCVVLabel.classList.add("not-valid");
            ccCVVLabel.classList.remove("valid");
        }
    }
}

/*
Validate fields while typing
Name, Email / Activites / CC card / Zip / CVV
*/
name.addEventListener("input", checkNameField);
email.addEventListener("input", checkEmailField);
activities.addEventListener("input", checkActivities);
ccNumber.addEventListener("input", checkcCard);
ccZip.addEventListener("input", checkZip);
ccCVV.addEventListener("input", checkCVV);

// Complete form validation
form.addEventListener("submit", function(e){ // event into anonymous function
    console.log(e.target)
    e.preventDefault(); //Prevent submit event from refreshing the page
    checkNameField()
    checkEmailField()
    checkActivities()
    checkcCard()
    checkZip()
    checkCVV()

    if (formSubmit) {
        form.submit()
    }
})
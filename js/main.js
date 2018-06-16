//Questions Array
const questions = [
    { question: 'Enter your First Name'},
    { question: 'Enter your Last Name'},
    { question: 'Enter your Email Address', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create a Password', type: 'password'}
];


//Transition Times
const shakeTime = 100; //Shake transistion time
const switchTime = 200; //Transition between questions

//Initialize at First Question
let position = 0;

//Initialize DOM Elements

const formBox = document.getElementById('#form-box');
const prevBtn = document.getElementById('#prev-btn');
const nextBtn = document.getElementById('#next-btn');
const inputField = document.getElementById('#input-field');
const inputLabel = document.getElementById('#input-label');
const inputGroup = document.getElementById('#input-group');
const inputProgress = document.getElementById('#input-progress');
const progressBar = document.getElementById('#progress-bar');


//EVENTS


//Get Questions on DOM Load

document.addEventListener('DOMContentLoaded', getQuestion);

//Next Button Click

nextBtn.addEventListener('click', validate);



//FUNCTIONS


//Get Question from Array and add to Markup
function getQuestion() {
    //Get Current Question
    inputLabel.innerHTML = questions[position].question;
    //Get current Type
    inputField.type = questions[position].type || 'text';
    //Get Current Answer
    inputField.value = questions[position].answer || '';
    //Focus on the current element
    inputField.focus();

    //Set Progress Bar Width - Variable to the Questions Length
    progressBar.style.width = (position * 100)/ questions.length + '%';

    //Add user Icon or Back Arrow depending on the question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

//Hide Question

function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

//Transform to create Shake Motion 
function transform(x,y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

//Validate Field

function validate() {
    //Make sure pattern matches if there is one
    if(!inputField.value.match(questions.[position].pattern || /.+/)){
        inputFail();
    } else {
        inputPass();
    }
}

//Field input Fail
function inputFail() {
    formBox.className = 'error';
    //Repeat shake Motion  - set i to number of shakes
    for(let i=0; i<6; i++){
        setTimeout(transform, shakeTime * i, ((i%2) * 2 - 1) * 20, 0)
    }
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
}

//Field input Pass
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime, 0, 0, 10);
    setTimeout(transform, shakeTime, 0, 0);
}
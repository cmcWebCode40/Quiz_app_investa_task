8//***Globale DOM elements..
const userName = document.querySelector(".active-name");
const container = document.querySelector(".container");
const nextBtn = document.querySelector(".next-btn");
const submit = document.querySelector(".submit");
const start = document.querySelector(".start-btn");
const radioBtn = document.getElementsByName("options");
const questionBox = document.querySelector(".questions-box");
const restart = document.querySelector(".restart");
const readyToPlay = document.querySelector(".ready");

const scores = [];
const form = document.querySelector("#form");

const displayAndHiddenElements = (target, type) => {
    const displayType = (target.style.display = String(type));
    return displayType;
};

displayAndHiddenElements(submit, "none");
displayAndHiddenElements(restart, "none");
displayAndHiddenElements(questionBox, "none");
displayAndHiddenElements(nextBtn, "none");

form.addEventListener("submit", e => {
    e.preventDefault();
    localStorage.setItem("name", JSON.stringify(userName.value));
    userName.value = "";
    displayAndHiddenElements(form, "none");
    displayAndHiddenElements(questionBox, "block");
    displayAndHiddenElements(readyToPlay, "none");
    displayAndHiddenElements(nextBtn, "block");
});

const displayHighScore = element => {
    const getNewScore = JSON.parse(localStorage.getItem("highscore"));
    const highScore = document.querySelector(element);
    const score = document.createElement("div");

    if (getNewScore) {
        highScore.innerHTML = "";
        score.innerHTML = `<span>${getNewScore}</span>`;
        highScore.append(score);
    } else {
        highScore.innerHTML = "";
        score.innerHTML = `<span>${0}</span>`;
        highScore.append(score);
    }
};

window.addEventListener("load", () => {
    displayHighScore(".user-score");
});

const allQuizQuestions = [{
    q1: "1. Which of the following input control is used for input fields that should contain an e-mail address in Web Form 2.0?",
    a: "email",
    b: "url",
    c: "text",
    d: "number",
    answer: "email"
},
{
    q1: "2. Which of the following tag automatically focus one particular form field in HTML5?",
    a: "output",
    b: "placeholder",
    c: "autofocus",
    d: "required",
    answer: "autofocus"
},
{
    q1: "3. Which of the following attribute triggers an abort event?  ",
    a: "offline",
    b: "onabort",
    c: "abort",
    d: "onbeforeonload",
    answer: "onabort"
},
{
    q1: "4. Which of the following attribute triggers event when an element has been dragged to a valid drop target? ",
    a: "ondragleave",
    b: " ondrag",
    c: "ondragend",
    d: "ondragenter",
    answer: "ondragenter"
},
{
    q1: "5. Which of the following attribute triggers event at the start of a drag operation?",
    a: "ondragleave",
    b: " ondrag",
    c: "ondragover",
    d: "ondragstart",
    answer: "ondragstart"
},
{
    q1: "6. Which of the following attribute triggers event before the document is printed?",
    a: "onbeforeprint",
    b: " onafterprint",
    c: "onprint",
    d: "before",
    answer: "onbeforeprint"
},
{
    q1: "7.  Which of the following attribute triggers event when the window gets focus?",
    a: "focus",
    b: " onfocus",
    c: "onformchange",
    d: "onformminput",
    answer: "onfocus"
},
{
    q1: "8. Which of the following attribute triggers event when the document comes online?",
    a: "onloadedmetadata",
    b: " onloadstart",
    c: "onmessage",
    d: "ononline",
    answer: "ononline"
},
{
    q1: "9. Which of the following attribute specifies if the element must have it's spelling or grammar checked?",
    a: "item",
    b: " itemcheck",
    c: "spellcheck",
    d: "itemgroup",
    answer: "spellcheck"
},
{
    q1: "10.  Are HTML tags case sensitive?",
    a: "true",
    b: "false",
    c: "all of the above",
    d: "none",
    answer: "false"
}
];

let questionCount = 0;
const result = allQuizQuestions[questionCount];

const appendQuestions = counter => {
    const questionsOutput = allQuizQuestions[counter];

    const quizBox = document.createElement("div");
    quizBox.className = "quiz";
    questionBox.innerHTML = "";
    quizBox.innerHTML = `<div class="question-space">${questionsOutput.q1} </div
    >
   
    <div><input type="radio" name="options" class="radio-btn"   value=${questionsOutput.a}> <span class="answer-options"> ${questionsOutput.a}</sapn></div>
    <div> <input type="radio" name="options" class="radio-btn"  value=${questionsOutput.b}> <span class="answer-options"> ${questionsOutput.b}</sapn></div>
    <div> <input type="radio" name="options" class="radio-btn"  value=${questionsOutput.c}> <span class="answer-options"> ${questionsOutput.c}</sapn></div>
    <div> <input type="radio" name="options" class="radio-btn"  value=${questionsOutput.d}> <span class="answer-options"> ${questionsOutput.d}</sapn></div>`;
    questionBox.append(quizBox);
};

const updateQuestions = () => {
    appendQuestions(questionCount);
};

const initializeQuiz = (() => {
    appendQuestions(0);
})();

const moveToNextQuestion = (() => {
    nextBtn.addEventListener("click", e => {
        for (i = 0; i < radioBtn.length; i++) {
            if (radioBtn[i].checked === true) {
                const selectedAnswer = radioBtn[i].value;
                if (selectedAnswer === allQuizQuestions[questionCount].answer) {
                    scores.push(2);
                } else {
                    scores.push(0);
                }
            }
        }
        if (questionCount >= 9) {
            displayAndHiddenElements(nextBtn, "none");
            displayAndHiddenElements(submit, "block");
            return;
        } else {
            questionCount++;
            updateQuestions();
        }
    });
})();

const displayResult = () => {
    const getNewScore = JSON.parse(localStorage.getItem("score"));
    const getNewName = JSON.parse(localStorage.getItem("name"));
    const user = document.querySelector(".profile-score");
    const quizResult = document.createElement("div");
    displayAndHiddenElements(questionBox, "none");
    quizResult.className = "quiz-result";
    quizResult.innerHTML = ` <h3 class="score-name"><span>Name:</span>${getNewName}</h3>
        <div class="result"> <span>Score :</span> ${getNewScore}</div>`;
    user.append(quizResult);
};

submit.addEventListener("click", e => {
    e.preventDefault();
    const totalScores = scores.reduce((a, b) => {
        return a + b;
    }, 0);
    if (scores.length !== 0) {
        localStorage.setItem("score", JSON.stringify(totalScores));
        const highMark = JSON.parse(localStorage.getItem("highscore"));
        displayAndHiddenElements(submit, "none");
        displayAndHiddenElements(restart, "block");
        displayResult();
        if (totalScores >= highMark) {
            localStorage.setItem("highscore", JSON.stringify(totalScores));
            displayHighScore(".user-score");
        } else {
            return;
        }
    } else {
        const user = document.querySelector(".profile-score");
        const getUserName = JSON.parse(localStorage.getItem("name"));
        const quizResult = document.createElement("div");
        displayAndHiddenElements(questionBox, "none");
        quizResult.innerHTML = ` <h3 class="score-name"><span>Name:</span>${getUserName}</h3>
            <div class="result"> <span>Score:</span> ${0}</div>`;
        user.append(quizResult);
        displayAndHiddenElements(submit, "none");
        displayAndHiddenElements(restart, "block");
    }
});


const userName = document.querySelector(".active-name");
const container = document.querySelector(".container");
const nextBtn = document.querySelector(".next-btn");
const submit = document.querySelector(".submit");
const start = document.querySelector(".start-btn");
const radioBtn = document.getElementsByName("options");
const questionBox = document.querySelector(".questions-box");
const restart = document.querySelector(".restart");
const readyToPlay = document.querySelector(".ready");

submit.style.display = "none";
restart.style.display = "none";
questionBox.style.display = "none";

const scores = [];
const form = document.querySelector("#form");

// //L****Local storage files****//
// const getScore = JSON.parse(localStorage.getItem("score"));
// const getUserName = JSON.parse(localStorage.getItem("name"));

form.addEventListener("submit", e => {
    e.preventDefault();
    localStorage.setItem("name", JSON.stringify(userName.value));
    userName.value = "";
    form.style.display = "none";
    questionBox.style.display = "block";
    readyToPlay.style.display = "none";
});


const displayHighScore = () => {
    const getNewScore = JSON.parse(localStorage.getItem("score"));
    const highScore = document.querySelector(".user-score");
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
    displayHighScore();
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
    }
];

let questionCount = 0;
const result = allQuizQuestions[questionCount];

const appendQuestions = value => {
    const result = allQuizQuestions[value];

    const quizBox = document.createElement("div");
    quizBox.className = "quiz";
    questionBox.innerHTML = "";
    quizBox.innerHTML = `<p class="question-space">${result.q1} </p>
    <input type="radio" name="options" class="radio-btn"   value=${result.a}> <span class="answer-options"> ${result.a}</sapn>
    <input type="radio" name="options" class="radio-btn"  value=${result.b}> <span class="answer-options"> ${result.b}</sapn>
    <input type="radio" name="options" class="radio-btn"  value=${result.c}> <span class="answer-options"> ${result.c}</sapn>
    <input type="radio" name="options" class="radio-btn"  value=${result.d}> <span class="answer-options"> ${result.d}</sapn>`;
    questionBox.append(quizBox);
};

const updateQuestions = () => {
    appendQuestions(questionCount);
};

const initializeQuiz = (() => {
    appendQuestions(0);
})();

console.log("hello");

const moveToNextQuestion = (() => {
    nextBtn.addEventListener("click", e => {
        for (i = 0; i < radioBtn.length; i++) {
            if (radioBtn[i].checked === true) {
                const element = radioBtn[i].value;
                if (element === allQuizQuestions[questionCount].answer) {
                    scores.push(1);
                } else {
                    scores.push(0);
                }
            }
        }
        if (questionCount >= 4) {
            nextBtn.style.display = "none";
            submit.style.display = "block";
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
    questionBox.style.display = "none";
    quizResult.className = "quiz-result";
    quizResult.innerHTML = ` <h3 class="score-name"><span>Name:</span>${getNewName}</h3>
        <div class="result"> <span>Score :</span> ${getNewScore}</div>`;
    user.append(quizResult);
    displayHighScore();

};

submit.addEventListener("click", e => {
    e.preventDefault();
    if (scores.length !== 0) {
        const totalScores = scores.reduce((a, b) => {
            return a + b;
        }, 0);
        localStorage.setItem("score", JSON.stringify(totalScores));
        displayResult();
        submit.style.display = "none";
        restart.style.display = "block";
    } else {
        const user = document.querySelector(".profile-score");
        const getUserName = JSON.parse(localStorage.getItem("name"));
        const quizResult = document.createElement("div");
        questionBox.style.display = "none";
        quizResult.innerHTML = ` <h3 class="score-name"><span>Name:</span>${getUserName}</h3>
            <div class="result"> <span>Score:</span> ${0}</div>`;
        user.append(quizResult);
        submit.style.display = "none";
        restart.style.display = "block";

    }
});
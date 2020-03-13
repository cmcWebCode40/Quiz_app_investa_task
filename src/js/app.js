const userName = document.querySelector(".active-name");
const container = document.querySelector(".container");
const nextBtn = document.querySelector(".next-btn");
const submit = document.querySelector(".submit");
const radioBtn = document.getElementsByName("options");
const startBtn = document.querySelector(".start-btn");
const questionBox = document.querySelector(".questions-box");
submit.style.display = "none"

const scores = [];
const form = document.querySelector("#form");
form.addEventListener("submit", e => {
    e.preventDefault();
    const storeUserName = localStorage.setItem(
        "name",
        JSON.stringify(userName.value)
    );
    userName.value = "";
    form.style.display = "none";
});



const allQuizQuestions = [{
        q1: "1.what is the opposite of come ?",
        a: "go",
        b: "come",
        c: "run",
        d: "near",
        answer: "go"
    },
    {
        q1: "2. what is the opposite of go ?",
        a: "go",
        b: "come",
        c: "run",
        d: "near",
        answer: "come"
    },
    {
        q1: "3. what is the opposite of run ?",
        a: "go",
        b: "come",
        c: "run",
        d: "near",
        answer: "run"
    },
    {
        q1: "4. what is the opposite of look ?",
        a: "go",
        b: "come",
        c: "run",
        d: "near",
        answer: "near"
    },
    {
        q1: "5. what is the opposite of cry ?",
        a: "go",
        b: "come",
        c: "run",
        d: "near",
        answer: "go"
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

console.log(allQuizQuestions);

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
            nextBtn.style.display = "none"
            submit.style.display = "block"
            return;

        } else {
            questionCount++;
            updateQuestions();
        }
    });
})();

const displayResult = () => {
    const user = document.querySelector(".profile-score");
    const getScore = JSON.parse(localStorage.getItem("score"))
    const getUserName = JSON.parse(localStorage.getItem("name"))
    const quizResult = document.createElement("div");
    questionBox.style.display = "none";
    quizResult.className = "quiz-result";
    quizResult.innerHTML = ` <h3 class="score-name"><span>Name:</span>${getUserName}</h3>
    <div class="result"> <span>Score :</span> ${getScore}</div>`
    user.append(quizResult)
}

submit.addEventListener("click", (e) => {
    e.preventDefault()
    if (scores.length !== 0) {
        const totalScores = scores.reduce((a, b) => {
            return a + b;
        }, 0);
        console.log(totalScores);
        localStorage.setItem("score", JSON.stringify(totalScores));
        displayResult();

    } else {
        console.log("you score zero");
    }
});
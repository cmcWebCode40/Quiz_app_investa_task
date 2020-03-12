const userName = document.querySelector(".active-name");
const nextBtn = document.querySelector(".next-btn");
const container = document.querySelector(".container");
let val = "mike";
const radioBtn = document.querySelector(`input[value=${val}`);
const radioBtn1 = document.querySelector(`option-btn`)



const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const storeUserName = localStorage.setItem("name", JSON.stringify(userName.value))
    userName.value = "";
})


const allQuizQuestions = [
    { q1: "what is the opposite of come ?", a: "go", b: "come", c: "run", d: "near" },
    { q1: "what is the opposite of go ?", a: "go", b: "come", c: "run", d: "near" },
    { q1: "what is the opposite of run ?", a: "go", b: "come", c: "run", d: "near" },
    { q1: "what is the opposite of look ?", a: "go", b: "come", c: "run", d: "near" },
    { q1: "what is the opposite of cry ?", a: "go", b: "come", c: "run", d: "near" }
]

let questionCount = 0
const result = allQuizQuestions[questionCount];

const appendQuestions = (value) => {
    const result = allQuizQuestions[value]
    const questionBox = document.querySelector(".questions-box");
    const quizBox = document.createElement("div");
    quizBox.className = "";
    questionBox.innerHTML = "";
    quizBox.innerHTML = `<p>${result.q1}
    <input type="radio"  value=${result.a}> ${result.a}
    <input type="radio" value=${result.a}> ${result.b}
    <input type="radio" value=${result.a}> ${result.c}
    <input type="radio" value=${result.a}> ${result.d}`
        // container.insertBefore(quizBox, nextBtn)
    questionBox.append(quizBox)
}

const updateQuestions = () => {
    appendQuestions(questionCount)
}

const initializeQuiz = (() => {
    appendQuestions(0)
})()


// if (radioBtn.checked) {
//     radioBtn.checked = false;
//     console.log("confrimed");
// } else {
//     radioBtn.checked = true;
//     console.log("no answer");
// }
nextBtn.addEventListener("click", () => {
    if (radioBtn.checked) {
        console.log("confrimed");
    } else {
        console.log("no answer");
    }

    if (questionCount === 4) {
        return
    } else {
        questionCount++;
        updateQuestions();
    }

});

// radioBtn.addEventListener("click", (e) => {
//     const target = e.target.value
// })
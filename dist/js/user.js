const displayHighScore = (element) => {
    const getNewScore = JSON.parse(localStorage.getItem("highscore"));
    const getNewName = JSON.parse(localStorage.getItem("name"));
    const highScore = document.querySelector(element);
    const user = document.querySelector(".user-page");
    const score = document.createElement("div");

    if (getNewScore) {
        score.innerHTML = ` <h3 class="user-name"><span> <i>Hello</i>   </span>${getNewName}</h3>
        <div class="user-score"> <span>HighScore :</span> ${getNewScore}</div>`;
        user.append(score);
    } else {
        highScore.innerHTML = "";
        score.innerHTML = `<span>${0}</span>`;
        highScore.append(score);
    }
};
displayHighScore(".user-page");
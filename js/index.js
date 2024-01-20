const myButton = document.querySelector(".btn button");
const rulesBox = document.querySelector(".rulesBox");
const exitButton = document.querySelector(".buttons .exitBtn");
const continueButton = document.querySelector(".buttons .continueBtn");
const questions = document.querySelector(".questions");
const nextButton = document.querySelector(".nextBtn");
const optionList = document.querySelector(".myOptions");
const timeCount = document.querySelector(".timeCount .second");
const timeLine = document.querySelector(".questionHeader .timeLine");
const resultBox = document.querySelector(".resultBox");
const restartButton = document.querySelector(".buttons .restart1");
const quitQuiz = document.querySelector(".buttons .quit");

myButton.onclick = () => {
  rulesBox.classList.add("activeInfo");
};

exitButton.onclick = () => {
  rulesBox.classList.remove("activeInfo");
};

continueButton.onclick = () => {
  rulesBox.classList.remove("activeInfo");
  questions.classList.add("activeQuiz");

  showQuestions(0);
  startTimer(15);
  startTimerLine(0);
};

quitQuiz.onclick = () => {
  window.location.reload();
};

restartButton.onclick = () => {
  resultBox.classList.remove("activeResult");
  questions.classList.add("activeQuiz");
  let allOptions = optionList.children.length;

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("enabled")
};

showQuestions(quesCount);
clearInterval(counter);
startTimer(timeValue);

clearInterval(counterLine);
startTimerLine(widthValue);
};

let quesCount = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

nextButton.onclick = () => {
  if (quesCount < myQuestions.length - 1) {
    quesCount++;
    showQuestions(quesCount);
    clearInterval(counter);
    startTimer(timeValue);

    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextButton.style.display = "none";
  } else {
    console.log("You have successfully completed your tasks. :)");
    showResultBox();
  }
};

function showQuestions(index) {
  const quesText = document.querySelector(".textTwo");
  const optionList = document.querySelector(".myOptions");
  const totalQues = document.querySelector(".totalQuestion");

  let quesTag =
    `<span>` +
    "" +
    myQuestions[index].number +
    "." +
    myQuestions[index].question +
    `</span>`;
  quesText.innerHTML = quesTag;
  let optionTag =
    `<div class="option">` +
    myQuestions[index].Options[0] +
    `</div>` +
    `<div class="option">` +
    myQuestions[index].Options[1] +
    `</div>` +
    `<div class="option">` +
    myQuestions[index].Options[2] +
    `</div>` +
    `<div class="option">` +
    myQuestions[index].Options[3] +
    `</div>`;
  optionList.innerHTML = optionTag;

  let totalQuesTag =
    `<p>` + myQuestions[index].number + " " + "Of 5 Questions" + `</p>`;
  totalQues.innerHTML = totalQuesTag;

  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = `<div class="tickIcon">
<i class="fas fa-check"></i>
</div>`;
let crossIcon = ` <div class="crossIcon">
<i class="fas fa-times"></i>
  </div>`;

function optionSelected(answer) {
  clearInterval(counterLine);
  clearInterval(counter);
  let userAnswer = answer.textContent;
  let correctAnswer = myQuestions[quesCount].answer;
  let allOptions = optionList.children.length;
  if (userAnswer == correctAnswer) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is Correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is Wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextButton.style.display = "block";
}

function showResultBox() {
  rulesBox.classList.remove("activeInfo");
  questions.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = document.querySelector(".scoreText");

  if (userScore > 3) {
    let scoreTag =
      "<span>Congratulations! You win! You Got <p>" +
      userScore +
      "</p> Out Of <p>" +
      myQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>oho! Carry On 👌 You Got <p>" +
      userScore +
      "</p> Out Of <p>" +
      myQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>Uhh! I Am  Sorry! You Got <p>" +
      userScore +
      "</p> Out Of <p>" +
      myQuestions.length +
      "</p></span>";

    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      nextButton.style.display = "block";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 41);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";

    if (time > 319) {
      clearInterval(counterLine);
    }
  }
}
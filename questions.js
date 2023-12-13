const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 60;
let timePassed = 1;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
    </svg>
    
   
    <span id="base-timer-label" class="base-timer__label">
    ${formatTime(timeLeft)} 
  </span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function startTimer() {
  timeLeft = TIME_LIMIT;
  timePassed = 0;
  timerInterval = null;
  let baseTimerLabel = document.getElementById("base-timer-label");
  baseTimerLabel.innerHTML = formatTime(timeLeft);
  setCircleDasharray();
  timerInterval = setInterval(() => {
    timeLeft = TIME_LIMIT - timePassed;
    timePassed += 1;
    baseTimerLabel.innerHTML = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      checkUserAnswer();
    }
  }, 1000);
}

function formatTime(time) {
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `${seconds}`;
  }

  return `${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

window.onload = function () {
  appendQuestion(0);
  appendAnswers(0);
  questionCurrentValue(0);
};

//con la funzione appendQuestion prendo le domande dell'array questions

const appendQuestion = (n) => {
  const onScreenQuestion = document.getElementById("question");
  onScreenQuestion.innerText = questions[n].question;
};

//con la funzione allTheAnswers pusho nell'array "answersArray" le risposte

const allTheAnswers = (n) => {
  const answersArray = [];
  answersArray.push(questions[n].correct_answer);
  if (questions[n].type === "multiple") {
    for (let i = 0; i < 3; i++) {
      answersArray.push(questions[n].incorrect_answers[i]);
    }
  } else {
    answersArray.push(questions[n].incorrect_answers[0]);
  }
  answersArray.sort();
  return answersArray;
};

//con la funzione resetBtnClick resetto la risposta cliccata in precedenza

const resetBtnClick = () => {
  const piallato = document.getElementsByClassName("btn");
  for (let i = 0; i < piallato.length; i++) {
    piallato[i].classList.remove("btn-clicked");
  }
};

const appendAnswers = (n) => {
  const answersArray = allTheAnswers(n);
  const answersContainer = document.getElementById("answers");
  answersContainer.innerHTML = ``;
  for (let i = 0; i < answersArray.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.innerText = answersArray[i];
    newDiv.classList.add("btn");
    newDiv.addEventListener("click", function (e) {
      resetBtnClick();
      newDiv.classList.add("btn-clicked");
    });
    answersContainer.appendChild(newDiv);
  }
};

//Con la funzione questionCurrentValue prendo l'ID counter e ci scrivo il numero di domande, n = 1 ---> 1/10 , 2/10 , 3/10 ...

const questionCurrentValue = (n) => {
  const currentValue = document.getElementById("counter");
  currentValue.innerHTML = `QUESTION ${n + 1}<span>/10</span></h3>`;
};

const checkUserAnswer = () => {
  if (n < 9) {
    let correctOne = questions[n].correct_answer;

    let userAnswer =
      document.getElementsByClassName("btn-clicked") &&
      document.getElementsByClassName("btn-clicked") > 0
        ? document.getElementsByClassName("btn-clicked")[0].innerText
        : "";
    if (userAnswer === correctOne) {
      nCorrect += 1;
    }
    n += 1;
    appendQuestion(n);
    appendAnswers(n);
    questionCurrentValue(n);
    onTimesUp();
    startTimer();
  } else {
    let correctOne = questions[n].correct_answer;
    let userAnswer =
      document.getElementsByClassName("btn-clicked") &&
      document.getElementsByClassName("btn-clicked") > 0
        ? document.getElementsByClassName("btn-clicked")[0].innerText
        : "";
    if (userAnswer === correctOne) {
      nCorrect += 1;
    }
    n += 1;

    window.location.assign("./resultsPage.html");
  }
};

let n = 0;
let nCorrect = 0;

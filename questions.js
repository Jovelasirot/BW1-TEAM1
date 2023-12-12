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
  // TIPS:

  // SE MOSTRI TUTTE LE RISPOSTE ASSIEME IN FORMATO LISTA:
  // Per ogni domanda, crea un container e incorporale tutte all'interno.
  // Crea poi dei radio button
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
  // con le risposte corrette e incorrette come opzioni
  // (dovrai probabilmente cercare su un motore di ricerca come ottenere un valore da un radio button in JS per ottenere il punteggio finale)
  //
  // SE MOSTRI UNA DOMANDA ALLA VOLTA:
  // Mostra la prima domanda con il testo e i radio button.
  // Quando l'utente seleziona una risposta, passa alla domanda successiva dell'array e sostituisci quella precedentemente visualizzata con quella corrente,
  // salvando le risposte dell'utente in una variabile
  appendQuestion(0);
  appendAnswers(0);
  questionCurrentValue(0);
};

const appendQuestion = (n) => {
  const onScreenQuestion = document.getElementById("question");
  onScreenQuestion.innerText = questions[n].question;
};

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

const piallaTutto = () => {
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
      piallaTutto();
      newDiv.classList.add("btn-clicked");
    });
    answersContainer.appendChild(newDiv);
  }
};

const questionCurrentValue = (n) => {
  const currentValue = document.getElementById("counter");
  currentValue.innerHTML = `QUESTION ${n + 1}<span>/10</span></h3>`;
};

const checkUserAnswer = () => {
  if (n !== 9) {
    let correctOne = questions[n].correct_answer;
    let userAnswer;
    userAnswer = document.getElementsByClassName("btn-clicked")[0].innerText;
    console.log(userAnswer);
    if (userAnswer === correctOne) {
      nCorrect += 1;
    }
    n += 1;
    console.log(nCorrect);
    appendQuestion(n);
    appendAnswers(n);
    questionCurrentValue(n);
  } else {
    let correctOne = questions[n].correct_answer;
    let userAnswer;
    userAnswer = document.getElementsByClassName("btn-clicked")[0].innerText;
    if (userAnswer === correctOne) {
      nCorrect += 1;
    }
    n += 1;
    window.location.assign("./resultsPage.html");
  }
};

let n = 0;
let nCorrect = 0;

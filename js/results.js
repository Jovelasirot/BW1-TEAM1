const resultsFromOtherPage = localStorage.getItem("myResults");

console.log(resultsFromOtherPage);

const modifyCorrectPercentage = () => {
  const correctPercentage = document.getElementById("correct-percentage");
  let userCorrectPercentage = (resultsFromOtherPage / 10) * 100;
  correctPercentage.innerHTML = `        Correct <br />
  <b>${userCorrectPercentage}%</b> <br />
  <span class="perc-results"> ${resultsFromOtherPage}/10 questions </span>`;
};

const modifyWrongPercentage = () => {
  const wrongPercentage = document.getElementById("wrong-percentage");
  let userWrongPercentage = ((10 - resultsFromOtherPage) / 10) * 100;
  wrongPercentage.innerHTML = `        Wrong <br />
  <b>${userWrongPercentage}%</b> <br />
  <span class="perc-results"> ${
    10 - resultsFromOtherPage
  }/10 questions </span>`;
};

const passedOrNot = () => {
  const passed = document.getElementById("passed");
  if (resultsFromOtherPage >= 6) {
    passed.innerHTML = `Congratulations! <br />
    <span class="congrat-text">You passed the exam. Polar bears survived.</span>`;
  } else if (resultsFromOtherPage > 4) {
    passed.innerHTML = `Almost there! <br />
    <span class="congrat-text">You were close to pass the exam. Only one polar bear got killed.</span>`;
  } else {
    passed.innerHTML = `You failed! <br />
    <span class="congrat-text">Study harder next time. Polar bears have died in vain.</span>`;
  }
};

const certificated = () => {
  const certified = document.getElementById("certificate");
  if (resultsFromOtherPage < 6) {
    certified.innerHTML = ``;
  }
};

modifyCorrectPercentage();

modifyWrongPercentage();

passedOrNot();

certificated();

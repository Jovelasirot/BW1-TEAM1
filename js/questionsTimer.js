const timer = document.querySelector(".timer");
const semicircle = document.querySelectorAll(".semicircle");
const sec = 15;

const seconds = sec * 1000;
const setTime = seconds;
const starTime = Date.now();
const futureTime = starTime + seconds;

const countDownTimer = () => {
  const currentTime = Date.now();
  const remainingTime = futureTime - currentTime;
  const angle = (remainingTime / setTime) * -360;

  if (angle > -180) {
    semicircle[2].style.display = "none";
    semicircle[0].style.transform = "rotate(-180deg)";
    semicircle[1].style.transform = `rotate(${angle}deg)`;
  } else {
    semicircle[2].style.display = "block";
    semicircle[0].style.transform = `rotate(${angle}deg)`;
    semicircle[1].style.transform = `rotate(${angle}deg)`;
  }

  const secs = Math.floor((remainingTime / 1000) % 60);

  timer.innerHTML = ` 
  <div class="timerText">SECONDS</div>
  <div>${secs < 10 ? "0" + secs : secs}</div>
  <div class="timerText">REMAINING</div>`;

  if (remainingTime < 10 * 1000) {
    timer.style.color = "red";
  }
  if (remainingTime < 0) {
    clearInterval(timerLoop);
    semicircle[0].style.display = "none";
    semicircle[1].style.display = "none";
    semicircle[2].style.display = "none";
    timer.innerHTML = `<div class="timerText">SECONDS</div>
   <div>00</div>
  <div class="timerText">REMAINING</div>`;
  } else {
  }
};

countDownTimer();
const timerLoop = setInterval(countDownTimer);

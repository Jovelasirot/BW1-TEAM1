window.onload = () => {
  const stars = document.querySelectorAll("svg path");
  function resetColor() {
    let starsToReset = document.querySelectorAll("svg path");
    for (let i = 0; i < starsToReset.length; i++) {
      starsToReset[i].setAttribute("fill", "#000000");
    }
  }

  for (let i = 0; i < stars.length; i++) {
    stars[i].id = `star_${i}`;
    stars[i].addEventListener("click", function (event) {
      resetColor();
      let star = event.target;
      let currentStar = Number(star.id.replace("star_", ""));
      for (let j = 0; j <= currentStar; j++) {
        let starToColor = stars[j];
        let color = starToColor.getAttribute("fill");
        if (color == "#000000") {
          starToColor.setAttribute("fill", "#00ffff");
        } else {
          starToColor.setAttribute("fill", "#000000");
        }
      }
    });
  }

  const inputElement = document.getElementById("text_comment");

  inputElement.addEventListener("input", function () {
    let inputValue = inputElement.value;

    let capitalizedValue = inputValue.replace(/\b\w/, function (match) {
      return match.toUpperCase();
    });

    inputElement.value = capitalizedValue;
  });
};

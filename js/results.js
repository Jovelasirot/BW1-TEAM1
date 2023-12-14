const resultsFromOtherPage = localStorage.getItem('myResults')

console.log(resultsFromOtherPage)

const modifyCorrectPercentage = () => {
  const correctPercentage = document.getElementById('correct-percentage')
  let userCorrectPercentage = (resultsFromOtherPage / 10) * 100
  correctPercentage.innerHTML = `       
  <span class="percentageFirst">Correct</span>
  <span class="percentageSecond">${userCorrectPercentage}%</span>
  <span class="percentageThird">${resultsFromOtherPage}/10 questions </span>`
}

const modifyWrongPercentage = () => {
  const wrongPercentage = document.getElementById('wrong-percentage')
  let userWrongPercentage = ((10 - resultsFromOtherPage) / 10) * 100
  wrongPercentage.innerHTML = `       
  <span class="percentageFirst">Wrong</span>
  <span class="percentageSecond">${userWrongPercentage}%</span>
  <span class="percentageThird">${
    10 - resultsFromOtherPage
  }/10 questions</span>`
}

const passedOrNot = () => {
  const passed = document.getElementById('passed')
  if (resultsFromOtherPage >= 6) {
    passed.innerHTML = `<span id="congratTextCongrats">Congratulations! </span>
    <span id="congrat-textPassed">You passed the exam. <br />Polar bears survived.</span>
    <p id="certificate" ">
    We'll send you the certificate <br />
    in few minutes. <br />
    Check your email (incuding <br />
    promotions / spam folder)
  </p>`
  } else if (resultsFromOtherPage > 4) {
    passed.innerHTML = `<span class="notPassed">Almost there!</span><br />
    <span class="notPassed-text">You were close to pass the exam. <br />Only a polar bear got killed.</span>`
  } else {
    passed.innerHTML = `<span class="notPassed">You failed!</span><br />
    <span class="notPassed-text">Study harder next time. Polar bears have died in vain.</span>`
  }
}

modifyCorrectPercentage()

modifyWrongPercentage()

passedOrNot()

// Donut JS

window.chartColors = {
  right: 'rgb(210, 0, 148)',
  wrong: 'rgb(0, 255, 255)',
}

Chart.defaults.global.tooltips.custom = function (tooltip) {
  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip')

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }

  // Set Text
  if (tooltip.body) {
    let total = 0

    // get the value of the datapoint
    let value =
      this._data.datasets[tooltip.dataPoints[0].datasetIndex].data[
        tooltip.dataPoints[0].index
      ].toLocaleString()

    // calculate value of all datapoints
    this._data.datasets[tooltip.dataPoints[0].datasetIndex].data.forEach(
      function (e) {
        total += e
      }
    )

    // calculate percentage and set tooltip value
    tooltipEl.innerHTML = '<h1>' + (value / total) * 100 + '%</h1>'
  }

  // calculate position of tooltip
  let centerX =
    (this._chartInstance.chartArea.left + this._chartInstance.chartArea.right) /
    2
  let centerY =
    (this._chartInstance.chartArea.top + this._chartInstance.chartArea.bottom) /
    2

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1
  tooltipEl.style.left = centerX + 'px'
  tooltipEl.style.top = centerY + 'px'
  tooltipEl.style.fontFamily = tooltip._fontFamily
  tooltipEl.style.fontSize = tooltip.fontSize
  tooltipEl.style.fontStyle = tooltip._fontStyle
  tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px'
}

let config = {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [`${10 - resultsFromOtherPage}`, `${resultsFromOtherPage}`],
        backgroundColor: [window.chartColors.right, window.chartColors.wrong],
      },
    ],
    labels: [],
  },
  options: {
    responsive: true,
    legend: {
      display: true,
      labels: {
        padding: 20,
      },
    },
    tooltips: {
      enabled: false,
    },
  },
}

window.onload = function () {
  let ctx = document.getElementById('chart-area').getContext('2d')
  window.myPie = new Chart(ctx, config)
}

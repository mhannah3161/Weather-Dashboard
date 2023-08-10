var city = document.querySelector("#cityInput")
var search = document.querySelector("#submit")
var searchHistory = []
var pastSearches = document.querySelector("#table-container")
var cardCont = document.querySelector(".card-content")




function addHistory(cityName) {
  if (searchHistory.includes(cityName)) {
    return
  }
  searchHistory.push(cityName)
  localStorage.setItem("search-history", searchHistory)
  renderHistory()
}

function renderHistory() {
  pastSearches.innerHTML = ""
  for (let index = 0; index < searchHistory.length; index++) {

    var btn = document.createElement("button")
    btn.textContent = searchHistory[index]
    pastSearches.append(btn)
  }
  // Add in click button to search city again
}

function getCity(event) {
  event.preventDefault()
  var location = city.value
  var locReq = `http://api.weatherapi.com/v1/current.json?key=d7f970a3477a4683ba1131235230708&q=${location}&aqi=no`
  fetch(locReq)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      addHistory(location)
    }
    )
}

function getForecast(event) {
  event.preventDefault()
  var location = city.value
  // var forecastInfo= forecast.forecastday[1,2,3,4,5]
  var forecastReq = `http://api.weatherapi.com/v1/forecast.json?key=d7f970a3477a4683ba1131235230708&q=${location}&days=6&aqi=no`
  fetch(forecastReq)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data.forecast.forecastday)
      cardCont.innerHTML = ""
      for (let index = 1; index < 5; index++) {
        var forecastD = data.forecast.forecastday
        var pic = document.createElement("img")
        pic.src= (forecastD[index].day.condition.icon)
        var title = document.createElement("h3")
        title.textContent = (forecastD[index].date)
        var low = document.createElement("h4")
        low.textContent = ("Low of " + forecastD[index].day.mintemp_f)
        var high = document.createElement("h4")
        high.textContent = ("High of " + data.forecast.forecastday[index].day.maxtemp_f)
        cardCont.append(title)
        cardCont.append(pic)
        cardCont.append(high)
        cardCont.append(low)
      }
    })
  // renderForecast()
}

// function renderForecast() {
//   cardCont.innerHTML = ""
//   for (let index = 1; index < 5; index++) {
//     var title = document.createElement("h3")
//     title.textContent = ("hello")
//     cardCont.append(title)
//   }
// }


function startHistory() {
  var storedHistory = localStorage.getItem(searchHistory)
  if (storedHistory) {
    searchHistory = storedHistory
    console.log(searchHistory)
  }
  renderHistory()
}

form.addEventListener("submit", getCity)
form.addEventListener("submit", getForecast)
startHistory()



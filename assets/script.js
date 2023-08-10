var city = document.querySelector("#cityInput")
var search = document.querySelector("#submit")
var searchHistory = []
var pastSearches = document.querySelector("#table-container")
var cardCont = document.querySelector(".card-content")
var currentCityData = document.querySelector("#current-city-data")
var mainIcon = document.querySelector("#icon")




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
  var locReq = `https://api.weatherapi.com/v1/current.json?key=d7f970a3477a4683ba1131235230708&q=${location}&aqi=no`
  fetch(locReq)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      currentCityData.innerHTML = ""
      console.log(data)
      addHistory(location)
      var city = document.createElement("h2")
      city.textContent = (location)
      var day = document.createElement("h3")
      var date = new Date()
      console.log(date)
      var currentMonth = date.getMonth() + 1
      var currentDate = date.getDate()
      var fullDate = (`${currentMonth} / ${currentDate}`)
      console.log(fullDate)
      day.textContent = (fullDate)
      var temp = document.createElement("h3")
      temp.textContent = (data.current.temp_f + "\xB0")
      var humidity = document.createElement("h3")
      humidity.textContent = ("Humidity of " + data.current.humidity + " %")
      var wind = document.createElement("h3")
      wind.textContent = ("Max wind speed of " + data.current.wind_mph + " MPH")
      currentCityData.append(city)
      currentCityData.append(day)
      currentCityData.append(temp)
      currentCityData.append(humidity)
      currentCityData.append(wind)
      var pic = document.createElement("img")
      var url = (data.current.condition.icon)
      var urlSplit = (url.split('/'))
      pic.src= ("./assets/pics/" + urlSplit[3] + "/" + urlSplit[4] + "/" + urlSplit[5] + "/" + urlSplit[6])
      mainIcon.append(pic)
    }
    )
}

function getForecast(event) {
  event.preventDefault()
  var location = city.value
  var forecastReq = `https://api.weatherapi.com/v1/forecast.json?key=d7f970a3477a4683ba1131235230708&q=${location}&days=6&aqi=no`
  fetch(forecastReq)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      cardCont.innerHTML = ""
      for (let index = 1; index < 5; index++) {
        var forecastD = data.forecast.forecastday
        var pic = document.createElement("img")
        var url = (forecastD[index].day.condition.icon)
        var urlSplit = (url.split('/'))
        pic.src= ("./assets/pics/" + urlSplit[3] + "/" + urlSplit[4] + "/" + urlSplit[5] + "/" + urlSplit[6])
        var cond = document.createElement("h4")
        cond.textContent = (data.forecast.forecastday[index].day.condition.text)
        var title = document.createElement("h3")
        title.textContent = (forecastD[index].date)
        var low = document.createElement("h4")
        low.textContent = ("Low of " + forecastD[index].day.mintemp_f)
        var high = document.createElement("h4")
        high.textContent = ("High of " + data.forecast.forecastday[index].day.maxtemp_f)
        var humidity = document.createElement("h4")
        humidity.textContent = ("Humidity of " + forecastD[index].day.avghumidity + " %")
        var wind = document.createElement("h4")
        wind.textContent = ("Max wind speed of " + forecastD[index].day.maxwind_mph + " MPH")
        cardCont.append(title)
        cardCont.append(cond)
        cardCont.append(pic)
        cardCont.append(high)
        cardCont.append(low)
        cardCont.append(humidity)
        cardCont.append(wind)
      }
    })
}




function startHistory() {
  var storedHistory = localStorage.getItem(searchHistory)
  if (storedHistory) {
    searchHistory = storedHistory
    console.log(searchHistory)
  }
  renderHistory()
}

function reSearch() {
  
}

form.addEventListener("submit", getCity)
form.addEventListener("submit", getForecast)


startHistory()




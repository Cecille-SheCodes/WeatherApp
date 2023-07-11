function searchCity(event) {
  event.preventDefault();

  let searchedCity = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerText = `${searchedCity.value}`;
  let apiKey = "e41d480a236e63c3ed66acc7310d68f6";
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.innerText}&units=metric&appid=${apiKey}`;
  axios.get(urlAPI).then(showWeather);
  axios.get(urlAPI).then(showDescription);
  axios.get(urlAPI).then(changeTime);
}

let searchForm = document.querySelector("#searchbar");
searchForm.addEventListener("submit", searchCity);

function showWeather(response) {
  console.log(response.data);
  Ctemperature = response.data.main.temp.toFixed(0);
  let temperature = Ctemperature;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;

  let rain = document.querySelector("#rain");
  let precipitation = response.data.rain
    ? response.data.rain["1h"].toFixed(1)
    : 0;
  rain.innerHTML = `${precipitation} mm Rain`;

  let humid = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humid.innerHTML = `${humidity}% Humidity`;

  let wind = document.querySelector("#wind");
  let windspeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windspeed} mps Wind`;

  let weatherIcon = document.querySelector(".imgSun");
  let icon = response.data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
}
function changeTime(response) {
  let timezone = response.data.timezone;
  let now = new Date();
  let d = now.getTime();
  let nd = new Date(d + 1000 * timezone);
  let dateString = nd.toUTCString();
  let currentDay = document.querySelector("#current-day");
  currentDay.innerText = `${dateString}`;
}

//Searching for geolocation and showing the weather details

let buttonLocation = document.querySelector(".buttonLocation");
buttonLocation.addEventListener("click", getGeolocation);

function getGeolocation(response) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let apiKey = "e41d480a236e63c3ed66acc7310d68f6";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
  axios.get(url).then(showCity);
  axios.get(url).then(showDescription);
  axios.get(url).then(changeTime);
}
function showCity(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${response.data.name}`;
}
function showDescription(response) {
  let descriptionCity = document.querySelector("#location");
  descriptionCity.innerHTML = `${response.data.name}`;
  let description = document.querySelector("#weather-descrip");
  description.innerHTML = `${response.data.weather["0"].description}`;
}
function defaultcity(city) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerText = "Manila";
  let apiKey = "e41d480a236e63c3ed66acc7310d68f6";
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.innerText}&units=metric&appid=${apiKey}`;
  axios.get(urlAPI).then(showWeather);
  axios.get(urlAPI).then(showDescription);
  axios.get(urlAPI).then(changeTime);
}

function showFTemp(event) {
  event.preventDefault();
  let Ftemperature = (Ctemperature * 9) / 5 + 32;
  let convertedTemp = document.querySelector("#current-temp");
  convertedTemp.classList.add("fahrenheitColor");
  convertedTemp.innerHTML = `${Math.round(Ftemperature)} `;
}
function showCTemp(event) {
  event.preventDefault();
  let convertedTemp = document.querySelector("#current-temp");
  convertedTemp.classList.remove("fahrenheitColor");
  convertedTemp.innerHTML = Math.round(Ctemperature);
}
function displayForecast() {
  let forecastElement = document.querySelector(".dayforecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div id="day">${day}</div>
      <img id="icon" src="strongsun.png" alt="" width="30px">
      <div><span id="max-temp">12</span><span>°</span>
      <span id="min-temp">10</span><span>°</span></div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let converttoF = document.querySelector("#FTemp");
converttoF.addEventListener("click", showFTemp);
let Ctemperature = null;
let converttoC = document.querySelector("#CTemp");
converttoC.addEventListener("click", showCTemp);
defaultcity();
displayForecast();

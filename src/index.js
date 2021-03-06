function formatDate(timestamp) {
  let currentDay = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let weekDay = days[currentDay.getDay()];
  return ` Last updated: ${weekDay} ${formatHours(timestamp)}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector(".forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let i = 0; i < 5; i++) {
    forecast = response.data.list[i];

    forecastElement.innerHTML += ` <li>
              <ul class="sub-list">
                <li>${formatHours(forecast.dt * 1000)}</li>
                <li>
                  <img
                    src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                    alt="Forecast weather icon"
                    class="forecast-weather-icon"
                  />
                </li>
                <li>${Math.round(forecast.main.temp)}°</li>
              </ul>
            </li>`;
  }
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = `bedfbe0fd1980c1b75bd73f4d5db9305`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayCurrentData);
  axios.get(url).then(displayTemperature);
  axios.get(url).then(displayMinMaxTemp);
   url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayForecast);
}

function displayCurrentData(response) {
  let city = response.data.name;
  cityUpdate.innerHTML = `${city}`;


  let weatherDesc = response.data.weather[0].description;
  weatherDescription.innerHTML = `${weatherDesc}`;

  let iconCode = response.data.weather[0].icon;
  let icon = weatherIcon.setAttribute(
    `src`,
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
  weatherIcon.innerHTML = `${icon}`;

  let lastUpdated = document.querySelector(".last-updated");
  lastUpdated.innerHTML = formatDate(response.data.dt * 1000);

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

}

function displayTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  return (temp.innerHTML = `${currentTemp}°`);
}

function displayMinMaxTemp(response) {
  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  return (minMaxTemp.innerHTML = `${minTemp}° / ${maxTemp}°`);
}

function formatHours(timestamp) {
  let currentDay = new Date(timestamp);
  let hour = (currentDay.getHours() < 10 ? "0" : "") + currentDay.getHours();
  hour.toLocaleString(undefined, { hour: `2-digit` });

  let minute = (currentDay.getMinutes() < 10 ? "0" : "") + currentDay.getMinutes();
  minute.toLocaleString(undefined, { minute: `2-digit` });
  return `${hour}:${minute}`;
}



function searchCity(city) {
  let apiKey = `bedfbe0fd1980c1b75bd73f4d5db9305`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayCurrentData);
  axios.get(url).then(displayTemperature);
  axios.get(url).then(displayMinMaxTemp);
  celsiusConverter();
  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();

  let input = document.querySelector(".search");
  currentCity = input.value;

  if (currentCity.length === 0 || !isNaN(currentCity)) {
    alert(`Sorry! You need to enter a valid input :)`);
  } else {
    searchCity(currentCity);
  }
}

function handleSubmitEnter(event) {
  if (event.key === `Enter`) {
    event.preventDefault();

    let input = document.querySelector(".search");
    currentCity = input.value;

    if (currentCity.length === 0 || !isNaN(currentCity)) {
      alert(`Sorry! You need to enter a valid input :)`);
    } else {
      searchCity(currentCity);
    }
  }
}

function fahrenheitConverter(event) {
  event.preventDefault();
  let apiKey = `bedfbe0fd1980c1b75bd73f4d5db9305`;
  let units = `imperial`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayTemperature);
  axios.get(url).then(displayMinMaxTemp);
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(urlForecast).then(displayForecast);

  fahrenheitSymbol.classList.remove("hide");
  fahrenheitSymbol.classList.add("show-unit");
  celsiusSymbol.classList.add("hide");

}
function celsiusConverter() {
  let apiKey = `bedfbe0fd1980c1b75bd73f4d5db9305`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayTemperature);
  axios.get(url).then(displayMinMaxTemp);
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(urlForecast).then(displayForecast);
  fahrenheitSymbol.classList.add("hide");
  celsiusSymbol.classList.remove("hide");
  celsiusSymbol.classList.add("show-unit");
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showMenu() {
  let dropdownList = document.querySelector("#my-dropdown");
  dropdownList.classList.toggle("show");
  settingsButton.classList.toggle("change");
}

window.mouseout = function (event) {
  if (!event.target.matches(".settings-container")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");

    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
        settingsButton.classList.remove("change");
      }
    }
  }
}

window.onclick = function (event) {
  if (!event.target.matches(".settings-container")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");

    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
        settingsButton.classList.remove("change");
      }
    }
  }
}

function changeIcon(newIcon) {
  let icon = document.querySelector(".copyright");
  icon.innerHTML = newIcon;
  changeIcon(`Coded with <i class="fas fa-bolt"></i>by
  <a href="https://www.linkedin.com/in/alessia-maschio-a8317734/"
  >Alessia</a>
  &copy;2021`);
}

function resetIcon(newIcon) {
  let icon = document.querySelector(".copyright");
  icon.innerHTML = newIcon;
  resetIcon(`Coded with <i class="fas fa-heart"></i>by
  <a href="https://www.linkedin.com/in/alessia-maschio-a8317734/"
  >Alessia</a>
  &copy;2021`);
}

function getPastelColor() {
  let hue = Math.floor(Math.random() * 12 * 30);
  let randomColor = `hsl(${hue}, 70%, 80%)`;
  return randomColor;
}

function generateRandomGradient() {
  body.style.background = `linear-gradient(to top,${getPastelColor()},${getPastelColor()})`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConverter);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusConverter);

let temp = document.querySelector(".temp");

let minMaxTemp = document.querySelector(".min-max-temp");

let weatherDescription = document.querySelector(".current-weather-desc");

let weatherIcon = document.querySelector(".current-weather-icon");

let randomBackground = document.querySelector("#random-background-color");
randomBackground.addEventListener("click", generateRandomGradient);

let settingsButton = document.querySelector(".settings-container");
settingsButton.addEventListener("mouseenter", showMenu);
settingsButton.addEventListener("click", showMenu);


let body = document.querySelector("body");
let fahrenheitSymbol = document.querySelector("#fahrenheit-symbol");
let celsiusSymbol = document.querySelector("#celsius-symbol");

let currentCity = document.querySelector(".city");
currentCity = "Madrid";

let cityUpdate = document.querySelector(".city-update");

let searchButton = document.querySelector(".fa-search");
let enterButton = document.querySelector(".search");

searchButton.addEventListener("click", handleSubmit);
enterButton.addEventListener("keydown", handleSubmitEnter);

let loveIcon = document.querySelector(".copyright");
loveIcon.addEventListener("mouseenter", changeIcon);

let lightningIcon = document.querySelector(".copyright");
lightningIcon.addEventListener("mouseleave", resetIcon);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);

searchCity(currentCity);

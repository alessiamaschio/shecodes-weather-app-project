let currentDay = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let weekDay = days[currentDay.getDay()];
let hour = currentDay.getHours();
let minute =
  (currentDay.getMinutes() < 10 ? "0" : "") + currentDay.getMinutes();
minute.toLocaleString(undefined, { minute: `2-digit` });
let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = `${weekDay.toUpperCase()} ${hour}:${minute}`;

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = `bedfbe0fd1980c1b75bd73f4d5db9305`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayCity);
  axios.get(url).then(displayTemperature);
  axios.get(url).then(displayMinMaxTemp);

}

function displayCity(response) {
 
    let city = response.data.name;
  cityUpdate.innerHTML = `${city}`;
  let weatherDesc = response.data.weather[0].main;
  weatherDescription.innerHTML = `${weatherDesc}`;
  let iconCode = response.data.weather[0].icon;
    let icon = weatherIcon.setAttribute(
      `src`,
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    );
  weatherIcon.innerHTML = `${icon}`;
  
  
}

function displayTemperature(response) {
 
    let currentTemp = Math.round(response.data.main.temp);
    return (temp.innerHTML = `${currentTemp}`);
  
}

function displayMinMaxTemp(response) {

    let minTemp = Math.round(response.data.main.temp_min);
    let maxTemp = Math.round(response.data.main.temp_max);
    return (minMaxTemp.innerHTML = `${minTemp}° / ${maxTemp}°`);
  
}


function searchCity(event) {
  event.preventDefault();

  let input = document.querySelector(".search");
  currentCity = input.value;


  if (currentCity.length === 0 || !isNaN(currentCity)) {
    alert(`Sorry! You need to enter a valid input :)`);
  } else {
      let apiKey = `bedfbe0fd1980c1b75bd73f4d5db9305`;
  let units = `metric`;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(displayCity);
   axios.get(url).then(displayTemperature);
  axios.get(url).then(displayMinMaxTemp);


  
  }
}

function searchCityEnter(event) {
  if (event.key === `Enter`) {
    event.preventDefault();

    let input = document.querySelector(".search");
    currentCity = input.value;

   

    if (currentCity.length === 0 || !isNaN(currentCity)) {
      alert(`Sorry! You need to enter a valid input :)`);
    } else {
       let apiKey = `bedfbe0fd1980c1b75bd73f4d5db9305`;
    let units = `metric`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(displayCity);
    axios.get(url).then(displayTemperature);
    axios.get(url).then(displayMinMaxTemp);
  
  
    }
  }
}

let currentCity = document.querySelector(".city");

let cityUpdate = document.querySelector(".city-update");

let searchButton = document.querySelector(".fa-search");
let enterButton = document.querySelector(".search");

searchButton.addEventListener("click", searchCity);
enterButton.addEventListener("keydown", searchCityEnter);

function fahrenheitConverter() {
  let apiKey = `bedfbe0fd1980c1b75bd73f4d5db9305`;
  let units = `imperial`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayTemperature);
  axios.get(url).then(displayMinMaxTemp);
  
}

function celsiusConverter() {
  let apiKey = `bedfbe0fd1980c1b75bd73f4d5db9305`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayTemperature);
  axios.get(url).then(displayMinMaxTemp);
  
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConverter);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusConverter);

let temp = document.querySelector(".temp");

let minMaxTemp = document.querySelector(".min-max-temp");

let weatherDescription = document.querySelector(".current-weather-desc");

let weatherIcon = document.querySelector(".current-weather-icon");

navigator.geolocation.getCurrentPosition(handlePosition);

function showMenu() {
  let dropdownList = document.querySelector("#my-dropdown");
  dropdownList.classList.toggle("show");
  settingsButton.classList.toggle("change");

}

window.onclick = function(event) {
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


let settingsButton = document.querySelector(".settings-container");
settingsButton.addEventListener("click", showMenu);

function changeIcon(newIcon) {
        let icon = document.querySelector(".copyright");
        icon.innerHTML = newIcon;
        changeIcon(`Coded with <i class="fas fa-bolt"></i>

          by
          <a href="https://www.linkedin.com/in/alessia-maschio-a8317734/"
            >Alessia</a
          >
          &copy;2021`);
      }

      function resetIcon(newIcon) {
        let icon = document.querySelector(".copyright");
        icon.innerHTML = newIcon;
        resetIcon(`Coded with <i class="fas fa-heart"></i>

          by
          <a href="https://www.linkedin.com/in/alessia-maschio-a8317734/"
            >Alessia</a
          >
          &copy;2021`);
}
      
     let loveIcon = document.querySelector(".copyright");
      loveIcon.addEventListener("mouseenter", changeIcon);

      let lightningIcon = document.querySelector(".copyright");
      lightningIcon.addEventListener("mouseleave", resetIcon);




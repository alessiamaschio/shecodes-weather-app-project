let currentDay = new Date();
let days = [
 "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
  
let weekDay = days[currentDay.getDay()];
let hour = currentDay.getHours();
let minute = currentDay.getMinutes();

let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = `${weekDay.toUpperCase()} ${hour}:${minute}`;

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector(".search");
  currentCity = input.value;
  console.log(currentCity.length);
  console.log(currentCity);
 
    if (currentCity.length === 0 || !isNaN(currentCity)) {
      alert(`Sorry! You need to enter a valid input :)`);
    }
    else {
      cityUpdate.innerHTML = `${currentCity}`;
    }
}
  
function searchCityEnter(event) {
  if (event.key === `Enter`) {
    
   event.preventDefault();
    
  let input = document.querySelector(".search");
   currentCity = input.value;
  console.log(currentCity.length);
  console.log(currentCity);
 
    if (currentCity.length === 0 || !isNaN(currentCity)) {
      alert(`Sorry! You need to enter a valid input :)`);
    }
    else {
      cityUpdate.innerHTML = `${currentCity}`;
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
  let temp = document.querySelector(".temp");
  let fahrenheitTemp = 11 * 9 / 5 + 32;
  temp.innerHTML = `${fahrenheitTemp}`;
}

function celsiusConverter() {
  let temp = document.querySelector(".temp");
  let celsiusTemp = (51.8 - 32) * 5 / 9;
  temp.innerHTML = `${Math.round(celsiusTemp)}`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConverter);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusConverter);
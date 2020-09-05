function formattedTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
let currentTime = new Date();
document.querySelector("h2").innerHTML = formattedTime(currentTime);

function formattedDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let months = [
    "Janury",
    "February",
    "march",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septepmber",
    "October",
    "November",
    "December",
  ];

  let day = days[date.getDay()];
  let dateNumber = date.getDate();
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  return `${day}, ${dateNumber} ${month} ${year}`;
}

let currentDate = new Date();
document.querySelector("h3").innerHTML = formattedDate(currentDate);

function searchLocation(position) {
  let apiKey = "b0be3ba09e4893c23e9867bcadaa0a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

document
  .querySelector("#current-location-button")
  .addEventListener("click", getCurrentLocation);

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#main-icon")
    .setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = response.data.list[0];
  document.querySelector("#next-week #forecast1").innerHTML = Math.round(
    forecast.main.temp
  );
  document
    .querySelector("#next-week #img1")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    );

  document.querySelector("#hour1").innerHTML = formatHours(forecast.dt * 1000);

  forecast = response.data.list[1];
  document.querySelector("#next-week #forecast2").innerHTML = Math.round(
    forecast.main.temp
  );
  document
    .querySelector("#next-week #img2")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    );

  document.querySelector("#hour2").innerHTML = formatHours(forecast.dt * 1000);

  forecast = response.data.list[2];
  document.querySelector("#next-week #forecast3").innerHTML = Math.round(
    forecast.main.temp
  );
  document
    .querySelector("#next-week #img3")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    );

  document.querySelector("#hour3").innerHTML = formatHours(forecast.dt * 1000);

  forecast = response.data.list[3];
  document.querySelector("#next-week #forecast4").innerHTML = Math.round(
    forecast.main.temp
  );
  document
    .querySelector("#next-week #img4")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    );

  document.querySelector("#hour4").innerHTML = formatHours(forecast.dt * 1000);

  forecast = response.data.list[4];
  document.querySelector("#next-week #forecast5").innerHTML = Math.round(
    forecast.main.temp
  );
  document
    .querySelector("#next-week #img5")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    );

  document.querySelector("#hour5").innerHTML = formatHours(forecast.dt * 1000);

  forecast = response.data.list[5];
  document.querySelector("#next-week #forecast6").innerHTML = Math.round(
    forecast.main.temp
  );
  document
    .querySelector("#next-week #img6")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    );

  document.querySelector("#hour6").innerHTML = formatHours(forecast.dt * 1000);
}

function searchCity(city) {
  let apiKey = "b0be3ba09e4893c23e9867bcadaa0a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-a-city").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  convertCelsius.classList.remove("active");
  convertFahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  convertCelsius.classList.add("active");
  convertFahrenheit.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );
}

let celsiusTemperature = null;

let convertFahrenheit = document.querySelector("#f-units");
convertFahrenheit.addEventListener("click", displayFahrenheitTemperature);

let convertCelsius = document.querySelector("#c-units");
convertCelsius.addEventListener("click", displayCelsiusTemperature);

let city = document.querySelector("#enter-a-city").value;

if (city.length === 0) {
  searchCity("Vilnius");
}

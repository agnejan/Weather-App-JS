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
      "Sunday"
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
      "December"
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
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
      position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
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
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  }
  
  function searchCity(city) {
    let apiKey = "b0be3ba09e4893c23e9867bcadaa0a7d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#enter-a-city").value;
    searchCity(city);
  }
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let city = document.querySelector("#enter-a-city").value;
  if (city.length === 0) {
    searchCity("Vilnius");
  }
  
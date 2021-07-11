// Display current date and time

let now = new Date();

let Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let Day = Days[now.getDay()];
let Month = Months[now.getMonth()];
let Dates = now.getDate();
let Year = now.getFullYear();

let Hour = now.getHours();
let Minutes = now.getMinutes().toString().padStart(2, "0");

let weatherDate = document.querySelector(".dateTime");

weatherDate.innerHTML = `${Day}, ${Month} ${Dates}, ${Year} ${Hour}:${Minutes}`;

// Search City and Update Stats

function showTemperature(response) {
  let tempCurrent = Math.round(response.data.main.temp);
  let tempShow = document.querySelector(".tempDisplay");
  tempShow.innerHTML = `${tempCurrent}°C`;

  let country = response.data.sys.country;
  let countryShow = document.querySelector(".country");
  countryShow.innerHTML = `${country}`;

  let note = response.data.weather[0].main;
  let noteShow = document.querySelector(".weatherNote");
  noteShow.innerHTML = `${note}`;

  let humidity = response.data.main.humidity;
  let humidityShow = document.querySelector("#humidity");
  humidityShow.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed * 3.6);
  let windShow = document.querySelector("#wind");
  windShow.innerHTML = `${wind}`;

  let geoCity = response.data.name;
  let cityHeading = document.querySelector(".city");
  cityHeading.innerHTML = `${geoCity}`;
}

function showCity(event) {
  event.preventDefault();
  let cityHeading = document.querySelector(".city");
  let input = document.querySelector("#input-city");

  cityHeading.innerHTML = input.value;

  let city = input.value;

  let apiKey = "5c1e7eee50bb2935f340cf0e657b8b02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

// Geolocation Search

function currentWeather(coordinates) {
  let lat = coordinates.coords.latitude;
  let long = coordinates.coords.longitude;

  let apiKey = "5c1e7eee50bb2935f340cf0e657b8b02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function logCurrent() {
  navigator.geolocation.getCurrentPosition(currentWeather);
}

document.querySelector("#currentGeo").addEventListener("click", logCurrent);

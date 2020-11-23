let now = new Date();

let hour = now.getHours();

let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hour}: ${minutes}`;

////

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
  return `${hours}: ${minutes}`;
}

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#Main-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#Description1").innerHTML =
    response.data.weather[0].main;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML = `<div class="col">
  <h4 class="future" > ${formatHours(forecast.dt * 1000)} </h4>

  <img
  src ="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
  />
  <p class="temp">
    ${Math.round(forecast.main.temp_max)}°C <br />
    <span class="low-temp"> ${Math.round(forecast.main.temp_min)}°C</span>
  </p>
</div>
`;
  }
}

function searchCity(city) {
  let apiKey = "497664da1cdbad13c19c918f6082e23d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#text-result").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "497664da1cdbad13c19c918f6082e23d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displyFahrenheitTemperature(event) {
  event.preventDefault();
  let displayWeather = document.querySelector("#temperature");
  celsiusLink.classList.remove("degreeSym");
  fahrenheitLink.classList.add("degreeSym");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  displayWeather.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let displayWeather = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("degreeSym");
  celsiusLink.classList.add("degreeSym");
  displayWeather.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

/////////

let currentLocationButton = document.querySelector("#current-loc-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("New York");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displyFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

import { generateForecastItem } from "./htmlWeatherGenerator.js";

const root = document.getElementById("root");

const createWeatherForecast = (list) => {
  const results = list.map((item, index) => {
    //if it is not a point in the array, skip it
    if (index % 3 !== 0) {
      return;
    }

    return generateForecastItem(item);
  });

  root.insertAdjacentHTML("beforeend", results.join(""));
};

const setInterface = (weather) => {
  //destructure the data
  const { name, country } = weather.city;

  //build the page title
  const title = `<h1>Six day forecast for ${name}, ${country}</h1>`;

  //write the title into the dom
  root.innerHTML = title;

  createWeatherForecast(weather.list);
};

const success = async ({ coords }) => {
  const { latitude, longitude } = coords;

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=40&appid=17a3e02a9cc47ed1eac90bc2f9c0012a`
  );

  setInterface(data);
};

const error = (error) => {
  root.innerHTML = `<h1>Please enable location services!</h1>`;
};

navigator.geolocation.getCurrentPosition(success, error);

// const btn = document.getElementById("button").addEventListener("click", () => {
//   console.log("btn clicked");

const container = document.getElementById("spinner");

document.getElementById("city").addEventListener("input", async (e) => {
  container.classList.add("lds-roller");
  const { data } = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&limit=1&appid=d6145b26cbc949034c519ffebc096c8c`
  );
  container.classList.remove("lds-roller");

  if (data[0] && data[0]) {
    // defensive check
    const { lat, lon } = data[0];
    const { data: weather } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=50&appid=d6145b26cbc949034c519ffebc096c8c`
    );

    const html = weather.list.map((item) => {
      return `<div class="container"><div class = searchWeather>
              <div class="the-date">${new Date(
                item.dt * 1000
              ).toLocaleString()}</div>
              <div class="the-temp">${Math.round(
                item.main.temp - 273.15
              )}&#8451;</div>
              <img class ="icons" src="http://openweathermap.org/img/wn/${
                item.weather[0].icon
              }.png" alt="${item.weather[0].main}">
              <div class="the-desc">${item.weather[0].description}</div>
              <div class="the-wind">wind: ${Math.round(
                item.wind.speed
              )}mph</div>
              </div>
              </div>`;
    });

    document.getElementById("root").innerHTML = html.join("");
  }
});

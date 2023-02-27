export const generateSearchItem = (item) => {
  return `<div class = searchWeather>
              <p>${new Date(item.dt * 1000).toLocaleString()}</p>
              <p>${Math.round(item.main.temp - 273.15)}&#8451;</p>
              <img src="http://openweathermap.org/img/wn/${
                item.weather[0].icon
              }.png" alt="${item.weather[0].main}">
              
              <div class="weather-item">${item.weather[0].description}</div>
      <div class="weather-item">wind: ${Math.round(item.wind.speed)}mph</div>
      </div>`;
};

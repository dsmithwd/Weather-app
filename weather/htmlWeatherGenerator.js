export const generateForecastItem = (item) => {
  return `
  <div class ="container">  
  <div class="forecastData">
      <div class="the-date">${new Date(item.dt * 1000).toLocaleString()}</div>
      <img class="icons" src="http://openweathermap.org/img/wn/${
        item.weather[0].icon
      }.png" alt="${item.weather[0].main}">
      <div class ="the-temp">${Math.round(item.main.temp - 273.15)}&#8451;</div>
      <div class="the-desc">${item.weather[0].description}</div>
      <div class="the-wind">wind: ${Math.round(item.wind.speed)}mph</div>
      
    </div>
    </div>
    `;
};

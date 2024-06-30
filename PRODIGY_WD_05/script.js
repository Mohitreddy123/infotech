const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const background = document.getElementById('background');

const API_KEY = 'c65b8df4eb51e0146bc33918c4a12d3d'; 

searchBtn.addEventListener('click', () => {
  const location = searchInput.value;
  if (location.trim() === '') {
    alert('Please enter a city name');
    return;
  }

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const { name, main, weather } = data;
      const { temp, feels_like, humidity } = main;
      const { description, icon } = weather[0];

      const weatherHTML = `
        <h2>${name}</h2>
        <div>
          <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
          <span>${description}</span>
        </div>
        <p>Temperature: ${temp} &#8451;</p>
        <p>Feels like: ${feels_like} &#8451;</p>
        <p>Humidity: ${humidity}%</p>
      `;

      weatherInfo.innerHTML = weatherHTML;

      changeBackground(weather[0].main);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    });

  searchInput.value = '';
});

function changeBackground(weather) {
  let backgroundUrl;

  switch (weather.toLowerCase()) {
    case 'clear':
      backgroundUrl = 'url("path_to_clear_weather_image.jpg")';
      break;
    case 'clouds':
      backgroundUrl = 'url("path_to_cloudy_weather_image.jpg")';
      break;
    case 'rain':
      backgroundUrl = 'url("path_to_rainy_weather_image.jpg")';
      break;
    case 'snow':
      backgroundUrl = 'url("path_to_snowy_weather_image.jpg")';
      break;
    default:
      backgroundUrl = 'url("path_to_default_weather_image.jpg")';
      break;
  }

  background.style.backgroundImage = backgroundUrl;
}

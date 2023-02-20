const weatherCity = document.querySelector('.weather__city') as HTMLInputElement;
const weatherIcon = document.querySelector('.weather__icon') as HTMLElement;
const weatherDescr = document.querySelector('.weather__descr') as HTMLElement;
const weatherWind = document.querySelector('.weather__wind') as HTMLElement;
const weatherHumidity = document.querySelector('.weather__humidity') as HTMLElement;
const weatherError = document.querySelector('.weather__error') as HTMLElement;

export async function getWeather() {
  const APIKey = '586d9223ee072ca1785cf70371c78043';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=en&appid=${APIKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  
  if (data.cod != 200) {
    weatherError.style.display = 'block';
    weatherHumidity.style.display = 'none';
    weatherWind.style.display = 'none';
    weatherDescr.style.display = 'none';
  } else {
    weatherError.style.display = 'none';
    weatherHumidity.style.display = 'block';
    weatherWind.style.display = 'block';
    weatherDescr.style.display = 'block';
  } 

  weatherIcon.className = 'weather__icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  weatherDescr.innerHTML = `${Math.round(data.main.temp)}&degC ${data.weather[0].description}`;
  weatherWind.innerHTML = `Wind speed: ${Math.round(data.wind.speed) } m/s`;
  weatherHumidity.innerHTML = `Humidity: ${Math.round(data.main.humidity) } %`;

  setInterval(getWeather, 900000)
}

weatherCity.addEventListener('change', getWeather);

function setCity() {
  if (weatherCity.value == '') {
    localStorage.setItem('city', 'Minsk');
  } else localStorage.setItem('city', weatherCity.value);
}

function getCity() {
  if (localStorage.getItem('city')) {
    weatherCity.value = '' + localStorage.getItem('city');
  }

  getWeather();
}

window.addEventListener('beforeunload', setCity);
window.addEventListener('load', getCity);
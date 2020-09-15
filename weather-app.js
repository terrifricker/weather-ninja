const cityForm = document.querySelector('form');
const display = document.querySelector('.display');
const details = document.querySelector('.details');
const image = document.querySelector('.display img');
const icon = document.querySelector('.icon img');

const updateDisplay = data => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  details.innerHTML = `
    <h5>${cityDetails.EnglishName}</h5>
    <div>${weather.WeatherText}</div>
    <div class="temperature">
      <span>${weather.Temperature.Imperial.Value}</span>
      <span>&deg;F</span>
    </div>
  `;

  let imageSource = null;
  if(weather.IsDayTime) {
    imageSource = 'images/day.svg';
  } else {
    imageSource = 'images/night.svg';
  }
  image.setAttribute('src', imageSource);

  const iconSource = `images/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSource);



  if (display.classList.contains('hidden')) {
    display.classList.remove('hidden');
  }

  



}

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);
  console.log(weather);
  return {
    cityDetails: cityDetails,
    weather: weather
  }

};

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then(data => updateDisplay(data))
    .catch(err => console.log(err));
})
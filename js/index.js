const cityEl = document.getElementById("city");
const temperature = document.getElementById("temperature");
const gusts = document.getElementById("gusts");
const wind = document.getElementById("wind");
const weather = document.getElementById("weather");

const weatherCodeMap = {
  0: "Clear sky ☀️",
  1: "Mainly clear 🌤",
  2: "Partly cloudy ⛅️",
  3: "Overcast ☁️",
  45: "Fog 🌫",
  48: "Depositing rime fog",
  51: "Light drizzle 🌦",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Freezing dense drizzle",
  61: "Slight rain 🌧",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Freezing heavy rain",
  71: "Slight snow fall ❄️",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers ⛈",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm ⚡️",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

function interpretWeatherCode(code) {
  return weatherCodeMap[code] || "Unknown weather";
}

async function fetchWeather() {
  const { data } = await axios.get(
    "https://api.bigdatacloud.net/data/reverse-geocode-client"
  );
  const { city, latitude, longitude } = data;

  cityEl.textContent = `City: ${city}`;

  const { data: weatherInfo } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code`
  );

  const { current_units, current } = weatherInfo;
  const { temperature_2m, wind_gusts_10m, wind_speed_10m, weather_code } =
    current;
  const {
    temperature_2m: tempUnit,
    wind_gusts_10m: gustsUnit,
    wind_speed_10m: speedUnit,
  } = current_units;

  temperature.textContent = `Temperature: ${temperature_2m}${tempUnit}`;
  gusts.textContent = `Wind Gusts: ${wind_gusts_10m}${gustsUnit}`;
  wind.textContent = `Wind Speed: ${wind_speed_10m}${speedUnit}`;
  weather.textContent = `Weather: ${interpretWeatherCode(weather_code)}`;

  console.log("Weather code:", weather_code);
}

fetchWeather();

// const dog = {
//   nickname: "Tyson",
//   age: 5,
//   isBoy: true,
//   favToy: {
//     type: "ball",
//   },
// };

// const { age, favToy } = dog; // деструктуризация destructuring assignment ES6
// const { type } = favToy;

// // const age = dog.age;
// console.log(age);

// console.log(type);

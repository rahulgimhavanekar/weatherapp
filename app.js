const searchInput = document.querySelector(".cityInput");
const searchButton = document.querySelector(".submit-btn");

searchButton.addEventListener("click", async () => {
  const data = await weather.getData(searchInput.value);
  view.displayData(data);
});

const weather = (() => {
  const getData = async (city) => {
    const url = `http://api.weatherstack.com/current?access_key=011c73d1f5354f9fd39c3bb7939cbe5e&query=${city}`;

    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) {
        throw new Error("Something went wrong! Please try again later");
      }
      const data = await response.json();
      const weatherData = {
        location: data.location.name,
        temperature: data.current.temperature,
        feelslike: data.current.feelslike,
        humidity: data.current.humidity,
        windspeed: data.current.wind_speed,
      };
      return weatherData;
    } catch (error) {
      alert(error);
      return null;
    }
  };

  return { getData };
})();

const view = (() => {
  const displayData = (weatherData) => {
    if (!weatherData) {
      return;
    }

    const weatherOutput = document.querySelector(".output");
    weatherOutput.classList.add("active");

    const cityName = document.querySelector("#city");
    const temperature = document.querySelector("#temperature");
    const feelslike = document.querySelector("#feelslike");
    const humidity = document.querySelector("#humidity");
    const windspeed = document.querySelector("#windspeed");

    cityName.textContent = `${weatherData.location}`;
    temperature.textContent = `${weatherData.temperature} °C`;
    feelslike.textContent = `Feels Like: ${weatherData.feelslike} °C`;
    humidity.textContent = `Humidity: ${weatherData.humidity}%`;
    windspeed.textContent = `Windspeed: ${weatherData.windspeed} km/h`;
  };

  return { displayData };
})();

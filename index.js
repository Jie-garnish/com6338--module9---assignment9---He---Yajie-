// Your code here

const form = document.querySelector("form");
const input = document.querySelector("#weather-search");
const weatherSection = document.querySelector("#weather");
const apiKey = "2425e04e435f33312e992c62ca16817a";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userQuery = input.value.trim();
  if (!userQuery) return;

  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
  const queryString = `?units=imperial&appid=${apiKey}&q=${userQuery}`;
  const fetchURL = `${weatherUrl}${queryString}`;

  try {
    const response = await fetch(fetchURL);
    const data = await response.json();
    response.status === 200 ? displayWeather(data) : displayError();
  } catch (error) {
    displayError();
  }

  input.value = "";
});

const displayWeather = ({ name, sys: { country }, weather, main, dt, coord }) => {
    const { icon, description } = weather[0];
    const { temp, feels_like } = main;
    const { lat, lon } = coord;
  
    const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const lastUpdated = new Date(dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  
    weatherSection.innerHTML = `
      <h2>${name}, ${country}</h2>
      <a href="${googleMapsLink}" target="_blank">Click to view map</a>
      <img src="${weatherIcon}" alt="Weather icon">
      <p style="text-transform: capitalize;">${description}</p><br>
      <p>Current: ${temp}° F</p>
      <p>Feels like: ${feels_like}° F</p><br>
      <p>Last updated: ${lastUpdated}</p>
    `;
  };
  
  const displayError = () => {
    weatherSection.innerHTML = `<h2>Location not found</h2>`;
  };
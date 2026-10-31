const API_KEY = "be6f38bec88b54cfb3970f08914b610b";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error-msg');
const weatherCard = document.getElementById('weather-card');

// 1. Replace your old fetchWeather function with this updated one:
const fetchWeather = async (city) => {
    if (!city.trim()) return;

    loading.classList.remove('hidden');
    errorMsg.classList.add('hidden');
    weatherCard.classList.add('hidden');

    try {
        // Fetch Current Weather
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
            throw new Error("City not found. Please verify the city name.");
        }

        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);

        // Fetch 5-Day Forecast Data
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        );
        
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }

    } catch (err) {
        errorMsg.textContent = err.message;
        errorMsg.classList.add('hidden'); // or remove hidden to show error
    } finally {
        loading.classList.add('hidden');
    }
};

// 2. Add this new function right below fetchWeather:
const displayForecast = (data) => {
    const forecastGrid = document.getElementById('forecast-grid');
    
    // Filters OpenWeather's 3-hour data to get roughly 12:00 PM snapshots for the days
    const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));

    forecastGrid.innerHTML = dailyData.map(day => {
        const dateObj = new Date(day.dt * 1000);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const iconCode = day.weather[0].icon;

        return `
            <div class="forecast-card">
                <p>${dayName}</p>
                <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Icon">
                <h4>${temp}&deg;C</h4>
            </div>
        `;
    }).join('');
};
const displayWeather = ({ name, sys, main, weather, wind }) => {
    document.getElementById('city-name').textContent = `${name}, ${sys.country}`;
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    document.getElementById('temperature').innerHTML = `${Math.round(main.temp)}&deg;C`;
    document.getElementById('condition').textContent = weather[0].description;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${wind.speed} km/h`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const condition = weather[0].main.toLowerCase();
    document.body.className = ''; // Reset classes
    if (condition.includes('rain')) {
        document.body.classList.add('rain');
    } else if (condition.includes('cloud')) {
        document.body.classList.add('clouds');
    } else {
        document.body.classList.add('clear');
    }

    weatherCard.classList.remove('hidden');
};

searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather(cityInput.value);
});
const saveSearchHistory = (cityName) => {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(cityName)) {
        history.unshift(cityName); // Add to start
        if (history.length > 5) history.pop(); // Keep max 5
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }
    renderHistory();
};

const renderHistory = () => {
    const historyContainer = document.getElementById('history-container');
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    historyContainer.innerHTML = history.map(city => 
        `<span class="history-pill" onclick="fetchWeather('${city}')">${city}</span>`
    ).join('');
};

// Call renderHistory() when your page loads
window.addEventListener('DOMContentLoaded', renderHistory);
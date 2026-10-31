# Atmosphere - Modern Weather Web Application

A feature-rich, responsive weather web application built using **HTML5, CSS3, and Modern JavaScript (ES6+)**[cite: 1, 2]. It consumes the **OpenWeatherMap REST API** to deliver real-time meteorological data, multi-day forecasts, and dynamic user interfaces.

---

##  Key Features

* **Real-Time Weather Search:** Search current weather conditions for any city worldwide[cite: 1].
* **5-Day Weather Forecast:** View upcoming weather trends using OpenWeatherMap's forecast API data.
* **Geolocation Support:** Automatically fetch and display weather for your exact physical location using the browser's Geolocation API.
* **Temperature Unit Toggle:** Switch instantly between Celsius (°C) and Fahrenheit (°F).
* **Persistent Search History:** Automatically saves recent searches using browser `localStorage` for quick access.
* **Dynamic Weather Backgrounds:** The UI adapts its background color/gradient dynamically based on weather states (Clear, Rainy, Cloudy).
* **Robust Error Handling:** Gracefully manages invalid city inputs, network errors, and API authentication states[cite: 1].
* **Fully Responsive UI:** Optimized layout for desktop, tablet, and mobile screens[cite: 1, 2].

---

## Technology Stack

* **Frontend:** HTML5, CSS3 (Flexbox, Grid, Glassmorphism design)
* **Scripting:** JavaScript (ES6+ features: Async/Await, Arrow Functions, Template Literals, Destructuring)[cite: 2]
* **API:** OpenWeatherMap API (Current Weather & 5-Day Forecast endpoints)[cite: 1]
* **Version Control:** Git & GitHub[cite: 1]

---

## 📂 Project File Structure

```text
weather-app/
│
├── index.html       # Main HTML structure
├── style.css        # Custom CSS styling and dynamic theme classes
└── script.js        # Asynchronous JavaScript logic & API integration

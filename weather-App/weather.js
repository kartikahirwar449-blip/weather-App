

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherResult = document.querySelector("#weatherResult");
const forecast = document.querySelector("#forecast");

// yaha mene async function banaya hai taki apn api se data ko fetch kar sake aur usko process kar sake
async function getWeather() {
    try {
        const city = cityInput.value;

        // yaha pe check kar rahe hai ki user ne city dali hai ya nahi
        if (city === "") {
            weatherResult.textContent = "Please enter a city name ❗";
            return;
        }

        // yaha mene storage kiya hai taki user ke last search ko yaad rakha ja sake
        localStorage.setItem("city", city);

        weatherResult.textContent = "⏳Please wait ...";

        // yaha mene api se latitude aur longitude ko fetch kiya hai
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        if (!response.ok) {
            throw new Error("City search failed");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("City not found ❌");
        }

        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        // yaha mene api se weather data ko fetch kiya hai
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=7&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Weather request failed ❌");
        }

        const weatherData = await weatherResponse.json();

        // yaha mene current date aur time nikala hai
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        });
        const formattedTime = currentDate.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });

        const temperature = Math.round(weatherData.current.temperature_2m);
        const humidity = weatherData.current.relative_humidity_2m;
        const windSpeed = weatherData.current.wind_speed_10m;
        const weatherCode = weatherData.current.weather_code;

        // Weather Code logic & Dynamic Greeting + Umbrella Guide
        let condition = "";
        let weatherIcon = "";
        let greeting = "";
        let guide = "";

        if (weatherCode === 0) {
            condition = "Clear Sky";
            weatherIcon = "☀️";
            greeting = "Bright & Sunny Day! ☀️";
            guide = "Glasses pehan ke niklo, dhoop achhi hai! 🕶️";
        } else if (weatherCode === 1) {
            condition = "Mainly Clear";
            weatherIcon = "🌤️";
            greeting = "Have a pleasant day ahead! 🌤️";
            guide = "Mausam mast hai, ghoomne ja sakte ho! 🚲";
        } else if (weatherCode === 2) {
            condition = "Partly Cloudy";
            weatherIcon = "⛅";
            greeting = "Cool Cloud Vibes! ⛅";
            guide = "Umbrella ki zaroorat nahi hai. Enjoy! 😎";
        } else if (weatherCode === 3) {
            condition = "Overcast";
            weatherIcon = "☁️";
            greeting = "Cloudy Atmosphere! ☁️";
            guide = "Baarish ho sakti hai, umbrella sath rakh lo! 🌂";
        } else if (weatherCode >= 51 && weatherCode <= 57) {
            condition = "Drizzle";
            weatherIcon = "🌦️";
            greeting = "Light Showers Outside! 🌦️";
            guide = "Chhoti umbrella ya jacket le kar niklo! ☔";
        } else if (weatherCode >= 61 && weatherCode <= 67) {
            condition = "Rain";
            weatherIcon = "🌧️";
            greeting = "Rainy Day Alert! 🌧️";
            guide = "☔ Umbrella ZAROOR le jana, baarish ho rahi hai!";
        } else if (weatherCode >= 71 && weatherCode <= 77) {
            condition = "Snow";
            weatherIcon = "❄️";
            greeting = "Cold & Snowy Day! ❄️";
            guide = "Thand jyada hai, warm clothes pehno! 🧥";
        } else if (weatherCode >= 80 && weatherCode <= 82) {
            condition = "Rain Showers";
            weatherIcon = "🌧️";
            greeting = "Heavy Showers Expected! 🌧️";
            guide = "Umbrella / Raincoat ke bina mat nikalna! ☔";
        } else if (weatherCode >= 95) {
            condition = "Thunderstorm";
            weatherIcon = "⛈️";
            greeting = "Thunderstorm Warning! ⛈️";
            guide = "⚠️ Ghar ke andar raho, severe weather hai!";
        } else {
            condition = "Unknown Weather";
            weatherIcon = "🌤️";
            greeting = "Have a nice day!";
            guide = "Mausam check karke niklein.";
        }

        if (temperature > 38) {
            guide = "🔥 Bohot garmi hai! Paani ki bottle sath rakhein.";
        }

        // Final UI rendering based on your requested layout order
        weatherResult.innerHTML = `
            <div class="weather-datetime">
                📅 ${formattedDate} | ⏰ ${formattedTime}
            </div>

            <div class="weather-location">
                📍 ${city.toUpperCase()}
            </div>

            <div class="weather-greeting">
                ${greeting}
            </div>

            <div class="weather-icon">
                ${weatherIcon}
            </div>

            <div class="temperature-value">
                ${temperature}°C
            </div>

            <div class="weather-condition">
                ${condition}
            </div>

            <div class="weather-guide">
                💡 ${guide}
            </div>

            <div class="weather-details">
                <div class="detail-box">
                    <span>💧</span>
                    <p>Humidity</p>
                    <strong>${humidity}%</strong>
                </div>

                <div class="detail-box">
                    <span>🌬️</span>
                    <p>Wind Speed</p>
                    <strong>${windSpeed} Km/h</strong>
                </div>
            </div>
        `;

        // 7 days forecast rendering
        const forecastDates = weatherData.daily.time;
        const maxTemperatures = weatherData.daily.temperature_2m_max;
        const minTemperatures = weatherData.daily.temperature_2m_min;
        const forecastCodes = weatherData.daily.weather_code;

        // Container ko clear karo aur pehle Section Heading add karo
        forecast.innerHTML = `<h3 class="forecast-title">📅 7-Day Forecast</h3>`;

        // Forecast cards ke liye inner container create karo
        const forecastContainer = document.createElement("div");
        forecastContainer.className = "forecast-cards-container";

        for (let i = 0; i < forecastDates.length; i++) {
            const day = document.createElement("div");
            day.className = "forecast-card";
            const date = new Date(forecastDates[i]);

            const formattedDay = date.toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short"
            });

            const forecastCode = forecastCodes[i];
            let forecastIcon = "🌤️";

            if (forecastCode === 0) forecastIcon = "☀️";
            else if (forecastCode === 1) forecastIcon = "🌤️";
            else if (forecastCode === 2) forecastIcon = "⛅";
            else if (forecastCode === 3) forecastIcon = "☁️";
            else if (forecastCode >= 51 && forecastCode <= 57) forecastIcon = "🌦️";
            else if (forecastCode >= 61 && forecastCode <= 67) forecastIcon = "🌧️";
            else if (forecastCode >= 71 && forecastCode <= 77) forecastIcon = "❄️";
            else if (forecastCode >= 80 && forecastCode <= 82) forecastIcon = "🌧️";
            else if (forecastCode >= 95) forecastIcon = "⛈️";

            day.innerHTML = `
                <div class="forecast-day">${formattedDay}</div>
                <div class="forecast-icon">${forecastIcon}</div>
                <div class="forecast-temp">
                    ${Math.round(maxTemperatures[i])}° / ${Math.round(minTemperatures[i])}°
                </div>
            `;

            forecastContainer.appendChild(day);
        }

        forecast.appendChild(forecastContainer);

    } catch (error) {
        weatherResult.textContent = error.message;
    }
}

searchBtn.addEventListener("click", function () {
    getWeather();
    cityInput.value = "";
});

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
        cityInput.value = "";
    }
});

const savedCity = localStorage.getItem("city");

if (savedCity) {
    cityInput.value = savedCity;
    getWeather();
    cityInput.value = "";
}
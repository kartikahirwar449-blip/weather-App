// // ye apna pura js ka code hai weather app ke liye jisme mene api se data fetch kiya hai aur usko process kiya hai taki user ko weather ka data show ho sake

// // yaha mene html ke input box aur button ko select kiya hai taki user ke input ko fetch kar sake aur button click hone par function call ho sake
// const cityInput = document.querySelector("#cityInput");
// const searchBtn = document.querySelector("#searchBtn");
// const weatherResult = document.querySelector("#weatherResult");
// const forecast = document.querySelector("#forecast");

// // yaha mene async function banaya hai taki apn api se data ko fetch kar sake aur usko process kar sake
// async function getWeather() {
//     try {
//          const city = cityInput.value;
// //yaha pe apn ne isme storeg kiya hai taki user ke last search ko 
//     localStorage.setItem("city", city);

//     //yaha se agar koi bina cir
//     if (city === "") {
//         weatherResult.textContent = "Please enter a city name ❗";
//         return;
//     }

//     // weatherResult.textContent = "Aapka temperature aa raha hai ...";
//     weatherResult.textContent = "⏳Please wait ...";


//         // console.log("City:", city);

//         // yaha mene api se latitude aur longitude ko fetch kiya hai
//         const response = await fetch(
//             `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
//         );
        
//         //yaha mene check kiya hai ki agar response.ok false hai to error throw ho jaye taki user ko pata chale ki city search failed ho gaya hai
//         if (!response.ok) {
//             throw new Error("City search failed");
//         }
//         // console.log("Geocoding response:", response);

//         const data = await response.json();
//          console.log("Geocoding data:", data);

//         // yaha mene check kiya hai ki agar data.results me kuch nahi hai to error throw ho jaye taki user ko pata chale ki city nahi mili
//         if (!data.results) {
//         throw new Error("City not found ❌");
// }
//         // yaha se mene latitude aur longitude ko value ko fetch kiya hai taki apn weather data ko fetch kar sake
//         const latitude = data.results[0].latitude;
//         const longitude = data.results[0].longitude;

//         // console.log("Latitude:", latitude);
//         // console.log("Longitude:", longitude);

//         // yaha mene api se weather data ko fetch kiya hai or use frach karne ke liye mene latitude aut longitude ka use kiua hai 
//         const weatherResponse = await fetch(
//     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=7&timezone=auto`
// );
//         if (!weatherResponse.ok) {
//             throw new Error("Weather request failed ❌");
//         }
//         // console.log("Weather response:", weatherResponse);

//         const weatherData = await weatherResponse.json();

// const currentDate = new Date();

// const formattedDate = currentDate.toLocaleString("en-IN");

        


//         //yaha mene sara data nikal raha hai abhi ke liye 
//         // console.log(weatherData.daily);
        
//         const forecastDates = weatherData.daily.time;

//         const maxTemperatures = weatherData.daily.temperature_2m_max;

//         const minTemperatures = weatherData.daily.temperature_2m_min;


        
//         //yaha loop lagaya hai taki apn forecast ko show kar sake user ko 7 din ka forecast show ho sake
//         forecast.innerHTML = "";
//     for (let i = 0; i < forecastDates.length; i++) {

//     const day = document.createElement("div");

//     day.textContent =
//         `${forecastDates[i]} - Max: ${maxTemperatures[i]}°C - Min: ${minTemperatures[i]}°C`;

//     forecast.appendChild(day);

// }

//         // console.log("Weather data:", weatherData);

//         // yaha mene api se temperature aur humidity ko fetch kiya hai
//         const temperature = weatherData.current.temperature_2m;
//         const humidity = weatherData.current.relative_humidity_2m;
//         const windSpeed = weatherData.current.wind_speed_10m;
//         const weatherCode = weatherData.current.weather_code;


//         // yaha mene weather code ke hisab se condition ko set kiya hai taki user ko samajh me aaye ki kya weather hai
//         let condition = "";

//         if (weatherCode === 0){
//             condition = "Clear sky ☀️";
//         }else if (weatherCode === 1){
//             condition = "Mainly clear  🌤️";
//         }else if (weatherCode === 2){
//             condition = "Partly cloudy ⛅";
//         }else if (weatherCode === 3){
//             condition = "Overcast ☁️";
//         }else if (weatherCode === 61){
//             condition = "Rain 🌧️";
//         }else if (weatherCode >= 51 && weatherCode <= 57) {
//     condition = "Drizzle 🌦️";
// }
// else if (weatherCode >= 61 && weatherCode <= 67) {
//     condition = "Rain 🌧️";
// }
// else if (weatherCode >= 71 && weatherCode <= 77) {
//     condition = "Snow ❄️";
// }
// else if (weatherCode >= 80 && weatherCode <= 82) {
//     condition = "Rain Showers 🌧️";
// }
// else if (weatherCode >= 95) {
//     condition = "Thunderstorm ⛈️";
// }
// else {
//     condition = "Unknown Weather";
// }


//     //yaha mene console me print kiya hai taki apn dekh sake ki kya data aa raha hai
//         // console.log("Condition:", condition);
//         // console.log("humidity:", humidity);
//         // console.log("Temperature:", temperature);
//         // console.log("Wind Speed:", windSpeed);
//         // console.log("Weather Code:", weatherCode);
//         weatherResult.textContent =`🌍City: ${city} - 🌡️Temperature: ${temperature}°C - 💧Humidity: ${humidity}%  - 🌬️Wind Speed: ${windSpeed} Km/h - Condition: ${condition} -📅 ${formattedDate}`;


//         //yaha mene catch lagya hai taki koi error aaye to wo catch me aa jaye aur user ko error message show ho jaye 
//     } catch (error) {

//     weatherResult.textContent = error.message;

// }
// }
// //yaha mene search button pe click hone par getWeather function ko call kiya hai taki user ke input ke hisab se weather data fetch ho sake
// searchBtn.addEventListener("click", function () {

//     getWeather();
//     //yaha se input box khali ho jayega taki user ko khali mile input box
//     cityInput.value = "";

// });

// // yaha mera storega ka getItem hai taki user ke last search ko yaad rakha ja sake
// const savedCity = localStorage.getItem("city");

// // console.log(savedCity);


// // yaha me dekhunga ki agar savedCity me kuch hai to wo input box me show ho aur getWeather function call ho jaye taki user ke last search ka weather data show ho jaye
// if (savedCity){

//     cityInput.value = savedCity;
//     getWeather();
//     cityInput.value = "";
// }
////yaha se mene new code rakha hai yaha pe ok///


// ye apna pura js ka code hai weather app ke liye jisme mene api se data fetch kiya hai aur usko process kiya hai taki user ko weather ka data show ho sake





// yaha mene html ke input box aur button ko select kiya hai taki user ke input ko fetch kar sake aur button click hone par function call ho sake
// const cityInput = document.querySelector("#cityInput");
// const searchBtn = document.querySelector("#searchBtn");
// const weatherResult = document.querySelector("#weatherResult");
// const forecast = document.querySelector("#forecast");


// // yaha mene async function banaya hai taki apn api se data ko fetch kar sake aur usko process kar sake
// async function getWeather() {

//     try {

//         const city = cityInput.value;


//         // yaha pe check kar rahe hai ki user ne city dali hai ya nahi
//         if (city === "") {

//             weatherResult.textContent = "Please enter a city name ❗";

//             return;
//         }


//         // yaha mene storage kiya hai taki user ke last search ko yaad rakha ja sake
//         localStorage.setItem("city", city);


//         // weatherResult.textContent = "Aapka temperature aa raha hai ...";
//         weatherResult.textContent = "⏳Please wait ...";


//         // console.log("City:", city);


//         // yaha mene api se latitude aur longitude ko fetch kiya hai
//         const response = await fetch(
//             `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
//         );


//         // yaha mene check kiya hai ki agar response.ok false hai to error throw ho jaye
//         // taki user ko pata chale ki city search failed ho gaya hai
//         if (!response.ok) {

//             throw new Error("City search failed");
//         }


//         // console.log("Geocoding response:", response);


//         const data = await response.json();

//         // console.log("Geocoding data:", data);


//         // yaha mene check kiya hai ki agar data.results me kuch nahi hai
//         // to error throw ho jaye taki user ko pata chale ki city nahi mili
//         if (!data.results || data.results.length === 0) {

//             throw new Error("City not found ❌");
//         }


//         // yaha se mene latitude aur longitude ki value ko fetch kiya hai
//         // taki apn weather data ko fetch kar sake
//         const latitude = data.results[0].latitude;
//         const longitude = data.results[0].longitude;


//         // console.log("Latitude:", latitude);
//         // console.log("Longitude:", longitude);


//         // yaha mene api se weather data ko fetch kiya hai
//         // aur use fetch karne ke liye mene latitude aur longitude ka use kiya hai
//         const weatherResponse = await fetch(
//             `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=7&timezone=auto`
//         );


//         if (!weatherResponse.ok) {

//             throw new Error("Weather request failed ❌");
//         }


//         // console.log("Weather response:", weatherResponse);


//         const weatherData = await weatherResponse.json();


//         // yaha mene current date aur time nikala hai
//         const currentDate = new Date();


//         const formattedDate = currentDate.toLocaleString("en-IN");


//         // yaha mene sara data nikal raha hu abhi ke liye

//         const temperature = weatherData.current.temperature_2m;
//         const humidity = weatherData.current.relative_humidity_2m;
//         const windSpeed = weatherData.current.wind_speed_10m;
//         const weatherCode = weatherData.current.weather_code;


//         // yaha mene weather code ke hisab se condition aur icon set kiya hai
//         // taki user ko samajh me aaye ki kya weather hai
//         let condition = "";
//         let weatherIcon = "";


//         if (weatherCode === 0) {

//             condition = "Clear sky";
//             weatherIcon = "☀️";

//         } else if (weatherCode === 1) {

//             condition = "Mainly clear";
//             weatherIcon = "🌤️";

//         } else if (weatherCode === 2) {

//             condition = "Partly cloudy";
//             weatherIcon = "⛅";

//         } else if (weatherCode === 3) {

//             condition = "Overcast";
//             weatherIcon = "☁️";

//         } else if (weatherCode >= 51 && weatherCode <= 57) {

//             condition = "Drizzle";
//             weatherIcon = "🌦️";

//         } else if (weatherCode >= 61 && weatherCode <= 67) {

//             condition = "Rain";
//             weatherIcon = "🌧️";

//         } else if (weatherCode >= 71 && weatherCode <= 77) {

//             condition = "Snow";
//             weatherIcon = "❄️";

//         } else if (weatherCode >= 80 && weatherCode <= 82) {

//             condition = "Rain Showers";
//             weatherIcon = "🌧️";

//         } else if (weatherCode >= 95) {

//             condition = "Thunderstorm";
//             weatherIcon = "⛈️";

//         } else {

//             condition = "Unknown Weather";
//             weatherIcon = "🌤️";
//         }


//         // yaha mene console me print kiya hai taki apn dekh sake ki kya data aa raha hai
//         // console.log("Condition:", condition);
//         // console.log("humidity:", humidity);
//         // console.log("Temperature:", temperature);
//         // console.log("Wind Speed:", windSpeed);
//         // console.log("Weather Code:", weatherCode);


//         // yaha current weather ko proper HTML structure me show kar rahe hai
//         weatherResult.innerHTML = `

//             <div class="weather-main">

//                 <div class="weather-location">
//                     📍 ${city}
//                 </div>

//                 <div class="weather-icon">
//                     ${weatherIcon}
//                 </div>

//                 <div class="weather-condition">
//                     ${condition}
//                 </div>

//                 <div class="temperature">

//     <div class="temperature-label">
//         🌡️ Temperature
//     </div>

//     <div class="temperature-value">
//         ${temperature}°C
//     </div>

// </div>

//                 <div class="weather-date">
//                     📅 ${formattedDate}
//                 </div>

//                 <div class="weather-details">

//                     <div class="detail-box">

//                         <span>💧</span>

//                         <p>Humidity</p>

//                         <strong>${humidity}%</strong>

//                     </div>


//                     <div class="detail-box">

//                         <span>🌬️</span>

//                         <p>Wind Speed</p>

//                         <strong>${windSpeed} Km/h</strong>

//                     </div>

//                 </div>

//             </div>

//         `;


//         // yaha se 7 days ke forecast ka data nikal raha hu

//         const forecastDates = weatherData.daily.time;

//         const maxTemperatures = weatherData.daily.temperature_2m_max;

//         const minTemperatures = weatherData.daily.temperature_2m_min;

//         const forecastCodes = weatherData.daily.weather_code;


//         // yaha loop lagaya hai taki apn forecast ko show kar sake
//         // user ko 7 din ka forecast show ho sake

//         forecast.innerHTML = "";


//         for (let i = 0; i < forecastDates.length; i++) {

//             const day = document.createElement("div");


//             // yaha API se mili date ko JavaScript Date object me convert kar rahe hai
//             const date = new Date(forecastDates[i]);


//             // yaha date ko readable format me convert kar rahe hai
//             const formattedDay = date.toLocaleDateString("en-IN", {

//                 weekday: "short",
//                 day: "numeric",
//                 month: "short"

//             });


//             // yaha har din ka weather code nikal rahe hai
//             const forecastCode = forecastCodes[i];


//             // default icon
//             let forecastIcon = "🌤️";


//             if (forecastCode === 0) {

//                 forecastIcon = "☀️";

//             } else if (forecastCode === 1) {

//                 forecastIcon = "🌤️";

//             } else if (forecastCode === 2) {

//                 forecastIcon = "⛅";

//             } else if (forecastCode === 3) {

//                 forecastIcon = "☁️";

//             } else if (forecastCode >= 51 && forecastCode <= 57) {

//                 forecastIcon = "🌦️";

//             } else if (forecastCode >= 61 && forecastCode <= 67) {

//                 forecastIcon = "🌧️";

//             } else if (forecastCode >= 71 && forecastCode <= 77) {

//                 forecastIcon = "❄️";

//             } else if (forecastCode >= 80 && forecastCode <= 82) {

//                 forecastIcon = "🌧️";

//             } else if (forecastCode >= 95) {

//                 forecastIcon = "⛈️";
//             }


//             // yaha forecast card ke andar date, icon aur temperature show kar rahe hai
//             day.innerHTML = `

//                 <div class="forecast-day">
//                     ${formattedDay}
//                 </div>

//                 <div class="forecast-icon">
//                     ${forecastIcon}
//                 </div>

//                 <div class="forecast-temp">
//                     ${Math.round(maxTemperatures[i])}° /
//                     ${Math.round(minTemperatures[i])}°
//                 </div>

//             `;


//             forecast.appendChild(day);

//         }


//         // console.log("Weather data:", weatherData);


//     } catch (error) {


//         // yaha mene catch lagaya hai taki koi error aaye
//         // to catch me aa jaye aur user ko error message show ho jaye

//         weatherResult.textContent = error.message;

//     }

// }


// searchBtn.addEventListener("click", function () {

//     getWeather();
//     cityInput.value = "";

// });


// // yaha mene search button pe click hone par getWeather function ko call kiya hai
// // taki user ke input ke hisab se weather data fetch ho sake

// cityInput.addEventListener("keydown", function (event) {

//     if (event.key === "Enter") {
//         getWeather();


//     // yaha se input box khali ho jayega
//     // taki user ko khali mile input box

//     cityInput.value = "";
//     }

// });

// // yaha mera storage ka getItem hai
// // taki user ke last search ko yaad rakha ja sake

// const savedCity = localStorage.getItem("city");


// // console.log(savedCity);


// // yaha me dekhunga ki agar savedCity me kuch hai
// // to wo input box me show ho aur getWeather function call ho jaye
// // taki user ke last search ka weather data show ho jaye

// if (savedCity) {

//     cityInput.value = savedCity;

//     getWeather();

//     cityInput.value = "";

// }


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
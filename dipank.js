function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '2c9b207e59205f714e88aaac611d49e8'; // Get your API key from OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = `
                <p>City: ${data.name}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description} <i class="fas fa-${data.weather[0].icon}"></i></p>
                <!-- Additional weather details -->
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            `;
            document.getElementById('weatherData').innerHTML = weatherData;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('weatherData').innerHTML = "<p>City not found. Please try again.</p>";
        });

    // Save search history
    const searchHistory = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [];
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiKey = '2c9b207e59205f714e88aaac611d49e8'; // Get your API key from OpenWeatherMap
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const weatherData = `
                        <p>City: ${data.name}</p>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Weather: ${data.weather[0].description} <i class="fas fa-${data.weather[0].icon}"></i></p>
                        <!-- Additional weather details -->
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                        <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                        <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                    `;
                    document.getElementById('weatherData').innerHTML = weatherData;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    document.getElementById('weatherData').innerHTML = "<p>Unable to fetch weather for current location. Please try again later.</p>";
                });
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

function displaySearchHistory() {
    const searchHistory = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [];
    const historyList = document.getElementById('searchHistory');
    historyList.innerHTML = '<h2>Search History</h2>';
    searchHistory.forEach(city => {
        const item = document.createElement('p');
        item.textContent = city;
        historyList.appendChild(item);
    });
}

function toggleUnits() {
    const unitToggle = document.getElementById('unitToggle');
    const temperatureElements = document.querySelectorAll('#weatherData p:nth-child(2)');
    if (unitToggle.checked) {
        temperatureElements.forEach(element => {
            const tempCelsius = parseFloat(element.textContent.split(':')[1]);
            const tempFahrenheit = (tempCelsius * 9/5) + 32;
            element.textContent = `Temperature: ${tempFahrenheit.toFixed(2)}°F`;
        });
    } else {
        temperatureElements.forEach(element => {
            const tempFahrenheit = parseFloat(element.textContent.split(':')[1]);
            const tempCelsius = (tempFahrenheit - 32) * 5/9;
            element.textContent = `Temperature: ${tempCelsius.toFixed(2)}°C`;
        });
    }
}

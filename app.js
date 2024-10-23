const apiKey = '5017427c49370796986d34974c53f79d';
const geminiApiKey = 'AIzaSyBwLAkcNtbucCnkr9n2ov83HoyYxmKg3cA';
const getWeatherBtn = document.getElementById('getWeatherBtn');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatResponse = document.getElementById('chatResponse');

let barChart, doughnutChart, lineChart;

getWeatherBtn.addEventListener('click', function() {
    const city = document.getElementById('searchBar').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            updateCharts(data);
            updateTable(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    const city = data.city.name;
    const currentWeather = data.list[0];
    const weatherDesc = currentWeather.weather[0].description;

    document.getElementById('cityName').textContent = city;
    document.getElementById('temperature').textContent = currentWeather.main.temp;
    document.getElementById('weatherDescription').textContent = weatherDesc;
    document.getElementById('humidity').textContent = currentWeather.main.humidity;
    document.getElementById('windSpeed').textContent = currentWeather.wind.speed;

    const weatherWidget = document.getElementById('weatherWidget');
    if (weatherDesc.includes('cloud')) {
        weatherWidget.style.backgroundImage = "url('cloudy.jpg')";
    } else if (weatherDesc.includes('rain')) {
        weatherWidget.style.backgroundImage = "url('rainy.jpg')";
    } else if (weatherDesc.includes('clear')) {
        weatherWidget.style.backgroundImage = "url('clear.jpg')";
    } else {
        weatherWidget.style.backgroundImage = "url('default-weather.jpg')";
    }
}

function updateCharts(data) {
    const labels = [];
    const temps = [];
    const weatherConditions = {};

    for (let i = 0; i < 5; i++) {
        const forecast = data.list[i];
        labels.push(forecast.dt_txt.split(' ')[0]);
        temps.push(forecast.main.temp);

        const condition = forecast.weather[0].main;
        if (weatherConditions[condition]) {
            weatherConditions[condition]++;
        } else {
            weatherConditions[condition] = 1;
        }
    }

    if (barChart) {
        barChart.destroy();
    }
    if (doughnutChart) {
        doughnutChart.destroy();
    }
    if (lineChart) {
        lineChart.destroy();
    }

    barChart = new Chart(document.getElementById('barChartCanvas'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                delay: 500
            }
        }
    });

    doughnutChart = new Chart(document.getElementById('doughnutChartCanvas'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherConditions),
            datasets: [{
                label: 'Weather Conditions',
                data: Object.values(weatherConditions),
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                delay: 500
            }
        }
    });

    lineChart = new Chart(document.getElementById('lineChartCanvas'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            animation: {
                drop: 500
            }
        }
    });
}

function updateTable(data) {
    const tableBody = document.querySelector('#forecastTable tbody');
    tableBody.innerHTML = ''; 

    for (let i = 0; i < 5; i++) {
        const forecast = data.list[i];
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = forecast.dt_txt.split(' ')[0];
        row.appendChild(dateCell);

        const tempCell = document.createElement('td');
        tempCell.textContent = forecast.main.temp + '°C';
        row.appendChild(tempCell);

        const weatherCell = document.createElement('td');
        weatherCell.textContent = forecast.weather[0].description;
        row.appendChild(weatherCell);

        tableBody.appendChild(row);
    }
}

sendChatBtn.addEventListener('click', function() {
    const query = chatInput.value.trim();
    
    if (query) {
        if (query.toLowerCase().includes('weather')) {
            const cityMatch = query.match(/in\s+([a-zA-Z\s]+)/);
            const city = cityMatch ? cityMatch[1] : null;
            
            if (city) {
                fetchWeather(city);
            } else {
                chatResponse.innerHTML = `<p>Please specify a city.</p>`;
            }
        } else {
            handleGeneralQuery(query);
        }
    } else {
        chatResponse.innerHTML = `<p>Please enter a question.</p>`;
    }
});

function handleGeneralQuery(query) {
    const url = `https://api.geminiapi.com/ask?q=${encodeURIComponent(query)}&apikey=${geminiApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            chatResponse.innerHTML = `<p>${data.answer}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
            chatResponse.innerHTML = `<p>Sorry, I couldn't fetch a response.</p>`;
        });
}

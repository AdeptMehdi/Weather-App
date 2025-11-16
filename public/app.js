// DOM elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const weatherDisplay = document.getElementById('weatherDisplay');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');
const historyList = document.getElementById('historyList');
const body = document.body;

// Load search history from sessionStorage
let searchHistory = JSON.parse(sessionStorage.getItem('weatherSearchHistory')) || [];

// Function to display weather data
function displayWeather(data) {
    cityName.textContent = cityInput.value.trim();
    temperature.textContent = `${Math.round(data.temperature)}°C`;
    description.textContent = data.description;
    humidity.textContent = `${data.humidity}%`;
    windSpeed.textContent = `${data.windSpeed} m/s`;
    weatherIcon.src = data.iconUrl;

    // Change background based on weather description
    updateBackground(data.description);

    // Hide loading, error, show weather
    hideLoading();
    hideError();
    weatherDisplay.classList.remove('hidden');
}

// Function to update background based on weather
function updateBackground(description) {
    body.className = 'min-h-screen flex items-center justify-center p-4'; // Reset

    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('clear') || lowerDesc.includes('sun')) {
        body.classList.add('bg-sunny');
    } else if (lowerDesc.includes('cloud')) {
        body.classList.add('bg-cloudy');
    } else if (lowerDesc.includes('rain') || lowerDesc.includes('shower')) {
        body.classList.add('bg-rainy');
    } else {
        body.classList.add('bg-gradient-to-br', 'from-blue-400', 'to-blue-600'); // Default
    }
}

// Function to show loading indicator
function showLoading() {
    loading.classList.remove('hidden');
}

// Function to hide loading indicator
function hideLoading() {
    loading.classList.add('hidden');
}

// Function to show error message
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Function to hide error message
function hideError() {
    errorDiv.classList.add('hidden');
}

// Function to update search history
function updateHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        if (searchHistory.length > 5) {
            searchHistory.shift(); // Keep only last 5
        }
        sessionStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
        displayHistory();
    }
}

// Function to display search history
function displayHistory() {
    historyList.innerHTML = '';
    searchHistory.forEach(city => {
        const li = document.createElement('li');
        li.className = 'cursor-pointer text-blue-600 hover:underline mb-1';
        li.textContent = city;
        li.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        historyList.appendChild(li);
    });
}

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        showLoading();
        const response = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
            updateHistory(city);
        } else {
            hideLoading();
            showError(data.error || 'An error occurred');
            weatherDisplay.classList.add('hidden');
        }
    } catch (err) {
        hideLoading();
        showError('Failed to fetch weather data. Please try again.');
        weatherDisplay.classList.add('hidden');
        console.error('Error:', err);
    }
}

// Form submission handler
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        hideLoading();
        weatherDisplay.classList.add('hidden');
        return;
    }
    fetchWeather(city);
});

// Initialize app
function init() {
    displayHistory();
}

init();

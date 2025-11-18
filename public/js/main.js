document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('weatherForm');
  const citySelect = document.getElementById('citySelect');
  const cityInput = document.getElementById('cityInput');
  const searchBtn = document.getElementById('searchBtn');

  // Load cities for dropdown
  loadCities();
  // Set default background effect
  updateEffects('sunny');
  // Load default weather
  fetchWeather('Tehran');

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim() || citySelect.value;
    if (!city) {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter a city name',
        text: 'Select from dropdown or type in the input field'
      });
      return;
    }
    fetchWeather(city);
  });

  async function loadCities() {
    try {
      const response = await fetch('/api/weather/cities');
      const data = await response.json();
      data.cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  }

  async function fetchWeather(city) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('searchBtn').disabled = true;

    try {
      const [currentRes, forecastRes] = await Promise.all([
        fetch(`/api/weather/current?city=${encodeURIComponent(city)}`),
        fetch(`/api/weather/forecast?city=${encodeURIComponent(city)}`)
      ]);

      if (currentRes.ok && forecastRes.ok) {
        const current = await currentRes.json();
        const forecast = await forecastRes.json();
        updateBackground(current.icon, current.description);
        updateCurrentWeather(city, current);
        updateForecast(forecast);
      } else {
        const error = await currentRes.json(); // Assuming same error message
        throw new Error(error.error);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Unable to fetch weather data'
      });
    } finally {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('searchBtn').disabled = false;
    }
  }

  function updateCurrentWeather(city, data) {
    document.getElementById('cityName').textContent = city;
    document.getElementById('weatherIcon').className = `fas ${data.icon} fa-3x mb-2`;
    document.getElementById('temperature').textContent = `${data.temp}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('feelsLike').textContent = data.feels_like;
    document.getElementById('humidity').textContent = data.humidity;
    document.getElementById('wind').textContent = data.wind;
    document.getElementById('currentWeather').style.display = 'block';
  }

  function updateBackground(icon, description) {
    // Map icon to weather status
    const iconMap = {
      'fa-sun': 'sunny',
      'fa-cloud-sun': 'cloudy',
      'fa-cloud': 'cloudy',
      'fa-cloud-showers-heavy': 'rainy',
      'fa-cloud-rain': 'rainy',
      'fa-wind': 'stormy',
      'fa-snowflake': 'snowy'
    };
    const status = iconMap[icon] || 'sunny'; // default to sunny

    document.body.className = status;
    updateEffects(status);
  }

  function updateEffects(status) {
    const container = document.getElementById('weather-effects');
    container.innerHTML = '';

    if (status === 'rainy') {
      for (let i = 0; i < 150; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (1.1 + Math.random() * 0.8) + 's';
        drop.style.animationDelay = '0s';
        container.appendChild(drop);
      }
    } else if (status === 'snowy') {
      for (let i = 0; i < 50; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.left = Math.random() * 100 + '%';
        flake.style.animationDuration = (4 + Math.random() * 4) + 's';
        flake.style.animationDelay = '0s';
        container.appendChild(flake);
      }
    } else if (status === 'cloudy') {
      for (let i = 0; i < 8; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = Math.random() * 50 + 5 + '%';
        cloud.style.width = (70 + Math.random() * 80) + 'px';
        cloud.style.height = (30 + Math.random() * 30) + 'px';
        cloud.style.animationDuration = (15 + Math.random() * 10) + 's';
        cloud.style.animationDelay = '0s';
        cloud.style.transform = `scale(${0.8 + Math.random() * 0.6})`;
        container.appendChild(cloud);
      }
    } else if (status === 'stormy') {
      const lightning = document.createElement('div');
      lightning.className = 'lightning';
      container.appendChild(lightning);
    } else if (status === 'foggy') {
      const fog = document.createElement('div');
      fog.className = 'fog-layer';
      container.appendChild(fog);
    } else if (status === 'night') {
      for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        star.style.animationDelay = '0s';
        container.appendChild(star);
      }
    } else if (status === 'sunny') {
      // Add some subtle background clouds
      for (let i = 0; i < 2; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = (25 + i * 5) + '%';
        cloud.style.width = (60 + Math.random() * 20) + 'px';
        cloud.style.height = (30 + Math.random() * 10) + 'px';
        cloud.style.animationDuration = (20 + Math.random() * 10) + 's';
        cloud.style.animationDelay = '0s';
        cloud.style.opacity = '0.2';
        container.appendChild(cloud);
      }
    }
  }

  function updateForecast(data) {
    const container = document.getElementById('forecastCards');
    container.innerHTML = '';
    data.forEach(day => {
      const card = document.createElement('div');
      card.className = 'col-6 col-md-4 col-lg-2';
      card.innerHTML = `
        <div class="forecast-card">
          <small>${day.date}</small>
          <i class="fas ${day.icon}"></i>
          <strong>${day.high}° / ${day.low}°</strong>
          <small>${day.description}</small>
        </div>
      `;
      container.appendChild(card);
    });
    document.getElementById('forecast').style.display = 'block';
  }
});

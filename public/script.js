 //making object of weatherapi
const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

//anonymous function
//adding event listener key press of enter
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        getWeatherReport(searchInputBox.value);
    }
})

//get weather report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => weather.json())
        .then(showWeaterReport);
}

//show weather report
function showWeaterReport(weather) {
    let city_code = weather.cod;
    if (city_code === '400') {
        swal("Empty Input", "Ram Ram Sareya ne. Please enter any city", "error");
        reset();
    } else if (city_code === '404') {
        swal("Bad Input", "Entered city ko kahi nai paya gaya", "warning");
        reset();
    } else {
        let op = document.getElementById('weather-body');
        op.style.display = 'block';
        let todayDate = new Date();
        let parent = document.getElementById('parent');
        let weather_body = document.getElementById('weather-body');
        weather_body.innerHTML = `
        <div class="location-deatils">
            <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
            <div class="date" id="date"> ${dateManage(todayDate)}</div>
        </div>
        <div class="weather-status">
            <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
            <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
            <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
            <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
        </div>
        <hr>
        <div class="day-details">
            <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
        </div>`;
        parent.append(weather_body);
        changeBg(weather.weather[0].main);
        reset();
    }
}

function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}) , ${year}`;
}

function changeBg(status) {
    const backgrounds = {
        Clouds: 'clouds.jpg',
        Rain: 'rainy.jpg',
        Clear: 'clear.jpg',
        Snow: 'snow.jpg',
        Sunny: 'sunny.jpg',
        Thunderstorm: 'thunderstrom.jpg',
        Drizzle: 'drizzle.jpg',
        Mist: 'mist.jpg',
        Haze: 'mist.jpg',
        Fog: 'mist.jpg'
    };

    document.body.style.backgroundImage = `url(img/${backgrounds[status] || 'bg.jpg'})`;
}

function getIconClass(classarg) {
    const icons = {
        Rain: 'fas fa-cloud-showers-heavy',
        Clouds: 'fas fa-cloud',
        Clear: 'fas fa-cloud-sun',
        Snow: 'fas fa-snowman',
        Sunny: 'fas fa-sun',
        Mist: 'fas fa-smog',
        Thunderstorm: 'fas fa-thunderstorm',
        Drizzle: 'fas fa-thunderstorm'
    };

    return icons[classarg] || 'fas fa-cloud-sun';
}

function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

function addZero(i) {
    return i < 10 ? "0" + i : i;
}

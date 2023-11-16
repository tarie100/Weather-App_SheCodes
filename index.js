function refreshWeather(response){
    let tempelement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city-id");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#app-icon");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    tempelement.innerHTML= Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
    getForecast(response.data.city);
}
function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sun",
        "Mon",
        "Tues",
        "Wed",
        "Thur",
        "Fri",
        "Sat",
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
   return days[date.getDay()]; 
}
function getForecast(city) {
    let apikey = "4ec9b247b78do0486tc7cae2df03aa2e";
    let apiurl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
    axios(apiurl).then(displayForecast);
}

function displayForecast(response){
    let forehtml = "";

    response.data.daily.forEach(function (day, index){
        if (index < 5){
            forehtml =
            forehtml +
            `
            <div class="weather-forecast" id="forecast">
           <div class="row">
            <div class="col-2">
                <div class="fore-date">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}" class="fore-icon" />
                <div class="fore-temp">
                    <span class="temp-max">${Math.round(day.temperature.maximum)}° </span>
                    <span class="temp-min">${Math.round(day.temperature.minimum)}° </span>
                </div>

            </div>
            
           </div>
        </div>
        `;
        }
    });

let foreElement = document.querySelector("#forecast");
foreElement.innerHTML = forehtml;
}
function searchCity(city){
    let apiKey = "4ec9b247b78do0486tc7cae2df03aa2e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}
function handlesearch(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    /*cityElement.innerHTML = searchInput.value;*/
    searchCity(searchInput.value);
} 
let searchElement= document.querySelector("#search-form");
searchElement.addEventListener("submit", handlesearch);

searchCity("Johannesburg");
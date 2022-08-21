// OpenWeatherMap API. Do not share it publicly.
const api = '6a28bf2f5318cf45b0c7cd748ed578da'; //Replace with your API

var hourIn24Format = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric"
});

var currentTime = new Date().toLocaleTimeString();


const navigation_bar = document.querySelector("#nav_bar");
const weather_info = document.querySelector("#weather_info");
const form = document.querySelector("form");
const search = document.querySelector("#search-input");
const modal_hour_weather = document.querySelector("#modal_hour_weather");
const forecast_weather = document.querySelector("#forecast_weather");



function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}


const getForecast = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return showForecast(data);
}



const showForecast = (data) => {
    let timezonee = data.city.timezone
    let sunriseTime = data.city.sunrise;
    let sunsetTime = data.city.sunset;
    let sunRise = moment.utc(sunriseTime, 'X').add(timezonee, 'seconds').format('HH:mm A');
    let sunSet = moment.utc(sunsetTime, 'X').add(timezonee, 'seconds').format('HH:mm');
    sunSet = tConvert(sunSet);

    weather_info.innerHTML = `                    <div class="card ">
    <h5 class="card-header text-center">WEATHER IN <p class="text-uppercase fw-bold">${data.city.name}</p></h5>
    <div class="card-body">
        <div class="row">
            <div class="current-weather">
                <div class="col">
                    <!-- <div class="row">
                        <h3>CURRENT WEATHER</h3>
                    </div> -->
                    <div class="card current_weather_temp">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title">
                                        <img
                                            src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">
                                    </h5>
                                </div>
                                <div class="col">
                                    <h5 class="card-title">${data.list[0].main.temp}°C</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="current-weather-list">
                <ul class="list-group list-group-flush">


                    <li class="list-group-item">
                        <div class="text-center">
                            <div class="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
                                    <path
                                        d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                                    <path
                                        d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                                </svg>
                            </div>
                            <div class="col margin-to-keys">
                                Feels Like
                            </div>
                            <div class="col margin-to-values1">
                                ${data.list[0].main.feels_like}°C
                            </div>
                            </div>
                        
                    </li>
                    <li class="list-group-item">
                        <div class="text-center">
                            <div class="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
                                </svg>
                            </div>
                            <div class="col margin-to-keys">
                                Humidity
                            </div>
                            <div class="col margin-to-values2">
                                ${data.list[0].main.humidity}%
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="text-center">
                            <div class="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                                    <path
                                        d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </div>
                            <div class="col margin-to-keys">
                                Wind (mph)
                            </div>
                            <div class="col margin-to-values3">
                                ${data.list[0].wind.speed}
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="text-center">
                            <div class="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                                    <path
                                        d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </div>
                            <div class="col margin-to-keys">
                                Pressure
                            </div>
                            <div class="col margin-to-values4">
                                ${data.list[0].main.pressure}
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="text-center">
                            <div class="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" class="bi bi-sunrise-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </div>
                            <div class="col margin-to-keys">
                                Sunrise
                            </div>
                            <div class="col margin-to-values5">
                                ${sunRise}
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="text-center">
                            <div class="col">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" class="bi bi-sunset-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </div>
                            <div class="col margin-to-keys">
                                Sunset
                            </div>
                            <div class="col margin-to-values6">
                                ${sunSet}
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- For load the modal -->
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="astext" type="button" data-bs-toggle="modal"
                        data-bs-target="#moreWeatherInformation"><p class="fw-bold mr-3">More</p></button>
                </div>
            </div>
        </div>
    </div>
</div>
`;
    // fetching more data on card popup
    var date = new Date();
    var day = date.getDate();
    var currentDate = day;
    let time = data.list[2].dt_txt.slice(11, 16);
    convertedTime = tConvert(time)
    for (let i = 2; i < 8; i++) {
        let time = data.list[i].dt_txt.slice(11, 16);
        convertedTime = tConvert(time)

        let apiDateForFetching = data.list[i].dt_txt.slice(8, 10);
        if (apiDateForFetching != currentDate) {
            break;
        }
        else {
            modal_hour_weather.innerHTML += `
            
            <li class="list-group-item">
                <div class="row justify-content-between">
                    <div class="col">
                        ${convertedTime}
                    </div>
                    <div class="col-2">
                        ${data.list[i].main.temp}°C
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-4">
                        <img
                            src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">
                    </div>
                </div>
            </li>
        `;
        }
    }

    // fetching forecast weather report
    currentDate++;
    for (let i = 0; i < 40; i++) {
        let apiDateForFetching = data.list[i].dt_txt.slice(8, 10);

        if (currentDate == apiDateForFetching) {
            let apiDate = data.list[i].dt_txt.slice(0, 10);
            forecast_weather.innerHTML += `        <div class="card mt-3">
            <div class="card-body">
                <div class="row justify-content-between">
                    <div class="col">
                        ${apiDate}
                    </div>
                    <div class="col-2 text-capitalize description">
                    ${data.list[i].weather[0].description}
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-2">
                        <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">
                    </div>
                    <div class="col-3">
                        ${data.list[i].main.temp}°C
                    </div>
                </div>
            </div>
        </div>`;
            currentDate++;
        }
    }
    document.getElementById("forecast_weather").style.paddingBottom = "5rem";
}

form.addEventListener(
    "submit",
    function (event) {
        // getWeather(search.value)
        getForecast(search.value)
        event.preventDefault();
    }
)
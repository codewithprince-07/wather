const indianCities = [
    "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Ahmedabad",
    "Pune", "Jaipur", "Lucknow", "Patna", "Bhopal", "Raipur", "Ranchi", "Chandigarh",
    "Shimla", "Dehradun", "Guwahati", "Gangtok", "Aizawl", "Agartala", "Imphal", "Itanagar",
    "Kohima", "Panaji", "Thiruvananthapuram", "Bhubaneswar", "Dispur", "Shillong","Prayagraj","Darbhanga","Jaideopatti",
    "Jharkhand"
];

// Populate datalist
const datalist = document.getElementById("cities");
indianCities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    datalist.appendChild(option);
});

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const inputBox = document.querySelector(".search-box input");

search.addEventListener('click', () => {
    const APIKey = '241aec750487f391436726a3a422008d';
    const cityInput = inputBox.value.trim();

    if (cityInput === '') return;

    const city = cityInput.includes(',') ? cityInput : `${cityInput},in`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === "404") {
                alert("City not found. Please enter a valid Indian city.");
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = "block";
            weatherDetails.style.display = "block";
        })
        .catch(error => {
            console.error("API Error:", error);
            alert("Something went wrong. Please try again later.");
        });
});

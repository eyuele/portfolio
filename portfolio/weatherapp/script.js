let countryLocation = null;
let count = 0;
const renderTime = async () => {
    const timefield = document.getElementById('clock');
    try {
        const clockResponse = await fetch('https://time.now/developer/api/ip')
        if (!clockResponse.ok) {
            throw new Error(`HTTP error! Clock`);
        }
        const clockData = await clockResponse.json();
        timefield.textContent = clockData.datetime.split('T')[1].split('.')[0];
        if (count == 0) {
            countryLocation = clockData.timezone;
            renderWeather(countryLocation);
            count += 1;
        }
    }
    catch (error) {
        console.error('Clock fetch failed:', error);
        timefield.textContent = '--:--:--';
    }
}
const renderWeather = async (timezone) => {
    const countryContent = document.getElementById('country');
    const weatherContent = document.getElementById('weather');
    const iconContent = document.getElementById('icon');
    if (!timezone) return;
    // Extract city name (e.g., "Africa/Addis_Ababa" → "Addis Ababa")
    const city = timezone.split('/').pop().replace(/_/g, ' ');
    const apiKey = 'b7dee92d71dde81fdca66c4c8a4cbb05'; // Store as a constant

    try {
        // FIXED: Added $, added &units=metric for Celsius
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!weatherResponse.ok) throw new Error('Weather HTTP error');
        const weatherData = await weatherResponse.json();
        const weatherStatus = weatherData.weather[0];
        // Display temperature & city
        const temp = Math.round(weatherData.main.temp);
        iconContent.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherStatus.icon}@2x.png" >`;
        countryContent.textContent = `${city}`;
        weatherContent.textContent = `temp: ${temp}°C , Weather: ${weatherStatus.main}`;

        // Map the API's weather status to your CSS background variables
        if (weatherStatus.main === "Clouds") {
            // 801-802: Few/scattered (slightly cloudy)
            if (weatherStatus.id <= 802) {
                document.documentElement.style.setProperty('--bgimage', 'url(image/cloud3.jpg)');
            }
            else if (weatherStatus.id >= 803 && weatherStatus.id <= 820) {

                document.documentElement.style.setProperty('--bgimage', 'url(image/cloud1.jpg)');
            }
            else {
                // 803-804: Broken/overcast (fully cloudy)
                document.documentElement.style.setProperty('--bgimage', 'url(image/cloud2.jpg)');
            }
        }
        else if (weatherStatus.main === "Drizzle" || weatherStatus.main === "Rain") {
            // 502-504, 522-531: Heavy rain or heavy showers
            if (weatherStatus.id >= 502) {
                document.documentElement.style.setProperty('--bgimage', 'url(image/rain1.jpg)');
            } else {
                // Light rain, moderate rain, or light drizzle
                document.documentElement.style.setProperty('--bgimage', 'url(image/rain2.jpg)');
            }
        }
        else if (weatherStatus.main === "Thunderstorm") {
            document.documentElement.style.setProperty('--bgimage', 'url(image/thunderstorm.jpg)');
        }
        else if (weatherStatus.main === "Snow") {
            document.documentElement.style.setProperty('--bgimage', 'url(image/snow.jpg)');
        }
        else if (["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado"].includes(weatherStatus.main)) {
            // Grouped together as atmospheric conditions
            document.documentElement.style.setProperty('--bgimage', 'url(image/atmosphere.jpg)');
        }
        else {
            // Fallback for "Clear" (ID 800) or any unexpected status
            document.documentElement.style.setProperty('--bgimage', 'url(image/sun.jpg)');
        }


    } catch (error) {
        console.error('Weather fetch failed:', error);
        countryContent.textContent = 'Weather unavailable';
    }
};

const countryField = document.getElementById("countryField");
const getweatherbtn = document.getElementById("getweather");
const resetButton = document.getElementById("reset");
getweatherbtn.addEventListener("click", () => {


    countryLocation = countryField.value;
    renderWeather(countryLocation);



});
resetButton.addEventListener("click", () => {
    count = 0;
    countryLocation = null;
    renderWeather(countryLocation);
    countryField.value = ""
})

setInterval(renderTime, 1000);
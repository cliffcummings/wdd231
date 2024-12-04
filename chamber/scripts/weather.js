// const currentW = doc.querySelector('#weather');
console.log("Going to GET WEATHER data");

// Select HTML elements in the document
let currentTemp = doc.querySelector('#current-temp');
let weatherIcon = doc.querySelector('#weather-icon');
let captionDesc = doc.querySelector('figcaption');

// CREATE REQUIRED VARIABLES FOR THE WEATHER URL
const myKey = "73800dbdd8f82289ae1b430c2dba614e";
const myLat = "40.23333058402793";
const myLong = "-111.6669845143336";

// weatherUrl that includes the API request for my Provo-home data
const weatherUrl  = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// First:  await fetch(weatherUrl);      for the web page to responsd
// Second: await response.json(); for the web page to send us the requested data
async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);    // testing only
            if (url == weatherUrl) {
                displayResults(data);
            } else if (url == forecastUrl) {
                // console.log("Going to display Forecast");
                // console.log(`list[0].dt VALUE IS: ${data.list[0].dt}`);
                displayForecast(data);
            }
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
};

function displayResults(data) {
    console.log("Display Results function called");
    console.log(`data.city ${data}`);
    captionDesc.innerHTML = data.weather[0].description;
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
};

function displayForecast(data) {
    console.log("Display Forecast function called");
    console.log(data);
    const arrayFromObject = Object.values(data.list); 
    arrayFromObject.forEach(item => {
        console.log(`dt / dt_txt VALUES ARE ${item.dt} / ${item.dt_txt}`);
    });
    // data.list.foreach (day => {
    //     console.log(`dt_txt VALUE IS: ${item.dt_txt}`);
    // });
    // data.list.foreach (day => {
    //     console.log(`dt_txt VALUE IS: ${day.dt_txt}`);
    // });
    
    const option = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    };
    const today = new Date(data.list[0].dt, option);
    console.log(`Today's dt/ is ${today} : ${data.list[0].dt_txt}`);
    // const filteredcnotes = cnotes.filter      (cnotes       => cnotes.tags.includes      (tag));

    const dayPlus1 = data.list[0].dt+1;
    const dayPlus2 = dayPlus1 + 1;
    const dayPlus3 = dayPlus1 + 2;
    console.log(`Next three dt values: ${dayPlus1} / ${dayPlus2} / ${dayPlus3} `);

    let forecastDay1 = (dayPlus1 => arrayFromObject.includes(dayPlus1));
    let forecastDay2 = (arrayFromObject => arrayFromObject.includes(dayPlus2));
    let forecastDay3 = (arrayFromObject => arrayFromObject.includes(dayPlus3));

    console.log(`SHOWING ${forecastDay1}`);
    console.log(`SHOWING ${forecastDay2}`);
    console.log(`SHOWING ${forecastDay3}`);
    // console.log(forecastDay2);
    // console.log(forecastDay3);
}


apiFetch(weatherUrl);
apiFetch(forecastUrl);
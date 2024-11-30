// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// CREATE REQUIRED VARIABLES FOR THE URL
const myKey = "73800dbdd8f82289ae1b430c2dba614e";
const myLat = "40.21621620342333";
const myLong = "-111.62962707582065";

// url that includes the API request for my Provo-home data
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// First:  await fetch(url);      for the web page to responsd
// Second: await response.json(); for the web page to send us the requested data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.table(data);  // testing only
            console.log(data);    // testing only
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
};

function displayResults(data) {
    console.log("Display Results function called");
    captionDesc.innerHTML = data.weather[0].description;
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    // const iconsrc = `https://openweathermap.org/img/w/10d.png`; // fixed rain cloud
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
};

apiFetch();
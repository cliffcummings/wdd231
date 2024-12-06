// const currentW = doc.querySelector('#weather');
console.log("Going to GET WEATHER data");

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
            // console.log(data);    // testing only
            if (url == weatherUrl) {
                displayCurrentWeather(data);
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

// Select current weather HTML elements in the document
let captionDesc = doc.querySelector('figcaption');
let currentTemp = doc.querySelector('#current-temp');
let weatherIcon = doc.querySelector('#weather-icon');

function displayCurrentWeather(data) {
    console.log("displayCurrentWeather function called");
    console.log(data);
    console.log("data displayed above");
    captionDesc.innerHTML = data.weather[0].description;
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    // const iconsrc = 'https://openweathermap.org/img/wn/02d@2x.png';
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherIcon.setAttribute('width', 140);
    weatherIcon.setAttribute('height', 140);
};

function displayForecast(data) {
    console.log("displayForecast function called");
        
    // Select forecast HTML elements in the document
    let day1Date = doc.querySelector('#date1');
    let day1Temp = doc.querySelector('#temp1');
    let day1Icon = doc.querySelector('#icon1');
    let day1Desc = doc.querySelector('#fig1');

    let day2Date = doc.querySelector('#date2');
    let day2Temp = doc.querySelector('#temp2');
    let day2Icon = doc.querySelector('#icon2');
    let day2Desc = doc.querySelector('#fig2');

    let day3Date = doc.querySelector('#date3');
    let day3Temp = doc.querySelector('#temp3');
    let day3Icon = doc.querySelector('#icon3');
    let day3Desc = doc.querySelector('#fig3');

    // console.log(data);
    dateArray = createDatesArray();
    const arrayFromObject = Object.values(data.list); 
    let filteredDay1 = filterArray(arrayFromObject, dateArray[1]);
    let filteredDay2 = filterArray(arrayFromObject, dateArray[2]);
    let filteredDay3 = filterArray(arrayFromObject, dateArray[3]);
    // console.log(filteredDay1);

    let day1 = returnDayInfo(filteredDay1, dateArray[1]);
    console.log(`Day 1 INFO is: ${day1}`);

    let day2 = returnDayInfo(filteredDay2, dateArray[2]);
    console.log(`Day 2 INFO is: ${day2}`);

    let day3 = returnDayInfo(filteredDay3, dateArray[3]);
    console.log(`Day 3 INFO is: ${day3}`);

    console.log(day1[3]);
    console.log(day2[1]);
    console.log(day3[1]);
    // day1Temp.innerHTML = day1[1];

    const iconsrc1 = `https://openweathermap.org/img/wn/${day1[0]}@2x.png`;
    day1Icon.setAttribute('src', iconsrc1);
    day1Icon.setAttribute('alt', day1[1]);
    day1Icon.setAttribute('width', 140);
    day1Icon.setAttribute('height', 140);
    day1Date.innerHTML = `${day1[1]}`;
    day1Desc.innerHTML = `${day1[2]}`;
    day1Temp.innerHTML = `High: ${day1[3]}&deg;F`;

    const iconsrc2 = `https://openweathermap.org/img/wn/${day2[0]}@2x.png`;
    day2Icon.setAttribute('src', iconsrc2);
    day2Icon.setAttribute('alt', day2[1]);
    day2Icon.setAttribute('width', 140);
    day2Icon.setAttribute('height', 140);
    day2Date.innerHTML = `${day2[1]}`;
    day2Desc.innerHTML = `${day2[2]}`;
    day2Temp.innerHTML = `High: ${day2[3]}&deg;F`;

    const iconsrc3 = `https://openweathermap.org/img/wn/${day3[0]}@2x.png`;
    day3Icon.setAttribute('src', iconsrc3);
    day3Icon.setAttribute('alt', day3[1]);
    day3Icon.setAttribute('width', 140);
    day3Icon.setAttribute('height', 140);
    day3Date.innerHTML = `${day3[1]}`;
    day3Desc.innerHTML = `${day3[2]}`;
    day3Temp.innerHTML = `High: ${day3[3]}&deg;F`;
}  

function formatDate (date) {
    const options = {
        year:  "numeric",
        month: "2-digit",
        day:   "2-digit"
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    const [month, day, year] = formattedDate.split("/");
    newDate = `${year}-${month}-${day}`;
    // console.log(`=========================================`);
    // console.log(`===== The NEW formattedDate: ${newDate} =====`);
    return newDate;
};

function createDatesArray () {
    const today = new Date();
    const newday = new Date();
    const dateArray = [];
    for (i=0; i<4; i++ ){
        dateArray[i] = formatDate(newday.setDate(today.getDate() + i));
        console.log(`SHOWING dateArray[${i}]: ${dateArray[i]}`);
    }
    return dateArray;
};
    
function filterArray(array, requestedDate) {
// Process array items searching for matching dates and 
// store them into the filtered array
    // console.log(array);
    // console.log(requestedDate);
    const filteredArray = array.filter((item) => {
        // console.log(`START: ${item.dt_txt}`);  // TODO - DEBUG
        const itemDay = new Date(item.dt_txt);
        // console.log(`FROM filterArray function: ${itemDay}`);
        let itemDate = formatDate(itemDay);
        // console.log(`itemDate:      ${itemDate}`);
        // console.log(`requestedDate: ${requestedDate}`);
        if (itemDate == requestedDate) {
            // console.log(`PASS:  ${item.dt_txt}`);  // TODO - DEBUG
            return item;
        // } else {
            // console.log(`FAIL:  ${item.dt_txt}`);  // TODO - DEBUG
        };
    });
    // console.log(filterArray);
    return filteredArray;
}

function returnDayInfo (array, dateString) {
    let max = 0;
    let desc = "";
    let date = dateString;
    let icon = "initialIcon";
    let returnData = [max, desc, date, icon];
    // console.log(`INITIAL returnData values: ${returnData}`)

    // console.log(returnData);
    // console.log(array.length);
    // console.log(array[0].main.temp_max);
    for (let i=0; i<array.length; i++) {
        if (array[i].main.temp_max > max) {
            max = array[i].main.temp_max;
            // console.log(`for-loop temp_max is ${array[i].main.temp_max}`);
        }
        desc = array[i].weather[0].description;
        // console.log(array[i].weather[0].description);

        icon = array[i].weather[0].icon;
        // console.log(array[i].weather[0].description);
    };

    returnData[0] = icon;
    returnData[1] = getFullDate(dateString);
    returnData[2] = desc;
    returnData[3] = max.toFixed(0);
    // console.log(`FINAL returnData values: ${returnData}`);
    return returnData;
};

function getFullDate(dt) {
    const day = new Date(dt);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return day.toLocaleString("en-us", options);
}

function createForecastCard(date, temp, desc, icon) {
    return `<section class="forcast-card">
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="100" height="100">
    <div>
    <h4>${date}</h4>
    <p class="weather-desc">${desc}</p>
    <p>High: ${temp}&deg;F</p>
    <div>
    </section>`
};

apiFetch(weatherUrl);
apiFetch(forecastUrl);
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
            // console.log(data);    // testing only
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
    // console.log(`data.city ${data}`);
    captionDesc.innerHTML = data.weather[0].description;
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
};

function displayForecast(data) {
    console.log("Display Forecast function called");
    // console.log(data);
    dateArray = createDatesArray();
    const arrayFromObject = Object.values(data.list); 
    let filteredDay1List = filterArray(arrayFromObject, dateArray[1]);
    let filteredDay2List = filterArray(arrayFromObject, dateArray[2]);
    let filteredDay3List = filterArray(arrayFromObject, dateArray[3]);
    // console.log(filteredDay1List);
    let max = returnMaxTemp(filteredDay1List);
    console.log(`Day 1 MAX is: ${max}`);
    max = returnMaxTemp(filteredDay2List);
    console.log(`Day 2 MAX is: ${max}`);
    max = returnMaxTemp(filteredDay3List);
    console.log(`Day 3 MAX is: ${max}`);
    arrayFromObject.forEach(item => {
        const date = new Date(item.dt_txt);
        // const formattedDate = formatDate(date);
        // console.log(`=========================================`);
        // console.log(`===== The formattedDate: ${formattedDate} =====`);

        // const matchDate = item.dt_txt.slice(0,10);
        // console.log(`dt_txt DATE: ${matchDate}`);

        // if (matchDate === newDate) {
        //     console.log("***** DATES MATCH *****");
        // } else {
        //     console.log("***** DATES DO NOT MATCH *****");
        // };
    });

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
            // console.log(`SHOWING dateArray[${i}]: ${dateArray[i]}`);
        }
        return dateArray;
    };
   
    // To prove dates are working, uncomment the next four lines
    // const today = new Date();
    // let future = new Date();
    // future = formatDate(future.setDate(today.getDate() + 30)); // Add 30 days
    // console.log(`SHOWING DAY+30: ${future}`);
    
    // console.log(`Today's dt_txt is ${data.list[0].dt_txt} ::: Tomorrow is ${dateArray[1]}`);
    
    // Process array items searching for matching dates and 
    // store them into the filtered array
    function filterArray(array, requestedDate) {
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
            } else {
                // console.log(`FAIL:  ${item.dt_txt}`);  // TODO - DEBUG
            };
        });
        // console.log(filterArray);
        return filteredArray;
    }

    function returnMaxTemp (array) {
        let max = 0;
        // console.log(max);
        // console.log(array.length);
        // console.log(array[0].main.temp_max);
        for (let i=0; i<array.length; i++) {
            if (array[i].main.temp_max > max) {
                max = array[i].main.temp_max;
                // console.log(`for-loop temp_max is ${array[i].main.temp_max}`);
            }
        };
        return max;
    };
}

function getFullDate(dt) {
    const day = new Date(dt);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return day.toLocaleString("en-us", options);
}




apiFetch(weatherUrl);
apiFetch(forecastUrl);
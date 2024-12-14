// Days since last visit JavaScript
let daysBetweenVisits = 0;
const millisecs2Days = 86400000;

//-----------------------------------------------------------------
// The || [] part of the expression uses the OR operator to return
// an empty array ([]) if JSON.parse returns null (first visit).
//-----------------------------------------------------------------

let lastVisit = new Date(0);
lastVisit = JSON.parse(localStorage.getItem("visited")) || [];
const todaysDate = Date.now();
console.log(todaysDate);

const message = document.querySelector(".visit-msg");
let msg = "";

// Convert milliseconds to days between visits
daysBetweenVisits = ((todaysDate - lastVisit) / millisecs2Days).toFixed(0);

console.log("Entering if-statement");
console.log(`Last visit value ${lastVisit}`);
console.log(`Days between visits: ${daysBetweenVisits}`);

// msg is initially set but then overridden if lastVisit.Visit.length is not 0
// If not overridden, this is the first visit
msg = "Welcome! Let us know if you have any questions";
if (lastVisit.length !== 0) {
  if (daysBetweenVisits==0) {
    msg = "Back so soon! Awesome!";
} else {
    msg = `You last visited ${daysBetweenVisits} day(s) ago.`;
  }
}

message.innerHTML = msg;

// Save the date for the most recent visit
localStorage.setItem("visited", Date.now());
// Days since last visit JavaScript
let daysBetweenVisits = 0;
const millisecs2Days = 86400000;

//-----------------------------------------------------------------
// The || [] part of the expression uses the OR operator to return
// an empty array ([]) if JSON.parse returns null (first visit).
//-----------------------------------------------------------------
const lastVisit = JSON.parse(localStorage.getItem("visited")) || [];
const todaysDate = Date.now();

const message = document.querySelector(".visit-msg");
let msg = "Welcome to your first visit to this webpage!";

// Convert milliseconds to days between visits
daysBetweenVisits = (todaysDate - lastVisit) / millisecs2Days;

msg = `You last visited ${daysBetweenVisits.toFixed(0)} day(s) ago.`;

message.innerHTML = msg;

localStorage.setItem("visited", Date.now());
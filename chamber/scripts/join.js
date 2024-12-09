// Grab the entire URL for this page including the attached GET values
const currentUrl = window.location.href;
console.log(currentUrl);

// Divide the url into two halves
const everything=currentUrl.split('?');
// console.log(everything);
let formData = everything;
console.log(formData);

// Grab just the second half
// let formData = everything[1].split('&');
// console.log(formData);

// Break the form name-value pairs into an array
// formData = formData.split('&');
// console.log(formData);
// function show(cup) {
//     // console.log(cup);
//     formData.forEach((element) => {
//         // console.log(element);
//         if (element.startsWith(cup)) {
//             // console.log("Found a Match");
//             result=element.split('=')[1].replace("%40","@");
//             // === Long version === //
//             // result=element.split('=');
//             // result=result[1];
//             // result=result.replace("%40","@");
//             // console.log(result);
//         }
//     });
//     return (result);
// }

// const showInfo = document.querySelector('#results');
// // showInfo.innerHTML = formData[0] + formData[1];
// // showInfo.innerHTML = show("email");
// showInfo.innerHTML = `
// <p>Appointment for ${show("first")} ${show("last")}</p>
// <p>Proxy ${show('ordinance')} on ${show('fecha')} in the ${show('location')} Temple</p>
// <p>Your Phone: ${show('phone')}</p>
// <p>Your Email: <a href=${show('email')}>${show('email')}</a></p>
// `;

// show("phone");
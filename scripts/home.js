// // Used for debugging
// //----------------------------------------------------------------------------
// // Code to help detect window size and which css file is being used
// // https://www.tutorialrepublic.com/codelab.php?topic=faq&file=javascript-window-resize-event
// //----------------------------------------------------------------------------
// function displayWindowInfo(){
//     // Get width and height of the window excluding scrollbars
//     let w = Number(document.documentElement.clientWidth);

//     if (w > 700) {
//         document.getElementById("css-src").innerHTML = `<p id="css-src">Uses sunburst-large.css</p>`;
//         // console.log("Large size!");
//     } else {
//         document.getElementById("css-src").innerHTML = `<p id="css-src">Uses sunburst.css</p>`;
//         // console.log("Small size!");
//     };
        
//     // Display result inside a div element
//     document.getElementById("result").innerHTML = "Width: " + w;
// }
 
// // Attaching the event listener function to window's resize event
// window.addEventListener("resize", displayWindowInfo);

// // Calling the function for the first time
// displayWindowInfo();
// //----------------------------------------------------------------------------

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});
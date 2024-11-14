let yr = new Date().getFullYear();
let lastModified = document.lastModified;
let author = "Cliff Cummings";
let place = "Utah, USA";

// \u00A9 is the unicode for the copywrite symbol
// backticks allow us to insert variables into the output.
document.getElementById("copywrite").innerHTML = `\u00A9 ${yr} | ${author} | ${place}`;
document.getElementById("modified").innerHTML = `Last Modified: ${lastModified}`;
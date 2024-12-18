const rootUrl = "https://www.sunburst-design.com/papers/";
const papersURL = "data/papers.json";

let data = [];
let text = [];

console.log("RUNNING");
getPapersData();
// console.log("SHOWING DATA");

async function getPapersData() {
    console.log("Starting getPapersData() function");
    const response = await fetch(papersURL);
    if (response.ok) {
        data = await response.json();
        console.log("AWAITING RESPONSE data");
        console.log(data);
        createInitialTables(data);
        // return data;
    };
}; 

function createInitialTables (data) {
    console.log("Creating initial tables");
    createCnotesTable(data.cnotes);
    console.log(`DEBUG: cnotes processed`);
    createPapersTable(data.papers);
    console.log(`DEBUG: papers processed`);
    createDacTable(data.dacs);
    console.log(`DEBUG: dacs processed`);
    createRecommendsTable(data.recommendeds);
    console.log(`DEBUG: recommends processed`);
    createOthersTable(data.otherpapers);
    console.log(`DEBUG: otherpapers processed`);
};

// createCnotesTable(data.cnotes);
// createPapersTable(papers);
// createDacTable(dacs);
// createRecommendsTable(recommendeds);
// createOthersTable(otherpapers);

function createCnotesTable(filtered) {
    console.log("Starting createCnotesTable function");
    console.log(filtered);
    console.log(filtered.length);
    if (filtered.length > 0) {
        console.log("TRUE");
        // Clear out existing innerWidth-created table
        document.getElementById("cliffnotes").innerHTML = "";
        // Get the table once
        let table = document.getElementById("cliffnotes")
        let h2 = document.createElement("h2");
        let h2text = "Cliff's Technical Notes";
        h2.innerHTML = `<h2>${h2text}</h2>`;      
        table.appendChild(h2);

        console.log(filtered);
        // Now append rows and table-data to the table
        filtered.forEach(cnote => {
            let row = document.createElement("tr");
            let conference = document.createElement("td");
            let title = document.createElement("td");
            let revision = document.createElement("td");

            if (cnote.cliffnote == "NA") {
                // conference.innerHTML = `<td></td>`;
                conference.innerHTML = `<p></p>`;
            } else {
                conference.innerHTML = `<div class="item1"><p>Cliff-Note ${cnote.cliffnote}</p></div>`;
            }

            title.innerHTML = `<p><a href="${rootUrl}${cnote.url}">${cnote.title}</a></p>`;
            revision.innerHTML = `<div class="itemrev">Rev ${cnote.rev}<br>${cnote.revdate}</td></div>`

            row.appendChild(conference);
            row.appendChild(title);
            row.appendChild(revision);
            table.appendChild(row);
        })
    } else {
        console.log("FALSE");
        document.getElementById("cliffnotes").innerHTML = "";
    }
}

function createPapersTable(filtered) {
    console.log("Starting createPapersTable function");
    console.log(filtered);
    console.log(filtered.length);
    if (filtered.length > 0) {
        console.log("TRUE");
    // console.log("Starting createPapersTable function-2");
    // Clear out existing innerWidth-created table
    document.getElementById("cliffpapers").innerHTML = "";
    // Get the table once
    let table = document.getElementById("cliffpapers");
    let h2 = document.createElement("h2");
    let h2text = "Cliff's Papers";
    h2.innerHTML = `<h2>${h2text}</h2>`;      
    table.appendChild(h2);

    console.log(filtered);
    // Now append rows and table-data to the table
    filtered.forEach(paper => {
        // console.log(`${paper.conf} ${paper.year}`);

        let row = document.createElement("tr");
        let conference = document.createElement("td");
        let title = document.createElement("td");
        let revision = document.createElement("td");
        let award = document.createElement("td");

        if (paper.conf == "NA") {
            if (paper.cliffnote == "NA") {
                conference.innerHTML = `<td></td>`;
            } else {
                conference.innerHTML = `<td>Cliff-Note ${paper.cliffnote}</td>`;
            }
        } else {
            conference.innerHTML = `<div class="item1"><td>${paper.conf}<br>${paper.year}</td><div>`;
        }
        // Linking to papers on sunburst-design.com/papers page
        title.innerHTML = `<td><a href="${rootUrl}${paper.url}">${paper.title}</a></td>`;
        // title.innerHTML = `<td><a href="https://${paper.url}">${paper.title}</a></td>`;
        // title.innerHTML = `<td>${paper.title}</td>`;
        revision.innerHTML = `<div class="itemrev"><td>Rev ${paper.rev}<br>${paper.revdate}</td></div>`
        switch (paper.awardtype) {
            case "Paper":
                award.innerHTML = `<div class="itempaper"><td>Voted Best Paper<br>${paper.award} Place</td></div>`;
                break;
            case "Tech":
                award.innerHTML = `<div class="itemtech"><td>Tech Paper Award<br>${paper.award} Place</td></div>`;
                break;
            case "CAEsig":
                award.innerHTML = `<div class="itemsig"><td>Voted Best Paper<br>${paper.award} Place - CAE SIG</td></div>`;
                break;
            case "ICsig":
                award.innerHTML = `<div class="itemsig"><td>Voted Best Paper<br>${paper.award} Place - IC SIG</td></div>`;
                break;
            default:
                award.innerHTML = `<td></td>`;
                break;
        }

        row.appendChild(conference);
        row.appendChild(title);
        row.appendChild(revision);
        row.appendChild(award);
        table.appendChild(row);
    })
} else {
    console.log("FALSE");
    document.getElementById("cliffpapers").innerHTML = "";
}
}

function createDacTable(filtered) {
    console.log("Starting createDacTable function");
    console.log(filtered);
    console.log(filtered.length);
    if (filtered.length > 0) {
        console.log("TRUE");// console.log("Starting createDacTable function-2B");
        // Clear out existing innerWidth-created table
        document.getElementById("dacpresentations").innerHTML = "";
        // Get the table once
        let table = document.getElementById("dacpresentations");
        let h2 = document.createElement("h2");
        let h2text = "Cliff's DAC Conference Presentations";
        h2.innerHTML = `<h2>${h2text}</h2>`;      
        table.appendChild(h2);

        console.log(filtered);
        // Now append rows and table-data to the table
        filtered.forEach(dac => {
            let row = document.createElement("tr");
            let conference = document.createElement("td");
            let title = document.createElement("td");

            conference.innerHTML = `<div class="item1"><td>${dac.conf}<br>${dac.year}</td></div>`;
            title.innerHTML = `<td><a href="${rootUrl}${dac.url}">${dac.title}</a></td>`;

            row.appendChild(conference);
            row.appendChild(title);
            table.appendChild(row);
        })
    } else {
        console.log("FALSE");
        document.getElementById("dacpresentations").innerHTML = "";
    }}

function createRecommendsTable(filtered) {
    console.log("Starting createRecommendsTable function");
    console.log(filtered);
    console.log(filtered.length);
    if (filtered.length > 0) {
        // Clear out existing innerWidth-created table
        document.getElementById("recommends").innerHTML = "";
        // Get the table once
        let table = document.getElementById("recommends")
        let h2 = document.createElement("h2");
        let h2text = "Recommended Papers";
        h2.innerHTML = `<h2>${h2text}</h2>`;      
        table.appendChild(h2);

        let summary = document.createElement("p");
        let summarytext = "These papers are hosted with permission of the respective authors. The authors may remove permission to host these papers at any time.";
        summary.innerHTML = `<p>${summarytext}</p>`;      
        table.appendChild(summary);

        console.log(filtered);
        // Now append rows and table-data to the table
        filtered.forEach(recommend => {
            let row = document.createElement("tr");
            let conference = document.createElement("td");
            let title = document.createElement("td");

            conference.innerHTML = `<div class="item1"><td>${recommend.conf}<br>${recommend.year}</td></div>`;
            title.innerHTML = `<td><a href="${rootUrl}${recommend.url}">${recommend.title}</a></td>`;

            row.appendChild(conference);
            row.appendChild(title);
            table.appendChild(row);
        })
    } else {
        console.log("FALSE");
        document.getElementById("recommends").innerHTML = "";
    }}

function createOthersTable(filtered) {
    console.log("Starting createRecommendsTable function");
    console.log(filtered);
    console.log(filtered.length);
    if (filtered.length > 0) {
        // console.log("Starting createOthersTable function-4");
        // Clear out existing innerWidth-created table
        document.getElementById("nonpublished").innerHTML = "";
        // Get the table once
        let table = document.getElementById("nonpublished")
        let h2 = document.createElement("h2");
        let h2text = "Other Published Papers";
        h2.innerHTML = `<h2>${h2text}</h2>`;      
        table.appendChild(h2);

        let summary = document.createElement("p");
        let summarytext = "These papers are only available in their respective conference proceedings but are not available for download.";
        summary.innerHTML = `<p>${summarytext}</p>`;      
        table.appendChild(summary);

        console.log(filtered);
        // Now append rows and table-data to the table
        filtered.forEach(xtra => {
            let row = document.createElement("tr");
            let conference = document.createElement("td");
            let title = document.createElement("td");
            let award = document.createElement("td");

            conference.innerHTML = `<div class="item1"><td>${xtra.conf}<br>${xtra.year}</td></div>`;
            title.innerHTML = `<td>${xtra.title}</td>`;
            // revision.innerHTML = `<td>Rev ${xtra.rev}<br>${xtra.revdate}</td>`
            switch (xtra.awardtype) {
                case "CAEsig":
                    award.innerHTML = `<div class=itemsig><td>Voted Best Paper<br>${xtra.award} Place - CAE SIG</td></div>`;
                    break;
                default:
                    award.innerHTML = `<td></td>`;
                    break;
            }

            row.appendChild(conference);
            row.appendChild(title);
            row.appendChild(award);
            table.appendChild(row);
        })
    } else {
        console.log("FALSE");
        document.getElementById("nonpublished").innerHTML = "";
    }}

// Not called until a button is clicked
function createAllTables(tag) {
    console.log(`DEBUG: tag is ${tag}`);
    let filteredcnotes = data.cnotes;
    let filteredpapers = data.papers;
    let filtereddacs = data.dacs;
    let filteredrecs = data.recommendeds;
    let filteredothers = data.otherpapers;

    if (tag == "ALL") {
        // console.log("ALL Button clicked");
        createCnotesTable(filteredcnotes);
        createPapersTable(filteredpapers);
        createDacTable(filtereddacs);
        createRecommendsTable(filteredrecs);
        createOthersTable(filteredothers);
    } else {
        filteredcnotes = data.cnotes.filter(cnotes => cnotes.tags.includes(tag));
        filteredpapers = data.papers.filter(papers => papers.tags.includes(tag));
        filtereddacs = data.dacs.filter(dacs => dacs.tags.includes(tag));
        filteredrecs = data.recommendeds.filter(recommendeds => recommendeds.tags.includes(tag));
        filteredothers = data.otherpapers.filter(otherpapers => otherpapers.tags.includes(tag));
        createCnotesTable(filteredcnotes);
        createPapersTable(filteredpapers);
        createDacTable(filtereddacs);
        createRecommendsTable(filteredrecs);
        createOthersTable(filteredothers);
    }
    // console.log for Debugging
    // console.log("---------------------------");
    // console.log("CLIFF-NOTES");
    // console.log(filteredcnotes);
    // console.log("PAPERS");
    // console.log(filteredpapers);
    // console.log("DAC PAPERS");
    // console.log(filtereddacs);
    // console.log("RECOMMENDED");
    // console.log(filteredrecs);
    // console.log("OTHER PAPERS");
    // console.log(filteredothers);
}

//-------------------------------------------------------------------------------
// Number of Reviews - local storage (numberReviews-ls)
//-------------------------------------------------------------------------------
const alllink = document.querySelector("#all");
const uvmlink = document.querySelector("#uvm");
const svlink = document.querySelector("#sv");
const cdclink = document.querySelector("#cdc");
const fsmlink = document.querySelector("#fsm");

// ALL button - get all papers
alllink.addEventListener('click', () => {
    console.log(data);
    console.log("DEBUG: **ALL** clicked");
    createAllTables("ALL");
})

uvmlink.addEventListener('click', () => {
    createAllTables("UVM");
    console.log("DEBUG: **UVM** clicked");
})

svlink.addEventListener('click', () => {
    createAllTables("SV");
    console.log("DEBUG: **SV** clicked");
})

cdclink.addEventListener('click', () => {
    createAllTables("CDC");
    console.log("DEBUG: **CDC** clicked");
})

fsmlink.addEventListener('click', () => {
    createAllTables("FSM");
    console.log("DEBUG: **FSM** clicked");
})

//-------------------------------------------------------------------------------
// Click for papers .show class menu
//-------------------------------------------------------------------------------
const filternav = document.querySelector(".filtering");
const hambutton = document.querySelector("#filtermenu");

filtermenu.addEventListener('click', () => {
    filternav.classList.toggle('show');
    console.log("Toggled filternav show");
})

hambutton.addEventListener('click', () => {
    hambutton.classList.toggle('show');
    console.log("Toggled hambutton show");
})


// toggle means: add the class if it does not currently exist or remove the named class if it does exist.
// The CSS class rules will handle the different views, layouts, and dipslays.
// JavaScript only applies the class value or not

// let numberReviews = Number(window.localStorage.getItem("numberReviews-ls"));
// numberReviews.textContent = `Number of reviews submitted: ${numberReviews}`;

// numberReviews++;
// localStorage.setItem("numberReviews-ls", numberReviews);
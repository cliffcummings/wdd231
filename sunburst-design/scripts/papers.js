const rootUrl = "https://www.sunburst-design.com/papers/";
const papersURL = "data/papers.json";

async function getPapersData() {
    const response = await fetch(papersURL);
    if (response.ok) {
        const data = await response.json();
        // console.log("AWAITING RESPONSE data");
        console.log(data);
        createTables(data);
    };
}; 

function createTables (data) {
    createCnotesTable(data.cnotes);
    createPapersTable(data.papers);
    createDacTable(data.dacs);
    createRecommendsTable(data.recommendeds);
    createOthersTable(data.otherpapers);
};

getPapersData();

// createCnotesTable(data.cnotes);
// createPapersTable(papers);
// createDacTable(dacs);
// createRecommendsTable(recommendeds);
// createOthersTable(otherpapers);

function createCnotesTable(filtered) {
    // console.log("Starting createCnotesTable function-1");
    // Clear out existing innerWidth-created table
    document.getElementById("cliffnotes").innerHTML = "";
    // Get the table once
    let table = document.getElementById("cliffnotes")

    // Now append rows and table-data to the table
    filtered.forEach(cnote => {
        let row = document.createElement("tr");
        let conference = document.createElement("td");
        let title = document.createElement("td");
        let revision = document.createElement("td");

        if (cnote.cliffnote == "NA") {
            conference.innerHTML = `<td></td>`;
        } else {
            conference.innerHTML = `<div class="item1"><td>Cliff-Note ${cnote.cliffnote}</td></div>`;
        }

        title.innerHTML = `<td><a href="${rootUrl}${cnote.url}">${cnote.title}</a></td>`;
        revision.innerHTML = `<div class="itemrev">Rev ${cnote.rev}<br>${cnote.revdate}</td></div>`

        row.appendChild(conference);
        row.appendChild(title);
        row.appendChild(revision);
        table.appendChild(row);
    })
}

function createPapersTable(filtered) {
    // console.log("Starting createPapersTable function-2");
    // Clear out existing innerWidth-created table
    document.getElementById("cliffpapers").innerHTML = "";
    // Get the table once
    let table = document.getElementById("cliffpapers");
    // let table = [];

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
}

function createDacTable(filtered) {
    // console.log("Starting createDacTable function-2B");
    // Clear out existing innerWidth-created table
    document.getElementById("dacpresentations").innerHTML = "";
    // Get the table once
    let table = document.getElementById("dacpresentations")

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
}

function createRecommendsTable(filtered) {
    // console.log("Starting createRecommendsTable function-3");
    // Clear out existing innerWidth-created table
    document.getElementById("recommends").innerHTML = "";
    // Get the table once
    let table = document.getElementById("recommends")

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
}

function createOthersTable(filtered) {
    // console.log("Starting createOthersTable function-4");
    // Clear out existing innerWidth-created table
    document.getElementById("nonpublished").innerHTML = "";
    // Get the table once
    let table = document.getElementById("nonpublished")

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
}

function createAllTables(tag) {
    let filteredcnotes = cnotes;
    let filteredpapers = papers;
    let filtereddacs = dacs;
    let filteredrecs = recommendeds;
    let filteredothers = otherpapers;

    if (tag == "ALL") {
        // console.log("ALL Button clicked");
        createCnotesTable(filteredcnotes);
        createPapersTable(filteredpapers);
        createDacTable(filtereddacs);
        createRecommendsTable(filteredrecs);
        createOthersTable(filteredothers);
    } else {
        filteredcnotes = cnotes.filter(cnotes => cnotes.tags.includes(tag));
        filteredpapers = papers.filter(papers => papers.tags.includes(tag));
        filtereddacs = dacs.filter(dacs => dacs.tags.includes(tag));
        filteredrecs = recommendeds.filter(recommendeds => recommendeds.tags.includes(tag));
        filteredothers = otherpapers.filter(otherpapers => otherpapers.tags.includes(tag));
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
    createAllTables("ALL");
})

uvmlink.addEventListener('click', () => {
    createAllTables("UVM");
})

svlink.addEventListener('click', () => {
    createAllTables("SV");
})

cdclink.addEventListener('click', () => {
    createAllTables("CDC");
})

fsmlink.addEventListener('click', () => {
    createAllTables("FSM");
})

//-------------------------------------------------------------------------------
// Click for papers .show class menu
//-------------------------------------------------------------------------------
const filternav = document.querySelector(".filtering");
const hambutton = document.querySelector("#filtermenu");

filtermenu.addEventListener('click', () => {
    filternav.classList.toggle('show');
    hambutton.classList.toggle('show');
    console.log("Toggled show");
})


// toggle means: add the class if it does not currently exist or remove the named class if it does exist.
// The CSS class rules will handle the different views, layouts, and dipslays.
// JavaScript only applies the class value or not

// let numberReviews = Number(window.localStorage.getItem("numberReviews-ls"));
// numberReviews.textContent = `Number of reviews submitted: ${numberReviews}`;

// numberReviews++;
// localStorage.setItem("numberReviews-ls", numberReviews);
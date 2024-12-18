const rootUrl = "https://www.sunburst-design.com/papers/";
const papersURL = "data/papers.json";

let data = [];

getPapersData();

async function getPapersData() {
    // console.log("Starting getPapersData() function");
    const response = await fetch(papersURL);
    if (response.ok) {
        data = await response.json();
        // console.log("AWAITING RESPONSE data");
        // console.log(data);
        createInitialTables(data);
    };
}; 

function createInitialTables (data) {
    createCnotesTable(data.cnotes);
    createPapersTable(data.papers);
    createDacTable(data.dacs);
    createRecommendsTable(data.recommendeds);
    createOthersTable(data.otherpapers);
};

function createCnotesTable(filtered) {
    if (filtered.length > 0) {
        // Clear out existing innerWidth-created table
        document.getElementById("cliffnotes").innerHTML = "";
        // Get the table once
        let table = document.getElementById("cliffnotes")
        let h2 = document.createElement("h2");
        let h2text = "Cliff's Technical Notes";
        h2.innerHTML = `<h2>${h2text}</h2>`;      
        table.appendChild(h2);

        // console.log(filtered);
        // Now append rows and data to the table
        filtered.forEach(cnote => {
            let card = document.createElement("p");

            let note;
            if (cnote.cliffnote == "NA") {
                note = `<div class="g1">""</div>`;
            } else {
                note = `<div class="g1">Cliff-Note ${cnote.cliffnote}</div>`;
            }

            let title = `<div class="g2"><a href="${rootUrl}${cnote.url}">${cnote.title}</a></div>`;
            let revision = `<div class="g3">Rev ${cnote.rev}<br>${cnote.revdate}</div>`;

            let entry = `${note}<br>${title}<br>${revision}`;
            // console.log(entry);
            
            card.innerHTML = entry;
            table.appendChild(card);
        })
    } else {
        document.getElementById("cliffnotes").innerHTML = "";
    }
}

function createPapersTable(filtered) {
    if (filtered.length > 0) {
        // Clear out existing innerWidth-created table
        document.getElementById("cliffpapers").innerHTML = "";
        // Get the table once
        let table = document.getElementById("cliffpapers");
        let h2 = document.createElement("h2");
        let h2text = "Cliff's Papers";
        h2.innerHTML = `<h2>${h2text}</h2>`;      
        table.appendChild(h2);

        // Now append rows and data to the table
        filtered.forEach(paper => {

            let card = document.createElement("p");

            let note = "";
            if (paper.conf == "NA") {
                if (paper.cliffnote == "NA") {
                    note = "";
                } else {
                    note =`Cliff-Note ${paper.cliffnote}`;
                }
            } else {
                note = `${paper.conf}<br>${paper.year}`;
            }
            // Linking to papers on sunburst-design.com/papers page
            let title = `<a href="${rootUrl}${paper.url}">${paper.title}</a>`;
            let revision = `Rev ${paper.rev}<br>${paper.revdate}`
            let award;
            switch (paper.awardtype) {
                case "Paper":
                    award = `<div class="itempaper">Voted Best Paper<br>${paper.award} Place</div>`;
                    break;
                case "Tech":
                    award = `<div class="itemtech">Tech Paper Award<br>${paper.award} Place</div>`;
                    break;
                case "CAEsig":
                    award = `<div class="itemsig">Voted Best Paper<br>${paper.award} Place - CAE SIG</div>`;
                    break;
                case "ICsig":
                    award = `<div class="itemsig">Voted Best Paper<br>${paper.award} Place - IC SIG</div>`;
                    break;
                default:
                    award = "";
                    break;
            }

            let entry = `${note}<br>${title}<br>${revision}<br>${award}`;
            // console.log(entry);
            
            card.innerHTML = entry;
            table.appendChild(card);
        })
    } else {
        document.getElementById("cliffpapers").innerHTML = "";
    }
}

function createDacTable(filtered) {
    if (filtered.length > 0) {
        // Clear out existing innerWidth-created table
        document.getElementById("dacpresentations").innerHTML = "";
        // Get the table once
        let table = document.getElementById("dacpresentations");
        let h2 = document.createElement("h2");
        let h2text = "Cliff's DAC Conference Presentations";
        h2.innerHTML = `<h2>${h2text}</h2>`;      
        table.appendChild(h2);

        // console.log(filtered);
        // Now append rows and data to the table
        filtered.forEach(dac => {
            let card = document.createElement("p");

            let note = `${dac.conf}<br>${dac.year}`;
            let title = `<a href="${rootUrl}${dac.url}">${dac.title}</a>`;

            let entry = `${note}<br>${title}`;
            // console.log(entry);
            
            card.innerHTML = entry;
            table.appendChild(card);
        })
    } else {
        document.getElementById("dacpresentations").innerHTML = "";
    }}

function createRecommendsTable(filtered) {
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

        // console.log(filtered);
        // Now append rows and data to the table
        filtered.forEach(recommend => {
            let card = document.createElement("p");

            let note = `${recommend.conf}<br>${recommend.year}`;
            let title = `<a href="${rootUrl}${recommend.url}">${recommend.title}</a>`;

            let entry = `${note}<br>${title}`;
            // console.log(entry);
            
            card.innerHTML = entry;
            table.appendChild(card);
        })
    } else {
        document.getElementById("recommends").innerHTML = "";
    }}

function createOthersTable(filtered) {
    if (filtered.length > 0) {
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

        // console.log(filtered);
        // Now append rows and data to the table
        filtered.forEach(xtra => {
            let card = document.createElement("p");

            let note = `${xtra.conf}<br>${xtra.year}`;

            let title = `${xtra.title}`;
            let award;
            switch (xtra.awardtype) {
                case "CAEsig":
                    award = `<div class=itemsig>Voted Best Paper<br>${xtra.award} Place - CAE SIG</div>`;
                    break;
                default:
                    award = "";
                    break;
            }

            let entry = `${note}<br>${title}<br>${award}`;
            // console.log(entry);
            
            card.innerHTML = entry;
            table.appendChild(card);
        })
    } else {
        document.getElementById("nonpublished").innerHTML = "";
    }}

// Not called until a button is clicked
function createAllTables(tag) {
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
    // console.log("Toggled filternav show");
})

hambutton.addEventListener('click', () => {
    hambutton.classList.toggle('show');
    // console.log("Toggled hambutton show");
})


// toggle means: add the class if it does not currently exist or remove the named class if it does exist.
// The CSS class rules will handle the different views, layouts, and dipslays.
// JavaScript only applies the class value or not

// let numberReviews = Number(window.localStorage.getItem("numberReviews-ls"));
// numberReviews.textContent = `Number of reviews submitted: ${numberReviews}`;

// numberReviews++;
// localStorage.setItem("numberReviews-ls", numberReviews);
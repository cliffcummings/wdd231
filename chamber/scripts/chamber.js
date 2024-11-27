const doc = document;
const hamburgerElement = doc.querySelector('#myButton');
// const navElement = doc.querySelector('.menuLinks');
const navElement = doc.querySelector('#animateme');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

const url = 'data/members.json';
const cards = document.querySelector('#cards');
  
console.log("Going to GET business data");
getBusinessData();

async function getBusinessData() {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log("AWAITING RESPONSE data");
        // console.table(data.companies);

        displayBusinesses(data.companies);
    }
}   

const displayBusinesses = (companies) => {
    console.log("Going to DISPLAY business data");
    console.table(companies);
    console.log(`Current grid choise is: ${gridChoice}`);

	// cards defined at top of this file
	cards.innerHTML = "";
    
    companies.forEach((company) => {
        // console.table(company);
        // Create elements to add to the div.cards element
        let card = doc.createElement('section');
        let h2 = doc.createElement('h2');
        let web = doc.createElement('p');
        let phone = doc.createElement('p');
        let logo = doc.createElement('img');
  
        // Build the h2 content out to show company name
        h2.innerHTML = `${company.name}`;
        web.innerHTML = `${company.url}`;
        phone.innerHTML = `${company.phoneNumber}`
        // Build the logo image 
        logo.setAttribute('src', company.imageurl);
        logo.setAttribute('alt', `logo of ${company.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '140');
        logo.setAttribute('height', 'auto');
  
        // Append the section(card) with the created elements
        card.appendChild(h2);
        card.appendChild(web);  
        card.appendChild(phone);  
        card.appendChild(logo);
    
        cards.appendChild(card);
    }); // end of arrow function and forEach loop
  }

// Shortened names for EventListeners
const gridButton = doc.querySelector('#select_grid');
const listButton = doc.querySelector('#select_list');

let gridChoice = "grid";
console.log("SETTING DEFAULT: grid mode");

gridButton.addEventListener('click', () => {
    console.log("gridButton clicked");
    gridChoice = "grid";
});

listButton.addEventListener('click', () => {
    console.log("listButton clicked");
    gridChoice = "list";
});
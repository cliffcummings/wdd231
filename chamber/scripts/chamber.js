const doc = document;
const hamburgerElement = doc.querySelector('#myButton');
// const navElement = doc.querySelector('.menuLinks');
const navElement = doc.querySelector('#animateme');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});
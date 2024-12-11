// const form = document.querySelector("#form");

const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");

openButton.addEventListener("click", () => {
    console.log("openButton clicked");
    dialogBox.showModal();
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});

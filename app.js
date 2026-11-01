const URL="https://6adea6d84e88f1bba4a53a01.mockapi.io/:movie";
const button = document.querySelector("#loadBtn");
const status = document.querySelector("#status");
const list = document.querySelector("#movieList");

const title = document.querySelector("#title");
const director = document.querySelector("#director");
const rating = document.querySelector("#rating");
const genre = document.querySelector("#genre");
const date = document.querySelector("#date");

function showError(message) {
  errorBox.textContent = '${message}';
  errorBox.style.display = "block";
}

function hideError() {
  errorBox.textContent = "";
  errorBox.style.display = "none";
}
const API_URL = "https://6adea6d84e88f1bba4a53a01.mockapi.io/movie";
const button = document.querySelector("#loadBtn");
const status = document.querySelector("#status");
const list = document.querySelector("#movieList");
let movies = [];

const title = document.querySelector("#title");
const director = document.querySelector("#director");
const rating = document.querySelector("#rating");
const genre = document.querySelector("#genre");
const date = document.querySelector("#date");
const errorBox = document.querySelector("#errorBox");

function showError(message) {
    errorBox.textContent = message;
}

function render(movies){
    list.innerHTML = "";
        movies.forEach(M => {
            const tr = document.createElement("tr");
            const td1=document.createElement("td");
            const td2=document.createElement("td");
            const td3=document.createElement("td");
            const td4=document.createElement("td");
            const td5=document.createElement("td");
            const td6=document.createElement("td");

            td1.textContent=M.id;
            td2.textContent=M.title;
            td3.textContent=M.director;
            td4.textContent=M.genre;
            td5.textContent=M.date;
            td6.textContent=M.rating;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td5);
            tr.appendChild(td4);
            tr.appendChild(td6);

            list.appendChild(tr);
        });
}


async function GET() {
    try {

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('error:' +response.status);
        }
        movies = await response.json();
        render(movies);
        showError("");
    }catch(error){
        showError("주소를 확인해주세요");
    }
}


GET();
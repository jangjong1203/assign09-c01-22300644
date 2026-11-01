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
const crudForm = document.querySelector("#crudForm");
const submitBtn = document.querySelector("#submitBtn");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

let editId = null;

function showError(message) {
    errorBox.textContent = message;
}

function render(movies) {
    list.innerHTML = "";
    movies.forEach(M => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const td6 = document.createElement("td");
        const td7 = document.createElement("td");

        td1.textContent = M.id;
        td2.textContent = M.title;
        td3.textContent = M.director;
        td4.textContent = M.genre;
        td5.textContent = M.date;
        td6.textContent = M.rating;

        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.addEventListener("click", () => {
            editId = M.id;
            title.value = M.title;
            director.value = M.director;
            date.value = M.date;
            genre.value = M.genre;
            rating.value = M.rating;
            submitBtn.textContent = "수정하기";
        });
        const delBtn = document.createElement("button");
        delBtn.textContent = "삭제";
        delBtn.addEventListener("click", () => {
            DELETE(M.id);
        });
        td7.appendChild(editBtn);
        td7.appendChild(delBtn);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td5);
        tr.appendChild(td4);
        tr.appendChild(td6);
        tr.appendChild(td7);
        list.appendChild(tr);
    });
}


async function GET() {
    try {

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('error:' + response.status);
        }
        movies = await response.json();
        render(movies);
        showError("");
    } catch (error) {
        showError("주소를 확인해주세요");
    }
}

async function POST(newmovie) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newmovie)
    });
    if (!response.ok) {
        throw new Error("실패");
    }
    await GET();
}
crudForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (title.value === "") {
        showError("영화제목을 입력해주세요.");
        return;
    } else if (director.value === "") {
        showError("감독을 입력해주세요.");
        return;
    } else if (date.value === "") {
        showError("개봉일자를 입력해주세요.");
        return;
    } else if (genre.value === "") {
        showError("장르를 입력해주세요.");
        return;
    } else if (rating.value === "" || rating.value < 0 || rating.value > 10) {
        showError("평점은 0에서 10 사이로 입력해주세요.");
        return;
    }
    const movie = {
        title: title.value,
        director: director.value,
        date: date.value,
        genre: genre.value,
        rating: Number(rating.value)
    };
    if (editId === null) {
        await POST(movie);
    } else {
        await UPDATE(editId, movie);
        editId = null;
        submitBtn.textContent = "등록하기";
    }
    title.value = "";
    director.value = "";
    date.value = "";
    genre.value = "";
    rating.value = "";
    showError("");
})

async function DELETE(id) {
    if (!confirm("정말 삭제하겠습니까?")) {
        return;
    }

    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("삭제 실패");
        }

        await GET();
    } catch (error) {
        showError("삭제 실패");
    }
}

async function UPDATE(id, newMovie) {
    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMovie)
        });

        if (!response.ok) {
            throw new Error("수정 실패");
        }
        await GET();
    } catch (error) {
        showError("수정 실패");
    }
}

searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value;
    const filtered = movies.filter(M => {
        return M.title.includes(keyword) || M.director.includes(keyword);
    });
    render(filtered);
});

GET();
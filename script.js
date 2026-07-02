
const API_KEY = "ab94a310";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const loader = document.getElementById("loader");
const movieCard = document.getElementById("movieCard");

const poster = document.getElementById("poster");
const title = document.getElementById("title");
const rating = document.getElementById("rating");
const year = document.getElementById("year");
const runtime = document.getElementById("runtime");
const genre = document.getElementById("genre");
const director = document.getElementById("director");
const actors = document.getElementById("actors");
const plot = document.getElementById("plot");

const imdbBtn = document.getElementById("imdbBtn");

const favoriteBtn = document.getElementById("favoriteBtn");
const favoriteList = document.getElementById("favoriteList");

const heroBanner = document.getElementById("heroBanner");
const heroTitle = document.getElementById("heroTitle");
const heroPlot = document.getElementById("heroPlot");
const heroSearch = document.getElementById("heroSearch");
const heroImdb = document.getElementById("heroImdb");

let currentMovie = null;


const heroMovies = [

"Interstellar",

"Inception",

"The Dark Knight",

"Avatar",

"Titanic",

"Oppenheimer",

"Gladiator",

"The Matrix",

"Joker",

"Avengers: Endgame"

];



searchBtn.onclick = searchMovie;

searchInput.addEventListener("keypress", e => {

    if (e.key === "Enter") {

        searchMovie();

    }

});


async function searchMovie() {

    const movie = searchInput.value.trim();

    if (movie === "") return;

    loader.classList.remove("d-none");

    movieCard.classList.add("d-none");

    try {

        const response = await fetch(

            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movie)}`

        );

        const data = await response.json();

        loader.classList.add("d-none");

        if (data.Response === "False") {

            alert("Movie not found.");

            return;

        }

        currentMovie = data;

        displayMovie(data);

    }

    catch {

        loader.classList.add("d-none");

        alert("Something went wrong.");

    }

}



function displayMovie(data) {

    movieCard.classList.remove("d-none");

    poster.src = data.Poster;

    title.textContent = data.Title;

    rating.textContent = "⭐ " + data.imdbRating;

    year.textContent = data.Year;

    runtime.textContent = data.Runtime;

    genre.textContent = data.Genre;

    director.textContent = data.Director;

    actors.textContent = data.Actors;

    plot.textContent = data.Plot;

    imdbBtn.href = `https://www.imdb.com/title/${data.imdbID}`;

}


favoriteBtn.onclick = () => {

    if (!currentMovie) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.some(movie => movie.imdbID === currentMovie.imdbID);

    if (exists) {

        alert("Movie already added.");

        return;

    }

    favorites.push(currentMovie);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    loadFavorites();

};



function loadFavorites() {

    favoriteList.innerHTML = "";

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach(movie => {

        favoriteList.innerHTML += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="favorite-card">

                <img
                src="${movie.Poster}"
                class="img-fluid rounded">

                <h5 class="mt-3">

                ${movie.Title}

                </h5>

                <p>

                ${movie.Year}

                </p>

                <button

                class="btn btn-danger"

                onclick="removeFavorite('${movie.imdbID}')">

                Remove

                </button>

            </div>

        </div>

        `;

    });

}



function removeFavorite(id) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(movie => movie.imdbID !== id);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    loadFavorites();

}



loadFavorites();

async function loadHero() {

    const randomMovie = heroMovies[Math.floor(Math.random() * heroMovies.length)];

    try {

        const response = await fetch(

            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(randomMovie)}`

        );

        const data = await response.json();

        if (data.Response === "False") return;

        heroBanner.style.backgroundImage = `url(${data.Poster})`;

        heroTitle.textContent = data.Title;

        heroPlot.textContent = data.Plot;

        heroImdb.href = `https://www.imdb.com/title/${data.imdbID}`;

        heroSearch.onclick = () => {

            searchInput.value = data.Title;

            searchMovie();

            window.scrollTo({

                top: heroBanner.offsetHeight + 100,

                behavior: "smooth"

            });

        };

    }

    catch (error) {

        console.log(error);

    }

}

loadHero();


const trendingMovies = [

"Avatar",

"Titanic",

"Interstellar",

"Inception",

"The Dark Knight",

"Joker",

"Oppenheimer",

"Gladiator",

"The Matrix",

"Avengers: Endgame"

];

const trendingContainer = document.getElementById("trendingMovies");

async function loadTrendingMovies(){

    if(!trendingContainer) return;

    trendingContainer.innerHTML = "";

    for(const movieName of trendingMovies){

        try{

            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`
            );

            const movie = await response.json();

            if(movie.Response === "True"){

                trendingContainer.innerHTML += `

                <div class="movie-item"
                onclick="openTrendingMovie('${movie.Title.replace(/'/g,"\\'")}')">

                    <img src="${movie.Poster}" alt="${movie.Title}">

                    <div class="movie-content">

                        <h5>${movie.Title}</h5>

                        <p>${movie.Year}</p>

                        <div class="movie-rating">

                            ⭐ ${movie.imdbRating}

                        </div>

                    </div>

                </div>

                `;

            }

        }

        catch(error){

            console.log(error);

        }

    }

}

function openTrendingMovie(title){

    searchInput.value = title;

    searchMovie();

    window.scrollTo({

        top: heroBanner.offsetHeight + 120,

        behavior: "smooth"

    });

}

loadTrendingMovies();


const trailerBtn = document.getElementById("trailerBtn");
const movieTrailerBtn = document.getElementById("movieTrailerBtn");
const toast = document.getElementById("toast");



function setTrailer(movie){

    const query = `${movie.Title} Official Trailer`;

    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

    if(trailerBtn){

        trailerBtn.href = url;

    }

    if(movieTrailerBtn){

        movieTrailerBtn.href = url;

    }

}



function showToast(message){

    if(!toast) return;

    toast.textContent = message;

    toast.classList.add("toast-show");

    setTimeout(()=>{

        toast.classList.remove("toast-show");

    },2500);

}



favoriteBtn.addEventListener("click",()=>{

    if(!currentMovie) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if(favorites.some(movie=>movie.imdbID===currentMovie.imdbID)){

        showToast("Already in Favorites ❤️");

        return;

    }

    favorites.push(currentMovie);

    localStorage.setItem("favorites",JSON.stringify(favorites));

    loadFavorites();

    showToast("Movie Added ❤️");

});



function removeFavorite(id){

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(movie=>movie.imdbID!==id);

    localStorage.setItem("favorites",JSON.stringify(favorites));

    loadFavorites();

    showToast("Movie Removed 🗑️");

}


const suggestionBox = document.getElementById("suggestions");

let typingTimer;

searchInput.addEventListener("input", () => {

    clearTimeout(typingTimer);

    const text = searchInput.value.trim();

    if(text.length < 2){

        suggestionBox.style.display = "none";

        return;

    }

    typingTimer = setTimeout(() => {

        searchSuggestions(text);

    },300);

});

async function searchSuggestions(text){

    try{

        const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(text)}`
        );

        const data = await res.json();

        suggestionBox.innerHTML = "";

        if(data.Response === "False"){

            suggestionBox.style.display = "none";

            return;

        }

        data.Search.slice(0,5).forEach(movie => {

            const div = document.createElement("div");

            div.className = "suggestion";

            div.innerHTML = `
                🎬 ${movie.Title}
                <span style="float:right">${movie.Year}</span>
            `;

            div.onclick = () => {

                searchInput.value = movie.Title;

                suggestionBox.style.display = "none";

                searchMovie();

            };

            suggestionBox.appendChild(div);

        });

        suggestionBox.style.display = "block";

    }

    catch(error){

        console.log(error);

    }

}

document.addEventListener("click",(e)=>{

    if(!suggestionBox.contains(e.target) && e.target !== searchInput){

        suggestionBox.style.display="none";

    }

});


const topRated = [

"The Shawshank Redemption",

"The Godfather",

"The Dark Knight",

"12 Angry Men",

"Schindler's List",

"The Lord of the Rings: The Return of the King",

"Pulp Fiction",

"Fight Club",

"Forrest Gump",

"Interstellar"

];

const topRatedContainer = document.getElementById("topRatedMovies");

async function loadTopRated(){

    if(!topRatedContainer) return;

    topRatedContainer.innerHTML = "";

    for(const movieName of topRated){

        try{

            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`
            );

            const movie = await res.json();

            if(movie.Response === "True"){

                topRatedContainer.innerHTML += `

                <div class="top-card"
                onclick="openTrendingMovie('${movie.Title.replace(/'/g,"\\'")}')">

                    <img src="${movie.Poster}" alt="${movie.Title}">

                    <div class="top-content">

                        <h5>${movie.Title}</h5>

                        <p>${movie.Year}</p>

                        <div class="top-rating">

                            ⭐ ${movie.imdbRating}

                        </div>

                    </div>

                </div>

                `;

            }

        }

        catch(error){

            console.log(error);

        }

    }

}

loadTopRated();


const genreContainer = document.getElementById("genreMovies");

const genres = [

{icon:"🎬",name:"Action",movie:"John Wick"},

{icon:"😂",name:"Comedy",movie:"The Mask"},

{icon:"👻",name:"Horror",movie:"The Conjuring"},

{icon:"🚀",name:"Sci-Fi",movie:"Interstellar"},

{icon:"❤️",name:"Romance",movie:"Titanic"},

{icon:"🕵️",name:"Mystery",movie:"Sherlock Holmes"},

{icon:"⚔️",name:"Adventure",movie:"Avatar"},

{icon:"🧙",name:"Fantasy",movie:"Harry Potter"}

];

function loadGenres(){

    if(!genreContainer) return;

    genreContainer.innerHTML="";

    genres.forEach(item=>{

        genreContainer.innerHTML += `

        <div class="genre-card"

        onclick="searchGenre('${item.movie}')">

            <i>${item.icon}</i>

            ${item.name}

        </div>

        `;

    });

}

function searchGenre(movie){

    searchInput.value = movie;

    searchMovie();

    window.scrollTo({

        top: heroBanner.offsetHeight + 120,

        behavior:"smooth"

    });

}

loadGenres();
const themeBtn=document.getElementById("themeBtn");

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

themeBtn.innerHTML=

document.body.classList.contains("dark")

?"☀️":"🌙";

};
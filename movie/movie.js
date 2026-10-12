//récupération identifiant de la side bar:

const params = new URLSearchParams(window.location.search);
const idFilm = params.get("id");
console.log(idFilm);

//on appelle l'API :

async function afficherFilm() {
    const reponse = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${idFilm}&plot=full`
    );
    const film = await reponse.json();
    console.log(film);

//remplir les div
document.getElementById("movie-title").textContent = film.Title;

document.getElementById("movie-poster").src = film.Poster;

document.getElementById("movie-director").textContent = `Réalisé par : ${film.Director}.`;

document.getElementById("movie-plot").textContent = film.Plot;

document.getElementById("movie-genre").textContent = film.Genre;

document.getElementById("movie-actors").textContent = film.Actors;

const evaluationContainer = document.getElementById("movie-ratings");
film.Ratings.forEach(note => {
    const p = document.createElement("p");
    p.textContent =
        `${note.Source} : ${note.Value}`;
    evaluationContainer.appendChild(p);
});


const dvd = new Date(film.DVD);

document.getElementById("movie-dvd").textContent = dvd.toLocaleDateString("fr-FR");
}
afficherFilm();









import {
  checkFavoris,
  getFavoris
} from "../common/stockageFavoris.js";

//récupération identifiant de la side bar:

const params = new URLSearchParams(window.location.search);
const idFilm = params.get("id");
//console.log(idFilm); exemple de controle pour aider à la programmation. Beaucoup ont été utilisée puis supprimée. On en montre une pour illustrer notre méthode de travail.

//on appelle l'API :

async function afficherFilm() {
    const reponse = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${idFilm}&plot=full`
    );
    const film = await reponse.json();

    const estFavori = checkFavoris().includes(film.imdbID);
    const textBouton = estFavori ? "♥" : "♡";
    const aria = estFavori ? `Retirer ${film.Title} des favoris` : `Ajouter ${film.Title} aux favoris`;

    //remplir les div
    document.getElementById("movie-title").textContent = film.Title;

    const affiche=document.getElementById("movie-poster");
    
    affiche.innerHTML=`<img src="${film.Poster}" alt= "Affiche du film ${film.Title}"/><button type="button" class="bouton-favoris" aria-label="${aria}">${textBouton}</button>`;

    document.getElementById("movie-director").textContent = `Réalisé par : ${film.Director}.`;

    document.getElementById("movie-plot").textContent = `Résumé : ${film.Plot}`;

    document.getElementById("movie-genre").textContent = `Catégorie(s) : ${film.Genre}.`;

    document.getElementById("movie-actors").textContent = `Avec : ${film.Actors}.`;

    const evaluationContainer = document.getElementById("movie-ratings");
    film.Ratings.forEach(note => {
        const p = document.createElement("p");
        p.textContent =
            `${note.Source} : ${note.Value}`;
        evaluationContainer.appendChild(p);
    });


    const dvd = new Date(film.DVD);

    document.getElementById("movie-dvd").textContent = dvd.toLocaleDateString("fr-FR");

    const boutonFav=document.getElementsByClassName("bouton-favoris")[0];
    boutonFav.addEventListener("click", (event) => {
        event.stopPropagation();
        getFavoris(film);
        const favoris = checkFavoris().includes(film.imdbID);
        boutonFav.textContent = favoris ? "♥" : "♡";
        boutonFav.setAttribute(
            "aria-label",
            favoris ? `Retirer ${film.Title} des favoris` : `Ajouter ${film.Title} aux favoris`
            );
        });

}
afficherFilm();









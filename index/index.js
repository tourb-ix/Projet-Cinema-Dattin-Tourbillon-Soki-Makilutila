//----------------------------------------------------------
//GALLERIE DE FILMS
//----------------------------------------------------------------------------

const films = [
    "Who Framed Roger Rabbit",
    "the little mermaid",
    "12 angry men",
    "little miss sunshine",
    "Trainspotting",
    "The Angels' Share",
    "Natural Born Killers",
    "In the mood for love",
    "City of god",
    "The Matrix",
    "Waterworld",
    "dances with wolves",
    "Robin Hood",
    "Sister Act",
    "Léon",
    "The Hobbit: An Unexpected Journey",
    "The fifth element",
    "Battlestar Galactica",
];

const filmsEnVedette = films.slice(0, 3);

async function getFilm(titreFilm) {

  try {
    const reponse = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(titreFilm)}&plot=short`);
    const donnee = await reponse.json();
      if (donnee.Response === "True") 
        return donnee;
      else {
        console.log(donnee.Error);
        return null;
      }
  } catch (error) {
    console.log("Erreur : ", error);
    return null;
  }
}

function afficherFilmVedette(film, destination) {

  const container = document.createElement("article");
    container.classList.add("vedette-carte");

    container.addEventListener("click", () => {
      container.classList.toggle("infos-visible");
    });

  const image = document.createElement("img");
    image.src = film.Poster;
    image.alt = film.Title;

  const infos = document.createElement("div");
    infos.classList.add("vedette-infos");

  const titre = document.createElement("h3");
    titre.textContent = film.Title;
  const director = document.createElement("p");
    director.textContent = `Réalisé par : ${film.Director}.`;
  const plot = document.createElement("p");
    plot.textContent = `Court résumé : ${film.Plot}`;
  const evaluationContainer = document.createElement("div");
  evaluationContainer.classList.add("movie-ratings");

  if (Array.isArray(film.Ratings)) {
    film.Ratings.forEach((note) => {
      const p = document.createElement("p");
      p.textContent = `${note.Source} : ${note.Value}`;
      evaluationContainer.appendChild(p);
    });
  }

  const lienOrdinateur = document.createElement("a");
    lienOrdinateur.href = `../movie/movie.html?id=${encodeURIComponent(film.imdbID)}`;
    lienOrdinateur.classList.add("vedette-lien-ordinateur");
    lienOrdinateur.setAttribute("aria-label", `Voir la fiche de ${film.Title}`);

  const lienMobile = document.createElement("a");
    lienMobile.href = lienOrdinateur.href;
    lienMobile.textContent = "En savoir plus";
    lienMobile.classList.add("vedette-lien-mobile");

  const coeur = document.createElement("button");
  coeur.classList.add("bouton-favoris");
  coeur.type = "button";

  // Initialisation de l'état du boutton
  const estFavori = checkFavoris().includes(film.imdbID);
  coeur.textContent = estFavori ? "♥" : "♡";
  coeur.setAttribute(
    "aria-label",
    estFavori ? `Retirer ${film.Title} des favoris` : `Ajouter ${film.Title} aux favoris`
  );

  // Ajout de l'écoute du click du bouton pour ajouter le film aux favoris et mettre un coeur plein s'il n'est pas déjà présent dans le tableau ou le retirer s'il est déjà dedans et mettre un coeur vide  
  coeur.addEventListener("click", (event) => {
    event.stopPropagation();
    getFavoris(film);

    const favoris = checkFavoris().includes(film.imdbID);
    coeur.textContent = favoris ? "♥" : "♡";
    coeur.setAttribute(
      "aria-label",
      favoris ? `Retirer ${film.Title} des favoris` : `Ajouter ${film.Title} aux favoris`
    );
  });

  infos.appendChild(titre);
  infos.appendChild(director);
  infos.appendChild(plot);
  infos.appendChild(coeur);
  infos.appendChild(evaluationContainer);
  container.appendChild(image);
  container.appendChild(infos);
  container.appendChild(lienOrdinateur);
  destination.replaceChildren(container, lienMobile);
}

function afficherFilmGalerie(film, destination) {

  const container = document.createElement("article");
  container.classList.add("carte");

  const image = document.createElement("img");
      image.src = film.Poster;
      image.alt = film.Title;

  const titre = document.createElement("h3");
      titre.textContent = film.Title;

  const lien = document.createElement("a");
  lien.href = `../movie/movie.html?id=${encodeURIComponent(film.imdbID)}`;

  const coeur = document.createElement("button");
  coeur.classList.add("bouton-favoris");
  coeur.type = "button";

  // Initialisation de l'état du boutton
  const estFavori = checkFavoris().includes(film.imdbID);
  coeur.textContent = estFavori ? "♥" : "♡";
  coeur.setAttribute(
    "aria-label",
    estFavori ? `Retirer ${film.Title} des favoris` : `Ajouter ${film.Title} aux favoris`
  );

  // Ajout de l'écoute du click du bouton pour ajouter le film aux favoris et mettre un coeur plein s'il n'est pas déjà présent dans le tableau ou le retirer s'il est déjà dedans et mettre un coeur vide  
  coeur.addEventListener("click", (event) => {
    event.stopPropagation();
    getFavoris(film);

    const favoris = checkFavoris().includes(film.imdbID);
    coeur.textContent = favoris ? "♥" : "♡";
    coeur.setAttribute(
      "aria-label",
      favoris ? `Retirer ${film.Title} des favoris` : `Ajouter ${film.Title} aux favoris`
    );
  });


  lien.appendChild(image);
  lien.appendChild(titre);
  container.appendChild(lien);
  container.appendChild(coeur);
  destination.appendChild(container);
}

const precedent = document.getElementById("precedent");
const suivant = document.getElementById("suivant");
const filmVedette = document.getElementById("film-vedette");
const detailsFilmsVedette = [];
let indexVedette = 0;

async function chargementFilmVedette() {
  const fin = filmsEnVedette.length;

  for (let i = 0; i < fin; i++) {
    const film = await getFilm(filmsEnVedette[i]);
    if (film != null) detailsFilmsVedette.push(film);  
  }

      if (detailsFilmsVedette.length > 0) {
    afficherFilmVedette(detailsFilmsVedette[indexVedette], filmVedette);
  }
}

function defilementFilmVedette(direction) {
  if (detailsFilmsVedette.length > 0) {

    indexVedette += direction;

  if (indexVedette >= detailsFilmsVedette.length) {
  indexVedette = 0;
  }

  if (indexVedette < 0) {
    indexVedette = detailsFilmsVedette.length - 1;
  }

    afficherFilmVedette(detailsFilmsVedette[indexVedette], filmVedette);
  }

  else {return}
}

suivant.addEventListener("click", () => defilementFilmVedette(1));
precedent.addEventListener("click", () => defilementFilmVedette(-1));

const galerie = document.getElementById("galerie");
const loader = document.getElementById("chargement");
let count= 0; // nombre d'images déjà affichées
let isLoading = false; // évite de lancer un chargement pendant qu'un autre est en cours

// Ajoute 10 images à la fin de la galerie
async function chargementFilmGalerie() {
  if (isLoading || count >= films.length) return;
  isLoading = true;
  loader.hidden = false;

const fin = Math.min(count + 5, films.length);

for (let i = count; i < fin; i++) {
  const film = await getFilm(films[i]);

  if (film) {
    afficherFilmGalerie(film, galerie);
  }
}

count = fin;

  loader.hidden = true;
  isLoading = false;

  // Sur un grand écran, 10 images peuvent ne pas suffire à remplir la page
  checkBottom();
}

// Charge la suite si le bas de la page est proche
function checkBottom() {
  // - 300 : on charge un peu avant le bas, l'utilisateur n'a pas à attendre
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

  if (nearBottom && !isLoading) {
    chargementFilmGalerie();
  }
}

// Première série d'images, puis vérification à chaque défilement
chargementFilmVedette();
chargementFilmGalerie();
window.addEventListener("scroll", checkBottom);
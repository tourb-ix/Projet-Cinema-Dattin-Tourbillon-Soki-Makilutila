// Utilisation du module "stockageFavoris" car il est utilisé dans toutes les pages 

import {
  checkFavoris,
  getFavoris
} from "../common/stockageFavoris.js";

const galerieFavoris = document.getElementById("galerie-favoris");
const messageFavoris = document.getElementById("message-favoris");

// Récupérer les id des films
async function FilmId(imdbID) {
  try {
    const reponse = await fetch(
      `https://www.omdbapi.com/?apikey=${window.API_KEY}&i=${encodeURIComponent(imdbID)}&plot=short`
    );
    const donnee = await reponse.json();

    if (donnee.Response === "True") {
      return donnee;
    }

    console.error(donnee.Error);
    return null;
  } catch (error) {
    console.error("Erreur lors du chargement du film :", error);
    return null;
  }
}

// Récupérer les id des films enregistrés et demande à OMDb les films correspondants
async function chargerFavoris() {
  const identifiants = checkFavoris();

  // Si aucun film dans les favoris affichage d'un message 
  if (identifiants.length === 0) {
    messageFavoris.textContent = "Vous n’avez pas encore de films favoris.";
    return;
  }

  // Chargement de tous les films avec affichage d'un message en attendant
  messageFavoris.textContent = "Chargement de vos favoris...";

  const films = await Promise.all(
    identifiants.map((imdbID) => FilmId(imdbID))
  );

  const filmsTrouves = films.filter((film) => film !== null);

// Affichage d'un message d'erreur si aucun film n'a été trouvé
if (filmsTrouves.length === 0) {
  messageFavoris.textContent = "Impossible de charger vos films favoris.";
  return;
}

// Vide si nous sommes dans aucuns des cas de la fonction du dessus
messageFavoris.textContent = "";

// Création de cartes par films trouvés
filmsTrouves.forEach((film) => {
  const carte = document.createElement("article");
  carte.classList.add("carte");

  const lien = document.createElement("a");
  lien.href = `../movie/movie.html?id=${encodeURIComponent(film.imdbID)}`;

  const image = document.createElement("img");
  image.src = film.Poster;
  image.alt = `Affiche de ${film.Title}`;

  const titre = document.createElement("h3");
  titre.textContent = film.Title;
   
// Ajout du bouton coeur
  const coeur = document.createElement("button");
    coeur.classList.add("bouton-favoris");
    coeur.type = "button";
    coeur.textContent = "♥";
    coeur.setAttribute("aria-label", `Retirer ${film.Title} des favoris`);

    coeur.addEventListener("click", () => {
    getFavoris(film);
    carte.remove();

    if (galerieFavoris.children.length === 0) {
        messageFavoris.textContent = "Vous n’avez pas encore de films favoris.";
    }
    });
    
lien.append(image, titre);
carte.appendChild(lien);
carte.appendChild(coeur);
galerieFavoris.appendChild(carte);
});
}

chargerFavoris();


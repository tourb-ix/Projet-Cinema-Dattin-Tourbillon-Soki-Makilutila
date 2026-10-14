

const CLE_FAVORIS = "cinema-favoris";

export function enregistrerFavoris(favoris) {
  localStorage.setItem(CLE_FAVORIS, JSON.stringify(favoris));
}

export function checkFavoris() {
  const donnees = localStorage.getItem(CLE_FAVORIS);
  return donnees === null ? [] : JSON.parse(donnees);
}

export function getFavoris(film) {
  let favoris = checkFavoris();

  if (favoris.includes(film.imdbID)) {
    favoris = favoris.filter((imdbID) => imdbID !== film.imdbID);
  } else {
    favoris.push(film.imdbID);
  }

  enregistrerFavoris(favoris);
}
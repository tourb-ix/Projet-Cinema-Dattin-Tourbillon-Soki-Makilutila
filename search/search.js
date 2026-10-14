import {
  checkFavoris,
  getFavoris
} from "../common/stockageFavoris.js";

function afficheOK(url){
    return new Promise((resolve)=>{
        const img=new Image();
        img.onload=()=>resolve(true);
        img.onerror=()=>resolve(false);
        img.src=url;
    });
}
/*Récupération d'un film dans l'API*/
async function getFilm(titreFilm){
    try{
        const reponse=await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(titreFilm)}&apikey=242fe89`);
        if(!reponse.ok){
            throw new Error(`Impossible de récupérer le film ${titreFilm}`);
        }
        const film=await reponse.json();
        const posterOK= await afficheOK(film.Poster);
        if (film.Response==="True" && posterOK){
            return film;
        }  
    }
    catch(erreur){
        console.log("Erreur : ",erreur);
    }
}

/*Récupération de plusieurs films de l'API dans un tableau*/

async function nouv_tabl_films(){
    const API_films=[];
    for(let i=0;i<filmsSuggeres.length;i++){
        try{
            const film= await getFilm(filmsSuggeres[i]);
            if(typeof(film)!="undefined"){
                API_films.push(film);
            }     
        }
        catch(erreur){
            console.log("Erreur : ",erreur);
        }
        }
    return(API_films);
}

let tabl_films;
const list_films=document.getElementById("list_films");
const recherche = document.getElementById("recherche");
const categorieSelect = document.getElementById("categorieSelect");
const date = document.getElementById("date");
const loader=document.getElementById("chargement");

nouv_tabl_films().then((résultat)=>{
    tabl_films=résultat.map(film=>{
        return({Affiche:film.Poster,Titre:film.Title,Réalisateur:film.Director,Catégorie:film.Genre,Année:film.Year,imdbID:film.imdbID})
    });

    /*Remplissage des options du select de catégories*/
    let categories=new Set(); /*Créer un tableau qui ignore les doublons*/
    tabl_films.forEach(film=>{
        film.Catégorie.split(/,\s*/).forEach(caté=>{
            categories.add(caté)
    });
    });
    let optionHTML="";
    categories.forEach(categorie=>{
        optionHTML+=`<option value=${categorie}>${categorie}</option>`
    });
    categorieSelect.innerHTML+=optionHTML;
    /*Remplissage du tableau*/
    let filmFiltre=[...tabl_films]
    function remplirTableau(){ 
        let lignes="";
        
        filmFiltre.forEach(film => {
            // Initialisation de l'état du bouton
            const estFavori = checkFavoris().includes(film.imdbID);
            const textBouton = estFavori ? "♥" : "♡";
            const aria = estFavori ? `Retirer ${film.Titre} des favoris` : `Ajouter ${film.Titre} aux favoris`;
            
            lignes+=`<tr>
                <td><a href="../movie/movie.html?id=${encodeURIComponent(film.imdbID)}"><img class="poster_film" src="${film.Affiche}" alt="Affiche de ${film.Titre}"/></a><button type="button" class="bouton-favoris" data-id="${film.imdbID}" aria-label="${aria}">${textBouton}</button></td>
                <td><a id="aTitre" href="../movie/movie.html?id=${encodeURIComponent(film.imdbID)}"><strong>${film.Titre}</strong></a></td>
                <td>${film.Réalisateur}</td>
                <td>${film.Catégorie}</td>
                <td>${film.Année}</td>
            </tr>`; 
        });
        list_films.innerHTML=lignes;
    }

    list_films.addEventListener("click", (event) => {
        
        const bouton=event.target.closest(".bouton-favoris");
        if(!bouton){return;};
        event.stopPropagation();
        const filmID=bouton.getAttribute('data-id');
        const film=filmFiltre.find(f=> f.imdbID===filmID);
        getFavoris(film);
        const favoris = checkFavoris().includes(film.imdbID);
        bouton.textContent = favoris ? "♥" : "♡";
        bouton.setAttribute(
            "aria-label",
            favoris ? `Retirer ${film.Titre} des favoris` : `Ajouter ${film.Titre} aux favoris`
            );
        });

    function afficherFilms() {
        const motRecherche = recherche.value.toLowerCase();
        const categorieChoisie = categorieSelect.value;
        const ordreDate = date.value;

        /*Filtre des catégories et de la barre de recherche par rapport au titre et au réalisateur*/
        filmFiltre = tabl_films.filter(film => {
            return ((film.Titre.toLowerCase().includes(motRecherche) || film.Réalisateur.toLowerCase().includes(motRecherche)) && (categorieChoisie === "toutes" || film.Catégorie.includes(categorieChoisie)));
        });

        // Tri par date
        filmFiltre.sort((a, b) => {

            return ordreDate === "ancien" ? a.Année-b.Année : b.Année-a.Année;
        });
        remplirTableau();
    }
    recherche.addEventListener('input', afficherFilms);
    categorieSelect.addEventListener('change', afficherFilms);
    date.addEventListener('change', afficherFilms);
    afficherFilms();
    loader.hidden='false';
})
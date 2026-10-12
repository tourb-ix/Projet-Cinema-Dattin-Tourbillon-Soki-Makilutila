/*Création d'une fonction qui renvoie un nombre entier aléatoire entre 2 entiers a et b*/
/*On pourra metrre ce genre de fonctions qui s'utilise sur plusieurs fichiers dans un module.js comme on l'a fait lors d'un des TP de fin*/

function afficheOK(url){
    return new Promise((resolve)=>{
        const img=new Image();
        img.onload=()=>resolve(true);
        img.onerror=()=>resolve(false);
        img.src=url;
    });
}
/*Récupération d'un film dans l'API clé=242fe89 ou 8f33d95d*/
async function getFilm(titreFilm){
    try{
        const reponse=await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(titreFilm)}&apikey=b130f3c2`);
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
            lignes+=`<tr>
                <td><a href='../movie/movie.html?id=${encodeURIComponent(film.imdbID)}'><img class='poster_film' src='${film.Affiche}'/></a></td>
                <td><a href='../movie/movie.html?id=${encodeURIComponent(film.imdbID)}'>${film.Titre}</a></td>
                <td>${film.Réalisateur}</td>
                <td>${film.Catégorie}</td>
                <td>${film.Année}</td>
            </tr>`;
            
        });
        
        list_films.innerHTML=lignes;
    }
    function afficherFilms() {
        const motRecherche = recherche.value.toLowerCase();
        const categorieChoisie = categorieSelect.value;
        const ordreDate = date.value;
        console.log(ordreDate);

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
})
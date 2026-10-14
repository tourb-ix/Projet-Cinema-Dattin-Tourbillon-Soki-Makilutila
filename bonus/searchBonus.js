/*Création d'une fonction qui renvoie un nombre entier aléatoire entre 2 entiers a et b*/
/*On pourra metrre ce genre de fonctions qui s'utilise sur plusieurs fichiers dans un module.js comme on l'a fait lors d'un des TP de fin*/
function randomInt(a,b){
    return a+Math.ceil(Math.random()*(b-a));
}

function afficheOK(url){
    return new Promise((resolve)=>{
        const img=new Image();
        img.onload=()=>resolve(true);
        img.onerror=()=>resolve(false);
        img.src=url;
    });
}
/*Récupération d'un film dans l'API clé=242fe89 ou 8f33d95d*/
async function getFilm(id_film){
    try{
        const reponse=await fetch(`http://www.omdbapi.com/?i=tt${id_film}&apikey=b130f3c2`);
        if(!reponse.ok){
            throw new Error(`Impossible de récupérer le film ${id_film}`);
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

async function nouv_tabl_films(nb_films){
    const API_films=[];
    const id_film_depart=randomInt(1,7000000);
    let i=0;
    while(API_films.length<nb_films && i<1000){
        /*créer un id valid de la forme ******* (7 chiffres)*/
        let id_valid=0;
        if(1<=id_film_depart+i && id_film_depart+i<=9){
            id_valid=`000000${id_film_depart+i}`;
        }
        else if(10<=id_film_depart+i && id_film_depart+i<=99){
            id_valid=`00000${id_film_depart+i}`;
        }
        else if(100<=id_film_depart+i && id_film_depart+i<=999){
            id_valid=`0000${id_film_depart+i}`;
        }
        else if(1000<=id_film_depart+i && id_film_depart+i<=9999){
            id_valid=`000${id_film_depart+i}`;
        }
        else if(10000<=id_film_depart+i && id_film_depart+i<=99999){
            id_valid=`00${id_film_depart+i}`;
        }
        else if(100000<=id_film_depart+i && id_film_depart+i<=999999){
            id_valid=`0${id_film_depart+i}`;
        }
        else if(1000000<=id_film_depart+i){
            id_valid=id_film_depart+i;
        }
        try{
            const film= await getFilm(id_valid);
            if(typeof(film)!="undefined"){
                API_films.push(film);
            }     
        }
        catch(erreur){
            console.log("Erreur : ",erreur);
        }
        i+=36;
        }
    return(API_films);
}
let tabl_films;
const list_films=document.getElementById("list_films");
const recherche = document.getElementById("recherche");
const categorieSelect = document.getElementById("categorieSelect");
const date = document.getElementById("date");

nouv_tabl_films(10).then((résultat)=>{
    tabl_films=résultat.map(film=>{
        return({Affiche:film.Poster,Titre:film.Title,Réalisateur:film.Director,Catégorie:film.Genre,Année:film.Year})
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
                <td><img class='poster_film' src='${film.Affiche}'/></td>
                <td>${film.Titre}</td>
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
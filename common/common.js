//----------------------------------------------------------
//ENTETES ET PIEDS DE PAGE IDENTIQUES SUR TOUTES LES PAGES
//----------------------------------------------------------

//---------------------
//ENTETES EN NAV BARRE
//---------------------

function genererUneEntete() {

    let entete = document.getElementById("entete");
    //s'assurer que le header est bien vide avant d'y mettre des objets.
    while(entete.firstChild) {
        entete.removeChild(entete.firstChild);
    };
    //mise en place du logo en haut à droite:
    let logo= document.createElement("img");
        entete.appendChild(logo); //faire du logo un enfant de l'entete
        logo.setAttribute("src", "../common/images/logo_cinema.png"); //mettre les attributs du logo
        logo.setAttribute("alt", "logo du cinéma du bocage");
        logo.setAttribute("title", "logo du cinéma du bocage");
        logo.classList.add("logo") // pouvoir gérer le logo en css

    //barre de navigation
    let navigation = document.createElement("nav");
    //index
    let lien_index = document.createElement("a");
        navigation.appendChild(lien_index);
        lien_index.setAttribute("href", "../index/index.html");
        lien_index.setAttribute("alt", "lien vers l'index");
        lien_index.setAttribute("title", "lien vers l'index");
        lien_index.textContent = "ACCUEIL" ;
    //recherche
    let lien_search = document.createElement("a");
        navigation.appendChild(lien_search);
        lien_search.setAttribute("href", "../search/search.html");
        lien_search.setAttribute("alt", "lien vers la recherche");
        lien_search.setAttribute("title", "lien vers la recherche");
        lien_search.textContent = "RECHERCHE" ;
    //favoris
    let lien_favoris = document.createElement("a");
        navigation.appendChild(lien_favoris);
        lien_favoris.setAttribute("href", "../favoris/favoris.html");
        lien_favoris.setAttribute("alt", "lien vers les favoris");
        lien_favoris.setAttribute("title", "lien vers les favoris");
        lien_favoris.textContent = "FAVORIS" ;
    // bouton mode sombre / clair
    let boutonTheme = document.createElement("button");
        navigation.appendChild(boutonTheme);
        boutonTheme.id = "theme-btn";
    // Lecture du thème enregistré
    if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    boutonTheme.textContent = "☀️";
    } else {
    boutonTheme.textContent = "🌙";
    }

    // Gestion du clic
    boutonTheme.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if(document.body.classList.contains("dark-mode")) {
            boutonTheme.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            boutonTheme.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
});

    //hamburger mobile
    const bouton_hamburger = document.createElement("button");
    bouton_hamburger.type = "button";
    bouton_hamburger.classList.add("bouton-toggle-mobile");
    bouton_hamburger.setAttribute("aria-expanded", "false");
    bouton_hamburger.setAttribute("aria-label", "Afficher ou masquer le film suggéré");
    
    const barre1 = document.createElement("span");
    const barre2 = document.createElement("span");
    const barre3 = document.createElement("span");

    bouton_hamburger.appendChild(barre1);
    bouton_hamburger.appendChild(barre2);
    bouton_hamburger.appendChild(barre3);
    navigation.appendChild(bouton_hamburger);

    bouton_hamburger.addEventListener("click", () => {
    const filmSuggere = document.getElementById("film_suggere");
    if (!filmSuggere) return;
    const estVisible = filmSuggere.classList.toggle(
        "suggestion-mobile-visible"
    );
    bouton_hamburger.setAttribute("aria-expanded", String(estVisible));
    });
    entete.appendChild(navigation);
};
genererUneEntete();



//-----------------
//PIEDS DE PAGES:
//-----------------

function genererPiedDePage() {

    let pied_de_page = document.getElementById("pied_de_page");
    //s'assurer que le header est bien vide avant d'y mettre des objets.
    while(pied_de_page.firstChild) {
        pied_de_page.removeChild(pied_de_page.firstChild);
    };

    //SECTION 1 PLAN DU SITE
    //----------------------

    let section1_pied_de_page = document.createElement("div");
        pied_de_page.appendChild(section1_pied_de_page);
    //titre de la liste:
    let titrePlan = document.createElement("p");
        titrePlan.textContent ="Plan du Site :";
        section1_pied_de_page.appendChild(titrePlan);
    //plan sous forme de liste
    let listage_site = document.createElement("ul");
        section1_pied_de_page.appendChild(listage_site);
    //index
    let li_index = document.createElement("li");
        let lien_index = document.createElement("a");
            li_index.appendChild(lien_index)
            listage_site.appendChild(li_index);
            lien_index.setAttribute("href", "./index/index.html");
            lien_index.setAttribute("alt", "lien vers l'index");
            lien_index.setAttribute("title", "lien vers l'index");
            lien_index.textContent = "Accueil" ;
    //recherche
    let li_search = document.createElement("li");
        let lien_search = document.createElement("a");
            li_search.appendChild(lien_search)
            listage_site.appendChild(li_search);
            lien_search.setAttribute("href", "./search/search.html");
            lien_search.setAttribute("alt", "lien vers la recherche");
            lien_search.setAttribute("title", "lien vers la recherche");
            lien_search.textContent = "Recherche" ;
    //recherche
    let li_favoris = document.createElement("li");
        let lien_favoris = document.createElement("a");
            li_favoris.appendChild(lien_favoris)
            listage_site.appendChild(li_favoris);
            lien_favoris.setAttribute("href", "./search/search.html");
            lien_favoris.setAttribute("alt", "lien vers la recherche");
            lien_favoris.setAttribute("title", "lien vers la recherche");
            lien_favoris.textContent = "Favoris" ;

    //SECTION 2 LES RESEAUX SOCIAUX

    let section2_pied_de_page = document.createElement("div");
        pied_de_page.appendChild(section2_pied_de_page);
    //titre de la liste:
    let titreReseaux = document.createElement("p");
        titreReseaux.textContent ="Nos Réseaux :";
        section2_pied_de_page.appendChild(titreReseaux);
    //plan sous forme de liste avec utilisation d'une API DOM:
    let listage_reseaux = document.createElement("ul");
        section2_pied_de_page.appendChild(listage_reseaux);
        // Facebook
        let li_facebook = document.createElement("li");
        let lien_facebook = document.createElement("a");
            lien_facebook.href = "https://www.facebook.com/profile.php?id=61595162285195&sk=about";
            lien_facebook.target = "_blank";
            lien_facebook.title = "Notre compte Facebook";
            lien_facebook.innerHTML = '<i class="fa-brands fa-facebook"></i>';
            li_facebook.appendChild(lien_facebook);
            listage_reseaux.appendChild(li_facebook);
        // Instagram
        let li_insta = document.createElement("li");
        let lien_insta = document.createElement("a");
            lien_insta.href = "https://www.instagram.com/";
            lien_insta.target = "_blank";
            lien_insta.title = "Notre compte Instagram";
            lien_insta.innerHTML = '<i class="fa-brands fa-instagram"></i>';
            li_insta.appendChild(lien_insta);
            listage_reseaux.appendChild(li_insta);
        // TikTok
        let li_tt = document.createElement("li");
        let lien_tt = document.createElement("a");
            lien_tt.href = "https://www.tiktok.com/";
            lien_tt.target = "_blank";
            lien_tt.title = "Notre compte TikTok";
            lien_tt.innerHTML = '<i class="fa-brands fa-tiktok"></i>';
            li_tt.appendChild(lien_tt);
            listage_reseaux.appendChild(li_tt);

    //SECTION 3 Mentions légales et crédits 
    let section3_pied_de_page = document.createElement("div");
            pied_de_page.appendChild(section3_pied_de_page);
        //titre des Mentions légales:
        let titreMentions = document.createElement("p");
            titreMentions.textContent ="Mentions légales :";
            section3_pied_de_page.appendChild(titreMentions);
        //liste mentions légales :
        let listage_mentions = document.createElement("ul");
            section3_pied_de_page.appendChild(listage_mentions);
            //personne légale :
            let li_ste = document.createElement("li");
            listage_mentions.appendChild(li_ste);
            li_ste.textContent = "Société Ciné du Bocage";
            //email :
            let li_mail = document.createElement("li");
            listage_mentions.appendChild(li_mail);
            li_mail.textContent = "cinedubocage@gmail.com";
            //téléphone :
            let li_tel = document.createElement("li");
            listage_mentions.appendChild(li_tel);
            li_tel.textContent = "06.06.06.06.06";
            //hébergeur du site :
            let li_heb = document.createElement("li");
            listage_mentions.appendChild(li_heb);
            li_heb.textContent = "hébergé par : ref hébergeur";
            //CGV :
            let li_cgv = document.createElement("li");
            listage_mentions.appendChild(li_cgv);
            li_cgv.textContent = "Conditions générales de vente";

        //titre des Crédits:
        let titreCredits = document.createElement("p");
            titreCredits.textContent ="Crédits :";
            section3_pied_de_page.appendChild(titreCredits);
        //liste mentions légales :
        let listage_credits = document.createElement("ul");
            section3_pied_de_page.appendChild(listage_credits);
            //personne légale :
            let li_donneesPerso = document.createElement("li");
            listage_credits.appendChild(li_donneesPerso);
            li_donneesPerso.textContent = "utilisation des données personnelles";
            //Cookies
            let li_cookies = document.createElement("li");
            listage_credits.appendChild(li_cookies);
            li_cookies.textContent = "utilisation des cookies";
            //Copyrights
            let li_cr = document.createElement("li");
            listage_credits.appendChild(li_cr);
            li_cr.textContent = "Copyrights";

};
genererPiedDePage();


//--------------------
//EVENEMENT AU SCROLL:
//--------------------

const navigation = document.getElementById("entete"); //on défini la constante qui dira où doit se trouver l'élément nav.
let lastScrollY = window.scrollY //on initialise la variable globale de la dernière valeur du scrollY.

window.addEventListener('scroll', () => {
 
    const currentScrollY = window.scrollY // on prend la valeur de scrollY à l'instant T

    if(currentScrollY < lastScrollY) {
        navigation.style.top = 0;
    } else {
        navigation.style.top = "-200px";
    }

    lastScrollY = currentScrollY //on boucle la fonction et la réinitialise
});

//--------------------
//Sidebar:
//--------------------

// ajuster automatiquement la position de la page
function ajusterLayout() {
    const hauteurHeader = header.offsetHeight;
    page.style.marginTop = hauteurHeader + "px"
};
// au chargement
window.addEventListener("load", ajusterLayout);
// lors d'un redimensionnement
window.addEventListener("resize", ajusterLayout);

// Créer un événement au click sur le hamburger menu pour sortir la sidebar, ranger la sidebar si on reclick dessus
const toggleBtn = document.querySelector(".toggle-btn")//on dféfini le bouton
// on défini la side bar et on ajoute un #side-bar.open en CSS.
const sidebar = document.querySelector("#side-bar")
//on crée les const pour les animer après avoir créé les deux id en html
const croix_haut = document.querySelector("#span_haut")
const croix_bas = document.querySelector("#span_bas")
//on créé une constante content pour l'opacifier quand elle sort
const content = document.querySelector(".content");
// on sélectionne aussi le header pour se positionner en dessous
const header = document.querySelector("#entete");
// on selectionne page pour le dimenssioner
const page = document.querySelector(".page");
;
//on applique le listener à l'event clic au bouton
toggleBtn.addEventListener('click',() => {
    
    sidebar.classList.toggle('open');

    // Créer en css l'hamburger menu qui se transforme en croix
        //je fais la rotation 
    croix_haut.classList.toggle('rotate')
    croix_bas.classList.toggle('rotate')

    if(sidebar.classList.contains('open')) { //contains veut dire qu'on vérifie la présence d'une classe CSS on l'utilise donc précédé de classList
       content.style.opacity = 0.3;
    } else {
        content.style.opacity = 1 ;
    }
});

// Ranger la sidebar si on click sur le contenu principal
window.addEventListener('click',(e) =>{   // le "e" permet de viser qqch en particulier
    if (!sidebar.contains(e.target)){    //le point d'exclamation va tout selectionner sauf la sidebar
        sidebar.classList.remove('open'); //classlist permet de "remove" un css
        content.style.opacity = 1;
    }
});

//remplir la sidebar avec des suggestions de film:


const API_KEY = "99799775";
window.API_KEY = API_KEY; // mettre la clef dans un objet afin de la rendre accessible dans les modules

const filmsSuggeres = [
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

async function afficherFilmSuggere() {

    const container = document.getElementById("film_suggere");

    if (!container) return;

    try {
        //on choisi un chiffre au hasard et on l'arrondi avec le méthodes Math
        const indexAleatoire = Math.floor(
            Math.random() * filmsSuggeres.length
        );
        const titreFilm = filmsSuggeres[indexAleatoire];
        // on appelle l' API
        const reponse = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(titreFilm)}&plot=short`
);

const film = await reponse.json();

container.innerHTML = "";
    const titre = document.createElement("h3");
        titre.textContent = film.Title;

    const image = document.createElement("img");
        image.src = film.Poster;
        image.alt = film.Title;

    const resume = document.createElement("p");
        resume.textContent = film.Plot;

    const lien = document.createElement("a");
        lien.textContent = "En savoir plus";
        lien.href = `../movie/movie.html?id=${film.imdbID}`;
        lien.classList.add("btn-film");

    container.appendChild(titre);
    container.appendChild(image);
    container.appendChild(resume);
    container.appendChild(lien);
            
    } catch (erreur) {
        console.error(`
            "Erreur chargement film suggéré :",
            erreur`
        );
        container.innerHTML = `
            <p>Impossible de charger le film suggéré.</p>
        `;
    }
};

afficherFilmSuggere();





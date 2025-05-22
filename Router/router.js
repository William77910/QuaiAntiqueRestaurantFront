import Route from "./route.js";                           // Importation de la classe Route
import { allRoutes, websiteName } from "./allRoutes.js";  // Importation des routes et du nom du site

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html", []);

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
let currentRoute = null;

// Parcours de toutes les routes pour trouver la correspondance
allRoutes.forEach((element) => {
    if (element.url == url) {
    currentRoute = element;
    }
});
// Si aucune correspondance n'est trouvée, on retourne la route 404
if (currentRoute != null) {
    return currentRoute;
} else {
    return route404;
}
};

// Fonction pour charger le contenu de la page

const LoadContentPage = async () => {             // Récupération de l'URL actuelle
const path = window.location.pathname;            // Récupération du chemin de l'URL
const actualRoute = getRouteByUrl(path);          // Récupération de la route correspondante

// Vérification des autorisations d'accès à la page
  const allRolesArrays = actualRoute.authorize;   // Récupération des rôles autorisés

if (allRolesArrays.length > 0) {                  // Vérification des autorisations
  if(allRolesArrays.includes("disconnected")) {   // Vérification si l'utilisateur est déconnecté
    if(isConnected()) {                           // Si l'utilisateur est connecté, redirection vers la page d'accueil 
      window.location.replace("/");               // Redirection vers la page d'accueil
    }
  }
  else{
    const roleUser = getRole();                   // Récupération du rôle de l'utilisateur
    if(!allRolesArrays.includes(roleUser)) {      // Vérification si le rôle de l'utilisateur est autorisé
      window.location.replace("/");               // Redirection vers la page d'accueil
    }
  }
}


// Récupération du contenu HTML de la route
const html = await fetch(actualRoute.pathHtml).then((data) => data.text());

// Ajout du contenu HTML à l'élément avec l'ID "main-page"
document.getElementById("main-page").innerHTML = html;

// Ajout du contenu JavaScript
if (actualRoute.pathJS != "") {
    // Création d'une balise script
    var scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);
    // Ajout de la balise script au corps du document
    document.querySelector("body").appendChild(scriptTag);
}

// Changement du titre de la page
document.title = actualRoute.title + " - " + websiteName;
};

// Afficher ou masquer les éléments en fonction du rôle
showAndHideElementsForRoles();  // Fonction pour afficher ou masquer les éléments en fonction du rôle de l'utilisateur

// Fonction pour gérer les événements de routage (clic sur les liens)
const routeEvent = (event) => {
event = event || window.event;
event.preventDefault();
  // Mise à jour de l'URL dans l'historique du navigateur
window.history.pushState({}, "", event.target.href);
  // Chargement du contenu de la nouvelle page
LoadContentPage();
};
// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;
// Assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;
// Chargement du contenu de la page au chargement initial
LoadContentPage();
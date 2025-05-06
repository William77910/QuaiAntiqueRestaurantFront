import Route from "./route.js";
//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/galerie", "La galerie", "/pages/galerie.html"),
    new Route("/carte", "La carte", "/pages/carte.html"),
    new Route("/signin", "Connexion", "/pages/authentification/signin.html"),
    new Route("/signup", "Inscription", "/pages/authentification/signup.html"),
    new Route("/account", "Mon compte", "/pages/authentification/account.html"),
    new Route("/editPassword", "Changement de mot de passe", "/pages/authentification/editPassword.html"),];
//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
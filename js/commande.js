/* Récupérer ID commande + construction page */

function getCommande(){
    const montantTotal = localStorage.getItem("montantTotal");
    const idCommande = sessionStorage.getItem("order");
    console.log(montantTotal);
    console.log(idCommande);
    createConfirmationCommande(montantTotal, idCommande);
    localStorage.removeItem("contenuPanier")
}

/* END Récupérer ID commande + construction page */

getCommande();


/* Création élément confirmation commande */

function createConfirmationCommande(montantTotal, idCommande) {
    let articleCommande = document.createElement("article");
    const mainCommande = document.getElementById("main-commande");
    mainCommande.appendChild(articleCommande);
    articleCommande.classList.add("col", "bg-light");

    let titleCommande = document.createElement("h3");
    articleCommande.appendChild(titleCommande);
    titleCommande.textContent = "Récapitulatif de votre commande";
    titleCommande.classList.add("col", "text-primary", "text-center", "d-flex", "flex-column", "justify-content-between")

    let divCommande = document.createElement("div");
    articleCommande.appendChild(divCommande);
    divCommande.classList.add("commande-p", "text-primary");

    let confirmationCommande = document.createElement("p");
    divCommande.appendChild(confirmationCommande);
    confirmationCommande.textContent = "Numéro de commande : " + idCommande;

    let prixCommande = document.createElement("p");
    divCommande.appendChild(prixCommande);
    prixCommande.textContent = "Montant total = " + montantTotal + " €";
}

/* END Création élément confirmation commande */
let teddies = [];

/* Appel API produits */

getTeddies = () =>{
    return new Promise((resolve) =>{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (this.readyState == XMLHttpRequest.DONE && this.status ==200){
                resolve(JSON.parse(this.responseText));
                console.log("Connection ok");
                teddies = JSON.parse(this.responseText);
                detailTeddy();
            } else {
                console.log("ERREUR connection API")
            }
        }
        request.open("GET", "http://localhost:3000/api/teddies/");
        request.send();
    })
}

/* END Appel API produits */

async function callTeddies(){
    const callTeddies = await getTeddies();
}

callTeddies()


/* Récupérer ID Teddy */

function detailTeddy(){
    let idTeddy = location.search.substring(4);
    getTeddyItem(teddies, idTeddy)
}

/* END Récupérer ID Teddy */


/* Item Teddy */

function getTeddyItem(teddies, idTeddy){
    let choosenTeddy = teddies.find (teddies => teddies["_id"] == idTeddy);
    console.log(choosenTeddy);
    createCardChoosenTeddy(choosenTeddy, idTeddy);
}

/* END Item Teddy */

/* Création card produit selectionné */

function createCardChoosenTeddy(choosenTeddy, idTeddy){

    let productTitle = document.getElementById("teddyName");
    productTitle.textContent = "Rencontrez " + choosenTeddy.name;

    let articleCard = document.createElement("article");
    const mainProduct = document.getElementById("main-product");
    mainProduct.appendChild(articleCard);
    articleCard.classList.add("col-12", "col-md-10", "bg-light", "d-flex", "flex-wrap", "justify-content-between", "align-items-between");
    
    let cardTeddy = document.createElement("div");
    articleCard.appendChild(cardTeddy);
    cardTeddy.classList.add("card", "col", "bg-light");

    /* IMAGES */
    let imageTeddy = document.createElement("img");
    cardTeddy.appendChild(imageTeddy);
    imageTeddy.classList.add("card-img-top", "photo", "img-fluid");
    imageTeddy.setAttribute("alt", "photo de " + choosenTeddy.name)
    imageTeddy.src = choosenTeddy.imageUrl;

    /* CARD BODY */
    let divCardBody = document.createElement("div");
    cardTeddy.appendChild(divCardBody);
    divCardBody.classList.add("card-body", "text-center", "d-flex", "flex-column", "justify-content-between")

    /* CARD BODY - TITLE */
    let titleTeddy = document.createElement("h3");
    divCardBody.appendChild(titleTeddy);
    titleTeddy.classList.add("card-title", "text-primary");
    titleTeddy.textContent = choosenTeddy.name;

    /* CARD BODY - DESCRIPTION */
    let descriptionTeddy = document.createElement("p");
    divCardBody.appendChild(descriptionTeddy);
    descriptionTeddy.classList.add("description", "text-justify", "text-primary");
    descriptionTeddy.textContent = choosenTeddy.description;

    /* CARD BODY - DIV PRIX + DIV CHOIX */
    let divPriceChoice = document.createElement("div");
    divCardBody.appendChild(divPriceChoice);
    divPriceChoice.classList.add("d-flex", "flex-row", "justify-content-between", "py-4");

     /* CARD BODY - DIV PRIX */
     let divPrice = document.createElement("div");
     divPriceChoice.appendChild(divPrice);
     divPrice.classList.add("d-flex", "flex-row", "justify-content-start", "col-7");

     /* CARD BODY - PRIX */
     let priceTeddy = document.createElement("p");
     divPrice.appendChild(priceTeddy);
     priceTeddy.classList.add("price", "font-weight-bold", "text-primary");
     priceTeddy.textContent = choosenTeddy.price / 100 + " euros";

     /* CARD BODY - DIV CHOIX + COULEURS */
     let divLink = document.createElement("div");
     divPriceChoice.appendChild(divLink);
     divLink.classList.add("d-flex", "flex-row", "justify-content-between", "col-5");

     /* CARD BODY - BOUTON CHOIX */

     chooseColor(divLink, choosenTeddy)

     /* CARD BODY - BOUTON AJOUT PANIER */

     let linkToPanier = document.createElement("a");
     divCardBody.appendChild(linkToPanier);

     let buttonPanier = document.createElement("button");
     linkToPanier.appendChild(buttonPanier);
     buttonPanier.classList.add("btn", "btn-info", "text-primary", "font-weight-bold", "my-4");
     buttonPanier.textContent = "Ajouter au panier";
     console.log(idTeddy);
     addPanier(buttonPanier, idTeddy);

    
}

/* END Création card produit selectionné */


/* Création choix de la couleur */ 

function chooseColor(divLink, choosenTeddy){
    let sentenceChooseColor = document.createElement("p");
    divLink.appendChild(sentenceChooseColor);
    sentenceChooseColor.classList.add("font-weight-bold", "text-primary");
    sentenceChooseColor.textContent = "Choisissez la couleur : ";

    let propositionColor = document.createElement("select");
    divLink.appendChild(propositionColor);
    propositionColor.classList.add("form-control", "col-5", "text-secondary");
    propositionColor.id = "colorsList"; 

    numberColors = choosenTeddy.colors;
    for (let i = 0; i < numberColors.length; i++){
        let optionColors = document.createElement("option");
        propositionColor.appendChild(optionColors);
        optionColors.textContent = choosenTeddy.colors[i];
    }
}

/* END Création choix de la couleur */


/* Ajout élément dans le panier */ 

class MyProduct {
    constructor(idTeddy, selectedColor, priceTeddy, nameTeddy){
        this.idTeddy = idTeddy; 
        this.selectedColor = selectedColor;
        this.priceTeddy = priceTeddy;
        this.nameTeddy = nameTeddy;
    }
}

if(localStorage.getItem("contenuPanier")){
    console.log("Panier existant");
} else {
    console.log("Le panier n'existe pas, création du panier");
    let creerPanier = [];
    localStorage.setItem("contenuPanier", JSON.stringify(creerPanier));
}

function addPanier(buttonPanier, idTeddy){
    buttonPanier.addEventListener ("click", function () {
        let contenuPanier = JSON.parse(localStorage.getItem("contenuPanier"));
        let selectedColor = document.getElementById("colorsList").value;
        choosenTeddy = teddies.find (teddies => teddies["_id"] == idTeddy);
        let priceTeddy = choosenTeddy.price /100;
        let nameTeddy = choosenTeddy.name;
        console.log(selectedColor);
        console.log(idTeddy);
        let product = new MyProduct(idTeddy, selectedColor, priceTeddy, nameTeddy);
        contenuPanier.push(product);
        localStorage.setItem("contenuPanier", JSON.stringify(contenuPanier));
        console.log(contenuPanier);
        alert("Cet article a été ajouté à votre panier")
    })
}

/* END Ajout élément dans le panier */ 

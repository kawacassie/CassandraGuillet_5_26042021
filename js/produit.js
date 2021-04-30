/* Appel API produits */

const APIURL = "http://localhost:3000/api/teddies";

getTeddies = () =>{
    return new Promise((resolve) =>{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (this.readyState == XMLHttpRequest.DONE && this.status ==200){
                resolve(JSON.parse(this.responseText));
                console.log("Connection ok");
                detailTeddy();
            } else {
                console.log("ERREUR connection API")
            }
        }
        request.open("GET", APIURL);
        request.send();
    })
}

/* END Appel API produits */


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
    imageTeddy.src = "../images/" + choosenTeddy.imageUrl;

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

     /* CARD BODY - DIV PRIX + BOUTON */
     let divLink = document.createElement("div");
     divCardBody.appendChild(divLink);
     divLink.classList.add("d-flex", "flex-row", "justify-content-between");

     /* CARD BODY - PRIX */
     let priceTeddy = document.createElement("p");
     divLink.appendChild(priceTeddy);
     priceTeddy.classList.add("price", "font-weight-bold", "text-primary");
     priceTeddy.textContent = choosenTeddy.price / 100 + " euros";

     /* CARD BODY - BOUTON */

     let linkToPanier = document.createElement("a");
     divLink.appendChild(linkToPanier);
     createButtonLinkToProduct(linkToPanier);
}

/* END Création card produit selectionné */

/* Création Bouton ajouter au panier */ 

function createButtonLinkToProduct(linkToPanier){

    let buttonPanier = document.createElement("button");
    linkToPanier.appendChild(buttonPanier);
    buttonPanier.classList.add("btn", "btn-info", "text-primary", "font-weight-bold");
    buttonPanier.textContent = "Ajouter au panier"; 
}

/* END Création Bouton ajouter au panier */ 

getTeddies()
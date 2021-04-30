/* Création des cards produits */

function createCardTeddy(teddies){
    for (let i = 0; i < teddies.length; i++){

        let articleCard = document.createElement("article");
        const mainHome = document.getElementById("main-home");
        mainHome.appendChild(articleCard);
        articleCard.classList.add("col-12", "col-md-5", "bg-light", "d-flex", "flex-wrap", "justify-content-between", "align-items-between");
    
        let cardTeddy = document.createElement("div");
        articleCard.appendChild(cardTeddy);
        cardTeddy.classList.add("card", "col", "bg-light");

        /* IMAGES */
        let imageTeddy = document.createElement("img");
        cardTeddy.appendChild(imageTeddy);
        imageTeddy.classList.add("card-img-top", "photo", "img-fluid");
        imageTeddy.setAttribute("alt", "photo de " + teddies[i].name)
        imageTeddy.src = "./images/" + teddies[i].imageUrl;

        /* CARD BODY */
        let divCardBody = document.createElement("div");
        cardTeddy.appendChild(divCardBody);
        divCardBody.classList.add("card-body", "text-center", "d-flex", "flex-column", "justify-content-between")

        /* CARD BODY - TITLE */
        let titleTeddy = document.createElement("h3");
        divCardBody.appendChild(titleTeddy);
        titleTeddy.classList.add("card-title", "text-primary");
        titleTeddy.textContent = teddies[i].name;

        /* CARD BODY - DIV PRIX + BOUTON */
        let divLink = document.createElement("div");
        divCardBody.appendChild(divLink);
        divLink.classList.add("d-flex", "flex-row", "justify-content-between");

        /* CARD BODY - PRIX */
        let priceTeddy = document.createElement("p");
        divLink.appendChild(priceTeddy);
        priceTeddy.classList.add("price", "font-weight-bold", "text-primary");
        priceTeddy.textContent = teddies[i].price / 100 + " euros";

        /* CARD BODY - BOUTON */

        let linkToProduct = document.createElement("a");
        divLink.appendChild(linkToProduct);
        linkToProduct.setAttribute("href", "./pages/produit.html?id=" + teddies[i]._id);
        createButtonLinkToProduct(linkToProduct);
    }
}

/* END Création des cards produits */ 


/* Création Bouton de redirection */ 

function createButtonLinkToProduct(linkToProduct){

    let buttonInfo = document.createElement("button");
    linkToProduct.appendChild(buttonInfo);
    buttonInfo.classList.add("btn", "btn-info", "text-primary", "font-weight-bold");
    buttonInfo.textContent = "Voir le produit"; 
}

/* END Création Bouton de redirection */ 


/* Appel API produits */

const APIURL = "http://localhost:3000/api/teddies";

getTeddies = () =>{
    return new Promise((resolve) =>{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (this.readyState == XMLHttpRequest.DONE && this.status ==200){
                resolve(JSON.parse(this.responseText));
                console.log("Connection ok");
                createCardTeddy(teddies);
            } else {
                console.log("ERREUR connection API")
            }
        }
        request.open("GET", APIURL);
        request.send();
    })
}

/* END Appel API produits */


getTeddies()
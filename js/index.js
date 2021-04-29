const APIURL = "http://localhost:3000/api/teddies";

/* Création des cards produits */ 

function createCardTeddy(teddies){
    let articleCard = document.createElement("article");
    const mainHome = document.getElementById("main-home");
    mainHome.appendChild(articleCard);
    articleCard.classList.add("col-10", "col-md-5", "bg-light", "d-flex", "flex-wrap", "justify-content-between", "align-items-between");

    for (let i = 0; i < teddies.length; i++){
        let cardTeddy = document.createElement("div");
        articleCard.appendChild(cardTeddy);
        cardTeddy.classList.add("card", "col");

        /* IMAGES */
        let imageTeddy = document.createElement("img");
        cardTeddy.appendChild(imageTeddy);
        imageTeddy.classList.add("card-img-top", "photo", "img-fluid");
        imageTeddy.src = teddies[i].imageUrl;

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
        priceTeddy.classList.add("price", "font-weight-bold", "text-secondary");
        priceTeddy.textContent = teddies[i].price / 100 + " euros";

        /* CARD BODY - BOUTON */

        let linkToProduct = document.createElement("a");
        divLink.appendChild(linkToProduct);
        getUrlProduct(teddies, i, linkToProduct);
        createButtonLinkToProduct(linkToProduct);
    }
}

/* END Création des cards produits */ 


/* Redirection page produit */

function getUrlProduct(teddies, i, linkToProduct){

    /* Récupération URL */
    let splitUrl = window.location.pathname.split("/");
    let lastItem = splitUrl.pop();
    let url = window.location.pathname.replace(lastItem, "../pages/produit.html");

    /* Création objet URL*/
    let urlObject = new URL(url);
    let idTeddy = teddies[i]._id;
    urlObject.searchParams.append("id", idTeddy);
    linkToProduct.href = urlObject;
}

/* END Redirection page produit */


/* Création Bouton de redirection */ 

function createButtonLinkToProduct(linkToProduct){

    let buttonInfo = document.createElement("button");
    linkToProduct.appendChild(buttonInfo);
    buttonInfo.classList.add("btn", "btn-secondary", "text-primary");
    buttonInfo.textContent = "Voir le produit"
}

/* END Création Bouton de redirection */ 


/* Appel API produits */

/* ESSAI 1 !!!! 
    function getTeddies() {
    fetch("http://localhost:3000/api/teddies")
    .then(function(res){
        if (res.ok){
            return res.json();
           
        }
    })
    .then(createCardTeddy(teddies))
    .catch(function(err){
        console.error("Retour du serveur : ", res.status)
    })
}*/

/* ESSAI 2 !!!
    async function getTeddies(){
    try{
        let response = await fetch("​http://localhost:3000/api/teddies");
        if (response.ok) {
            let teddies = await response.json();
            createCardTeddy(teddies);
        } else {
            console.error("Retour du serveur : ", response.status)
        }
    } catch (e) {
        console.log(e);
    }
} */

getTeddies = () =>{
    return new Promise((resolve) =>{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (this.readyState == XMLHttpRequest.DONE && this.status ==200){
                resolve(JSON.parse(this.responseText));
                console.log("Connection ok");
                createCardTeddy;
            } else {
                console.log("ERROR connection API")
            }
        }
        request.open("GET", APIURL);
        request.send();
    })
}

/* END Appel API produits */


getTeddies()
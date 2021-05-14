let teddies = [];
let contenuPanier = [];
let arrayPrice = [];
let products = [];
let contact = {};

class ContactInfo {
    constructor (firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email; 
    }
}

/* Récupérer Panier + construction page */

function getTeddies(){
    contenuPanier = JSON.parse(localStorage.getItem("contenuPanier")) || {};
    for (i = 0; i < contenuPanier.length; i++){
        let itemTeddy = contenuPanier[i].idTeddy;
        //console.log(itemTeddy);
        createPanier(itemTeddy, contenuPanier);
        addItemPrice(contenuPanier);
        addIdProducts(contenuPanier)
    }
    totalPricePanier(arrayPrice);
    deletePanier();
    validerFormulaire()
    console.log(contenuPanier);
}

/* END Récupérer Panier + construction page */

getTeddies()


/* Création du panier */ 

function createPanier(itemTeddy, contenuPanier){
    let panier = document.getElementById("contenu-panier"); 

    let divPanier = document.createElement("div");
    panier.appendChild(divPanier);
    divPanier.classList.add("d-flex", "flex-row", "justify-content-around", "text-primary", "font-weight-bold", "border-bottom", "border-info");

    /* DIV NOM */
    let nameTeddy = document.createElement("p");
    divPanier.appendChild(nameTeddy);
    nameTeddy.textContent = contenuPanier[i].nameTeddy;
    nameTeddy.classList.add("my-3", "col-3", "col-md-2", "align-self-center");

    /* DIV COULEUR */
    let colorTeddy = document.createElement("p");
    divPanier.appendChild(colorTeddy);
    colorTeddy.textContent = contenuPanier[i].selectedColor;
    colorTeddy.classList.add("my-3", "col-3", "col-md-2", "align-self-center");

    /* DIV PRIX */
    let priceTeddy = document.createElement("p");
    divPanier.appendChild(priceTeddy);
    priceTeddy.textContent = contenuPanier[i].priceTeddy + "€"; 
    priceTeddy.classList.add("price", "my-3", "col-2", "align-self-center");

    /* DIV SUPPRIMER UN ELEMENT */
    let buttonDeleteOne = document.createElement("button");
    divPanier.appendChild(buttonDeleteOne);
    buttonDeleteOne.classList.add("btn", "btn-info", "text-primary", "font-weight-bold", "my-3");
    buttonDeleteOne.innerHTML = "<i class=\"fas fa-trash-alt\"></i>";

    buttonDeleteOne.addEventListener("click", function (){
        contenuPanier = JSON.parse(localStorage.getItem("contenuPanier")) || {};
        console.log(contenuPanier);
        console.log(itemTeddy);
        contenuPanier.splice(itemTeddy, 1); 
        localStorage.clear(); 
        localStorage.setItem("contenuPanier", JSON.stringify(contenuPanier));
        window.location.reload();
    })

}


/* END Création du panier */ 



/* Prix total du panier */

function addItemPrice(contenuPanier){
    let itemPrice = contenuPanier[i].priceTeddy;
    arrayPrice.push(itemPrice);
}

function totalPricePanier(arrayPrice) {
    let totalPrice = document.getElementById("prix-total"); 
    let total = 0; 
    for (i = 0; i < arrayPrice.length; i++){
        total = total + arrayPrice[i]; 
        totalPrice.textContent = "Montant total = " + (total) + "€";
        totalPrice.classList.add("text-primary", "font-weight-bold", "my-4")
        localStorage.setItem("montantTotal", JSON.stringify(total));
    }
    //console.log(total);
}

/* END Prix total du panier */



/* Vider le panier */

function deletePanier() {
    let divDeletePanier = document.getElementById("vider-panier");
    let buttonDeletePanier = document.createElement("button");
    divDeletePanier.appendChild(buttonDeletePanier);
    buttonDeletePanier.classList.add("btn", "btn-info", "text-primary", "font-weight-bold", "my-4");
    buttonDeletePanier.innerHTML = "<i class=\"fas fa-trash-alt\"></i>" + " Vider mon panier"

    buttonDeletePanier.addEventListener("click", function() {
        localStorage.removeItem("contenuPanier");
        window.location.reload();
    })
}


/* END Vider le panier */



/* Ajouts ID des produits dans tableau products */

function addIdProducts(contenuPanier) {
    products.push(contenuPanier[i].idTeddy);
    console.log(products)
}

/* END Ajouts ID des produits dans tableau products */



/* Récupérer les données des formulaires */

function contenuFormulaire(){
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    contact = new ContactInfo(firstName, lastName, address, city, email);
}

/* END Récupérer les données des formulaires */



/* Vérifier les données formulaire */

function validerFormulaire(){
    let buttonValidation = document.getElementById("btn-validation");
    buttonValidation.addEventListener("click", function(){
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;
        let checkNumber = /[0-9]/;
        let checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (firstName, lastName, address, city, email != "" && checkNumber.test(firstName && lastName && city) == false && checkMail.test(email)) {
            console.log("OK commande")
            confirmationCommande();
            return true;
        } else {
            alert("Saisissez tous les champs et entrez un email valide");
            console.log("erreur de saisie");
            return false;
        }
    })
}


/* END Vérifier les données formulaire */



/* Valider commande et envoi objet contact + tableau product */

function confirmationCommande() {
    contenuFormulaire();
    infoToSend = JSON.stringify({contact, products});
    console.log(infoToSend);
    postFormulaire(infoToSend)
}

/* END Valider commande et envoi objet contact + tableau product */


/* Requête POST API */

/*async function postFormulaire(infoToSend){
    try { 
        let response = await fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: infoToSend,
        });
        if (response.ok){
            let responseId = await response.json();
            getOrderId(responseId);
            window.location.href = "commande.html";
            console.log(localStorage);
        } else {
            console.log("Erreur POST formulaire")
        }
    } catch (e) {
        console.log(e)
    }
}

function getOrderId(responseId){
    let orderId = responseId.orderId; 
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId)
} */

postFormulaire = (infoToSend) => {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                sessionStorage.setItem("order", this.responseText);
                //window.location.href = "./pages/commande.html"
                resolve(JSON.parse(this.responseText));
                console.log("ok POST");
            } else {
                console.log("Erreur POST")
            }
        };
        request.open("POST", "http://localhost:3000/api/teddies/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(infoToSend);
    })

}

/* END Requête POST API */

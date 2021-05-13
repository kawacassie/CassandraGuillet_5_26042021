
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

/* Appel API produits + récupérer Panier */

const APIURL = "http://localhost:3000/api/teddies";

getTeddies = () =>{
    return new Promise((resolve) =>{
        contenuPanier = JSON.parse(localStorage.getItem("contenuPanier")) || {};
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (this.readyState == XMLHttpRequest.DONE && this.status ==200){
                resolve(JSON.parse(this.responseText));
                console.log("Connection ok");
                teddies = JSON.parse(this.responseText);
                for (i = 0; i < contenuPanier.length; i++){
                    let itemTeddy = teddies.find(teddies => teddies["_id"] == contenuPanier[i].idTeddy);
                    createPanier(itemTeddy, contenuPanier);
                    addItemPrice(itemTeddy);
                    addIdProducts(contenuPanier)
                }
                totalPricePanier(arrayPrice);
                deletePanier();
                validerFormulaire()

            } else {
                console.log("ERREUR connection API")
            }
        }
        request.open("GET", APIURL);
        request.send();
    })
}

/* Appel API produits + récupérer Panier */

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
    nameTeddy.textContent = itemTeddy.name;
    nameTeddy.classList.add("my-3", "col-3", "col-md-2", "align-self-center");

    /* DIV COULEUR */
    let colorTeddy = document.createElement("p");
    divPanier.appendChild(colorTeddy);
    colorTeddy.textContent = contenuPanier[i].selectedColor;
    colorTeddy.classList.add("my-3", "col-3", "col-md-2", "align-self-center");

    /* DIV PRIX */
    let priceTeddy = document.createElement("p");
    divPanier.appendChild(priceTeddy);
    priceTeddy.textContent = itemTeddy.price / 100 + "€"; 
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

function addItemPrice(itemTeddy){
    let itemPrice = itemTeddy.price;
    arrayPrice.push(itemPrice);
}

function totalPricePanier(arrayPrice) {
    let totalPrice = document.getElementById("prix-total"); 
    let total = 0; 
    for (i = 0; i < arrayPrice.length; i++){
        total = total + arrayPrice[i]; 
        totalPrice.textContent = "Montant total = " + (total/100) + "€";
        totalPrice.classList.add("text-primary", "font-weight-bold", "my-4")
        localStorage.setItem("montantTotal", JSON.stringify(total));
    }
    //console.log(total/100);
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


/* Valider commande et envoi objet contact + tableau product */

function confirmationCommande() {
    contenuFormulaire();
    infoToSend = JSON.stringify({contact, products});
    console.log(infoToSend);
}

/* END Valider commande et envoi objet contact + tableau product */


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
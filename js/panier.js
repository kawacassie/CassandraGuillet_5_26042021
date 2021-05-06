
let teddies = [];
let contenuPanier = [];

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
                    createPanier(itemTeddy, contenuPanier)
                }
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
    nameTeddy.classList.add("my-3");

    /* DIV COULEUR */
    let colorTeddy = document.createElement("p");
    divPanier.appendChild(colorTeddy);
    colorTeddy.textContent = contenuPanier[i].selectedColor;
    colorTeddy.classList.add("my-3");

    /* DIV PRIX */
    let priceTeddy = document.createElement("p");
    divPanier.appendChild(priceTeddy);
    priceTeddy.textContent = itemTeddy.price / 100 + " euros"; 
    priceTeddy.classList.add("price", "my-3");

    /* DIV SUPPRIMER UN ELEMENT */
    let buttonDeleteOne = document.createElement("button");
    divPanier.appendChild(buttonDeleteOne);
    buttonDeleteOne.classList.add("btn", "btn-info", "text-primary", "font-weight-bold", "my-3");
    buttonDeleteOne.innerHTML = "<i class=\"fas fa-trash-alt\"></i>";

    buttonDeleteOne.addEventListener("click", function (){
        contenuPanier = JSON.parse(localStorage.getItem("contenuPanier")) || {};
        console.log(contenuPanier);
        for (i = 0; i < contenuPanier.length; i--){
            itemTeddy = teddies.find(teddies => teddies["_id"] == contenuPanier[i].idTeddy); // ERREUR CONSOLE
            localStorage.removeItem(itemTeddy);
        }
        
        //localStorage.removeItem(itemTeddy[i]);
        //let panier = document.getElementById("contenu-panier"); 
        //while (panier.firstChild){
            //panier.removeChild(panier.firstChild)
        //}
    })

}


/* END Création du panier */ 


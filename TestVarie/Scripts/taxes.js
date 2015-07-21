
//Abonnement à l'événement load de la page.
document.addEventListener("DOMContentLoaded", load_page);


function get(id) {
    return document.getElementById(id);
}



function entrer_montant() {
    //modifier le DOM
    get("montant").style.backgroundColor = "pink";
    get("montant").select();
}

function sortir_montant() {
    get("montant").style.backgroundColor = "";
}

//appelé lorsque la page est chargée!
function load_page() {
    //Abonnement à un événement

    document.body.style.backgroundColor = "Blue";
    get("calculer").onclick = calcul;
    get("montant").onfocus = entrer_montant;
    get("montant").onblur = sortir_montant;
    //initialiser un montant par défaut
    get("montant").value = "9.99";
    get("montant").focus();
    get("montant").select();
   
}


function calcul() {
    var montant = parseFloat(get("montant").value);

    if (isNaN(montant)) {
        alert("le montant doit être un nombre.");
    }
    else {

        var tps = montant * 0.05;
        console.log("tps ", tps);
        var tvq = (montant + tps) * 0.095;
        var total = montant + tps + tvq;

        get("taxeFederale").value = tps.toFixed(2);
        get("taxeProvince").value = tvq.toFixed(2);
        get("total").value = total.toFixed(2);
    }
}
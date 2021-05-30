//le message disparaissait quand compteur=0 et qu'on rafraichit
window.addEventListener('load', function () {
    if (sessionStorage.getItem('nomstation') != null) {
        let messageVeloReserve = document.getElementById("msg_velo_reserve");
        messageVeloReserve.style.display = "block";
        messageVeloReserve.innerHTML = localStorage.getItem("nom") + " " + localStorage.getItem("prenom") + " " + "Vous avez réservé un vélo à la station: " + sessionStorage.getItem("nomstation");

    }
})

var sliderobjet = new Slider();
sliderobjet.play();
sliderobjet.interval = setInterval(function () { sliderobjet.suivante() }, 5000);

//Evenements boutons
document.getElementById("diaposuivante").addEventListener("click", function () {
    sliderobjet.suivante();
    sliderobjet.pause();
});
document.getElementById("diapoprécédente").addEventListener("click", function () {
    sliderobjet.precedente();
    sliderobjet.pause();
});

document.getElementById("pause").addEventListener("click", function () {
    sliderobjet.pause();
});

document.getElementById("play").addEventListener("click", function () {
    sliderobjet.play();
    sliderobjet.interval = setInterval(function () { sliderobjet.suivante() }, 5000);
});

//Evenements clavier
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 37) {
        sliderobjet.precedente();
        sliderobjet.pause();
    }
    else if (e.keyCode === 39) {
        sliderobjet.suivante();
        sliderobjet.pause();
    }
});

var obj = new CanvasObjet();
obj.evenements();

var carte = new Map();
carte.afficheMarqueur();

let compteurobjet = new Compteur();

document.getElementById("signer").addEventListener("click", function (e) {
    document.getElementById("myPics").style.display = "block";
    e.preventDefault();

    // Afficher le canva si on a bien inscrit des valeurs dans les champs
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;//recup le contenu de input
    let nomStation = document.getElementById("name").textContent;//recup le contenu du span
    console.log(nomStation);
    localStorage.setItem("nom", nom);
    localStorage.setItem("prenom", prenom);
    sessionStorage.setItem("nomstation", nomStation);


    if (nom !== "" && prenom !== "") {
        document.getElementById("myPics").style.display = "block";
        document.getElementById("bt-clear").style.display = "block";

    } else {
        window.alert("Veuillez entrer votre prénom et/ou nom");
        document.getElementById("myPics").style.display = "none";
        document.getElementById("bt-clear").style.display = "none";
    }
});

document.getElementById("btn_confirmer").addEventListener("click", () => {
    document.getElementById('btn_confirmer').style.display = "none";
    document.getElementById('myPics').style.display = "none";


    let d = new Date();
    let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    //console.log(hours);
    let heureDebutReservation = sessionStorage.getItem('debutReservation');
    sessionStorage.setItem('heureDebutReservation', hours);

    compteurobjet.lancerCompteur();

    let messageVeloReserve = document.getElementById("msg_velo_reserve");
    messageVeloReserve.style.display = "block";
    messageVeloReserve.innerHTML = localStorage.getItem("nom") + " " + localStorage.getItem("prenom") + " " + "Vous avez réservé un vélo à la station: " + sessionStorage.getItem("nomstation");
});




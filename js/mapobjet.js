class Map {
    constructor() { //Paramètres du canvas
        this.map = L.map('mapid').setView([43.6044622, 1.4442469], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoic2NydCIsImEiOiJja2c3MHR5NGcwMnNzMnduNHBqMzdodXpsIn0.jU25EP-p-sXfxMZSqMhHAg'//token mapbox.com
        }).addTo(this.map);

    }

    afficheMarqueur() {
        //fetch = chemin de la ressource qu'on souhaite récupérer
        fetch('https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=7cac7a43f504aceb28611cd25c6626c4075645eb')
            //fetch() retourne ensuite une promesse contenant la réponse
            //On ne peut pas exploiter la réponse renvoyée dans cette promesse en l’état : il faut indiquer le format de réponse souhaité. Ici, on choisit JSON avec response.json().
            .then(response => response.json())
            .then(data => {
                console.log(data);

                for (let i = 0; i < data.length; i++) { //Parcourir & afficher le tableau d'objet

                    let station = new Station(data[i]);// le tableau d'objet devient un objet stocké dans station

                    var marker = L.marker([station.lat, station.lng]).addTo(this.map);//a chaque fois qu'on parcours une station on créer un marqueur
                    marker.addEventListener('click', function () {


                        var url = "https://api.jcdecaux.com/vls/v3/stations/" + station.number + "?contract=toulouse&apiKey=7cac7a43f504aceb28611cd25c6626c4075645eb";

                        //utiliser fetch avec la variable url
                        //afficher dans le cadre les informations recues

                        fetch(url)//va interroger cette url
                            .then(response => response.json())//retourne la reponse au format voulu
                            .then(unestation => {//données qu'on souhaite afficher
                                console.log(unestation);
                                document.querySelector("#form").style.display = "block";
                                document.querySelector("#name").textContent = unestation.name;//ajouter dans le html une valeur a "nom"
                                document.querySelector("#address_value").textContent = unestation.address;//ajouter adresse
                                document.querySelector("#bike_value").textContent = unestation.mainStands.availabilities.bikes;//nb velo disponible
                                document.querySelector("#statut_value").textContent = unestation.status;//status

                                // let nomStation = document.getElementById("name_value").value;
                                // sessionStorage.setItem("nomStation", unestation.name);

                                let adresse = document.getElementById("address_station").value;
                                sessionStorage.setItem("adresse", unestation.address);

                                let nombreDeVeloDisponible = document.getElementById("available_bikes").value;
                                sessionStorage.setItem("nombreDeVeloDisponible", unestation.mainStands.availabilities.bikes);

                                let statut = document.getElementById("statut_value").value;
                                sessionStorage.setItem("statut", unestation.status);


                                //Dans le cas où il n'y a pas de vélo dispo
                                if (unestation.mainStands.availabilities.bikes == 0) {
                                    //message: il 'y a pas de velo dispo
                                    //masquer formulaire + bouton
                                    document.querySelector("#form").style.display = "none";
                                    // document.getElementsByClassName("message_velo").textContent = "il n'y a pas de vélo dispo";
                                } else {
                                    //la station n'est pas vide donc afficher form + boutons
                                    document.querySelector("#form").style.display = "block";
                                }



                            })
                    });



                }
            })
    }
}
// https://api.jcdecaux.com/vls/v3/stations/55?contract=toulouse&apiKey=7cac7a43f504aceb28611cd25c6626c4075645eb

//on ne peut pas réserver dans une station vide


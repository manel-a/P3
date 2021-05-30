class Compteur {
    constructor() {
        this.el = document.getElementById('espacecompteur');
        this.compteur = null;
        this.time = sessionStorage.getItem("time");
        if (this.time == undefined) {
            this.time = this.debut * 60;
        } else {
            this.decompte();
        }

    }


    decompte() {
        //recuperer min
        let minutes = Math.floor(this.time / 60);
        let seconds = this.time % 60;
        this.time--;



        this.el.innerText = minutes + ":" + seconds;
        sessionStorage.setItem("time", this.time);
        sessionStorage.setItem("minutes", minutes);//creation avec setitem de minutes/seconds dans l'espace de stockage
        sessionStorage.setItem("seconds", seconds);

        if (this.compteur == null) {
            this.compteur = setInterval(this.decompte.bind(this), 1000);
        }

        if ((minutes == 0) && (seconds == 0)) {
            clearInterval(this.compteur);
            //remplacer message footer : temps de réservation écoulé
            let nouveauMsg = document.getElementById("msg_velo_reserve");
            nouveauMsg.innerHTML = 'Le temps de la réservation a écoulé';
            this.compteur = null;
            return;//dans une fonction, il retourne la valeur "rien", mais ca fait arrêter la fonction
        }

    }

    lancerCompteur() {
        this.debut = 20;
        this.time = this.debut * 60;
        this.decompte();
    }
}



// reinitialiserCompteur() {
//     let elementCompteur = document.getElementById('espacecompteur');
//     let minutes = sessionStorage.getItem("minutes");//récupérer la valeur de minutes/seconds
//     let secondes = sessionStorage.getItem("seconds");
//     let tempsDepart = Number(minutes) * 60 + Number(secondes);//convertir variables en nombre et *60 pour obtenir secondes
//     tempsDepart--;

//     // console.log("decompteNouveauComp " + tempsDepart);
//     //obligatoire pour faire un décompte
//     let minute = Math.floor(tempsDepart / 60);
//     let seconde = tempsDepart % 60;
//     sessionStorage.setItem("minutes", minute);//intégrer les valeurs au stockage
//     sessionStorage.setItem("seconds", seconde);
//     elementCompteur.innerHTML = `${minute} : ${seconde}`;


// }


// function annuler() {
//     console.log("Annulation de la réservation");
//     sessionStorage.clear();
// }




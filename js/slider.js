class Slider {
    constructor() {
        this.images = document.getElementsByClassName('imgslider');
        this.currentIndex = 0;//Commencer toujours à 0
    }

    play() {

        document.getElementById("play").style.display = "none";
        document.getElementById("pause").style.display = "block";

    }

    pause() {
        clearInterval(this.interval);
        document.getElementById("play").style.display = "block";
        document.getElementById("pause").style.display = "none";

    }

    //la méthode suivante est utilisé lorsqu'on passe à la diapositive suivante avec touche manuelle ou touches clavier
    suivante() {
        this.images[this.currentIndex].style.display = 'none';
        if (this.currentIndex < this.images.length - 1) {//signifier la longueur total du tableau
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.images[this.currentIndex].style.display = 'block';//affiche moi la position currentIndex = 0

    }

    precedente() {
        this.images[this.currentIndex].style.display = 'none';
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.images.length - 1;
        }
        this.images[this.currentIndex].style.display = 'block';

    }








}


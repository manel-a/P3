class CanvasObjet {
    constructor() { //Paramètres du canvas
        this.canvas = document.getElementById("myPics");
        this.ctx = this.canvas.getContext('2d');
        this.draw = false;
        this.mousePosition = { x: 0, y: 0 };//obtenir coordonnées de la sourie
        this.lastPosition = this.mousePosition;// ancienne position de la sourie
        this.canvas.width = 250;
        this.canvas.height = 130;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;
        this.clearButton = document.getElementById("bt-clear");
        this.oRect = this.canvas.getBoundingClientRect;//position du canvas par rapport à la page
    }

    evenements() {
        var self = this; //fait référence à l'objet CanvasObject et non à l'élément qui a déclenché l'événement.
        //lier l'évènement à l'objet
        //Souris
        this.canvas.addEventListener("mousedown", function (e) {
            self.draw = true;
            self.lastPosition = self.getMposition(e);//retenir la position du point de départ
        });

        this.canvas.addEventListener("mousemove", function (e) {
            self.mousePosition = self.getMposition(e);//retenir la position quand on dessine 
            self.canvasResult();//obtenir le tracé quand on trace le dessin
            //recuperer position 
            // fonction qui fait le dessing result
        });

        this.canvas.addEventListener("mouseup", function (e) {
            self.draw = false;//ne plus dessiner
        });


        // Touchpad
        this.canvas.addEventListener("touchstart", function (e) {
            self.draw = true;
            self.lastPosition = self.getTposition(e);
            e.preventDefault();
        });

        this.canvas.addEventListener("touchmove", function (e) {
            self.mousePosition = self.getTposition(e);//retenir la position quand on dessine 
            self.canvasResult();//obtenir le tracé quand on trace le dessin
            e.preventDefault();
        });

        this.canvas.addEventListener("touchend", function (e) {
            self.draw = false;//ne plus dessiner
            e.preventDefault();
        });


        //effacer
        this.clearButton.addEventListener("click", function (e) {
            self.clearCanvas();
            e.preventDefault();
        });
    }

    // Renvoie les coordonnées des évenements mouse
    getMposition(mouseEvent) {
        if (this.draw) {
            var oRect = this.canvas.getBoundingClientRect();// recuperer les dernieres coordonnées (facon de recalculer)
            return {
                x: mouseEvent.clientX - oRect.left,//obligatoire pour obtenir le tracé
                y: mouseEvent.clientY - oRect.top
            };
        }
    }

    // Renvoie les coordonnées du pad 
    getTposition(touchEvent) {
        if (this.draw) {
            var oRect = this.canvas.getBoundingClientRect();
            console.log(touchEvent);
            return {
                x: touchEvent.touches[0].clientX - oRect.left,
                y: touchEvent.touches[0].clientY - oRect.top
            };
        }
    }


    canvasResult() {
        if (this.draw) {//qu'on dessine ou non,
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);//point de départ du tracé
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);//point d'arriver du tracé
            this.ctx.stroke();//appliquer le coup de crayon
            this.lastPosition = this.mousePosition;//point de départ+ point d"arriver

            //Si on dessine, le bouton apparaît
            if (this.draw == true) {
                document.getElementById("btn_confirmer").style.display = "block";
            }
        }
    }


    clearCanvas() {
        this.canvas.height = 130;//etat de this.draw = false quand this.canvas.height = 130
        this.ctx.lineWidth = 3;


    }


}






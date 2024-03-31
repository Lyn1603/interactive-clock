import Scene from "../canvas2d/Scene";
import { RotatingArc } from "../canvas2d/shapes/arc";
import { deg2rad } from "../utils/MathUtils";

export default class Scenario extends Scene {
    constructor(id = "canvas") {
        super(id);

        // Je vais construire mon horloge avec son rayon afin de determiner la position des aiguilles par rapport à son centre.
        this.clockRadius = Math.min(this.width, this.height) * 0.4

        // Pour la création des aiguilles, il suffit de dessiner une nouvelle horloge dans laquelle je divise la largeur et la hauteur de mon cercle par 2 pour positionner ces dernières au centre
        this.hourHand = new RotatingArc(this.width / 2, this.height / 2, this.clockRadius * 0.5, 0, 0);
        this.minuteHand = new RotatingArc(this.width / 2, this.height / 2, this.clockRadius * 0.8, 0, 0);
        this.secondHand = new RotatingArc(this.width / 2, this.height / 2, this.clockRadius * 0.9, 0, 0);

        // Je mets à jour l'horloge toutes les secondes
        this.UpdateClock();

        // Je récupère l'évenement du mouvenment de ma souris sur le canvas
        this.canvas.addEventListener("mousemove", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Je mets à jour les angles des aiguilles en fonction de la position de la souris
            this.updateHandAngles(mouseX, mouseY);
        });
    }

    ////////// METHODE POUR METTRE A JOUR L'HEURE DE MON HORLOGE  ////////////

    UpdateClock() {
        // Je mets à jour l'horloge toutes les secondes
        setInterval(() => {
            const now = new Date();
            const hours = now.getHours() % 12; // Format 12 heures
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            const hourAngle = ((hours * 30 /* convertis les heures en degrés */) * (Math.PI / 180 /* convertis les degrés de l'horloge en radiant */)); // calcul : 360 degrés divisé par 12 heures ( 1heure = 30 degrés )
            const minuteAngle = ((minutes * 6) * (Math.PI / 180)); // calcul :  360 degrés divisé par 60 minutes ( 1 minute = 60 degrés )
            const secondAngle = (seconds * 6) * (Math.PI / 180); // calcul : 360 degrés divisé par 60 secondes ( 1 seconde = 60 degrés )

            this.hourHand.endAngle = hourAngle; // j'affiche la position de l'aiguille des heures
            this.minuteHand.endAngle = minuteAngle; // j'affiche la position de l'aiguille des minutes
            this.secondHand.endAngle = secondAngle; // j'affiche la position de l'aiguille des secondes

            this.draw(); // Je redessine l'horloge quand l'aiguille et mis à jour l'horloge après chaque mise à jour
        }, 1000);
    }


    //////////// METHODE POUR DESSINER MA SCENE  ////////////

    draw() {
        super.draw();

        // Je dessine l'horloge
        this.drawClockFace();

        // Je dessine les aiguilles de l'horloge
        this.drawHand(this.hourHand, 6);
        this.drawHand(this.minuteHand, 4);
        this.drawHand(this.secondHand, 2);
    }


    //////////// METHODE POUR DESSINER L'HORLOGE ////////////

    drawClockFace() {
        // Je dessine le cadran de l'horloge
        this.context.beginPath();
        this.context.arc(this.width / 2, this.height / 2, this.clockRadius, 0, 2 * Math.PI);
        this.context.strokeStyle = "white";
        this.context.lineWidth = 4;
        this.context.stroke();

        // Je dessine les marqueurs des heures minutes et secondes
        for (let i = 1; i <= 12; i++) {
            const angle = ((i - 3) % 12) * (Math.PI / 6); // Angle correspondant à chaque marqueur d'heure
            const pointSize = 4; // Taille du point
            const x = this.width / 2 + Math.cos(angle) * (this.clockRadius - 40);
            const y = this.height / 2 + Math.sin(angle) * (this.clockRadius - 40);
            this.context.font = "24px Arial";
            this.context.fillStyle = "white";
            this.context.textAlign = "center";
            this.context.textBaseline = "middle";
            this.context.beginPath();
            this.context.arc(x, y, pointSize, 0, Math.PI * 2, true); // Dessine un cercle
            this.context.fill();        }

    }

    //////////// METHODE POUR DESSINER LES AIGUILLES ////////////

    drawHand(hand, lineWidth) {
        // Je dessine une aiguille de l'horloge
        this.context.beginPath();
        this.context.moveTo(hand.x, hand.y);
        this.context.lineTo(hand.x + Math.cos(hand.endAngle) * hand.radius, hand.y + Math.sin(hand.endAngle) * hand.radius);
        this.context.strokeStyle = "white";
        this.context.lineWidth = lineWidth;
        this.context.stroke();
    }


    //////////// METHODE METTRE A JOUR LES AIGUILLES AU SURVOL DE MON CANVAS  ////////////

    updateHandAngles(mouseX, mouseY) {
        // Je calcule l'angle entre le centre du canvas et la position de la souris
        const dx = mouseX - (this.width / 2); // je récupère dx par rapport au centre de l'horloge
        const dy = mouseY - (this.height / 2);// je récupère dy par rapport au centre de l'horloge
        let angle = Math.atan2(dy, dx) * 180 / Math.PI; // j'obtiens mes deux coordonnées en radiants puis les convertis en degrés

        // Je mets à jour l'angle de l'aiguille des secondes avec dx et dy en paramètre
        this.secondHand.endAngle = deg2rad(angle);

        // Je redessine l'horloge avec les nouvelles positions des aiguilles
        this.draw();
    }
}

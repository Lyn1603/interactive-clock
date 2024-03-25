import GlobalContext from "../GlobalContext";
import DomElement from "../utils/DomElement";

export default class Scene {
    constructor(id = "canvas-scene") {
        this.globalContext = new GlobalContext()
        this.globalContext.pushScene(this)
        this.id = id

        // debug
        this.params = {
            'is-update': true
        }
        this.debug = this.globalContext.debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(this.id)
            this.debugFolder.add(this.params, 'is-update')
        }

        // canvas
        this.domElement = new DomElement(this.id)
        this.canvas = this.domElement.instance
        this.canvas.width = this.domElement.width
        this.canvas.height = this.domElement.height
        this.context = this.canvas.getContext('2d')
    }

    get width() { return this.domElement.width }
    get height() { return this.domElement.height }

    drawHand(hand, lineWidth) {

        // Dessiner une aiguille de l'horloge
        this.context.beginPath();
        this.context.moveTo(hand.x, hand.y);
        this.context.lineTo(hand.x + Math.cos(hand.endAngle) * hand.radius, hand.y + Math.sin(hand.endAngle) * hand.radius);
        this.context.strokeStyle = "black";
        this.context.lineWidth = lineWidth;
        this.context.stroke();
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height); // Effacer le canvas

        // Dessiner le cadran de l'horloge
        this.drawClockFace();

        // Dessiner les aiguilles de l'horloge
        this.drawHand(this.hourHand, 6);
        this.drawHand(this.minuteHand, 4);
        this.drawHand(this.secondHand, 2);
    }



    update() {
        return this.params['is-update']
    }




    destroy() {}
}
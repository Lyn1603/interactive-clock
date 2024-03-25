import GlobalContext from "../../GlobalContext"
import { randomRange } from "../../utils/MathUtils"

export class RotatingArc {
    constructor(x, y, radius, startAngle, endAngle) {
        this.x = x // centre arc X
        this.y = y // centre arc Y
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle

        this.vAngular = randomRange(-5, 5)
    }

    update(deltaTime = 16, speed = 1) {
        this.startAngle += this.vAngular * deltaTime * speed
        this.endAngle += this.vAngular * deltaTime * speed
    }

    draw(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
        context.stroke()
        context.closePath()
    }
}
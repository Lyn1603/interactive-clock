import Debug from "./utils/Debug"
import Time from "./utils/Time"

let instance = null

export default class GlobalContext {
    constructor() {
        if (!!instance) return instance
        instance = this

        // debug
        this.debug = new Debug()

        // time
        this.time = new Time()
        this.time.on('update', () => { this.update() })

        // scenes
        this.scenes = []
    }

    pushScene(scene) {
        this.scenes.push(scene)
    }

    update() {
        console.log("context update")

        this.scenes.forEach(s => {
            s.update()
        })
    }

    destroy() {
        this.time.off('update')
        this.debug.destroy()
        this.scenes.forEach(s => { s.destroy() })
    }
}
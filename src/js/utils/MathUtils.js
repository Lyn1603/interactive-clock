export const deg2rad = (deg) => {
    return deg * Math.PI / 180
}

export const distance2D = (x1, y1, x2, y2) => {
    const dx_ = x2 - x1
    const dy_ = y2 - y1
    return Math.sqrt(dx_ * dx_ + dy_ * dy_) // Pythagore
}

export const randomRange = (min, max) => {
    return min + (max - min) * Math.random()
}
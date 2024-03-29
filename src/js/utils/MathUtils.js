export const deg2rad = (deg) => {
    return deg * Math.PI / 180
}



export const randomRange = (min, max) => {
    return min + (max - min) * Math.random()
}
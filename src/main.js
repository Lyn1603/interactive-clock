import Scene from "./js/canvas2d/Scene";
import Clock from "./js/scenario/Scenario";

const scene = new Clock()
console.log(scene)


const scene2 = new Scene("canvas")
console.log(scene2)

// animation

const canvas = document.getElementById('canvas');


canvas.addEventListener('mouseover', function() {
    document.getElementById('background').style.opacity = 1; // Fait apparaître progressivement le fond d'écran
    playMusic()
});

canvas.addEventListener('mouseout', function() {
    document.getElementById('background').style.opacity = 0; // Fait disparaître progressivement le fond d'écran
    stopMusic()
});

// Fonction pour jouer la musique
function playMusic() {
    const audio = document.getElementById('audio');
    audio.play();
}

// Fonction pour arrêter la musique
function stopMusic() {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0; // Rembobine la musique au début
}

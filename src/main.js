import Scene from "./js/canvas2d/Scene";
import Clock from "./js/scenario/Scenario";

const scene = new Clock()
console.log(scene)


const scene2 = new Scene("canvas")
console.log(scene2)

// animation

const canvas = document.getElementById('canvas');
const audio = document.getElementById('audio');


canvas.addEventListener('mouseover', function() {
    document.getElementById('background').style.opacity = 1; // Fait apparaître progressivement le fond d'écran
    audio.volume = 0.2;
    playMusic()
});

canvas.addEventListener('mouseout', function() {
    document.getElementById('background').style.opacity = 0; // Fait disparaître progressivement le fond d'écran
    stopMusic()
});


// Fonction pour jouer la musique aléatoirement
function playMusic() {
    const randomMusic = Math.floor(Math.random() * 3);

    const audio = document.getElementById('audio');

    if (audio) {

        document.querySelectorAll('audio').forEach(a => {
            if (a !== audio) {
                a.pause();
            }
        });

        audio.src = audio.children[randomMusic].src;

        audio.play();

        switch (randomMusic) {
            case 0:
                document.getElementById('background').style.backgroundImage = "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzJtempmZXgxamc2bXFlb2hxaWxxamF5MXVuejF5NnN1OGJ1N3RjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hrrcWb7OpDoxhgR4xB/giphy.gif')";
                break;
            case 1:
                document.getElementById('background').style.backgroundImage = "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjY3Y3k2eXJvZWsxemd1NXoxaGVpaDJrZ3o5MzlicnV2ZTI5Y2dscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/exfSTanP4prYQ/giphy.gif')";
                break;
            case 2:
                document.getElementById('background').style.backgroundImage = "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODR0emo3Ymgzb3prODltNzU2dDQzbHNzZzRhNmF3aDhqNnRvYzk5YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pJmnk86fXFNmrUb8LB/giphy.gif')";
                break;
            default:
                document.getElementById('background').style.backgroundColor = "white";
        }

    }

}

// Fonction pour arrêter la musique
function stopMusic() {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0; // Rembobine la musique au début
}



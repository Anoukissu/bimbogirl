let countdownElement = document.getElementById('countdown');
let videoContainer = document.getElementById('videoContainer');
let videoElement = document.getElementById('video');
let clickCount = 0; // Compteur de clics
const messages = ["Raté !", "Essaye encore !", "Pardon lol ..."]; // Messages à afficher



function moveButton() {
    clickCount++; // Incrémente le compteur de clics

    // Change le texte du bouton si le compteur est inférieur à 3
    if (clickCount < 4) {
        document.getElementById('startButton').children[0].innerText = messages[clickCount - 1];
    }

    // Si le compteur atteint 3, lance le compte à rebours
    if (clickCount === 4) {
        startCountdown(); // Démarre le compte à rebours
    } else {
        // Déplace le bouton à une nouvelle position aléatoire
        const button = document.getElementById('startButton');
        const container = document.getElementById('container');

        // Récupérer la taille du conteneur et du bouton
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const buttonWidth = button.clientWidth;
        const buttonHeight = button.clientHeight;

        // Calculer des coordonnées aléatoires
        const randomX = Math.random() * (containerWidth - buttonWidth);
        const randomY = Math.random() * (containerHeight - buttonHeight);

        // Appliquer les nouvelles coordonnées
        button.style.position = 'absolute';
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
    }
}

function startCountdown() {
    // Change le fond
    document.getElementById('container').style.backgroundImage = "url('fond2.png')";
    
    // Cache le bouton et montre le compte à rebours
    document.getElementById('startButton').style.display = 'none';
    countdownElement.style.display = 'block';

    // Compte à rebours
    let seconds = 10;
    countdownElement.innerHTML = seconds;

    let countdownInterval = setInterval(function() {
        // Ajoute l'effet de zoom
        countdownElement.classList.add('zoom');

        seconds--;
        countdownElement.innerHTML = seconds;

        // Retire l'effet de zoom après un court instant
        setTimeout(() => {
            countdownElement.classList.remove('zoom');
        }, 100); // Retire le zoom après 100ms

        if (seconds <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "0 !!!"; // Affiche "0 !!!"
            launchConfetti(); // Appelle la fonction de confettis

            // Utiliser un délai pour montrer les confettis avant d'ouvrir la vidéo
            setTimeout(() => {
                showVideo(); // Ouvre la vidéo
            }, 2000); // Délai de 2 secondes pour laisser le temps aux confettis d'apparaître
        }
    }, 1000);
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block'; // Affiche le canvas

    const particles = [];
    const colors = ['#FF0B0B', '#FF7F0B', '#FFD60B', '#5BFF0B', '#0BFF7F', '#0B8FFF', '#0B2FFF', '#8B0BFF', '#FF0B8B'];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 4 + 1,
            direction: Math.random() * 2 * Math.PI,
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += Math.cos(p.direction) * p.speed;
            p.y += Math.sin(p.direction) * p.speed;

            // Réinitialise les particules qui sortent de l'écran
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

function showVideo() {
    // Montre la vidéo en plein écran sur le site
    videoContainer.style.display = 'block';
    videoElement.src = "https://www.youtube.com/embed/Lm9kZQdBnUg?autoplay=1&controls=0&showinfo=0&rel=0";
}








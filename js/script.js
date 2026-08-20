document.addEventListener('DOMContentLoaded', () => {

    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });

    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    });

    /* Typewriter */
    const typewriter = document.getElementById('typewriter');
    const quotes = [
        '"Dia dia dia telah mencuri hatiku..."',
        '"45 Hari KKN yang takkan pernah terlupakan."',
        '"Cristine & Daniel: Cerita Indah Pengabdian."'
    ];
    let qIdx = 0, cIdx = 0, isDeleting = false;

    function type() {
        const current = quotes[qIdx];
        typewriter.textContent = isDeleting ? current.substring(0, cIdx - 1) : current.substring(0, cIdx + 1);
        cIdx += isDeleting ? -1 : 1;

        let speed = isDeleting ? 40 : 80;
        if (!isDeleting && cIdx === current.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && cIdx === 0) { isDeleting = false; qIdx = (qIdx + 1) % quotes.length; speed = 400; }
        setTimeout(type, speed);
    }
    if (typewriter) type();

    /* Timer 45 Hari */
    let secondsTotal = 45 * 24 * 3600;
    setInterval(() => {
        secondsTotal++;
        const d = Math.floor(secondsTotal / 86400);
        const h = Math.floor((secondsTotal % 86400) / 3600);
        const m = Math.floor((secondsTotal % 3600) / 60);
        const s = Math.floor(secondsTotal % 60);
        document.getElementById('days').textContent = d < 10 ? '0' + d : d;
        document.getElementById('hours').textContent = h < 10 ? '0' + h : h;
        document.getElementById('minutes').textContent = m < 10 ? '0' + m : m;
        document.getElementById('seconds').textContent = s < 10 ? '0' + s : s;
    }, 1000);

    /* Music Player & Equalizer */
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const equalizer = document.getElementById('equalizer');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-play"></i>';
                equalizer.classList.add('paused');
                showToast("Musik Dihentikan");
            } else {
                bgMusic.play().then(() => {
                    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    equalizer.classList.remove('paused');
                    showToast("🎵 Dia Dia Dia - Telah Mencuri Hatiku");
                }).catch(() => showToast("Klik layar sekali lagi untuk musik"));
            }
            isPlaying = !isPlaying;
        });
    }

    /* Interactive Surprise Box */
    const surpriseCard = document.getElementById('surpriseCard');
    const surpriseText = document.getElementById('surpriseText');
    const surprises = [
        "❤️ Senyuman Cristine di sela-sela projo desa bikin Daniel makin semangat!",
        "✨ Perhatian-perhatian kecil saat lelah KKN yang bikin hati meleleh.",
        "🌹 Dari sekadar kawan posko, jadi tempat bersandar paling nyaman."
    ];
    if (surpriseCard) {
        surpriseCard.addEventListener('click', () => {
            const rand = surprises[Math.floor(Math.random() * surprises.length)];
            surpriseText.innerHTML = `<strong>${rand}</strong>`;
            createTouchBurst(window.innerWidth / 2, window.innerHeight / 2);
        });
    }

    /* Touch Burst Effect Anywhere on Screen */
    window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        createTouchBurst(touch.clientX, touch.clientY);
    });

    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }
    }

    /* Modal */
    const secretModal = document.getElementById('secretModal');
    document.getElementById('openSecretModal').addEventListener('click', () => secretModal.classList.add('active'));
    document.getElementById('closeSecretModal').addEventListener('click', () => secretModal.classList.remove('active'));

    /* Canvas Particles */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        resize(); window.addEventListener('resize', resize);

        let parts = [];
        class Part {
            constructor(x, y) {
                this.x = x || Math.random() * canvas.width;
                this.y = y || canvas.height + 10;
                this.size = Math.random() * 10 + 5;
                this.speedY = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.color = `rgba(255, 51, 102, ${Math.random() * 0.7 + 0.3})`;
            }
            update() { this.y -= this.speedY; this.x += this.speedX; }
            draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size/2, 0, Math.PI*2); ctx.fill(); }
        }

        function createTouchBurst(x, y) {
            for(let i=0; i<15; i++) parts.push(new Part(x, y));
        }

        function loop() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            parts.forEach((p, i) => {
                p.update(); p.draw();
                if (p.y < -10) parts.splice(i, 1);
            });
            requestAnimationFrame(loop);
        }
        loop();
    }
});

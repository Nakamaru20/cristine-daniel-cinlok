document.addEventListener('DOMContentLoaded', () => {

    /* 1. Preloader & AOS Initialization */
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    });

    /* 2. Sticky Navbar */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* 3. Typewriter Effect */
    const typewriter = document.getElementById('typewriter');
    const quotes = [
        '"Dia dia dia telah mencuri hatiku..."',
        '"45 Hari KKN yang takkan pernah terlupakan."',
        '"Cristine & Daniel: Cerita Indah Pengabdian."'
    ];
    let qIdx = 0, cIdx = 0, isDeleting = false;

    function type() {
        if (!typewriter) return;
        const current = quotes[qIdx];
        typewriter.textContent = isDeleting ? current.substring(0, cIdx - 1) : current.substring(0, cIdx + 1);
        cIdx += isDeleting ? -1 : 1;

        let speed = isDeleting ? 40 : 80;
        if (!isDeleting && cIdx === current.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && cIdx === 0) {
            isDeleting = false;
            qIdx = (qIdx + 1) % quotes.length;
            speed = 400;
        }
        setTimeout(type, speed);
    }
    type();

    /* 4. Timer 45 Hari KKN */
    let secondsTotal = 45 * 24 * 3600;
    setInterval(() => {
        secondsTotal++;
        const d = Math.floor(secondsTotal / 86400);
        const h = Math.floor((secondsTotal % 86400) / 3600);
        const m = Math.floor((secondsTotal % 3600) / 60);
        const s = Math.floor(secondsTotal % 60);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = d < 10 ? '0' + d : d;
        if (hoursEl) hoursEl.textContent = h < 10 ? '0' + h : h;
        if (minutesEl) minutesEl.textContent = m < 10 ? '0' + m : m;
        if (secondsEl) secondsEl.textContent = s < 10 ? '0' + s : s;
    }, 1000);

    /* 5. Music Player & Equalizer Logic */
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const equalizer = document.getElementById('equalizer');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-play"></i>';
                if (equalizer) equalizer.classList.add('paused');
                showToast("Musik Dihentikan");
            } else {
                bgMusic.play().then(() => {
                    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    if (equalizer) equalizer.classList.remove('paused');
                    showToast("🎵 Dia Dia Dia - Fatin Shidqia");
                }).catch(() => {
                    showToast("Klik layar untuk mengizinkan musik diputar");
                });
            }
            isPlaying = !isPlaying;
        });
    }

    /* 6. Mode Glow / Theme Toggle */
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-glow');
            const isDark = document.body.classList.contains('dark-glow');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            showToast(isDark ? "Mode Night Glow Aktif ✨" : "Mode Terang Aktif ☀️");
        });
    }

    /* 7. Toast Utility Function */
    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }
    }

    /* 8. Hero Interactive Buttons */
    const btnHeartBurst = document.getElementById('btnHeartBurst');
    if (btnHeartBurst) {
        btnHeartBurst.addEventListener('click', () => {
            createTouchBurst(window.innerWidth / 2, window.innerHeight / 2);
            showToast("Hujan Hati Untuk Cristine & Daniel! ❤️");
        });
    }

    const btnFireworks = document.getElementById('btnFireworks');
    if (btnFireworks) {
        btnFireworks.addEventListener('click', () => {
            createTouchBurst(window.innerWidth / 2, window.innerHeight / 3, 'firework');
            showToast("Kembang Api Cinta Menyala! 🎆");
        });
    }

    const btnLoveQuote = document.getElementById('btnLoveQuote');
    const loveQuotesList = [
        "Dia dia dia... telah mencuri hatiku sejak di KKN!",
        "45 hari bersama warga, selamanya bersama kamu.",
        "Setiap detik pengabdian desa terasa manis karena kehadiranmu.",
        "Cristine Natasia & Hot Daniel: Pasangan terbaik KKN!"
    ];
    if (btnLoveQuote) {
        btnLoveQuote.addEventListener('click', () => {
            const randomQuote = loveQuotesList[Math.floor(Math.random() * loveQuotesList.length)];
            showToast(randomQuote);
        });
    }

    /* 9. Interactive Surprise Box */
    const surpriseCard = document.getElementById('surpriseCard');
    const surpriseText = document.getElementById('surpriseText');
    const surprises = [
        "❤️ Senyuman Cristine di sela-sela projo desa bikin Daniel makin semangat!",
        "✨ Perhatian-perhatian kecil saat lelah KKN yang bikin hati meleleh.",
        "🌹 Dari sekadar rekan posko, jadi tempat bersandar paling nyaman."
    ];
    if (surpriseCard && surpriseText) {
        surpriseCard.addEventListener('click', () => {
            const rand = surprises[Math.floor(Math.random() * surprises.length)];
            surpriseText.innerHTML = `<strong>${rand}</strong>`;
            createTouchBurst(window.innerWidth / 2, window.innerHeight / 2);
        });
    }

    /* 10. Gallery Filter */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* 11. Modal Control */
    const secretModal = document.getElementById('secretModal');
    const openModalBtn = document.getElementById('openSecretModal');
    const closeModalBtn = document.getElementById('closeSecretModal');

    if (openModalBtn && secretModal) {
        openModalBtn.addEventListener('click', () => secretModal.classList.add('active'));
    }
    if (closeModalBtn && secretModal) {
        closeModalBtn.addEventListener('click', () => secretModal.classList.remove('active'));
    }
    window.addEventListener('click', (e) => {
        if (e.target === secretModal) secretModal.classList.remove('active');
    });

    /* 12. Screen Touch/Click Burst Effect */
    window.addEventListener('click', (e) => {
        if (!e.target.closest('button') && !e.target.closest('a')) {
            createTouchBurst(e.clientX, e.clientY);
        }
    });

    /* 13. Canvas Particles Engine */
    const canvas = document.getElementById('particles-canvas');
    let parts = [];

    function createTouchBurst(x, y, type = 'heart') {
        for (let i = 0; i < 18; i++) {
            parts.push(new Part(x, y, type));
        }
    }

    if (canvas) {
        const ctx = canvas.getContext('2d');
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Part {
            constructor(x, y, type = 'heart') {
                this.x = x || Math.random() * canvas.width;
                this.y = y || canvas.height + 10;
                this.size = Math.random() * 10 + 4;
                this.speedY = Math.random() * 2.5 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.color = type === 'firework'
                    ? `hsl(${Math.random() * 360}, 100%, 65%)`
                    : `rgba(255, 51, 102, ${Math.random() * 0.7 + 0.3})`;
            }
            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        setInterval(() => {
            if (parts.length < 30) {
                parts.push(new Part());
            }
        }, 300);

        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            parts.forEach((p, i) => {
                p.update();
                p.draw();
                if (p.y < -10) parts.splice(i, 1);
            });
            requestAnimationFrame(loop);
        }
        loop();
    }
});

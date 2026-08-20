document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PRELOADER & AOS ANIMATION INITIALIZATION
       ========================================================================== */
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 800, 
            once: true,
            easing: 'ease-out-cubic'
        });
    }

    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    });

    /* ==========================================================================
       2. STICKY NAVBAR ON SCROLL
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    /* ==========================================================================
       3. TYPEWRITER EFFECT
       ========================================================================== */
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

    /* ==========================================================================
       4. LIVE TIMER 45 HARI KKN (JAM, MENIT, DETIK AKTIF BERJALAN)
       ========================================================================== */
    let totalSeconds = 45 * 86400 + 14 * 3600 + 28 * 60 + 42;
    setInterval(() => {
        totalSeconds++;
        const d = Math.floor(totalSeconds / 86400);
        const h = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = Math.floor(totalSeconds % 60);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = d < 10 ? '0' + d : d;
        if (hoursEl) hoursEl.textContent = h < 10 ? '0' + h : h;
        if (minutesEl) minutesEl.textContent = m < 10 ? '0' + m : m;
        if (secondsEl) secondsEl.textContent = s < 10 ? '0' + s : s;
    }, 1000);

    /* ==========================================================================
       5. PEMUTAR MUSIK "DIA DIA DIA" (PATH FOLDER UTAMA)
       ========================================================================== */
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const bgMusic = document.getElementById('bgMusic');
    const equalizer = document.getElementById('equalizer');
    let isPlaying = false;

    if (bgMusic) {
        bgMusic.load(); // Paksa browser memuat berkas dia-dia-dia.mp3 dari folder utama
    }

    // Solusi Autoplay Browser: Putar lagu saat pengguna pertama kali menyentuh/mengklik layar
    const playMusicFirstTouch = () => {
        if (bgMusic && bgMusic.paused && !isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                if (musicIcon) musicIcon.className = 'fas fa-pause';
                if (equalizer) equalizer.classList.remove('paused');
                showToast("🎵 Dia Dia Dia - Fatin Shidqia");
            }).catch((err) => {
                console.log("Browser memblokir autoplay, menunggu sentuhan tombol manual:", err);
            });
        }
    };

    window.addEventListener('click', playMusicFirstTouch, { once: true });
    window.addEventListener('touchstart', playMusicFirstTouch, { once: true });

    // Tombol Manual Toggle Play/Pause Musik
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (isPlaying) {
                bgMusic.pause();
                if (musicIcon) musicIcon.className = 'fas fa-play';
                if (equalizer) equalizer.classList.add('paused');
                showToast("Musik Dihentikan");
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    if (musicIcon) musicIcon.className = 'fas fa-pause';
                    if (equalizer) equalizer.classList.remove('paused');
                    showToast("🎵 Dia Dia Dia - Fatin Shidqia");
                    isPlaying = true;
                }).catch((err) => {
                    alert("Gagal memutar audio! Pastikan berkas 'dia-dia-dia.mp3' berada di folder utama (sejajar dengan index.html) dan ukurannya tidak 0 KB.");
                });
            }
        });
    }

    /* ==========================================================================
       6. MODE DARK GLOW / LIGHT THEME TOGGLE
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            showToast(isLight ? "Mode Terang Aktif ☀️" : "Mode Night Glow Aktif ✨");
        });
    }

    /* ==========================================================================
       7. TAB SASTRA (PUISI, PANTUN, KATA-KATA)
       ========================================================================== */
    const sastraTabs = document.querySelectorAll('.sastra-tab-btn');
    const sastraContents = document.querySelectorAll('.sastra-content');

    sastraTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sastraTabs.forEach(t => t.classList.remove('active'));
            sastraContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetId = `content-${tab.getAttribute('data-sastra')}`;
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       8. GENERATOR KATA-KATA ROMANTIS RANDOM
       ========================================================================== */
    const loveWordsList = [
        '"45 hari bersamamu di desa mengajarkan bahwa kebahagiaan itu sederhana."',
        '"Dia dia dia... sosok yang tak pernah kusangka akan menjadi tempat bersandar."',
        '"Terima kasih telah mewarnai setiap jam dan menit di sela-sela tugas KKN."',
        '"Cristine Natasia & Hot Daniel: Kisah pengabdian yang berbuah rasa cinta abadi."',
        '"Di antara tumpukan projo dan diskusi posko, hatiku menemukan pelabuhannya."',
        '"Masa KKN mungkin usai, tetapi rasa ini baru saja dimulai."'
    ];

    const btnGenerateNewWord = document.getElementById('btnGenerateNewWord');
    const dynamicWordDisplay = document.getElementById('dynamicWordDisplay');

    if (btnGenerateNewWord && dynamicWordDisplay) {
        btnGenerateNewWord.addEventListener('click', (e) => {
            e.preventDefault();
            const randomIndex = Math.floor(Math.random() * loveWordsList.length);
            dynamicWordDisplay.style.opacity = '0';
            setTimeout(() => {
                dynamicWordDisplay.textContent = loveWordsList[randomIndex];
                dynamicWordDisplay.style.opacity = '1';
            }, 200);
            createTouchBurst(window.innerWidth / 2, window.innerHeight / 2);
        });
    }

    /* ==========================================================================
       9. TOAST UTILITY FUNCTION
       ========================================================================== */
    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }
    }

    /* ==========================================================================
       10. HERO INTERACTIVE BUTTONS
       ========================================================================== */
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
    if (btnLoveQuote) {
        btnLoveQuote.addEventListener('click', () => {
            const random = loveWordsList[Math.floor(Math.random() * loveWordsList.length)];
            showToast(random);
        });
    }

    /* ==========================================================================
       11. INTERACTIVE SURPRISE BOX
       ========================================================================== */
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

    /* ==========================================================================
       12. GALLERY FILTER FUNCTION
       ========================================================================== */
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

    /* ==========================================================================
       13. MODAL CONTROLS
       ========================================================================== */
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

    /* ==========================================================================
       14. SCREEN TOUCH/CLICK PARTICLE BURST
       ========================================================================== */
    window.addEventListener('click', (e) => {
        if (!e.target.closest('button') && !e.target.closest('a') && !e.target.closest('.gallery-item')) {
            createTouchBurst(e.clientX, e.clientY);
        }
    });

    /* ==========================================================================
       15. CANVAS PARTICLES ENGINE
       ========================================================================== */
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
            if (parts.length < 25) {
                parts.push(new Part());
            }
        }, 350);

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

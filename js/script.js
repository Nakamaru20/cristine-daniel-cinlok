/* ==========================================================================
   TABLE OF CONTENTS
   1. Initializations (AOS & Preloader)
   2. Sticky Navigation Bar
   3. Typewriter Effect
   4. Live Love Counter (KKN Timer)
   5. Background Music Player Toggle
   6. Interactive Photo Gallery Filter
   7. Secret Message Modal Logic
   8. Particle Canvas (Floating Hearts Effect)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Initializations (AOS & Preloader)
       -------------------------------------------------------------------------- */
    // Inisialisasi Animate On Scroll
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Preloader - Hilang setelah halaman selesai dimuat
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }
    });

    /* --------------------------------------------------------------------------
       2. Sticky Navigation Bar
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --------------------------------------------------------------------------
       3. Typewriter Effect
       -------------------------------------------------------------------------- */
    const typewriterElement = document.getElementById('typewriter');
    const quotes = [
        '"Dari program kerja desa, bermula kisah kita."',
        '"Menemukanmu adalah hadiah terindah di masa KKN."',
        '"Kisah ini tak berakhir meski pengabdian telah usai."'
    ];

    let quoteIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function handleTypewriter() {
        const currentQuote = quotes[quoteIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentQuote.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentQuote.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentQuote.length) {
            typeSpeed = 2500; // Tahan teks selama 2.5 detik
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            quoteIndex = (quoteIndex + 1) % quotes.length;
            typeSpeed = 500;
        }

        setTimeout(handleTypewriter, typeSpeed);
    }

    if (typewriterElement) {
        handleTypewriter();
    }

    /* --------------------------------------------------------------------------
       4. Live Love Counter (KKN Timer)
       -------------------------------------------------------------------------- */
    // Silakan sesuaikan tanggal pertama kali KKN / jadian (Format: YYYY, MM (0-index), DD)
    // Contoh: 15 Juli 2023 = new Date(2023, 6, 15)
    const kknStartDate = new Date(2023, 6, 15, 0, 0, 0).getTime();

    function updateCounter() {
        const now = new Date().getTime();
        const difference = now - kknStartDate;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days < 10 ? '0' + days : days;
            document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
        }
    }

    setInterval(updateCounter, 1000);
    updateCounter();

    /* --------------------------------------------------------------------------
       5. Background Music Player Toggle
       -------------------------------------------------------------------------- */
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                musicBtn.classList.remove('playing');
            } else {
                bgMusic.play().then(() => {
                    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    musicBtn.classList.add('playing');
                }).catch(err => {
                    console.log("Autoplay ditolak oleh browser:", err);
                });
            }
            isPlaying = !isPlaying;
        });
    }

    /* --------------------------------------------------------------------------
       6. Interactive Photo Gallery Filter
       -------------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Ubah button aktif
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       7. Secret Message Modal Logic
       -------------------------------------------------------------------------- */
    const secretModal = document.getElementById('secretModal');
    const openModalBtn = document.getElementById('openSecretModal');
    const closeModalBtn = document.getElementById('closeSecretModal');

    if (openModalBtn && secretModal) {
        openModalBtn.addEventListener('click', () => {
            secretModal.classList.add('active');
        });
    }

    if (closeModalBtn && secretModal) {
        closeModalBtn.addEventListener('click', () => {
            secretModal.classList.remove('active');
        });
    }

    // Tutup modal jika user klik di luar kotak modal
    window.addEventListener('click', (e) => {
        if (e.target === secretModal) {
            secretModal.classList.remove('active');
        }
    });

    /* --------------------------------------------------------------------------
       8. Particle Canvas (Floating Hearts Effect)
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = [];
        const particleCount = 30;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;
                this.size = Math.random() * 12 + 6;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.y -= this.speedY;
                this.x += this.speedX;

                if (this.y < -20) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 77, 109, ${this.opacity})`;
                ctx.beginPath();
                // Menggambar lingkaran/partikel halus
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }
});

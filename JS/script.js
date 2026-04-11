document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. CHARGEMENT DYNAMIQUE DE TYPED.JS
    // ==========================================
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            // Si Typed.js est déjà chargé, on résout directement
            if (typeof Typed !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Impossible de charger : ${src}`));
            document.head.appendChild(script);
        });
    };

    // Initialisation de Typed.js après chargement
    loadScript('https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js')
        .then(() => {
            new Typed('#typed-name', {
                strings: ['Amr Jaddad'],
                typeSpeed: 70,
                showCursor: false,
                startDelay: 300
            });
        })
        .catch(err => {
            console.error('Erreur Typed.js:', err);
            // Fallback : affichage statique en cas d'échec
            const nameEl = document.getElementById('typed-name');
            if (nameEl) nameEl.textContent = 'Amr Jaddad';
        });


    // ==========================================
    // 2. MODE SOMBRE (LocalStorage + Toggle)
    // ==========================================
    const btnTheme = document.getElementById('btn-theme');
    const icon = btnTheme?.querySelector('i');

    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        icon?.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        icon?.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    };

    // Appliquer le thème sauvegardé au chargement
    if (localStorage.getItem('theme') === 'dark') {
        enableDarkMode();
    }

    btnTheme?.addEventListener('click', () => {
        document.body.classList.contains('dark-mode') 
            ? disableDarkMode() 
            : enableDarkMode();
    });


    // ==========================================
    // 3. BOUTON IMPRESSION
    // ==========================================
    document.getElementById('btn-print')?.addEventListener('click', () => {
        window.print();
    });


    // ==========================================
    // 4. BARRE DE PROGRESSION DE SCROLL (Bonus)
    // ==========================================
    const progress = document.createElement('div');
    progress.style.cssText = 'position:fixed;top:0;left:0;height:4px;background:#0088cc;width:0%;z-index:9999;transition:width 0.1s;';
    document.body.appendChild(progress);

    const updateProgress = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progress.style.width = scrolled + "%";
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress); // Mise à jour au redimensionnement


    // ==========================================
    // 5. ANIMATIONS D'ENTRÉE (Intersection Observer)
    // ==========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Stop l'observation après animation
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-cv, .carte, .outil').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });
});
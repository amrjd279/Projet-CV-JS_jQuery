document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // 1. CHARGEMENT DYNAMIQUE DE TYPED.JS
    // ===================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.Typed = class {
            constructor(selector, options) {
                const el = document.querySelector(selector);
                if (el && options?.strings?.length) {
                    el.textContent = options.strings[0];
                }
            }
        };
    }

    // ==============
    // 2. MODE SOMBRE
    // ==============
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

    if (localStorage.getItem('theme') === 'dark') {
        enableDarkMode();
    }

    btnTheme?.addEventListener('click', () => {
        document.body.classList.contains('dark-mode')
            ? disableDarkMode()
            : enableDarkMode();
    });


    // ========
    // 3. PRINT
    // ========
    document.getElementById('btn-print')?.addEventListener('click', () => {
        window.print();
    });


    // =======================
    // 4. BARRE DE PROGRESSION
    // =======================
    const progress = document.createElement('div');
    progress.style.cssText =
        'position:fixed;top:0;left:0;height:4px;background:#0088cc;width:0%;z-index:9999;';
    document.body.appendChild(progress);

    const updateProgress = () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progress.style.width = (winScroll / height) * 100 + "%";
    };

    window.addEventListener('scroll', updateProgress);


    // =============
    // 5. ANIMATIONS
    // =============
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.section-cv, .carte, .outil').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "0.6s";
        observer.observe(el);
    });


    // ========================
    // 6. TEXTE SOUS LES ICÔNES
    // ========================
    const outils = document.querySelectorAll('.outil');

    const labels = {
        'fa-html5': 'HTML5',
        'fa-css3-alt': 'CSS3',
        'fa-php': 'PHP',
        'fa-database': 'SQL',
        'fa-js': 'JavaScript',
        'fa-java': 'Java',
        'fa-python': 'Python',
        'fa-react': 'React',
        'fa-network-wired': 'Réseau',
        'fa-file-word': 'Word',
        'fa-file-excel': 'Excel',
        'fa-file-powerpoint': 'PowerPoint'
    };

    outils.forEach(outil => {
        const i = outil.querySelector('i');

        const texteNom = document.createElement('div');
        texteNom.className = 'outil-label';

        let label = "";

        for (const key in labels) {
            if (i?.classList.contains(key)) {
                label = labels[key];
            }
        }

        texteNom.textContent = label;
        outil.appendChild(texteNom);

        outil.addEventListener('mouseenter', () => {
            texteNom.style.opacity = "1";
        });

        outil.addEventListener('mouseleave', () => {
            texteNom.style.opacity = "0";
        });
    });

    // ==========================
    // 7. BOUTON "RETOUR EN HAUT"
    // ==========================
    const btnTop = document.createElement('button');
    btnTop.id = 'btn-top';
    btnTop.type = 'button';
    btnTop.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    btnTop.setAttribute('aria-label', 'Retour en haut');

    btnTop.style.cssText = `
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 42px;
        height: 42px;
        border: none;
        border-radius: 50%;
        background: #0088cc;
        color: #fff;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity .30s ease;
        z-index: 9999;
    `;

    document.body.appendChild(btnTop);

    const toggleBtnTop = () => {
        const visible = window.scrollY > 300;
        btnTop.style.opacity = visible ? '1' : '0';
        btnTop.style.pointerEvents = visible ? 'auto' : 'none';
    };

    window.addEventListener('scroll', toggleBtnTop);
    toggleBtnTop();

    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
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

    // ===================================
    // 1. CHARGEMENT DYNAMIQUE DE TYPED.JS
    // ===================================
    loadScript('https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js')
        .then(() => {
            const titleEl = document.getElementById('typed-name');
            if (titleEl) {
                titleEl.setAttribute('aria-live', 'polite');
            }

            new Typed('#typed-name', {
                strings: [
                    'Amr Jaddad',
                    'Je transforme vos idées en sites performants'
                ],
                typeSpeed: 70,
                backSpeed: 35,
                backDelay: 1200,
                showCursor: false,
                startDelay: 300,
                loop: true
            });
        })
        .catch(() => {
            const nameEl = document.getElementById('typed-name');
            if (nameEl) nameEl.textContent = 'Amr Jaddad';
        });

});
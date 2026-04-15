document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // 1. CHARGEMENT DYNAMIQUE DE TYPED.JS
    // ===================================
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

    loadScript('https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js')
        .then(() => {
            new Typed('#typed-name', {
                strings: ['Amr Jaddad'],
                typeSpeed: 70,
                showCursor: false,
                startDelay: 300
            });
        })
        .catch(() => {
            const nameEl = document.getElementById('typed-name');
            if (nameEl) nameEl.textContent = 'Amr Jaddad';
        });


    // ======================================
    // 2. MODE SOMBRE
    // ======================================
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


    // ====================
    // 3. PRINT
    // ====================
    document.getElementById('btn-print')?.addEventListener('click', () => {
        window.print();
    });


    // =========================================
    // 4. BARRE DE PROGRESSION
    // =========================================
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


    // =========================================
    // 5. ANIMATIONS
    // =========================================
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


    // ==========================================
    // 6. TEXTE SOUS LES ICÔNES
    // ==========================================
    const outils = document.querySelectorAll('.outil');

    const labels = {
        'fa-html5': 'HTML5',
        'fa-css3-alt': 'CSS3',
        'fa-php': 'PHP',
        'fa-database': 'SQL & BDD',
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
        texteNom.style.cssText =
            "font-size:12px;opacity:0;transition:0.3s;color:#0088cc;margin-top:4px;";

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

});
document.addEventListener('DOMContentLoaded', () => {
        // ========== Thème Sombre ==========
        const btnTheme = document.getElementById('btn-theme');
        const icon = btnTheme.querySelector('i');

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        btnTheme.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // ========== Bouton Print ==========
        document.getElementById('btn-print').addEventListener('click', () => window.print());

        // ========== Effet Machine à Écrire ==========
        const titleElement = document.querySelector('.nom-cv, .titre-principal h1, h1');
        if (titleElement) {
            const text = titleElement.textContent;
            titleElement.textContent = '';
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    titleElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                }
            };
            setTimeout(typeWriter, 500);
        }

        // ========== Bouton Retour en Haut ==========
        const btnTop = document.createElement('button');
        btnTop.id = 'btn-top';
        btnTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btnTop.style.cssText = 'position:fixed;bottom:20px;right:20px;padding:12px;border-radius:50%;background:var(--primary-color);color:white;border:none;cursor:pointer;opacity:0;transition:all 0.3s;z-index:1000;';
        document.body.appendChild(btnTop);

        window.addEventListener('scroll', () => {
            btnTop.style.opacity = window.scrollY > 300 ? '1' : '0';
        });

        btnTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ========== Barre de Progression de Lecture ==========
        const progressBar = document.createElement('div');
        progressBar.style.cssText = 'position:fixed;top:0;left:0;height:4px;background:linear-gradient(90deg,#ff6b6b,#4ecdc4);width:0%;z-index:1001;transition:width 0.1s;';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + '%';
        });

        // ========== Animation au Survol des Cartes ==========
        document.querySelectorAll('.carte, .outil, .section-cv').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.03) translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) translateY(0)';
                card.style.boxShadow = '';
            });
        });

        // ========== Intersection Observer pour les Transitions ==========
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, index * 40);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-cv, .carte, .outil, .section-gauche').forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(15px)";
            el.style.transition = "all 0.5s ease-out";
            observer.observe(el);
        });
});

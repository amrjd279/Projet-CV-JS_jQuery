document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Barre de progression ---
    const progress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        
        // Progression
        const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        if(progress) progress.style.width = scrolled + "%";

        // Bouton Back to top
        if(window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 2. Thème Sombre ---
    const btnTheme = document.getElementById('btn-theme');
    const updateTheme = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        const icon = btnTheme.querySelector('i');
        if(icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    if (localStorage.getItem('theme') === 'dark') updateTheme(true);
    
    btnTheme.addEventListener('click', () => {
        updateTheme(!document.body.classList.contains('dark-mode'));
    });

    // --- 3. Impression ---
    document.getElementById('btn-print').addEventListener('click', () => window.print());

    // --- 4. Accordéon Formations ---
    const accordeons = document.querySelectorAll('.carte.accordeon');
    accordeons.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // --- 5. Animations au Scroll (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    // Cible le header et les sections
    const itemsToReveal = document.querySelectorAll('.titre-principal, .section-cv, .carte, .outil, .section-gauche, .carte-projet');
    itemsToReveal.forEach(el => {
        if(!el.classList.contains('titre-principal')) el.classList.add('reveal');
        observer.observe(el);
    });
});
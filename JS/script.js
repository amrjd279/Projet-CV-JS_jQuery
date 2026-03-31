document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Barre de progression ---
    const progress = document.createElement('div');
    progress.id = 'scroll-progress';
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        progress.style.width = scrolled + "%";
    });

    // --- 2. Thème Sombre ---
    const btn = document.getElementById('btn-theme');
    const updateTheme = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        const icon = btn.querySelector('i');
        if(icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    if (localStorage.getItem('theme') === 'dark') updateTheme(true);
    
    btn.addEventListener('click', () => {
        updateTheme(!document.body.classList.contains('dark-mode'));
    });

    // --- 3. Impression ---
    document.getElementById('btn-print').addEventListener('click', () => window.print());

    // --- 4. Animations au Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    // On cible tous les éléments qui doivent "apparaître"
    document.querySelectorAll('.section-cv, .carte, .outil, .section-gauche, .carte-projet').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});
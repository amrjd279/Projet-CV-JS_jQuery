document.addEventListener('DOMContentLoaded', () => {
    // Thème Sombre
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

    // Bouton Print
    document.getElementById('btn-print').addEventListener('click', () => window.print());

    // Intersection Observer pour les transitions
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
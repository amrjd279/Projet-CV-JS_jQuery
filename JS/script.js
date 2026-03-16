document.addEventListener('DOMContentLoaded', () => {
    // Thème Sombre
    const btnTheme = document.getElementById('btn-theme');
    // On vérifie si le bouton existe pour éviter une erreur console
    if (btnTheme) {
        const icon = btnTheme.querySelector('i');

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        btnTheme.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            if (icon) {
                icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
            }
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Bouton Print
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => window.print());
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // On utilise une classe CSS plutôt que de l'inline style pour plus de propreté
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
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
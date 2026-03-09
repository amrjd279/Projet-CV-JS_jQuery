// JS/script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Mode Sombre
    const btnTheme = document.getElementById('btn-theme');
    const body = document.body;

    btnTheme.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const icon = btnTheme.querySelector('i');
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // 2. Impression
    const btnPrint = document.getElementById('btn-print');
    btnPrint.addEventListener('click', function() {
        window.print();
    });

    // 3. Hover Effects interactifs
    const outils = document.querySelectorAll('.outil');
    outils.forEach(outil => {
        outil.style.transition = "transform 0.3s ease, border-color 0.3s ease";
        
        outil.addEventListener('mouseenter', () => {
            outil.style.transform = "translateY(-4px)";
            outil.style.borderColor = "var(--bleu)";
        });
        
        outil.addEventListener('mouseleave', () => {
            outil.style.transform = "translateY(0)";
            outil.style.borderColor = "transparent";
        });
    });
});

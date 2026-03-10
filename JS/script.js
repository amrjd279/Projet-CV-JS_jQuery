document.addEventListener('DOMContentLoaded', () => {
    // Gestion Mode Sombre
    const btnTheme = document.getElementById('btn-theme');
    btnTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = btnTheme.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Bouton Print
    document.getElementById('btn-print').addEventListener('click', () => {
        window.print();
    });
});
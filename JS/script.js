document.addEventListener('DOMContentLoaded', () => {
    const btnTheme = document.getElementById('btn-theme');
    const icon = btnTheme.querySelector('i');

    // Sauvegarde du thème dans le navigateur
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    btnTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Bouton Impression
    document.getElementById('btn-print').addEventListener('click', () => {
        window.print();
    });
});
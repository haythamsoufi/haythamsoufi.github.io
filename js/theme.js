// Theme Toggle Functionality
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const html = document.documentElement;

    // Get saved theme or default to dark
    const getTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    };

    // Set theme
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon (show the theme you'll switch to, not current theme)
        const sunIcon = themeIcon.querySelector('.icon-sun');
        const moonIcon = themeIcon.querySelector('.icon-moon');
        if (theme === 'light') {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    };

    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = html.getAttribute('data-theme') || getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // Initialize theme on page load
    const initTheme = () => {
        const savedTheme = getTheme();
        setTheme(savedTheme);
    };

    // Event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();


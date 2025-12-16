// Theme Toggle Functionality
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const html = document.documentElement;

    // Get saved theme or default to dark
    const getTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    };

    // Update icons for a specific button
    const updateButtonIcons = (button) => {
        if (!button) return;
        const themeIcon = button.querySelector('.theme-icon');
        if (!themeIcon) return;
        
        const currentTheme = html.getAttribute('data-theme') || getTheme();
        const sunIcon = themeIcon.querySelector('.icon-sun');
        const moonIcon = themeIcon.querySelector('.icon-moon');
        
        if (currentTheme === 'light') {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    };

    // Set theme
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icons on both buttons
        updateButtonIcons(themeToggle);
        updateButtonIcons(themeToggleMobile);
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

    // Event listeners for both buttons
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();


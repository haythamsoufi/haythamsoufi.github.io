// Partials Loader
// Dynamically loads HTML partials and injects them into the page

async function loadPartial(partialPath, targetSelector) {
    try {
        const response = await fetch(partialPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${partialPath}: ${response.statusText}`);
        }
        const html = await response.text();
        const target = document.querySelector(targetSelector);
        if (target) {
            target.innerHTML = html;
        } else {
            console.warn(`Target selector "${targetSelector}" not found for partial ${partialPath}`);
        }
    } catch (error) {
        console.error(`Error loading partial ${partialPath}:`, error);
    }
}

async function loadPartials() {
    // Load all partials
    await Promise.all([
        loadPartial('partials/background.html', '#background-container'),
        loadPartial('partials/navigation.html', '#navigation-container'),
        loadPartial('partials/screen-indicator.html', '#screen-indicator-container'),
        loadPartial('partials/hero.html', '#hero-container'),
        loadPartial('partials/project-details.html', '#project-details-container'),
        loadPartial('partials/about.html', '#about-container'),
        loadPartial('partials/skills.html', '#skills-container'),
        loadPartial('partials/projects.html', '#projects-container'),
        loadPartial('partials/contact.html', '#contact-container'),
        loadPartial('partials/mockup-modal.html', '#mockup-modal-container')
    ]);
}

// Load partials when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPartials);
} else {
    loadPartials();
}


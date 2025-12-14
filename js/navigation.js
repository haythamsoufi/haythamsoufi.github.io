// Screen Navigation System with URL Routing
const screens = ['home', 'databank-details', 'about', 'skills', 'projects', 'contact'];
let currentScreenIndex = 0;

// Detect if we're using file:// protocol (local file)
const isFileProtocol = window.location.protocol === 'file:';

// Map screen names to URL paths
const screenToPath = {
    'home': '/',
    'databank-details': '/project',
    'about': '/about',
    'skills': '/skills',
    'projects': '/projects',
    'contact': '/contact'
};

// Map URL paths to screen names
const pathToScreen = {
    '/': 'home',
    '/project': 'databank-details',
    '/about': 'about',
    '/skills': 'skills',
    '/projects': 'projects',
    '/contact': 'contact'
};

// Hash-based routing for file:// protocol
const hashToScreen = {
    '#home': 'home',
    '#project': 'databank-details',
    '#about': 'about',
    '#skills': 'skills',
    '#projects': 'projects',
    '#contact': 'contact'
};

function showScreen(index, updateUrl = true) {
    // Get the current screen element first
    const currentScreen = document.getElementById(screens[index]);
    
    // Define scrollableContainers in the function scope so it's accessible everywhere
    let scrollableContainers = [];
    
    // Reset scroll position IMMEDIATELY, even before any class changes
    // This is critical for sections coming from translateX(100%)
    if (currentScreen) {
        // Force immediate scroll reset - even if section is off-screen
        currentScreen.scrollTop = 0;
        
        // Also reset scroll for any nested scrollable containers
        scrollableContainers = Array.from(currentScreen.querySelectorAll('.feature-subscreens, .screens-container, .project-detail-content, .about-content, .skills-grid, .projects-grid'));
        scrollableContainers.forEach(container => {
            container.scrollTop = 0;
        });
    }
    
    // Remove active class from all screens
    document.querySelectorAll('section').forEach((section, i) => {
        section.classList.remove('active', 'prev');
        if (i < index) {
            section.classList.add('prev');
        }
    });

    // Add active class to current screen
    if (currentScreen) {
        // Reset scroll AGAIN right before adding active class
        currentScreen.scrollTop = 0;
        scrollableContainers.forEach(container => {
            container.scrollTop = 0;
        });
        
        currentScreen.classList.add('active');
        
        // Force scroll reset multiple times during animation for About, Skills, and Projects
        // This ensures scroll stays at 0 even during the slide-in animation
        if (currentScreen.classList.contains('about') || 
            currentScreen.id === 'skills' || 
            currentScreen.classList.contains('projects')) {
            
            // Reset immediately after class change
            requestAnimationFrame(() => {
                currentScreen.scrollTop = 0;
            });
            
            // Reset very early in animation (10ms)
            setTimeout(() => {
                currentScreen.scrollTop = 0;
            }, 10);
            
            // Reset early in animation (50ms)
            setTimeout(() => {
                currentScreen.scrollTop = 0;
            }, 50);
            
            // Reset mid-animation (200ms)
            setTimeout(() => {
                currentScreen.scrollTop = 0;
                scrollableContainers.forEach(container => {
                    container.scrollTop = 0;
                });
            }, 200);
            
            // Reset late in animation (400ms)
            setTimeout(() => {
                currentScreen.scrollTop = 0;
            }, 400);
            
            // Reset after animation completes (850ms - after 0.8s transition)
            setTimeout(() => {
                currentScreen.scrollTop = 0;
                scrollableContainers.forEach(container => {
                    container.scrollTop = 0;
                });
                // Force one more time
                window.scrollTo(0, 0);
            }, 850);
        } else {
            // For other sections, reset after animation
            setTimeout(() => {
                currentScreen.scrollTop = 0;
                scrollableContainers.forEach(container => {
                    container.scrollTop = 0;
                });
            }, 100);
        }
    }

    // Reset body and document scroll position (in case body is scrollable)
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // If showing databank-details screen, initialize features
    if (screens[index] === 'databank-details') {
        setTimeout(() => {
            if (typeof showFeature === 'function') {
                showFeature(0);
            }
        }, 100);
    }

    // Update screen indicators
    updateScreenIndicators(index);

    // Update nav links
    updateNavLinks(index);

    // Update URL if requested (skip when loading from URL)
    if (updateUrl) {
        const screenName = screens[index];
        const title = document.querySelector(`nav a[data-screen="${screenName}"]`)?.textContent || 'Portfolio';
        document.title = `${title} - Haytham Alsoufi`;
        
        if (isFileProtocol) {
            // Use hash-based routing for file:// protocol
            const hash = Object.keys(hashToScreen).find(key => hashToScreen[key] === screenName) || '#home';
            window.location.hash = hash;
        } else {
            // Use History API for http/https protocols
            const path = screenToPath[screenName] || '/';
            window.history.pushState({ screen: screenName, index: index }, title, path);
        }
    }
}

function updateScreenIndicators(activeIndex) {
    const indicator = document.getElementById('screenIndicator');
    if (!indicator) return;
    
    indicator.innerHTML = '';
    screens.forEach((screen, index) => {
        const dot = document.createElement('div');
        dot.className = 'screen-dot' + (index === activeIndex ? ' active' : '');
        dot.addEventListener('click', () => goToScreen(index));
        indicator.appendChild(dot);
    });
}

function updateNavLinks(activeIndex) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-screen') === screens[activeIndex]) {
            link.classList.add('active');
        }
    });
}

function goToScreen(index, updateUrl = true) {
    if (index >= 0 && index < screens.length) {
        currentScreenIndex = index;
        showScreen(index, updateUrl);
    }
}

function goToScreenByName(screenName, updateUrl = true) {
    const index = screens.indexOf(screenName);
    if (index !== -1) {
        goToScreen(index, updateUrl);
    }
}

// Get current screen from URL
function getScreenFromUrl() {
    if (isFileProtocol) {
        // Use hash for file:// protocol
        const hash = window.location.hash || '#home';
        const screenName = hashToScreen[hash] || 'home';
        return screens.indexOf(screenName);
    } else {
        // Use pathname for http/https protocols
        const path = window.location.pathname;
        const screenName = pathToScreen[path] || 'home';
        return screens.indexOf(screenName);
    }
}

function nextScreen() {
    if (currentScreenIndex < screens.length - 1) {
        goToScreen(currentScreenIndex + 1);
    }
}

function prevScreen() {
    if (currentScreenIndex > 0) {
        goToScreen(currentScreenIndex - 1);
    }
}

// Handle browser back/forward buttons
if (isFileProtocol) {
    // Hash change event for file:// protocol
    window.addEventListener('hashchange', () => {
        const index = getScreenFromUrl();
        currentScreenIndex = index;
        showScreen(index, false); // Don't update URL, we're already there
    });
} else {
    // Popstate event for http/https protocols
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.index !== undefined) {
            currentScreenIndex = e.state.index;
            showScreen(e.state.index, false); // Don't update URL, we're already there
        } else {
            // Fallback: read from current URL
            const index = getScreenFromUrl();
            currentScreenIndex = index;
            showScreen(index, false);
        }
    });
}

// Navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Update navigation links to use proper hrefs
    document.querySelectorAll('a[data-screen]').forEach(link => {
        const screenName = link.getAttribute('data-screen');
        
        if (isFileProtocol) {
            // Use hash for file:// protocol
            const hash = Object.keys(hashToScreen).find(key => hashToScreen[key] === screenName) || '#home';
            link.href = hash;
        } else {
            // Use path for http/https protocols
            const path = screenToPath[screenName] || '/';
            link.href = path;
        }
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = screens.indexOf(screenName);
            if (index !== -1) {
                goToScreen(index);
            }
        });
    });

    // Initialize from URL on page load
    const initialIndex = getScreenFromUrl();
    currentScreenIndex = initialIndex;
    
    if (!isFileProtocol) {
        // Set initial state for browser history (only for http/https)
        const screenName = screens[initialIndex];
        const path = screenToPath[screenName] || '/';
        const title = document.querySelector(`nav a[data-screen="${screenName}"]`)?.textContent || 'Portfolio';
        window.history.replaceState({ screen: screenName, index: initialIndex }, title, path);
    } else if (!window.location.hash) {
        // Set initial hash for file:// protocol if none exists
        window.location.hash = '#home';
    }
    
    // Show the correct screen (don't update URL since we just set it)
    showScreen(initialIndex, false);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { screens, currentScreenIndex, showScreen, goToScreen, nextScreen, prevScreen };
}


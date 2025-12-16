// Feature Subscreens Navigation
const features = ['overview', 'backoffice', 'website', 'mobile-app'];
let currentFeatureIndex = 0;

function showFeature(index, updateUrl = true) {
    if (index < 0 || index >= features.length) return;

    // Remove active class from all feature subscreens
    document.querySelectorAll('.feature-subscreen').forEach((screen, i) => {
        screen.classList.remove('active', 'prev');
        if (i < index) {
            screen.classList.add('prev');
        }
    });

    // Add active class to current feature
    const currentFeature = document.querySelectorAll('.feature-subscreen')[index];
    if (currentFeature) {
        // Reset scroll position before showing feature
        const featureContainer = currentFeature.closest('.feature-subscreens');
        if (featureContainer) {
            featureContainer.scrollTop = 0;
        }
        
        // Reset vertical scroll container if it exists
        const verticalContainer = currentFeature.querySelector('.vertical-scroll-container');
        if (verticalContainer) {
            verticalContainer.scrollTop = 0;
        }
        
        currentFeature.scrollTop = 0;
        currentFeature.classList.add('active');
        
        // Ensure scroll is reset after a brief delay
        setTimeout(() => {
            if (featureContainer) {
                featureContainer.scrollTop = 0;
            }
            if (verticalContainer) {
                verticalContainer.scrollTop = 0;
            }
            currentFeature.scrollTop = 0;
        }, 50);
    }

    // Update navigation buttons
    document.querySelectorAll('.feature-nav-button').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    currentFeatureIndex = index;
    
    // Update URL if requested
    if (updateUrl) {
        const featureName = features[index];
        const path = `/databank/${featureName}`;
        const title = document.querySelector(`.feature-nav-button[data-feature-index="${index}"]`)?.textContent || 'Project';
        document.title = `${title} - Haytham Alsoufi`;
        
        // Use History API to update URL
        window.history.pushState({ 
            screen: 'databank-details', 
            feature: featureName, 
            featureIndex: index 
        }, title, path);
    }
    
    // Re-attach mockup handlers after feature change
    if (typeof attachMockupClickHandlers === 'function') {
        setTimeout(attachMockupClickHandlers, 200);
    }
    
    // Initialize vertical navigation indicator
    initializeVerticalNav(currentFeature);
}

// Initialize vertical navigation indicator for a feature
function initializeVerticalNav(featureElement) {
    if (!featureElement) return;
    
    const scrollContainer = featureElement.querySelector('.vertical-scroll-container');
    const navIndicator = featureElement.querySelector('.vertical-nav-indicator');
    
    if (!scrollContainer || !navIndicator) return;
    
    const screens = scrollContainer.querySelectorAll('.vertical-screen');
    if (screens.length <= 1) {
        navIndicator.style.display = 'none';
        return;
    }
    
    // Clear existing dots
    navIndicator.innerHTML = '';
    
    // Create dots for each screen
    screens.forEach((screen, index) => {
        const dot = document.createElement('div');
        dot.className = 'vertical-nav-dot';
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.setAttribute('data-screen-index', index);
        dot.setAttribute('aria-label', `Go to screen ${index + 1}`);
        
        dot.addEventListener('click', () => {
            scrollToScreen(scrollContainer, index);
        });
        
        navIndicator.appendChild(dot);
    });
    
    // Update active dot on scroll
    let scrollTimeout;
    scrollContainer.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveDot(scrollContainer, navIndicator, screens);
        }, 100);
    });
    
    // Initial update
    updateActiveDot(scrollContainer, navIndicator, screens);
}

// Scroll to a specific screen
function scrollToScreen(container, screenIndex) {
    const screens = container.querySelectorAll('.vertical-screen');
    if (screenIndex >= 0 && screenIndex < screens.length) {
        const screen = screens[screenIndex];
        const screenTop = screen.offsetTop;
        container.scrollTo({
            top: screenTop,
            behavior: 'smooth'
        });
    }
}

// Update active dot based on scroll position
function updateActiveDot(container, navIndicator, screens) {
    const containerRect = container.getBoundingClientRect();
    const containerTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const viewportCenter = containerTop + containerHeight / 2;
    
    let activeIndex = 0;
    let minDistance = Infinity;
    
    screens.forEach((screen, index) => {
        const screenTop = screen.offsetTop;
        const screenHeight = screen.offsetHeight;
        const screenCenter = screenTop + screenHeight / 2;
        const distance = Math.abs(viewportCenter - screenCenter);
        
        if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
        }
    });
    
    // Update active dot
    navIndicator.querySelectorAll('.vertical-nav-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function nextFeature() {
    if (currentFeatureIndex < features.length - 1) {
        showFeature(currentFeatureIndex + 1, true);
    }
}

function prevFeature() {
    if (currentFeatureIndex > 0) {
        showFeature(currentFeatureIndex - 1, true);
    }
}

// Get current feature from URL
function getFeatureFromUrl() {
    const path = window.location.pathname;
    // Check if path matches /databank/:feature pattern
    const match = path.match(/^\/databank\/(.+)$/);
    if (match) {
        const featureName = match[1];
        const index = features.indexOf(featureName);
        if (index !== -1) {
            return index;
        }
    }
    // Default to overview (index 0) if on /databank without feature
    if (path === '/databank') {
        return 0;
    }
    return null;
}

// Initialize features function
function initializeFeatures() {
    // Feature nav buttons
    document.querySelectorAll('.feature-nav-button').forEach((btn, index) => {
        // Remove existing listeners to avoid duplicates
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => showFeature(index, true));
    });
    
    // Initialize feature from URL if on databank-details screen
    const databankScreen = document.getElementById('databank-details');
    if (databankScreen && databankScreen.classList.contains('active')) {
        const featureIndex = getFeatureFromUrl();
        if (featureIndex !== null) {
            showFeature(featureIndex, false); // Don't update URL, we're initializing from it
        }
    }
    
    // Initialize vertical nav indicators for all features
    document.querySelectorAll('.feature-subscreen').forEach(feature => {
        if (feature.classList.contains('active')) {
            initializeVerticalNav(feature);
        }
    });
}

// Feature navigation event listeners
document.addEventListener('DOMContentLoaded', initializeFeatures);

// Listen for dynamically loaded project details
document.addEventListener('projectDetailsLoaded', initializeFeatures);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { features, currentFeatureIndex, showFeature, nextFeature, prevFeature, getFeatureFromUrl };
}

// Make functions globally available for cross-module access
if (typeof window !== 'undefined') {
    window.getFeatureFromUrl = getFeatureFromUrl;
    window.showFeature = showFeature;
    // Expose currentFeatureIndex for navigation.js to access
    Object.defineProperty(window, 'currentFeatureIndex', {
        get: () => currentFeatureIndex,
        enumerable: true
    });
}


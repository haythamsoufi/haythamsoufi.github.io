// Feature Subscreens Navigation
const features = ['overview', 'form-builder', 'multi-language', 'analytics', 'mobile', 'security', 'communication'];
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
        currentFeature.scrollTop = 0;
        
        currentFeature.classList.add('active');
        
        // Ensure scroll is reset after a brief delay
        setTimeout(() => {
            if (featureContainer) {
                featureContainer.scrollTop = 0;
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
        const path = `/project/${featureName}`;
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
    // Check if path matches /project/:feature pattern
    const match = path.match(/^\/project\/(.+)$/);
    if (match) {
        const featureName = match[1];
        const index = features.indexOf(featureName);
        if (index !== -1) {
            return index;
        }
    }
    // Default to overview (index 0) if on /project without feature
    if (path === '/project') {
        return 0;
    }
    return null;
}

// Feature navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Feature nav buttons
    document.querySelectorAll('.feature-nav-button').forEach((btn, index) => {
        btn.addEventListener('click', () => showFeature(index, true));
    });
    
    // Initialize feature from URL if on databank-details screen
    const databankScreen = document.getElementById('databank-details');
    if (databankScreen && databankScreen.classList.contains('active')) {
        const featureIndex = getFeatureFromUrl();
        if (featureIndex !== null) {
            showFeature(featureIndex, false); // Don't update URL, we're initializing from it
        }
    }
});

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


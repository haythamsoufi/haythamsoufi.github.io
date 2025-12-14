// Feature Subscreens Navigation
const features = ['overview', 'form-builder', 'multi-language', 'analytics', 'mobile', 'security', 'communication'];
let currentFeatureIndex = 0;

function showFeature(index) {
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
    
    // Re-attach mockup handlers after feature change
    if (typeof attachMockupClickHandlers === 'function') {
        setTimeout(attachMockupClickHandlers, 200);
    }
}

function nextFeature() {
    if (currentFeatureIndex < features.length - 1) {
        showFeature(currentFeatureIndex + 1);
    }
}

function prevFeature() {
    if (currentFeatureIndex > 0) {
        showFeature(currentFeatureIndex - 1);
    }
}

// Feature navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Feature nav buttons
    document.querySelectorAll('.feature-nav-button').forEach((btn, index) => {
        btn.addEventListener('click', () => showFeature(index));
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { features, currentFeatureIndex, showFeature, nextFeature, prevFeature };
}


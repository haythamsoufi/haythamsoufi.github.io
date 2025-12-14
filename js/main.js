// Main initialization and coordination
// Note: Using global scope since we're not using ES modules in the browser

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const databankActive = document.getElementById('databank-details')?.classList.contains('active');
    
    if (databankActive && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === 'PageUp')) {
        // Navigate features when on databank screen
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            e.preventDefault();
            nextFeature();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            prevFeature();
        }
    } else {
        // Navigate main screens
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            e.preventDefault();
            nextScreen();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            prevScreen();
        } else if (e.key === 'Home') {
            e.preventDefault();
            if (typeof goToScreen === 'function') {
                goToScreen(0);
            } else if (typeof window.goToScreen === 'function') {
                window.goToScreen(0);
            }
        } else if (e.key === 'End') {
            e.preventDefault();
            if (typeof goToScreen === 'function') {
                goToScreen(screens.length - 1);
            } else if (typeof window.goToScreen === 'function') {
                window.goToScreen(screens.length - 1);
            }
        } else if (e.key === 'Escape') {
            const fullscreen = document.getElementById('mockupFullscreen');
            if (fullscreen?.classList.contains('active')) {
                if (typeof closeMockupFullscreen === 'function') {
                    closeMockupFullscreen();
                } else if (typeof window.closeMockupFullscreen === 'function') {
                    window.closeMockupFullscreen();
                }
                e.stopPropagation();
            }
        }
    }
});

// Prevent default scroll behavior - horizontal wheel navigation
document.addEventListener('wheel', (e) => {
    e.preventDefault();
    const databankActive = document.getElementById('databank-details')?.classList.contains('active');
    
    if (databankActive) {
        // Navigate features when on databank screen
        if (e.deltaX > 0 || (e.deltaX === 0 && e.deltaY > 0)) {
            nextFeature();
        } else {
            prevFeature();
        }
    } else {
        // Navigate main screens otherwise
        if (e.deltaX > 0 || (e.deltaX === 0 && e.deltaY > 0)) {
            nextScreen();
        } else {
            prevScreen();
        }
    }
}, { passive: false });

// Touch swipe support - horizontal
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next screen
            nextScreen();
        } else {
            // Swipe right - previous screen
            prevScreen();
        }
    }
}

// Initialize on load
window.addEventListener('load', () => {
    createParticles();
    // Screen navigation is handled by navigation.js based on URL
    // showScreen is called from navigation.js after reading the URL
    
    // Optional: Uncomment for typing effect
    // const typingText = document.getElementById('typing-text');
    // const text = typingText.textContent;
    // typeWriter(typingText, text, 50);
});


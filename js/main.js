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

// Horizontal wheel navigation - only prevent default for horizontal scrolling
let lastWheelNavigationTime = 0;
const wheelNavigationCooldown = 600; // Minimum time between navigations (ms)

document.addEventListener('wheel', (e) => {
    // Only handle horizontal scrolling (deltaX) or when horizontal is dominant
    // Allow vertical scrolling (deltaY) to work normally
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const horizontalThreshold = 30; // Increased threshold to require more deliberate scrolling
    
    // Check cooldown to prevent rapid multiple navigations
    const now = Date.now();
    if (isHorizontalScroll && Math.abs(e.deltaX) > horizontalThreshold && (now - lastWheelNavigationTime) > wheelNavigationCooldown) {
        e.preventDefault();
        lastWheelNavigationTime = now;
        
        const databankActive = document.getElementById('databank-details')?.classList.contains('active');
        
        if (databankActive) {
            // Navigate features when on databank screen
            if (e.deltaX > 0) {
                nextFeature();
            } else {
                prevFeature();
            }
        } else {
            // Navigate main screens otherwise
            if (e.deltaX > 0) {
                nextScreen();
            } else {
                prevScreen();
            }
        }
    }
    // If vertical scrolling (deltaY is dominant), don't prevent default - allow normal scrolling
}, { passive: false });

// Touch swipe support - distinguish horizontal vs vertical swipes
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let lastSwipeTime = 0;
let isSwipeProcessing = false;
const swipeCooldown = 800; // Minimum time between swipes (ms)
const swipeThreshold = 100; // Increased threshold - requires more deliberate swipe

document.addEventListener('touchstart', (e) => {
    // Reset if enough time has passed since last swipe
    const now = Date.now();
    if (now - lastSwipeTime > swipeCooldown) {
        isSwipeProcessing = false;
    }
    
    if (!isSwipeProcessing) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }
}, { passive: true });

document.addEventListener('touchend', (e) => {
    // Don't process if we're already handling a swipe
    if (isSwipeProcessing) {
        return;
    }
    
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    // Prevent multiple rapid swipes
    const now = Date.now();
    if (isSwipeProcessing || (now - lastSwipeTime) < swipeCooldown) {
        return;
    }
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);
    
    // Only trigger navigation if horizontal movement is greater than vertical
    // This prevents vertical scrolling from triggering horizontal navigation
    // Also require horizontal movement to be at least 2x the vertical movement for more precision
    if (absDiffX > swipeThreshold && absDiffX > absDiffY && absDiffX > absDiffY * 1.5) {
        isSwipeProcessing = true;
        lastSwipeTime = now;
        
        if (diffX > 0) {
            // Swipe left - next screen
            const databankActive = document.getElementById('databank-details')?.classList.contains('active');
            if (databankActive) {
                nextFeature();
            } else {
                nextScreen();
            }
        } else {
            // Swipe right - previous screen
            const databankActive = document.getElementById('databank-details')?.classList.contains('active');
            if (databankActive) {
                prevFeature();
            } else {
                prevScreen();
            }
        }
        
        // Reset processing flag after a delay
        setTimeout(() => {
            isSwipeProcessing = false;
        }, swipeCooldown);
    }
    // If vertical movement is dominant, allow normal scrolling (don't prevent default)
}

// Initialize on load
window.addEventListener('load', () => {
    // Screen navigation is handled by navigation.js based on URL
    // showScreen is called from navigation.js after reading the URL

    // Typing effect for hero text
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typeWriter(typingText, text, 50);
    }

    // 3D tilt effect for Featured Project card
    const heroProject = document.querySelector('.hero-project');
    if (heroProject) {
        heroProject.addEventListener('mousemove', (e) => {
            const rect = heroProject.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 40;
            const rotateY = (centerX - x) / 40;
            
            heroProject.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        });
        
        heroProject.addEventListener('mouseleave', () => {
            heroProject.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    }
});



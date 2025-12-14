// Screen Navigation System with URL Routing
const screens = ['home', 'databank-details', 'about', 'skills', 'projects', 'contact'];
let currentScreenIndex = 0;


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


function showScreen(index, updateUrl = true) {
    console.log(`[DEBUG showScreen] Called with index: ${index}, screen: ${screens[index]}`);
    const currentScreen = document.getElementById(screens[index]);
    if (!currentScreen) {
        console.error(`[DEBUG showScreen] ERROR: Section with id "${screens[index]}" not found!`);
        console.log(`[DEBUG showScreen] Available sections:`, Array.from(document.querySelectorAll('section')).map(s => s.id));
        return;
    }

    const screenName = screens[index];
    console.log(`[DEBUG showScreen] Found section element:`, currentScreen);
    
    // Helper functions for debugging
    const getRect = (el) => el ? el.getBoundingClientRect() : null;
    const getComputedStyle = (el) => {
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return {
            transform: style.transform,
            opacity: style.opacity,
            visibility: style.visibility,
            display: style.display,
            position: style.position,
            top: style.top,
            left: style.left,
            width: style.width,
            height: style.height,
            overflowY: style.overflowY,
            paddingTop: style.paddingTop,
            justifyContent: style.justifyContent
        };
    };
    
    console.log(`[Navigation] Switching to screen: ${screenName} (index: ${index})`);
    
    // Helper function to reset scroll position
    const resetScroll = (element, label = '') => {
        if (element) {
            const before = element.scrollTop;
            element.scrollTop = 0;
            element.scrollLeft = 0;
            if (before !== 0 && label) {
                console.log(`[Scroll Reset] ${label}: ${before} → 0`);
            }
        }
    };
    
    const initialRect = getRect(currentScreen);
    const initialStyle = getComputedStyle(currentScreen);
    console.log(`[Navigation] Initial state for ${screenName}:`);
    console.log(`  Scroll: section=${currentScreen.scrollTop}, window=${window.scrollY}`);
    console.log(`  BoundingRect: top=${initialRect?.top}, left=${initialRect?.left}, width=${initialRect?.width}, height=${initialRect?.height}`);
    console.log(`  Transform: ${initialStyle?.transform}`);
    console.log(`  Opacity: ${initialStyle?.opacity}`);
    console.log(`  PaddingTop: ${initialStyle?.paddingTop}`);
    console.log(`  JustifyContent: ${initialStyle?.justifyContent}`);
    
    // Reset scroll position before any class changes
    resetScroll(currentScreen, `Before class change - ${screenName}`);
    
    // Reset scroll for nested scrollable containers
    const scrollableContainers = Array.from(currentScreen.querySelectorAll(
        '.feature-subscreens, .screens-container, .project-detail-content, .about-content, .skills-grid, .projects-grid'
    ));
    scrollableContainers.forEach((container, i) => {
        resetScroll(container, `Container ${i}`);
    });
    
    // Remove active class from all screens
    document.querySelectorAll('section').forEach((section, i) => {
        section.classList.remove('active', 'prev');
        if (i < index) {
            section.classList.add('prev');
        }
    });
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    console.log(`[DEBUG showScreen] Is mobile: ${isMobile}, width: ${window.innerWidth}`);
    console.log(`[DEBUG showScreen] Current screen: ${screenName}, element:`, currentScreen);

    // Mark that we're in transition - this prevents scroll during slide-in
    let isTransitioning = true;
    console.log(`[Navigation] Transition started for ${screenName}`);

    // Add active class to current screen
    currentScreen.classList.add('active');
    console.log(`[Navigation] Added 'active' class to ${screenName}`);
    console.log(`[DEBUG showScreen] Active class added. Classes:`, currentScreen.classList.toString());

    // On mobile, explicitly control visibility
    if (isMobile) {
        console.log(`[DEBUG showScreen] Mobile mode - controlling section visibility`);
        console.log(`[DEBUG showScreen] All sections before hide:`, Array.from(document.querySelectorAll('section')).map(s => ({
            id: s.id,
            display: s.style.display,
            computedDisplay: window.getComputedStyle(s).display
        })));
        
        // Hide all sections first
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
            console.log(`[DEBUG showScreen] Hid section: ${section.id}`);
        });
        
        // Then show the active section
        currentScreen.style.display = 'block';
        console.log(`[DEBUG showScreen] Set ${screenName} display to block`);
        
        // Check computed styles
        const computedStyle = window.getComputedStyle(currentScreen);
        console.log(`[DEBUG showScreen] ${screenName} computed styles:`, {
            display: computedStyle.display,
            opacity: computedStyle.opacity,
            visibility: computedStyle.visibility,
            inlineDisplay: currentScreen.style.display
        });
        
        // Sections are fixed positioned, so just reset their internal scroll
        currentScreen.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Verify section is visible
        requestAnimationFrame(() => {
            const rect = currentScreen.getBoundingClientRect();
            console.log(`[DEBUG showScreen] Section position (fixed):`, {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                windowScrollY: window.scrollY,
                isVisible: rect.top >= 0 && rect.top < window.innerHeight
            });
            
            // Ensure section scroll is at top
            if (currentScreen.scrollTop !== 0) {
                console.log(`[DEBUG showScreen] Resetting section scroll from ${currentScreen.scrollTop} to 0`);
                currentScreen.scrollTop = 0;
            }
        });
    } else {
        console.log(`[DEBUG showScreen] Desktop mode - using CSS transforms`);
    }

    // Check state immediately after adding active class
    requestAnimationFrame(() => {
        const rectAfterActive = getRect(currentScreen);
        const styleAfterActive = getComputedStyle(currentScreen);
        const firstChild = currentScreen.firstElementChild;
        const firstChildRect = firstChild ? getRect(firstChild) : null;
        console.log(`[Navigation] After adding 'active' class (RAF):`);
        console.log(`  BoundingRect: top=${rectAfterActive?.top}, left=${rectAfterActive?.left}, width=${rectAfterActive?.width}, height=${rectAfterActive?.height}`);
        console.log(`  Transform: ${styleAfterActive?.transform}`);
        console.log(`  Opacity: ${styleAfterActive?.opacity}`);
        console.log(`  ScrollTop: ${currentScreen.scrollTop}`);
        if (firstChildRect) {
            console.log(`  FirstChild BoundingRect: top=${firstChildRect.top}, left=${firstChildRect.left}`);
        }
    });

    // Reset scroll using requestAnimationFrame after class change
    // This ensures reset happens when the section becomes visible
    requestAnimationFrame(() => {
        const scrollBefore = currentScreen.scrollTop;
        resetScroll(currentScreen, `After RAF 1 - ${screenName}`);
        scrollableContainers.forEach(resetScroll);
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        if (scrollBefore !== 0) {
            console.log(`[Navigation] Scroll was ${scrollBefore} after adding active class`);
        }

        // Also reset in the next frame to ensure it sticks
        requestAnimationFrame(() => {
            const scrollBefore2 = currentScreen.scrollTop;
            resetScroll(currentScreen, `After RAF 2 - ${screenName}`);
            scrollableContainers.forEach(resetScroll);
            if (scrollBefore2 !== 0) {
                console.log(`[Navigation] Scroll was ${scrollBefore2} in second RAF`);
            }
        });
    });
    
    // Add a passive scroll listener that resets scroll during transition
    // This ensures scroll stays at 0 while the section slides in, without blocking user interaction
    let scrollEventCount = 0;
    const scrollHandler = () => {
        scrollEventCount++;
        if (isTransitioning && currentScreen.scrollTop !== 0) {
            const scrollValue = currentScreen.scrollTop;
            console.log(`[Scroll Handler] Scroll event #${scrollEventCount}: scrollTop=${scrollValue}, resetting...`);
            resetScroll(currentScreen, `Scroll handler - ${screenName}`);
            scrollableContainers.forEach(resetScroll);
        }
    };
    
    // Use capture phase and passive:false to allow resetting scroll
    // but only during the transition period
    currentScreen.addEventListener('scroll', scrollHandler, { capture: true, passive: false });
    console.log(`[Navigation] Added scroll listener for ${screenName}`);
    
    // Reset scroll at strategic points during the 0.8s transition
    const resetIntervals = [50, 150, 300, 500];
    resetIntervals.forEach(delay => {
        setTimeout(() => {
            if (isTransitioning) {
                const scrollValue = currentScreen.scrollTop;
                if (scrollValue !== 0) {
                    console.log(`[Navigation] Reset at ${delay}ms: scrollTop was ${scrollValue}`);
                }
                resetScroll(currentScreen, `${delay}ms reset - ${screenName}`);
                scrollableContainers.forEach(resetScroll);
            }
        }, delay);
    });
    
        // After transition completes, remove the scroll handler and do final reset
        setTimeout(() => {
            const finalScrollBefore = currentScreen.scrollTop;
            isTransitioning = false;
            currentScreen.removeEventListener('scroll', scrollHandler, { capture: true });
            console.log(`[Navigation] Transition ended for ${screenName}. Scroll events caught: ${scrollEventCount}`);
            
            // Debug: Check final state, especially on mobile
            const isMobileCheck = window.innerWidth <= 768;
            if (isMobileCheck) {
                console.log(`[DEBUG Transition End] Mobile mode - Final state check for ${screenName}`);
                const allSections = document.querySelectorAll('section');
                allSections.forEach(section => {
                    const computed = window.getComputedStyle(section);
                    console.log(`[DEBUG Transition End] Section ${section.id}:`, {
                        display: section.style.display,
                        computedDisplay: computed.display,
                        opacity: computed.opacity,
                        visibility: computed.visibility,
                        hasActive: section.classList.contains('active'),
                        hasPrev: section.classList.contains('prev')
                    });
                });
            }
            
            // Check final positioning (for debugging only)
            const rect = getRect(currentScreen);
            if (rect && (rect.left < -10 || rect.left > 10)) {
                console.log(`[Navigation] WARNING: Section still positioned incorrectly at left=${rect.left}`);
            }
            
            // Final reset to ensure we're at the top
            resetScroll(currentScreen, `Final reset - ${screenName}`);
            scrollableContainers.forEach(resetScroll);
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        
        // Log final state
        const finalRect = getRect(currentScreen);
        const finalStyle = getComputedStyle(currentScreen);
        const firstChild = currentScreen.firstElementChild;
        const firstChildRect = firstChild ? getRect(firstChild) : null;
        const isVisible = finalRect && finalRect.top >= 0 && finalRect.top < window.innerHeight;
        
        console.log(`[Navigation] Final state for ${screenName}:`);
        console.log(`  Scroll: section=${currentScreen.scrollTop}, window=${window.scrollY}`);
        console.log(`  BoundingRect: top=${finalRect?.top}, left=${finalRect?.left}, width=${finalRect?.width}, height=${finalRect?.height}`);
        console.log(`  Transform: ${finalStyle?.transform}`);
        console.log(`  Opacity: ${finalStyle?.opacity}`);
        console.log(`  PaddingTop: ${finalStyle?.paddingTop}`);
        console.log(`  JustifyContent: ${finalStyle?.justifyContent}`);
        if (firstChildRect) {
            console.log(`  FirstChild BoundingRect: top=${firstChildRect.top}, left=${firstChildRect.left}, width=${firstChildRect.width}`);
        }
        console.log(`  IsVisible: ${isVisible} (viewport height: ${window.innerHeight})`);
        console.log(`  Scroll events caught: ${scrollEventCount}`);
    }, 850);

    // If showing databank-details screen, initialize features
    if (screens[index] === 'databank-details') {
        setTimeout(() => {
            if (typeof showFeature === 'function') {
                // Check if URL has a specific feature path
                const path = window.location.pathname;
                const match = path.match(/^\/project\/(.+)$/);
                if (match && typeof getFeatureFromUrl === 'function') {
                    const featureIndex = getFeatureFromUrl();
                    if (featureIndex !== null) {
                        showFeature(featureIndex, false); // Don't update URL, we're initializing from it
                    } else {
                        showFeature(0, false);
                    }
                } else {
                    showFeature(0, false);
                }
            }
        }, 100);
    }

    // Update nav links
    updateNavLinks(index);

    // Update URL if requested (skip when loading from URL)
    if (updateUrl) {
        const screenName = screens[index];
        const title = document.querySelector(`nav a[data-screen="${screenName}"]`)?.textContent || 'Portfolio';
        document.title = `${title} - Haytham Alsoufi`;

        // Use History API for http/https protocols
        let path = screenToPath[screenName] || '/';
        
        // For databank-details, preserve current feature path if navigating to this screen
        // (but don't preserve if navigating away from it)
        if (screenName === 'databank-details' && currentScreenIndex === index) {
            const currentPath = window.location.pathname;
            if (currentPath.startsWith('/project/') && currentPath !== '/project') {
                path = currentPath; // Preserve the feature path
            }
        }
        
        // Get current feature index if on databank-details
        let featureIndex = null;
        if (screenName === 'databank-details' && typeof window.currentFeatureIndex !== 'undefined') {
            featureIndex = window.currentFeatureIndex;
        }
        
        window.history.pushState({ 
            screen: screenName, 
            index: index,
            featureIndex: featureIndex 
        }, title, path);
    }
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
    // Use pathname for http/https protocols
    const path = window.location.pathname;
    
    // Check if path matches /project/:feature pattern
    if (path.startsWith('/project/')) {
        return screens.indexOf('databank-details');
    }
    
    const screenName = pathToScreen[path] || 'home';
    return screens.indexOf(screenName);
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
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.index !== undefined) {
        currentScreenIndex = e.state.index;
        showScreen(e.state.index, false); // Don't update URL, we're already there
        
        // If on databank-details screen, also handle feature navigation
        if (screens[e.state.index] === 'databank-details' && e.state.featureIndex !== undefined) {
            if (typeof showFeature === 'function') {
                setTimeout(() => {
                    showFeature(e.state.featureIndex, false);
                }, 100);
            }
        }
    } else {
        // Fallback: read from current URL
        const index = getScreenFromUrl();
        currentScreenIndex = index;
        showScreen(index, false);
        
        // If on databank-details screen, check for feature in URL
        if (screens[index] === 'databank-details' && typeof getFeatureFromUrl === 'function') {
            setTimeout(() => {
                const featureIndex = getFeatureFromUrl();
                if (featureIndex !== null && typeof showFeature === 'function') {
                    showFeature(featureIndex, false);
                }
            }, 100);
        }
    }
});

// Navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('[DEBUG] DOMContentLoaded - Starting navigation setup');
    console.log('[DEBUG] Available screens:', screens);
    console.log('[DEBUG] All sections found:', Array.from(document.querySelectorAll('section')).map(s => ({
        id: s.id,
        classes: s.classList.toString(),
        display: window.getComputedStyle(s).display
    })));
    
    // Update navigation links to use proper hrefs
    document.querySelectorAll('a[data-screen]').forEach(link => {
        const screenName = link.getAttribute('data-screen');

        // Use path for http/https protocols
        const path = screenToPath[screenName] || '/';
        link.href = path;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('[DEBUG] Navigation link clicked:', screenName);
            const index = screens.indexOf(screenName);
            console.log('[DEBUG] Screen index:', index);
            if (index !== -1) {
                goToScreen(index);
            } else {
                console.error('[DEBUG] Screen not found:', screenName);
            }
        });
    });

    // Initialize from URL on page load
    console.log('[DEBUG] Initializing navigation...');
    const initialIndex = getScreenFromUrl();
    console.log('[DEBUG] Initial index from URL:', initialIndex, 'Screen:', screens[initialIndex]);
    currentScreenIndex = initialIndex;

    // Set initial state for browser history
    const screenName = screens[initialIndex];
    // Preserve the current path if it includes a feature (for databank-details)
    let path = window.location.pathname;
    if (screenName === 'databank-details') {
        // If current path has a feature, keep it; otherwise use base path
        if (!path.startsWith('/project/') || path === '/project') {
            path = screenToPath[screenName] || '/project';
        }
    } else {
        path = screenToPath[screenName] || '/';
    }
    const title = document.querySelector(`nav a[data-screen="${screenName}"]`)?.textContent || 'Portfolio';
    
    // Get feature index if on databank-details with a feature path
    let featureIndex = null;
    if (screenName === 'databank-details' && typeof getFeatureFromUrl === 'function') {
        featureIndex = getFeatureFromUrl();
    }
    
    window.history.replaceState({ 
        screen: screenName, 
        index: initialIndex,
        featureIndex: featureIndex 
    }, title, path);
    console.log('[DEBUG] Set history state:', { screen: screenName, index: initialIndex, path, featureIndex });

    // On mobile, ensure only the initial section is visible
    const isMobile = window.innerWidth <= 768;
    console.log('[DEBUG] Is mobile?', isMobile, 'Window width:', window.innerWidth);
    
    if (isMobile) {
        const initialSection = document.getElementById(screens[initialIndex]);
        console.log('[DEBUG] Initial section element:', initialSection);
        console.log('[DEBUG] All sections:', document.querySelectorAll('section'));
        
        document.querySelectorAll('section').forEach(section => {
            const shouldShow = section.id === screens[initialIndex];
            console.log(`[DEBUG] Section ${section.id}: display = ${shouldShow ? 'block' : 'none'}`);
            if (section.id !== screens[initialIndex]) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
                console.log(`[DEBUG] Set ${section.id} to block. Computed display:`, window.getComputedStyle(section).display);
            }
        });
        
        // Verify the initial section is visible
        const checkSection = document.getElementById(screens[initialIndex]);
        if (checkSection) {
            const computedStyle = window.getComputedStyle(checkSection);
            console.log('[DEBUG] Initial section final state:', {
                id: checkSection.id,
                display: checkSection.style.display,
                computedDisplay: computedStyle.display,
                opacity: computedStyle.opacity,
                visibility: computedStyle.visibility,
                hasActiveClass: checkSection.classList.contains('active')
            });
        }
    }

    // Show the correct screen (don't update URL since we just set it)
    console.log('[DEBUG] Calling showScreen with index:', initialIndex);
    showScreen(initialIndex, false);
    
    // If on databank-details screen, check for feature in URL
    if (screens[initialIndex] === 'databank-details' && typeof getFeatureFromUrl === 'function') {
        setTimeout(() => {
            const featureIndex = getFeatureFromUrl();
            if (featureIndex !== null && typeof showFeature === 'function') {
                showFeature(featureIndex, false); // Don't update URL, we're initializing from it
            }
        }, 150);
    }
    
    console.log('[DEBUG] Navigation initialization complete');
});

// Hamburger Menu Functionality
function initHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Initialize hamburger menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { screens, currentScreenIndex, showScreen, goToScreen, nextScreen, prevScreen };
}


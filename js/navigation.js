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
    const currentScreen = document.getElementById(screens[index]);
    if (!currentScreen) return;

    const screenName = screens[index];
    
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

    // Mark that we're in transition - this prevents scroll during slide-in
    let isTransitioning = true;
    console.log(`[Navigation] Transition started for ${screenName}`);

    // Add active class to current screen
    currentScreen.classList.add('active');
    console.log(`[Navigation] Added 'active' class to ${screenName}`);

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

        // Use History API for http/https protocols
        const path = screenToPath[screenName] || '/';
        window.history.pushState({ screen: screenName, index: index }, title, path);
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
    // Use pathname for http/https protocols
    const path = window.location.pathname;
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
    } else {
        // Fallback: read from current URL
        const index = getScreenFromUrl();
        currentScreenIndex = index;
        showScreen(index, false);
    }
});

// Navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Update navigation links to use proper hrefs
    document.querySelectorAll('a[data-screen]').forEach(link => {
        const screenName = link.getAttribute('data-screen');

        // Use path for http/https protocols
        const path = screenToPath[screenName] || '/';
        link.href = path;

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

    // Set initial state for browser history
    const screenName = screens[initialIndex];
    const path = screenToPath[screenName] || '/';
    const title = document.querySelector(`nav a[data-screen="${screenName}"]`)?.textContent || 'Portfolio';
    window.history.replaceState({ screen: screenName, index: initialIndex }, title, path);

    // Show the correct screen (don't update URL since we just set it)
    showScreen(initialIndex, false);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { screens, currentScreenIndex, showScreen, goToScreen, nextScreen, prevScreen };
}


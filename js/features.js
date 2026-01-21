// Feature Subscreens Navigation
const features = ['overview', 'backoffice', 'website', 'mobile-app'];
let currentFeatureIndex = 0;

// Initialize in-page sidebar navigation on the databank-details screen.
// Note: Hash changes can trigger the app's router (popstate) which resets scroll.
// We prevent default and scroll programmatically instead.
function initializeDatabankDetailsSidebar() {
    const databankScreen = document.getElementById('databank-details');
    if (!databankScreen) return;

    const links = Array.from(databankScreen.querySelectorAll('.sidebar-link[href^="#db-"]'));
    if (!links.length) return;

    const getTopNavOffset = () => {
        // Main site navbar (fixed at top)
        const topNav = document.querySelector('nav');
        if (!topNav) return 0;
        const rect = topNav.getBoundingClientRect();
        // Small extra breathing room so headings never touch the nav
        return Math.ceil(rect.height + 12);
    };

    const scrollToTarget = (targetEl, behavior = 'smooth') => {
        if (!targetEl) return;

        // We scroll the databank screen itself (it is the scroll container)
        const container = databankScreen;
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();

        const targetTopInContainer = (targetRect.top - containerRect.top) + container.scrollTop;
        const offset = getTopNavOffset();
        const nextTop = Math.max(0, targetTopInContainer - offset);

        container.scrollTo({ top: nextTop, behavior });
    };

    // Replace nodes to remove any existing listeners (mirrors feature button init strategy)
    links.forEach((link) => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });

    const refreshedLinks = Array.from(databankScreen.querySelectorAll('.sidebar-link[href^="#db-"]'));

    const setActive = (activeLink) => {
        refreshedLinks.forEach((l) => l.classList.toggle('active', l === activeLink));
    };

    // Scrollspy: update active tile while scrolling inside databank-details
    if (databankScreen.dataset.dbScrollSpyInit !== '1') {
        databankScreen.dataset.dbScrollSpyInit = '1';

        const sectionIds = ['db-overview', 'db-backoffice', 'db-website', 'db-mobile'];

        const getSections = () =>
            sectionIds
                .map((id) => databankScreen.querySelector(`#${CSS.escape(id)}`))
                .filter(Boolean);

        let rafPending = false;

        const updateActiveFromScroll = () => {
            rafPending = false;
            if (!databankScreen.classList.contains('active')) return;

            const offset = getTopNavOffset();
            const containerRect = databankScreen.getBoundingClientRect();
            const sections = getSections();
            if (!sections.length) return;

            // Pick the last section whose top is above the navbar offset line
            let bestSection = sections[0];
            let bestTop = -Infinity;

            for (const section of sections) {
                const r = section.getBoundingClientRect();
                const topInContainer = (r.top - containerRect.top) + databankScreen.scrollTop;
                const delta = topInContainer - databankScreen.scrollTop - offset;
                if (delta <= 12 && topInContainer > bestTop) {
                    bestTop = topInContainer;
                    bestSection = section;
                }
            }

            const activeHref = `#${bestSection.id}`;
            const activeLink = refreshedLinks.find((l) => l.getAttribute('href') === activeHref);
            if (activeLink) setActive(activeLink);
        };

        const onScroll = () => {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(updateActiveFromScroll);
        };

        databankScreen.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        // Initial sync (after transition)
        setTimeout(onScroll, 900);
    }

    refreshedLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        const targetId = href.startsWith('#') ? href.slice(1) : null;
        if (!targetId) return;

        const target = databankScreen.querySelector(`#${CSS.escape(targetId)}`);
        if (!target) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            setActive(link);
            scrollToTarget(target, 'smooth');
        });
    });

    const deferScroll = (targetEl, activeHref) => {
        if (!targetEl) return;
        // Only perform once per initialization cycle
        if (databankScreen.dataset.dbDeferredScrollDone === '1') return;
        databankScreen.dataset.dbDeferredScrollDone = '1';

        setTimeout(() => {
            // The databank screen may not have become active yet when we init
            if (!databankScreen.classList.contains('active')) return;
            if (activeHref) {
                const activeLink = refreshedLinks.find((l) => l.getAttribute('href') === activeHref);
                if (activeLink) setActive(activeLink);
            }
            scrollToTarget(targetEl, 'smooth');
        }, 900);
    };

    // If user lands with a hash, scroll after the section transition completes.
    if (location.hash && location.hash.startsWith('#db-')) {
        const target = databankScreen.querySelector(location.hash);
        deferScroll(target, location.hash);
        return;
    }

    // Support deep links like /databank/backoffice by scrolling to the matching section.
    const match = window.location.pathname.match(/^\/databank\/(.+)$/);
    if (match) {
        const featureName = match[1];
        const featureToSectionId = {
            overview: 'db-overview',
            backoffice: 'db-backoffice',
            website: 'db-website',
            'mobile-app': 'db-mobile'
        };
        const sectionId = featureToSectionId[featureName];
        if (sectionId) {
            const target = databankScreen.querySelector(`#${CSS.escape(sectionId)}`);
            deferScroll(target, `#${sectionId}`);
        }
    }
}

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

    // Initialize databank in-page sidebar navigation (if present)
    initializeDatabankDetailsSidebar();
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


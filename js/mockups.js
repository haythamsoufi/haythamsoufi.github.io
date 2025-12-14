// Fullscreen Mockup Modal
function openMockupFullscreen(mockupElement) {
    const fullscreen = document.getElementById('mockupFullscreen');
    if (!fullscreen) return;
    
    const content = fullscreen.querySelector('.mockup-fullscreen-content');
    if (!content) return;
    
    // Clone the mockup
    const clonedMockup = mockupElement.cloneNode(true);
    const laptop3d = clonedMockup.querySelector('.laptop-mockup-3d');
    const phone3d = clonedMockup.querySelector('.phone-mockup-3d');
    if (laptop3d) {
        laptop3d.style.transform = 'rotateX(5deg) rotateY(8deg) rotateZ(0deg) scale(0.85)';
    }
    if (phone3d) {
        phone3d.style.transform = 'rotateX(5deg) rotateY(8deg) rotateZ(0deg) scale(0.6)';
    }
    
    // Find the image element
    const screenContent = clonedMockup.querySelector('.laptop-screen-content, .phone-screen-content');
    const screen = clonedMockup.querySelector('.laptop-screen, .phone-screen');
    
    // Clear previous content and classes
    const existingMockup = content.querySelector('.laptop-mockup, .phone-mockup');
    if (existingMockup) {
        existingMockup.remove();
    }
    content.classList.remove('has-phone-mockup', 'has-laptop-mockup');
    
    // Add class to content based on mockup type
    if (phone3d) {
        content.classList.add('has-phone-mockup');
    } else if (laptop3d) {
        content.classList.add('has-laptop-mockup');
    }
    
    // Add cloned mockup
    content.appendChild(clonedMockup);
    
    // Adjust aspect ratio based on image
    if (screenContent && screen) {
        const img = new Image();
        img.onload = function() {
            const imageAspectRatio = img.naturalWidth / img.naturalHeight;
            // Set the screen's aspect ratio to match the image
            screen.style.aspectRatio = `${imageAspectRatio} / 1`;
            // Ensure object-fit is contain to show full image
            if (screenContent) {
                screenContent.style.objectFit = 'contain';
            }
        };
        img.onerror = function() {
            // If image fails to load, use default aspect ratio
            if (screen.classList.contains('laptop-screen')) {
                screen.style.aspectRatio = '16 / 10';
            } else if (screen.classList.contains('phone-screen')) {
                screen.style.aspectRatio = '9 / 19.5';
            }
        };
        // Set image source
        img.src = screenContent.src || screenContent.getAttribute('src');
    }
    
    // Show fullscreen
    fullscreen.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMockupFullscreen() {
    const fullscreen = document.getElementById('mockupFullscreen');
    if (!fullscreen) return;
    
    fullscreen.classList.remove('active');
    document.body.style.overflow = '';
}

// Add click handlers to laptop and phone mockups
function attachMockupClickHandlers() {
    document.querySelectorAll('.laptop-mockup, .phone-mockup').forEach(mockup => {
        // Remove existing handler if any
        const newMockup = mockup.cloneNode(true);
        mockup.parentNode.replaceChild(newMockup, mockup);
        
        newMockup.addEventListener('click', (e) => {
            e.stopPropagation();
            openMockupFullscreen(newMockup);
        });
    });
}

// Initialize mockup handlers
document.addEventListener('DOMContentLoaded', () => {
    attachMockupClickHandlers();

    // Close button
    const closeButton = document.getElementById('mockupCloseButton');
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMockupFullscreen();
        });
    }

    // Close on background click
    const fullscreen = document.getElementById('mockupFullscreen');
    if (fullscreen) {
        fullscreen.addEventListener('click', (e) => {
            if (e.target.id === 'mockupFullscreen') {
                closeMockupFullscreen();
            }
        });
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { openMockupFullscreen, closeMockupFullscreen, attachMockupClickHandlers };
}


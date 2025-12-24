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
        laptop3d.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    if (phone3d) {
        phone3d.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
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
    
    // Ensure close button is clickable and has event listener
    const closeButton = document.getElementById('mockupCloseButton');
    if (closeButton) {
        // Remove any existing listeners by cloning and replacing
        const newCloseButton = closeButton.cloneNode(true);
        closeButton.parentNode.replaceChild(newCloseButton, closeButton);
        
        // Add click handler
        newCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMockupFullscreen();
        });
    }
    
    // Add 3D tilt effect similar to hero project card (only when not zoomed)
    if (laptop3d) {
        const laptopMockup = laptop3d.closest('.laptop-mockup');
        const handleLaptopMove = (e) => {
            // Don't apply tilt if zoomed
            if (laptopMockup && laptopMockup.querySelector('.laptop-screen.zoomed')) return;
            
            const rect = laptop3d.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 250;
            const rotateY = (centerX - x) / 250;
            
            laptop3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        };
        
        const handleLaptopLeave = () => {
            // Don't reset if zoomed
            if (laptopMockup && laptopMockup.querySelector('.laptop-screen.zoomed')) return;
            laptop3d.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };
        
        laptop3d.addEventListener('mousemove', handleLaptopMove);
        laptop3d.addEventListener('mouseleave', handleLaptopLeave);
    }
    
    if (phone3d) {
        const phoneMockup = phone3d.closest('.phone-mockup');
        const handlePhoneMove = (e) => {
            // Don't apply tilt if zoomed (zoom uses scale on mockup3d)
            if (phoneMockup && phoneMockup.querySelector('.phone-screen.zoomed')) return;
            
            const rect = phone3d.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 250;
            const rotateY = (centerX - x) / 250;
            
            phone3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        };
        
        const handlePhoneLeave = () => {
            // Don't reset if zoomed
            if (phoneMockup && phoneMockup.querySelector('.phone-screen.zoomed')) return;
            phone3d.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };
        
        phone3d.addEventListener('mousemove', handlePhoneMove);
        phone3d.addEventListener('mouseleave', handlePhoneLeave);
    }
    
    // Add zoom click handler to screen content
    if (screenContent) {
        screenContent.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMockupZoom(screenContent, screen, e);
        });
    }
    
    // Also add handler to screen element
    if (screen) {
        screen.addEventListener('click', (e) => {
            e.stopPropagation();
            // If clicking on screen, use screenContent's position if available
            if (screenContent) {
                toggleMockupZoom(screenContent, screen, e);
            }
        });
    }
}

function toggleMockupZoom(screenContent, screen, event) {
    if (!screenContent || !screen) return;
    
    // Find the mockup container
    const mockup = screen.closest('.laptop-mockup, .phone-mockup');
    const mockup3d = mockup ? mockup.querySelector('.laptop-mockup-3d, .phone-mockup-3d') : null;
    
    const isZoomed = screenContent.classList.contains('zoomed');
    
    if (isZoomed) {
        // Zoom out - reset to center
        screenContent.classList.remove('zoomed');
        screen.classList.remove('zoomed');
        
        if (mockup3d) {
            // Reset the mockup container scale
            mockup3d.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            mockup3d.style.transformOrigin = 'center center';
            screenContent.style.transform = '';
            screenContent.style.transformOrigin = '';
        }
    } else {
        // Zoom in - scale the entire mockup container
        if (mockup3d) {
            screenContent.classList.add('zoomed');
            screen.classList.add('zoomed');
            
            // Calculate transform origin based on click position
            if (event) {
                const rect = mockup3d.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                mockup3d.style.transformOrigin = `${x}% ${y}%`;
            } else {
                mockup3d.style.transformOrigin = 'center center';
            }
            
            mockup3d.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(2)';
        }
    }
}

function closeMockupFullscreen() {
    const fullscreen = document.getElementById('mockupFullscreen');
    if (!fullscreen) return;
    
    // Reset zoom state
    const screenContent = fullscreen.querySelector('.laptop-screen-content.zoomed, .phone-screen-content.zoomed');
    const screen = fullscreen.querySelector('.laptop-screen.zoomed, .phone-screen.zoomed');
    const isPhoneMockup = screen && screen.classList.contains('phone-screen');
    
    if (screenContent && screen) {
        screenContent.classList.remove('zoomed');
        screen.classList.remove('zoomed');
        
        if (isPhoneMockup) {
            // For phone, the transform was applied to mockup3d, which will be reset below
            screenContent.style.transform = '';
            screenContent.style.transformOrigin = '';
        } else {
            // For laptop, reset the image scale
            screenContent.style.transform = 'scale(1)';
            screenContent.style.transformOrigin = 'center center';
        }
    }
    
    // Reset 3D tilt transform
    const laptop3d = fullscreen.querySelector('.laptop-mockup-3d');
    const phone3d = fullscreen.querySelector('.phone-mockup-3d');
    if (laptop3d) {
        laptop3d.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    if (phone3d) {
        phone3d.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    
    fullscreen.classList.remove('active');
    document.body.style.overflow = '';
}

// Adjust mockup screen aspect ratio based on image
function adjustMockupAspectRatio(mockupElement) {
    const screenContent = mockupElement.querySelector('.laptop-screen-content, .phone-screen-content');
    const screen = mockupElement.querySelector('.laptop-screen, .phone-screen');
    
    if (!screenContent || !screen) return;
    
    const img = new Image();
    img.onload = function() {
        const imageAspectRatio = img.naturalWidth / img.naturalHeight;
        // Set the screen's aspect ratio to match the image
        screen.style.aspectRatio = `${imageAspectRatio} / 1`;
        // Use contain to show full image without cropping
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

// Add click handlers to laptop and phone mockups
function attachMockupClickHandlers() {
    document.querySelectorAll('.laptop-mockup, .phone-mockup').forEach(mockup => {
        // Adjust aspect ratio for this mockup
        adjustMockupAspectRatio(mockup);
        
        // Remove existing handler if any
        const newMockup = mockup.cloneNode(true);
        mockup.parentNode.replaceChild(newMockup, mockup);
        
        // Adjust aspect ratio for the new mockup
        adjustMockupAspectRatio(newMockup);
        
        newMockup.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Check if this mockup is in the overview tab
            const overviewScreen = newMockup.closest('.feature-subscreen[data-feature="overview"]');
            if (overviewScreen) {
                // Find the image to determine which feature to navigate to
                const screenContent = newMockup.querySelector('.laptop-screen-content, .phone-screen-content');
                if (screenContent) {
                    const imgSrc = screenContent.src || screenContent.getAttribute('src') || '';
                    let featureIndex = null;
                    
                    // Map image sources to feature indices
                    if (imgSrc.includes('backoffice.jpg')) {
                        featureIndex = 1; // backoffice
                    } else if (imgSrc.includes('public-website.jpg')) {
                        featureIndex = 2; // website
                    } else if (imgSrc.includes('mobile-app.jpg')) {
                        featureIndex = 3; // mobile-app
                    }
                    
                    // Navigate to the feature if found
                    if (featureIndex !== null) {
                        if (typeof showFeature === 'function') {
                            showFeature(featureIndex, true);
                            return;
                        } else if (typeof window.showFeature === 'function') {
                            window.showFeature(featureIndex, true);
                            return;
                        }
                    }
                }
            }
            
            // Default behavior: open fullscreen
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
    const content = fullscreen ? fullscreen.querySelector('.mockup-fullscreen-content') : null;
    
    if (fullscreen) {
        fullscreen.addEventListener('click', (e) => {
            // Close if clicking on the backdrop (not on content or its children, and not on close button)
            const isCloseButton = e.target.closest('#mockupCloseButton');
            const isContent = e.target.closest('.mockup-fullscreen-content');
            
            if (!isCloseButton && !isContent) {
                closeMockupFullscreen();
            }
        });
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { openMockupFullscreen, closeMockupFullscreen, attachMockupClickHandlers };
}


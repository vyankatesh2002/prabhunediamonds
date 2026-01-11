// js/menu-card.js

document.addEventListener('DOMContentLoaded', function() {
    // Menu card elements
    const openMenuBtn = document.getElementById('openMenuBtn');
    const menuCard = document.getElementById('menuCard');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    
    // Menu card overlay
    let menuCardOverlay;
    
    // Create menu card overlay if it doesn't exist
    function createMenuCardOverlay() {
        if (!document.getElementById('menuCardOverlay')) {
            menuCardOverlay = document.createElement('div');
            menuCardOverlay.id = 'menuCardOverlay';
            menuCardOverlay.className = 'menu-card-overlay';
            document.body.appendChild(menuCardOverlay);
            
            // Close menu card when overlay is clicked
            menuCardOverlay.addEventListener('click', closeMenuCard);
        } else {
            menuCardOverlay = document.getElementById('menuCardOverlay');
        }
    }
    
    // Open menu card function
    function openMenuCard() {
        createMenuCardOverlay();
        menuCard.classList.add('active');
        menuCardOverlay.classList.add('active');
        document.body.classList.add('menu-card-open');
        
        // Add animation delay to menu card links
        const menuLinks = menuCard.querySelectorAll('.menu-card-links a');
        menuLinks.forEach((link, index) => {
            link.style.transitionDelay = `${index * 0.1}s`;
            link.classList.add('animate-in');
        });
    }
    
    // Close menu card function
    function closeMenuCard() {
        menuCard.classList.remove('active');
        if (menuCardOverlay) {
            menuCardOverlay.classList.remove('active');
        }
        document.body.classList.remove('menu-card-open');
        
        // Remove animation from menu card links
        const menuLinks = menuCard.querySelectorAll('.menu-card-links a');
        menuLinks.forEach(link => {
            link.classList.remove('animate-in');
        });
    }
    
    // Toggle menu card when open button is clicked
    if (openMenuBtn) {
        openMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openMenuCard();
        });
    }
    
    // Close menu card when close button is clicked
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenuCard);
    }
    
    // Close menu card on ESC key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuCard.classList.contains('active')) {
            closeMenuCard();
        }
    });
    
    // Close menu card when clicking outside
    document.addEventListener('click', function(e) {
        if (menuCard.classList.contains('active') && 
            !menuCard.contains(e.target) && 
            e.target !== openMenuBtn) {
            closeMenuCard();
        }
    });
    
    // Add click animation to menu card links
    const menuCardLinks = menuCard.querySelectorAll('.menu-card-links a');
    menuCardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close menu card immediately to allow navigation
            closeMenuCard();

            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(212, 175, 55, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                z-index: 1;
            `;

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuCard.classList.contains('active')) {
            closeMenuCard();
        }
    });
});
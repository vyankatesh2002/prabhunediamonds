// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    const body = document.body;

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');

        if (!isActive) {
            // Open menu
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            body.classList.add('menu-open');

            // Add animation delays to menu items
            mobileMenuLinks.forEach((link, index) => {
                link.style.setProperty('--i', index);
            });

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Close menu
            closeMobileMenu();
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');

        // Reset animation delays
        mobileMenuLinks.forEach(link => {
            link.style.removeProperty('--i');
        });

        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Event Listeners
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Close menu when clicking any link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Optional: Smooth scroll for anchor links in mobile menu
    mobileMenuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    closeMobileMenu();

                    // Smooth scroll after menu closes
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 400);
                }
            });
        }
    });
});

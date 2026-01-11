// Privacy Policy Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for table of contents links
    const tocLinks = document.querySelectorAll('.table-of-contents a[href^="#"]');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100; // Account for fixed header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight the target section briefly
                targetElement.style.transition = 'background-color 0.3s ease';
                targetElement.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 1000);
            }
        });
    });
    
    // Add animation to privacy sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all privacy sections
    const privacySections = document.querySelectorAll('.privacy-section');
    privacySections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add click tracking for external links (for analytics if needed)
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function() {
                // Could add analytics tracking here
                console.log('External link clicked:', this.href);
            });
        }
    });
    
    // Add print functionality for the privacy policy
    const printBtn = document.querySelector('.action-btn i.fa-print')?.parentElement;
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }
    
    // Add email functionality for contact
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Could add email client detection or fallback here
            console.log('Email link clicked:', this.href);
        });
    });
    
    // Add phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone link clicked:', this.href);
        });
    });
    
    // Add WhatsApp link tracking
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('WhatsApp link clicked:', this.href);
        });
    });
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #d4af37, #f4e4a6);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Add back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #d4af37, #f4e4a6);
        color: #1a1a2e;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Add loading animation for sections
    const addLoadingAnimation = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .fade-in-up {
                animation: fadeInUp 0.6s ease forwards;
            }
        `;
        document.head.appendChild(style);
    };
    
    addLoadingAnimation();
    
    // Add error handling for broken images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'images/placeholder.jpg'; // Fallback image
            this.alt = 'Image not available';
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu if open
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuOverlay = document.getElementById('menuOverlay');
            const menuCard = document.getElementById('menuCard');
            
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
            
            if (menuCard.classList.contains('active')) {
                menuCard.classList.remove('active');
            }
        }
    });
    
    // Add touch gesture support for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartY - touchEndY;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe up - could scroll to next section
                console.log('Swipe up detected');
            } else {
                // Swipe down - could scroll to previous section
                console.log('Swipe down detected');
            }
        }
    }
    
    // Add accessibility improvements
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #d4af37';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
    
    // Add performance monitoring
    const perfData = performance.getEntriesByType('navigation')[0];
    if (perfData) {
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }
    
    // Add service worker registration for caching (if needed)
    if ('serviceWorker' in navigator) {
        // Could register service worker here for offline functionality
        console.log('Service Worker supported');
    }
    
    // Add web vitals monitoring (if needed)
    if ('web-vitals' in window) {
        // Could add Core Web Vitals monitoring here
        console.log('Web Vitals available');
    }
    
    console.log('Privacy Policy page JavaScript loaded successfully');
});

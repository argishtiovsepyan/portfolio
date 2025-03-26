// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuButton.textContent = mobileMenu.classList.contains('active') ? 'Close' : 'Menu';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if it's open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        menuButton.textContent = 'Menu';
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 44, // Account for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
            } else {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            }
        });
    }
    
    // Animation on scroll with performance optimization
    let ticking = false;
    let isMobile = window.innerWidth < 768;
    
    // Throttled animation on scroll function
    const animateOnScroll = function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const sections = document.querySelectorAll('section:not(.hero-section)');
                
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                        section.style.opacity = 1;
                        section.style.transform = 'translateY(0)';
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    };
    
    // Initial setup for fade-in animations - simplified for mobile
    const setupAnimations = () => {
        const sections = document.querySelectorAll('section:not(.hero-section)');
        const transitionStyle = isMobile ? 'opacity 0.4s ease' : 'opacity 0.6s ease, transform 0.6s ease';
        const transformStyle = isMobile ? 'translateY(10px)' : 'translateY(20px)';
        
        sections.forEach(section => {
            section.style.opacity = 0;
            if (!isMobile) section.style.transform = transformStyle;
            section.style.transition = transitionStyle;
        });
    };
    
    // Check device on resize
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth < 768;
    });
    
    // Run animation setup on load
    window.addEventListener('load', function() {
        setupAnimations();
        animateOnScroll(); // Initial check
    });
    
    // Optimized scroll event
    window.addEventListener('scroll', animateOnScroll, { passive: true });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // YouTube player control
    window.onYouTubeIframeAPIReady = function() {
        const player = new YT.Player('youtubePlayer', {
            events: {
                'onReady': function(event) {
                    // Set volume to 20% when video is ready
                    event.target.setVolume(20);
                }
            }
        });
    };
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
    
    // Animation on scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial setup for fade-in animations
    document.querySelectorAll('section:not(.hero-section)').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

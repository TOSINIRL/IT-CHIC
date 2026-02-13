// ============================================
// IT CHIC TRAVELS V2.0 - INTERACTIVE FEATURES
// Advanced Animations & User Experience
// ============================================

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// ============================================
// NAVIGATION SCROLL BEHAVIOR
// ============================================
const initNavigation = () => {
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for glassmorphic effect
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ============================================
// KINETIC TYPOGRAPHY - CURSOR INTERACTION
// ============================================
const initKineticTypography = () => {
    const kineticTitle = document.getElementById('kineticTitle');
    if (!kineticTitle) return;

    const textLines = kineticTitle.querySelectorAll('.text-line');

    // Create individual letter spans for granular control
    textLines.forEach(line => {
        const text = line.textContent;
        line.innerHTML = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            span.dataset.index = index;
            line.appendChild(span);
        });
    });

    // Mouse move interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate letters based on cursor proximity
    const animateLetters = () => {
        textLines.forEach(line => {
            const letters = line.querySelectorAll('span');
            const lineRect = line.getBoundingClientRect();

            letters.forEach((letter) => {
                const letterRect = letter.getBoundingClientRect();
                const letterCenterX = letterRect.left + letterRect.width / 2;
                const letterCenterY = letterRect.top + letterRect.height / 2;

                const distanceX = mouseX - letterCenterX;
                const distanceY = mouseY - letterCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                const maxDistance = 200;
                const influence = Math.max(0, 1 - distance / maxDistance);

                const moveX = (distanceX / distance) * influence * 15;
                const moveY = (distanceY / distance) * influence * 15;

                letter.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + influence * 0.1})`;
            });
        });

        requestAnimationFrame(animateLetters);
    };

    animateLetters();
};

// ============================================
// VIDEO BACKGROUND ROTATION
// ============================================
const initVideoBackground = () => {
    const video = document.getElementById('heroVideo');
    if (!video) return;

    // Array of destination video sources
    const videoSources = [
        'assets/videos/hero-destinations.mp4',
        'assets/videos/hero-santorini.mp4',
        'assets/videos/hero-bali.mp4',
        'assets/videos/hero-morocco.mp4'
    ];

    let currentVideoIndex = 0;

    // Rotate videos every 10 seconds with smooth transition
    const rotateVideo = () => {
        const nextIndex = (currentVideoIndex + 1) % videoSources.length;

        // Fade out
        gsap.to(video, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                // Change source
                video.src = videoSources[nextIndex];
                video.load();
                video.play();
                currentVideoIndex = nextIndex;

                // Fade in
                gsap.to(video, {
                    opacity: 1,
                    duration: 1
                });
            }
        });
    };

    // Rotate every 10 seconds (Only if we have multiple valid sources)
    if (videoSources.some(src => !src.includes('hero-destinations.mp4') || src.length > 50)) {
        setInterval(rotateVideo, 10000);
    } else {
        console.log('Video rotation disabled: No external sources provided.');
    }
};

// ============================================
// SCROLL-TRIGGERED STAGGERED ANIMATIONS
// ============================================
const initScrollAnimations = () => {
    // Animate elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');

    animatedElements.forEach((element, index) => {
        const delay = element.dataset.delay || 0;

        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse',
                onEnter: () => element.classList.add('animated'),
                onLeaveBack: () => element.classList.remove('animated')
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: delay / 1000,
            ease: 'power3.out'
        });
    });

    // Parallax effect for bento images
    const bentoImages = document.querySelectorAll('.bento-image img');

    bentoImages.forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    });

    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icon');

    floatingIcons.forEach((icon, index) => {
        gsap.to(icon, {
            scrollTrigger: {
                trigger: icon,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: -20,
            rotation: 360,
            duration: 1.5,
            delay: index * 0.1,
            ease: 'elastic.out(1, 0.5)'
        });
    });
};

// ============================================
// LIQUID MOTION BUTTON EFFECTS
// ============================================
const initLiquidButtons = () => {
    const liquidButtons = document.querySelectorAll('.cta-liquid, .cta-liquid-outline');

    liquidButtons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const liquidBg = button.querySelector('.liquid-bg');
            if (!liquidBg) return;

            // Create ripple effect from cursor position
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.set(liquidBg, {
                left: `${x}px`,
                top: `${y}px`,
                xPercent: -50,
                yPercent: -50
            });
        });

        button.addEventListener('mouseleave', () => {
            const liquidBg = button.querySelector('.liquid-bg');
            if (!liquidBg) return;

            gsap.to(liquidBg, {
                left: '50%',
                top: '50%',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
};

// ============================================
// TESTIMONIALS CAROUSEL
// ============================================
const initTestimonialsCarousel = () => {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.testimonial-card');

    // Auto-scroll testimonials
    let currentIndex = 0;

    const scrollToCard = (index) => {
        cards.forEach((card, i) => {
            if (i === index) {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    };

    // Auto-rotate every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        scrollToCard(currentIndex);
    }, 5000);
};

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================
const initNewsletterForm = () => {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const input = form.querySelector('.newsletter-input');
        const button = form.querySelector('.cta-button');
        const email = input.value;

        // Validate email
        if (!email || !email.includes('@')) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Disable button during submission
        button.disabled = true;
        button.querySelector('.btn-text').textContent = 'Subscribing...';

        // Simulate API call (replace with actual endpoint)
        setTimeout(() => {
            showNotification('Thank you for subscribing! Check your inbox.', 'success');
            input.value = '';
            button.disabled = false;
            button.querySelector('.btn-text').textContent = 'Subscribe';
        }, 1500);
    });
};

// ============================================
// NOTIFICATION SYSTEM
// ============================================
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Animate out and remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
};

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const initMobileMenu = () => {
    const toggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Animate hamburger icon
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
            gsap.to(spans[0], { rotation: 45, y: 9, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.3 });
            gsap.to(spans[2], { rotation: -45, y: -9, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });
};

// ============================================
// START YOUR JOURNEY BUTTON
// ============================================
const initStartJourneyButton = () => {
    const button = document.getElementById('startJourneyBtn');
    if (!button) return;

    button.addEventListener('click', () => {
        // Scroll to contact section or open booking modal
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Open booking modal (implement as needed)
            showNotification('Booking feature coming soon!', 'info');
        }
    });
};

// ============================================
// CURSOR TRAIL EFFECT (PREMIUM TOUCH)
// ============================================
const initCursorTrail = () => {
    const trail = [];
    const trailLength = 20;

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${8 - i * 0.3}px;
            height: ${8 - i * 0.3}px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            border-radius: 50%;
            pointer-events: none;
            z-index: var(--z-tooltip);
            opacity: ${1 - i * 0.05};
            transition: transform 0.1s ease-out;
        `;
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateTrail = () => {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            dot.element.style.left = `${x - dot.element.offsetWidth / 2}px`;
            dot.element.style.top = `${y - dot.element.offsetHeight / 2}px`;

            if (index < trail.length - 1) {
                const nextDot = trail[index + 1];
                x += (nextDot.x - x) * 0.3;
                y += (nextDot.y - y) * 0.3;
            }

            dot.x = x;
            dot.y = y;
        });

        requestAnimationFrame(animateTrail);
    };

    animateTrail();
};

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
const optimizePerformance = () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Reduce animations on low-power devices
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        document.body.classList.add('reduce-motion');
    }
};

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
const init = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }

    // Initialize all features
    initNavigation();
    initKineticTypography();
    initVideoBackground();
    initScrollAnimations();
    initLiquidButtons();
    initTestimonialsCarousel();
    initNewsletterForm();
    initMobileMenu();
    initStartJourneyButton();

    // Optional premium features (can be disabled for performance)
    if (window.innerWidth > 768) {
        initCursorTrail();
    }

    optimizePerformance();

    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    console.log('🌍 IT Chic Travels v2.0 initialized successfully!');
};

// Start initialization
init();

// ============================================
// EXPORT FOR MODULE USAGE (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        initNavigation,
        initKineticTypography,
        initScrollAnimations,
        showNotification
    };
}

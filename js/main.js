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
// HERO ENTRANCE ANIMATION
// ============================================
const initHeroAnimation = () => {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const textLines = heroTitle.querySelectorAll('.text-line');

    // Reset any existing content/styles
    textLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(50px)';
    });

    // Animate lines in with a sleek, staggered reveal
    gsap.to(textLines, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
    });

    // Subtle scale breathing effect for "THE WORLD" part only after entrance
    const emphasis = heroTitle.querySelector('.emphasis');
    if (emphasis) {
        gsap.to(emphasis, {
            scale: 1.05,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 2.3 // Wait for entrance
        });
    }
};

// ============================================
// HERO BACKGROUND ROTATION (Videos & Images)
// ============================================
const initHeroBackground = () => {
    const video = document.getElementById('heroVideo');
    const imageContainer = document.getElementById('heroImage');
    const title = document.getElementById('kineticTitle');
    const subtitle = document.getElementById('heroSubtitle');
    const description = document.querySelector('.hero-description');
    
    if (!video || !imageContainer) return;

    // Array of background sources with associated content
    const backgrounds = [
        { type: 'video', src: 'assets/videos/hero-destinations.mp4', title: 'IT CHIC TRAVELS', subtitle: 'Make Memories | Reminisce | Repeat', desc: 'Embark on extraordinary journeys curated for the discerning traveler. Experience the world through a lens of luxury, authenticity, and wonder.' },
        { type: 'image', src: 'assets/images/hero-bg-oia.png', title: 'IT CHIC TRAVELS', subtitle: 'Luxury Awaits', desc: 'Discover the hidden gems of the Aegean Sea with our curated luxury itineraries.' },
        { type: 'video', src: 'assets/videos/hero-santorini.mp4', title: 'IT CHIC TRAVELS', subtitle: 'Make Memories | Reminisce | Repeat', desc: 'Experience the magic of Santorini sunsets from your private caldera villa.' },
        { type: 'image', src: 'assets/images/hero-bg-live.png', title: 'IT CHIC TRAVELS', subtitle: 'Make Memories | Reminisce | Repeat', desc: 'Reconnect with your soul in the heart of Bali\'s tropical serenity.' },
        { type: 'video', src: 'assets/videos/hero-bali.mp4', title: 'IT CHIC TRAVELS', subtitle: 'Make Memories | Reminisce | Repeat', desc: ' reconnection with your soul in the heart of Bali\'s tropical serenity.' },
        { type: 'image', src: 'assets/images/hero-bg-coast.jpg', title: 'IT CHIC TRAVELS', subtitle: 'THE WORLD', desc: 'Elegance in every destination. Discover the IT Chic way.' },
        { type: 'video', src: 'assets/videos/hero-morocco.mp4', title: 'IT CHIC TRAVELS', subtitle: 'Make Memories | Reminisce | Repeat', desc: 'From Marrakech souks to Sahara dunes, immerse yourself in Moroccan magic.' }
    ];

    let currentIndex = 0;

    const updateBackground = () => {
        const nextIndex = (currentIndex + 1) % backgrounds.length;
        const bg = backgrounds[nextIndex];

        // Fade out current content
        gsap.to([video, imageContainer, title, subtitle, description], {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                // Update visuals
                if (bg.type === 'video') {
                    video.src = bg.src;
                    video.load();
                    video.play();
                    video.style.opacity = 1;
                    imageContainer.style.opacity = 0;
                } else {
                    imageContainer.style.backgroundImage = `url(${bg.src})`;
                    imageContainer.style.opacity = 1;
                    video.style.opacity = 0;
                    video.pause();
                }

                // Update text
                if (title) title.innerHTML = `<span class="text-line">${bg.title}</span>`;
                if (subtitle) {
                    subtitle.textContent = bg.subtitle;
                    subtitle.style.display = bg.subtitle ? 'inline-block' : 'none';
                }
                if (description) description.textContent = bg.desc;

                // Fade back in
                gsap.to([bg.type === 'video' ? video : imageContainer, title, subtitle, description], {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1
                });
                
                currentIndex = nextIndex;
            }
        });
    };

    // Rotate every 10 seconds
    setInterval(updateBackground, 10000);
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
// DYNAMIC SOCIAL FEED (@itchictravels Instagram Simulation)
// ============================================
const initSocialFeed = () => {
    const feedContainer = document.getElementById('instaFeed');
    if (!feedContainer) return;

    // Simulation of recent posts from @itchictravels
    const mockPosts = [
        { 
            type: 'video', 
            url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800', 
            link: 'https://www.instagram.com/reel/DVTtb1Sjbd_/',
            views: '1.2k' 
        },
        { 
            type: 'video', 
            url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', 
            link: 'https://www.instagram.com/reel/DVL4sEnjegL/',
            views: '15.4k' 
        },
        { 
            type: 'video', 
            url: 'assets/images/social-spa-reel.png', 
            link: 'https://www.instagram.com/reel/DU8dWqiDfiB/',
            views: '948' 
        },
        { 
            type: 'video', 
            url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800', 
            link: 'https://www.instagram.com/reel/DVEPBmngNTO/',
            views: '2.1k' 
        }
    ];

    const createPostCard = (post, index) => {
        const card = document.createElement('a');
        card.href = post.link;
        card.target = '_blank';
        card.className = `social-post-card glass-card ${index === 3 ? 'h-hide-mobile' : ''}`;
        card.setAttribute('data-animate', 'fade-up');
        card.setAttribute('data-delay', index * 100);

        card.innerHTML = `
            <div class="post-media tiktok-media">
                <img src="${post.url}" alt="IT Chic Travels Social Post">
                <div class="post-overlay">
                    <span>👁️ ${post.views}</span>
                </div>
            </div>
        `;

        return card;
    };

    const updateFeed = () => {
        // Step 1: Fade out old posts
        gsap.to(feedContainer, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                feedContainer.innerHTML = '';
                
                // Step 2: Simulate fetching new content
                // We pick 4 random items to show "refresh" logic
                const displayPosts = [...mockPosts]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);

                displayPosts.forEach((post, index) => {
                    const card = createPostCard(post, index);
                    feedContainer.appendChild(card);
                });

                // Step 3: Fade back in
                gsap.to(feedContainer, {
                    opacity: 1,
                    duration: 0.8
                });

                // Re-trigger scroll animations for new elements
                if (window.ScrollTrigger) ScrollTrigger.refresh();
            }
        });
    };

    // Initial load
    updateFeed();

    // Regular Refresh: Every 1 hour 
    // This keeps the site lightweight while ensuring content stays relatively current
    setInterval(updateFeed, 3600000); 
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
// START YOUR JOURNEY BUTTON
// ============================================
const initStartJourneyButton = () => {
    const button = document.getElementById('startJourneyBtn');
    if (!button) return;

    button.addEventListener('click', () => {
        // Scroll to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
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
    initHeroAnimation();
    initHeroBackground();
    initScrollAnimations();
    initLiquidButtons();
    initTestimonialsCarousel();
    initNewsletterForm();
    initMobileMenu();
    initStartJourneyButton();
    initSocialFeed();

    // Optional premium features
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
        initHeroAnimation,
        initScrollAnimations,
        showNotification
    };
}

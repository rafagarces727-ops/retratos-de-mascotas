/* ======================================
   RETRATOS & ARTE — Landing Page Scripts
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Scroll-triggered reveal animations ──
    const revealElements = document.querySelectorAll(
        '.gallery__category, .benefit-card, .sizes__card, .sizes__cta-wrap, .process__step, .faq__item, .final-cta__content'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for grid items
                    const parent = entry.target.parentElement;
                    if (parent) {
                        const siblings = Array.from(parent.children).filter(child => 
                            child.classList.contains('reveal')
                        );
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 100}ms`;
                    }
                    
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Gallery hover parallax effect ──
    document.querySelectorAll('.gallery__item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = `scale(1.06) translate(${x * -8}px, ${y * -8}px)`;
            }
        });

        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ── FAQ accordion — close others when one opens ──
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // ── CTA button ripple effect ──
    document.querySelectorAll('.btn--primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ── WhatsApp float button — hide when near footer CTA ──
    const whatsappFloat = document.getElementById('whatsapp-float');
    const finalCtaSection = document.getElementById('cta-final');

    if (whatsappFloat && finalCtaSection) {
        const floatObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        whatsappFloat.style.opacity = '0';
                        whatsappFloat.style.pointerEvents = 'none';
                    } else {
                        whatsappFloat.style.opacity = '1';
                        whatsappFloat.style.pointerEvents = 'auto';
                    }
                });
            },
            { threshold: 0.3 }
        );

        floatObserver.observe(finalCtaSection);
    }

});

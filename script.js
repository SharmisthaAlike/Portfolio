const typingText = document.getElementById('typing-text');
const phrases = [
    "Designing Fault-Tolerant Systems",
    "Break → Analyze → Rebuild",
    "AI-Driven 5G Recovery",
    "Blockchain-Backed Infrastructure",
    "LLM-Orchestrated Workflows",
    "Low-Latency Data Replication",
    "Autonomous Decision Loops",
    "Engineering Resilience",
    "Production-Ready Systems",
    "Hardware-Integrated Control",
    "Always in my minecraft phase ⛏️"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isPaused = true;
        setTimeout(() => {
            isDeleting = true;
            isPaused = false;
            typeEffect();
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else if (!isPaused) {
        setTimeout(typeEffect, typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }
});


const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section, .fade-in').forEach(element => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 20) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        navbar.style.background = 'rgba(10, 15, 28, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(10, 15, 28, 0.8)';
    }
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--text-muted)';
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.style.color = 'var(--primary-color)';
        }
    });
});


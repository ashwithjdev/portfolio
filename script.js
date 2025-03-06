document.addEventListener('DOMContentLoaded', () => {
    // Scroll animation for sections
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateSkillBars();
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Smooth scroll for header button
    document.querySelector('.scroll-btn').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#intro').scrollIntoView({ behavior: 'smooth' });
    });

    // Skill bar animation
    function animateSkillBars() {
        const bars = document.querySelectorAll('.skill-bar');
        bars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.setProperty('--progress-width', `${progress}%`);
            bar.querySelector('::after').style.width = `${progress}%`;
        });
    }

    // Skill tooltips
    const skillItems = document.querySelectorAll('.skill-item');
    const tooltip = document.getElementById('tooltip');
    skillItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            tooltip.textContent = item.getAttribute('data-tooltip');
            tooltip.style.opacity = '1';
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY - 40}px`;
        });
        item.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });

    // Expandable expertise details
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            details.style.display = details.style.display === 'block' ? 'none' : 'block';
            button.textContent = details.style.display === 'block' ? 'Collapse' : 'Dive In';
        });
    });

    // Draggable expertise cards
    const cards = document.querySelectorAll('.expertise-card');
    cards.forEach(card => {
        let isDragging = false, startX, startY, initialX, initialY;
        card.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = card.offsetLeft;
            initialY = card.offsetTop;
            card.style.zIndex = 1000;
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            card.style.left = `${initialX + dx}px`;
            card.style.top = `${initialY + dy}px`;
            card.style.position = 'absolute';
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
            card.style.zIndex = 'auto';
        });
    });

    // Particle background
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
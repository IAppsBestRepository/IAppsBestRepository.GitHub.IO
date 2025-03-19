document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

function handleParallax() {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  parallaxElements.forEach(el => {
    const speed = el.getAttribute('data-parallax-speed') || 0.2;
    const scrollY = window.scrollY;
    const yPos = -(scrollY * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
}

function handleFadeInElements() {
  const fadeElements = document.querySelectorAll('.fade-in-element');
  
  fadeElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    if (counter.classList.contains('counted')) return;
    
    const elementTop = counter.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 1500;
      const step = Math.ceil(target / (duration / 15));
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        counter.textContent = current;
        
        if (current >= target) {
          counter.textContent = target;
          counter.classList.add('counted');
          clearInterval(timer);
        }
      }, 15);
    }
  });
}

window.addEventListener('scroll', () => {
  handleParallax();
  handleFadeInElements();
  animateCounters();
});

window.addEventListener('load', () => {
  handleParallax();
  handleFadeInElements();
  animateCounters();
});

document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    darkModeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Animate skills bars on scroll
    const skillBars = document.querySelectorAll('.skill');
    
    function animateSkills() {
        skillBars.forEach(skill => {
            const level = skill.getAttribute('data-level');
            const progressBar = skill.querySelector('.skill-progress');
            if (isElementInViewport(skill)) {
                progressBar.style.width = level + '%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on page load
    
    // Smooth scrolling for anchor links
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
    
    // Typewriter effect
    const typewriterTexts = [
        "BTech CSE Graduate",
        "Problem Solver",
        "Full Stack Developer"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.querySelector('.typewriter h2');
    
    function typeWriter() {
        const currentText = typewriterTexts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typewriterTexts.length;
            setTimeout(typeWriter, 500);
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start the typewriter effect after a delay
    setTimeout(typeWriter, 1000);
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .fade-in');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translate(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});


 function initContactForms() {
    const contactForms = document.querySelectorAll('.contact-form');
    
    if (contactForms.length) {
        contactForms.forEach(form => {
            setupForm(form);
        });
    }
}



// Form submission handler
document.querySelector('.contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
      });
      const data = await response.json();
      
      if (data.success) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        alert('Error: ' + (data.message || 'Submission failed'));
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });



  document.addEventListener('DOMContentLoaded', function() {
    // Initialize all video containers
    const videoContainers = document.querySelectorAll('.video-container');
    
    // Set thumbnails from data attributes
    videoContainers.forEach(container => {
      const thumbnail = container.getAttribute('data-thumbnail');
      container.style.backgroundImage = `url(${thumbnail})`;
      
      // Setup click handler
      container.addEventListener('click', function() {
        const video = this.querySelector('video');
        const isActive = this.classList.contains('active');
        
        // Pause all other videos
        document.querySelectorAll('.video-container.active').forEach(activeContainer => {
          if (activeContainer !== container) {
            activeContainer.classList.remove('active');
            activeContainer.querySelector('video').pause();
          }
        });
        
        // Toggle current video
        if (isActive) {
          this.classList.remove('active');
          video.pause();
        } else {
          this.classList.add('active');
          video.play().catch(e => console.log("Autoplay prevented:", e));
        }
      });
    });
  });


//   certification

document.addEventListener('DOMContentLoaded', function() {
    const certifications = document.querySelectorAll('.certification-image');
    let currentLightbox = null;
  
    certifications.forEach(cert => {
      cert.addEventListener('click', function(e) {
        // Prevent only the default image behavior
        e.preventDefault();
        
        // Don't open if lightbox already exists
        if (currentLightbox) return;
        
        const imgElement = this.querySelector('img');
        const imgSrc = imgElement.src;
        const altText = imgElement.alt;
        
        // Create lightbox
        currentLightbox = document.createElement('div');
        currentLightbox.className = 'cert-lightbox';
        currentLightbox.innerHTML = `
          <div class="lightbox-content">
            <span class="close-btn">&times;</span>
            <img src="${imgSrc}" alt="${altText}">
            <div class="lightbox-text">${altText}</div>
          </div>
        `;
        
        document.body.appendChild(currentLightbox);
        
        // Close handlers
        const closeLightbox = () => {
          document.body.removeChild(currentLightbox);
          currentLightbox = null;
        };
        
        currentLightbox.querySelector('.close-btn').addEventListener('click', closeLightbox);
        
        currentLightbox.addEventListener('click', (e) => {
          if (e.target === currentLightbox) {
            closeLightbox();
          }
        });
        
        // Close with ESC key
        const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeyDown);
          }
        };
        document.addEventListener('keydown', handleKeyDown);
      });
    });
  });



  //dp


  document.querySelector('.hero-image').addEventListener('click', function() {
    this.classList.toggle('stop-rocking');
    
    if (this.classList.contains('stop-rocking')) {
        this.style.transform = 'rotate(0deg) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg) scale(1)';
        }, 300);
    }
});


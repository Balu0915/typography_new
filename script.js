// Wait for the DOM to be fully loaded before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Current year for the footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Mobile Menu Toggle
  setupMobileMenu();
  
  // Carousel
  setupCarousel();
  
  // Tabs
  setupTabs();
  
  // Accordion
  setupAccordion();
  
  // Project Filtering
  setupProjectFiltering();
  
  // Font Modal
  setupFontModals();
  
  // Project Modal
  setupProjectModals();
  
  // Resource Modal
  setupResourceModals();
  
  // Contact Form
  setupContactForm();
  
  // Subscribe Form
  setupSubscribeForm();
  
  // Smooth Scrolling for Anchor Links
  setupSmoothScrolling();
});

// Mobile Menu Functions
function setupMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (!menuToggle || !navLinks) return;
  
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Change icon between hamburger and X
    const icon = menuToggle.querySelector('i');
    if (icon.classList.contains('bi-list')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x-lg');
    } else {
      icon.classList.remove('bi-x-lg');
      icon.classList.add('bi-list');
    }
  });
  
  // Close mobile menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('bi-x-lg');
      icon.classList.add('bi-list');
    });
  });
  
  // Update active navigation link based on scroll position
  window.addEventListener('scroll', highlightNavOnScroll);
}

function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Carousel Functions
function setupCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  
  const items = carousel.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.carousel-indicators button');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let currentIndex = 0;
  let interval;
  
  // Start automatic slide rotation
  startCarouselInterval();
  
  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      resetCarouselInterval();
    });
  });
  
  // Previous and Next button event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
      resetCarouselInterval();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
      resetCarouselInterval();
    });
  }
  
  // Reset the interval when user interacts with carousel
  function resetCarouselInterval() {
    clearInterval(interval);
    startCarouselInterval();
  }
  
  // Start automatic rotation
  function startCarouselInterval() {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    }, 5000);
  }
  
  // Update carousel display
  function updateCarousel() {
    items.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
}

// Tab Functions
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  if (tabButtons.length === 0) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all tab buttons and panes
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Add active class to clicked button and corresponding pane
      button.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
}

// Accordion Functions
function setupAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  if (accordionButtons.length === 0) return;
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const accordionItem = button.closest('.accordion-item');
      const accordionContent = accordionItem.querySelector('.accordion-content');
      
      // Toggle the collapsed class on the button
      button.classList.toggle('collapsed');
      
      // Toggle the content visibility
      if (accordionContent.style.maxHeight) {
        accordionContent.style.maxHeight = null;
        accordionContent.style.padding = '0 var(--spacing-3) 0';
      } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        accordionContent.style.padding = '0 var(--spacing-3) var(--spacing-3)';
      }
    });
  });
}

// Project Filtering Functions
function setupProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length === 0) return;
  
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Font Modal Functions
function setupFontModals() {
  const viewFontButtons = document.querySelectorAll('.view-font-details');
  if (viewFontButtons.length === 0) return;
  
  const modalContainer = document.getElementById('modalContainer');
  const modalContent = document.getElementById('modalContent');
  
  // Font data (would normally come from a database or API)
  const fonts = [
    {
      id: 1,
      name: "Playfair Display",
      description: "A sophisticated serif with dramatic thick and thin contrasts.",
      fullDescription: "Playfair Display is a transitional design. From the time of enlightenment in the late 18th century, the broad nib quills were replaced by pointed steel pens. This influenced typefaces of the period. Together with developments in printing technology, ink, and paper making, it became to design letterforms of high contrast and delicate hairlines.",
      fontFamily: "'Playfair Display', serif",
      category: "serif",
      designer: "Claus Eggers Sørensen",
      foundry: "Google Fonts",
      classification: "Serif",
      released: "2011",
      url: "https://fonts.google.com/specimen/Playfair+Display",
      weights: [
        { name: "Regular 400", value: 400, style: "normal" },
        { name: "Medium 500", value: 500, style: "normal" },
        { name: "Bold 700", value: 700, style: "normal" },
        { name: "Italic", value: 400, style: "italic" }
      ]
    },
    {
      id: 2,
      name: "Merriweather",
      description: "Designed for optimal readability on screens.",
      fullDescription: "Merriweather was designed to be a text face that is pleasant to read on screens. It features a very large x height, slightly condensed letterforms, a mild diagonal stress, sturdy serifs and open forms.",
      fontFamily: "serif",
      category: "serif",
      designer: "Eben Sorkin",
      foundry: "Google Fonts",
      classification: "Serif",
      released: "2010",
      url: "https://fonts.google.com/specimen/Merriweather",
      weights: [
        { name: "Light 300", value: 300, style: "normal" },
        { name: "Regular 400", value: 400, style: "normal" },
        { name: "Bold 700", value: 700, style: "normal" },
        { name: "Black 900", value: 900, style: "normal" }
      ]
    },
    // Add more font data as needed for the rest of the fonts
  ];
  
  viewFontButtons.forEach(button => {
    button.addEventListener('click', () => {
      const fontId = parseInt(button.getAttribute('data-font'));
      const font = fonts.find(f => f.id === fontId) || {
        name: "Font Details",
        fontFamily: "sans-serif",
        fullDescription: "Full font details not available.",
        designer: "Unknown",
        foundry: "Unknown",
        classification: "Unknown",
        released: "Unknown",
        url: "#",
        weights: []
      };
      
      // Create modal content
      modalContent.innerHTML = `
        <div class="font-modal">
          <button class="modal-close" id="modalClose">&times;</button>
          <div class="font-modal-header">
            <h2>${font.name}</h2>
          </div>
          <div class="font-modal-body">
            <div class="font-modal-row">
              <div class="font-modal-sample">
                <h3 style="font-family: ${font.fontFamily}">The quick brown fox jumps over the lazy dog.</h3>
                <p>${font.fullDescription}</p>
                
                <h4>Available Weights:</h4>
                <div class="font-weights">
                  ${font.weights.map(weight => `
                    <p style="font-family: ${font.fontFamily}; font-weight: ${weight.value}; font-style: ${weight.style}">
                      ${weight.name}: The quick brown fox jumps over the lazy dog.
                    </p>
                  `).join('')}
                </div>
              </div>
              <div class="font-modal-details">
                <div class="font-details-card">
                  <h4>Font Details</h4>
                  <ul>
                    <li><strong>Designer:</strong> ${font.designer}</li>
                    <li><strong>Foundry:</strong> ${font.foundry}</li>
                    <li><strong>Classification:</strong> ${font.classification}</li>
                    <li><strong>Released:</strong> ${font.released}</li>
                  </ul>
                  <a href="${font.url}" target="_blank" class="btn-primary">Get This Font</a>
                </div>
              </div>
            </div>
          </div>
          <div class="font-modal-footer">
            <button class="btn-outline" id="closeModalBtn">Close</button>
          </div>
        </div>
      `;
      
      // Show modal
      modalContainer.classList.add('active');
      
      // Add event listeners to close modal
      document.getElementById('modalClose').addEventListener('click', closeModal);
      document.getElementById('closeModalBtn').addEventListener('click', closeModal);
      modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
          closeModal();
        }
      });
    });
  });
  
  function closeModal() {
    modalContainer.classList.remove('active');
  }
}

// Project Modal Functions
function setupProjectModals() {
  const viewProjectButtons = document.querySelectorAll('.view-project');
  if (viewProjectButtons.length === 0) return;
  
  const modalContainer = document.getElementById('modalContainer');
  const modalContent = document.getElementById('modalContent');
  
  // Project data (would normally come from a database or API)
  const projects = [
    {
      id: 1,
      title: "Geometric Branding",
      description: "Modern branding system with geometric elements and vibrant colors.",
      fullDescription: "A comprehensive branding system that employs geometric shapes, vibrant colors, and strong typography to create a memorable and versatile identity for a tech startup.",
      category: "branding",
      image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1535974192318-3c4926e44475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
        "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
        "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80"
      ],
      designProcess: "The project began with extensive research into the client's industry and target audience. We developed a concept based on geometric abstraction that conveys innovation while maintaining approachability.",
      typography: "The identity system uses Montserrat for headlines and Nunito Sans for body text, creating a balanced contrast between geometric precision and humanist warmth.",
      colorPalette: ["#5A2F7D", "#FF6B6B", "#00C9A7", "#F8F9FA", "#343A40"],
      caseStudyUrl: "#"
    },
    // Add more project data as needed for the rest of the projects
  ];
  
  viewProjectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = parseInt(button.getAttribute('data-project'));
      const project = projects.find(p => p.id === projectId) || {
        title: "Project Details",
        image: "",
        fullDescription: "Project details not available.",
        gallery: [],
        designProcess: "",
        typography: "",
        colorPalette: [],
        caseStudyUrl: "#"
      };
      
      // Create modal content
      modalContent.innerHTML = `
        <div class="project-modal">
          <button class="modal-close" id="modalClose">&times;</button>
          <div class="project-modal-header">
            <h2>${project.title}</h2>
          </div>
          <div class="project-modal-body">
            <div class="project-modal-row">
              <div class="project-modal-gallery">
                <img src="${project.image}" alt="${project.title}" class="project-main-image">
                
                ${project.gallery.length > 0 ? `
                  <div class="project-gallery">
                    ${project.gallery.map((img, index) => `
                      <div class="gallery-item">
                        <img src="${img}" alt="${project.title} gallery ${index + 1}">
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="project-modal-details">
                <h3>Project Overview</h3>
                <p>${project.fullDescription}</p>
                
                <h4>Design Process</h4>
                <p>${project.designProcess}</p>
                
                <h4>Typography</h4>
                <p>${project.typography}</p>
                
                <h4>Color Palette</h4>
                <div class="color-palette">
                  ${project.colorPalette.map(color => `
                    <div class="color-swatch" style="background-color: ${color}" title="${color}"></div>
                  `).join('')}
                </div>
                
                <a href="${project.caseStudyUrl}" class="btn-primary case-study-btn" target="_blank">View Full Case Study</a>
              </div>
            </div>
          </div>
          <div class="project-modal-footer">
            <button class="btn-outline" id="closeModalBtn">Close</button>
          </div>
        </div>
      `;
      
      // Apply some additional styles for the modal content
      const style = document.createElement('style');
      style.textContent = `
        .project-modal { padding: 2rem; }
        .project-modal-header { margin-bottom: 1.5rem; }
        .project-modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .project-main-image { width: 100%; border-radius: 8px; margin-bottom: 1rem; }
        .project-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
        .gallery-item img { width: 100%; border-radius: 4px; height: 80px; object-fit: cover; }
        .color-palette { display: flex; gap: 0.5rem; margin: 1rem 0 1.5rem; }
        .color-swatch { width: 40px; height: 40px; border-radius: 50%; }
        .case-study-btn { margin-top: 1rem; }
        .project-modal-footer { margin-top: 1.5rem; text-align: right; }
        
        @media (max-width: 768px) {
          .project-modal-row { grid-template-columns: 1fr; }
        }
      `;
      document.head.appendChild(style);
      
      // Show modal
      modalContainer.classList.add('active');
      
      // Add event listeners to close modal
      document.getElementById('modalClose').addEventListener('click', closeModal);
      document.getElementById('closeModalBtn').addEventListener('click', closeModal);
      modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
          closeModal();
        }
      });
    });
  });
  
  function closeModal() {
    modalContainer.classList.remove('active');
  }
}

// Resource Modal Functions
function setupResourceModals() {
  const resourceButtons = document.querySelectorAll('.resource-btn');
  if (resourceButtons.length === 0) return;
  
  const modalContainer = document.getElementById('modalContainer');
  const modalContent = document.getElementById('modalContent');
  
  // Resource data (would normally come from a database or API)
  const resources = [
    {
      id: "typeTools",
      title: "Typography Tools",
      description: "Explore the best typography tools for your design projects.",
      fullDescription: "Typography is a fundamental element of design that affects readability, user experience, and brand perception. These tools will help you select, pair, and implement typefaces effectively in your projects.",
      icon: "type",
      iconBg: "primary",
      items: [
        "Google Fonts",
        "Adobe Fonts",
        "Font Pair",
        "Type Scale"
      ],
      tools: [
        {
          name: "Google Fonts",
          description: "A library of 1,000+ free licensed font families for web and desktop use.",
          url: "https://fonts.google.com/"
        },
        {
          name: "Adobe Fonts",
          description: "A subscription-based library of high-quality fonts for creative projects.",
          url: "https://fonts.adobe.com/"
        },
        {
          name: "Font Pair",
          description: "A tool for discovering beautiful Google Font combinations for your designs.",
          url: "https://fontpair.co/"
        },
        {
          name: "Type Scale",
          description: "A visual calculator to help create harmonious and balanced type scales.",
          url: "https://type-scale.com/"
        }
      ],
      tips: [
        "Limit your design to 2-3 different typefaces for cohesion.",
        "Establish a clear hierarchy with your font sizes and weights.",
        "Consider readability on different screen sizes and devices.",
        "Test your typography with real content, not just lorem ipsum.",
        "Pay attention to line height and letter spacing for optimal readability."
      ],
      resourcesUrl: "https://www.typewolf.com/resources"
    },
    // Add more resource data for the other resources
  ];
  
  resourceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const resourceId = button.getAttribute('data-resource');
      const resource = resources.find(r => r.id === resourceId) || {
        title: "Resource Details",
        fullDescription: "Resource details not available.",
        tools: [],
        tips: [],
        resourcesUrl: "#"
      };
      
      // Create modal content
      modalContent.innerHTML = `
        <div class="resource-modal">
          <button class="modal-close" id="modalClose">&times;</button>
          <div class="resource-modal-header">
            <h2>${resource.title}</h2>
          </div>
          <div class="resource-modal-body">
            <p class="resource-description">${resource.fullDescription}</p>
            
            <h3>Popular Tools</h3>
            <div class="tool-grid">
              ${resource.tools.map(tool => `
                <div class="tool-card">
                  <h4>${tool.name}</h4>
                  <p>${tool.description}</p>
                  <a href="${tool.url}" class="btn-sm" target="_blank">Visit Website</a>
                </div>
              `).join('')}
            </div>
            
            <h3>Tips for Beginners</h3>
            <ul class="resource-tips">
              ${resource.tips.map(tip => `
                <li><i class="bi bi-lightbulb-fill"></i> ${tip}</li>
              `).join('')}
            </ul>
          </div>
          <div class="resource-modal-footer">
            <button class="btn-outline" id="closeModalBtn">Close</button>
            <a href="${resource.resourcesUrl}" class="btn-primary" target="_blank">View All Resources</a>
          </div>
        </div>
      `;
      
      // Apply some additional styles for the modal content
      const style = document.createElement('style');
      style.textContent = `
        .resource-modal { padding: 2rem; }
        .resource-description { font-size: 1.1rem; margin-bottom: 1.5rem; }
        .tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; margin: 1rem 0 2rem; }
        .tool-card { padding: 1rem; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); }
        .tool-card h4 { margin-bottom: 0.5rem; }
        .tool-card p { margin-bottom: 1rem; font-size: 0.9rem; }
        .resource-tips { list-style: none; margin: 1rem 0; }
        .resource-tips li { margin-bottom: 0.5rem; display: flex; align-items: flex-start; }
        .resource-tips i { margin-right: 0.5rem; color: var(--accent-color); font-size: 1.1rem; }
        .resource-modal-footer { margin-top: 1.5rem; display: flex; justify-content: space-between; }
        
        @media (max-width: 768px) {
          .tool-grid { grid-template-columns: 1fr; }
          .resource-modal-footer { flex-direction: column; gap: 0.5rem; }
          .resource-modal-footer button, .resource-modal-footer a { width: 100%; text-align: center; }
        }
      `;
      document.head.appendChild(style);
      
      // Show modal
      modalContainer.classList.add('active');
      
      // Add event listeners to close modal
      document.getElementById('modalClose').addEventListener('click', closeModal);
      document.getElementById('closeModalBtn').addEventListener('click', closeModal);
      modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
          closeModal();
        }
      });
    });
  });
  
  function closeModal() {
    modalContainer.classList.remove('active');
  }
}

// Contact Form Functions
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    let valid = true;
    
    // Name validation
    if (name === '') {
      setError('name', 'Name is required');
      valid = false;
    } else {
      clearError('name');
    }
    
    // Email validation
    if (email === '') {
      setError('email', 'Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setError('email', 'Please enter a valid email address');
      valid = false;
    } else {
      clearError('email');
    }
    
    // Subject validation
    if (subject === '') {
      setError('subject', 'Subject is required');
      valid = false;
    } else {
      clearError('subject');
    }
    
    // Message validation
    if (message === '') {
      setError('message', 'Message is required');
      valid = false;
    } else {
      clearError('message');
    }
    
    // If form is valid, process submission
    if (valid) {
      // In a real application, this would send the form data to a server
      // For now, we'll just show a success message and reset the form
      
      // Show success toast
      showToast('Message sent successfully!', 'Thank you for reaching out. We\'ll get back to you soon.', 'success');
      
      // Reset form
      contactForm.reset();
    }
  });
  
  function setError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
    
    const inputElement = document.getElementById(field);
    if (inputElement) {
      inputElement.classList.add('error');
    }
  }
  
  function clearError(field) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
      errorElement.textContent = '';
    }
    
    const inputElement = document.getElementById(field);
    if (inputElement) {
      inputElement.classList.remove('error');
    }
  }
  
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}

// Subscribe Form Functions
function setupSubscribeForm() {
  const subscribeForm = document.getElementById('subscribeForm');
  if (!subscribeForm) return;
  
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('subscribeEmail').value.trim();
    
    // Validate email
    if (email === '') {
      showToast('Error', 'Please enter your email address', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showToast('Error', 'Please enter a valid email address', 'error');
      return;
    }
    
    // In a real application, this would send the email to a server
    // For now, we'll just show a success message and reset the form
    
    // Show success toast
    showToast('Successfully subscribed!', 'Thank you for subscribing to our newsletter.', 'success');
    
    // Reset form
    subscribeForm.reset();
  });
  
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}

// Toast Notification Functions
function showToast(title, message, type = 'success') {
  const toastContainer = document.getElementById('toastContainer');
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
  
  // Set toast content
  toast.innerHTML = `
    <div class="toast-title">${title}</div>
    <div class="toast-message">${message}</div>
  `;
  
  // Add toast to container
  toastContainer.appendChild(toast);
  
  // Remove toast after 5 seconds
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// Smooth Scrolling Functions
function setupSmoothScrolling() {
  // Get all links with hash
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default if the hash is not just '#'
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calculate offset for header height
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // If mobile menu is open, close it
          const navLinks = document.getElementById('navLinks');
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const menuToggle = document.getElementById('menuToggle');
            if (menuToggle) {
              const icon = menuToggle.querySelector('i');
              icon.classList.remove('bi-x-lg');
              icon.classList.add('bi-list');
            }
          }
        }
      }
    });
  });
}

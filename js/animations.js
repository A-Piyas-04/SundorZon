// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Create an Intersection Observer to watch for elements entering the viewport
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When the element comes into view, add the 'visible' class
          entry.target.classList.add('visible');
          // Optionally unobserve the element after animation has been triggered
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
  
    // Select all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .slide-in-right');
    
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  });
  
document.addEventListener('DOMContentLoaded', function () {
    const parallaxBanner = document.getElementById('parallax-banner');
    const parallaxBg = parallaxBanner.querySelector('.parallax-bg');
  
    function updateParallax() {
      // Calculate the offset based on scroll position (adjust factor as needed)
      const scrollTop = window.pageYOffset;
      const offset = scrollTop * 0.5;
      parallaxBg.style.transform = `translateY(${offset}px)`;
    }
  
    // Use requestAnimationFrame for smooth performance on scroll
    window.addEventListener('scroll', function () {
      requestAnimationFrame(updateParallax);
    });
  });
  
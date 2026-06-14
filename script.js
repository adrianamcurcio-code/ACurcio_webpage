const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = navLinks?.querySelectorAll('a');

mobileToggle?.addEventListener('click', () => {
  mobileToggle.classList.toggle('open');
  navLinks?.classList.toggle('open');
});

navAnchors?.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    mobileToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
  });
});

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => observer.observe(element));

// Counter animation for stats block
const statsBlock = document.getElementById('statsBlock');
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

if (statsBlock) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  counterObserver.observe(statsBlock);

  function animateCounters() {
    statNumbers.forEach((element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const suffix = element.getAttribute('data-suffix') || '';
      const noCount = element.getAttribute('data-no-count') === 'true';

      if (noCount) {
        // Fade in animation for "Countless"
        element.style.opacity = '0';
        setTimeout(() => {
          element.style.transition = 'opacity 0.6s ease';
          element.style.opacity = '1';
        }, 50);
      } else {
        // Count up animation
        const duration = 1800; // 1.8 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const startTime = Date.now();

        function updateNumber() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          current = Math.floor(progress * target);

          element.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            element.textContent = target + suffix;
          }
        }

        updateNumber();
      }
    });
  }
}

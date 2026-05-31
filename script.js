const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = navLinks?.querySelectorAll('a');

mobileToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navAnchors?.forEach((anchor) => {
  anchor.addEventListener('click', () => {
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

// 1. Scroll-spy for navigation
const navLinks = Array.from(document.querySelectorAll('.site-navigation a[href^="#"]'));
const sections = navLinks.map(link => {
  const section = document.querySelector(link.getAttribute('href'));
  return section ? { link, section } : null;
}).filter(item => item);

if (sections.length) {
  let activeLink = null;
  const onScroll = () => {
    const viewportHeight = window.innerHeight;
    let maxVisibleRatio = 0;
    let newActiveLink = null;

    for (const { link, section } of sections) {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
      const visibleRatio = visibleHeight / section.offsetHeight;

      if (visibleRatio > maxVisibleRatio) {
        maxVisibleRatio = visibleRatio;
        newActiveLink = link;
      }
    }

    if (newActiveLink && newActiveLink !== activeLink) {
      navLinks.forEach(link => link.removeAttribute('aria-current'));
      newActiveLink.setAttribute('aria-current', 'page');
      activeLink = newActiveLink;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial check
}

// 2. Fix for refresh on hash links
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    setTimeout(() => {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
      const offset = headerHeight + 24;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const destination = targetPosition - offset;
      window.scrollTo({ top: destination, behavior: 'auto' });
    }, 100);
  }
}
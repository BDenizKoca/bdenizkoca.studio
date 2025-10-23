// Sticky header for homepage
const header = document.querySelector('[data-component="sticky-header"]');
const body = document.body;
const isHome = body.classList.contains('page-home');

if (header && isHome) {
  const threshold = 120;
  const handleScroll = () => {
    if (window.scrollY > threshold) {
      header.classList.add('is-visible');
    } else {
      header.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

const storageKey = 'preferredLanguage';
try {
  const currentLang = document.documentElement.lang || 'en';
  const storedPreference = window.localStorage.getItem(storageKey);
  const currentPath = window.location.pathname;
  const isRootPage = currentPath === '/' || currentPath === '/index.html';

  // Auto-detect language preference only on first visit to root page
  if (!storedPreference && isRootPage) {
    const browserLanguages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language];
    const wantsTurkish = browserLanguages.some(lang => lang && lang.toLowerCase().startsWith('tr'));

    if (wantsTurkish && currentLang !== 'tr') {
      window.localStorage.setItem(storageKey, 'tr');
      window.location.replace('/tr/');
    } else {
      window.localStorage.setItem(storageKey, currentLang);
    }
  }

  // Track language toggle clicks to remember user preference
  const toggleLinks = document.querySelectorAll('.language-toggle a');
  toggleLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      const targetLang = href.startsWith('/tr/') || href.startsWith('/tr') ? 'tr' : 'en';
      window.localStorage.setItem(storageKey, targetLang);
    });
  });
} catch (error) {
  // localStorage might be unavailable; fail silently
}

const headerEl = document.querySelector('.site-header');
const rootElement = document.scrollingElement || document.documentElement;
let activeScrollAnimation = null;
let ignoreNextHashChange = false;

const prefersReducedMotion = () => {
  if (window.__forceSmoothScroll === true) {
    return false;
  }

  if (typeof window.matchMedia !== 'function') {
    return false;
  }

  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (error) {
    return false;
  }
};

const normalisePath = pathname => pathname.replace(/\/index\.html$/, '/');

const resolveTargetFromHash = hash => {
  if (!hash || hash === '#') return null;
  const id = decodeURIComponent(hash.slice(1));
  return document.getElementById(id);
};

const animateScroll = destination => {
  if (prefersReducedMotion()) {
    window.scrollTo(0, destination);
    return;
  }

  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({ top: destination, behavior: 'smooth' });
    return;
  }

  if (activeScrollAnimation) {
    cancelAnimationFrame(activeScrollAnimation);
    activeScrollAnimation = null;
  }

  const startY = rootElement.scrollTop;
  const distance = destination - startY;

  if (Math.abs(distance) < 1) {
    window.scrollTo(0, destination);
    return;
  }

  const duration = Math.min(700, Math.max(200, Math.abs(distance) * 0.5));
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const startTime = performance.now();

  const step = now => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeOutCubic(progress);
    const next = startY + distance * eased;
    window.scrollTo(0, next);

    if (progress < 1) {
      activeScrollAnimation = requestAnimationFrame(step);
    } else {
      activeScrollAnimation = null;
      window.scrollTo(0, destination);
    }
  };

  activeScrollAnimation = requestAnimationFrame(step);
};

const scrollToTarget = target => {
  if (!target) return;
  const headerHeight = headerEl ? headerEl.offsetHeight : 0;
  const offset = headerHeight + 16;
  const targetRect = target.getBoundingClientRect();
  const destination = Math.max(0, targetRect.top + window.pageYOffset - offset);
  animateScroll(destination);
};

const getAnchorMeta = link => {
  const rawHref = link.getAttribute('href');
  if (!rawHref) return null;
  if (rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return null;

  let url;
  try {
    url = new URL(rawHref, window.location.href);
  } catch (error) {
    return null;
  }

  if (!url.hash) return null;
  if (url.origin !== window.location.origin) return null;

  const linkPath = normalisePath(url.pathname);
  const currentPath = normalisePath(window.location.pathname);
  if (linkPath !== currentPath) return null;

  const target = resolveTargetFromHash(url.hash);
  if (!target) return null;

  return { url, target };
};

const navigateToAnchor = meta => {
  scrollToTarget(meta.target);

  if (meta.url.hash !== window.location.hash) {
    if (history.replaceState) {
      history.replaceState(null, '', meta.url.hash);
    } else {
      ignoreNextHashChange = true;
      window.location.hash = meta.url.hash;
    }
  }
};

const handleAnchorClick = event => {
  const meta = getAnchorMeta(event.currentTarget);
  if (!meta) return;

  event.preventDefault();
  navigateToAnchor(meta);
};

const handleAnchorKeydown = event => {
  if (event.defaultPrevented) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;

  const isActivationKey = event.key === 'Enter' || event.key === ' ';
  if (!isActivationKey) return;

  const meta = getAnchorMeta(event.currentTarget);
  if (!meta) return;

  event.preventDefault();
  navigateToAnchor(meta);
};

const handleHashNavigation = () => {
  if (ignoreNextHashChange) {
    ignoreNextHashChange = false;
    return;
  }

  const target = resolveTargetFromHash(window.location.hash);
  if (!target) return;
  scrollToTarget(target);
};

const initMagneticText = (headline) => {
  if (!headline || headline.dataset.magneticProcessed === 'true') return;
  headline.dataset.magneticProcessed = 'true';

  const wrapCharacters = element => {
    if (element.querySelector('.intro-lede__char')) return;

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.textContent.trim().length ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      const words = node.textContent.split(/(\s+)/); // Split by spaces but keep them

      words.forEach(word => {
        if (/^\s+$/.test(word)) {
          // It's whitespace, keep it as text node
          fragment.appendChild(document.createTextNode(word));
        } else {
          // It's a word, wrap it in a container that prevents breaking
          const wordWrapper = document.createElement('span');
          wordWrapper.style.display = 'inline-block';
          wordWrapper.style.whiteSpace = 'nowrap';

          // Wrap each character inside the word wrapper
          for (const char of word) {
            const span = document.createElement('span');
            span.className = 'intro-lede__magnetic intro-lede__char';
            span.textContent = char;
            wordWrapper.appendChild(span);
          }

          fragment.appendChild(wordWrapper);
        }
      });

      node.parentNode.replaceChild(fragment, node);
    });
  };

  wrapCharacters(headline);

  const magnets = Array.from(headline.querySelectorAll('.intro-lede__magnetic'));
  if (!magnets.length) return;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    headline.classList.add('mobile-interactive-hint');

    // Mobile: Tap-to-burst effect
    headline.addEventListener('click', event => {
      // const rect = headline.getBoundingClientRect(); // Not used currently
      const tapX = event.clientX;
      const tapY = event.clientY;

      magnets.forEach(el => {
        const charRect = el.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2;
        const charCenterY = charRect.top + charRect.height / 2;

        const dx = charCenterX - tapX;
        const dy = charCenterY - tapY;
        const dist = Math.hypot(dx, dy);

        const burstRadius = 120;
        if (dist < burstRadius) {
          const ratio = (burstRadius - dist) / burstRadius;
          const angle = Math.atan2(dy, dx);
          const moveDist = ratio * 25;

          const tx = Math.cos(angle) * moveDist;
          const ty = Math.sin(angle) * moveDist;
          const scale = 1 + ratio * 0.4;
          const rotate = (Math.random() - 0.5) * 40 * ratio;

          // Check if the element has a CSS animation and pause it
          const wasAnimated = window.getComputedStyle(el).animationName !== 'none';
          if (wasAnimated) {
            el.style.animation = 'none';
          }

          // Apply the transform instantly
          el.style.transition = 'none';
          el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rotate}deg)`;

          // Slowly transition back to the original state
          setTimeout(() => {
            el.style.transition = 'transform 2000ms cubic-bezier(0.23, 1, 0.32, 1)';
            el.style.transform = 'translate(0, 0) scale(1) rotate(0)';

            // After transition, remove inline styles to let CSS animation resume
            el.addEventListener('transitionend', () => {
              el.style.transition = '';
              el.style.transform = '';
              if (wasAnimated) {
                el.style.animation = '';
              }
            }, { once: true });
          }, 0);
        }
      });
    });
  } else {
    // Desktop: Original magnetic hover effect
    const innerRadius = 90;
    const outerRadius = 250;
    const translationStrength = 0.6;
    const scaleStrength = 0.35;
    const rotationStrength = 24;
    const lerpFactor = 0.12;
    let pointerX = 0;
    let pointerY = 0;
    let animationId = null;

    const cachePositions = () => {
      magnets.forEach(el => {
        const rect = el.getBoundingClientRect();
        el.__magnetic = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      });
    };

    magnets.forEach((el) => {
      el.__float = {
        amplitude: 3 + Math.random() * 3.5,
        frequency: 0.0004 + Math.random() * 0.0002,
        rotateAmplitude: 2.5 + Math.random() * 3,
        rotateFrequency: 0.0003 + Math.random() * 0.00015,
        phaseOffset: Math.random() * Math.PI * 2,
        horizontalDrift: (Math.random() - 0.5) * 2
      };
      el.__current = { x: 0, y: 0, scale: 1, rotate: 0 };
    });

    const lerp = (start, end, factor) => start + (end - start) * factor;
    let isHovering = false;

    const applyDistanceField = (timestamp) => {
      const t = timestamp;
      let hasMovement = false;

      magnets.forEach(el => {
        const data = el.__magnetic;
        const float = el.__float;
        const current = el.__current;
        if (!data || !float || !current) return;

        const dx = pointerX - data.x;
        const dy = pointerY - data.y;
        const dist = Math.hypot(dx, dy);

        let targetX = 0, targetY = 0, targetScale = 1, targetRotate = 0;

        if (dist < innerRadius) {
          const ratio = (innerRadius - dist) / innerRadius;
          const moveX = -dx * translationStrength * ratio;
          const moveY = -dy * translationStrength * ratio;
          const scale = 1 + scaleStrength * ratio;
          const rotate = rotationStrength * ratio * Math.max(-1, Math.min(1, dx / innerRadius));
          
          const floatIntensity = ratio * 0.4;
          const floatY = Math.sin(t * float.frequency + float.phaseOffset * 1000) * float.amplitude * floatIntensity;
          const floatX = Math.sin(t * float.frequency * 0.7 + float.phaseOffset * 1000) * float.horizontalDrift * floatIntensity;
          const floatRotate = Math.sin(t * float.rotateFrequency + float.phaseOffset * 1000) * float.rotateAmplitude * floatIntensity;

          targetX = moveX + floatX;
          targetY = moveY + floatY;
          targetScale = scale;
          targetRotate = rotate + floatRotate;
        } else if (dist < outerRadius) {
          const fadeRatio = 1 - (dist - innerRadius) / (outerRadius - innerRadius);
          const smoothFade = fadeRatio * fadeRatio * (3 - 2 * fadeRatio);
          
          const floatY = Math.sin(t * float.frequency + float.phaseOffset * 1000) * float.amplitude * smoothFade;
          const floatX = Math.sin(t * float.frequency * 0.7 + float.phaseOffset * 1000) * float.horizontalDrift * smoothFade;
          const floatRotate = Math.sin(t * float.rotateFrequency + float.phaseOffset * 1000) * float.rotateAmplitude * smoothFade;
          const floatScale = 1 + Math.sin(t * float.frequency * 0.5 + float.phaseOffset * 1000) * 0.02 * smoothFade;

          targetX = floatX;
          targetY = floatY;
          targetScale = floatScale;
          targetRotate = floatRotate;
        } else {
          targetX = 0;
          targetY = 0;
          targetScale = 1;
          targetRotate = 0;
        }

        current.x = lerp(current.x, targetX, lerpFactor);
        current.y = lerp(current.y, targetY, lerpFactor);
        current.scale = lerp(current.scale, targetScale, lerpFactor);
        current.rotate = lerp(current.rotate, targetRotate, lerpFactor);

        const isMoving = Math.abs(current.x - targetX) > 0.1 || Math.abs(current.y - targetY) > 0.1 || Math.abs(current.scale - targetScale) > 0.001 || Math.abs(current.rotate - targetRotate) > 0.1;
        if (isMoving) hasMovement = true;

        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) scale(${current.scale}) rotate(${current.rotate}deg)`;
      });

      if (isHovering || hasMovement) {
        animationId = requestAnimationFrame(applyDistanceField);
      } else {
        animationId = null;
      }
    };

    const handlePointerMove = event => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const handlePointerEnter = event => {
      isHovering = true;
      pointerX = event.clientX;
      pointerY = event.clientY;
      cachePositions();
      if (!animationId) {
        animationId = requestAnimationFrame(applyDistanceField);
      }
    };

    const handlePointerLeave = () => {
      isHovering = false;
      pointerX = -9999;
      pointerY = -9999;
      if (!animationId) {
        animationId = requestAnimationFrame(applyDistanceField);
      }
    };

    cachePositions();
    const resizeObserver = new ResizeObserver(cachePositions);
    resizeObserver.observe(headline);

    headline.addEventListener('pointerenter', handlePointerEnter);
    headline.addEventListener('pointermove', handlePointerMove);
    headline.addEventListener('pointerleave', handlePointerLeave);
  }
};

// Apply magnetic effect to multiple elements
const initAllMagneticEffects = () => {
  // Homepage intro headline
  if (isHome) {
    const homeHeadline = document.querySelector('.intro-lede--headline');
    if (homeHeadline) {
      initMagneticText(homeHeadline);
    }
  }

  // Page hero titles (notes, projects, about pages)
  const heroTitle = document.querySelector('.page-hero__title');
  if (heroTitle) {
    initMagneticText(heroTitle);
  }

  // Article hero titles (individual note/project pages)
  const articleHero = document.querySelector('.article-hero h1');
  if (articleHero) {
    initMagneticText(articleHero);
  }

  // Hub page titles (collection pages like /notes/, /projects/)
  const pageHeadingTitle = document.querySelector('.page-heading--standalone h1');
  if (pageHeadingTitle) {
    initMagneticText(pageHeadingTitle);
  }

  // About/longform page titles
  const longformTitle = document.querySelector('.longform-article h1');
  if (longformTitle) {
    initMagneticText(longformTitle);
  }

  // 404 page quote
  const notFoundQuote = document.querySelector('.not-found-quote-text');
  if (notFoundQuote) {
    initMagneticText(notFoundQuote);
  }
};

const samePageAnchors = Array.from(document.querySelectorAll('a[href*="#"]'));
samePageAnchors.forEach(link => {
  if (!getAnchorMeta(link)) return;
  link.addEventListener('click', handleAnchorClick, { passive: false });
  link.addEventListener('keydown', handleAnchorKeydown);
});

initAllMagneticEffects();
window.addEventListener('hashchange', handleHashNavigation);
window.addEventListener('load', handleHashNavigation);

// Project page header animation
const projectHeader = document.querySelector('.project-header');
if (projectHeader) {
  setTimeout(() => {
    projectHeader.classList.add('is-visible');
  }, 100);
}

// Project page magnetic effect
const projectHeaderTitle = document.querySelector('.project-header h1');
if (projectHeaderTitle) {
initMagneticText(projectHeaderTitle);
}

if (import.meta.env.CLIENT) {
  import(/* @vite-ignore */ 'virtual:pwa-register').then(({ registerSW }) => {
    registerSW({
      onNeedRefresh() {
        if (confirm("New content available, reload?")) {
          location.reload();
        }
      },
      onOfflineReady() {
        console.log("Ready to work offline");
      },
    });
  });
}

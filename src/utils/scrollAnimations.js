/**
 * Reusable scroll animation utility for Astro components
 * Provides intersection observer-based animations with performance optimization
 */

export class ScrollAnimationController {
  constructor(config = {}) {
    this.config = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...config
    };
    
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersect(entries),
      this.config
    );
    
    this.animationHandlers = new Map();
    this.init();
  }

  /**
   * Register animation handlers for different animation types
   */
  registerHandler(animationType, handler) {
    this.animationHandlers.set(animationType, handler);
  }

  /**
   * Register multiple handlers at once
   */
  registerHandlers(handlers) {
    Object.entries(handlers).forEach(([type, handler]) => {
      this.registerHandler(type, handler);
    });
  }

  /**
   * Handle intersection observer entries
   */
  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animate;
        
        if (this.animationHandlers.has(animationType)) {
          this.animationHandlers.get(animationType)(element);
        } else {
          // Fallback to generic animation
          this.genericFadeIn(element);
        }
        
        this.observer.unobserve(element);
      }
    });
  }

  /**
   * Generic fade-in animation
   */
  genericFadeIn(element) {
    setTimeout(() => {
      element.classList.remove('opacity-0', 'translate-y-8', 'translate-y-4', 'translate-x-4');
    }, 100);
  }

  /**
   * Staggered animation for multiple elements
   */
  staggerElements(selector, delay = 100, animationClass = ['opacity-0', 'translate-y-4']) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.remove(...animationClass);
      }, index * delay);
    });
  }

  /**
   * Check if element is in viewport
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Initialize observer for all animated elements
   */
  init() {
    document.querySelectorAll('[data-animate]').forEach(element => {
      this.observer.observe(element);
    });
  }

  /**
   * Destroy observer (cleanup)
   */
  destroy() {
    this.observer.disconnect();
  }
}

/**
 * Common animation handlers
 */
export const commonAnimations = {
  // Header animations
  header: (element) => {
    setTimeout(() => {
      element.classList.remove('opacity-0', 'translate-y-8');
    }, 100);
  },

  // Content section animations
  'content-section': (element) => {
    setTimeout(() => {
      element.classList.remove('opacity-0', 'translate-y-8');
    }, 300);
  },

  // Grid item animations (for partner logos, cards, etc.)
  'grid-item': (element) => {
    const allGridItems = document.querySelectorAll('[data-animate="grid-item"]');
    const index = Array.from(allGridItems).indexOf(element);
    const delay = index * 100 + 200; // 200ms base delay + 100ms per item
    
    setTimeout(() => {
      element.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
    }, delay);
  },

  // List item animations
  'list-item': (element) => {
    const allListItems = document.querySelectorAll('[data-animate="list-item"]');
    const index = Array.from(allListItems).indexOf(element);
    const delay = index * 100 + 400; // 400ms base delay + 100ms per item
    
    setTimeout(() => {
      element.classList.remove('opacity-0', 'translate-x-4');
    }, delay);
  },

  // Table row animations
  'table-row': (element) => {
    const rowIndex = parseInt(element.dataset.row) || 0;
    const delay = rowIndex * 150 + 200; // 200ms base delay + 150ms per row
    
    setTimeout(() => {
      element.classList.remove('opacity-0', 'translate-y-4');
    }, delay);
  },

  // CTA section animations
  'cta-section': (element) => {
    setTimeout(() => {
      element.classList.remove('opacity-0', 'translate-y-8');
    }, 300);
  },

  // Two-column layout animations
  'text-column': (element) => {
    setTimeout(() => {
      element.classList.remove('opacity-0', 'translate-x-8');
    }, 200);
  },

  'content-column': (element) => {
    setTimeout(() => {
      element.classList.remove('opacity-0', 'translate-x-8');
      // Trigger child animations
      const gridItems = element.querySelectorAll('[data-animate="grid-item"]');
      if (gridItems.length > 0) {
        setTimeout(() => {
          gridItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
            }, index * 100);
          });
        }, 300);
      }
    }, 400);
  }
};

/**
 * Initialize animations with common handlers
 */
export function initScrollAnimations(customHandlers = {}) {
  const controller = new ScrollAnimationController();
  controller.registerHandlers({
    ...commonAnimations,
    ...customHandlers
  });
  return controller;
}

/**
 * CSS classes and styles for common animations
 */
export const animationStyles = `
  /* Base animation styles */
  [data-animate] {
    will-change: transform, opacity;
  }
  
  [data-animate]:not(.opacity-0) {
    will-change: auto;
  }

  /* Smooth transitions */
  [data-animate] {
    transform: translateZ(0); /* Force hardware acceleration */
  }

  /* Accessibility: Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    [data-animate] {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
      animation: none !important;
    }
    
    [data-animate]:hover {
      transform: scale(1);
      filter: brightness(1.05);
    }
  }
`;
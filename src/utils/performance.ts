// Performance optimizations for mobile devices

// Optimization utilities
export const reduceMotionForMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (callback: () => void, options = {}) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);
    return observer;
  }
  return null;
};

// Animation variants optimized for mobile
export const mobileOptimizedVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: reduceMotionForMobile() ? 0.2 : 0.6,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: reduceMotionForMobile() ? 0.1 : 0.3 
    }
  }
};

// Optimized motion settings
export const getMotionProps = (isMobile = false) => ({
  initial: "hidden",
  animate: "visible",
  exit: "exit",
  variants: mobileOptimizedVariants,
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: isMobile ? 0.2 : 0.6,
    ease: "easeOut"
  }
});

const performanceUtils = {
  reduceMotionForMobile,
  useIntersectionObserver,
  mobileOptimizedVariants,
  getMotionProps
};

export default performanceUtils;
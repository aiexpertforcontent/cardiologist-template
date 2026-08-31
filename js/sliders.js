/**
 * ZERO-DEPENDENCY TOUCH-SWIPE SLIDER ENGINE
 * Provides mobile touch swipe gestures, desktop mouse drag, arrow buttons,
 * and auto-adjusting responsive slide widths for Hero, Services, and Testimonials.
 */

class SwipeSlider {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.track = this.container.querySelector('.slider-track');
    this.slides = Array.from(this.track.children);
    this.prevBtn = this.container.querySelector('.slider-prev');
    this.nextBtn = this.container.querySelector('.slider-next');
    this.dotsContainer = this.container.querySelector('.slider-dots');

    this.options = {
      autoplay: options.autoplay || false,
      autoplayDelay: options.autoplayDelay || 5000,
      loop: options.loop !== undefined ? options.loop : true,
      ...options
    };

    this.currentIndex = 0;
    this.slidesVisible = 1;
    this.maxIndex = 0;
    this.touchStartX = 0;
    this.touchCurrentX = 0;
    this.isDragging = false;
    this.autoplayTimer = null;

    this.init();
  }

  init() {
    this.calculateDimensions();
    this.createDots();
    this.attachEvents();
    this.updateSlider();

    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  calculateDimensions() {
    if (!this.slides.length) return;
    const containerWidth = this.container.offsetWidth;
    const slideWidth = this.slides[0].offsetWidth;
    this.slidesVisible = Math.max(1, Math.round(containerWidth / slideWidth));
    this.maxIndex = Math.max(0, this.slides.length - this.slidesVisible);
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    const totalDots = this.maxIndex + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide group ${i + 1}`);
      dot.addEventListener('click', () => {
        this.goTo(i);
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  attachEvents() {
    // Buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Touch events
    this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.track.addEventListener('touchend', () => this.handleTouchEnd());

    // Mouse drag events (Desktop)
    this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseup', () => this.handleMouseUp());

    // Window resize
    window.addEventListener('resize', () => {
      this.calculateDimensions();
      this.createDots();
      this.updateSlider();
    });

    // Pause on hover
    if (this.options.autoplay) {
      this.container.addEventListener('mouseenter', () => this.stopAutoplay());
      this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }
  }

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchCurrentX = this.touchStartX;
    this.isDragging = true;
    this.stopAutoplay();
  }

  handleTouchMove(e) {
    if (!this.isDragging) return;
    this.touchCurrentX = e.touches[0].clientX;
  }

  handleTouchEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    const deltaX = this.touchStartX - this.touchCurrentX;
    const threshold = 40; // minimum swipe distance

    if (deltaX > threshold) {
      this.next();
    } else if (deltaX < -threshold) {
      this.prev();
    }

    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  handleMouseDown(e) {
    this.touchStartX = e.clientX;
    this.touchCurrentX = this.touchStartX;
    this.isDragging = true;
    this.track.style.cursor = 'grabbing';
    this.stopAutoplay();
  }

  handleMouseMove(e) {
    if (!this.isDragging) return;
    this.touchCurrentX = e.clientX;
  }

  handleMouseUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.style.cursor = '';
    const deltaX = this.touchStartX - this.touchCurrentX;
    const threshold = 40;

    if (deltaX > threshold) {
      this.next();
    } else if (deltaX < -threshold) {
      this.prev();
    }

    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else if (this.options.loop) {
      this.currentIndex = 0;
    }
    this.updateSlider();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.options.loop) {
      this.currentIndex = this.maxIndex;
    }
    this.updateSlider();
  }

  goTo(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    this.updateSlider();
  }

  updateSlider() {
    if (!this.slides.length) return;
    const slideWidth = this.slides[0].offsetWidth;
    const offset = -(this.currentIndex * slideWidth);
    this.track.style.transform = `translateX(${offset}px)`;

    // Update Dots
    if (this.dotsContainer) {
      const dots = Array.from(this.dotsContainer.children);
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });
    }

    // Update Buttons if not looping
    if (!this.options.loop) {
      if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
      if (this.nextBtn) this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, this.options.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
}

// Initialize all sliders on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Fullscreen Slider
  const heroSliderEl = document.getElementById('heroSlider');
  if (heroSliderEl) {
    new SwipeSlider(heroSliderEl, { autoplay: true, autoplayDelay: 6000, loop: true });
  }

  // 2. Services Multi-Card Swiper
  const servicesSliderEl = document.getElementById('servicesSlider');
  if (servicesSliderEl) {
    new SwipeSlider(servicesSliderEl, { autoplay: false, loop: true });
  }

  // 3. Testimonials Multi-Card Swiper
  const testimonialsSliderEl = document.getElementById('testimonialsSlider');
  if (testimonialsSliderEl) {
    new SwipeSlider(testimonialsSliderEl, { autoplay: true, autoplayDelay: 5000, loop: true });
  }
});

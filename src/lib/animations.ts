import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 1. Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

// 2. Set up Lenis for smooth scrolling
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Function to run animations
function runAnimations() {
  // 3. Page load animation
  gsap.to('main', { 
    opacity: 1, 
    duration: 1, 
    delay: 0.2, 
    ease: 'power2.out' 
  })

  // 4. Scroll-triggered animations
  // Kill previous ScrollTriggers to prevent memory leaks
  ScrollTrigger.getAll().forEach(t => t.kill());

  gsap.utils.toArray('.anim-fade-in-up').forEach((elem) => {
    gsap.fromTo(
      elem as HTMLElement,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem as HTMLElement,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // 5. Header scroll animation
  ScrollTrigger.create({
    start: 'top -60',
    end: 99999,
    onUpdate: (self) => {
      const header = document.querySelector('header')
      if (header) {
        if (self.direction === 1) {
          header.classList.add('scrolled')
        } else {
          header.classList.remove('scrolled')
        }
      }
    },
  })
}

// Run animations on initial page load
runAnimations();

// Rerun animations on page navigation with Astro View Transitions
document.addEventListener('astro:after-swap', runAnimations);

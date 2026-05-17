import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  menuOpen = false;
  private observer: IntersectionObserver | null = null;
  private scrollHandler: (() => void) | null = null;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (isPlatformBrowser(this.platformId)) {
      const navLinks = document.getElementById('nav-links');
      navLinks?.classList.toggle('open', this.menuOpen);
    }
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Close nav on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        this.menuOpen = false;
        document.getElementById('nav-links')?.classList.remove('open');
      });
    });

    // ── Scroll-reveal animations ─────────────────────────────────────
    const revealTargets = document.querySelectorAll<HTMLElement>(
      '.info-section, .exp-card, .edu-card, .skill-group, .project-card, .contact-section, .footer'
    );

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el, i) => {
      // JS adds the hidden class — content stays visible without JS
      el.classList.add('reveal-hidden');
      // Stagger sibling cards (every group of 3)
      el.style.transitionDelay = `${(i % 3) * 70}ms`;
      this.observer!.observe(el);
    });

    // ── Navbar scroll shadow ─────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    this.scrollHandler = () => {
      if (window.scrollY > 20) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer?.disconnect();
      if (this.scrollHandler) {
        window.removeEventListener('scroll', this.scrollHandler);
      }
    }
  }
}

import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  private platformId = inject(PLATFORM_ID);
  menuOpen = false;

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
  }
}

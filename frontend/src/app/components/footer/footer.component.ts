import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <footer class="footer-wrapper">
      <div class="container footer-inner">
        <!-- Top row: Brand & Newsletter -->
        <div class="footer-top-grid">
          <div class="footer-brand-col">
            <div class="brand-line">
              <div class="brand-aperture">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
                  <line x1="9.69" y1="8" x2="21.17" y2="8"/>
                  <line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
                  <line x1="9.69" y1="16" x2="3.95" y2="6.06"/>
                  <line x1="14.31" y1="16" x2="2.83" y2="16"/>
                  <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
                </svg>
              </div>
              <span class="footer-brand-title">LUMINA</span>
            </div>
            <p class="footer-tagline">
              An international fine-art photography gallery and editorial exhibition platform celebrating the masterly intersection of optical physics and poetic imagination.
            </p>
            <p class="quote-bresson">
              &ldquo;To photograph is to hold one&rsquo;s breath, when all faculties converge to face fleeing reality.&rdquo; &mdash; <em>Henri Cartier-Bresson</em>
            </p>
          </div>

          <div class="footer-newsletter-col glass-card">
            <span class="newsletter-tag">Private Gazette</span>
            <h4 class="newsletter-title">The Collector's Dispatch</h4>
            <p class="newsletter-desc">
              Receive private invitations to vernissages, limited archival print releases, and artist monographs.
            </p>
            <div class="newsletter-form">
              <input 
                type="email" 
                placeholder="collector@domain.com" 
                [(ngModel)]="email"
                class="newsletter-input"
              />
              <button class="btn btn-primary btn-newsletter" (click)="subscribe()">
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom row: Credits & Links -->
        <div class="footer-bottom-bar">
          <div class="copyright-text">
            &copy; 2026 LUMINA Fine Art Gallery Inc. All rights reserved across all media.
          </div>
          <div class="footer-links">
            <a href="#">Archival Standards</a>
            <a href="#">Certificate of Authenticity</a>
            <a href="#">Provenance Registry</a>
            <a href="#">Privacy Charter</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      background: #07080a;
      border-top: 1px solid var(--border-subtle);
      padding: 5rem 0 2.5rem 0;
      position: relative;
    }
    .footer-inner {
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
    }
    .footer-top-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      @media (min-width: 900px) {
        grid-template-columns: 1.2fr 1fr;
        align-items: center;
      }
    }
    .footer-brand-col {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      max-width: 520px;

      .brand-line {
        display: flex;
        align-items: center;
        gap: 0.8rem;

        .brand-aperture {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: rgba(212, 175, 55, 0.15);
          color: var(--accent-gold);
          border: 1px solid rgba(212, 175, 55, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-brand-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: #fff;
        }
      }
      .footer-tagline {
        font-size: 0.92rem;
        color: var(--text-secondary);
        line-height: 1.6;
      }
      .quote-bresson {
        font-family: var(--font-serif);
        font-size: 0.88rem;
        font-style: italic;
        color: var(--accent-gold-light);
        opacity: 0.85;
      }
    }
    .footer-newsletter-col {
      padding: 2.2rem 2.4rem;
      border-radius: var(--radius-md);

      .newsletter-tag {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        color: var(--accent-gold);
        text-transform: uppercase;
        margin-bottom: 0.4rem;
        display: block;
      }
      .newsletter-title {
        font-size: 1.4rem;
        color: #fff;
        margin-bottom: 0.6rem;
      }
      .newsletter-desc {
        font-size: 0.85rem;
        color: var(--text-secondary);
        line-height: 1.5;
        margin-bottom: 1.4rem;
      }
      .newsletter-form {
        display: flex;
        gap: 0.6rem;
        flex-direction: column;
        @media (min-width: 500px) {
          flex-direction: row;
        }

        .newsletter-input {
          flex: 1;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.7rem 1.2rem;
          color: #fff;
          font-size: 0.85rem;
          &:focus {
            border-color: var(--accent-gold);
          }
        }
        .btn-newsletter {
          padding: 0.7rem 1.6rem;
        }
      }
    }
    .footer-bottom-bar {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border-subtle);
      padding-top: 2rem;
      font-size: 0.78rem;
      color: var(--text-muted);

      @media (min-width: 768px) {
        flex-direction: row;
      }

      .footer-links {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;

        a {
          color: var(--text-muted);
          &:hover { color: var(--accent-gold); }
        }
      }
    }
  `]
})
export class FooterComponent {
  toastService = inject(ToastService);
  email = '';

  subscribe() {
    if (!this.email || !this.email.includes('@')) {
      this.toastService.warning('Please enter a valid email address.');
      return;
    }
    this.toastService.success('Thank you! You have been enrolled in The Collector’s Dispatch.');
    this.email = '';
  }
}


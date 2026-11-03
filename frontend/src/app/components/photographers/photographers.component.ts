import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { PhotographerProfile } from '../../models/photo.model';

@Component({
  selector: 'app-photographers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="photographers" class="photographers-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Featured Visionaries</span>
          <h2 class="section-title">The Master Artists</h2>
          <p class="section-desc">
            Renowned photojournalists, expedition leaders, and fine-art innovators whose work defines LUMINA's permanent exhibition.
          </p>
        </div>

        <div class="photographers-grid">
          <div *ngFor="let p of photographers" class="photographer-card glass-card">
            <div class="card-avatar-wrapper">
              <img [src]="p.avatar" [alt]="p.name" class="p-avatar-img"/>
              <span class="location-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ p.location }}
              </span>
            </div>

            <div class="p-details">
              <h3 class="p-name">{{ p.name }}</h3>
              <span class="p-role">{{ p.role }}</span>
              <p class="p-bio">{{ p.bio }}</p>

              <div class="p-awards-list">
                <div *ngFor="let award of p.awards" class="award-chip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="7"/>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                  </svg>
                  <span>{{ award }}</span>
                </div>
              </div>

              <div class="p-stats-bar">
                <div class="p-stat">
                  <span class="stat-val">{{ p.stats.photos }}</span>
                  <span class="stat-lbl">Photos</span>
                </div>
                <div class="p-stat">
                  <span class="stat-val">{{ p.stats.awards }}</span>
                  <span class="stat-lbl">Awards</span>
                </div>
                <div class="p-stat">
                  <span class="stat-val">{{ p.stats.exhibitions }}</span>
                  <span class="stat-lbl">Exhibitions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .photographers-section {
      padding: 6rem 0;
      position: relative;
    }
    .photographers-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.2rem;
      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .photographer-card {
      padding: 2.2rem 1.8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      transition: all var(--transition-smooth);

      &:hover {
        transform: translateY(-8px);
        border-color: rgba(212, 175, 55, 0.4);
        box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);

        .p-avatar-img {
          transform: scale(1.05);
          box-shadow: 0 0 25px var(--accent-gold-glow);
        }
      }
    }
    .card-avatar-wrapper {
      position: relative;
      margin-bottom: 1.5rem;

      .p-avatar-img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid var(--accent-gold);
        transition: all var(--transition-smooth);
      }
      .location-badge {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(10, 11, 14, 0.9);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-full);
        padding: 0.2rem 0.6rem;
        font-size: 0.7rem;
        color: var(--text-secondary);
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 3px;
      }
    }
    .p-details {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .p-name {
        font-size: 1.35rem;
        font-weight: 700;
        color: #fff;
        margin-bottom: 0.3rem;
      }
      .p-role {
        font-size: 0.82rem;
        color: var(--accent-gold);
        font-weight: 600;
        letter-spacing: 0.05em;
        margin-bottom: 1rem;
      }
      .p-bio {
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
    }
    .p-awards-list {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      width: 100%;
      margin-bottom: 1.5rem;

      .award-chip {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background: rgba(212, 175, 55, 0.08);
        border: 1px solid rgba(212, 175, 55, 0.2);
        color: var(--text-gold);
        padding: 0.4rem 0.75rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 500;
      }
    }
    .p-stats-bar {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      padding-top: 1.2rem;
      border-top: 1px solid var(--border-subtle);

      .p-stat {
        display: flex;
        flex-direction: column;
        .stat-val {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 800;
          color: #fff;
        }
        .stat-lbl {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
      }
    }
  `]
})
export class PhotographersComponent implements OnInit {
  galleryService = inject(GalleryService);
  photographers: PhotographerProfile[] = [];

  ngOnInit() {
    this.galleryService.getPhotographers().subscribe(data => {
      this.photographers = data;
    });
  }
}


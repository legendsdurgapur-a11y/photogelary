import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { Album } from '../../models/photo.model';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="albums" class="albums-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Curated Portfolios</span>
          <h2 class="section-title">Thematic Master Series</h2>
          <p class="section-desc">
            In-depth photographic monographs curated around singular light studies, extreme geography, and contemporary human conditions.
          </p>
        </div>

        <div class="albums-grid">
          <div 
            *ngFor="let album of albums" 
            class="album-card glass-card"
            (click)="selectAlbum(album)"
          >
            <div class="album-cover-box">
              <img [src]="album.coverImage" [alt]="album.title" class="album-cover-img" loading="lazy"/>
              <div class="album-overlay"></div>
              <span class="album-count-badge">{{ album.photoCount }} Masterworks</span>
              <span class="album-year-badge">{{ album.year }}</span>
            </div>

            <div class="album-content">
              <span class="album-category">{{ album.category }}</span>
              <h3 class="album-title">{{ album.title }}</h3>
              <p class="album-subtitle">{{ album.subtitle }}</p>
              
              <div class="album-footer">
                <span class="curator-by">Curated by <strong>{{ album.curator }}</strong></span>
                <span class="view-series-arrow">
                  <span>View Series</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .albums-section {
      padding: 6rem 0;
      background: linear-gradient(180deg, var(--bg-primary) 0%, #0d0f15 50%, var(--bg-primary) 100%);
      position: relative;
    }
    .albums-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    .album-card {
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      transition: all var(--transition-smooth);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);

      &:hover {
        transform: translateY(-8px);
        border-color: var(--accent-gold);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);

        .album-cover-img {
          transform: scale(1.1);
        }
        .view-series-arrow {
          color: var(--accent-gold);
          transform: translateX(4px);
        }
      }
    }
    .album-cover-box {
      position: relative;
      height: 240px;
      overflow: hidden;

      .album-cover-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .album-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 40%, rgba(10, 11, 14, 0.9) 100%);
      }
      .album-count-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: rgba(10, 11, 14, 0.75);
        backdrop-filter: blur(8px);
        color: #fff;
        font-size: 0.72rem;
        font-family: var(--font-mono);
        padding: 0.3rem 0.7rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--border-subtle);
      }
      .album-year-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(212, 175, 55, 0.2);
        color: var(--accent-gold);
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0.3rem 0.65rem;
        border-radius: var(--radius-full);
        border: 1px solid rgba(212, 175, 55, 0.3);
      }
    }
    .album-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;

      .album-category {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--accent-cyan);
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      .album-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.6rem;
        color: #fff;
        line-height: 1.3;
      }
      .album-subtitle {
        font-size: 0.85rem;
        color: var(--text-secondary);
        line-height: 1.5;
        margin-bottom: 1.5rem;
        flex: 1;
      }
      .album-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 1rem;
        border-top: 1px solid var(--border-subtle);
        font-size: 0.78rem;

        .curator-by {
          color: var(--text-muted);
          strong { color: var(--text-primary); }
        }
        .view-series-arrow {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-secondary);
          font-weight: 600;
          transition: all var(--transition-fast);
        }
      }
    }
  `]
})
export class AlbumsComponent implements OnInit {
  galleryService = inject(GalleryService);
  albums: Album[] = [];

  @Output() albumSelected = new EventEmitter<string>();

  ngOnInit() {
    this.galleryService.getAlbums().subscribe(data => {
      this.albums = data;
    });
  }

  selectAlbum(album: Album) {
    this.albumSelected.emit(album.category);
  }
}


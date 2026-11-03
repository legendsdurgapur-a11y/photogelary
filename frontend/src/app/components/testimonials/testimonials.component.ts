import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { Testimonial } from '../../models/photo.model';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Critical Acclaim</span>
          <h2 class="section-title">Endorsements & Patronage</h2>
          <p class="section-desc">
            Perspectives from leading international art directors, curators, and institutional collectors.
          </p>
        </div>

        <div class="testimonials-grid">
          <div *ngFor="let t of testimonials" class="testimonial-card glass-card">
            <div class="rating-stars">
              <span *ngFor="let s of [1,2,3,4,5]" class="star-icon">&#9733;</span>
            </div>
            <blockquote class="quote-text">
              "{{ t.comment }}"
            </blockquote>
            <div class="client-meta">
              <strong class="client-name">{{ t.client }}</strong>
              <span class="client-role">{{ t.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section {
      padding: 6rem 0;
      background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.04), transparent 70%);
      position: relative;
    }
    .testimonials-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .testimonial-card {
      padding: 2.2rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      transition: all var(--transition-smooth);
      position: relative;

      &::before {
        content: '"';
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        font-family: var(--font-serif);
        font-size: 5rem;
        color: rgba(212, 175, 55, 0.12);
        line-height: 1;
        pointer-events: none;
      }

      &:hover {
        transform: translateY(-6px);
        border-color: rgba(212, 175, 55, 0.4);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
      }
    }
    .rating-stars {
      display: flex;
      gap: 0.2rem;
      margin-bottom: 1.2rem;
      .star-icon {
        color: var(--accent-gold);
        font-size: 1.1rem;
      }
    }
    .quote-text {
      font-family: var(--font-serif);
      font-size: 1.15rem;
      font-style: italic;
      color: #f1f5f9;
      line-height: 1.6;
      margin-bottom: 1.8rem;
    }
    .client-meta {
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--border-subtle);
      padding-top: 1rem;

      .client-name {
        font-size: 1rem;
        color: #fff;
      }
      .client-role {
        font-size: 0.8rem;
        color: var(--accent-gold);
      }
    }
  `]
})
export class TestimonialsComponent implements OnInit {
  galleryService = inject(GalleryService);
  testimonials: Testimonial[] = [];

  ngOnInit() {
    this.galleryService.getTestimonials().subscribe(data => {
      this.testimonials = data;
    });
  }
}


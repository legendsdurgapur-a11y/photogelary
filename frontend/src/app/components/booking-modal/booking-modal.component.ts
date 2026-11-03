import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService } from '../../services/gallery.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" (click)="close.emit()">
      <div class="modal-box glass-card" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="modal-header">
          <div>
            <span class="badge badge-gold">Studio Commission</span>
            <h3 class="modal-title">Book Session or Fine Art Print</h3>
          </div>
          <button class="btn-icon" (click)="close.emit()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="modal-body-scroll">
          <p class="modal-intro">
            Commission an exclusive photographic masterwork, book a private couture session, or acquire museum-grade archival fine-art prints.
          </p>

          <!-- Service Options -->
          <div class="service-cards-row">
            <div 
              *ngFor="let s of services" 
              class="service-card"
              [class.active]="selectedService === s.id"
              (click)="selectedService = s.id"
            >
              <div class="service-icon">{{ s.icon }}</div>
              <span class="service-name">{{ s.name }}</span>
              <span class="service-price">{{ s.price }}</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label class="form-label">Full Name *</label>
              <input type="text" [(ngModel)]="name" placeholder="Lady Sarah Sterling" class="form-control" required/>
            </div>
            <div class="form-group half">
              <label class="form-label">Email Address *</label>
              <input type="email" [(ngModel)]="email" placeholder="sarah@sterling.art" class="form-control" required/>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label class="form-label">Phone / WhatsApp</label>
              <input type="tel" [(ngModel)]="phone" placeholder="+1 (555) 234-5678" class="form-control"/>
            </div>
            <div class="form-group half">
              <label class="form-label">Preferred Date / Timeline</label>
              <input type="date" [(ngModel)]="date" class="form-control"/>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Budget Tier</label>
            <select [(ngModel)]="budget" class="form-control">
              <option value="$1,500 - $3,000">$1,500 - $3,000 (Fine Art Archival Prints)</option>
              <option value="$3,000 - $7,500">$3,000 - $7,500 (Editorial & Portrait Session)</option>
              <option value="$7,500 - $20,000">$7,500 - $20,000 (Commercial Campaign & Full Curation)</option>
              <option value="$20,000+">$20,000+ (Global Expedition Commission)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Project Vision / Specific Inquiries</label>
            <textarea rows="3" [(ngModel)]="message" placeholder="Provide notes on aesthetic goals, locations, or print dimensions..." class="form-control"></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="close.emit()" [disabled]="submitting">Cancel</button>
          <button class="btn btn-primary" (click)="submitBooking()" [disabled]="submitting">
            <span *ngIf="!submitting">Dispatch Commission Inquiry</span>
            <span *ngIf="submitting">Transmitting...</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(4, 5, 8, 0.88);
      backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.3s ease-out forwards;
    }
    .modal-box {
      width: 100%;
      max-width: 680px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid var(--border-glass);
      box-shadow: var(--shadow-lg);
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid var(--border-subtle);
      .modal-title {
        font-size: 1.35rem;
        font-weight: 700;
        color: #fff;
        margin-top: 0.3rem;
      }
    }
    .modal-body-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .modal-intro {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .service-cards-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
      @media (min-width: 580px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    .service-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 1rem 0.6rem;
      text-align: center;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      transition: all var(--transition-fast);

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      &.active {
        border-color: var(--accent-gold);
        background: rgba(212, 175, 55, 0.12);
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
        .service-name { color: var(--accent-gold); }
      }
      .service-icon { font-size: 1.5rem; }
      .service-name { font-size: 0.78rem; font-weight: 700; color: #fff; }
      .service-price { font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono); }
    }
    .form-row {
      display: flex;
      gap: 1rem;
      .half { flex: 1; }
    }
    .form-label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: #cbd5e1;
      margin-bottom: 0.45rem;
    }
    .form-control {
      width: 100%;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: #fff;
      padding: 0.65rem 0.9rem;
      font-size: 0.88rem;
      &:focus {
        border-color: var(--accent-gold);
      }
    }
    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1.2rem 2rem;
      border-top: 1px solid var(--border-subtle);
    }
  `]
})
export class BookingModalComponent {
  galleryService = inject(GalleryService);
  toastService = inject(ToastService);

  @Output() close = new EventEmitter<void>();

  services = [
    { id: 'portrait', name: 'Haute Portrait', price: 'from $3,200', icon: '📷' },
    { id: 'commercial', name: 'Commercial', price: 'from $7,500', icon: '🎬' },
    { id: 'print', name: 'Fine Art Print', price: 'from $1,500', icon: '🖼️' },
    { id: 'expedition', name: 'Expedition', price: 'from $18,000', icon: '🏔️' }
  ];

  selectedService = 'portrait';
  name = '';
  email = '';
  phone = '';
  date = '';
  budget = '$3,000 - $7,500';
  message = '';
  submitting = false;

  submitBooking() {
    if (!this.name.trim() || !this.email.trim()) {
      this.toastService.warning('Please enter your name and email address.');
      return;
    }

    this.submitting = true;
    this.galleryService.submitInquiry({
      name: this.name.trim(),
      email: this.email.trim(),
      phone: this.phone.trim(),
      serviceType: this.selectedService,
      date: this.date,
      budget: this.budget,
      message: this.message.trim()
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.toastService.success('Commission inquiry received! Our representative will contact you within 24 hours.');
        this.close.emit();
      },
      error: () => {
        this.submitting = false;
        this.toastService.error('Failed to submit inquiry. Please try again.');
      }
    });
  }
}


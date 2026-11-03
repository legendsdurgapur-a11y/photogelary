import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Photo } from '../../models/photo.model';
import { GalleryService } from '../../services/gallery.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit, OnDestroy {
  @Input() photo: Photo | null = null;
  @Input() allPhotos: Photo[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  galleryService = inject(GalleryService);
  toastService = inject(ToastService);

  zoomLevel = 1;
  showSidebar = true;
  isPlayingSlideshow = false;
  private slideshowTimer: any;

  // New comment input
  commentAuthor = '';
  commentText = '';
  submittingComment = false;

  ngOnInit() {
    // Lock body scroll when modal is active
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
    this.stopSlideshow();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    } else if (event.key === 'ArrowRight') {
      this.goNext();
    } else if (event.key === 'ArrowLeft') {
      this.goPrev();
    } else if (event.key === ' ' && (event.target as HTMLElement).tagName !== 'INPUT' && (event.target as HTMLElement).tagName !== 'TEXTAREA') {
      event.preventDefault();
      this.toggleSlideshow();
    }
  }

  closeModal() {
    this.stopSlideshow();
    this.close.emit();
  }

  goNext() {
    this.zoomLevel = 1;
    this.next.emit();
  }

  goPrev() {
    this.zoomLevel = 1;
    this.prev.emit();
  }

  zoomIn() {
    if (this.zoomLevel < 2.5) {
      this.zoomLevel = Math.min(2.5, +(this.zoomLevel + 0.5).toFixed(1));
    }
  }

  zoomOut() {
    if (this.zoomLevel > 1) {
      this.zoomLevel = Math.max(1, +(this.zoomLevel - 0.5).toFixed(1));
    }
  }

  resetZoom() {
    this.zoomLevel = 1;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  toggleSlideshow() {
    this.isPlayingSlideshow = !this.isPlayingSlideshow;
    if (this.isPlayingSlideshow) {
      this.toastService.info('Slideshow started (5s intervals). Press Space to pause.');
      this.slideshowTimer = setInterval(() => {
        this.goNext();
      }, 5000);
    } else {
      this.stopSlideshow();
      this.toastService.info('Slideshow paused.');
    }
  }

  stopSlideshow() {
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
      this.slideshowTimer = null;
    }
    this.isPlayingSlideshow = false;
  }

  toggleLike() {
    if (!this.photo) return;
    this.galleryService.toggleLike(this.photo.id).subscribe({
      next: res => {
        if (this.photo) {
          this.photo.likes = res.likes;
          this.photo.isLiked = res.isLiked;
        }
        if (res.isLiked) {
          this.toastService.success('Masterpiece added to favorites!');
        } else {
          this.toastService.info('Removed from favorites.');
        }
      }
    });
  }

  sharePhoto() {
    if (!this.photo) return;
    const url = window.location.origin + '#' + this.photo.id;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.toastService.success('Fine art link copied to clipboard!');
      });
    } else {
      this.toastService.info(`Photo: ${this.photo.title}`);
    }
  }

  downloadPhoto() {
    if (!this.photo) return;
    const a = document.createElement('a');
    a.href = this.photo.imageUrl;
    a.target = '_blank';
    a.download = (this.photo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()) + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this.toastService.success('High-resolution photo opened for download.');
  }

  submitComment() {
    if (!this.photo || !this.commentText.trim()) return;
    this.submittingComment = true;
    this.galleryService.addComment(this.photo.id, this.commentAuthor, this.commentText).subscribe({
      next: newComment => {
        if (this.photo) {
          if (!this.photo.comments) this.photo.comments = [];
          this.photo.comments.unshift(newComment);
        }
        this.commentText = '';
        this.submittingComment = false;
        this.toastService.success('Artistic impression posted!');
      },
      error: () => {
        this.submittingComment = false;
        this.toastService.error('Failed to post comment.');
      }
    });
  }
}


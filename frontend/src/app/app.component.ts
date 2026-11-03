import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PhotographersComponent } from './components/photographers/photographers.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FooterComponent } from './components/footer/footer.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { UploadModalComponent } from './components/upload-modal/upload-modal.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { GalleryService } from './services/gallery.service';
import { Photo } from './models/photo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    GalleryComponent,
    AlbumsComponent,
    PhotographersComponent,
    TestimonialsComponent,
    FooterComponent,
    LightboxComponent,
    UploadModalComponent,
    BookingModalComponent,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  galleryService = inject(GalleryService);

  photos: Photo[] = [];
  selectedPhoto: Photo | null = null;
  showUploadModal = false;
  showBookingModal = false;

  ngOnInit() {
    this.galleryService.photos$.subscribe(photos => {
      this.photos = photos;
    });
    this.galleryService.loadStats().subscribe();
  }

  onSelectPhoto(photo: Photo) {
    this.selectedPhoto = photo;
  }

  closeLightbox() {
    this.selectedPhoto = null;
  }

  nextLightboxPhoto() {
    if (!this.selectedPhoto || this.photos.length === 0) return;
    const currentIndex = this.photos.findIndex(p => p.id === this.selectedPhoto!.id);
    const nextIndex = (currentIndex + 1) % this.photos.length;
    this.selectedPhoto = this.photos[nextIndex];
  }

  prevLightboxPhoto() {
    if (!this.selectedPhoto || this.photos.length === 0) return;
    const currentIndex = this.photos.findIndex(p => p.id === this.selectedPhoto!.id);
    const prevIndex = (currentIndex - 1 + this.photos.length) % this.photos.length;
    this.selectedPhoto = this.photos[prevIndex];
  }

  scrollToGallery() {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAlbums() {
    const el = document.getElementById('albums');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  onAlbumSelected(category: string) {
    this.galleryService.setCategory(category);
    this.galleryService.loadPhotos({ category }).subscribe();
    this.scrollToGallery();
  }
}

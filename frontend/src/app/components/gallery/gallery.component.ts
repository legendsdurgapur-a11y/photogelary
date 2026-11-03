import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService } from '../../services/gallery.service';
import { ToastService } from '../../services/toast.service';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  galleryService = inject(GalleryService);
  toastService = inject(ToastService);

  @Output() selectPhoto = new EventEmitter<Photo>();

  categories: string[] = [
    'All',
    'Landscape',
    'Portrait',
    'Street',
    'Architecture',
    'Wildlife',
    'Astrophotography',
    'Cinematic',
    'Drone'
  ];

  activeCategory = 'All';
  selectedOrientation = 'All';
  selectedSort = 'newest';
  viewMode: 'masonry' | 'cinematic' = 'masonry';
  searchQuery = '';
  photos: Photo[] = [];
  loading = false;

  // Floating heart animation tracking
  animatingLikes: { [id: string]: boolean } = {};

  ngOnInit() {
    this.galleryService.photos$.subscribe(photos => {
      this.photos = photos;
      this.loading = false;
    });

    this.galleryService.searchQuery$.subscribe(q => {
      this.searchQuery = q;
    });

    this.fetchPhotos();
  }

  fetchPhotos() {
    this.loading = true;
    this.galleryService.loadPhotos({
      category: this.activeCategory,
      orientation: this.selectedOrientation,
      sort: this.selectedSort,
      search: this.searchQuery
    }).subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false)
    });
  }

  selectCategory(category: string) {
    this.activeCategory = category;
    this.galleryService.setCategory(category);
    this.fetchPhotos();
  }

  onOrientationChange(orientation: string) {
    this.selectedOrientation = orientation;
    this.fetchPhotos();
  }

  onSortChange(sort: string) {
    this.selectedSort = sort;
    this.fetchPhotos();
  }

  toggleLike(photo: Photo, event: Event) {
    event.stopPropagation();
    this.animatingLikes[photo.id] = true;
    setTimeout(() => {
      delete this.animatingLikes[photo.id];
    }, 800);

    this.galleryService.toggleLike(photo.id).subscribe({
      next: res => {
        if (res.isLiked) {
          this.toastService.success(`Added "${photo.title}" to your favorites!`);
        } else {
          this.toastService.info(`Removed "${photo.title}" from favorites.`);
        }
      },
      error: () => {
        this.toastService.error('Failed to update favorite status.');
      }
    });
  }

  filterByTag(tag: string, event: Event) {
    event.stopPropagation();
    this.searchQuery = tag;
    this.galleryService.setSearchQuery(tag);
    this.fetchPhotos();
  }

  clearFilters() {
    this.activeCategory = 'All';
    this.selectedOrientation = 'All';
    this.selectedSort = 'newest';
    this.searchQuery = '';
    this.galleryService.setSearchQuery('');
    this.fetchPhotos();
  }

  openLightbox(photo: Photo) {
    this.selectPhoto.emit(photo);
  }
}


import { Component, Output, EventEmitter, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  galleryService = inject(GalleryService);

  @Output() openUpload = new EventEmitter<void>();
  @Output() openBooking = new EventEmitter<void>();

  isScrolled = false;
  mobileMenuOpen = false;
  searchQuery = '';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 40;
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.galleryService.setSearchQuery(query);
    this.galleryService.loadPhotos({ search: query }).subscribe();
  }

  clearSearch() {
    this.searchQuery = '';
    this.galleryService.setSearchQuery('');
    this.galleryService.loadPhotos().subscribe();
  }

  scrollTo(sectionId: string) {
    this.mobileMenuOpen = false;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


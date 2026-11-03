import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService } from '../../services/gallery.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent {
  galleryService = inject(GalleryService);
  toastService = inject(ToastService);

  @Output() close = new EventEmitter<void>();

  // Form model
  title = '';
  category = 'Landscape';
  photographerName = '';
  photographerLocation = '';
  description = '';
  orientation = 'landscape';
  imageUrl = '';
  tags = '';
  camera = 'Sony Alpha 7R V';
  lens = 'FE 24-70mm f/2.8 GM II';
  aperture = 'f/2.8';
  shutterSpeed = '1/500s';
  iso = '100';

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isSubmitting = false;

  categories = [
    'Landscape',
    'Portrait',
    'Street',
    'Architecture',
    'Wildlife',
    'Astrophotography',
    'Cinematic',
    'Drone'
  ];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onUrlChange(url: string) {
    if (!this.selectedFile && url.trim()) {
      this.previewUrl = url.trim();
    }
  }

  submitPhoto() {
    if (!this.title.trim()) {
      this.toastService.warning('Please enter a photo title.');
      return;
    }

    if (!this.selectedFile && !this.imageUrl.trim()) {
      this.toastService.warning('Please select an image file or provide an image URL.');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('title', this.title.trim());
    formData.append('category', this.category);
    formData.append('photographerName', this.photographerName.trim() || 'Guest Artist');
    formData.append('photographerLocation', this.photographerLocation.trim() || 'Worldwide');
    formData.append('description', this.description.trim());
    formData.append('orientation', this.orientation);
    formData.append('camera', this.camera.trim());
    formData.append('lens', this.lens.trim());
    formData.append('aperture', this.aperture.trim());
    formData.append('shutterSpeed', this.shutterSpeed.trim());
    formData.append('iso', this.iso.trim());
    formData.append('tags', this.tags.trim());

    if (this.selectedFile) {
      formData.append('photoFile', this.selectedFile);
    } else {
      formData.append('imageUrl', this.imageUrl.trim());
    }

    this.galleryService.uploadPhoto(formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastService.success(`"${this.title}" has been published to the gallery!`);
        this.close.emit();
      },
      error: err => {
        console.error('Upload error:', err);
        this.isSubmitting = false;
        this.toastService.error('Failed to publish photo. Please try again.');
      }
    });
  }
}


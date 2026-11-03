import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { Photo, Album, PhotographerProfile, Testimonial, GalleryStats, InquiryForm, Comment } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private http = inject(HttpClient);
  // Uses proxy or falls back to backend port 5000 if needed
  private apiUrl = '/api';

  private photosSubject = new BehaviorSubject<Photo[]>([]);
  photos$ = this.photosSubject.asObservable();

  private statsSubject = new BehaviorSubject<GalleryStats | null>(null);
  stats$ = this.statsSubject.asObservable();

  private activeCategorySubject = new BehaviorSubject<string>('All');
  activeCategory$ = this.activeCategorySubject.asObservable();

  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  // Load photos with optional filters
  loadPhotos(filters?: { category?: string; search?: string; orientation?: string; sort?: string; featured?: boolean }): Observable<Photo[]> {
    let params = new HttpParams();
    if (filters?.category && filters.category !== 'All') {
      params = params.set('category', filters.category);
    }
    if (filters?.search) {
      params = params.set('search', filters.search);
    }
    if (filters?.orientation && filters.orientation !== 'All') {
      params = params.set('orientation', filters.orientation);
    }
    if (filters?.sort) {
      params = params.set('sort', filters.sort);
    }
    if (filters?.featured !== undefined) {
      params = params.set('featured', String(filters.featured));
    }

    return this.http.get<Photo[]>(`${this.apiUrl}/photos`, { params }).pipe(
      tap(photos => {
        this.photosSubject.next(photos);
      }),
      catchError(err => {
        console.error('Failed to load photos from backend:', err);
        return of([]);
      })
    );
  }

  // Get photo by ID
  getPhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/photos/${id}`);
  }

  // Like a photo
  toggleLike(id: string): Observable<{ id: string; likes: number; isLiked: boolean }> {
    return this.http.post<{ id: string; likes: number; isLiked: boolean }>(`${this.apiUrl}/photos/${id}/like`, {}).pipe(
      tap(res => {
        const current = this.photosSubject.getValue();
        const updated = current.map(p => {
          if (p.id === id) {
            return { ...p, likes: res.likes, isLiked: res.isLiked };
          }
          return p;
        });
        this.photosSubject.next(updated);
      })
    );
  }

  // Add comment to a photo
  addComment(photoId: string, user: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/photos/${photoId}/comments`, { user, text }).pipe(
      tap(newComment => {
        const current = this.photosSubject.getValue();
        const updated = current.map(p => {
          if (p.id === photoId) {
            const comments = p.comments ? [newComment, ...p.comments] : [newComment];
            return { ...p, comments };
          }
          return p;
        });
        this.photosSubject.next(updated);
      })
    );
  }

  // Upload new photo (Supports FormData for files or direct JSON for URLs)
  uploadPhoto(formData: FormData): Observable<Photo> {
    return this.http.post<Photo>(`${this.apiUrl}/photos`, formData).pipe(
      tap(newPhoto => {
        const current = this.photosSubject.getValue();
        this.photosSubject.next([newPhoto, ...current]);
        this.loadStats().subscribe();
      })
    );
  }

  // Delete photo
  deletePhoto(id: string): Observable<{ message: string; photo: Photo }> {
    return this.http.delete<{ message: string; photo: Photo }>(`${this.apiUrl}/photos/${id}`).pipe(
      tap(() => {
        const current = this.photosSubject.getValue();
        this.photosSubject.next(current.filter(p => p.id !== id));
        this.loadStats().subscribe();
      })
    );
  }

  // Get albums
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums`).pipe(
      catchError(() => of([]))
    );
  }

  // Get photographers
  getPhotographers(): Observable<PhotographerProfile[]> {
    return this.http.get<PhotographerProfile[]>(`${this.apiUrl}/photographers`).pipe(
      catchError(() => of([]))
    );
  }

  // Get testimonials
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`).pipe(
      catchError(() => of([]))
    );
  }

  // Send booking / inquiry
  submitInquiry(form: InquiryForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/inquiries`, form);
  }

  // Load stats
  loadStats(): Observable<GalleryStats> {
    return this.http.get<GalleryStats>(`${this.apiUrl}/stats`).pipe(
      tap(stats => this.statsSubject.next(stats)),
      catchError(() => of({
        totalPhotos: 0,
        totalLikes: 0,
        totalViews: 0,
        categoriesCount: 0,
        photographersCount: 0
      }))
    );
  }

  setCategory(cat: string) {
    this.activeCategorySubject.next(cat);
  }

  setSearchQuery(q: string) {
    this.searchQuerySubject.next(q);
  }
}


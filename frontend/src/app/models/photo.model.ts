export interface ExifData {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  dimensions?: string;
}

export interface Photographer {
  name: string;
  avatar: string;
  handle: string;
  location: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  time: string;
}

export interface Photo {
  id: string;
  title: string;
  category: string;
  photographer: Photographer;
  imageUrl: string;
  thumbnailUrl: string;
  orientation: 'landscape' | 'portrait' | 'square';
  aspectRatio?: string;
  description: string;
  featured?: boolean;
  likes: number;
  views: number;
  isLiked?: boolean;
  date: string;
  tags: string[];
  exif: ExifData;
  comments: Comment[];
}

export interface Album {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  category: string;
  photoCount: number;
  curator: string;
  year: string;
}

export interface PhotographerProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location: string;
  awards: string[];
  stats: {
    photos: number;
    awards: number;
    exhibitions: number;
  };
}

export interface Testimonial {
  id: string;
  client: string;
  comment: string;
  rating: number;
  role: string;
}

export interface GalleryStats {
  totalPhotos: number;
  totalLikes: number;
  totalViews: number;
  categoriesCount: number;
  photographersCount: number;
}

export interface InquiryForm {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  date?: string;
  budget?: string;
  message?: string;
}


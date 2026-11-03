import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  photographer: string;
  location: string;
  camera: string;
  specs: string;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  @Output() exploreClick = new EventEmitter<void>();
  @Output() viewSeriesClick = new EventEmitter<void>();

  slides: HeroSlide[] = [
    {
      id: 'h1',
      title: 'Celestial Solitude & Frozen Fjords',
      subtitle: 'Where glacial mist collides with the infinite silent arctic glow',
      photographer: 'Elena Rostova',
      location: 'Patagonia, Argentina',
      camera: 'Sony Alpha 7R V',
      specs: '21mm • f/8.0 • 1/4s • ISO 100',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=90',
      category: 'Landscape Masterclass'
    },
    {
      id: 'h2',
      title: 'Nocturnal Pulse: Shinjuku in Rain',
      subtitle: 'Electric reflections and neon silhouettes in the beating heart of Tokyo',
      photographer: 'Kenji Sato',
      location: 'Tokyo, Japan',
      camera: 'Fujifilm GFX 100 II',
      specs: '45mm • f/2.8 • 1/125s • ISO 800',
      imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&auto=format&fit=crop&q=90',
      category: 'Street & Cyberpunk'
    },
    {
      id: 'h3',
      title: 'Deep Cosmological Tapestry',
      subtitle: 'Zodiacal light over hexagonal salt crusts at 4,000 meters altitude',
      photographer: 'Dr. Carlos Mendez',
      location: 'Atacama Desert, Chile',
      camera: 'Sony Alpha 1',
      specs: '14mm • f/1.8 • 25s • ISO 3200',
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&auto=format&fit=crop&q=90',
      category: 'Astrophotography'
    }
  ];

  currentIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 6500);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  setSlide(index: number) {
    this.currentIndex = index;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}


import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgFor } from '@angular/common';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-calories-carousel',
  standalone: true,
  imports: [LightboxModule, NgFor],
  templateUrl: './calories-carousel.component.html',
  styleUrls: ['./calories-carousel.component.scss'],
})
export class CaloriesCarouselComponent implements OnInit, OnDestroy {
  galleryId = 'myLightbox';

  largeScreenItems: GalleryItem[] = [];
  smallScreenItems: GalleryItem[] = [];
  items: GalleryItem[] = [];

  activeIndex = 0;
  hoveredIndex = -1;
  isPaused = false;
  cycleInterval: any;

  constructor(public gallery: Gallery, private lightbox: Lightbox) {}

  ngOnInit() {
    this.largeScreenItems = [
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto1.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto1_thumb.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto2.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto2_thumb.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto3.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto3_thumb.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto4.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto4_thumb.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto5.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto5_thumb.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto6.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto6_thumb.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto7.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto7_thumb.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto8.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto8_thumb.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto9.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto9_thumb.png',
      }),
    ];

    this.smallScreenItems = [
      new ImageItem({
        src: 'assets/caloriesPhotos/smCaloriesPhoto1.png',
        thumb: 'assets/caloriesPhotos/smCaloriesPhoto1.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/smCaloriesPhoto2.png',
        thumb: 'assets/caloriesPhotos/smCaloriesPhoto2.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/smCaloriesPhoto3.png',
        thumb: 'assets/caloriesPhotos/smCaloriesPhoto3.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/smCaloriesPhoto4.png',
        thumb: 'assets/caloriesPhotos/smCaloriesPhoto4.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/smCaloriesPhoto5.png',
        thumb: 'assets/caloriesPhotos/smCaloriesPhoto5.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/smCaloriesPhoto6.png',
        thumb: 'assets/caloriesPhotos/smCaloriesPhoto6.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/smCaloriesPhoto7.png',
        thumb: 'assets/caloriesPhotos/smCaloriesPhoto7.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/smCaloriesPhoto8.png',
        thumb: 'assets/caloriesPhotos/smCaloriesPhoto8.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/smCaloriesPhoto9.png',
        thumb: 'assets/caloriesPhotos/smCaloriesPhoto9.png',
      }),
    ];

    this.detectScreenSize();

    this.startAnimationCycle();
  }

  ngOnDestroy(): void {
    this.clearAnimationCycle();
  }

  startAnimationCycle() {
    this.clearAnimationCycle();

    this.cycleInterval = setInterval(() => {
      if (!this.isPaused && this.items.length > 0) {
        this.activeIndex = (this.activeIndex + 1) % this.items.length;
      }
    }, 500);
  }

  clearAnimationCycle() {
    if (this.cycleInterval) {
      clearInterval(this.cycleInterval);
      this.cycleInterval = null;
    }
  }

  onMouseEnter(index: number) {
    this.isPaused = true;
    this.hoveredIndex = index;
  }

  onMouseLeave() {
    this.isPaused = false;
    this.hoveredIndex = -1;
    this.activeIndex = 0;
  }

  openLightbox(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen',
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.detectScreenSize();
  }

  detectScreenSize() {
    if (window.innerWidth <= 768) {
      this.items = this.smallScreenItems;
    } else {
      this.items = this.largeScreenItems;
    }
    // Ładujemy do galerii
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }
}

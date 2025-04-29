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

  activeIndices: number[] = [];

  private currentGroup = 0;

  private groupSize = 3;

  hoveredIndex = -1;
  isPaused = false;

  private cycleInterval: any;

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
    this.updateActiveIndices();
    this.startAnimationCycle();
  }

  ngOnDestroy(): void {
    this.clearAnimationCycle();
  }

  private startAnimationCycle() {
    this.clearAnimationCycle();

    this.cycleInterval = setInterval(() => {
      if (this.isPaused || this.items.length === 0) return;

      const totalGroups = Math.ceil(this.items.length / this.groupSize);
      this.currentGroup = (this.currentGroup + 1) % totalGroups;
      this.updateActiveIndices();
    }, 800);
  }

  private clearAnimationCycle() {
    if (this.cycleInterval) {
      clearInterval(this.cycleInterval);
      this.cycleInterval = null;
    }
  }

  private updateActiveIndices() {
    this.activeIndices = [];
    const start = this.currentGroup * this.groupSize;
    for (let i = 0; i < this.groupSize; i++) {
      const idx = start + i;
      if (idx < this.items.length) this.activeIndices.push(idx);
    }
  }

  onMouseEnter(index: number) {
    this.isPaused = true;
    this.hoveredIndex = index;
  }

  onMouseLeave() {
    this.isPaused = false;
    this.hoveredIndex = -1;
  }

  openLightbox(index: number) {
    this.lightbox.open(index, this.galleryId, { panelClass: 'fullscreen' });
  }

  @HostListener('window:resize')
  onResize() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    const small = window.innerWidth <= 768;

    this.items = small ? this.smallScreenItems : this.largeScreenItems;
    this.groupSize = small ? 2 : 3;
    this.currentGroup = 0;
    this.updateActiveIndices();

    this.gallery.ref(this.galleryId).load(this.items);
  }

  isIndexActive(i: number): boolean {
    return this.activeIndices.includes(i);
  }
}

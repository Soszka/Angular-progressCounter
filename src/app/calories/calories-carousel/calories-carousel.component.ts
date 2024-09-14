import { Component, OnInit, HostListener } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-calories-carousel',
  standalone: true,
  imports: [LightboxModule, NgFor, AsyncPipe],
  templateUrl: './calories-carousel.component.html',
  styleUrls: ['./calories-carousel.component.scss'],
})
export class CaloriesCarouselComponent implements OnInit {
  galleryId = 'myLightbox';
  items: GalleryItem[] = [];
  largeScreenItems: GalleryItem[] = [];
  smallScreenItems: GalleryItem[] = [];

  constructor(public gallery: Gallery, private lightbox: Lightbox) {}

  ngOnInit() {
    // Zdefiniuj elementy galerii
    this.largeScreenItems = [
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto1.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto1.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto2.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto2.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto3.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto3.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto4.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto4.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto5.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto5.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto6.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto6.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto7.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto7.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto8.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto8.png',
      }),
      new ImageItem({
        src: 'assets/caloriesPhotos/caloriesPhoto9.png',
        thumb: 'assets/caloriesPhotos/caloriesPhoto9.png',
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
    ];
    this.detectScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
  }

  detectScreenSize() {
    if (window.innerWidth <= 768) {
      this.items = this.smallScreenItems;
    } else {
      this.items = this.largeScreenItems;
    }

    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }

  openLightbox(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen',
    });
  }
}

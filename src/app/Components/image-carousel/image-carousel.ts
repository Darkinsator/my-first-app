import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  imports: [],
  standalone: true,
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.css',
})
export class ImageCarousel implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

  images = [
    '/images/CSS3.jpg',
    '/images/html.jpg',
    '/images/JavaScript.jpg',
    '/images/Typescript.jpg'
  ];

  currentIndex = 0;

  private intervalId!: number;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private startTimer(): void {
    this.intervalId = window.setInterval(() => {
      this.moveNext();
      this.cdr.detectChanges();
    }, 4000);
  }

  private resetTimer(): void {
    clearInterval(this.intervalId);
    this.startTimer();
  }

  private moveNext(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  private movePrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  nextImage(): void {
    this.moveNext();
    this.resetTimer();
  }

  previousImage(): void {
    this.movePrevious();
    this.resetTimer();
  }
}

import { Component, ChangeDetectorRef, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-projects-carousel',
	imports: [],
	standalone: true,
	template: `
		<div class="projects-carousel">
			<div class="carousel-viewport">
				<div class="carousel-track" #carouselTrack [style.transform]="'translateX(-' + (currentIndex * slideWidth) + 'px)'">

					@for(project of projects; track project){
						<article class="project-card"
							[class.project-card-featured]="project.variant === 'featured'"
							[class.project-card-dark]="project.variant === 'dark'"
							[class.project-card-outline]="project.variant === 'outline'">
							<div class="project-index" [innerText]="projects.indexOf(project) + 1"></div>
							<div class="project-card-content">
								<p class="project-type" [innerText]="project.type"></p>
								<h3 [innerText]="project.title"></h3>
								<p [innerText]="project.description"></p>
								<a class="project-link" [href]="project.link" target="_blank" rel="noopener noreferrer">View project <span aria-hidden="true">↗</span></a>
							</div>
						</article>
					}

				</div>
			</div>

			<div class="carousel-controls">
				<button aria-label="Previous project" class="carousel-btn" (click)="previous()">←</button>
				<div class="carousel-dots">
					@for(project of projects; track project){
						<button class="dot" [class.active]="projects.indexOf(project) === currentIndex" (click)="setIndex(projects.indexOf(project))" aria-label="Go to project"></button>
					}
				</div>
				<button aria-label="Next project" class="carousel-btn" (click)="next()">→</button>
			</div>
		</div>
	`,
	styles: [
		`
			.projects-carousel {
				display: flex;
				flex-direction: column;
				gap: 18px;
			}

			.carousel-viewport {
				overflow: hidden;
				width: 100%;
			}

			.carousel-track {
				display: flex;
				gap: 16px;
				transition: transform 0.5s ease-in-out;
			}

			.project-card {
				min-height: 320px;
				box-sizing: border-box;
				padding: 20px;
				width: 360px;
				flex: 0 0 360px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			.project-card-featured { background: var(--teal); }
			.project-card-dark { background: black; border: 1px solid white;}
			.project-card-outline { border: 1px solid var(--ink); }

			.carousel-controls {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 12px;
			}

			.carousel-btn {
				background: transparent;
				border: 1px solid var(--line);
				color: var(--ink);
				padding: 8px 12px;
				font-size: 1.1rem;
				cursor: pointer;
			}

			.carousel-dots { display:flex; gap:8px; }
			.dot { width:10px; height:10px; border-radius:50%; background:#aab7b4; border:0; }
			.dot.active { background: var(--accent); }

			@media (max-width: 800px) {
				.carousel-track { gap: 12px; }
				.project-card { width: 100%; flex: 0 0 100%; }
			}
		`
	]
})
export class ProjectsCarousel implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

	constructor(private cdr: ChangeDetectorRef) {}

	slideWidth = 0;

	projects = [
		{
			type: 'Interface / HTML / CSS / JavaScript',
			title: 'Construction Website',
			description: 'A responsive website for a construction company that showcases their projects and services(currently live).',
			variant: 'featured',
			link: 'https://github.com/Darkinsator/ParagonMB',
		},
		{
			type: 'Interface / REACT / JavaScript',
			title: 'Portfolio Website',
			description: 'My first portfolio website showcasing my early work.',
			variant: 'dark',
			link: 'https://github.com/Darkinsator/portfolio',
		},
		{
			type: 'Web Application / C# .NET / SQL',
			title: 'Disaster Management App',
			description: 'A web application for managing disaster response and relief efforts.',
			variant: 'outline',
			link: 'https://github.com/Darkinsator/DisasterApp',
		},
		{
			type: 'Mobile Application / Kotlin / Java',
			title: 'Hidden Treasures Thrift Store App',
			description: 'A mobile application for a thrift store that allows users to browse and purchase items.',
			variant: 'featured',
			link: 'https://github.com/DeCharter/XISD_MobileApplication',
		},
		{
			type: 'Interface / Angular / TypeScript',
			title: 'Current Portfolio Website',
			description: 'A portfolio website showcasing my current work and skills.',
			variant: 'dark',
			link: 'https://github.com/DeCharter/XISD_MobileApplication',
		},
		{
			type: 'I am just getting started.',
			title: 'More to come',
			description: 'I am currently working on more projects to showcase my skills and experience.',
			variant: 'outline',
			link: '#contact',
		},
		
	];

	currentIndex = 0;

	private intervalId!: number;

	ngOnInit(): void {
		this.startAutoPlay();
	}

	ngAfterViewInit(): void {
		this.updateSlideWidth();
		window.addEventListener('resize', this.updateSlideWidthBound);
	}

	ngOnDestroy(): void {
		clearInterval(this.intervalId);
		window.removeEventListener('resize', this.updateSlideWidthBound);
	}

	private updateSlideWidthBound = (): void => {
		this.updateSlideWidth();
	};

	private updateSlideWidth(): void {
		const track = this.carouselTrack?.nativeElement;
		if (!track) return;

		const card = track.querySelector<HTMLElement>('.project-card');
		if (!card) return;

		const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
		this.slideWidth = card.getBoundingClientRect().width + gap;
		this.cdr.markForCheck();
	}

	private startAutoPlay(): void {
		this.intervalId = window.setInterval(() => {
			this.moveNext();
			this.cdr.detectChanges();
		}, 5000);
	}

	resetAutoPlay(): void {
		clearInterval(this.intervalId);
		this.startAutoPlay();
	}

	private moveNext(): void {
		if (this.currentIndex < this.projects.length - 1) {
			this.currentIndex++;
		} else {
			this.currentIndex = 0;
		}
	}

	private movePrevious(): void {
		if (this.currentIndex > 0) {
			this.currentIndex--;
		} else {
			this.currentIndex = this.projects.length - 1;
		}
	}

	next(): void {
		this.moveNext();
		this.resetAutoPlay();
	}

	previous(): void {
		this.movePrevious();
		this.resetAutoPlay();
	}

	setIndex(i: number): void {
		if (i < 0 || i >= this.projects.length) return;
		this.currentIndex = i;
		this.resetAutoPlay();
	}
}

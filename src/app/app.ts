import { Component } from '@angular/core';

import { NavbarComponent } from './Components/navbar-component/navbar-component';
import { HeadImage } from './Components/head-image/head-image';
import { FooterComponent } from './Components/footer-component/footer-component';
import { ImageCarousel } from './Components/image-carousel/image-carousel';
import { ProjectsCarousel } from './Components/projects-carousel/projects-carousel';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, HeadImage, FooterComponent, ImageCarousel, ProjectsCarousel],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

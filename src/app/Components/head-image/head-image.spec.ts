import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadImage } from './head-image';

describe('HeadImage', () => {
  let component: HeadImage;
  let fixture: ComponentFixture<HeadImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadImage],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use a relative image path for GitHub Pages deployments', () => {
    expect(component.imageSrc).toBe('images/userimage.png');
  });
});

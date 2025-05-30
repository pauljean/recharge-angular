import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftComponent } from './gift.component';

describe('GiftComponent', () => {
  let component: GiftComponent;
  let fixture: ComponentFixture<GiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

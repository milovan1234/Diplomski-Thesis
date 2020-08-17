import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartPageComponent } from './shop-cart-page.component';

describe('ShopCartPageComponent', () => {
  let component: ShopCartPageComponent;
  let fixture: ComponentFixture<ShopCartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

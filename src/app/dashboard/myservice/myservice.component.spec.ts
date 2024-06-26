import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyserviceComponent } from './myservice.component';

describe('MyserviceComponent', () => {
  let component: MyserviceComponent;
  let fixture: ComponentFixture<MyserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyserviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

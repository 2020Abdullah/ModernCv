import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMyserviceComponent } from './create-myservice.component';

describe('CreateMyserviceComponent', () => {
  let component: CreateMyserviceComponent;
  let fixture: ComponentFixture<CreateMyserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMyserviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMyserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

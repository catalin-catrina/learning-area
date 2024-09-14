import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherOrderMappingOperatorsComponent } from './higher-order-mapping-operators.component';

describe('HigherOrderMappingOperatorsComponent', () => {
  let component: HigherOrderMappingOperatorsComponent;
  let fixture: ComponentFixture<HigherOrderMappingOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HigherOrderMappingOperatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HigherOrderMappingOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistaPage } from './entrevista.page';

describe('EntrevistaPage', () => {
  let component: EntrevistaPage;
  let fixture: ComponentFixture<EntrevistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrevistaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrevistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

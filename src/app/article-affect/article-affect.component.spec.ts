import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAffectComponent } from './article-affect.component';

describe('ArticleAffectComponent', () => {
  let component: ArticleAffectComponent;
  let fixture: ComponentFixture<ArticleAffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAffectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleAffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

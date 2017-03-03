import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {GuestCounterComponent} from "./guest-counter.component";

describe('GuestCounterComponent', () => {
  let component: GuestCounterComponent;
  let fixture: ComponentFixture<GuestCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuestCounterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

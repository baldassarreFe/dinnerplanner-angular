import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-guest-counter',
  templateUrl: './guest-counter.component.html',
  styleUrls: ['./guest-counter.component.css']
})
export class GuestCounterComponent implements OnInit {

  private counterValue = 0;

  @Output() counterChange = new EventEmitter();

  @Input()
  get counter() {
    return this.counterValue;
  }

  set counter(value) {
    if (value >= 0) {
      this.counterValue = value;
      this.counterChange.emit(this.counterValue);
    }
  }

  public decrement() {
    this.counter--;
  }

  public increment() {
    this.counter++;
  }

  constructor() {
  }

  ngOnInit() {
  }

}

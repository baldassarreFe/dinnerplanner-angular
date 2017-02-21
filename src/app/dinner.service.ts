import { Injectable } from '@angular/core';

@Injectable()
export class DinnerService {

  public numberOfGuests: number = 0;

  public increaseGuests(): void {
    this.numberOfGuests++;
  }

  public decreaseGuests(): void {
    if (this.numberOfGuests > 0)
      this.numberOfGuests--;
  }

  constructor() { }

}

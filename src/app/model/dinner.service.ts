import {Injectable} from "@angular/core";
import {Dish} from "./dish";

@Injectable()
export class DinnerService {

  private _numberOfGuests = 0;

  public get numberOfGuests(): number {
    return this._numberOfGuests;
  }

  public set numberOfGuests(value: number) {
    if (value >= 0) {
      this._numberOfGuests = value;
    }
  }

  public totalPrice: number = 0;
  public readonly selected: Dish[] = [];

  public removeDish(d: Dish) {
    let i = this.selected.indexOf(d);
    if (i > -1)
      this.selected.splice(i, 1);
  }

  public addDish(d: Dish) {
    // unefficient
    let toRemove: Dish = this.selected.find(x => x.type == d.type);
    if (toRemove)
      this.removeDish(toRemove);
    this.selected.push(d);
  }

  constructor() {
  }

}

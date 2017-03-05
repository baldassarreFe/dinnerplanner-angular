import {Injectable} from "@angular/core";
import {Dish} from "./dish";

@Injectable()
export class DinnerService {

  private _numberOfGuests: number;

  public get numberOfGuests(): number {
    return this._numberOfGuests;
  }

  public set numberOfGuests(value: number) {
    if (value >= 0) {
      this._numberOfGuests = value;
      this.updateTotal();
      localStorage.setItem('guests', JSON.stringify(value));
    }
  }

  public totalPrice: number = 0;
  public readonly selected: Dish[];

  public removeDish(d: Dish) {
    let i = this.selected.indexOf(d);
    if (i > -1)
      this.selected.splice(i, 1);
    this.updateTotal();
    this.saveToLocalStorage();
  }

  public addDish(d: Dish) {
    // unefficient
    let toRemove: Dish = this.selected.find(x => x.type == d.type);
    if (toRemove)
      this.removeDish(toRemove);
    this.selected.push(d);
    this.updateTotal();
    this.saveToLocalStorage();
  }

  constructor() {
    this.selected = JSON.parse(localStorage.getItem('dinner')) || [];
    this.numberOfGuests = JSON.parse(localStorage.getItem('guests')) || 0;
  }

  private saveToLocalStorage() {
    localStorage.setItem('dinner', JSON.stringify(this.selected));
  }

  private updateTotal() {
    this.totalPrice = this.numberOfGuests * this.selected
        .map(dish=>dish.ingredients)
        .reduce((arr1, arr2) => arr1.concat(arr2), [])
        .map(i => i.price)
        .reduce((p1,p2) => p1+p2, 0)
  }
}

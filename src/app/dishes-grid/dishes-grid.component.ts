import {Component, Input, AfterViewInit} from "@angular/core";
import {SpoonacularService} from "../model/spoonacular.service";
import {Dish} from "../model/dish";
import {Subject} from "rxjs/Subject";
import {SpoonacularQuery} from "../model/query";

@Component({
  selector: 'dishes-grid',
  templateUrl: './dishes-grid.component.html',
  styleUrls: ['./dishes-grid.component.css']
})
export class DishesGridComponent implements AfterViewInit {

  @Input() title: string;
  @Input() filterFunction: (ct: Dish) => boolean;
  private filteredDishes: Dish[];
  private _click$: Subject<SpoonacularQuery>;

  constructor(public spoonacularService: SpoonacularService) {
    this._click$ = new Subject();
    this.filteredDishes = [];
    spoonacularService.attach(this._click$.asObservable());
  }

  public moreDishes() {
    this._click$.next(new SpoonacularQuery(undefined, this.title));
  }

  ngAfterViewInit() {
    this.spoonacularService.dishes$
      .filter(d => this.filterFunction(d))
      .subscribe(
        (d) => this.filteredDishes.push(d),
        (err) => console.log(err),
        () => console.log('Completed')
      );
  }
}

import {Component, Input, AfterViewInit, ViewChild} from "@angular/core";
import {SpoonacularService} from "../model/spoonacular.service";
import {Dish} from "../model/dish";
import {Subject} from "rxjs/Subject";
import {SpoonacularQuery} from "../model/query";

@Component({
  selector: 'dish-category-grid',
  templateUrl: './dishes-grid.component.html',
  styleUrls: ['./dishes-grid.component.css']
})
export class DishCategoryGridComponent implements AfterViewInit {

  @Input() title: string;
  @Input() filterFunction: (ct: Dish) => boolean;
  private filteredDishes: Dish[];
  private _click$: Subject<SpoonacularQuery>;
  private isLoading: boolean;

  constructor(public spoonacularService: SpoonacularService) {
    this._click$ = new Subject();
    this.filteredDishes = [];
    this.isLoading = false;
    spoonacularService.attach(this._click$.asObservable());
  }

  public moreDishes() {
    this.isLoading = true;
    this._click$.next(new SpoonacularQuery(undefined, this.title));
  }

  ngAfterViewInit() {
    this.spoonacularService.dishes$
      .filter(d => this.filterFunction(d))
      .subscribe(
        d => {
          this.isLoading = false;
          this.filteredDishes.push(d);
        },
        err => console.log(err),
        () => console.log('Completed')
      );
  }
}

import {Component, OnInit} from "@angular/core";
import {Dish} from "../model/dish";
import {SpoonacularQuery} from "../model/query";
import {SpoonacularService} from "../model/spoonacular.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'browse-pane',
  templateUrl: './browse-pane.component.html',
  styleUrls: ['./browse-pane.component.css']
})
export class BrowsePaneComponent implements OnInit {
  public searchMode: boolean;

  public keywords: string;
  public type: string;

  private _click$: Subject<SpoonacularQuery>;

  public createTypeFilter(type: string): (d: Dish) => boolean {
    return d => d.type == type;
  }

  public createSearchFilter(): (d: Dish) => boolean {
    return d => !this.type || d.type == this.type;
  }

  constructor(public spoonacularService: SpoonacularService) {
    this.keywords = "";
    this.type = "";
    this.searchMode = false;
    this._click$ = new Subject();
    spoonacularService.attach(this._click$.asObservable())
  }

  public search() {
    this._click$.next(new SpoonacularQuery(this.keywords, this.type))
    this.searchMode = true;
  }

  public clearSearch() {
    this.keywords = "";
    this.type = "";
    this.searchMode = false;
  }

  public checkEnter(e: KeyboardEvent) {
    if (e.keyCode == 13 && this.keywords!="")
      this.search()
  }

  ngOnInit() {
  }
}

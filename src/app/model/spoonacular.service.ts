import {Injectable} from "@angular/core";
import {Dish} from "./dish";
import {Http, Headers, URLSearchParams, Response} from "@angular/http";
import {Ingredient} from "./ingredient";
import {SpoonacularQuery} from "./query";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {isNull} from "util";

@Injectable()
export class SpoonacularService {
  private externalQuery$: Subject<SpoonacularQuery>;
  public dishes$: Observable<Dish>;

  public categories: string[];
  private counters = {};
  private _apiKey: string = "";
  private allDishes: Dish[];
  private _headers: Headers;

  get apiKeyPresent(): boolean {
    return this.key!="";
  }

  private get key(): string {
    return this._apiKey||localStorage.getItem('apiKey')||"";
  }

  set apiKey(value: string) {
    this._apiKey = value;
    localStorage.setItem('apiKey', value);
  }

  private persist = (d: Dish): void => {
    this.allDishes.push(d);
    localStorage.setItem('allDishes', JSON.stringify(this.allDishes));
  };

  public clearLocalStorage() {
    localStorage.removeItem('allDishes');
  }

  private loadFromLocalStorage() {
    this.allDishes = JSON.parse(localStorage.getItem('allDishes')) || [];
  }

  public attach(events$: Observable<SpoonacularQuery>): void {
    events$
      .subscribe(
        e => this.externalQuery$.next(e),
        err => console.log(err),
        () => console.log('Completed')
      );
  }

  private get headers() {
    if (!this._headers)
      this._headers = new Headers();
      this._headers.append('Accept', 'application/json');
      this._headers.append('X-Mashape-Key', this.key);
    return this._headers;
  };

  private searchUrl: string = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search';

  private detailUrl(id): string {
    return `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id.value}/information`
  }

  constructor(private http: Http) {
    this.loadFromLocalStorage();
    this.categories = ['appetizer', 'main course', 'dessert'];
    this.categories.forEach(name => this.counters[name] = 0);

    this.externalQuery$ = new Subject();

    this.dishes$ = this.externalQuery$
      .map(q => new SpoonacularQuery(q.keywords, q.type, this.counters[q.type]))
      .flatMap(q => this.webSearch(q.keywords, q.type, q.offset))
      .flatMap(id => this.details(id))
      .do(d => this.counters[d.type]++)
      .do(this.persist)
      .startWith(...this.allDishes)
      .publishReplay()
      .refCount();
  }

  /**
   * First query to the search service of Spoonacular, get back a stream of id
   */
  public webSearch(keywords: string, type: string, offset = 0, howMany = 3): Observable<number> {
    let params = new URLSearchParams();
    params.set('instructionsRequired', 'true');
    params.set('number', howMany + '');
    params.set('offset', offset + '');
    if (keywords)
      params.set('query', keywords);
    if (type)
      params.set('type', type);

    return this.http.get(this.searchUrl, {search: params, headers: this.headers})
      .map(this.extractIds)
      .flatMap(ids => ids.map(id => Observable.of(id)))
      .catch(this.handleError)
  }

  private extractIds(res: Response): number[] {
    return res.json().results.map(d => d.id);
  }

  /**
   * Second query to spoonacular, retrieves the details of the dish corresponding to the id.
   * If the dish doesn't belong to any of the valid categories it gets discarded and the
   * returned observable is simply empty.
   * @param id the id of the dish
   * @returns {Observable<Dish>}
   */
  private details(id: number): Observable<Dish> {
    let params = new URLSearchParams();
    params.set('includeNutrition', 'false');

    return this.http.get(this.detailUrl(id), {search: params, headers: this.headers})
      .map(res => res.json())
      .map(this.extractDish)
      .filter(o => !isNull(o))
      .catch(this.handleError);
  }

  /**
   * Given an object it tries to parse it into a dish, discarding the ones that
   * don't fit into the categories handled by the app.
   * @param dish
   * @returns {any}
   */
  private extractDish = (dish: any): Dish => {
    let type = this.categories.find(t => dish.dishTypes.includes(t));
    if (type) {
      return new Dish(
        dish.id,
        dish.title,
        dish.instructions.replace('  ', ' '),
        type,
        dish.image,
        dish.extendedIngredients
          .map(i => new Ingredient(i.name, i.amount, i.unit))
      );
    } else
      return null;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

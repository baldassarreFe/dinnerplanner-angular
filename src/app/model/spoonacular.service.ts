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
import {apiKey} from "./apiKey";

@Injectable()
export class SpoonacularService {

  private external$: Subject<SpoonacularQuery>;
  public dishes$: Observable<Dish>;

  public categories: string[] = ['appetizer', 'main course', 'dessert'];

  public attach(events$: Observable<SpoonacularQuery>): void {
    events$
      .subscribe(
        e => this.external$.next(e),
        err => console.log(err),
        () => console.log('Completed')
      );
  }

  private headers;
  private searchUrl: string = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search';

  private detailUrl(id): string {
    return `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id.value}/information`
  }

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append('X-Mashape-Key', apiKey);

    this.external$ = new Subject();

    this.dishes$ = this.external$
      .flatMap(q => this.webSearch(q.keywords, q.type))
      .flatMap(id => this.details(id))
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

  private details(id: number): Observable<Dish> {
    let params = new URLSearchParams();
    params.set('includeNutrition', 'false');

    return this.http.get(this.detailUrl(id), {search: params, headers: this.headers})
      .map(res => res.json())
      .map(this.extractDish)
      .filter(o => !!o) // Hacky way to filter the errors
      .catch(this.handleError);
  }

  private extractDish(dish: any): Dish {
    let type = ['appetizer', 'main course', 'dessert'].find(t => dish.dishTypes.includes(t));
    if (type)
      return new Dish(
        dish.id,
        dish.title,
        dish.instructions.replace('  ', ' '),
        type,
        dish.image,
        dish.extendedIngredients
          .map(i => new Ingredient(i.name, i.amount, i.unit))
      );
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

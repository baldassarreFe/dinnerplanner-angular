import {Component} from "@angular/core";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public dateNow: Observable<Date> = Observable.timer(0, 1000).map(() => new Date());
}

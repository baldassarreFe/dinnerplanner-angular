import {Component, ViewContainerRef, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {SpoonacularService} from "./model/spoonacular.service";
import {Overlay} from "angular2-modal";
import {Modal} from "angular2-modal/plugins/bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    if (!this.spoonacularService.apiKeyPresent)
      this.modal.prompt()
        .size('lg')
        .isBlocking(true)
        .title('Spoonacular API key')
        .body('Insert your Spoonacular API key')
        .open()
        .then(
          (resultPromise) => {
            return resultPromise.result.then(
              (result) => this.spoonacularService.apiKey = result,
              () => console.log('Rejected')
            );
          }
        );
  }
  constructor(public spoonacularService: SpoonacularService, private overlay: Overlay, private vcRef: ViewContainerRef, private modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }



  private clearDishes() {
    this.spoonacularService.clearLocalStorage();
    this.modal.alert()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Cached dishes cleared')
      .body('The cached dishes have been cleared')
      .open()
      .then(
        (resultPromise) => {
          return resultPromise.result.then(
            (result) => location.reload(),
            () => console.log('Rejected')
          );
        }
      );
  }
  private dateNow: Observable<Date> = Observable.timer(0, 1000).map(() => new Date());
}
